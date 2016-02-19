using Commons.Infrastructure.Models;
using Hazelor.MapCtrl;
using Microsoft.Practices.Prism.PubSubEvents;
using Microsoft.Practices.ServiceLocation;
using Modules.InfosDisplay.Event;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Timers;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;

namespace Modules.InfosDisplay.Nodes
{
    public enum NodeType
    {
        Aircraft = 0,
        Boat = 1,
        Vehicle = 2,
    }

    public class NodeBase : MapFrameElement
    {
        protected IEventAggregator _eventAggregator;
        protected override void OnMouseDoubleClick(System.Windows.Input.MouseButtonEventArgs e)
        {
            CommNode cn = this.DataContext as CommNode;
            _eventAggregator.GetEvent<SelNodeEvent>().Publish(cn);
            base.OnMouseDoubleClick(e);

        }
        public static void OnMouseLeftButtonDown(object sender, MouseButtonEventArgs e)
        {
            NodeBase nb = sender as NodeBase;
            if (nb!=null)
            {
                CommNode cn = nb.DataContext as CommNode;
                nb._eventAggregator.GetEvent<SelNodeEvent>().Publish(cn);
                nb._mouseCaptured = true;
                nb.CaptureMouse();
 
            }
            
        }


        public static void OnMouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            NodeBase nb = sender as NodeBase;
            if (nb != null)
            {
                
                nb.ReleaseMouseCapture();
                nb._mouseCaptured = false;
            }
            
        }
        
        //protected override void OnMouseUp(MouseButtonEventArgs e)
        //{
        //    base.OnMouseUp(e);
        //    this.ReleaseMouseCapture();
        //    _mouseCaptured = false;
            
        //}
        //protected override void OnMouseLeftButtonUp(MouseButtonEventArgs e)
        //{
            
        //    base.OnMouseLeftButtonUp(e);
        //}
        Delegate MouseLeftDownHandler = new MouseButtonEventHandler(NodeBase.OnMouseLeftButtonDown);
        Delegate MouseLeftUpHandler = new MouseButtonEventHandler(NodeBase.OnMouseLeftButtonUp);
        Delegate MouseMoveHandler = new MouseEventHandler(NodeBase.OnMouseMove);

        private bool _IsAddedHandler = false;
        public override bool IsCanDrag
        {
            get
            {
                return this._IsCanDrag;
            }
            set
            {
                this._IsCanDrag = value;
                if (this._IsCanDrag && !_IsAddedHandler)
                {
                    this.AddHandler(UIElement.MouseLeftButtonDownEvent, MouseLeftDownHandler);
                    this.AddHandler(UIElement.MouseLeftButtonUpEvent, MouseLeftUpHandler);
                    this.AddHandler(UIElement.MouseMoveEvent, MouseMoveHandler);
                    _IsAddedHandler = true;
                }
                else
                {
                    this.RemoveHandler(UIElement.MouseLeftButtonDownEvent, MouseLeftDownHandler);
                    this.RemoveHandler(UIElement.MouseLeftButtonUpEvent, MouseLeftUpHandler);
                    this.RemoveHandler(UIElement.MouseMoveEvent, MouseMoveHandler);
                    _IsAddedHandler = false;
                }
            }
        }
        public NodeBase()
        {
            this.IsCanDrag = false;
            _eventAggregator= ServiceLocator.Current.GetInstance<IEventAggregator>();
            _eventAggregator.GetEvent<SelNodeEvent>().Subscribe(OnSelectedNodeChanged);
            //this.AddHandler(UserControl.MouseLeftButtonUpEvent, new MouseButtonEventHandler(SelfMouseLeftButtonUp), true);
        }

        protected virtual void OnSelectedNodeChanged(CommNode cn)
        {
        }

        
        

        private bool _mouseCaptured = false;
        private Point _previousMouse;


        /// <summary>Drags the map, if the mouse was succesfully captured.</summary>
        /// <param name="e">The MouseEventArgs that contains the event data.</param>
        public static void OnMouseMove(object sender, MouseEventArgs e)
        {
            NodeBase nb = sender as NodeBase;

            if (nb!=null && nb._mouseCaptured)
            {
                try
                {
                    FrameworkElement f = nb.Parent as FrameworkElement;
                    if (f!= null)
                    {
                        Point position = e.GetPosition(f);
                        nb._previousMouse = position;
                        MapCanvas mc = nb.Parent as MapCanvas;
                        if (mc != null && mc.IsCanDrag == false)
                        {
                            position = mc.GetLocation(position);
                            MapCanvas.SetLatitude(nb, position.Y);
                            MapCanvas.SetLongitude(nb, position.X);
                        }
                        
                    }
                    
                }
                catch(Exception m)
                {

                }
               
            }
        }
    }
}
