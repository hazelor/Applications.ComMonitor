using Commons.Infrastructure.Attributes;
using Commons.Infrastructure.Models;
using Hazelor.Infrastructure.Communications.Event;
using Hazelor.Infrastructure.Tools;
using Microsoft.Practices.Prism.Mvvm;
using Modules.TopologyDisplay.Events;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Modules.TopologyDisplay
{
    /// <summary>
    /// 下载相关的操作
    /// </summary>
    public partial class DataTransViewModel : BindableBase
    {

        //下载任务的接收函数
        private void OnDataReceived(object sender, UdpDatagramReceivedEventArgs<byte[]> e)
        {
            byte[] srcBuffer = e.datagram;
            ushort ID = GetParserID(srcBuffer, 0);
            if (ID != ConstIDs.O_TDMOM_TRANSFER_TEST)
            {
                return;
            }

            //处理消息头
            int index = ParseMsgHeader(srcBuffer);

            //处理数据内容 RID TARGETID RSV 4个字节
            index += 4;
            //MSG_ID
            ushort MSG_ID = GetParserID(srcBuffer, index);
            index += 2;
            //ID
            uint Task_ID = GetParserTaskID(srcBuffer, index);

            DownloadTaskUdpRemotePoint[Task_ID] = e.endPoint;
            index += 4;
            //根据不同的Msg_ID执行不同的任务
            ParserDatas(srcBuffer, index, MSG_ID, Task_ID);

        }



        [Parser(ParseID = ConstIDs.DATA_TRANS_START_ASK, Description = "接收开始传输数据请求")]
        private void Parse_DT_START_ASK(byte[] srcBuffer, int index, uint Task_ID)
        {
            DataTransCell pdtc = FindDTC(Task_ID);
            

            if (pdtc != null)
            {
                //设置状态为正在接收
                pdtc.ProgressType = ProgressTypeEnum.Progressing;
                NotifyFront();
                Send_DATA_TRANS_START_REQ(pdtc);
                return;
            }
            else
            {
                DataTransCell dtc = new DataTransCell();
                //解析数据
                dtc.TaskID = Task_ID;
                //文件包大小
                dtc.PackageSize = BitConverter.ToUInt16(srcBuffer, index);
                index += 2;

                //文件包总数
                dtc.PackageNum = BitConverter.ToUInt32(srcBuffer, index);
                index += 4;
                //文件大小
                dtc.FileSize = BitConverter.ToUInt32(srcBuffer, index);
                index += 4;
                //文件类型
                dtc.FileType = (FileTypeEnum)srcBuffer[index++];
                //文件名称长度
                int FileNameLength = (int)srcBuffer[index++];
                byte[] FileNameBuffer = new byte[FileNameLength];
                Buffer.BlockCopy(srcBuffer, index, FileNameBuffer, 0, srcBuffer.Length - index < FileNameLength ? srcBuffer.Length - index : FileNameLength);
                dtc.FileName = System.Text.Encoding.Default.GetString(FileNameBuffer);
                //NEW UPLOAD TASK
                dtc.TaskType = TaskTypeEnum.Download;


                _eventAggregator.GetEvent<NewTaskEvent>().Publish(dtc);
            }
            
        }

        private DataTransCell NewDownloadTask(DataTransCell dtc)
        {
            DataTransCell dtt = null;
            //choose a path to save
            dtc.TargetIP = ((IPEndPoint)DownloadTaskUdpRemotePoint[dtc.TaskID]).Address.ToString();
            //new task
            dtc.FilePath = System.IO.Path.Combine(Properties.Resources.DownloadPath, dtc.FileName);

            dtc.currentPackageNum = 0;
            dtc.FileReadOffset = 0;
            //new tmp file
            string tmpFilePath = dtc.FilePath + ".tmp";
            dtc.TmpFileStream = new FileStream(tmpFilePath, FileMode.OpenOrCreate);
            dtc.TmpFileStream.Seek(0, SeekOrigin.End);
            dtt = dtc;
            dtc.ProgressType = ProgressTypeEnum.Starting;
            NotifyFront();
            //发送消息 START_REQ
            Send_DATA_TRANS_START_REQ(dtc);
            //dtt.IsRunning = true;
            return dtt;
        }

        private void Send_DATA_TRANS_START_REQ(DataTransCell dtc)
        {
            //设置状态
            dtc.ProgressType = ProgressTypeEnum.Starting;
            NotifyFront();
            MsgHeader mh = new MsgHeader();
            mh.MsgID = ConstIDs.O_TDMOM_TRANSFER_TEST;
            mh.SrcID = ConstIDs.SRC_ID;
            mh.DstID = ConstIDs.DST_ID;
            mh.MsgLen = 24;
            mh.DataLen = 6;
            int index = 0;

            byte[] sendBuffer = new byte[mh.MsgLen + mh.DataLen];
            Buffer.BlockCopy(StructConverter.StructToBytes(mh), 0, sendBuffer, index, 20);
            index += 20;
            sendBuffer[index++] = (byte)dtc.RBID;
            sendBuffer[index++] = (byte)dtc.TargetID;
            //保留两位
            index += 2;

            Buffer.BlockCopy(BitConverter.GetBytes(ConstIDs.DATA_TRANS_START_REQ), 0, sendBuffer, index, 2);
            index += 2;
            Buffer.BlockCopy(BitConverter.GetBytes(dtc.TaskID), 0, sendBuffer, index, 4);
            index += 4;

            udpListenerService.SendData(DownloadTaskUdpRemotePoint[dtc.TaskID], sendBuffer);

            //开启定时，确定是否发送超时
            //if (dtc.OutTimeTimmer == null)
            //{
            //    dtc.OutTimeCount = 0;
            //    dtc.OutTimeTimmer = new System.Timers.Timer(10000);
            //    dtc.OutTimeTimmer.Elapsed += new System.Timers.ElapsedEventHandler((s, e) => OnOutDownloadStartTimer(s,e,dtc));
            //    dtc.OutTimeTimmer.Start();
            //}
        }


        [Parser(ParseID = ConstIDs.DATA_TRANS_PROG_ASK, Description = "接收传输数据请求")]
        private void Parse_DT_PROG_ASK(byte[] srcBuffer, int index, uint Task_ID)
        {
            //接收文件数据，并回复
            DataTransCell dtc = FindDTC(Task_ID);
            if (dtc == null)
            {
                return;
            }
            //如果没有打开stream打开
            
            //包号
            UInt32 CurrentPackageNum = BitConverter.ToUInt32(srcBuffer, index);
            index += 4;
            ushort PackageSize = BitConverter.ToUInt16(srcBuffer, index);
            index += 2;
            byte[] tmpBuffer = new byte[PackageSize];
            Buffer.BlockCopy(srcBuffer, index, tmpBuffer, 0, PackageSize);

            dtc.FileReadOffset = (int)(CurrentPackageNum * dtc.PackageSize);
            if (dtc.TmpFileStream == null)
            {
                dtc.TmpFileStream = new FileStream(dtc.FilePath + ".tmp", FileMode.OpenOrCreate);
                dtc.TmpFileStream.Seek(dtc.FileReadOffset, SeekOrigin.End);
            }

            dtc.TmpFileStream.Write(tmpBuffer, 0, PackageSize);
            dtc.currentPackageNum = CurrentPackageNum;
            
            //计算传输速率
            if (dtc.RecieveTime == DateTime.MinValue)
            {
                dtc.RecieveTime = DateTime.Now;
            }
            else
            {
                TimeSpan ts = DateTime.Now - dtc.RecieveTime;
                dtc.TranslateRate = dtc.PackageSize / ts.TotalSeconds;
            }


            //接收信息，停止定时
            if (dtc.OutTimeTimmer != null)
            {

                dtc.OutTimeTimmer.Stop();
                dtc.OutTimeTimmer = null;
                dtc.OutTimeCount = 0;
            }
            //send PROG_REQ
            Send_DATA_TRANS_PROG_REQ(dtc);

        }

        private void Send_DATA_TRANS_PROG_REQ(DataTransCell dtc)
        {
            MsgHeader mh = new MsgHeader();
            mh.MsgID = ConstIDs.O_TDMOM_TRANSFER_TEST;
            mh.SrcID = ConstIDs.SRC_ID;
            mh.DstID = ConstIDs.DST_ID;
            mh.MsgLen = 24;
            mh.DataLen = 10;
            int index = 0;

            byte[] sendBuffer = new byte[mh.MsgLen + mh.DataLen];
            Buffer.BlockCopy(StructConverter.StructToBytes(mh), 0, sendBuffer, index, 20);
            index += 20;
            sendBuffer[index++] = (byte)dtc.RBID;
            sendBuffer[index++] = (byte)dtc.TargetID;
            //保留两位
            index += 2;

            Buffer.BlockCopy(BitConverter.GetBytes(ConstIDs.DATA_TRANS_PROG_REQ), 0, sendBuffer, index, 2);
            index += 2;
            Buffer.BlockCopy(BitConverter.GetBytes(dtc.TaskID), 0, sendBuffer, index, 4);
            index += 4;
            Buffer.BlockCopy(BitConverter.GetBytes(dtc.currentPackageNum), 0, sendBuffer, index, 4);
            index += 4;

            udpListenerService.SendData(DownloadTaskUdpRemotePoint[dtc.TaskID], sendBuffer);
            

        }


        [Parser(ParseID = ConstIDs.DATA_TRANS_END_ASK, Description = "接收处理end请求")]
        private void Parse_DT_END_ASK(byte[] srcBuffer, int index, uint Task_ID)
        {
            DataTransCell dtc = FindDTC(Task_ID);
            if (dtc == null)
            {
                //接收错误信息
                return;
            }
            if (dtc.IsRunning == true)
            {
                dtc.ProgressType = ProgressTypeEnum.Finish;
                //通知界面
                NotifyFront();
                //文件转存
                dtc.TmpFileStream.Close();
                dtc.TmpFileStream = null;
                if (System.IO.File.Exists(dtc.FilePath + ".tmp"))
                {
                    System.IO.File.Move(dtc.FilePath + ".tmp", dtc.FilePath);
                }
                //dtc.IsRunning = false;
            }
            //发送 END_REQ
            Send_DATA_TRANS_END_REQ(dtc);

        }

        private void Send_DATA_TRANS_END_REQ(DataTransCell dtc)
        {
            MsgHeader mh = new MsgHeader();
            mh.MsgID = ConstIDs.O_TDMOM_TRANSFER_TEST;
            mh.SrcID = ConstIDs.SRC_ID;
            mh.DstID = ConstIDs.DST_ID;
            mh.MsgLen = 24;
            mh.DataLen = 6;
            int index = 0;

            byte[] sendBuffer = new byte[mh.MsgLen + mh.DataLen];
            Buffer.BlockCopy(StructConverter.StructToBytes(mh), 0, sendBuffer, index, 20);
            index += 20;
            sendBuffer[index++] = (byte)dtc.RBID;
            sendBuffer[index++] = (byte)dtc.TargetID;
            //保留两位
            index += 2;

            Buffer.BlockCopy(BitConverter.GetBytes(ConstIDs.DATA_TRANS_END_REQ), 0, sendBuffer, index, 2);
            index += 2;
            Buffer.BlockCopy(BitConverter.GetBytes(dtc.TaskID), 0, sendBuffer, index, 4);
            index += 4;

            udpListenerService.SendData(DownloadTaskUdpRemotePoint[dtc.TaskID], sendBuffer);
            //发送不管
            dtc.ProgressType = ProgressTypeEnum.Finish;
            NotifyFront();
        }

    }
}
