using Commons.Infrastructure.Attributes;
using Commons.Infrastructure.Models;
using Hazelor.Infrastructure.Communications;
using Hazelor.Infrastructure.Communications.Events;
using Hazelor.Infrastructure.Tools;
using Microsoft.Practices.Prism.Mvvm;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Timers;

namespace Modules.TopologyDisplay
{
    public partial class DataTransViewModel : BindableBase
    {

        
        //上传任务的接收函数
        private void OnUdpDiagramReceived(object sender, DataReceivedEventArgs e)
        {
            byte[] srcBuffer = e.Content;
            ushort ID = GetParserID(srcBuffer, 0);
            if (ID != ConstIDs.O_TDMOM_TRANSFER_TEST)
            {
                return;
            }

            //处理消息头
            int index = ParseMsgHeader(srcBuffer);

            //处理数据内容
            index += 4;
            //MSG_ID
            ushort MSG_ID = GetParserID(srcBuffer, index);
            index += 2;
            //ID
            uint Task_ID = GetParserTaskID(srcBuffer, index);
            index += 4;
            //根据不同的Msg_ID执行不同的任务
            ParserDatas(srcBuffer, index, MSG_ID, Task_ID);
        }



        /// <summary>
        /// 建立新的上传任务，建立之后，状态为Pause，并等待用户点击开始即开始传输
        /// 打开需要发送的底层通道
        /// 本IP为自动获取，当有多个网卡的时候，需要注意有可能获取的网卡并非所接的网卡
        /// </summary>
        /// <param name="dtc"></param>
        /// <returns></returns>
        private DataTransCell NewUploadTask(DataTransCell dtc)
        {

            
           
            dtc.TaskID = GetTaskID(dtc);
            dtc.FileReadOffset = 0;
            dtc.currentPackageNum = 0;
            UploadTaskUdpService[dtc.TaskID] = new UdpClientService(dtc.TargetIP, RecievePort, SendPortCurrent++);
            UploadTaskUdpService[dtc.TaskID].Register(OnUdpDiagramReceived);


            dtc.ProgressType = ProgressTypeEnum.Pause;
            NotifyFront();

            return dtc;
        }

        /// <summary>
        /// 发送消息 DATA_TRANS_START_ASK
        /// </summary>
        /// <param name="dtc">数据传输信息</param>
        private void Send_DATA_TRANS_START_ASK(DataTransCell dtc)
        {
            //设置状态
            dtc.ProgressType = ProgressTypeEnum.Starting;
            NotifyFront();

            int fileNameLength = System.Text.Encoding.Default.GetByteCount(dtc.FileName);

            MsgHeader mh = new MsgHeader();
            mh.MsgID = ConstIDs.O_TDMOM_TRANSFER_TEST;
            mh.SrcID = ConstIDs.SRC_ID;
            mh.DstID = ConstIDs.DST_ID;
            mh.MsgLen = 24;
            mh.DataLen = (uint)(fileNameLength + 18);
            int index = 0;
            //int index_send = 0;
            byte[] sendBuffer = new byte[mh.MsgLen + mh.DataLen];
            Buffer.BlockCopy(StructConverter.StructToBytes(mh), 0, sendBuffer, index, 20);
            index += 20;

            sendBuffer[index++] = (byte)dtc.RBID;
            sendBuffer[index++] = (byte)dtc.TargetID;
            //保留两位
            index += 2;


            //byte[] DataBuffer = new byte[dtc.FileName.Length + 16];
            Buffer.BlockCopy(BitConverter.GetBytes(ConstIDs.DATA_TRANS_START_ASK), 0, sendBuffer, index, 2);
            index += 2;
            Buffer.BlockCopy(BitConverter.GetBytes(dtc.TaskID), 0, sendBuffer, index, 4);
            index += 4;
            Buffer.BlockCopy(BitConverter.GetBytes(dtc.PackageSize), 0, sendBuffer, index, 2);
            index += 2;
            Buffer.BlockCopy(BitConverter.GetBytes(dtc.PackageNum), 0, sendBuffer, index, 4);
            index += 4;
            Buffer.BlockCopy(BitConverter.GetBytes(dtc.FileSize), 0, sendBuffer, index, 4);
            index += 4;
            sendBuffer[index++] = (byte)dtc.FileType;
            sendBuffer[index++] = (byte)fileNameLength;

            Buffer.BlockCopy(System.Text.Encoding.Default.GetBytes(dtc.FileName), 0, sendBuffer, index, fileNameLength);
            index += fileNameLength;

            //send
            UploadTaskUdpService[dtc.TaskID].SendData(sendBuffer);

            lock (dtc.LockerTimer)
            {
                //开启定时，确定是否发送超时
                if (dtc.OutTimeTimmer == null)
                {
                    dtc.OutTimeCount = 0;
                    dtc.OutTimeTimmer = new Timer(5000);
                    dtc.OutTimeTimmer.Elapsed += new System.Timers.ElapsedEventHandler((s, e) => OnOutUploadTimer(s, e, dtc, Send_DATA_TRANS_START_ASK));
                    dtc.OutTimeTimmer.Start();
                }
            }
            
            

        }

        [Parser(ParseID = ConstIDs.DATA_TRANS_START_REQ, Description = "接收开始传输数据回复")]
        private void Parse_DT_START_REQ(byte[] srcBuffer, int index, uint Task_ID)
        {
            //打开需要传输的文件，并初始化Current Package ReadOffset
            DataTransCell dtc = FindDTC(Task_ID);
            if (dtc == null)
            {
                //接收错误信息
                return;
            }
            //开始数据发送
            if (dtc.currentPackageNum >= dtc.PackageNum)
            {
                Send_DATA_TRANS_END_ASK(dtc);
            }
            else
            {
                Send_DATA_TRANS_PROG_ASK(dtc);
            }
            lock (dtc.LockerTimer)
            {
                //接收信息，停止定时
                if (dtc.OutTimeTimmer != null)
                {
                    dtc.OutTimeTimmer.Stop();
                    dtc.OutTimeTimmer = null;
                    dtc.OutTimeCount = 0;
                }
            }
            


        }

        private void Send_DATA_TRANS_PROG_ASK(DataTransCell dtc)
        {
            if(!dtc.IsRunning)
            {
                return;
            }
            byte[] ReadBuffer = new byte[dtc.PackageSize];
            if (dtc.TmpFileStream == null)
            {
                dtc.TmpFileStream = new FileStream(dtc.FilePath, FileMode.Open);
                dtc.TmpFileStream.Seek(dtc.FileReadOffset, SeekOrigin.Begin);
            }
            //StreamReader sr = new StreamReader(dtc.TmpFileStream);
            //int tps = (dtc.FileSize - (uint)dtc.FileReadOffset) > dtc.PackageSize ? (int)dtc.PackageSize : (int)(dtc.FileSize - dtc.FileReadOffset);
            int ps = 0;
            lock(dtc.LockerFileStream)
            {
                ps = dtc.TmpFileStream.Read(ReadBuffer, 0, dtc.PackageSize);
            }

            dtc.FileReadOffset += ps;

            MsgHeader mh = new MsgHeader();
            mh.MsgID = ConstIDs.O_TDMOM_TRANSFER_TEST;
            mh.SrcID = ConstIDs.SRC_ID;
            mh.DstID = ConstIDs.DST_ID;
            mh.MsgLen = 24;
            mh.DataLen = (uint)(ps + 12);
            int index = 0;

            byte[] sendBuffer = new byte[mh.MsgLen + mh.DataLen];
            Buffer.BlockCopy(StructConverter.StructToBytes(mh), 0, sendBuffer, index, 20);
            index += 20;
            sendBuffer[index++] = (byte)dtc.RBID;
            sendBuffer[index++] = (byte)dtc.TargetID;
            //保留两位
            index += 2;

            Buffer.BlockCopy(BitConverter.GetBytes(ConstIDs.DATA_TRANS_PROG_ASK), 0, sendBuffer, index, 2);
            index += 2;
            Buffer.BlockCopy(BitConverter.GetBytes(dtc.TaskID), 0, sendBuffer, index, 4);
            index += 4;
            Buffer.BlockCopy(BitConverter.GetBytes(dtc.currentPackageNum), 0, sendBuffer, index, 4);
            index += 4;

            Buffer.BlockCopy(BitConverter.GetBytes(ps), 0, sendBuffer, index, 2);
            index += 2;
            Buffer.BlockCopy(ReadBuffer, 0, sendBuffer, index, ps);
            index += ps;
            //send
            UploadTaskUdpService[dtc.TaskID].SendData(sendBuffer);
            lock (dtc.LockerTimer)
            {
                //开启定时，确定是否发送超时
                if (dtc.OutTimeTimmer == null)
                {
                    dtc.OutTimeCount = 0;
                    dtc.OutTimeTimmer = new Timer(5000);
                    dtc.OutTimeTimmer.Elapsed += new System.Timers.ElapsedEventHandler((s, e) => OnOutUploadTimer(s, e, dtc, Send_DATA_TRANS_PROG_ASK));
                    dtc.OutTimeTimmer.Start();
                }
            }
            
        }


        [Parser(ParseID = ConstIDs.DATA_TRANS_PROG_REQ, Description = "接收传输数据回复")]
        private void Parse_DT_PROG_REQ(byte[] srcBuffer, int index, uint Task_ID)
        {
            DataTransCell dtc = FindDTC(Task_ID);
            if (dtc == null)
            {
                return;
            }
            UInt32 CurrentPackageNum = BitConverter.ToUInt32(srcBuffer, index);
            if (CurrentPackageNum == dtc.currentPackageNum)
            {
                dtc.currentPackageNum++;
            }
            else
            {
                dtc.currentPackageNum = (ushort)(CurrentPackageNum + 1);

            }

            //计算传输速率
            if (dtc.RecieveTime == DateTime.MinValue)
            {
                dtc.RecieveTime = DateTime.Now;
            }
            else
            {
                TimeSpan ts = DateTime.Now - dtc.RecieveTime;
                dtc.TranslateRate = dtc.FileReadOffset / ts.TotalSeconds;
            }
            lock(dtc.LockerTimer)
            {
                //接收信息，停止定时
                if (dtc.OutTimeTimmer != null)
                {

                    dtc.OutTimeTimmer.Stop();
                    dtc.OutTimeTimmer = null;
                    dtc.OutTimeCount = 0;
                }
            }
            
            //文件传输完成
            if (dtc.currentPackageNum == dtc.PackageNum+1)
            {

                Send_DATA_TRANS_END_ASK(dtc);
            }
            else//接收文件接收回复并开始发送下一包数据
            {
                Send_DATA_TRANS_PROG_ASK(dtc);
            }

        }

        private void Send_DATA_TRANS_END_ASK(DataTransCell dtc)
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

            Buffer.BlockCopy(BitConverter.GetBytes(ConstIDs.DATA_TRANS_END_ASK), 0, sendBuffer, index, 2);
            index += 2;
            Buffer.BlockCopy(BitConverter.GetBytes(dtc.TaskID), 0, sendBuffer, index, 4);
            index += 4;

            //udpListenerService.SendData(DownloadTaskUdpRemotePoint[dtc.TaskID], sendBuffer);
            UploadTaskUdpService[dtc.TaskID].SendData(sendBuffer);
            //设置任务状态
            dtc.ProgressType = ProgressTypeEnum.Finishing;
            NotifyFront();
            lock(dtc.LockerTimer)
            {
                //超时看门狗开启
                if (dtc.OutTimeTimmer == null)
                {
                    dtc.OutTimeCount = 0;
                    dtc.OutTimeTimmer = new System.Timers.Timer(5000);
                    dtc.OutTimeTimmer.Elapsed += new System.Timers.ElapsedEventHandler((s, e) => OnOutUploadTimer(s, e, dtc, Send_DATA_TRANS_END_ASK));
                    dtc.OutTimeTimmer.Start();
                }
            }
            
        }



        [Parser(ParseID = ConstIDs.DATA_TRANS_END_REQ, Description = "接收处理end回复")]
        private void Parse_DT_END_REQ(byte[] srcBuffer, int index, uint Task_ID)
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
                NotifyFront();
                //关闭接口和发送文件
                dtc.TmpFileStream.Close();
                dtc.TmpFileStream = null;
                if (UploadTaskUdpService.ContainsKey(dtc.TaskID))
                {
                    UploadTaskUdpService[dtc.TaskID].StopService();
                }
                lock(dtc.LockerTimer)
                {
                    //接收信息，停止定时
                    if (dtc.OutTimeTimmer != null)
                    {

                        dtc.OutTimeTimmer.Stop();
                        dtc.OutTimeTimmer = null;
                        dtc.OutTimeCount = 0;
                    }
                }
                

            }

        }
    }
}
