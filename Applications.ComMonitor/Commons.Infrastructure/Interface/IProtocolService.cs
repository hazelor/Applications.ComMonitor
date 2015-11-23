using Commons.Infrastructure.Events;
using Commons.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Commons.Infrastructure.Interface
{
    public interface IProtocolService
    {
        DownTerminalInfo DTerminalInfo { get; }
        CommNet CommunicationNet { get; }

        event EventHandler<NodeChangeEventArg> NodeChangeEvent;
        event EventHandler<LineChangeEventArg> LineChangeEvent;
        event EventHandler<bool> IsStartChannelChangeEvent;
        event EventHandler<EventMsgArgs> RecieveMsgEvent;

        void StartChannel();
        void StopChannel();

        /// <summary>
        /// 过滤信息发送
        /// </summary>
        /// <param name="msgs"></param>
        void FilterMsg(ushort[] msgs);

        /// <summary>
        /// 参数设置
        /// </summary>
        /// <param name="datas"></param>
        void ParamSetting(byte[] datas);

        /// <summary>
        /// 频点查询
        /// </summary>
        void FreQuery();

        /// <summary>
        /// wifi频点开关控制
        /// </summary>
        /// <param name="datas"></param>
        void WIFICtrl(byte[] datas);
    }
}
