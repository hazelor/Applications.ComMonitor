﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Commons.Infrastructure.Interactions
{
    public class GenericViewModel<T> : IGenericViewModel<T>
    {
        public T Entity
        {
            get;
            set;
        }

        public void SetEntity(T entity)
        {
            this.Entity = entity;
            this.OnPropertyChanged("Entity");
        }

        public T GetEntity()
        {
            return this.Entity;
        }

        public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;

        public void OnPropertyChanged(string property)
        {
            if (this.PropertyChanged != null)
                this.PropertyChanged(this, new PropertyChangedEventArgs(property));
        }
    }
}