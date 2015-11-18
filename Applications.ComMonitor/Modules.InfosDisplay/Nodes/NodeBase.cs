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
        private IEventAggregator _eventAggregator;
        protected override void OnMouseDoubleClick(System.Windows.Input.MouseButtonEventArgs e)
        {
            CommNode cn = this.DataContext as CommNode;
            _eventAggregator.GetEvent<SelNodeEvent>().Publish(cn);
            base.OnMouseDoubleClick(e);

        }

        public NodeBase()
        {
            _eventAggregator= ServiceLocator.Current.GetInstance<IEventAggregator>();
        }

        private bool _mouseCaptured = false;
        private Point _previousMouse;

        protected override void OnMouseRightButtonDown(MouseButtonEventArgs e)
        {
            base.OnMouseRightButtonDown(e);
            this.Focus(); // Make sure we get the keyboard
            if (this.CaptureMouse())
            {
                this.Cursor = Cursors.ScrollAll;
                _mouseCaptured = true;
                _previousMouse = e.GetPosition(null);
                var element = (FrameworkElement)this;
                if (e.ClickCount == 1)
                {
                    var timer = new System.Timers.Timer(500);
                    timer.AutoReset = false;
                    timer.Elapsed += new ElapsedEventHandler((o, ex) => element.Dispatcher.Invoke(new Action(() =>
                    {
                        var timer2 = (System.Timers.Timer)element.Tag;
                        timer2.Stop();
                        timer2.Dispose();
                        //单击
                    })));
                    timer.Start();
                    element.Tag = timer;
                }
                if (e.ClickCount > 1)
                {
                    var timer = element.Tag as System.Timers.Timer;
                    if (timer != null)
                    {
                        timer.Stop();
                        timer.Dispose();
                        //UIElement_DoubleClick(e);
                    }
                }
            }

            //base.OnMouseRightButtonDown(e);
            //this.Focus(); // Make sure we get the keyboard
            //if (this.CaptureMouse())
            //{
            //    _mouseCaptured = true;
            //    _previousMouse = e.GetPosition(this.Parent as FrameworkElement);
            //}
        }

        protected override void OnMouseRightButtonUp(MouseButtonEventArgs e)
        {
            base.OnMouseRightButtonUp(e);
            this.ReleaseMouseCapture();
            _mouseCaptured = false;
        }

        /// <summary>Drags the map, if the mouse was succesfully captured.</summary>
        /// <param name="e">The MouseEventArgs that contains the event data.</param>
        protected override void OnMouseMove(MouseEventArgs e)
        {
            base.OnMouseMove(e);
            if (_mouseCaptured)
            {
                Point position = e.GetPosition(this.Parent as FrameworkElement);
                _previousMouse = position;
                MapCanvas mc = this.Parent as MapCanvas;
                position = mc.GetLocation(position);
                MapCanvas.SetLatitude(this, position.Y);
                MapCanvas.SetLongitude(this, position.X);
                //this.SetValue(MapCanvas.LongitudeProperty, (object)position.X);
                //this.Longitude = position.X;
                //this.Latitude = position.Y;
            }
        }
    }
}
