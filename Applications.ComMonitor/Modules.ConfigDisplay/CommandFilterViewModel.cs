using Commons.Infrastructure.Interface;
using Commons.Infrastructure.Models;
using Microsoft.Practices.Prism.Commands;
using Microsoft.Practices.Prism.Mvvm;
using Modules.ConfigDisplay.Interface;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Modules.ConfigDisplay
{
    [Export(PanelNames.MsgFilterSetting, typeof(IConfViewModel))]
    [PartCreationPolicy(CreationPolicy.Shared)]
    class CommandFilterViewModel : SubConfViewModelBase
    {
        private IProtocolService _protocolService;

        [ImportingConstructor]
        public CommandFilterViewModel(IProtocolService protocolService)
        {
            _protocolService = protocolService;
            ApplyCommand = new DelegateCommand(ApplyExecuted);
            Uri = PanelNames.MsgFilterSettingPanel;
            Name = "消息过滤";
            SelectAllCommand = new DelegateCommand(SelectAllExecuted);
            CancelAllCommand = new DelegateCommand(CancelAllExecuted);
            FilterCommand = new DelegateCommand(FilterExecuted);
            InitConfig();
        }
        private void ApplyExecuted()
        {

        }

        private XDocument doc;
        private void InitConfig()
        {
            doc = XDocument.Load(Properties.Resources.MsgConfPath);

            XElement root = doc.Element("ArrayOfMsg");

            foreach(var e in root.Elements("msg"))
            {
                AddMessage(e);
            }

            foreach (var item in _BaseNameCollection)
            {
                item.RegisterFilterChanged();
            }
        }

        private List<BaseNameItem> _BaseNameCollection = new List<BaseNameItem>();

        public List<BaseNameItem> BaseNameCollection
        {
            get
            {
                return this._BaseNameCollection;
            }
        }

        private void AddMessage(XElement msg)
        {
            string BaseName = msg.Element("basename").Value;
            foreach (var baseitem in _BaseNameCollection)
            {
                if (baseitem.BaseName == BaseName)
                {
                    baseitem.MsgItems.Add(ConstructMessage(msg));
                    return;
                }
            }
            BaseNameItem bni = new BaseNameItem { BaseName = BaseName, Filter = false };
            _BaseNameCollection.Add(bni);
            bni.MsgItems = new List<MsgItem>();
            bni.MsgItems.Add(ConstructMessage(msg));

        }

        private MsgItem ConstructMessage(XElement msg)
        {
            MsgItem mi = new MsgItem();
            mi.ID = ushort.Parse(msg.Element("id").Value, System.Globalization.NumberStyles.HexNumber);
            mi.Name = msg.Element("name").Value;
            string tmp = msg.Element("filter").Value.ToLower();
            if (tmp == "true")
            {
                mi.Filter = true;
            }
            else
            {
                mi.Filter = false;
            }
            mi.Core = int.Parse(msg.Element("core").Value);
            mi.FilterChangedEvent += MsgItemFilterChanged;
            return mi;
        }

        private void MsgItemFilterChanged(object sender, bool filter)
        {
            if (doc == null)
            {
                return;
            }
            MsgItem mi = sender as MsgItem;
            if (mi == null)
	        {
                return;
	        }
            XElement root = doc.Element("ArrayOfMsg");
            XElement le = root.Elements("msg").First(x =>
            {
                return x.Element("name").Value == mi.Name;
            });
            le.Element("filter").Value = filter.ToString();
            doc.Save(Properties.Resources.MsgConfPath);
        }


        public DelegateCommand SelectAllCommand { get; set; }
        public DelegateCommand CancelAllCommand { get; set; }
        public DelegateCommand FilterCommand { get; set; }

        private void SelectAllExecuted()
        {
            foreach (var item in _BaseNameCollection)
            {
                item.Filter = true;
            }
        }

        private void CancelAllExecuted()
        {
            foreach (var item in _BaseNameCollection)
            {
                item.Filter = false;
            }
        }

        private void FilterExecuted()
        {
            List<ushort> msgids = new List<ushort>();
            foreach (var item in _BaseNameCollection)
	        {
                foreach (var msgitem in item.MsgItems)
	            {
                    if (msgitem.Filter)
                    {
                        msgids.Add(msgitem.ID);
                    }
                    
	            }
	        }
            this._protocolService.FilterMsg(msgids.ToArray());
        }
    }


}
