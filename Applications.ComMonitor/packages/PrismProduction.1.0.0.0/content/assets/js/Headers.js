var Headers = {
  "1": {
    "dmlop": "IUD",
    "cols": [
      {
        "dtype": "int",
        "edit": "False",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "eopt": "roles",
        "etype": "sselect",
        "len": "50"
      },
      {
        "dtype": "decimal",
        "edit_rules": {
          "type": "nonegative"
        }
      },
      {
        "dtype": "decimal",
        "edit_rules": {
          "type": "nonegative"
        }
      },
      {
        "dtype": "decimal",
        "edit_rules": {
          "type": "nonegative"
        }
      },
      {
        "dtype": "decimal",
        "edit_rules": {
          "type": "nonegative"
        }
      }
    ]
  },
  "10": {
    "dmlop": "IUD",
    "grid_attrib": {
      "remove_lkup_list": [
        "depot"
      ]
    },
    "cols": [
      {
        "dtype": "int",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "edit_rules": {
          "maxlength": "3"
        },
        "len": "3",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "len": "50",
        "nul": "0"
      },
      {
        "eopt": "depot",
        "etype": "sselect",
        "len": "10",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "len": "-1"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      },
      {
        "s_fld_idx": "3"
      }
    ]
  },
  "11": {
    "dmlop": "IUD",
    "frm_attrib": {
      "form_load": "GetDealerName(qid,null)",
      "offlineCallType": "DealerQuery"
    },
    "grid_attrib": {
      "custom_menu_item_click": "GetVisitId(qid,1)",
      "RenderGridForcefully": true,
      "after_grid_load": "GetDealerName(qid,data)",
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "int",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "defvalue": "cur_visit_id",
        "dtype": "int",
        "edit": "False",
        "hide": "1",
        "nul": "0"
      },
      {
        "defvalue": "date:today",
        "dtype": "date",
        "edit": "False"
      },
      {
        "dtype": "int",
        "eopt": "dealer_complaint",
        "etype": "sselect"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "len": "-1"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "len": "-1"
      },
      {
        "defvalue": "1",
        "dtype": "int",
        "eopt": "complain_status",
        "etype": "sselect"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      }
    ],
    "isForm": "True"
  },
  "111": {
    "grid_attrib": {
      "data_fld_cnt": "5",
      "after_grid_load": "SearchDashboard(qid,data)"
    },
    "cols": [
      {
        "eopt": "zone_region_depot",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "len": "10"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "isInitialCall": "false",
          "pcfld": "0|1|2"
        },
        "len": "10"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "len": "10"
      },
      {
        "hide": "1",
        "len": "-1"
      },
      {
        "dtype": "numeric"
      },
      {
        "len": "10"
      },
      {
        "hide": "1",
        "len": "-1"
      },
      {
        "dtype": "date",
        "etype": "Quatermonth",
        "frm_options": {
          "qmfld": "8"
        }
      },
      {
        "dtype": "date",
        "hide": "1"
      },
      {
        "eopt": "payment_mode",
        "etype": "sselect",
        "hide": "1",
        "len": "-1"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      }
    ],
    "sfilters": [
      {
        "isCompulsory": "True",
        "s_fld_idx": "7"
      },
      {
        "s_fld_idx": "0"
      },
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      },
      {
        "s_fld_idx": "9"
      }
    ]
  },
  "112": {
    "dmlop": "IUD",
    "frm_attrib": {
      "form_load": "SetProjectId(qid)",
      "offlineCallType": "Default"
    },
    "grid_attrib": {
      "custom_menu_item_click": "GetProjectVisit(qid)",
      "RenderGridForcefully": true,
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "defvalue": "cur_visit_id",
        "dtype": "bigint",
        "edit": "False",
        "hide": "1",
        "nul": "0",
        "pscol": "19"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "15"
        },
        "eopt": "project_id_name",
        "etype": "sselect",
        "hide": "0",
        "len": "15",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "stage_construction",
        "etype": "sselect",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "brand",
        "etype": "sselect",
        "hide": "0",
        "nul": "0"
      },
      {
        "defvalue": "date:today",
        "dtype": "date",
        "frm_options": {
          "disable_future": "true"
        },
        "hide": "01"
      },
      {
        "defvalue": "sl_login_attr:EmpCode",
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "20"
        },
        "hide": "01",
        "len": "20"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "type": "Address"
        },
        "etype": "textarea",
        "hide": "0",
        "len": "-1"
      }
    ],
    "isForm": "True"
  },
  "113": {
    "dmlop": "IUD",
    "grid_attrib": {
      "LocalIUD": true,
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "defvalue": "cur_visit_id",
        "dtype": "bigint",
        "edit": "False",
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "int",
        "edit": "False",
        "hide": "0"
      },
      {
        "dtype": "int",
        "eopt": "lead_status",
        "etype": "sselect",
        "hide": "0"
      },
      {
        "defvalue": "date:today",
        "dtype": "date",
        "hide": "01"
      },
      {
        "defvalue": "sl_login_attr:EmpCode",
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "20"
        },
        "hide": "01",
        "len": "20"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "fldevent": "change:changeInfluencerFollowup()",
        "hide": "0"
      },
      {
        "dtype": "date",
        "hide": "0"
      },
      {
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "0",
        "len": "100"
      }
    ]
  },
  "114": {
    "dmlop": "IUD",
    "cols": [
      {
        "dtype": "bigint",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "dtype": "nvarchar",
        "eopt": "dealer",
        "etype": "sselect",
        "len": "30"
      },
      {
        "dtype": "date"
      },
      {
        "dtype": "numeric"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio"
      },
      {
        "dtype": "numeric"
      },
      {
        "dtype": "date"
      },
      {
        "dtype": "int"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      }
    ]
  },
  "115": {
    "grid_attrib": {
      "data_fld_cnt": "7"
    },
    "cols": [
      {
        "edit_rules": {
          "maxlength": "5"
        },
        "len": "5",
        "nul": "0"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "40"
        },
        "hide": "1",
        "len": "40",
        "nul": "0"
      }
    ]
  },
  "116": {
    "grid_attrib": {
      "data_fld_cnt": "8",
      "after_grid_load": "AddBalance(qid,data)",
      "refresh": false
    },
    "cols": [
      {
        "dtype": "int"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "date",
        "etype": "Quatermonth",
        "frm_options": {
          "qmfld": "9"
        },
        "nul": "0"
      },
      {
        "dtype": "date",
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "40"
        },
        "eopt": "empcode_csr",
        "etype": "sselect",
        "hide": "1",
        "len": "40",
        "nul": "0"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "8"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "10"
      }
    ]
  },
  "117": {
    "dmlop": "IUD",
    "cols": [
      {
        "dtype": "bigint",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "40"
        },
        "len": "40",
        "nul": "0"
      },
      {
        "dtype": "date",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "500"
        },
        "len": "500"
      },
      {
        "dtype": "time"
      },
      {
        "dtype": "time"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      }
    ]
  },
  "118": {
    "dmlop": "IUD",
    "cols": [
      {
        "dtype": "int",
        "nul": "0"
      },
      {
        "dtype": "bigint",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "20"
        },
        "len": "20",
        "nul": "0"
      },
      {
        "dtype": "int",
        "nul": "0"
      },
      {
        "dtype": "time"
      },
      {
        "dtype": "time"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "100"
        },
        "len": "100",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "500"
        },
        "len": "500"
      },
      {
        "edit_rules": {
          "maxlength": "100"
        },
        "len": "100"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      }
    ]
  },
  "12": {
    "dmlop": "IUD",
    "grid_attrib": {
      "remove_lkup_list": [
        "depot"
      ]
    },
    "cols": [
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10",
        "nul": "0",
        "pscol": "19"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "len": "50",
        "nul": "0"
      },
      {
        "eopt": "depot",
        "etype": "sselect",
        "len": "10",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "len": "-1"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "0"
      },
      {
        "op": "cn",
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      }
    ]
  },
  "120": {
    "grid_attrib": {
      "data_fld_cnt": "5"
    },
    "cols": [
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      },
      {
        "edit_rules": {
          "maxlength": "12"
        },
        "len": "12"
      },
      {
        "dtype": "bigint"
      },
      {
        "dtype": "bigint"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "int",
        "eopt": "calendar_month",
        "etype": "sselect",
        "frm_options": {
          "client_sort": "false"
        },
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "calendar_year",
        "etype": "sselect",
        "hide": "1",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "hide": "1",
        "len": "50",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "20"
        },
        "len": "20"
      },
      {
        "edit_rules": {
          "maxlength": "12"
        },
        "len": "12"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "5"
      },
      {
        "s_fld_idx": "6"
      },
      {
        "s_fld_idx": "7"
      }
    ]
  },
  "1205": {
    "dmlop": "IUD",
    "frm_attrib": {
      "offlineCallType": "Default"
    },
    "grid_attrib": {
      "custom_menu_item_click": "GetCustomerContactProgram(qid)",
      "RenderGridForcefully": true,
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "bigint",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "len": "50",
        "nul": "0"
      },
      {
        "dtype": "date",
        "nul": "0"
      },
      {
        "eopt": "infuencer",
        "etype": "sselect",
        "frm_options": {
          "type": "multiselect"
        },
        "len": "200",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "len": "50",
        "nul": "0"
      },
      {
        "eopt": "depotwise",
        "etype": "sselect",
        "len": "10",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "len": "-1"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      },
      {
        "s_fld_idx": "5"
      }
    ],
    "isForm": "True"
  },
  "121": {
    "dmlop": "IUD",
    "grid_attrib": {
      "remove_lkup_list": [
        "zone_region_depot"
      ]
    },
    "cols": [
      {
        "dtype": "int",
        "hide": "1",
        "nul": "0",
        "pscol": "19"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "0",
        "len": "100",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "50",
          "type": "address"
        },
        "hide": "01",
        "len": "50",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "10"
        },
        "hide": "01",
        "len": "10",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "0",
        "len": "100"
      },
      {
        "defvalue": "CSR",
        "edit": "False",
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "0",
        "len": "100",
        "nul": "0"
      },
      {
        "eopt": "zone_region_depot",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "6|7|8"
        },
        "hide": "01",
        "len": "10"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "isInitialCall": "false",
          "pcfld": "6|7|8"
        },
        "hide": "01",
        "len": "4"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "6|7|8"
        },
        "hide": "01",
        "len": "10",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "10",
          "type": "mobile"
        },
        "hide": "01",
        "len": "15"
      },
      {
        "dtype": "varcharauto",
        "eopt": "empcoderole",
        "etype": "sselect",
        "frm_options": {
          "type": "autocomplete"
        },
        "hide": "01",
        "nul": "0"
      },
      {
        "edit_rules": {
          "type": "email"
        },
        "hide": "01",
        "len": "255",
        "nul": "0"
      },
      {
        "dtype": "date",
        "frm_options": {
          "disable_future": "true"
        },
        "hide": "01"
      },
      {
        "edit_rules": {
          "maxlength": "20"
        },
        "len": "20"
      },
      {
        "edit_rules": {
          "maxlength": "200"
        },
        "len": "200"
      },
      {
        "edit_rules": {
          "type": "pincode"
        },
        "len": "8"
      },
      {
        "edit_rules": {
          "maxlength": "20"
        },
        "eopt": "userstatus",
        "etype": "sselect",
        "hide": "0",
        "len": "20",
        "nul": "0"
      }
    ]
  },
  "1211": {
    "frm_attrib": {
      "form_load": "SetLeadId(qid)",
      "offlineCallType": "Default"
    },
    "grid_attrib": {
      "custom_menu_item_click": "GetLeadVisit(qid)",
      "RenderGridForcefully": true,
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "defvalue": "cur_visit_id",
        "dtype": "bigint",
        "edit": "False",
        "hide": "1",
        "nul": "0",
        "pscol": "19"
      },
      {
        "dtype": "int",
        "edit": "False",
        "eopt": "lead_id_name",
        "etype": "sselect",
        "hide": "0"
      },
      {
        "dtype": "int",
        "eopt": "lead_status",
        "etype": "sselect",
        "hide": "0"
      },
      {
        "defvalue": "date:today",
        "dtype": "date",
        "frm_options": {
          "disable_future": "true"
        },
        "hide": "0"
      },
      {
        "defvalue": "sl_login_attr:EmpCode",
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "20"
        },
        "hide": "01",
        "len": "20"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "0"
      },
      {
        "dtype": "date",
        "hide": "0"
      },
      {
        "edit_rules": {
          "maxlength": "100"
        },
        "etype": "textarea",
        "hide": "0",
        "len": "100"
      }
    ],
    "isForm": "True"
  },
  "1213": {
    "dmlop": "IUD",
    "grid_attrib": {
      "before_grid_load": "HideGPSLink(qid)",
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "15"
        },
        "hide": "01",
        "len": "15",
        "nul": "0",
        "pscol": "19"
      },
      {
        "dtype": "int",
        "edit": "False",
        "hide": "01"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "hide": "0",
        "len": "50",
        "nul": "0"
      },
      {
        "edit_rules": {
          "type": "Address"
        },
        "etype": "textarea",
        "hide": "01",
        "len": "100"
      },
      {
        "dtype": "numeric",
        "hide": "0"
      },
      {
        "dtype": "int",
        "eopt": "lead_type",
        "etype": "sselect",
        "hide": "0"
      },
      {
        "dtype": "int",
        "eopt": "work_type",
        "etype": "sselect",
        "hide": "0"
      },
      {
        "dtype": "int",
        "eopt": "brand",
        "etype": "sselect",
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "hide": "01"
      },
      {
        "dtype": "numeric",
        "hide": "01"
      },
      {
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "01",
        "len": "100"
      },
      {
        "eopt": "depotwise",
        "etype": "sselect",
        "hide": "01",
        "len": "10",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "lead_status",
        "etype": "sselect",
        "fldevent": "change:changeLeadStatus()",
        "hide": "0"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "sselect",
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "follow_by",
        "etype": "sselect",
        "hide": "01"
      },
      {
        "dtype": "numeric",
        "hide": "01"
      },
      {
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "01",
        "len": "100"
      },
      {
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "01",
        "len": "100"
      },
      {
        "defvalue": "date:today",
        "dtype": "date",
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "frm_options": {
          "custom": "SetResetGPSLink",
          "isExptoExl": "false"
        },
        "hide": "10",
        "len": "50",
        "pscol": "16"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "0"
      },
      {
        "s_fld_idx": "2"
      },
      {
        "s_fld_idx": "4"
      }
    ]
  },
  "1214": {
    "grid_attrib": {
      "data_fld_cnt": "5",
      "after_grid_load": "SearchDashboard(qid,data)"
    },
    "cols": [
      {
        "dtype": "nvarchar",
        "eopt": "zone_region_depot",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "etype": "pcselect",
        "frm_options": {
          "isInitialCall": "false",
          "pcfld": "0|1|2"
        },
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "len": "100"
      },
      {
        "dtype": "numeric"
      },
      {
        "dtype": "numeric"
      },
      {
        "dtype": "date",
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "date",
        "hide": "1",
        "nul": "0"
      },
      {
        "defvalue": "2",
        "eopt": "prism_brands",
        "etype": "sselect",
        "hide": "1",
        "len": "10",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      }
    ],
    "sfilters": [
      {
        "isCompulsory": "True",
        "s_fld_idx": "5"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "6"
      },
      {
        "s_fld_idx": "7"
      },
      {
        "s_fld_idx": "0"
      },
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      }
    ]
  },
  "1215": {
    "dmlop": "IUD",
    "grid_attrib": {
      "sort_column": [
        [
          7,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "int"
      },
      {
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "len": "200"
      },
      {
        "dtype": "nvarchar",
        "len": "200"
      },
      {
        "dtype": "nvarchar",
        "len": "200"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "datetime"
      }
    ]
  },
  "1216": {
    "dmlop": "IUD",
    "cols": [
      {
        "dtype": "int",
        "hide": "1",
        "nul": "0"
      },
      {
        "eopt": "sp_cf",
        "etype": "radio",
        "fldevent": "change:GetSPandCF()",
        "len": "5"
      },
      {
        "etype": "sselect",
        "len": "20",
        "nul": "0"
      },
      {
        "dtype": "date",
        "frm_options": {
          "disable_future": "true"
        },
        "nul": "0"
      },
      {
        "dtype": "int",
        "edit_rules": {
          "type": "rating"
        }
      },
      {
        "dtype": "int",
        "edit_rules": {
          "type": "rating"
        }
      },
      {
        "dtype": "int",
        "edit_rules": {
          "type": "rating"
        }
      },
      {
        "dtype": "int",
        "edit_rules": {
          "type": "rating"
        }
      },
      {
        "dtype": "int",
        "edit_rules": {
          "type": "rating"
        }
      }
    ]
  },
  "1217": {
    "grid_attrib": {
      "data_fld_cnt": "6",
      "after_grid_load": "SearchDashboard(qid,data)"
    },
    "cols": [
      {
        "dtype": "nvarchar",
        "eopt": "zone_region_depot",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "etype": "pcselect",
        "frm_options": {
          "isInitialCall": "false",
          "pcfld": "0|1|2"
        },
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "len": "30",
        "nul": "0"
      },
      {
        "dtype": "int",
        "nul": "0"
      },
      {
        "dtype": "int",
        "nul": "0"
      },
      {
        "len": "50"
      },
      {
        "len": "100"
      },
      {
        "dtype": "date",
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "date",
        "hide": "1",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      }
    ],
    "sfilters": [
      {
        "isCompulsory": "True",
        "s_fld_idx": "8"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "9"
      },
      {
        "s_fld_idx": "0"
      },
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      },
      {
        "s_fld_idx": "3"
      }
    ]
  },
  "1218": {
    "dmlop": "IUD",
    "cols": [
      {
        "dtype": "int",
        "hide": "1",
        "nul": "0",
        "pscol": "19"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "0",
        "len": "100",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "50",
          "type": "address"
        },
        "hide": "01",
        "len": "50",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "10"
        },
        "eopt": "dealer_code",
        "etype": "sselect",
        "fldevent": "change:GetDealerNameFromCode()",
        "hide": "01",
        "len": "10",
        "nul": "0"
      },
      {
        "edit": "False",
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "0",
        "len": "100"
      },
      {
        "defvalue": "DEALER",
        "edit": "False",
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "0",
        "len": "100",
        "nul": "0"
      },
      {
        "edit": "False",
        "eopt": "zone",
        "etype": "sselect",
        "hide": "01",
        "len": "10"
      },
      {
        "edit": "False",
        "eopt": "region",
        "etype": "sselect",
        "hide": "01",
        "len": "4"
      },
      {
        "edit": "False",
        "eopt": "depot",
        "etype": "sselect",
        "hide": "01",
        "len": "10",
        "nul": "0"
      },
      {
        "edit_rules": {
          "type": "address"
        },
        "hide": "01",
        "len": "15"
      },
      {
        "eopt": "empcoderole",
        "etype": "sselect",
        "frm_options": {
          "type": "autocomplete"
        },
        "hide": "1",
        "len": "10"
      },
      {
        "edit_rules": {
          "type": "email"
        },
        "hide": "01",
        "len": "255",
        "nul": "0"
      },
      {
        "dtype": "date",
        "frm_options": {
          "disable_future": "true"
        },
        "hide": "01"
      },
      {
        "len": "20"
      },
      {
        "edit_rules": {
          "maxlength": "200"
        },
        "len": "200"
      },
      {
        "len": "8"
      },
      {
        "edit_rules": {
          "maxlength": "20"
        },
        "eopt": "userstatus",
        "etype": "sselect",
        "hide": "0",
        "len": "20",
        "nul": "0"
      }
    ]
  },
  "1219": {
    "dmlop": "IUD",
    "grid_attrib": {
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "bigint",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "defvalue": "date:today",
        "dtype": "date",
        "edit": "False",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "influencer_empcodewise",
        "etype": "sselect",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "fldevent": "change:InfluencerMet()",
        "nul": "0"
      },
      {
        "dtype": "int",
        "edit_rules": {
          "maxlength": "9",
          "type": "nonegative"
        }
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "len": "-1"
      },
      {
        "defvalue": "sl_login_attr:EmpCode",
        "dtype": "nvarchar",
        "edit": "False",
        "eopt": "empData",
        "etype": "sselect",
        "hide": "1",
        "len": "50"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      }
    ]
  },
  "122": {
    "frm_attrib": {
      "form_load": "GetDealerId(qid)"
    },
    "grid_attrib": {
      "data_fld_cnt": "5",
      "after_grid_load": "AddBalance(qid,data)",
      "refresh": false
    },
    "cols": [
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      },
      {
        "dtype": "decimal",
        "hide": "10"
      },
      {
        "dtype": "decimal",
        "hide": "10"
      },
      {
        "dtype": "decimal",
        "hide": "10"
      },
      {
        "dtype": "decimal",
        "hide": "10"
      },
      {
        "defvalue": "2",
        "dtype": "nvarchar",
        "eopt": "prism_brand",
        "etype": "sselect",
        "hide": "1",
        "len": "100",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "20"
        },
        "eopt": "dealer_code",
        "etype": "sselect",
        "hide": "1",
        "len": "20",
        "nul": "0"
      },
      {
        "defvalue": "date:today",
        "dtype": "date",
        "hide": "1",
        "nul": "0"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "5"
      },
      {
        "s_fld_idx": "6"
      },
      {
        "s_fld_idx": "7"
      }
    ]
  },
  "1220": {
    "dmlop": "IUD",
    "grid_attrib": {
      "custom_menu_item_click": "GenerateSubordinateLocationReport()"
    },
    "cols": [
      {
        "dtype": "int"
      },
      {
        "dtype": "numeric"
      },
      {
        "dtype": "numeric"
      },
      {
        "dtype": "date"
      },
      {
        "dtype": "nvarchar",
        "eopt": "empData",
        "etype": "sselect",
        "len": "50",
        "nul": "0"
      }
    ]
  },
  "1221": {
    "dmlop": "IUD",
    "grid_attrib": {
      "dialog_header": [
        "Visit Id"
      ],
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "bigint",
        "edit": "False",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "dtype": "int",
        "edit": "False",
        "frm_options": {
          "submenu": "105_1326"
        },
        "nul": "0",
        "pscol": "19"
      },
      {
        "edit": "False",
        "edit_rules": {
          "maxlength": "6"
        },
        "eopt": "empData",
        "etype": "sselect",
        "len": "15",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "eopt": "dealer_code",
        "etype": "sselect",
        "len": "15"
      },
      {
        "dtype": "date",
        "edit": "False",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "dealer_complaint",
        "etype": "sselect"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "len": "-1"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "len": "-1"
      }
    ]
  },
  "1222": {
    "formtype": "tabs",
    "dmlop": "IUD",
    "formgroups": [
      [
        0,
        1,
        2,
        3,
        4,
        9
      ],
      [
        10,
        11,
        12,
        13
      ],
      [
        5,
        6,
        7,
        8
      ]
    ],
    "grid_attrib": {
      "refresh": false,
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "int",
        "edit": "False",
        "hide": "1",
        "nul": "0",
        "pscol": "19"
      },
      {
        "dtype": "int",
        "eopt": "pop_material_display",
        "etype": "sselect",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "pop_material_display",
        "etype": "sselect",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "pop_material_display",
        "etype": "sselect",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "pop_material_display",
        "etype": "sselect",
        "nul": "0"
      },
      {
        "dtype": "upload",
        "frm_options": {
          "change_error_container": "true",
          "custom": "DownloadImg",
          "FileExtensions": "txt|xls|pdf|doc|docx|jpg|png|jpeg|ico",
          "isExptoExl": "false",
          "isMultipleUpload": "true",
          "showPreview": "false"
        },
        "hide": "01"
      },
      {
        "dtype": "upload",
        "frm_options": {
          "change_error_container": "true",
          "custom": "DownloadImg",
          "FileExtensions": "txt|xls|pdf|doc|docx|jpg|png|jpeg|ico",
          "isExptoExl": "false",
          "isMultipleUpload": "true",
          "showPreview": "false"
        },
        "hide": "01"
      },
      {
        "dtype": "upload",
        "frm_options": {
          "change_error_container": "true",
          "custom": "DownloadImg",
          "FileExtensions": "txt|xls|pdf|doc|docx|jpg|png|jpeg|ico",
          "isExptoExl": "false",
          "isMultipleUpload": "true",
          "showPreview": "false"
        },
        "hide": "01"
      },
      {
        "dtype": "upload",
        "frm_options": {
          "change_error_container": "true",
          "custom": "DownloadImg",
          "FileExtensions": "txt|xls|pdf|doc|docx|jpg|png|jpeg|ico",
          "isExptoExl": "false",
          "isMultipleUpload": "true",
          "showPreview": "false"
        },
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "pop_material_display",
        "etype": "sselect",
        "nul": "0"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "nvarchar",
        "hide": "1",
        "len": "50",
        "nul": "0",
        "pscol": "61"
      },
      {
        "dtype": "date",
        "hide": "1",
        "nul": "0",
        "pscol": "60"
      }
    ]
  },
  "1223": {
    "dmlop": "IUD",
    "grid_attrib": {
      "refresh": false,
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "bigint",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "dtype": "int",
        "edit": "False",
        "hide": "1",
        "nul": "0"
      },
      {
        "defvalue": "2",
        "dtype": "int",
        "eopt": "prism_brand",
        "etype": "sselect",
        "nul": "0"
      },
      {
        "dtype": "int",
        "edit_rules": {
          "maxlength": "9",
          "type": "nonegative"
        },
        "nul": "0"
      },
      {
        "dtype": "money",
        "edit_rules": {
          "type": "nonegative"
        },
        "frm_options": {
          "custom_bootstrap_validator": "CheckValue()"
        },
        "nul": "0"
      },
      {
        "dtype": "money",
        "edit_rules": {
          "type": "nonegative"
        },
        "frm_options": {
          "custom_bootstrap_validator": "CheckValue()"
        },
        "nul": "0"
      }
    ]
  },
  "1224": {
    "dmlop": "IUD",
    "grid_attrib": {
      "refresh": false,
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "int",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "defvalue": "date:today",
        "dtype": "date",
        "frm_options": {
          "disable_future": "true"
        },
        "nul": "0"
      },
      {
        "defvalue": "sl_login_attr:DepotCode",
        "eopt": "depotdealer",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "2|3"
        },
        "len": "10",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "2|3"
        },
        "len": "-1"
      },
      {
        "dtype": "int",
        "eopt": "brand",
        "etype": "sselect",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        },
        "frm_options": {
          "custom_bootstrap_validator": "CheckValue()"
        },
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        },
        "frm_options": {
          "custom_bootstrap_validator": "CheckValue()"
        },
        "nul": "0"
      },
      {
        "dtype": "int",
        "edit_rules": {
          "maxlength": "9",
          "type": "onlynumbers"
        },
        "frm_options": {
          "custom_bootstrap_validator": "CheckValue()"
        },
        "nul": "0"
      },
      {
        "defvalue": "sl_login_attr:EmpCode",
        "dtype": "nvarchar",
        "edit": "False",
        "eopt": "empData",
        "etype": "sselect",
        "len": "-1"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "2"
      },
      {
        "s_fld_idx": "4"
      }
    ]
  },
  "1225": {
    "dmlop": "IUD",
    "grid_attrib": {
      "refresh": false,
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "int",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "dtype": "int",
        "edit": "False",
        "hide": "1",
        "nul": "0"
      },
      {
        "defvalue": "date:today",
        "dtype": "date",
        "edit": "False"
      },
      {
        "dtype": "int",
        "eopt": "dealer_complaint",
        "etype": "sselect"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "len": "-1"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "len": "-1"
      },
      {
        "defvalue": "1",
        "dtype": "int",
        "eopt": "complain_status",
        "etype": "sselect"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      }
    ]
  },
  "1226": {
    "grid_attrib": {
      "data_fld_cnt": "6",
      "sort_column": [
        [
          5,
          "desc"
        ]
      ],
      "column_sum": "6"
    },
    "cols": [
      {
        "dtype": "nvarchar",
        "eopt": "zone_region_depot",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "len": "-1"
      },
      {
        "len": "27",
        "nul": "0"
      },
      {
        "dtype": "date"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "date",
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "date",
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "screen",
        "etype": "sselect",
        "hide": "1",
        "nul": "0"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "0"
      },
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "6"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "7"
      },
      {
        "s_fld_idx": "8"
      }
    ]
  },
  "123": {
    "frm_attrib": {
      "form_load": "GetDealerId(qid)"
    },
    "grid_attrib": {
      "data_fld_cnt": "6",
      "after_grid_load": "AddBalance(qid,data)"
    },
    "cols": [
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      },
      {
        "dtype": "datetime"
      },
      {
        "edit_rules": {
          "maxlength": "20"
        },
        "len": "20"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "100"
        },
        "len": "100"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      },
      {
        "dtype": "date",
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "date",
        "hide": "1",
        "nul": "0"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "7"
      },
      {
        "s_fld_idx": "8"
      },
      {
        "s_fld_idx": "0"
      }
    ]
  },
  "124": {
    "grid_attrib": {
      "data_fld_cnt": "8"
    },
    "cols": [
      {
        "dtype": "int",
        "eopt": "calendar_month",
        "etype": "sselect",
        "frm_options": {
          "client_sort": "false"
        },
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "calendar_year",
        "etype": "sselect",
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "20"
        },
        "hide": "1",
        "len": "20",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "hide": "1",
        "len": "10"
      },
      {
        "edit_rules": {
          "maxlength": "100"
        },
        "len": "100"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "datetime",
        "hide": "1"
      },
      {
        "edit_rules": {
          "maxlength": "20"
        },
        "hide": "1",
        "len": "20"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "100"
        },
        "len": "100"
      },
      {
        "dtype": "nchar",
        "hide": "1"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      },
      {
        "dtype": "datetime",
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "int",
        "hide": "1",
        "nul": "0"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "0"
      },
      {
        "s_fld_idx": "8"
      }
    ]
  },
  "125": {
    "grid_attrib": {
      "data_fld_cnt": "17"
    },
    "cols": [
      {
        "dtype": "datetime",
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "datetime",
        "hide": "1",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "15"
        },
        "hide": "1",
        "len": "15",
        "nul": "0"
      },
      {
        "dtype": "bigint",
        "hide": "1",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "hide": "1",
        "len": "10"
      },
      {
        "dtype": "date"
      },
      {
        "edit_rules": {
          "maxlength": "2"
        },
        "len": "2"
      },
      {
        "edit_rules": {
          "maxlength": "15"
        },
        "hide": "1",
        "len": "15"
      },
      {
        "edit_rules": {
          "maxlength": "4"
        },
        "hide": "1",
        "len": "4"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      },
      {
        "edit_rules": {
          "maxlength": "18"
        },
        "len": "18"
      },
      {
        "edit_rules": {
          "maxlength": "2"
        },
        "len": "2"
      },
      {
        "dtype": "date"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "edit_rules": {
          "maxlength": "1"
        },
        "hide": "1",
        "len": "1"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "char"
      },
      {
        "dtype": "decimal"
      },
      {
        "edit_rules": {
          "maxlength": "18"
        },
        "len": "18"
      },
      {
        "edit_rules": {
          "maxlength": "16"
        },
        "hide": "1",
        "len": "16"
      },
      {
        "edit_rules": {
          "maxlength": "2"
        },
        "hide": "1",
        "len": "2"
      },
      {
        "edit_rules": {
          "maxlength": "4"
        },
        "hide": "1",
        "len": "4"
      },
      {
        "dtype": "numeric",
        "hide": "1"
      },
      {
        "edit_rules": {
          "maxlength": "18"
        },
        "hide": "1",
        "len": "18"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "hide": "1",
        "len": "10"
      },
      {
        "dtype": "datetime",
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "datetime",
        "hide": "1",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "15"
        },
        "hide": "1",
        "len": "15",
        "nul": "0"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "18"
      },
      {
        "s_fld_idx": "19"
      },
      {
        "s_fld_idx": "2"
      }
    ]
  },
  "126": {
    "dmlop": "UD",
    "grid_attrib": {
      "grid_template": "ViewMessageUI(qid)",
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "int",
        "hide": "1",
        "nul": "0",
        "pscol": "19"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "50"
        },
        "eopt": "empall",
        "etype": "sselect",
        "len": "50",
        "nul": "0"
      },
      {
        "dtype": "int",
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "1000"
        },
        "hide": "1",
        "len": "1000",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "1000"
        },
        "len": "1000",
        "nul": "0"
      },
      {
        "dtype": "date",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "1000"
        },
        "len": "1000",
        "nul": "0"
      },
      {
        "dtype": "int",
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "int",
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "1000"
        },
        "len": "1000",
        "nul": "0"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "5"
      },
      {
        "s_fld_idx": "4"
      },
      {
        "s_fld_idx": "1"
      }
    ]
  },
  "127": {
    "frm_attrib": {
      "form_load": "GetDealerId(qid)"
    },
    "grid_attrib": {
      "data_fld_cnt": "6",
      "after_grid_load": "AddBalance(qid,data)",
      "refresh": false
    },
    "cols": [
      {
        "edit_rules": {
          "maxlength": "100"
        },
        "len": "100"
      },
      {
        "len": "50"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "20"
        },
        "eopt": "dealer_code",
        "etype": "sselect",
        "hide": "1",
        "len": "20",
        "nul": "0"
      },
      {
        "dtype": "date",
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "date",
        "hide": "1",
        "nul": "0"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "7"
      },
      {
        "s_fld_idx": "8"
      },
      {
        "s_fld_idx": "6"
      }
    ]
  },
  "128": {
    "frm_attrib": {
      "form_load": "GetDealerId(qid)"
    },
    "grid_attrib": {
      "data_fld_cnt": "5",
      "after_grid_load": "AddBalance(qid,data)",
      "refresh": false
    },
    "cols": [
      {
        "edit_rules": {
          "maxlength": "20"
        },
        "len": "20"
      },
      {
        "edit_rules": {
          "maxlength": "12"
        },
        "len": "12"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "edit": "False",
        "edit_rules": {
          "maxlength": "50"
        },
        "eopt": "dealer_code",
        "etype": "sselect",
        "hide": "1",
        "len": "50",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "depot_calendar",
        "etype": "sselect",
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "calendar_month",
        "etype": "sselect",
        "frm_options": {
          "client_sort": "false"
        },
        "hide": "1",
        "nul": "0"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "5"
      },
      {
        "s_fld_idx": "6"
      },
      {
        "s_fld_idx": "7"
      }
    ]
  },
  "129": {
    "frm_attrib": {
      "form_load": "GetDealerId(qid)"
    },
    "grid_attrib": {
      "data_fld_cnt": "11",
      "after_grid_load": "AddBalance(qid,data)",
      "refresh": false
    },
    "cols": [
      {
        "len": "30"
      },
      {
        "edit_rules": {
          "maxlength": "2"
        },
        "len": "2"
      },
      {
        "edit_rules": {
          "maxlength": "4"
        },
        "len": "4"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      },
      {
        "edit_rules": {
          "maxlength": "18"
        },
        "len": "18"
      },
      {
        "dtype": "decimal"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "len": "50"
      },
      {
        "len": "20"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "edit_rules": {
          "maxlength": "15"
        },
        "eopt": "dealer_code",
        "etype": "sselect",
        "hide": "1",
        "len": "15",
        "nul": "0"
      },
      {
        "dtype": "date",
        "frm_options": {
          "date": "10",
          "disable_future": "true"
        },
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "date",
        "hide": "1",
        "nul": "0"
      },
      {
        "defvalue": "1",
        "eopt": "ledger_type",
        "etype": "radio",
        "hide": "1",
        "len": "10",
        "nul": "0"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "11"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "13"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "12"
      },
      {
        "s_fld_idx": "14"
      }
    ]
  },
  "13": {
    "dmlop": "IUD",
    "grid_attrib": {
      "remove_lkup_list": [
        "region"
      ]
    },
    "cols": [
      {
        "edit_rules": {
          "maxlength": "10",
          "type": "depotcode"
        },
        "len": "10",
        "nul": "0",
        "pscol": "19"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "len": "50",
        "nul": "0"
      },
      {
        "eopt": "region",
        "etype": "sselect",
        "len": "4",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "len": "-1"
      }
    ],
    "sfilters": [
      {
        "op": "cn",
        "s_fld_idx": "0"
      },
      {
        "op": "cn",
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      }
    ]
  },
  "131": {
    "grid_attrib": {
      "data_fld_cnt": "6",
      "after_grid_load": "SearchDashboard(qid,data)"
    },
    "cols": [
      {
        "dtype": "nvarchar",
        "eopt": "zone_region_depot",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "len": "20"
      },
      {
        "dtype": "nvarchar",
        "etype": "pcselect",
        "frm_options": {
          "isInitialCall": "false",
          "pcfld": "0|1|2"
        },
        "len": "20"
      },
      {
        "dtype": "nvarchar",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "len": "20"
      },
      {
        "hide": "1",
        "len": "-1",
        "nul": "0"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "hide": "1",
        "len": "-1",
        "nul": "0"
      },
      {
        "hide": "1",
        "len": "-1",
        "nul": "0"
      },
      {
        "dtype": "date",
        "etype": "Quatermonth",
        "frm_options": {
          "qmfld": "9",
          "sync_fld": "10"
        },
        "nul": "0"
      },
      {
        "dtype": "date",
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "date",
        "etype": "Quatermonth",
        "frm_options": {
          "qmfld": "11"
        },
        "nul": "0"
      },
      {
        "dtype": "date",
        "hide": "1",
        "nul": "0"
      },
      {
        "eopt": "payment_mode",
        "etype": "sselect",
        "hide": "1",
        "len": "50",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      }
    ],
    "sfilters": [
      {
        "isCompulsory": "True",
        "s_fld_idx": "8"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "10"
      },
      {
        "s_fld_idx": "0"
      },
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      },
      {
        "s_fld_idx": "12"
      }
    ]
  },
  "132": {
    "grid_attrib": {
      "data_fld_cnt": "6",
      "after_grid_load": "SearchDashboard(qid,data)"
    },
    "cols": [
      {
        "dtype": "nvarchar",
        "eopt": "zone_region_depot",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "len": "20"
      },
      {
        "dtype": "nvarchar",
        "etype": "pcselect",
        "frm_options": {
          "isInitialCall": "false",
          "pcfld": "0|1|2"
        },
        "len": "20"
      },
      {
        "dtype": "nvarchar",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "len": "20"
      },
      {
        "hide": "1",
        "len": "-1",
        "nul": "0"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "nvarchar",
        "len": "-1",
        "nul": "0"
      },
      {
        "len": "-1",
        "nul": "0"
      },
      {
        "dtype": "date",
        "etype": "Quatermonth",
        "frm_options": {
          "qmfld": "9",
          "sync_fld": "10"
        },
        "nul": "0"
      },
      {
        "dtype": "date",
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "date",
        "etype": "Quatermonth",
        "frm_options": {
          "qmfld": "11"
        },
        "nul": "0"
      },
      {
        "dtype": "date",
        "hide": "1",
        "nul": "0"
      },
      {
        "defvalue": "2",
        "eopt": "prism_brands",
        "etype": "sselect",
        "hide": "1",
        "len": "-1",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      }
    ],
    "sfilters": [
      {
        "isCompulsory": "True",
        "s_fld_idx": "8"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "10"
      },
      {
        "s_fld_idx": "0"
      },
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      },
      {
        "s_fld_idx": "12"
      }
    ]
  },
  "133": {
    "grid_attrib": {
      "data_fld_cnt": "6",
      "after_grid_load": "SearchDashboard(qid,data)"
    },
    "cols": [
      {
        "dtype": "nvarchar",
        "eopt": "zone_region_depot",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "len": "20"
      },
      {
        "dtype": "nvarchar",
        "etype": "pcselect",
        "frm_options": {
          "isInitialCall": "false",
          "pcfld": "0|1|2"
        },
        "len": "20"
      },
      {
        "dtype": "nvarchar",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "len": "20"
      },
      {
        "eopt": "dealer_code",
        "etype": "sselect",
        "hide": "1",
        "len": "-1",
        "nul": "0"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "hide": "1",
        "len": "-1",
        "nul": "0"
      },
      {
        "hide": "1",
        "len": "-1",
        "nul": "0"
      },
      {
        "dtype": "date",
        "etype": "Quatermonth",
        "frm_options": {
          "qmfld": "9"
        },
        "nul": "0"
      },
      {
        "dtype": "date",
        "hide": "1",
        "nul": "0"
      },
      {
        "eopt": "payment_mode",
        "etype": "sselect",
        "hide": "1",
        "len": "50",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      }
    ],
    "sfilters": [
      {
        "isCompulsory": "True",
        "s_fld_idx": "8"
      },
      {
        "s_fld_idx": "0"
      },
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      },
      {
        "s_fld_idx": "10"
      }
    ]
  },
  "134": {
    "grid_attrib": {
      "data_fld_cnt": "6",
      "after_grid_load": "SearchDashboard(qid,data)"
    },
    "cols": [
      {
        "dtype": "nvarchar",
        "eopt": "zone_region_depot",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "len": "20"
      },
      {
        "dtype": "nvarchar",
        "etype": "pcselect",
        "frm_options": {
          "isInitialCall": "false",
          "pcfld": "0|1|2"
        },
        "len": "20"
      },
      {
        "dtype": "nvarchar",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "len": "20"
      },
      {
        "dtype": "nvarchar",
        "hide": "1",
        "len": "15"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "nvarchar",
        "hide": "1",
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "hide": "1",
        "len": "100"
      },
      {
        "dtype": "date",
        "etype": "Quatermonth",
        "frm_options": {
          "qmfld": "9"
        },
        "nul": "0"
      },
      {
        "dtype": "date",
        "hide": "1",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      }
    ],
    "sfilters": [
      {
        "isCompulsory": "True",
        "s_fld_idx": "8"
      },
      {
        "s_fld_idx": "0"
      },
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      }
    ]
  },
  "136": {
    "grid_attrib": {
      "data_fld_cnt": "21",
      "after_grid_load": "AddBalance(qid,data)",
      "header2": [
        [
          "",
          "3"
        ],
        [
          "Monthwise Sale Analysis",
          "3"
        ],
        [
          "Weekly Sale Analysis",
          "4"
        ],
        [
          "Dealer Category Sale Analysis",
          "4"
        ],
        [
          "Outstanding",
          "2"
        ],
        [
          "Collection Efficiency",
          "2"
        ],
        [
          "Logistic Efficiency",
          "2"
        ],
        [
          "",
          "1"
        ]
      ]
    },
    "cols": [
      {
        "eopt": "zone_region_depot",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "hide": "0",
        "len": "10"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "isInitialCall": "false",
          "pcfld": "0|1|2"
        },
        "hide": "0",
        "len": "10"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "hide": "0",
        "len": "10"
      },
      {
        "dtype": "decimal",
        "hide": "10",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "hide": "10",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "hide": "10",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "hide": "10",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "hide": "10",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "hide": "10",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "hide": "10",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "hide": "10",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "hide": "10",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "hide": "10",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "hide": "10",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "hide": "10",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "hide": "10",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "hide": "10",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "hide": "10",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "hide": "10",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "hide": "10",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "hide": "10",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "20"
        },
        "hide": "1",
        "len": "20",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "depot_calendar",
        "etype": "sselect",
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "calendar_month",
        "etype": "sselect",
        "frm_options": {
          "client_sort": "false"
        },
        "hide": "1",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      }
    ],
    "sfilters": [
      {
        "isCompulsory": "True",
        "s_fld_idx": "23"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "22"
      },
      {
        "s_fld_idx": "0"
      },
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      }
    ],
    "QueryOption": "Transpose,4,5"
  },
  "137": {
    "dmlop": "IUD",
    "cols": [
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "50"
        },
        "len": "50"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "50"
        },
        "len": "50"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "len": "500"
      },
      {
        "dtype": "nchar",
        "edit": "False"
      },
      {
        "dtype": "numeric",
        "frm_options": {
          "custom_bootstrap_validator": "GORBValues()"
        }
      },
      {
        "dtype": "numeric",
        "frm_options": {
          "custom_bootstrap_validator": "GORBValues()"
        }
      },
      {
        "dtype": "numeric",
        "frm_options": {
          "custom_bootstrap_validator": "GORBValues()"
        }
      },
      {
        "dtype": "numeric",
        "frm_options": {
          "custom_bootstrap_validator": "GORBValues()"
        }
      },
      {
        "dtype": "int",
        "hide": "1",
        "nul": "0",
        "pscol": "19"
      }
    ],
    "sfilters": [
      {
        "op": "cn",
        "s_fld_idx": "0"
      }
    ]
  },
  "139": {
    "dmlop": "IUD",
    "cols": [
      {
        "eopt": "dealer_code",
        "etype": "sselect",
        "len": "10",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "calendar_month",
        "etype": "sselect",
        "frm_options": {
          "client_sort": "false"
        },
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "calendar_year",
        "etype": "sselect",
        "nul": "0"
      },
      {
        "dtype": "nchar"
      },
      {
        "dtype": "numeric",
        "nul": "0"
      },
      {
        "dtype": "money",
        "nul": "0"
      },
      {
        "dtype": "int",
        "hide": "1",
        "nul": "0",
        "pscol": "19"
      }
    ]
  },
  "142": {
    "dmlop": "U",
    "frm_attrib": {
      "form_load": "SetRakeNo(qid)",
      "postDMLRefresh": "PostProcessOperation(qid)"
    },
    "grid_attrib": {
      "refresh": false
    },
    "cols": [
      {
        "dtype": "bigint",
        "hide": "1",
        "pscol": "2"
      },
      {
        "edit_rules": {
          "maxlength": "20"
        },
        "hide": "1",
        "len": "20"
      },
      {
        "edit_rules": {
          "maxlength": "15"
        },
        "eopt": "prism_brands",
        "etype": "sselect",
        "len": "15",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "onlynumbers"
        }
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "onlynumbers"
        }
      },
      {
        "edit_rules": {
          "maxlength": "20"
        },
        "len": "20"
      },
      {
        "edit_rules": {
          "maxlength": "20"
        },
        "len": "20"
      },
      {
        "dtype": "date"
      },
      {
        "edit_rules": {
          "maxlength": "20"
        },
        "len": "20"
      },
      {
        "dtype": "date"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "onlynumbers"
        }
      },
      {
        "edit_rules": {
          "maxlength": "20"
        },
        "len": "20"
      }
    ]
  },
  "143": {
    "dmlop": "U",
    "frm_attrib": {
      "form_load": "SetRakeNo(qid)",
      "postDMLRefresh": "PostProcessOperation(qid)"
    },
    "grid_attrib": {
      "refresh": false
    },
    "cols": [
      {
        "dtype": "bigint",
        "hide": "1",
        "pscol": "2"
      },
      {
        "edit_rules": {
          "maxlength": "20"
        },
        "hide": "1",
        "len": "20",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "edit_rules": {
          "type": "nonegative"
        }
      },
      {
        "dtype": "decimal",
        "edit_rules": {
          "type": "nonegative"
        }
      },
      {
        "dtype": "decimal",
        "edit_rules": {
          "type": "nonegative"
        }
      },
      {
        "dtype": "decimal",
        "edit_rules": {
          "type": "nonegative"
        }
      },
      {
        "dtype": "decimal",
        "edit_rules": {
          "type": "nonegative"
        }
      },
      {
        "dtype": "int",
        "edit_rules": {
          "maxlength": "9",
          "type": "onlynumbers"
        }
      },
      {
        "dtype": "int",
        "eopt": "calendar_year",
        "etype": "sselect"
      },
      {
        "dtype": "decimal",
        "edit_rules": {
          "type": "nonegative"
        }
      }
    ]
  },
  "144": {
    "dmlop": "I",
    "frm_attrib": {
      "AddMsg": "Message sent successfully",
      "form_load": "ClearScreen()",
      "OnlyForm": "true",
      "Save": "Send Message"
    },
    "cols": [
      {
        "dtype": "int",
        "hide": "1",
        "nul": "0",
        "pscol": "19"
      },
      {
        "defvalue": "2",
        "dtype": "int",
        "eopt": "message_type",
        "etype": "sselect",
        "fldevent": "change:changeMessageType(event)",
        "nul": "0"
      },
      {
        "defvalue": "sl_login_attr:EmpCode",
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "50"
        },
        "eopt": "logedincode",
        "etype": "sselect",
        "len": "50"
      },
      {
        "defvalue": "date:today",
        "dtype": "date",
        "edit": "False"
      },
      {
        "dtype": "nvarchar",
        "eopt": "emp_active",
        "etype": "sselect",
        "frm_options": {
          "type": "multiselect"
        },
        "len": "-1",
        "nul": "0"
      },
      {
        "defvalue": "sl_login_attr:EmpCode",
        "dtype": "nvarchar",
        "hide": "1",
        "len": "-1"
      },
      {
        "defvalue": "date:today+1",
        "dtype": "date",
        "frm_options": {
          "disable_past": "true"
        },
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "len": "-1",
        "nul": "0"
      },
      {
        "dtype": "upload",
        "frm_options": {
          "change_error_container": "true",
          "custom": "DownloadImg",
          "FileExtensions": "txt|xls|pdf|doc|docx|jpg|png|jpeg|ico",
          "isExptoExl": "false",
          "isMultipleUpload": "true",
          "showPreview": "false"
        }
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "type": "Address"
        },
        "etype": "textarea",
        "frm_options": {
          "class": "hi70"
        },
        "len": "-1",
        "nul": "0"
      },
      {
        "dtype": "int",
        "hide": "1"
      },
      {
        "dtype": "int",
        "hide": "1"
      }
    ],
    "isForm": "True"
  },
  "145": {
    "grid_attrib": {
      "data_fld_cnt": "8",
      "after_grid_load": "AddBalance(qid,data)",
      "refresh": false
    },
    "cols": [
      {
        "eopt": "zone_region_depot",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "len": "-1",
        "nul": "0"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "len": "-1",
        "nul": "0"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "len": "-1",
        "nul": "0"
      },
      {
        "len": "-1",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "40"
        },
        "len": "40"
      },
      {
        "edit_rules": {
          "maxlength": "100"
        },
        "len": "100"
      },
      {
        "dtype": "numeric",
        "hide": "10"
      },
      {
        "hide": "1",
        "len": "-1",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "calendar_month",
        "etype": "sselect",
        "frm_options": {
          "client_sort": "false"
        },
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "calendar_year",
        "etype": "sselect",
        "hide": "1",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "8"
      },
      {
        "s_fld_idx": "9"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "0"
      },
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      }
    ]
  },
  "146": {
    "grid_attrib": {
      "data_fld_cnt": "11",
      "after_grid_load": "AddBalance(qid,data)",
      "header2": [
        [
          "",
          "2"
        ],
        [
          "Trade",
          "3"
        ],
        [
          "NonTrade",
          "3"
        ],
        [
          "Total",
          "3"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "int",
        "hide": "0"
      },
      {
        "dtype": "int",
        "hide": "0"
      },
      {
        "dtype": "decimal",
        "hide": "0"
      },
      {
        "dtype": "decimal",
        "hide": "0"
      },
      {
        "dtype": "decimal",
        "hide": "0"
      },
      {
        "dtype": "decimal",
        "hide": "0"
      },
      {
        "dtype": "decimal",
        "hide": "0"
      },
      {
        "dtype": "decimal",
        "hide": "0"
      },
      {
        "dtype": "decimal",
        "hide": "0"
      },
      {
        "dtype": "decimal",
        "hide": "0"
      },
      {
        "dtype": "decimal",
        "hide": "0"
      },
      {
        "eopt": "zone_region_depot",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "11|12|13"
        },
        "hide": "1",
        "len": "-1",
        "nul": "0"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "isInitialCall": "false",
          "pcfld": "11|12|13"
        },
        "hide": "1",
        "len": "-1",
        "nul": "0"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "11|12|13"
        },
        "hide": "1",
        "len": "-1",
        "nul": "0"
      },
      {
        "hide": "1",
        "len": "-1",
        "nul": "0"
      },
      {
        "dtype": "date",
        "etype": "Quatermonth",
        "frm_options": {
          "qmfld": "16"
        },
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "date",
        "etype": "Quatermonth",
        "hide": "1",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "15"
      },
      {
        "s_fld_idx": "11"
      },
      {
        "s_fld_idx": "12"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "13"
      }
    ],
    "QueryOption": "Transpose,4,5"
  },
  "147": {
    "grid_attrib": {
      "data_fld_cnt": "12",
      "after_grid_load": "AddBalance(qid,data)"
    },
    "cols": [
      {
        "eopt": "zone_region_depot",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "len": "10"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "isInitialCall": "false",
          "pcfld": "0|1|2"
        },
        "len": "4"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "len": "10"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "len": "50"
      },
      {
        "edit_rules": {
          "maxlength": "500"
        },
        "len": "500"
      },
      {
        "dtype": "numeric"
      },
      {
        "dtype": "numeric"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "date"
      },
      {
        "edit_rules": {
          "maxlength": "100"
        },
        "len": "100"
      },
      {
        "dtype": "bigint"
      },
      {
        "dtype": "bigint"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      }
    ],
    "sfilters": [
      {
        "isCompulsory": "True",
        "s_fld_idx": "0"
      },
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      },
      {
        "s_fld_idx": "3"
      }
    ]
  },
  "148": {
    "grid_attrib": {
      "data_fld_cnt": "14",
      "after_grid_load": "AddBalance(qid,data)"
    },
    "cols": [
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "eopt": "zone_region_depot",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "len": "10",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "4"
        },
        "etype": "pcselect",
        "frm_options": {
          "isInitialCall": "false",
          "pcfld": "0|1|2"
        },
        "len": "4",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "len": "10"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "30"
        },
        "eopt": "dealer_code",
        "etype": "sselect",
        "len": "30",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "100"
        },
        "len": "100"
      },
      {
        "edit_rules": {
          "maxlength": "8"
        },
        "len": "8"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "int"
      },
      {
        "edit_rules": {
          "maxlength": "3"
        },
        "len": "3"
      },
      {
        "dtype": "numeric",
        "nul": "0"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "numeric"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "int",
        "eopt": "calendar_month",
        "etype": "sselect",
        "frm_options": {
          "client_sort": "false"
        },
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "calendar_year",
        "etype": "sselect",
        "hide": "1",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      }
    ],
    "sfilters": [
      {
        "isCompulsory": "True",
        "s_fld_idx": "14"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "15"
      },
      {
        "s_fld_idx": "0"
      },
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      },
      {
        "s_fld_idx": "3"
      }
    ]
  },
  "149": {
    "dmlop": "IUD",
    "frm_attrib": {
      "cust_buttons": "CustomSAPButton(qid)",
      "custom_save": "SaveCreditLimit(params,qid)",
      "form_load": "SetPartyCode(qid)"
    },
    "grid_attrib": {
      "custom_menu_item_click": "GetVisitDealerIdForCollection(qid)",
      "after_grid_load": "GetDealerName(qid,data)",
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "bigint",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "edit": "False",
        "hide": "0",
        "len": "50"
      },
      {
        "dtype": "nvarchar",
        "eopt": "bank_code",
        "etype": "sselect",
        "hide": "01",
        "len": "40",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "eopt": "dealer_code",
        "etype": "sselect",
        "hide": "0",
        "len": "30",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "type": "Address"
        },
        "hide": "0",
        "len": "200",
        "nul": "0"
      },
      {
        "dtype": "char",
        "eopt": "payment_mode",
        "etype": "sselect",
        "fldevent": "change:onTransactionTypeChange()",
        "hide": "0",
        "nul": "0"
      },
      {
        "edit": "False",
        "edit_rules": {
          "maxlength": "4"
        },
        "hide": "01",
        "len": "4"
      },
      {
        "eopt": "collection_dd_type",
        "etype": "sselect",
        "hide": "0",
        "len": "20"
      },
      {
        "edit_rules": {
          "type": "nonegative"
        },
        "hide": "01",
        "len": "20",
        "nul": "0"
      },
      {
        "edit_rules": {
          "type": "nonegative"
        },
        "hide": "1",
        "len": "20"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "hide": "01",
        "len": "50",
        "nul": "0"
      },
      {
        "dtype": "date",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "date",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "date",
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        },
        "hide": "0",
        "nul": "0"
      },
      {
        "edit_rules": {
          "type": "nonegative"
        },
        "hide": "01",
        "len": "10",
        "nul": "0"
      }
    ]
  },
  "15": {
    "dmlop": "IUD",
    "cols": [
      {
        "dtype": "int",
        "nul": "0"
      },
      {
        "dtype": "int",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "15"
        },
        "len": "15",
        "nul": "0"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "int"
      }
    ]
  },
  "150": {
    "grid_attrib": {
      "data_fld_cnt": "14",
      "after_grid_load": "AddBalance(qid,data)",
      "header2": [
        [
          "",
          "2"
        ],
        [
          "Week 1 (1-7)",
          "3"
        ],
        [
          "Week 2 (8-15)",
          "3"
        ],
        [
          "Week 3 (16-23)",
          "3"
        ],
        [
          "Last Week",
          "3"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "int",
        "hide": "0"
      },
      {
        "dtype": "int",
        "hide": "0"
      },
      {
        "dtype": "decimal",
        "hide": "0"
      },
      {
        "dtype": "decimal",
        "hide": "0"
      },
      {
        "dtype": "decimal",
        "hide": "0"
      },
      {
        "dtype": "decimal",
        "hide": "0"
      },
      {
        "dtype": "decimal",
        "hide": "0"
      },
      {
        "dtype": "decimal",
        "hide": "0"
      },
      {
        "dtype": "decimal",
        "hide": "0"
      },
      {
        "dtype": "decimal",
        "hide": "0"
      },
      {
        "dtype": "decimal",
        "hide": "0"
      },
      {
        "dtype": "decimal",
        "hide": "0"
      },
      {
        "dtype": "decimal",
        "hide": "0"
      },
      {
        "dtype": "decimal",
        "hide": "0"
      },
      {
        "eopt": "zone_region_depot",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "14|15|16"
        },
        "hide": "1",
        "len": "-1",
        "nul": "0"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "isInitialCall": "false",
          "pcfld": "14|15|16"
        },
        "hide": "1",
        "len": "-1",
        "nul": "0"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "14|15|16"
        },
        "hide": "1",
        "len": "-1",
        "nul": "0"
      },
      {
        "hide": "1",
        "len": "-1",
        "nul": "0"
      },
      {
        "dtype": "date",
        "etype": "Quatermonth",
        "frm_options": {
          "qmfld": "19"
        },
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "date",
        "etype": "Quatermonth",
        "hide": "1",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "18"
      },
      {
        "s_fld_idx": "14"
      },
      {
        "s_fld_idx": "15"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "16"
      }
    ],
    "QueryOption": "Transpose,4,5"
  },
  "151": {
    "grid_attrib": {
      "data_fld_cnt": "17",
      "after_grid_load": "AddBalance(qid,data)",
      "header2": [
        [
          "",
          "2"
        ],
        [
          "Category A (NCR > 3000)",
          "3"
        ],
        [
          "Category B (NCR > 2800)",
          "3"
        ],
        [
          "Category C (NCR > 2600)",
          "3"
        ],
        [
          "Category D (NCR > 2500)",
          "3"
        ],
        [
          "Non Viable (NCR < 2500)",
          "3"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "int",
        "hide": "0"
      },
      {
        "dtype": "int",
        "hide": "0"
      },
      {
        "dtype": "numeric",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "hide": "0",
        "nul": "0"
      },
      {
        "eopt": "zone_region_depot",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "17|18|19"
        },
        "hide": "1",
        "len": "-1",
        "nul": "0"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "isInitialCall": "false",
          "pcfld": "17|18|19"
        },
        "hide": "1",
        "len": "-1",
        "nul": "0"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "17|18|19"
        },
        "hide": "1",
        "len": "-1",
        "nul": "0"
      },
      {
        "dtype": "date",
        "etype": "Quatermonth",
        "frm_options": {
          "qmfld": "21"
        },
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "date",
        "etype": "Quatermonth",
        "hide": "1",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "20"
      },
      {
        "s_fld_idx": "17"
      },
      {
        "s_fld_idx": "18"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "19"
      }
    ],
    "QueryOption": "Transpose,4,5"
  },
  "152": {
    "dmlop": "IUD",
    "frm_attrib": {
      "form_load": "SetRakeNo(qid)",
      "postDMLRefresh": "PostProcessOperation(qid)"
    },
    "grid_attrib": {
      "refresh": false
    },
    "cols": [
      {
        "dtype": "bigint",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "dtype": "bigint",
        "hide": "1"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        }
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        }
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        }
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        }
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        }
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        }
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        }
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        }
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        }
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        }
      }
    ]
  },
  "156": {
    "dmlop": "IUD",
    "frm_attrib": {
      "Cancel": "Reset"
    },
    "grid_attrib": {
      "LocalIUD": true
    },
    "cols": [
      {
        "dtype": "int",
        "edit": "False"
      },
      {
        "dtype": "int",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "edit_rules": {
          "type": "Address"
        },
        "etype": "textarea",
        "len": "100",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "controls",
        "etype": "sselect",
        "nul": "0"
      },
      {
        "edit_rules": {
          "type": "Address"
        },
        "etype": "textarea",
        "len": "500"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "int"
      },
      {
        "eopt": "yes_no",
        "etype": "radio",
        "len": "10",
        "nul": "0"
      }
    ]
  },
  "157": {
    "dmlop": "IUD",
    "grid_attrib": {
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "ChildInfo": {
      "156": [
        {
          "par_fld": "0",
          "ch_fld": "0"
        }
      ]
    },
    "cols": [
      {
        "dtype": "int",
        "edit": "False",
        "nul": "0",
        "pscol": "2"
      },
      {
        "eopt": "roles",
        "etype": "sselect",
        "len": "200"
      },
      {
        "etype": "textarea",
        "len": "50"
      },
      {
        "dtype": "date",
        "nul": "0"
      },
      {
        "dtype": "date",
        "nul": "0"
      }
    ]
  },
  "159": {
    "dmlop": "IUD",
    "grid_attrib": {
      "CustChild": "GetSurveyDetailsQs(qid,row_no)",
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "int",
        "hide": "1",
        "nul": "0",
        "pscol": "19"
      },
      {
        "defvalue": "sl_login_attr:EmpCode",
        "edit": "False",
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      },
      {
        "dtype": "int",
        "eopt": "survey_person_type",
        "etype": "sselect",
        "fldevent": "change:getonchangeperson(event)",
        "nul": "0"
      },
      {
        "edit": "False",
        "edit_rules": {
          "maxlength": "50"
        },
        "len": "50"
      },
      {
        "etype": "sselect",
        "fldevent": "change:getpersonId()",
        "frm_options": {
          "isInitialCall": "false"
        },
        "len": "100"
      },
      {
        "edit_rules": {
          "type": "mobile"
        },
        "len": "20"
      },
      {
        "edit_rules": {
          "type": "email"
        },
        "len": "20"
      },
      {
        "defvalue": "sl_login_attr:DepotCode",
        "edit": "False",
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      },
      {
        "dtype": "date",
        "frm_options": {
          "disable_future": "true"
        }
      }
    ]
  },
  "160": {
    "dmlop": "IUD",
    "cols": [
      {
        "dtype": "int",
        "nul": "0"
      },
      {
        "dtype": "int",
        "nul": "0"
      },
      {
        "dtype": "int"
      },
      {
        "edit_rules": {
          "maxlength": "500"
        },
        "len": "500"
      }
    ]
  },
  "161": {
    "dmlop": "IUD",
    "grid_attrib": {
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "int",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "dtype": "int",
        "edit": "False",
        "hide": "1",
        "nul": "0"
      },
      {
        "defvalue": "date:today",
        "dtype": "date"
      },
      {
        "dtype": "int",
        "eopt": "dealer_complaint",
        "etype": "sselect"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "len": "-1"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "len": "-1"
      },
      {
        "defvalue": "1",
        "dtype": "int",
        "eopt": "complain_status",
        "etype": "sselect"
      },
      {
        "defvalue": "sl_login_attr:EmpCode",
        "dtype": "nvarchar",
        "hide": "1",
        "len": "50"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      }
    ]
  },
  "163": {
    "grid_attrib": {
      "data_fld_cnt": "8",
      "after_grid_load": "AddBalance(qid,data)"
    },
    "cols": [
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      },
      {
        "edit_rules": {
          "maxlength": "4"
        },
        "len": "4"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      },
      {
        "edit_rules": {
          "maxlength": "200"
        },
        "len": "200"
      },
      {
        "dtype": "int",
        "nul": "0"
      },
      {
        "dtype": "int",
        "nul": "0"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "date",
        "etype": "Quatermonth",
        "frm_options": {
          "qmfld": "9"
        },
        "nul": "0"
      },
      {
        "dtype": "date",
        "hide": "1",
        "nul": "0"
      },
      {
        "eopt": "allempcode",
        "etype": "sselect",
        "hide": "1",
        "len": "10",
        "nul": "0"
      }
    ],
    "sfilters": [
      {
        "isCompulsory": "True",
        "s_fld_idx": "8"
      },
      {
        "s_fld_idx": "10"
      }
    ]
  },
  "164": {
    "grid_attrib": {
      "data_fld_cnt": "5",
      "after_grid_load": "AddBalance(qid,data)"
    },
    "cols": [
      {
        "dtype": "nvarchar",
        "eopt": "allempcode",
        "etype": "sselect",
        "len": "40"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "8000"
        },
        "len": "8000"
      },
      {
        "edit_rules": {
          "maxlength": "8"
        },
        "len": "8",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "8"
        },
        "len": "8",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "sselect",
        "nul": "0"
      },
      {
        "dtype": "date",
        "etype": "Quatermonth",
        "frm_options": {
          "qmfld": "6"
        },
        "nul": "0"
      },
      {
        "dtype": "date",
        "hide": "1",
        "nul": "0"
      }
    ],
    "sfilters": [
      {
        "isCompulsory": "True",
        "s_fld_idx": "0"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "5"
      }
    ]
  },
  "165": {
    "grid_attrib": {
      "data_fld_cnt": "3",
      "after_grid_load": "SearchDashboard(qid,data)"
    },
    "cols": [
      {
        "edit_rules": {
          "maxlength": "30"
        },
        "len": "30"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "date",
        "etype": "Quatermonth",
        "frm_options": {
          "qmfld": "4",
          "viewmon": "true"
        },
        "nul": "0"
      },
      {
        "dtype": "date",
        "hide": "1",
        "nul": "0"
      },
      {
        "eopt": "report_type",
        "etype": "sselect",
        "hide": "1",
        "len": "10",
        "nul": "0"
      },
      {
        "eopt": "zone_region_depot",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "6|7|8"
        },
        "hide": "1",
        "len": "10",
        "nul": "0"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "isInitialCall": "false",
          "pcfld": "6|7|8"
        },
        "hide": "1",
        "len": "10",
        "nul": "0"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "6|7|8"
        },
        "hide": "1",
        "len": "10",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      }
    ],
    "sfilters": [
      {
        "isCompulsory": "True",
        "s_fld_idx": "3"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "5"
      },
      {
        "s_fld_idx": "6"
      },
      {
        "s_fld_idx": "7"
      },
      {
        "s_fld_idx": "8"
      }
    ]
  },
  "166": {
    "grid_attrib": {
      "data_fld_cnt": "3",
      "refresh": false
    },
    "cols": [
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "hide": "0",
        "len": "50"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "hide": "0",
        "len": "50",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "15"
        },
        "hide": "0",
        "len": "15"
      },
      {
        "etype": "sselect",
        "hide": "1",
        "len": "50",
        "nul": "0"
      },
      {
        "defvalue": "date:today-dd(1)",
        "dtype": "date",
        "hide": "1",
        "nul": "0"
      },
      {
        "defvalue": "date:today",
        "dtype": "date",
        "hide": "1"
      },
      {
        "eopt": "depotwise",
        "etype": "sselect",
        "fldevent": "change:getVanlist(166)",
        "hide": "1",
        "len": "50"
      }
    ],
    "sfilters": [
      {
        "isCompulsory": "True",
        "s_fld_idx": "6"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "3"
      },
      {
        "s_fld_idx": "4"
      },
      {
        "s_fld_idx": "5"
      }
    ]
  },
  "167": {
    "grid_attrib": {
      "data_fld_cnt": "4"
    },
    "cols": [
      {
        "len": "50"
      },
      {
        "dtype": "datetime"
      },
      {
        "dtype": "datetime"
      },
      {
        "len": "20"
      },
      {
        "dtype": "decimal",
        "frm_options": {
          "custom": "ViewHaltPoint",
          "isExptoExl": "false"
        },
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "hide": "1",
        "nul": "0"
      },
      {
        "etype": "sselect",
        "hide": "1",
        "len": "50",
        "nul": "0"
      },
      {
        "defvalue": "date:today",
        "dtype": "date",
        "hide": "1"
      },
      {
        "eopt": "depotwise",
        "etype": "sselect",
        "fldevent": "change:getVanlist(167)",
        "hide": "1",
        "len": "50"
      },
      {
        "dtype": "int",
        "hide": "1",
        "nul": "0"
      }
    ],
    "sfilters": [
      {
        "isCompulsory": "True",
        "s_fld_idx": "8"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "6"
      },
      {
        "s_fld_idx": "7"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "9"
      }
    ]
  },
  "168": {
    "dmlop": "IUD",
    "grid_attrib": {
      "custom_menu_item_click": "GenerateRouteMovementReport()"
    },
    "cols": [
      {
        "dtype": "int"
      },
      {
        "dtype": "numeric"
      },
      {
        "dtype": "numeric"
      },
      {
        "dtype": "date"
      }
    ]
  },
  "169": {
    "grid_attrib": {
      "data_fld_cnt": "17",
      "after_grid_load": "AddBalance(qid,data)",
      "hide_update_icon": "true"
    },
    "cols": [
      {
        "eopt": "zone_region_depot",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "hide": "1",
        "len": "10",
        "nul": "0"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "isInitialCall": "false",
          "pcfld": "0|1|2"
        },
        "hide": "1",
        "len": "4",
        "nul": "0"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "hide": "1",
        "len": "10",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "hide": "1",
        "len": "10"
      },
      {
        "edit_rules": {
          "maxlength": "100"
        },
        "len": "100"
      },
      {
        "dtype": "numeric"
      },
      {
        "edit_rules": {
          "maxlength": "1"
        },
        "hide": "1",
        "len": "1"
      },
      {
        "dtype": "decimal"
      },
      {
        "edit_rules": {
          "maxlength": "1"
        },
        "hide": "1",
        "len": "1"
      },
      {
        "dtype": "numeric",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "1"
        },
        "hide": "1",
        "len": "1"
      },
      {
        "dtype": "decimal",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "1"
        },
        "hide": "1",
        "len": "1",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "1"
        },
        "hide": "1",
        "len": "1",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "calendar_month",
        "etype": "sselect",
        "frm_options": {
          "client_sort": "false"
        },
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "depot_calendar",
        "etype": "sselect",
        "hide": "1",
        "nul": "0"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "15"
      },
      {
        "s_fld_idx": "16"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "0"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      },
      {
        "s_fld_idx": "3"
      }
    ]
  },
  "170": {
    "dmlop": "IUD",
    "grid_attrib": {
      "custom_menu_item_click": "GenerateCurrentLocationReport()"
    },
    "cols": [
      {
        "dtype": "int"
      },
      {
        "dtype": "numeric"
      },
      {
        "dtype": "numeric"
      },
      {
        "dtype": "date"
      }
    ]
  },
  "171": {
    "grid_attrib": {
      "data_fld_cnt": "10",
      "after_grid_load": "AddBalance(qid,data)",
      "hide_update_icon": "true"
    },
    "cols": [
      {
        "eopt": "zone_region_depot",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "hide": "1",
        "len": "10"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "isInitialCall": "false",
          "pcfld": "0|1|2"
        },
        "hide": "1",
        "len": "4"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "hide": "1",
        "len": "10"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "30"
        },
        "len": "30"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "len": "50",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "hide": "10",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "hide": "10"
      },
      {
        "dtype": "decimal",
        "hide": "10",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "hide": "10",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "hide": "10",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "calendar_month",
        "etype": "sselect",
        "frm_options": {
          "client_sort": "false"
        },
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "depot_calendar",
        "etype": "sselect",
        "hide": "1",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      }
    ],
    "sfilters": [
      {
        "isCompulsory": "True",
        "s_fld_idx": "10"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "11"
      },
      {
        "s_fld_idx": "0"
      },
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      }
    ],
    "QueryOption": "Transpose,4,5"
  },
  "172": {
    "dmlop": "IUD",
    "cols": [
      {
        "dtype": "bigint",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "type": "Address"
        },
        "len": "512",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "type": "Address"
        },
        "len": "512",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "type": "Address"
        },
        "len": "512"
      },
      {
        "edit_rules": {
          "maxlength": "100"
        },
        "eopt": "roles",
        "etype": "sselect",
        "frm_options": {
          "type": "multiselect"
        },
        "len": "500"
      },
      {
        "dtype": "nvarchar",
        "eopt": "UserId_mdm",
        "etype": "sselect",
        "frm_options": {
          "type": "multiselect"
        },
        "len": "500"
      },
      {
        "dtype": "int",
        "hide": "1"
      },
      {
        "dtype": "int",
        "hide": "1"
      },
      {
        "dtype": "datetime",
        "hide": "1"
      },
      {
        "dtype": "datetime",
        "hide": "1"
      }
    ]
  },
  "173": {
    "dmlop": "IUD",
    "cols": [
      {
        "dtype": "bigint",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "edit_rules": {
          "type": "Address"
        },
        "len": "500",
        "nul": "0"
      },
      {
        "edit_rules": {
          "type": "Address"
        },
        "len": "-1"
      },
      {
        "dtype": "nvarchar",
        "eopt": "UserId_mdm",
        "etype": "sselect",
        "frm_options": {
          "type": "multiselect"
        },
        "len": "500"
      },
      {
        "eopt": "roles",
        "etype": "sselect",
        "frm_options": {
          "type": "multiselect"
        },
        "len": "500"
      },
      {
        "dtype": "int",
        "hide": "1"
      },
      {
        "dtype": "int",
        "hide": "1"
      },
      {
        "dtype": "datetime",
        "hide": "1"
      },
      {
        "dtype": "datetime",
        "hide": "1"
      }
    ]
  },
  "174": {
    "dmlop": "IUD",
    "cols": [
      {
        "dtype": "bigint",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "1000"
        },
        "len": "1000"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "100"
        },
        "len": "100"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "datetime"
      },
      {
        "dtype": "datetime"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "2"
        },
        "len": "2"
      }
    ]
  },
  "175": {
    "dmlop": "D",
    "frm_attrib": {
      "form_load": "SetDeviceID(qid)"
    },
    "grid_attrib": {
      "hide_update_icon": "true",
      "custom_menu_item_click": "MDMDeviceButtonClick(null,qid)"
    },
    "cols": [
      {
        "dtype": "bigint",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "512"
        },
        "frm_options": {
          "custom": "LogtextColorChange"
        },
        "len": "512"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "400"
        },
        "hide": "1",
        "len": "400"
      },
      {
        "dtype": "bigint",
        "hide": "1"
      },
      {
        "dtype": "datetime",
        "frm_options": {
          "date_range": "true"
        }
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "100"
        },
        "eopt": "mdm_activitycode",
        "etype": "sselect",
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "2"
        },
        "eopt": "activitytype",
        "etype": "sselect",
        "len": "2"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "2"
      },
      {
        "s_fld_idx": "4"
      }
    ]
  },
  "176": {
    "dmlop": "D",
    "frm_attrib": {
      "form_load": "SetDeviceID(qid)"
    },
    "grid_attrib": {
      "hide_update_icon": "true",
      "custom_menu_item_click": "MDMDeviceButtonClick(null,qid)"
    },
    "cols": [
      {
        "dtype": "int",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "400"
        },
        "hide": "1",
        "len": "400"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "4000"
        },
        "len": "4000"
      },
      {
        "dtype": "datetime",
        "frm_options": {
          "date_range": "true"
        }
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "3"
      }
    ]
  },
  "177": {
    "dmlop": "U",
    "frm_attrib": {
      "close_form_and_return": "true",
      "getRowData": "true"
    },
    "grid_attrib": {
      "custom_menu_item_click": "DeviceConfigPolicy(qid)"
    },
    "cols": [
      {
        "dtype": "bigint",
        "edit": "False",
        "nul": "0",
        "pscol": "2"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "200"
        },
        "len": "200"
      },
      {
        "dtype": "float",
        "edit_rules": {
          "type": "nonegative"
        }
      },
      {
        "dtype": "int",
        "edit_rules": {
          "type": "onlynumbers"
        }
      },
      {
        "dtype": "float",
        "edit_rules": {
          "type": "nonegative"
        }
      },
      {
        "dtype": "int",
        "edit_rules": {
          "type": "onlynumbers"
        }
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "1000"
        },
        "len": "1000"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "1000"
        },
        "hide": "1",
        "len": "1000"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "1000"
        },
        "len": "1000"
      },
      {
        "dtype": "bigint",
        "edit_rules": {
          "type": "onlynumbers"
        }
      },
      {
        "dtype": "bigint",
        "edit_rules": {
          "type": "onlynumbers"
        }
      },
      {
        "dtype": "nvarchar",
        "hide": "1",
        "len": "-1"
      },
      {
        "dtype": "nvarchar",
        "len": "-1"
      },
      {
        "dtype": "int",
        "edit_rules": {
          "type": "onlynumbers"
        }
      }
    ]
  },
  "178": {
    "dmlop": "IUD",
    "grid_attrib": {
      "chk_box_onchange": "VisibleMoreOnDevice(this)"
    },
    "cols": [
      {
        "dtype": "int",
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "400"
        },
        "frm_options": {
          "custom": "DisplayDeviceOptions"
        },
        "hide": "0",
        "len": "400",
        "nul": "0",
        "pscol": "19"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "50"
        },
        "hide": "01",
        "len": "50"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "50"
        },
        "hide": "0",
        "len": "50"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "200"
        },
        "hide": "0",
        "len": "200"
      },
      {
        "edit": "False",
        "edit_rules": {
          "maxlength": "20"
        },
        "hide": "01",
        "len": "20"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "100",
          "type": "mobile"
        },
        "hide": "01",
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "01",
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "200"
        },
        "hide": "0",
        "len": "200"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "512"
        },
        "hide": "01",
        "len": "512"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "512"
        },
        "hide": "0",
        "len": "512"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "100"
        },
        "frm_options": {
          "custom": "SetStatusImage",
          "customVal": "ReturnStatus"
        },
        "hide": "10",
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "100"
        },
        "frm_options": {
          "custom": "RemoteUninstallImage",
          "isExptoExl": "false"
        },
        "hide": "10",
        "len": "100",
        "nul": "0",
        "pscol": "16"
      },
      {
        "dtype": "int",
        "edit": "False",
        "hide": "1"
      },
      {
        "dtype": "int",
        "edit": "False",
        "hide": "1"
      },
      {
        "dtype": "datetime",
        "edit": "False",
        "hide": "1"
      },
      {
        "dtype": "datetime",
        "edit": "False",
        "hide": "1"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "2000"
        },
        "hide": "01",
        "len": "2000"
      },
      {
        "dtype": "bigint",
        "edit": "False",
        "eopt": "mdmreason",
        "etype": "sselect",
        "hide": "0"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "4000"
        },
        "hide": "0",
        "len": "4000"
      },
      {
        "dtype": "int",
        "edit": "False",
        "eopt": "on_off",
        "etype": "sselect",
        "hide": "0"
      },
      {
        "edit": "False",
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "01",
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "1000"
        },
        "hide": "01",
        "len": "1000"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "2000"
        },
        "hide": "01",
        "len": "2000"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "01",
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "01",
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "01",
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "01",
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "01",
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "01",
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "01",
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "01",
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "01",
        "len": "100"
      },
      {
        "dtype": "bit",
        "edit": "False",
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "01",
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "01",
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "01",
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "200"
        },
        "hide": "01",
        "len": "200"
      },
      {
        "dtype": "bit",
        "edit": "False",
        "hide": "01"
      },
      {
        "dtype": "bit",
        "edit": "False",
        "hide": "01"
      },
      {
        "dtype": "bit",
        "edit": "False",
        "hide": "01"
      },
      {
        "dtype": "bit",
        "edit": "False",
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "01",
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "01",
        "len": "100"
      }
    ]
  },
  "179": {
    "dmlop": "D",
    "frm_attrib": {
      "form_load": "SetDeviceID(qid)"
    },
    "grid_attrib": {
      "hide_update_icon": "true",
      "custom_menu_item_click": "MDMDeviceButtonClick(null,qid)"
    },
    "cols": [
      {
        "dtype": "int",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "400"
        },
        "hide": "1",
        "len": "400"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "100"
        },
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "100"
        },
        "len": "100"
      },
      {
        "dtype": "datetime",
        "frm_options": {
          "date_range": "true"
        }
      },
      {
        "dtype": "datetime",
        "hide": "1"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "4"
      }
    ]
  },
  "18": {
    "dmlop": "IUD",
    "cols": [
      {
        "dtype": "int",
        "nul": "0"
      },
      {
        "dtype": "int",
        "nul": "0"
      },
      {
        "dtype": "date",
        "nul": "0"
      }
    ]
  },
  "180": {
    "dmlop": "D",
    "frm_attrib": {
      "form_load": "SetDeviceID(qid)"
    },
    "grid_attrib": {
      "hide_update_icon": "true",
      "custom_menu_item_click": "MDMDeviceButtonClick(null,qid)"
    },
    "cols": [
      {
        "dtype": "bigint",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "400"
        },
        "hide": "1",
        "len": "400",
        "nul": "0"
      },
      {
        "dtype": "int",
        "hide": "1"
      },
      {
        "dtype": "int",
        "hide": "1"
      },
      {
        "dtype": "datetime",
        "frm_options": {
          "date_range": "true"
        },
        "hide": "1"
      },
      {
        "dtype": "datetime",
        "hide": "1"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "512"
        },
        "len": "512",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "512"
        },
        "len": "512",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "512"
        },
        "len": "512"
      },
      {
        "dtype": "int",
        "etype": "sselect",
        "hide": "1"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "100"
        },
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "100"
        },
        "len": "100"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "4"
      },
      {
        "s_fld_idx": "9"
      }
    ]
  },
  "181": {
    "dmlop": "IUD",
    "cols": [
      {
        "dtype": "int",
        "edit": "False",
        "nul": "0",
        "pscol": "2"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "400"
        },
        "len": "400"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "1000"
        },
        "len": "1000"
      },
      {
        "dtype": "int",
        "edit_rules": {
          "type": "onlynumbers"
        }
      },
      {
        "edit_rules": {
          "maxlength": "500"
        },
        "len": "500"
      },
      {
        "dtype": "datetime"
      }
    ]
  },
  "182": {
    "dmlop": "IUD",
    "frm_attrib": {
      "gp2021": "gp2045"
    },
    "cols": [
      {
        "dtype": "int",
        "hide": "1",
        "pscol": "2"
      },
      {
        "edit_rules": {
          "maxlength": "500"
        },
        "len": "500",
        "nul": "0",
        "pscol": "19"
      },
      {
        "edit_rules": {
          "maxlength": "500"
        },
        "hide": "1",
        "len": "500"
      },
      {
        "dtype": "upload",
        "frm_options": {
          "change_error_container": "true",
          "FileExtensions": "apk",
          "showPreview": "false"
        },
        "nul": "0"
      },
      {
        "hide": "1",
        "len": "50",
        "nul": "0",
        "pscol": "61"
      },
      {
        "dtype": "date",
        "hide": "1",
        "nul": "0",
        "pscol": "60"
      }
    ]
  },
  "183": {
    "dmlop": "IUD",
    "cols": [
      {
        "dtype": "int",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "edit_rules": {
          "type": "Address"
        },
        "len": "500",
        "nul": "0"
      },
      {
        "edit_rules": {
          "type": "Address"
        },
        "len": "500",
        "nul": "0"
      }
    ]
  },
  "184": {
    "dmlop": "IUD",
    "grid_attrib": {
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "bigint",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "defvalue": "sl_login_attr:EmpCode",
        "dtype": "nvarchar",
        "edit": "False",
        "eopt": "dealer_code",
        "etype": "sselect",
        "len": "100",
        "nul": "0"
      },
      {
        "defvalue": "2",
        "dtype": "int",
        "eopt": "prism_brand",
        "etype": "sselect",
        "nul": "0"
      },
      {
        "defvalue": "date:today",
        "dtype": "date",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "edit_rules": {
          "type": "nonegative"
        }
      }
    ]
  },
  "186": {
    "frm_attrib": {
      "form_load": "GetDealerId(qid)"
    },
    "grid_attrib": {
      "data_fld_cnt": "7",
      "after_grid_load": "AddBalance(qid,data)",
      "refresh": false
    },
    "cols": [
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "eopt": "dealer_code",
        "etype": "sselect",
        "len": "10"
      },
      {
        "dtype": "date"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "100"
        },
        "len": "100"
      },
      {
        "dtype": "numeric"
      },
      {
        "dtype": "numeric"
      },
      {
        "dtype": "numeric"
      },
      {
        "dtype": "date",
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "date",
        "hide": "1",
        "nul": "0"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "7"
      },
      {
        "s_fld_idx": "8"
      }
    ]
  },
  "187": {
    "dmlop": "D",
    "grid_attrib": {
      "refresh": false
    },
    "cols": [
      {
        "dtype": "int",
        "edit": "False",
        "hide": "1",
        "nul": "0",
        "pscol": "19"
      },
      {
        "dtype": "bigint",
        "edit": "False",
        "hide": "1"
      },
      {
        "edit": "False",
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      },
      {
        "dtype": "numeric",
        "edit": "False"
      },
      {
        "dtype": "numeric",
        "edit": "False"
      },
      {
        "dtype": "numeric",
        "edit": "False"
      },
      {
        "dtype": "numeric",
        "edit": "False"
      },
      {
        "dtype": "numeric",
        "edit": "False"
      },
      {
        "dtype": "numeric",
        "edit": "False"
      },
      {
        "dtype": "numeric",
        "edit": "False"
      },
      {
        "dtype": "numeric",
        "edit": "False"
      },
      {
        "dtype": "numeric",
        "edit": "False"
      },
      {
        "dtype": "numeric",
        "edit": "False"
      },
      {
        "dtype": "numeric",
        "edit": "False"
      },
      {
        "dtype": "numeric",
        "edit": "False"
      }
    ]
  },
  "188": {
    "grid_attrib": {
      "data_fld_cnt": "6",
      "after_grid_load": "SearchDashboard(qid,data)"
    },
    "cols": [
      {
        "eopt": "zone_region_depot",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "len": "10",
        "nul": "0"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "isInitialCall": "false",
          "pcfld": "0|1|2"
        },
        "len": "4",
        "nul": "0"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "len": "10",
        "nul": "0"
      },
      {
        "dtype": "char"
      },
      {
        "dtype": "numeric"
      },
      {
        "dtype": "numeric"
      },
      {
        "len": "100",
        "nul": "0"
      },
      {
        "defvalue": "2",
        "eopt": "prism_brands",
        "etype": "sselect",
        "hide": "1",
        "len": "-1",
        "nul": "0"
      },
      {
        "dtype": "date",
        "hide": "1",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      }
    ],
    "sfilters": [
      {
        "isCompulsory": "True",
        "s_fld_idx": "8"
      },
      {
        "s_fld_idx": "0"
      },
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      },
      {
        "s_fld_idx": "7"
      }
    ]
  },
  "189": {
    "grid_attrib": {
      "data_fld_cnt": "6",
      "after_grid_load": "SearchDashboard(qid,data)"
    },
    "cols": [
      {
        "eopt": "zone_region_depot",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "len": "10",
        "nul": "0"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "isInitialCall": "false",
          "pcfld": "0|1|2"
        },
        "len": "4",
        "nul": "0"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "len": "10",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "eopt": "dealer_code",
        "etype": "sselect",
        "len": "30",
        "nul": "0"
      },
      {
        "dtype": "money"
      },
      {
        "dtype": "money"
      },
      {
        "dtype": "nvarchar",
        "len": "100",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "len": "100",
        "nul": "0"
      },
      {
        "dtype": "date",
        "etype": "Quatermonth",
        "frm_options": {
          "qmfld": "9"
        },
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "date",
        "hide": "1",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      }
    ],
    "sfilters": [
      {
        "isCompulsory": "True",
        "s_fld_idx": "8"
      },
      {
        "s_fld_idx": "0"
      },
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      },
      {
        "s_fld_idx": "3"
      }
    ]
  },
  "190": {
    "grid_attrib": {
      "data_fld_cnt": "8",
      "after_grid_load": "AddBalance(qid,data)",
      "hide_update_icon": "true"
    },
    "cols": [
      {
        "eopt": "zone_region_depot",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "len": "10"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "isInitialCall": "false",
          "pcfld": "0|1|2"
        },
        "len": "4"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "len": "10"
      },
      {
        "dtype": "decimal",
        "hide": "10"
      },
      {
        "dtype": "decimal",
        "hide": "10"
      },
      {
        "dtype": "decimal",
        "hide": "10"
      },
      {
        "dtype": "decimal",
        "hide": "10"
      },
      {
        "dtype": "decimal",
        "hide": "10"
      },
      {
        "dtype": "date",
        "etype": "Quatermonth",
        "frm_options": {
          "qmfld": "9",
          "viewmon": "true"
        },
        "hide": "1"
      },
      {
        "dtype": "date",
        "hide": "1"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      }
    ],
    "sfilters": [
      {
        "isCompulsory": "True",
        "s_fld_idx": "8"
      },
      {
        "s_fld_idx": "0"
      },
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      }
    ],
    "QueryOption": "Transpose,4,5"
  },
  "191": {
    "frm_attrib": {
      "form_load": "SetCurrentMthYr(qid)"
    },
    "grid_attrib": {
      "data_fld_cnt": "9",
      "custom_menu_item_click": "RenderKRA(qid)",
      "after_grid_load": "AddBalance(qid,data)",
      "hide_update_icon": "true"
    },
    "cols": [
      {
        "dtype": "int",
        "eopt": "calendar_month",
        "etype": "sselect",
        "frm_options": {
          "client_sort": "false"
        },
        "hide": "1"
      },
      {
        "dtype": "int",
        "eopt": "calendar_year",
        "etype": "sselect",
        "hide": "1"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "246"
        },
        "hide": "1",
        "len": "246"
      },
      {
        "dtype": "nvarchar",
        "len": "-1"
      },
      {
        "dtype": "nvarchar",
        "len": "-1"
      },
      {
        "dtype": "numeric"
      },
      {
        "dtype": "numeric"
      },
      {
        "dtype": "float"
      },
      {
        "dtype": "numeric"
      },
      {
        "dtype": "nvarchar",
        "eopt": "empcode_tte",
        "etype": "sselect",
        "hide": "1",
        "len": "40",
        "nul": "0"
      }
    ],
    "sfilters": [
      {
        "isCompulsory": "True",
        "s_fld_idx": "0"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "1"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "9"
      }
    ]
  },
  "192": {
    "dmlop": "IUD",
    "frm_attrib": {
      "form_load": "SetKRACode(qid)"
    },
    "cols": [
      {
        "dtype": "nvarchar",
        "edit": "False",
        "eopt": "empcode_tse",
        "etype": "sselect",
        "len": "40"
      },
      {
        "dtype": "int",
        "edit": "False",
        "eopt": "calendar_month",
        "etype": "sselect",
        "frm_options": {
          "client_sort": "false"
        }
      },
      {
        "dtype": "int",
        "edit": "False",
        "eopt": "calendar_year",
        "etype": "sselect"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "eopt": "kracode",
        "etype": "sselect",
        "len": "10"
      },
      {
        "dtype": "numeric"
      },
      {
        "dtype": "numeric",
        "edit": "False"
      },
      {
        "dtype": "numeric",
        "edit": "False"
      },
      {
        "dtype": "bigint",
        "edit": "False",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      }
    ],
    "sfilters": [
      {
        "isCompulsory": "True",
        "s_fld_idx": "0"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "1"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "2"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "3"
      }
    ]
  },
  "193": {
    "dmlop": "IUD",
    "frm_attrib": {
      "form_load": "disableProposalApproval(qid)"
    },
    "grid_attrib": {
      "LocalIUD": true
    },
    "cols": [
      {
        "dtype": "bigint",
        "hide": "1",
        "nul": "0",
        "pscol": "19"
      },
      {
        "dtype": "int",
        "nul": "0"
      },
      {
        "dtype": "bigint",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "len": "-1"
      },
      {
        "defvalue": "Pending",
        "eopt": "sales_request_status",
        "etype": "sselect",
        "len": "10",
        "nul": "0"
      },
      {
        "dtype": "datetime"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "40"
        },
        "eopt": "empall",
        "etype": "sselect",
        "len": "40",
        "nul": "0"
      }
    ]
  },
  "194": {
    "grid_attrib": {
      "data_fld_cnt": "19",
      "after_grid_load": "AddBalance(qid,data)",
      "hide_update_icon": "true"
    },
    "cols": [
      {
        "eopt": "zone_region_depot",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "len": "10"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "isInitialCall": "false",
          "pcfld": "0|1|2"
        },
        "len": "4"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "0|1|2"
        },
        "len": "10"
      },
      {
        "dtype": "decimal",
        "hide": "10"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "4"
        },
        "hide": "1",
        "len": "4"
      },
      {
        "dtype": "decimal",
        "hide": "10"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "4"
        },
        "hide": "1",
        "len": "4"
      },
      {
        "dtype": "decimal",
        "hide": "10"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "4"
        },
        "hide": "1",
        "len": "4"
      },
      {
        "dtype": "decimal",
        "hide": "10"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "4"
        },
        "hide": "1",
        "len": "4"
      },
      {
        "dtype": "decimal",
        "hide": "10"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "4"
        },
        "hide": "1",
        "len": "4"
      },
      {
        "dtype": "decimal",
        "hide": "10"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "4"
        },
        "hide": "1",
        "len": "4"
      },
      {
        "dtype": "decimal",
        "hide": "10"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "4"
        },
        "hide": "1",
        "len": "4"
      },
      {
        "dtype": "decimal",
        "hide": "10"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "4"
        },
        "hide": "1",
        "len": "4"
      },
      {
        "dtype": "date",
        "etype": "Quatermonth",
        "frm_options": {
          "qmfld": "20"
        },
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "date",
        "etype": "Quatermonth",
        "hide": "1",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "eopt": "logistic_trade",
        "etype": "sselect",
        "hide": "1",
        "len": "50",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      }
    ],
    "sfilters": [
      {
        "isCompulsory": "True",
        "s_fld_idx": "19"
      },
      {
        "s_fld_idx": "0"
      },
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      },
      {
        "s_fld_idx": "21"
      }
    ]
  },
  "195": {
    "frm_attrib": {
      "form_load": "DisableDateDuration(qid)"
    },
    "grid_attrib": {
      "data_fld_cnt": "3",
      "after_grid_load": "SearchDashboard(qid,data)"
    },
    "cols": [
      {
        "dtype": "int"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "date",
        "etype": "Quatermonth",
        "frm_options": {
          "qmfld": "4"
        },
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "date",
        "hide": "1",
        "nul": "0"
      },
      {
        "eopt": "zone_region_depot",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "5|6|7"
        },
        "hide": "1",
        "len": "50",
        "nul": "0"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "isInitialCall": "false",
          "pcfld": "5|6|7"
        },
        "hide": "1",
        "len": "50",
        "nul": "0"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "5|6|7"
        },
        "hide": "1",
        "len": "50",
        "nul": "0"
      },
      {
        "eopt": "dealer_code",
        "etype": "sselect",
        "hide": "1",
        "len": "50",
        "nul": "0"
      },
      {
        "eopt": "daily_report_type",
        "etype": "sselect",
        "hide": "1",
        "len": "50",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      }
    ],
    "sfilters": [
      {
        "isCompulsory": "True",
        "s_fld_idx": "3"
      },
      {
        "s_fld_idx": "5"
      },
      {
        "s_fld_idx": "6"
      },
      {
        "s_fld_idx": "7"
      },
      {
        "s_fld_idx": "8"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "9"
      }
    ]
  },
  "196": {
    "grid_attrib": {
      "data_fld_cnt": "15"
    },
    "cols": [
      {
        "dtype": "date"
      },
      {
        "len": "15"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "dtype": "decimal"
      },
      {
        "len": "-1"
      },
      {
        "len": "-1"
      },
      {
        "len": "-1"
      },
      {
        "dtype": "date",
        "hide": "1",
        "nul": "0"
      },
      {
        "eopt": "zone_region_depot",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "16|17|18"
        },
        "hide": "1",
        "len": "-1",
        "nul": "0"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "isInitialCall": "false",
          "pcfld": "16|17|18"
        },
        "hide": "1",
        "len": "-1",
        "nul": "0"
      },
      {
        "etype": "pcselect",
        "fldevent": "change:getDealerCode(196)",
        "frm_options": {
          "pcfld": "16|17|18"
        },
        "hide": "1",
        "len": "-1",
        "nul": "0"
      },
      {
        "eopt": "dealer_code",
        "etype": "sselect",
        "hide": "1",
        "len": "-1",
        "nul": "0"
      }
    ],
    "sfilters": [
      {
        "isCompulsory": "True",
        "s_fld_idx": "15"
      },
      {
        "s_fld_idx": "16"
      },
      {
        "s_fld_idx": "17"
      },
      {
        "s_fld_idx": "18"
      },
      {
        "s_fld_idx": "19"
      }
    ]
  },
  "197": {
    "frm_attrib": {
      "form_load": "DisableDealer()"
    },
    "grid_attrib": {
      "data_fld_cnt": "8",
      "after_grid_load": "AddBalance(qid,data)"
    },
    "cols": [
      {
        "dtype": "date"
      },
      {
        "defvalue": "sl_login_attr:EmpCode",
        "edit": "False",
        "hide": "01",
        "len": "100",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "len": "100"
      },
      {
        "defvalue": "2",
        "dtype": "int",
        "eopt": "prism_brand",
        "etype": "sselect"
      },
      {
        "dtype": "numeric"
      },
      {
        "dtype": "numeric"
      },
      {
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "len": "40"
      },
      {
        "dtype": "date",
        "etype": "Quatermonth",
        "frm_options": {
          "qmfld": "9"
        },
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "date",
        "hide": "1",
        "nul": "0"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "8"
      },
      {
        "s_fld_idx": "3"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "1"
      }
    ]
  },
  "198": {
    "grid_attrib": {
      "data_fld_cnt": "7"
    },
    "cols": [
      {
        "dtype": "bigint",
        "hide": "1"
      },
      {
        "dtype": "date",
        "nul": "0"
      },
      {
        "len": "200"
      },
      {
        "dtype": "nvarchar",
        "len": "-1",
        "nul": "0"
      },
      {
        "len": "10",
        "nul": "0"
      },
      {
        "len": "10",
        "nul": "0"
      },
      {
        "dtype": "decimal"
      },
      {
        "defvalue": "date:today-1",
        "dtype": "date",
        "hide": "1",
        "nul": "0"
      },
      {
        "defvalue": "date:today",
        "dtype": "date",
        "hide": "1",
        "nul": "0"
      },
      {
        "eopt": "allempcode",
        "etype": "sselect",
        "hide": "1",
        "len": "50",
        "nul": "0"
      }
    ],
    "sfilters": [
      {
        "isCompulsory": "True",
        "s_fld_idx": "7"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "8"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "9"
      }
    ]
  },
  "199": {
    "grid_attrib": {
      "data_fld_cnt": "5",
      "after_grid_load": "AddBalance(qid,data)"
    },
    "cols": [
      {
        "eopt": "prism_brand",
        "etype": "sselect",
        "len": "50"
      },
      {
        "len": "10"
      },
      {
        "dtype": "numeric"
      },
      {
        "dtype": "numeric"
      },
      {
        "dtype": "numeric"
      },
      {
        "dtype": "date",
        "etype": "Quatermonth",
        "frm_options": {
          "qmfld": "6"
        },
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "date",
        "hide": "1",
        "nul": "0"
      }
    ],
    "sfilters": [
      {
        "isCompulsory": "True",
        "s_fld_idx": "5"
      },
      {
        "s_fld_idx": "0"
      }
    ]
  },
  "2": {
    "formtype": "tabs",
    "dmlop": "IUD",
    "formgroups": [
      [
        0,
        1,
        2,
        3,
        4,
        9
      ],
      [
        10,
        11,
        12,
        13
      ],
      [
        5,
        6,
        7,
        8
      ]
    ],
    "frm_attrib": {
      "custmsg_add": "gp2030",
      "form_load": "GetVisitPicture(qid)",
      "offlineCallType": "VisitFeedback"
    },
    "grid_attrib": {
      "custom_menu_item_click": "GetVisitId(qid,0)",
      "RenderGridForcefully": true,
      "after_grid_load": "GetDealerName(qid,data)",
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "defvalue": "cur_visit_id",
        "dtype": "int",
        "edit": "False",
        "hide": "1",
        "nul": "0",
        "pscol": "19"
      },
      {
        "dtype": "int",
        "eopt": "pop_material_display",
        "etype": "sselect",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "pop_material_display",
        "etype": "sselect",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "pop_material_display",
        "etype": "sselect",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "pop_material_display",
        "etype": "sselect",
        "nul": "0"
      },
      {
        "dtype": "upload",
        "frm_options": {
          "change_error_container": "true",
          "custom": "DownloadImg",
          "FileExtensions": "txt|xls|pdf|doc|docx|jpg|png|jpeg|ico",
          "isExptoExl": "false",
          "isMultipleUpload": "true",
          "showPreview": "false"
        },
        "hide": "01"
      },
      {
        "dtype": "upload",
        "frm_options": {
          "change_error_container": "true",
          "custom": "DownloadImg",
          "FileExtensions": "txt|xls|pdf|doc|docx|jpg|png|jpeg|ico",
          "isExptoExl": "false",
          "isMultipleUpload": "true",
          "showPreview": "false"
        },
        "hide": "01"
      },
      {
        "dtype": "upload",
        "frm_options": {
          "change_error_container": "true",
          "custom": "DownloadImg",
          "FileExtensions": "txt|xls|pdf|doc|docx|jpg|png|jpeg|ico",
          "isExptoExl": "false",
          "isMultipleUpload": "true",
          "showPreview": "false"
        },
        "hide": "01"
      },
      {
        "dtype": "upload",
        "frm_options": {
          "change_error_container": "true",
          "custom": "DownloadImg",
          "FileExtensions": "txt|xls|pdf|doc|docx|jpg|png|jpeg|ico",
          "isExptoExl": "false",
          "isMultipleUpload": "true",
          "showPreview": "false"
        },
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "pop_material_display",
        "etype": "sselect",
        "nul": "0"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "nvarchar",
        "hide": "1",
        "len": "50",
        "nul": "0",
        "pscol": "61"
      },
      {
        "dtype": "date",
        "hide": "1",
        "nul": "0",
        "pscol": "60"
      }
    ],
    "isForm": "True"
  },
  "20": {
    "dmlop": "IUD",
    "grid_attrib": {
      "remove_lkup_list": [
        "depot"
      ]
    },
    "cols": [
      {
        "edit_rules": {
          "maxlength": "5",
          "type": "nonegative"
        },
        "frm_options": {
          "fld_container_class": "hi80"
        },
        "len": "5",
        "nul": "0",
        "pscol": "19"
      },
      {
        "dtype": "nvarchar",
        "len": "-1",
        "nul": "0"
      },
      {
        "eopt": "depot",
        "etype": "sselect",
        "len": "50",
        "nul": "0"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "0"
      },
      {
        "s_fld_idx": "1"
      }
    ]
  },
  "200": {
    "dmlop": "IUD",
    "frm_attrib": {
      "cust_buttons": "CustomSAPButtonCredit(qid)",
      "custom_save": "ApproveCredit(params,qid)",
      "form_load": "HideUpdate(qid)"
    },
    "grid_attrib": {
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "edit": "False",
        "hide": "0",
        "len": "10",
        "nul": "0",
        "pscol": "2"
      },
      {
        "dtype": "date",
        "edit": "False",
        "hide": "0"
      },
      {
        "dtype": "money",
        "edit": "False",
        "hide": "0"
      },
      {
        "hide": "1",
        "len": "3"
      },
      {
        "hide": "1",
        "len": "4"
      },
      {
        "edit": "False",
        "eopt": "dealer_code_credit",
        "etype": "sselect",
        "hide": "0",
        "len": "10"
      },
      {
        "edit": "False",
        "hide": "01",
        "len": "12"
      },
      {
        "hide": "1",
        "len": "12"
      },
      {
        "dtype": "numeric",
        "hide": "1"
      },
      {
        "edit_rules": {
          "type": "Address"
        },
        "eopt": "credit_limit_approval_reason",
        "etype": "sselect",
        "hide": "01",
        "len": "2",
        "nul": "0"
      },
      {
        "hide": "1",
        "len": "5"
      },
      {
        "dtype": "numeric",
        "edit": "False",
        "hide": "0"
      },
      {
        "hide": "1",
        "len": "3"
      },
      {
        "dtype": "numeric",
        "edit": "False",
        "hide": "0"
      },
      {
        "hide": "1",
        "len": "2"
      },
      {
        "hide": "1",
        "len": "12"
      },
      {
        "defvalue": "date:today",
        "dtype": "date",
        "edit": "False",
        "hide": "01"
      },
      {
        "dtype": "time",
        "hide": "1"
      },
      {
        "hide": "1",
        "len": "20"
      },
      {
        "dtype": "date",
        "hide": "1"
      },
      {
        "dtype": "time",
        "hide": "1"
      },
      {
        "hide": "1",
        "len": "20"
      },
      {
        "dtype": "date",
        "hide": "1"
      },
      {
        "dtype": "time",
        "hide": "1"
      },
      {
        "dtype": "date",
        "hide": "1"
      },
      {
        "dtype": "time",
        "hide": "1"
      },
      {
        "hide": "1",
        "len": "1"
      },
      {
        "dtype": "numeric",
        "hide": "01"
      },
      {
        "hide": "01",
        "len": "-1"
      },
      {
        "defvalue": "sl_login_attr:EmpCode",
        "edit": "False",
        "hide": "01",
        "len": "50"
      }
    ]
  },
  "201": {
    "formtype": "tabs",
    "dmlop": "IUD",
    "formgroups": [
      [
        0,
        1,
        4,
        7,
        10,
        27,
        15,
        31,
        13,
        16,
        19,
        22,
        25,
        2,
        5,
        11,
        14,
        28,
        29,
        32
      ],
      [
        8,
        17,
        26,
        3,
        6,
        9,
        12,
        20,
        23,
        18,
        33,
        21,
        24,
        30
      ]
    ],
    "frm_attrib": {
      "custom_save": "CustomeVisitMasterSave(qid,params)",
      "form_load": "SetVisitArea(qid)",
      "offlineCallType": "Default",
      "postDML": "ProcessIHBSiteInfo(qid,data)"
    },
    "grid_attrib": {
      "custom_menu_item_click": "RenderIHBSite(qid)",
      "custom_delete": "VisitMasterDelete(qid,del_id,del_value)",
      "RenderGridForcefully": true,
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "15"
        },
        "hide": "0",
        "len": "15",
        "nul": "0",
        "pscol": "19"
      },
      {
        "dtype": "int",
        "eopt": "lead_from",
        "etype": "sselect",
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "maxlength": "10",
          "type": "mobile"
        },
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "hide": "01",
        "len": "-1"
      },
      {
        "dtype": "nvarchar",
        "eopt": "area_ihb",
        "etype": "sselect",
        "hide": "0",
        "len": "15",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "onlynumbers"
        },
        "hide": "01"
      },
      {
        "dtype": "numeric",
        "hide": "01"
      },
      {
        "defvalue": "date:today",
        "dtype": "date",
        "frm_options": {
          "disable_future": "true"
        },
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "infuencer",
        "etype": "sselect",
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "hide": "01",
        "len": "-1"
      },
      {
        "defvalue": "sl_login_attr:EmpCode",
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "20"
        },
        "eopt": "empData",
        "etype": "sselect",
        "hide": "0",
        "len": "20",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "const_stage",
        "etype": "sselect",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "hide": "0",
        "len": "-1",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "onlynumbers"
        },
        "hide": "01"
      },
      {
        "dtype": "date",
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "type": "Address"
        },
        "etype": "textarea",
        "hide": "01",
        "len": "-1",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "hide": "01",
        "len": "-1"
      },
      {
        "dtype": "int",
        "eopt": "brand",
        "etype": "sselect",
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "hide": "0",
        "len": "-1",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "hide": "01",
        "len": "-1"
      },
      {
        "dtype": "money",
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "pincode"
        },
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "hide": "01",
        "len": "-1",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "maxlength": "10",
          "type": "mobile"
        },
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "ihbsite_status",
        "etype": "sselect",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "hide": "1"
      },
      {
        "dtype": "decimal",
        "hide": "1"
      },
      {
        "dtype": "image",
        "hide": "1"
      },
      {
        "dtype": "nvarchar",
        "hide": "0",
        "len": "-1"
      },
      {
        "dtype": "int",
        "edit_rules": {
          "maxlength": "9",
          "type": "onlynumbers"
        },
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "brand_user_type",
        "etype": "sselect",
        "hide": "01"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "7"
      },
      {
        "s_fld_idx": "13"
      },
      {
        "s_fld_idx": "31"
      },
      {
        "s_fld_idx": "27"
      }
    ],
    "isForm": "True"
  },
  "202": {
    "formtype": "tabs",
    "dmlop": "IUD",
    "formgroups": [
      [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        42,
        15,
        16,
        17,
        18,
        19,
        40,
        41
      ],
      [
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31
      ],
      [
        32,
        33,
        43,
        34,
        35,
        36,
        37
      ]
    ],
    "grid_attrib": {
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "int",
        "edit": "False",
        "hide": "1",
        "nul": "0",
        "pscol": "19"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "eopt": "ihbsiteid",
        "etype": "sselect",
        "hide": "0",
        "len": "15",
        "nul": "0",
        "pscol": "18"
      },
      {
        "dtype": "bigint",
        "edit": "False",
        "eopt": "area_ihb",
        "etype": "sselect",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "20"
        },
        "eopt": "empcode_tte_csr",
        "etype": "sselect",
        "hide": "0",
        "len": "20",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "01",
        "len": "100"
      },
      {
        "dtype": "date",
        "edit": "False",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "infuencer",
        "etype": "sselect",
        "hide": "0"
      },
      {
        "dtype": "int",
        "edit": "False",
        "hide": "01"
      },
      {
        "dtype": "date",
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "ihbsite_status",
        "etype": "sselect",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "const_stage",
        "etype": "sselect",
        "hide": "01"
      },
      {
        "dtype": "date",
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "follow_by",
        "etype": "sselect",
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "eopt": "infuencer",
        "etype": "sselect",
        "hide": "01",
        "len": "15"
      },
      {
        "dtype": "nvarchar",
        "eopt": "dealer_code",
        "etype": "sselect",
        "hide": "01",
        "len": "15"
      },
      {
        "dtype": "int",
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "01"
      },
      {
        "dtype": "int",
        "edit": "False",
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "reason_not_converted",
        "etype": "sselect",
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "hide": "01",
        "len": "-1"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "hide": "01",
        "len": "-1"
      },
      {
        "dtype": "int",
        "edit": "False",
        "edit_rules": {
          "type": "onlynumbers"
        },
        "hide": "01"
      },
      {
        "dtype": "int",
        "edit": "False",
        "edit_rules": {
          "type": "onlynumbers"
        },
        "hide": "01"
      },
      {
        "dtype": "int",
        "edit": "False",
        "edit_rules": {
          "type": "onlynumbers"
        },
        "hide": "01"
      },
      {
        "edit": "False",
        "edit_rules": {
          "type": "charwithdecimalpoint"
        },
        "hide": "01",
        "len": "20"
      },
      {
        "dtype": "int",
        "edit": "False",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "type": "Address"
        },
        "eopt": "offered_slab_casting_services",
        "etype": "sselect",
        "frm_options": {
          "type": "multiselect"
        },
        "hide": "01",
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "type": "charwithdecimalpoint"
        },
        "hide": "01",
        "len": "100"
      },
      {
        "edit": "False",
        "edit_rules": {
          "maxlength": "20"
        },
        "hide": "01",
        "len": "20"
      },
      {
        "dtype": "date",
        "edit": "False",
        "hide": "01"
      },
      {
        "dtype": "date",
        "edit": "False",
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "const_stage",
        "etype": "sselect",
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "eopt": "dealer_code",
        "etype": "sselect",
        "hide": "01",
        "len": "15"
      },
      {
        "dtype": "int",
        "edit_rules": {
          "maxlength": "9",
          "type": "onlynumbers"
        },
        "hide": "01"
      },
      {
        "dtype": "date",
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "01"
      },
      {
        "dtype": "int",
        "edit_rules": {
          "maxlength": "9",
          "type": "onlynumbers"
        },
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "1",
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "1",
        "len": "100"
      },
      {
        "dtype": "upload",
        "frm_options": {
          "change_error_container": "true",
          "custom": "DownloadImg",
          "FileExtensions": "txt|xls|pdf|doc|docx|jpg|png|jpeg|ico",
          "isExptoExl": "false",
          "isMultipleUpload": "true",
          "showPreview": "false"
        },
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "hide": "01",
        "len": "-1"
      },
      {
        "dtype": "int",
        "eopt": "prism_brand",
        "etype": "sselect",
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "prism_brand",
        "etype": "sselect",
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "ihb_visittype",
        "etype": "sselect",
        "hide": "01",
        "nul": "0"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "3"
      },
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      },
      {
        "s_fld_idx": "6"
      },
      {
        "s_fld_idx": "9"
      }
    ]
  },
  "203": {
    "formtype": "tabs",
    "dmlop": "IUD",
    "formgroups": [
      [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        14,
        15,
        16,
        17,
        18
      ],
      [
        12,
        13,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36
      ]
    ],
    "grid_attrib": {
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "int",
        "edit": "False",
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "20"
        },
        "hide": "01",
        "len": "20",
        "nul": "0"
      },
      {
        "dtype": "bigint",
        "edit": "False",
        "eopt": "godownmaster",
        "etype": "sselect",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "date",
        "edit": "False",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "bigint",
        "edit": "False",
        "hide": "0"
      },
      {
        "dtype": "bigint",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "int",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "int",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "hide": "01",
        "len": "-1"
      },
      {
        "dtype": "nvarchar",
        "hide": "01",
        "len": "-1"
      },
      {
        "dtype": "nvarchar",
        "hide": "01",
        "len": "-1"
      },
      {
        "dtype": "upload",
        "frm_options": {
          "change_error_container": "true",
          "custom": "DownloadImg",
          "FileExtensions": "txt|xls|pdf|doc|docx|jpg|png|jpeg|ico",
          "isExptoExl": "false",
          "isMultipleUpload": "true",
          "showPreview": "false"
        },
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "01"
      },
      {
        "dtype": "numeric",
        "hide": "0"
      },
      {
        "dtype": "numeric",
        "hide": "0"
      },
      {
        "dtype": "numeric",
        "hide": "01"
      },
      {
        "dtype": "int",
        "hide": "01"
      },
      {
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "01",
        "len": "100"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "fldevent": "change:changeLeakages()",
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "hide": "01",
        "len": "-1"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "01"
      },
      {
        "dtype": "date",
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "fldevent": "change:changeDamageStock()",
        "hide": "01"
      },
      {
        "edit_rules": {
          "maxlength": "200"
        },
        "hide": "01",
        "len": "200"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "01"
      },
      {
        "edit_rules": {
          "maxlength": "200"
        },
        "hide": "01",
        "len": "200"
      },
      {
        "edit_rules": {
          "maxlength": "200"
        },
        "hide": "01",
        "len": "200"
      },
      {
        "dtype": "numeric(18, 2)",
        "edit": "False",
        "hide": "1"
      },
      {
        "dtype": "bigint",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      }
    ]
  },
  "204": {
    "dmlop": "IUD",
    "grid_attrib": {
      "sort_column": [
        [
          7,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "bigint",
        "edit": "False",
        "hide": "1",
        "nul": "0",
        "pscol": "19"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "15"
        },
        "eopt": "projectdepot",
        "etype": "sselect",
        "hide": "0",
        "len": "15",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "stage_construction",
        "etype": "sselect",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "brand",
        "etype": "sselect",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "date",
        "hide": "0"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "20"
        },
        "eopt": "empall",
        "etype": "sselect",
        "hide": "0",
        "len": "20"
      },
      {
        "dtype": "nvarchar",
        "hide": "0",
        "len": "-1"
      }
    ]
  },
  "205": {
    "dmlop": "IUD",
    "grid_attrib": {
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "bigint",
        "edit": "False",
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "int",
        "edit": "False",
        "eopt": "leadinfluencer",
        "etype": "sselect",
        "hide": "0"
      },
      {
        "dtype": "int",
        "eopt": "lead_status",
        "etype": "sselect",
        "hide": "0"
      },
      {
        "dtype": "date",
        "hide": "0"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "20"
        },
        "eopt": "empall",
        "etype": "sselect",
        "hide": "0",
        "len": "20"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "0"
      },
      {
        "dtype": "date",
        "hide": "0"
      },
      {
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "0",
        "len": "100"
      }
    ]
  },
  "21": {
    "dmlop": "IUD",
    "cols": [
      {
        "dtype": "int",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "smalldatetime"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      },
      {
        "edit_rules": {
          "maxlength": "500"
        },
        "len": "500"
      },
      {
        "edit_rules": {
          "maxlength": "500"
        },
        "len": "500"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "smalldatetime"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "smalldatetime"
      }
    ]
  },
  "22": {
    "dmlop": "IUD",
    "grid_attrib": {
      "remove_lkup_list": [
        "zone"
      ]
    },
    "cols": [
      {
        "edit_rules": {
          "maxlength": "4"
        },
        "len": "4",
        "nul": "0",
        "pscol": "19"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "len": "50",
        "nul": "0"
      },
      {
        "eopt": "zone",
        "etype": "sselect",
        "len": "10",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "len": "-1"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "0"
      },
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      }
    ]
  },
  "23": {
    "dmlop": "IUD",
    "frm_attrib": {
      "form_load": "SetDepotDealerforComPricInfo(qid)",
      "offlineCallType": "Default"
    },
    "grid_attrib": {
      "custom_menu_item_click": "RenderCompetitorPricingInfo(qid)",
      "RenderGridForcefully": true,
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "int",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "defvalue": "date:today",
        "dtype": "date",
        "frm_options": {
          "disable_future": "true"
        },
        "nul": "0"
      },
      {
        "defvalue": "sl_login_attr:DepotCode",
        "eopt": "depotdealer",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "2|3"
        },
        "len": "10",
        "nul": "0"
      },
      {
        "defvalue": "DLR:CustomerId",
        "dtype": "nvarchar",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "2|3"
        },
        "len": "-1"
      },
      {
        "dtype": "int",
        "eopt": "brand",
        "etype": "sselect",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        },
        "frm_options": {
          "custom_bootstrap_validator": "CheckValue()"
        },
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        },
        "frm_options": {
          "custom_bootstrap_validator": "CheckValue()"
        },
        "nul": "0"
      },
      {
        "dtype": "int",
        "edit_rules": {
          "maxlength": "9",
          "type": "nonegative"
        },
        "frm_options": {
          "custom_bootstrap_validator": "CheckValue()"
        },
        "nul": "0"
      },
      {
        "defvalue": "sl_login_attr:EmpCode",
        "dtype": "nvarchar",
        "edit": "False",
        "eopt": "empData",
        "etype": "sselect",
        "len": "-1"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "2"
      },
      {
        "s_fld_idx": "4"
      }
    ],
    "isForm": "True"
  },
  "28": {
    "dmlop": "IUD",
    "cols": [
      {
        "dtype": "nvarchar",
        "eopt": "empcode_csrttettm",
        "etype": "sselect",
        "fldevent": "change:getZoneReg()",
        "len": "20",
        "pscol": "19"
      },
      {
        "eopt": "zone",
        "etype": "sselect",
        "hide": "01",
        "len": "10"
      },
      {
        "eopt": "region",
        "etype": "sselect",
        "hide": "01",
        "len": "4"
      },
      {
        "eopt": "depot",
        "etype": "sselect",
        "frm_options": {
          "type": "multiselect"
        },
        "hide": "01",
        "len": "10"
      },
      {
        "eopt": "area",
        "etype": "sselect",
        "frm_options": {
          "type": "multiselect"
        },
        "len": "500",
        "nul": "0"
      },
      {
        "dtype": "bigint",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      }
    ]
  },
  "29": {
    "formtype": "tabs",
    "dmlop": "IUD",
    "formgroups": [
      [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        15,
        16
      ],
      [
        9,
        10,
        11,
        21,
        12,
        13,
        20,
        19,
        14,
        17,
        18
      ]
    ],
    "grid_attrib": {
      "before_grid_load": "HideGPSLink(qid)"
    },
    "cols": [
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "hide": "0",
        "len": "10",
        "nul": "0",
        "pscol": "19"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "hide": "0",
        "len": "50",
        "nul": "0"
      },
      {
        "edit_rules": {
          "type": "Address"
        },
        "etype": "textarea",
        "hide": "01",
        "len": "500",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "0",
        "len": "100",
        "nul": "0"
      },
      {
        "edit_rules": {
          "type": "Address"
        },
        "hide": "0",
        "len": "50",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "pincode"
        },
        "hide": "01"
      },
      {
        "defvalue": "sl_login_attr:DepotCode",
        "eopt": "depotwise",
        "etype": "sselect",
        "hide": "0",
        "len": "10",
        "nul": "0"
      },
      {
        "edit_rules": {
          "type": "Address"
        },
        "hide": "0",
        "len": "500",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "maxlength": "10",
          "type": "mobile"
        },
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "hide": "0"
      },
      {
        "dtype": "int",
        "hide": "01"
      },
      {
        "dtype": "numeric(18, 2)",
        "hide": "01"
      },
      {
        "dtype": "numeric(18, 2)",
        "hide": "01"
      },
      {
        "dtype": "decimal(18,2)",
        "hide": "01"
      },
      {
        "dtype": "int",
        "edit_rules": {
          "maxvalue": "9",
          "minvalue": "0",
          "type": "nonegative"
        },
        "hide": "01"
      },
      {
        "dtype": "date",
        "hide": "01"
      },
      {
        "edit_rules": {
          "maxlength": "20"
        },
        "hide": "01",
        "len": "20"
      },
      {
        "edit_rules": {
          "type": "Address"
        },
        "etype": "textarea",
        "hide": "01",
        "len": "500"
      },
      {
        "dtype": "int",
        "eopt": "godown_floor_type",
        "etype": "sselect",
        "hide": "01"
      },
      {
        "dtype": "numeric(18, 2)",
        "hide": "01"
      },
      {
        "dtype": "numeric",
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "frm_options": {
          "custom": "SetResetGPSLink",
          "isExptoExl": "false"
        },
        "hide": "10",
        "len": "50",
        "pscol": "16"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "4"
      },
      {
        "s_fld_idx": "5"
      }
    ]
  },
  "31": {
    "dmlop": "IUD",
    "grid_attrib": {
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "bigint",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "len": "50",
        "nul": "0"
      },
      {
        "dtype": "date",
        "nul": "0"
      },
      {
        "eopt": "infuencer",
        "etype": "sselect",
        "frm_options": {
          "type": "multiselect"
        },
        "len": "200",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "len": "50",
        "nul": "0"
      },
      {
        "eopt": "depotwise",
        "etype": "sselect",
        "len": "10",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "len": "-1"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      },
      {
        "s_fld_idx": "5"
      }
    ]
  },
  "32": {
    "dmlop": "IUD",
    "frm_attrib": {
      "offlineCallType": "Default"
    },
    "grid_attrib": {
      "custom_menu_item_click": "GetVisitId(qid,4)",
      "RenderGridForcefully": true,
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "bigint",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "defvalue": "2",
        "dtype": "int",
        "eopt": "prism_brand",
        "etype": "sselect"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "int"
      },
      {
        "defvalue": "cur_visit_id",
        "dtype": "int",
        "edit": "False",
        "hide": "1",
        "nul": "0"
      },
      {
        "defvalue": "GDN",
        "dtype": "bigint",
        "edit": "False",
        "eopt": "godownid",
        "etype": "sselect",
        "nul": "0"
      }
    ],
    "isForm": "True"
  },
  "34": {
    "dmlop": "IUD",
    "grid_attrib": {
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "bigint",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "edit_rules": {
          "maxlength": "20"
        },
        "frm_options": {
          "disabled": "true"
        },
        "len": "20"
      },
      {
        "dtype": "datetime",
        "frm_options": {
          "disabled": "true"
        }
      },
      {
        "defvalue": "date:today",
        "dtype": "datetime",
        "frm_options": {
          "disabled": "true"
        }
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "int",
        "eopt": "dispatch_reason",
        "etype": "sselect"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "len": "-1"
      }
    ]
  },
  "35": {
    "formtype": "tabs",
    "dmlop": "IUD",
    "formgroups": [
      [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        14,
        15,
        16,
        17,
        18
      ],
      [
        12,
        13,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32,
        33,
        34,
        35,
        36
      ]
    ],
    "frm_attrib": {
      "form_load": "DisableOldGodownVisit(qid)",
      "offlineCallType": "Default"
    },
    "grid_attrib": {
      "custom_menu_item_click": "RenderGoDownVisit(qid)",
      "RenderGridForcefully": true,
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "defvalue": "cur_visit_id",
        "dtype": "int",
        "edit": "False",
        "hide": "1",
        "nul": "0"
      },
      {
        "defvalue": "sl_login_attr:EmpCode",
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "20"
        },
        "hide": "01",
        "len": "20",
        "nul": "0"
      },
      {
        "defvalue": "GDN",
        "dtype": "bigint",
        "edit": "False",
        "eopt": "godownid",
        "etype": "sselect",
        "hide": "01",
        "nul": "0"
      },
      {
        "defvalue": "date:today",
        "dtype": "date",
        "edit": "False",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "bigint",
        "edit": "False",
        "hide": "0"
      },
      {
        "dtype": "int",
        "edit_rules": {
          "maxlength": "9",
          "type": "onlynumbers"
        },
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "int",
        "frm_options": {
          "custom_bootstrap_validator": "MinMaxStack()"
        },
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "int",
        "frm_options": {
          "custom_bootstrap_validator": "MinMaxStack()"
        },
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "hide": "01",
        "len": "-1"
      },
      {
        "dtype": "nvarchar",
        "hide": "01",
        "len": "-1"
      },
      {
        "dtype": "nvarchar",
        "hide": "01",
        "len": "-1"
      },
      {
        "dtype": "upload",
        "frm_options": {
          "change_error_container": "true",
          "custom": "DownloadImg",
          "FileExtensions": "txt|xls|pdf|doc|docx|jpg|png|jpeg|ico",
          "isExptoExl": "false",
          "isMultipleUpload": "true",
          "showPreview": "false"
        },
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "01"
      },
      {
        "dtype": "numeric",
        "hide": "0"
      },
      {
        "dtype": "numeric",
        "hide": "0"
      },
      {
        "dtype": "numeric",
        "hide": "01"
      },
      {
        "dtype": "int",
        "hide": "01"
      },
      {
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "01",
        "len": "100"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "fldevent": "change:changeLeakages()",
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "hide": "01",
        "len": "-1"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "01"
      },
      {
        "dtype": "date",
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "fldevent": "change:changeDamageStock()",
        "hide": "01"
      },
      {
        "edit_rules": {
          "maxlength": "200"
        },
        "hide": "01",
        "len": "200"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "01"
      },
      {
        "edit_rules": {
          "maxlength": "200"
        },
        "hide": "01",
        "len": "200"
      },
      {
        "edit_rules": {
          "maxlength": "200"
        },
        "hide": "01",
        "len": "200"
      },
      {
        "dtype": "numeric(18, 2)",
        "edit": "False",
        "hide": "1"
      },
      {
        "dtype": "bigint",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      }
    ],
    "isForm": "True"
  },
  "36": {
    "formtype": "tabs",
    "dmlop": "IUD",
    "formgroups": [
      [
        0,
        11,
        1,
        4,
        7,
        10,
        27,
        15,
        31,
        16,
        13,
        19,
        22,
        25,
        2,
        5,
        14,
        32,
        28,
        29
      ],
      [
        8,
        17,
        26,
        3,
        6,
        9,
        12,
        20,
        23,
        18,
        33,
        21,
        24,
        30
      ]
    ],
    "frm_attrib": {
      "custom_save": "CustomeVisitMasterSave(qid,params)",
      "form_load": "SetAreaDisable(qid)",
      "postDML": "ProcessIHBSiteInfo(qid,data)"
    },
    "grid_attrib": {
      "before_grid_load": "HideGPSLink(qid)",
      "custom_delete": "VisitMasterDelete(qid,del_id,del_value)",
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "15"
        },
        "hide": "10",
        "len": "15",
        "nul": "0",
        "pscol": "19"
      },
      {
        "dtype": "int",
        "eopt": "lead_from",
        "etype": "sselect",
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "maxlength": "10",
          "type": "mobile"
        },
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "hide": "01",
        "len": "-1"
      },
      {
        "dtype": "nvarchar",
        "eopt": "area_ihb",
        "etype": "sselect",
        "hide": "0",
        "len": "15",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "onlynumbers"
        },
        "hide": "01"
      },
      {
        "dtype": "numeric",
        "hide": "01"
      },
      {
        "defvalue": "date:today",
        "dtype": "date",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "infuencer",
        "etype": "sselect",
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "hide": "01",
        "len": "-1"
      },
      {
        "defvalue": "sl_login_attr:EmpCode",
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "20"
        },
        "eopt": "empcode_forall",
        "etype": "sselect",
        "hide": "0",
        "len": "20",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "hide": "0",
        "len": "-1",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "hide": "0",
        "len": "-1",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "onlynumbers"
        },
        "hide": "01"
      },
      {
        "dtype": "date",
        "frm_options": {
          "disable_past": "true"
        },
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "type": "Address"
        },
        "etype": "textarea",
        "hide": "01",
        "len": "-1",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "hide": "01",
        "len": "-1"
      },
      {
        "dtype": "int",
        "eopt": "brand",
        "etype": "sselect",
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "maxlength": "10",
          "type": "mobile"
        },
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "hide": "01",
        "len": "-1"
      },
      {
        "dtype": "money",
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "pincode"
        },
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "hide": "01",
        "len": "-1",
        "nul": "0"
      },
      {
        "defvalue": "1",
        "dtype": "int",
        "eopt": "ihbsite_status",
        "etype": "sselect",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "const_stage",
        "etype": "sselect",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "decimal",
        "hide": "1"
      },
      {
        "dtype": "decimal",
        "hide": "1"
      },
      {
        "dtype": "image",
        "hide": "1"
      },
      {
        "dtype": "nvarchar",
        "hide": "0",
        "len": "-1"
      },
      {
        "dtype": "int",
        "edit_rules": {
          "maxlength": "9",
          "type": "onlynumbers"
        },
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "brand_user_type",
        "etype": "sselect",
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "frm_options": {
          "custom": "SetResetGPSLink",
          "isExptoExl": "false"
        },
        "hide": "10",
        "len": "50",
        "pscol": "16"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "7"
      },
      {
        "s_fld_idx": "11"
      },
      {
        "s_fld_idx": "31"
      },
      {
        "s_fld_idx": "25"
      }
    ]
  },
  "37": {
    "dmlop": "D",
    "grid_attrib": {
      "grid_template": "ViewMessageUI(qid)",
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "int",
        "hide": "1",
        "nul": "0",
        "pscol": "19"
      },
      {
        "dtype": "nvarchar",
        "eopt": "empall",
        "etype": "sselect",
        "len": "-1"
      },
      {
        "defvalue": "2",
        "dtype": "int",
        "eopt": "message_type",
        "etype": "sselect"
      },
      {
        "defvalue": "sl_login_attr:EmpCode",
        "dtype": "nvarchar",
        "hide": "1",
        "len": "-1"
      },
      {
        "len": "-1"
      },
      {
        "dtype": "date",
        "edit": "False"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "frm_options": {
          "class": "hi70"
        },
        "len": "-1"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "1"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "1"
      },
      {
        "dtype": "upload",
        "frm_options": {
          "custom": "DownloadImg",
          "FileExtensions": "txt|xls|pdf|doc|docx|jpg|png|jpeg|ico",
          "isExptoExl": "false"
        }
      },
      {
        "dtype": "date",
        "nul": "0"
      },
      {
        "defvalue": "sl_login_attr:EmpCode",
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "50"
        },
        "len": "50"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "5"
      },
      {
        "s_fld_idx": "4"
      },
      {
        "s_fld_idx": "1"
      }
    ]
  },
  "38": {
    "dmlop": "IUD",
    "grid_attrib": {
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "bigint",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "defvalue": "sl_login_attr:EmpCode",
        "dtype": "nvarchar",
        "edit": "False",
        "len": "20",
        "nul": "0"
      },
      {
        "defvalue": "date:today",
        "dtype": "date",
        "frm_options": {
          "disable_future": "true"
        },
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "intelligence_company",
        "etype": "sselect",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "intelligence_type",
        "etype": "sselect",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "len": "-1",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "len": "-1"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      },
      {
        "s_fld_idx": "3"
      },
      {
        "s_fld_idx": "4"
      }
    ]
  },
  "39": {
    "dmlop": "IUD",
    "frm_attrib": {
      "custom_save": "CustomeVisitMasterSave(qid,params)",
      "postDML": "ProcessProjectInfo(qid,data)"
    },
    "grid_attrib": {
      "before_grid_load": "HideGPSLink(qid)",
      "custom_delete": "VisitMasterDelete(qid,del_id,del_value)",
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "15"
        },
        "hide": "10",
        "len": "15",
        "nul": "0",
        "pscol": "19"
      },
      {
        "dtype": "int",
        "eopt": "lead_from",
        "etype": "sselect",
        "hide": "0",
        "nul": "0"
      },
      {
        "defvalue": "sl_login_attr:RegionCode",
        "eopt": "region",
        "etype": "sselect",
        "hide": "01",
        "len": "10",
        "nul": "0"
      },
      {
        "defvalue": "sl_login_attr:DepotCode",
        "eopt": "depotwise",
        "etype": "sselect",
        "hide": "0",
        "len": "10",
        "nul": "0"
      },
      {
        "defvalue": "date:today",
        "dtype": "date",
        "frm_options": {
          "disable_future": "true"
        },
        "hide": "0",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "hide": "0",
        "len": "50",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "hide": "0",
        "len": "50",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "project_type",
        "etype": "sselect",
        "hide": "0"
      },
      {
        "dtype": "int",
        "eopt": "sector",
        "etype": "sselect",
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "hide": "0",
        "len": "-1"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "hide": "01",
        "len": "-1"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "hide": "01",
        "len": "-1"
      },
      {
        "dtype": "numeric",
        "hide": "01"
      },
      {
        "dtype": "int",
        "edit_rules": {
          "maxlength": "9",
          "type": "nonegative"
        },
        "hide": "01"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "hide": "01",
        "len": "50"
      },
      {
        "dtype": "int",
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "stage_construction",
        "etype": "sselect",
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "brand",
        "etype": "sselect",
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "hide": "01",
        "len": "-1"
      },
      {
        "defvalue": "sl_login_attr:EmpCode",
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "20"
        },
        "hide": "01",
        "len": "20"
      },
      {
        "dtype": "nvarchar",
        "frm_options": {
          "custom": "SetResetGPSLink",
          "isExptoExl": "false"
        },
        "hide": "10",
        "len": "50",
        "pscol": "16"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "3"
      },
      {
        "s_fld_idx": "4"
      },
      {
        "s_fld_idx": "5"
      },
      {
        "s_fld_idx": "6"
      }
    ]
  },
  "4": {
    "dmlop": "IUD",
    "cols": [
      {
        "dtype": "int",
        "nul": "0"
      },
      {
        "dtype": "int"
      },
      {
        "edit_rules": {
          "maxlength": "200"
        },
        "len": "200"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "len": "50",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "200"
        },
        "len": "200"
      },
      {
        "edit_rules": {
          "maxlength": "200"
        },
        "len": "200"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "int"
      },
      {
        "edit_rules": {
          "maxlength": "500"
        },
        "len": "500"
      }
    ]
  },
  "40": {
    "formtype": "tabs",
    "dmlop": "IUD",
    "formgroups": [
      [
        1,
        2,
        3,
        4,
        41,
        39
      ],
      [
        31,
        5,
        6,
        40,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        32,
        33,
        34,
        35,
        36,
        37,
        29,
        30,
        22,
        24,
        42,
        38
      ],
      [
        7,
        8,
        19,
        20,
        21,
        23,
        25,
        26,
        27,
        28
      ]
    ],
    "frm_attrib": {
      "custom_save": "CalculateFieldsforProposal(params,qid)",
      "custom_update": "CalculateFieldsforProposal(params,qid)"
    },
    "grid_attrib": {
      "after_grid_load": "GetNewParty(qid)",
      "refresh": false,
      "dialog_header": [
        "Proposal Id"
      ],
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "ChildInfo": {
      "193": [
        {
          "par_fld": "0",
          "ch_fld": "2"
        }
      ]
    },
    "cols": [
      {
        "dtype": "bigint",
        "frm_options": {
          "submenu": "179_180"
        },
        "hide": "10",
        "nul": "0",
        "pscol": "2"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "50"
        },
        "len": "50"
      },
      {
        "edit_rules": {
          "maxlength": "20"
        },
        "hide": "01",
        "len": "20"
      },
      {
        "eopt": "dealer_code_proposal",
        "etype": "sselect",
        "fldevent": "change:getTransportationZone()",
        "len": "10",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        }
      },
      {
        "defvalue": "2",
        "eopt": "prism_brands",
        "etype": "sselect",
        "hide": "01",
        "len": "4"
      },
      {
        "dtype": "int",
        "eopt": "proposal_payment",
        "etype": "sselect",
        "fldevent": "change:PaymentTerms()",
        "hide": "01"
      },
      {
        "dtype": "date",
        "frm_options": {
          "disable_past": "true"
        },
        "hide": "01"
      },
      {
        "dtype": "date",
        "frm_options": {
          "disable_past": "true"
        },
        "hide": "01"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        },
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "edit": "False",
        "edit_rules": {
          "type": "nonegative"
        },
        "hide": "01"
      },
      {
        "dtype": "numeric",
        "edit": "False",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "eopt": "proposal_trans_mode",
        "etype": "sselect",
        "hide": "01",
        "len": "10"
      },
      {
        "defvalue": "Immediate",
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "50"
        },
        "hide": "01",
        "len": "50"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        },
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "edit": "False",
        "edit_rules": {
          "type": "nonegative"
        },
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "20"
        },
        "hide": "01",
        "len": "20"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        },
        "hide": "01",
        "nul": "0"
      },
      {
        "edit_rules": {
          "type": "address"
        },
        "eopt": "supply_against",
        "etype": "sselect",
        "hide": "01",
        "len": "20"
      },
      {
        "edit_rules": {
          "type": "address"
        },
        "eopt": "supply_against",
        "etype": "sselect",
        "hide": "01",
        "len": "20"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        },
        "hide": "01"
      },
      {
        "eopt": "depotwise_proposal",
        "etype": "sselect",
        "hide": "01",
        "len": "10"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        },
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "proposal_freight",
        "etype": "sselect",
        "hide": "01"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        },
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "bit",
        "eopt": "yes_no",
        "etype": "sselect",
        "hide": "01"
      },
      {
        "etype": "textarea",
        "hide": "01",
        "len": "500"
      },
      {
        "dtype": "bit",
        "eopt": "yes_no",
        "etype": "sselect",
        "hide": "01"
      },
      {
        "etype": "textarea",
        "hide": "01",
        "len": "500"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        },
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        },
        "fldevent": "change:HandlingCharge()",
        "hide": "01",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "hide": "01",
        "len": "50"
      },
      {
        "edit_rules": {
          "maxlength": "10",
          "type": "nonegative"
        },
        "hide": "01",
        "len": "10",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "10",
          "type": "nonegative"
        },
        "hide": "01",
        "len": "10",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "10",
          "type": "nonegative"
        },
        "hide": "01",
        "len": "10",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "10",
          "type": "nonegative"
        },
        "hide": "01",
        "len": "10",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "edit": "False",
        "hide": "01"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        },
        "hide": "01"
      },
      {
        "dtype": "numeric",
        "hide": "01"
      },
      {
        "eopt": "depotwise",
        "etype": "sselect",
        "hide": "01",
        "len": "10",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "50"
        },
        "hide": "01",
        "len": "50"
      },
      {
        "defvalue": "sl_login_attr:EmpCode",
        "edit": "False",
        "hide": "01",
        "len": "20"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        },
        "hide": "01"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "0"
      },
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      },
      {
        "s_fld_idx": "4"
      }
    ]
  },
  "41": {
    "dmlop": "IUD",
    "frm_attrib": {
      "form_load": "SetDepotDisable(qid)"
    },
    "grid_attrib": {
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "int",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "0",
        "len": "100",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "0",
        "len": "100",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "type": "Address"
        },
        "etype": "textarea",
        "hide": "0",
        "len": "1000"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "01",
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "10",
          "type": "mobile"
        },
        "hide": "0",
        "len": "30",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "prospect_type",
        "etype": "sselect",
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "eopt": "brand",
        "etype": "sselect",
        "frm_options": {
          "type": "multiselect"
        },
        "hide": "01",
        "len": "100",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "hide": "0",
        "len": "1000"
      },
      {
        "dtype": "int",
        "eopt": "firm_type",
        "etype": "sselect",
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "200"
        },
        "hide": "01",
        "len": "200"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "hide": "01",
        "len": "1000"
      },
      {
        "dtype": "varcharauto",
        "eopt": "dealer_code",
        "etype": "sselect",
        "frm_options": {
          "type": "autocomplete"
        },
        "hide": "01"
      },
      {
        "defvalue": "sl_login_attr:DepotCode",
        "eopt": "depotwise",
        "etype": "sselect",
        "hide": "0",
        "len": "10",
        "nul": "0"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      },
      {
        "s_fld_idx": "4"
      }
    ]
  },
  "42": {
    "dmlop": "IUD",
    "cols": [
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10",
        "nul": "0",
        "pscol": "19"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "len": "50",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "len": "-1"
      }
    ]
  },
  "44": {
    "dmlop": "IUD",
    "cols": [
      {
        "dtype": "bigint",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "dtype": "int",
        "eopt": "duration_type",
        "etype": "sselect",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "15"
        },
        "len": "15",
        "nul": "0"
      },
      {
        "dtype": "date",
        "nul": "0"
      },
      {
        "dtype": "date",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "len": "50",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "nul": "0"
      },
      {
        "dtype": "date",
        "nul": "0"
      },
      {
        "dtype": "int",
        "nul": "0"
      }
    ]
  },
  "48": {
    "dmlop": "IUD",
    "cols": [
      {
        "dtype": "int",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "500"
        },
        "len": "500",
        "nul": "0"
      },
      {
        "dtype": "int",
        "nul": "0"
      }
    ]
  },
  "49": {
    "dmlop": "IUD",
    "grid_attrib": {
      "remove_lkup_list": [
        "zone_region_depot"
      ]
    },
    "cols": [
      {
        "dtype": "int",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "edit_rules": {
          "type": "nowhitespace"
        },
        "len": "20",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "len": "50",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "50",
          "type": "onlyalpha"
        },
        "len": "50",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "20"
        },
        "hide": "01",
        "len": "20",
        "nul": "0"
      },
      {
        "dtype": "date",
        "frm_options": {
          "disable_past": "true"
        },
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "maxlength": "10",
          "type": "mobile"
        },
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "imei"
        },
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "10",
          "type": "mobile"
        },
        "len": "50",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "hide": "01",
        "len": "50",
        "nul": "0"
      },
      {
        "dtype": "date",
        "fldevent": "change:getInsuranceTo()",
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "date",
        "frm_options": {
          "disable_past": "true"
        },
        "hide": "01",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "50",
          "type": "onlyalpha"
        },
        "hide": "01",
        "len": "50",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "maxlength": "10",
          "type": "mobile"
        },
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "date",
        "hide": "01"
      },
      {
        "dtype": "date",
        "frm_options": {
          "disable_past": "true"
        },
        "hide": "01"
      },
      {
        "edit_rules": {
          "type": "Address"
        },
        "eopt": "vehicle_status",
        "etype": "sselect",
        "len": "50",
        "nul": "0"
      },
      {
        "eopt": "zone_region_depot",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "17|18|19"
        },
        "hide": "01",
        "len": "50"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "isInitialCall": "false",
          "pcfld": "17|18|19"
        },
        "hide": "01",
        "len": "50"
      },
      {
        "etype": "pcselect",
        "fldevent": "change:getDepotName()",
        "frm_options": {
          "pcfld": "17|18|19"
        },
        "hide": "01",
        "len": "50"
      },
      {
        "dtype": "upload",
        "frm_options": {
          "change_error_container": "true",
          "custom": "DownloadImg",
          "FileExtensions": "txt|xls|pdf|doc|docx|jpg|png|jpeg|ico",
          "isExptoExl": "false",
          "isMultipleUpload": "true",
          "showPreview": "false"
        },
        "hide": "01"
      },
      {
        "hide": "0",
        "len": "200",
        "nul": "0"
      },
      {
        "hide": "1",
        "len": "50",
        "nul": "0",
        "pscol": "61"
      },
      {
        "dtype": "date",
        "hide": "1",
        "nul": "0",
        "pscol": "60"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      },
      {
        "s_fld_idx": "3"
      },
      {
        "s_fld_idx": "4"
      },
      {
        "s_fld_idx": "6"
      }
    ]
  },
  "5": {
    "dmlop": "IUD",
    "frm_attrib": {
      "form_load": "GetDealerName(qid,null)",
      "offlineCallType": "DealerCounterSale"
    },
    "grid_attrib": {
      "custom_menu_item_click": "GetVisitId(qid,1)",
      "RenderGridForcefully": true,
      "after_grid_load": "GetDealerName(qid,data)",
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "bigint",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "defvalue": "cur_visit_id",
        "dtype": "int",
        "edit": "False",
        "hide": "1",
        "nul": "0"
      },
      {
        "defvalue": "2",
        "dtype": "int",
        "eopt": "prism_brand",
        "etype": "sselect",
        "nul": "0"
      },
      {
        "dtype": "int",
        "edit_rules": {
          "maxlength": "9",
          "type": "nonegative"
        },
        "nul": "0"
      },
      {
        "dtype": "money",
        "edit_rules": {
          "type": "nonegative"
        },
        "frm_options": {
          "custom_bootstrap_validator": "CheckValue(qid)"
        },
        "nul": "0"
      },
      {
        "dtype": "money",
        "edit_rules": {
          "type": "nonegative"
        },
        "frm_options": {
          "custom_bootstrap_validator": "CheckValue(qid)"
        },
        "nul": "0"
      }
    ],
    "isForm": "True"
  },
  "50": {
    "dmlop": "IUD",
    "grid_attrib": {
      "before_grid_load": "HideResetPasswordField(qid)",
      "sort_column": [
        [
          1,
          "desc"
        ]
      ],
      "remove_lkup_list": [
        "zone_region_depot"
      ]
    },
    "cols": [
      {
        "dtype": "int",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "100",
          "type": "username"
        },
        "hide": "0",
        "len": "100",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "50",
          "type": "address"
        },
        "hide": "01",
        "len": "50",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "40"
        },
        "hide": "0",
        "len": "40",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "0",
        "len": "100",
        "nul": "0"
      },
      {
        "eopt": "roles",
        "etype": "sselect",
        "hide": "0",
        "len": "20",
        "nul": "0"
      },
      {
        "eopt": "zone_region_depot",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "6|7|8"
        },
        "hide": "0",
        "len": "10"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "isInitialCall": "false",
          "pcfld": "6|7|8"
        },
        "hide": "0",
        "len": "4"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "6|7|8",
          "type": "multiselect"
        },
        "hide": "0",
        "len": "10"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "1",
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "1",
        "len": "100"
      },
      {
        "edit_rules": {
          "maxlength": "15"
        },
        "hide": "01",
        "len": "15"
      },
      {
        "edit_rules": {
          "type": "email"
        },
        "hide": "01",
        "len": "255",
        "nul": "0"
      },
      {
        "dtype": "date",
        "hide": "1"
      },
      {
        "dtype": "date",
        "hide": "1"
      },
      {
        "dtype": "date",
        "hide": "1"
      },
      {
        "dtype": "varcharauto",
        "eopt": "empcoderole",
        "etype": "sselect",
        "frm_options": {
          "type": "autocomplete"
        },
        "hide": "0",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "20"
        },
        "eopt": "userstatus",
        "etype": "sselect",
        "hide": "0",
        "len": "20",
        "nul": "0"
      },
      {
        "dtype": "datetime",
        "hide": "1"
      },
      {
        "dtype": "int",
        "hide": "1"
      },
      {
        "dtype": "datetime",
        "hide": "1"
      },
      {
        "edit_rules": {
          "maxlength": "30"
        },
        "hide": "1",
        "len": "30"
      },
      {
        "edit_rules": {
          "maxlength": "30"
        },
        "hide": "1",
        "len": "30"
      },
      {
        "edit_rules": {
          "maxlength": "30"
        },
        "hide": "1",
        "len": "30"
      },
      {
        "dtype": "bit",
        "hide": "1"
      },
      {
        "dtype": "nvarchar",
        "frm_options": {
          "custom": "SetResetPasswordLink",
          "isExptoExl": "false"
        },
        "hide": "10",
        "len": "50",
        "pscol": "16"
      }
    ]
  },
  "51": {
    "dmlop": "IUD",
    "grid_attrib": {
      "remove_lkup_list": [
        "zone_region_depot"
      ]
    },
    "cols": [
      {
        "dtype": "bigint",
        "hide": "1",
        "pscol": "2"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "type": "Address"
        },
        "len": "50",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "500"
        },
        "hide": "1",
        "len": "500"
      },
      {
        "eopt": "zone_region_depot",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "3|4|5"
        },
        "len": "10",
        "nul": "0"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "isInitialCall": "false",
          "pcfld": "3|4|5"
        },
        "len": "4"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "3|4|5",
          "type": "multiselect"
        },
        "len": "500",
        "nul": "0"
      },
      {
        "eopt": "roles",
        "etype": "sselect",
        "fldevent": "change:getEmpCode()",
        "frm_options": {
          "type": "multiselect"
        },
        "len": "500",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "etype": "sselect",
        "frm_options": {
          "type": "multiselect"
        },
        "len": "500",
        "nul": "0"
      },
      {
        "dtype": "date",
        "hide": "1",
        "pscol": "60"
      },
      {
        "edit": "False",
        "edit_rules": {
          "maxlength": "50"
        },
        "hide": "1",
        "len": "50",
        "pscol": "61"
      },
      {
        "defvalue": "2",
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "nul": "0"
      }
    ]
  },
  "52": {
    "dmlop": "IUD",
    "cols": [
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "20"
        },
        "len": "20",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "20"
        },
        "len": "20"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "100"
        },
        "len": "100"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "1"
      }
    ]
  },
  "55": {
    "dmlop": "IUD",
    "cols": [
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "40"
        },
        "len": "40",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "len": "50"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "1"
      }
    ]
  },
  "56": {
    "dmlop": "IUD",
    "cols": [
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "40"
        },
        "len": "40",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "len": "50"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "1"
      }
    ]
  },
  "58": {
    "dmlop": "IUD",
    "cols": [
      {
        "dtype": "bigint",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "eopt": "depotwise",
        "etype": "sselect",
        "len": "10"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      },
      {
        "edit_rules": {
          "maxlength": "500"
        },
        "len": "500"
      },
      {
        "dtype": "numeric"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      }
    ]
  },
  "59": {
    "dmlop": "IUD",
    "grid_attrib": {
      "remove_lkup_list": [
        "salesgroup"
      ]
    },
    "cols": [
      {
        "edit": "False",
        "edit_rules": {
          "maxlength": "20"
        },
        "len": "20",
        "nul": "0",
        "pscol": "19"
      },
      {
        "edit": "False",
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      },
      {
        "edit": "False",
        "edit_rules": {
          "maxlength": "50"
        },
        "len": "50"
      },
      {
        "edit_rules": {
          "type": "Address"
        },
        "etype": "textarea",
        "len": "100"
      },
      {
        "eopt": "salesgroup",
        "etype": "sselect",
        "frm_options": {
          "type": "multiselect"
        },
        "len": "10"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "maxlength": "10",
          "type": "mobile"
        }
      },
      {
        "edit_rules": {
          "type": "email"
        },
        "len": "50"
      },
      {
        "dtype": "date"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "0"
      },
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      },
      {
        "s_fld_idx": "5"
      }
    ]
  },
  "60": {
    "dmlop": "IUD",
    "grid_attrib": {
      "RenderGridForcefully": true
    },
    "cols": [
      {
        "dtype": "int",
        "hide": "1",
        "nul": "0",
        "pscol": "19"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "len": "50",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "500"
        },
        "frm_options": {
          "custom": "PrismCust",
          "isExptoExl": "false"
        },
        "hide": "10",
        "len": "500"
      },
      {
        "edit_rules": {
          "maxlength": "5000"
        },
        "hide": "1",
        "len": "5000"
      }
    ]
  },
  "61": {
    "dmlop": "IV",
    "cols": [
      {
        "dtype": "int",
        "hide": "1",
        "nul": "0",
        "pscol": "19"
      },
      {
        "edit_rules": {
          "type": "Address"
        },
        "eopt": "groupnm",
        "etype": "sselect",
        "len": "50",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "len": "50",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "len": "50",
        "nul": "0"
      }
    ]
  },
  "62": {
    "dmlop": "IUD",
    "grid_attrib": {
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "bigint",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "eopt": "depotwise",
        "etype": "sselect",
        "len": "10",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "depot_expense",
        "etype": "sselect"
      },
      {
        "dtype": "numeric",
        "nul": "0"
      },
      {
        "defvalue": "date:today",
        "dtype": "date"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "3"
      }
    ]
  },
  "63": {
    "dmlop": "IUD",
    "grid_attrib": {
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "hide": "0",
        "len": "10",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "20"
        },
        "hide": "0",
        "len": "20",
        "nul": "0",
        "pscol": "19"
      },
      {
        "dtype": "date",
        "hide": "0"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "40"
        },
        "hide": "0",
        "len": "40"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "15"
        },
        "hide": "0",
        "len": "15"
      },
      {
        "edit_rules": {
          "maxlength": "20"
        },
        "hide": "0",
        "len": "20"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "20"
        },
        "hide": "0",
        "len": "20"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "20"
        },
        "hide": "01",
        "len": "20"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "50"
        },
        "hide": "01",
        "len": "50"
      },
      {
        "dtype": "date",
        "hide": "01"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "hide": "01",
        "len": "50"
      },
      {
        "edit_rules": {
          "maxlength": "20"
        },
        "hide": "01",
        "len": "20"
      },
      {
        "edit_rules": {
          "maxlength": "20"
        },
        "hide": "01",
        "len": "20"
      },
      {
        "dtype": "numeric",
        "hide": "0"
      },
      {
        "dtype": "date",
        "hide": "01"
      },
      {
        "dtype": "int",
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "20"
        },
        "hide": "01",
        "len": "20"
      },
      {
        "dtype": "date",
        "hide": "01"
      },
      {
        "dtype": "date",
        "hide": "01"
      },
      {
        "edit_rules": {
          "maxlength": "500"
        },
        "hide": "01",
        "len": "500"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "hide": "01",
        "len": "50"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "20"
        },
        "hide": "0",
        "len": "20"
      },
      {
        "edit_rules": {
          "maxlength": "2"
        },
        "hide": "01",
        "len": "2"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "hide": "01",
        "len": "50"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "20"
        },
        "hide": "01",
        "len": "20"
      },
      {
        "dtype": "numeric",
        "hide": "01"
      },
      {
        "dtype": "numeric",
        "hide": "01"
      },
      {
        "dtype": "numeric",
        "hide": "01"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "2"
      },
      {
        "s_fld_idx": "20"
      }
    ]
  },
  "64": {
    "formtype": "tabs",
    "dmlop": "IUD",
    "formgroups": [
      [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        42,
        15,
        16,
        17,
        18,
        19,
        40,
        41,
        44
      ],
      [
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31
      ],
      [
        32,
        33,
        43,
        34,
        35,
        36,
        37
      ]
    ],
    "frm_attrib": {
      "form_load": "DisableRepeatOrder()",
      "offlineCallType": "Default"
    },
    "grid_attrib": {
      "custom_menu_item_click": "GetIHBVisit(qid)",
      "RenderGridForcefully": true,
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "defvalue": "cur_visit_id",
        "dtype": "int",
        "edit": "False",
        "hide": "1",
        "nul": "0",
        "pscol": "19"
      },
      {
        "defvalue": "IHB:CustomerId",
        "dtype": "nvarchar",
        "edit": "False",
        "eopt": "ihbsiteid",
        "etype": "sselect",
        "hide": "01",
        "len": "15",
        "nul": "0",
        "pscol": "18"
      },
      {
        "defvalue": "IHB:AreaId",
        "dtype": "bigint",
        "edit": "False",
        "eopt": "area",
        "etype": "sselect",
        "hide": "0",
        "nul": "0"
      },
      {
        "defvalue": "date:today",
        "dtype": "date",
        "edit": "False",
        "hide": "0",
        "nul": "0"
      },
      {
        "defvalue": "sl_login_attr:EmpCode",
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "20"
        },
        "hide": "01",
        "len": "20",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "ihb_visittype",
        "etype": "sselect",
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "infuencer",
        "etype": "sselect",
        "hide": "0"
      },
      {
        "dtype": "int",
        "edit": "False",
        "hide": "01"
      },
      {
        "dtype": "date",
        "frm_options": {
          "disable_past": "true"
        },
        "hide": "01"
      },
      {
        "defvalue": "IHB:IHBSiteStatus",
        "dtype": "int",
        "eopt": "ihbsite_status",
        "etype": "sselect",
        "fldevent": "change:changeOnIHBSiteStatus()",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "const_stage",
        "etype": "sselect",
        "hide": "01"
      },
      {
        "dtype": "date",
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "follow_by",
        "etype": "sselect",
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "eopt": "infuencer",
        "etype": "sselect",
        "hide": "01",
        "len": "15"
      },
      {
        "dtype": "nvarchar",
        "eopt": "dealer_code",
        "etype": "sselect",
        "hide": "01",
        "len": "15"
      },
      {
        "dtype": "int",
        "hide": "01"
      },
      {
        "defvalue": "2",
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "fldevent": "change:changeQtyVerified()",
        "hide": "01"
      },
      {
        "dtype": "int",
        "edit": "False",
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "reason_not_converted",
        "etype": "sselect",
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "hide": "01",
        "len": "-1"
      },
      {
        "defvalue": "2",
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "fldevent": "change:changePrismUsed()",
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "hide": "01",
        "len": "-1"
      },
      {
        "dtype": "int",
        "edit": "False",
        "edit_rules": {
          "type": "onlynumbers"
        },
        "hide": "01"
      },
      {
        "dtype": "int",
        "edit": "False",
        "edit_rules": {
          "type": "onlynumbers"
        },
        "hide": "01"
      },
      {
        "dtype": "int",
        "edit": "False",
        "edit_rules": {
          "type": "onlynumbers"
        },
        "hide": "01"
      },
      {
        "edit": "False",
        "edit_rules": {
          "type": "charwithdecimalpoint"
        },
        "hide": "01",
        "len": "20"
      },
      {
        "defvalue": "2",
        "dtype": "int",
        "edit": "False",
        "eopt": "yes_no",
        "etype": "radio",
        "fldevent": "change:IsMCVProvided()",
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "type": "Address"
        },
        "eopt": "offered_slab_casting_services",
        "etype": "sselect",
        "frm_options": {
          "SelectedField_show": "1",
          "type": "multiselect"
        },
        "hide": "01",
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "type": "charwithdecimalpoint"
        },
        "hide": "01",
        "len": "100"
      },
      {
        "edit": "False",
        "edit_rules": {
          "maxlength": "20"
        },
        "hide": "01",
        "len": "20"
      },
      {
        "dtype": "date",
        "edit": "False",
        "hide": "01"
      },
      {
        "dtype": "date",
        "edit": "False",
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "const_stage",
        "etype": "sselect",
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "eopt": "dealer_code",
        "etype": "sselect",
        "hide": "01",
        "len": "15"
      },
      {
        "dtype": "int",
        "edit_rules": {
          "maxlength": "9",
          "type": "onlynumbers"
        },
        "hide": "01"
      },
      {
        "dtype": "date",
        "hide": "01"
      },
      {
        "defvalue": "2",
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "fldevent": "change:changeROQtyVerified()",
        "hide": "01"
      },
      {
        "dtype": "int",
        "edit_rules": {
          "maxlength": "9",
          "type": "onlynumbers"
        },
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "1",
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "1",
        "len": "100"
      },
      {
        "dtype": "upload",
        "frm_options": {
          "change_error_container": "true",
          "custom": "DownloadImg",
          "FileExtensions": "txt|xls|pdf|doc|docx|jpg|png|jpeg|ico",
          "isExptoExl": "false",
          "isMultipleUpload": "true",
          "showPreview": "false"
        },
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "hide": "01",
        "len": "-1"
      },
      {
        "dtype": "int",
        "eopt": "prism_brand",
        "etype": "sselect",
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "prism_brand",
        "etype": "sselect",
        "hide": "01"
      },
      {
        "defvalue": "sl_login_attr:EmpName",
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "1",
        "len": "100"
      }
    ],
    "isForm": "True"
  },
  "65": {
    "dmlop": "IUD",
    "frm_attrib": {
      "before_validate": "GetUniqueId(qid)",
      "custom_save": "CustomeVisitMasterSave(qid,params)"
    },
    "grid_attrib": {
      "client_menu_item_click": "DisableInfluencer(qid)",
      "custom_menu_item_click": "GetInfluencerVisit(qid)",
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "ChildInfo": {
      "113": [
        {
          "par_fld": "0",
          "ch_fld": "1"
        }
      ]
    },
    "cols": [
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "15"
        },
        "hide": "01",
        "len": "15",
        "nul": "0",
        "pscol": "19"
      },
      {
        "dtype": "int",
        "edit": "False",
        "hide": "1"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "hide": "0",
        "len": "50",
        "nul": "0"
      },
      {
        "edit_rules": {
          "type": "Address"
        },
        "etype": "textarea",
        "hide": "01",
        "len": "100"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "maxlength": "10",
          "type": "mobile"
        },
        "hide": "0"
      },
      {
        "dtype": "int",
        "eopt": "lead_type",
        "etype": "sselect",
        "hide": "0"
      },
      {
        "dtype": "int",
        "eopt": "work_type",
        "etype": "sselect",
        "hide": "0"
      },
      {
        "dtype": "int",
        "eopt": "brand",
        "etype": "sselect",
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        },
        "hide": "01"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        },
        "hide": "01"
      },
      {
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "01",
        "len": "100"
      },
      {
        "eopt": "depotwise",
        "etype": "sselect",
        "hide": "01",
        "len": "10",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "lead_status",
        "etype": "sselect",
        "fldevent": "change:changeLeadStatus()",
        "hide": "0"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "sselect",
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "follow_by",
        "etype": "sselect",
        "hide": "01"
      },
      {
        "dtype": "numeric",
        "hide": "01"
      },
      {
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "01",
        "len": "100"
      },
      {
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "01",
        "len": "100"
      },
      {
        "defvalue": "date:today",
        "dtype": "date",
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "frm_options": {
          "custom": "SetResetGPSLink",
          "isExptoExl": "false"
        },
        "hide": "1",
        "len": "50",
        "pscol": "16"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "0"
      },
      {
        "s_fld_idx": "2"
      },
      {
        "s_fld_idx": "4"
      }
    ]
  },
  "66": {
    "dmlop": "IUD",
    "frm_attrib": {
      "before_validate": "GetUniqueId(qid)",
      "postDML": "ProcessInfluencerInfo(qid,data)"
    },
    "grid_attrib": {
      "client_menu_item_click": "EnableInfluencer(qid)",
      "custom_delete": "VisitMasterDelete(qid,del_id,del_value)",
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "ChildInfo": {
      "65": [
        {
          "par_fld": "0",
          "ch_fld": "1"
        }
      ]
    },
    "cols": [
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "15"
        },
        "hide": "1",
        "len": "15",
        "nul": "0",
        "pscol": "2"
      },
      {
        "defvalue": "sl_login_attr:RegionCode",
        "eopt": "regionempwise",
        "etype": "sselect",
        "len": "10",
        "nul": "0"
      },
      {
        "defvalue": "sl_login_attr:DepotCode",
        "eopt": "depotwise",
        "etype": "sselect",
        "len": "10",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "20"
        },
        "hide": "1",
        "len": "20"
      },
      {
        "defvalue": "date:today",
        "dtype": "date",
        "edit": "False",
        "frm_options": {
          "disable_future": "true"
        },
        "hide": "01",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "infuencer",
        "etype": "sselect",
        "hide": "01"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "len": "50",
        "nul": "0"
      },
      {
        "edit_rules": {
          "type": "Address"
        },
        "etype": "textarea",
        "len": "100"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "hide": "01",
        "len": "50"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "len": "50"
      },
      {
        "eopt": "district",
        "etype": "sselect",
        "len": "5"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "mobile"
        },
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "maxlength": "10",
          "type": "mobile"
        },
        "hide": "01"
      },
      {
        "defvalue": "sl_login_attr:EmpCode",
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "40"
        },
        "len": "40"
      },
      {
        "dtype": "date",
        "hide": "01"
      },
      {
        "dtype": "date",
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "frm_options": {
          "custom": "SetResetGPSLink",
          "isExptoExl": "false"
        },
        "hide": "1",
        "len": "50",
        "pscol": "16"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "2"
      },
      {
        "s_fld_idx": "5"
      },
      {
        "s_fld_idx": "6"
      },
      {
        "s_fld_idx": "7"
      },
      {
        "s_fld_idx": "10"
      },
      {
        "s_fld_idx": "11"
      }
    ]
  },
  "68": {
    "dmlop": "U",
    "grid_attrib": {
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "int",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10",
        "nul": "0",
        "pscol": "19"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "len": "50"
      },
      {
        "dtype": "nvarchar",
        "len": "-1"
      },
      {
        "dtype": "upload",
        "frm_options": {
          "change_error_container": "true",
          "custom": "DownloadImg",
          "FileExtensions": "txt|xls|pdf|doc|docx|jpg|png|jpeg|ico",
          "isMultipleUpload": "true",
          "showPreview": "false"
        }
      },
      {
        "defvalue": "date:today",
        "dtype": "date",
        "frm_options": {
          "disable_future": "true"
        }
      },
      {
        "hide": "1",
        "len": "50",
        "nul": "0",
        "pscol": "61"
      },
      {
        "dtype": "date",
        "hide": "1",
        "nul": "0",
        "pscol": "60"
      }
    ]
  },
  "7": {
    "dmlop": "IUD",
    "frm_attrib": {
      "form_load": "AutoFillSecondarySale()"
    },
    "grid_attrib": {
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "bigint",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "defvalue": "date:today",
        "dtype": "date"
      },
      {
        "defvalue": "sl_login_attr:EmpCode",
        "edit": "False",
        "eopt": "dealer_code",
        "etype": "sselect",
        "hide": "01",
        "len": "100",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "50"
        },
        "len": "50"
      },
      {
        "defvalue": "2",
        "dtype": "int",
        "eopt": "prism_brand",
        "etype": "sselect"
      },
      {
        "dtype": "numeric"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        }
      },
      {
        "edit_rules": {
          "maxlength": "100"
        },
        "len": "100"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "20"
        },
        "len": "20"
      }
    ]
  },
  "70": {
    "formtype": "tabs",
    "dmlop": "U",
    "formgroups": [
      [
        0,
        1,
        4,
        32,
        7,
        10,
        13,
        16,
        19,
        30,
        31,
        22,
        25,
        2,
        5,
        17,
        20,
        23,
        26,
        3,
        6,
        33,
        34
      ],
      [
        8,
        11,
        14
      ],
      [
        18,
        9,
        12,
        15,
        21,
        24,
        27
      ]
    ],
    "frm_attrib": {
      "form_load": "SetDefaultDealer(qid)"
    },
    "grid_attrib": {
      "before_grid_load": "HideCSRFields(qid)",
      "hide_update_icon": true,
      "custom_delete": "VisitMasterDelete(qid,del_id,del_value)",
      "dialog_header": [
        "Dealer Code",
        "Name"
      ],
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "15"
        },
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "4|0",
          "submenu": "105_134_219"
        },
        "hide": "0",
        "len": "15",
        "nul": "0",
        "pscol": "19"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "hide": "10",
        "len": "100"
      },
      {
        "dtype": "int",
        "edit": "False",
        "eopt": "dealer_category",
        "etype": "sselect",
        "hide": "01"
      },
      {
        "edit": "False",
        "edit_rules": {
          "maxlength": "2"
        },
        "hide": "01",
        "len": "2"
      },
      {
        "edit": "False",
        "eopt": "depotdealer",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "4|0"
        },
        "hide": "0",
        "len": "10",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "loyalty_type",
        "etype": "sselect",
        "hide": "01"
      },
      {
        "edit": "False",
        "edit_rules": {
          "maxlength": "10"
        },
        "hide": "01",
        "len": "10"
      },
      {
        "edit": "False",
        "edit_rules": {
          "type": "Address"
        },
        "etype": "textarea",
        "hide": "01",
        "len": "250"
      },
      {
        "dtype": "numeric",
        "hide": "01"
      },
      {
        "defvalue": "2",
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "fldevent": "change:changeCompanyBoard()",
        "hide": "01"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "hide": "01",
        "len": "50"
      },
      {
        "dtype": "int",
        "edit_rules": {
          "maxlength": "9",
          "type": "nonegative"
        },
        "hide": "01"
      },
      {
        "edit_rules": {
          "maxlength": "20"
        },
        "hide": "01",
        "len": "20"
      },
      {
        "edit": "False",
        "edit_rules": {
          "maxlength": "50"
        },
        "hide": "0",
        "len": "50"
      },
      {
        "dtype": "int",
        "edit_rules": {
          "maxlength": "9",
          "type": "nonegative"
        },
        "hide": "01"
      },
      {
        "dtype": "date",
        "hide": "01"
      },
      {
        "edit": "False",
        "edit_rules": {
          "type": "pincode"
        },
        "hide": "01",
        "len": "10"
      },
      {
        "dtype": "decimal",
        "edit": "False",
        "hide": "01"
      },
      {
        "defvalue": "2",
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "01"
      },
      {
        "edit": "False",
        "edit_rules": {
          "type": "mobile"
        },
        "hide": "0",
        "len": "20"
      },
      {
        "dtype": "decimal",
        "edit": "False",
        "hide": "01"
      },
      {
        "defvalue": "2",
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "fldevent": "change:changeShopPainting()",
        "hide": "01"
      },
      {
        "dtype": "date",
        "edit": "False",
        "hide": "01"
      },
      {
        "dtype": "int",
        "hide": "01"
      },
      {
        "dtype": "date",
        "hide": "01"
      },
      {
        "dtype": "date",
        "hide": "01"
      },
      {
        "edit": "False",
        "edit_rules": {
          "maxlength": "10"
        },
        "hide": "01",
        "len": "10"
      },
      {
        "dtype": "int",
        "hide": "01"
      },
      {
        "eopt": "business_type",
        "etype": "sselect",
        "hide": "0",
        "len": "5"
      },
      {
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "01",
        "len": "100"
      },
      {
        "edit_rules": {
          "type": "mobile"
        },
        "hide": "01",
        "len": "20"
      },
      {
        "dtype": "date",
        "edit": "False",
        "hide": "01"
      },
      {
        "edit": "False",
        "edit_rules": {
          "maxlength": "10"
        },
        "hide": "0",
        "len": "10"
      },
      {
        "edit": "False",
        "edit_rules": {
          "maxlength": "3"
        },
        "hide": "01",
        "len": "3"
      },
      {
        "edit": "False",
        "edit_rules": {
          "maxlength": "50"
        },
        "hide": "01",
        "len": "50"
      },
      {
        "edit_rules": {
          "maxlength": "5"
        },
        "hide": "1",
        "len": "5"
      },
      {
        "edit_rules": {
          "maxlength": "5"
        },
        "hide": "1",
        "len": "5"
      },
      {
        "edit_rules": {
          "maxlength": "5"
        },
        "hide": "1",
        "len": "5"
      },
      {
        "edit_rules": {
          "maxlength": "5"
        },
        "hide": "1",
        "len": "5"
      },
      {
        "dtype": "nvarchar",
        "frm_options": {
          "custom": "SetResetGPSLink",
          "isExptoExl": "false"
        },
        "hide": "10",
        "len": "50",
        "pscol": "16"
      }
    ],
    "sfilters": [
      {
        "isCompulsory": "True",
        "s_fld_idx": "4"
      },
      {
        "s_fld_idx": "0"
      }
    ]
  },
  "72": {
    "dmlop": "IUD",
    "cols": [
      {
        "dtype": "int",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "15"
        },
        "len": "15"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "len": "50"
      },
      {
        "dtype": "date"
      },
      {
        "dtype": "numeric"
      },
      {
        "edit_rules": {
          "maxlength": "20"
        },
        "len": "20"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "5"
      }
    ]
  },
  "74": {
    "dmlop": "IUD",
    "frm_attrib": {
      "custmsg_add": "gp2029",
      "form_load": "DealerVisitFormLoad(qid)",
      "offlineCallType": "DealerVisit"
    },
    "grid_attrib": {
      "custom_menu_item_click": "GetVisitDealerId(qid,3)",
      "RenderGridForcefully": true,
      "after_grid_load": "GetDealerName(qid,data)",
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "bigint",
        "edit": "False",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "defvalue": "cur_visit_id",
        "dtype": "int",
        "edit": "False",
        "hide": "1",
        "nul": "0",
        "pscol": "19"
      },
      {
        "defvalue": "sl_login_attr:EmpCode",
        "edit": "False",
        "edit_rules": {
          "maxlength": "6"
        },
        "len": "15",
        "nul": "0"
      },
      {
        "defvalue": "DLR:CustomerId",
        "dtype": "nvarchar",
        "edit": "False",
        "eopt": "dealer_code",
        "etype": "sselect",
        "len": "15"
      },
      {
        "defvalue": "date:today",
        "dtype": "date",
        "edit": "False",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "dealer_complaint",
        "etype": "sselect"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "len": "-1"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "len": "-1"
      }
    ],
    "isForm": "True"
  },
  "79": {
    "formtype": "tabs",
    "dmlop": "IUD",
    "formgroups": [
      [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13
      ],
      [
        14,
        15,
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        28,
        29,
        30,
        31
      ]
    ],
    "frm_attrib": {
      "custom_save": "SaveRakeDetails(params)",
      "postDML": "enableRake()"
    },
    "grid_attrib": {
      "dialog_header": [
        "Rake No"
      ]
    },
    "cols": [
      {
        "edit_rules": {
          "maxlength": "20"
        },
        "fldevent": "change:getdispatchdetails()",
        "frm_options": {
          "submenu": "179_248"
        },
        "hide": "0",
        "len": "20",
        "nul": "0",
        "pscol": "19"
      },
      {
        "defvalue": "sl_login_attr:RegionCode",
        "eopt": "region",
        "etype": "sselect",
        "hide": "01",
        "len": "4"
      },
      {
        "defvalue": "sl_login_attr:DepotCode",
        "eopt": "depotwise",
        "etype": "sselect",
        "hide": "01",
        "len": "10"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "hide": "0",
        "len": "50",
        "nul": "0"
      },
      {
        "dtype": "date",
        "hide": "0"
      },
      {
        "dtype": "int",
        "eopt": "raketypes",
        "etype": "sselect",
        "hide": "01"
      },
      {
        "dtype": "numeric",
        "hide": "01"
      },
      {
        "dtype": "date",
        "hide": "1"
      },
      {
        "dtype": "datetime",
        "hide": "01"
      },
      {
        "dtype": "date",
        "hide": "1"
      },
      {
        "dtype": "datetime",
        "hide": "01"
      },
      {
        "dtype": "datetime",
        "hide": "01"
      },
      {
        "edit_rules": {
          "maxlength": "20"
        },
        "hide": "01",
        "len": "20"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "hide": "01",
        "len": "-1"
      },
      {
        "dtype": "numeric",
        "hide": "0"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "weather_condition",
        "etype": "sselect",
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "yes_no",
        "etype": "radio",
        "hide": "01"
      },
      {
        "dtype": "int",
        "eopt": "stock_condition",
        "etype": "sselect",
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "hide": "01",
        "len": "-1"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "hide": "01",
        "len": "-1"
      },
      {
        "dtype": "numeric",
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "hide": "01",
        "len": "-1"
      },
      {
        "dtype": "numeric",
        "hide": "01"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "hide": "01",
        "len": "-1"
      },
      {
        "dtype": "nvarchar",
        "etype": "textarea",
        "hide": "01",
        "len": "-1"
      },
      {
        "dtype": "numeric",
        "hide": "01"
      },
      {
        "edit_rules": {
          "maxlength": "500"
        },
        "hide": "01",
        "len": "500"
      },
      {
        "dtype": "date",
        "hide": "01"
      },
      {
        "dtype": "date",
        "hide": "01"
      },
      {
        "defvalue": "sl_login_attr:EmpCode",
        "edit": "False",
        "len": "50"
      }
    ]
  },
  "8": {
    "dmlop": "IUD",
    "frm_attrib": {
      "cust_buttons": "CustomSAPButtonSaleOrder(qid)",
      "custom_save": "SaveSaleOrder(params,qid)",
      "form_load": "SetUpdateOff(qid)"
    },
    "grid_attrib": {
      "custom_menu_item_click": "GetVisitDealerId(qid)",
      "RenderGridForcefully": true,
      "after_grid_load": "GetDealerName(qid,data)",
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "bigint",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "edit": "False",
        "len": "50"
      },
      {
        "defvalue": "date:today",
        "dtype": "date",
        "edit": "False",
        "nul": "0"
      },
      {
        "defvalue": "DLR:CustomerId",
        "dtype": "nvarchar",
        "eopt": "dealer_code",
        "etype": "sselect",
        "fldevent": "change:getshiptopartydealerid()",
        "len": "15",
        "nul": "0"
      },
      {
        "eopt": "shiptoparty",
        "etype": "sselect",
        "fldevent": "change:GetShippingDestinationDetails()",
        "frm_options": {
          "isInitialCall": "false"
        },
        "len": "15",
        "nul": "0"
      },
      {
        "edit_rules": {
          "type": "nohash"
        },
        "hide": "01",
        "len": "50",
        "nul": "0"
      },
      {
        "defvalue": "date:today",
        "dtype": "date",
        "edit": "False",
        "hide": "01"
      },
      {
        "edit_rules": {
          "maxlength": "2"
        },
        "hide": "01",
        "len": "2",
        "nul": "0"
      },
      {
        "eopt": "alldepot",
        "etype": "sselect",
        "fldevent": "change:getShippingPoint()",
        "frm_options": {
          "isInitialCall": "false"
        },
        "len": "50",
        "nul": "0"
      },
      {
        "edit_rules": {
          "type": "Address"
        },
        "eopt": "shiptopartydesti",
        "etype": "sselect",
        "len": "50",
        "nul": "0"
      },
      {
        "etype": "sselect",
        "fldevent": "change:getShippingPointDesc()",
        "hide": "01",
        "len": "4",
        "nul": "0"
      },
      {
        "edit": "False",
        "edit_rules": {
          "type": "Address"
        },
        "hide": "01",
        "len": "30",
        "nul": "0"
      },
      {
        "edit_rules": {
          "type": "Address"
        },
        "len": "50",
        "nul": "0"
      },
      {
        "edit_rules": {
          "type": "Address"
        },
        "hide": "01",
        "len": "50"
      },
      {
        "defvalue": "2",
        "eopt": "prism_brands",
        "etype": "sselect",
        "fldevent": "change:GetMaterialDesc()",
        "len": "50",
        "nul": "0"
      },
      {
        "edit": "False",
        "edit_rules": {
          "type": "Address"
        },
        "hide": "01",
        "len": "-1"
      },
      {
        "dtype": "numeric",
        "nul": "0"
      },
      {
        "edit": "False",
        "edit_rules": {
          "type": "Address"
        },
        "hide": "01",
        "len": "50",
        "nul": "0"
      },
      {
        "edit": "False",
        "hide": "01",
        "len": "50",
        "nul": "0"
      },
      {
        "eopt": "transporter",
        "etype": "sselect",
        "hide": "01",
        "len": "50"
      },
      {
        "edit_rules": {
          "type": "Address"
        },
        "etype": "textarea",
        "hide": "01",
        "len": "500"
      },
      {
        "hide": "1",
        "len": "5"
      },
      {
        "hide": "1",
        "len": "5"
      },
      {
        "hide": "1",
        "len": "5"
      },
      {
        "hide": "1",
        "len": "5"
      }
    ]
  },
  "80": {
    "dmlop": "IUD",
    "frm_attrib": {
      "form_load": "SetRakeNo(qid)",
      "postDMLRefresh": "PostProcessOperation(qid)"
    },
    "grid_attrib": {
      "refresh": false
    },
    "cols": [
      {
        "dtype": "bigint",
        "hide": "1",
        "pscol": "2"
      },
      {
        "edit_rules": {
          "maxlength": "20"
        },
        "frm_options": {
          "par_fld": "RakeNo"
        },
        "hide": "1",
        "len": "20",
        "pscol": "18"
      },
      {
        "dtype": "int",
        "edit_rules": {
          "maxlength": "9",
          "type": "onlynumbers"
        },
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        }
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        }
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        }
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        }
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        }
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        }
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        }
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        }
      },
      {
        "dtype": "numeric",
        "edit_rules": {
          "type": "nonegative"
        }
      }
    ]
  },
  "81": {
    "dmlop": "IUD",
    "frm_attrib": {
      "Save": "Send SMS For New Password"
    },
    "cols": [
      {
        "dtype": "int",
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "0",
        "len": "100"
      },
      {
        "edit_rules": {
          "maxlength": "50"
        },
        "hide": "1",
        "len": "50"
      }
    ]
  },
  "82": {
    "dmlop": "IUD",
    "cols": [
      {
        "dtype": "int",
        "edit_rules": {
          "maxlength": "10"
        },
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "100"
        },
        "frm_options": {
          "fld_container_class": "hi80"
        },
        "len": "100",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "100"
        },
        "etype": "password",
        "frm_options": {
          "fld_container_class": "hi80"
        },
        "len": "100",
        "nul": "0"
      },
      {
        "edit_rules": {
          "type": "pwd"
        },
        "etype": "password",
        "frm_options": {
          "fld_container_class": "hi80",
          "password_validator": "PasswordValidation(cobj)"
        },
        "len": "100",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "100"
        },
        "etype": "password",
        "frm_options": {
          "fld_container_class": "hi80",
          "password_validator": "PasswordValidation(cobj)"
        },
        "len": "100",
        "nul": "0"
      }
    ]
  },
  "83": {
    "dmlop": "UD",
    "frm_attrib": {
      "form_load": "DisableTarget()"
    },
    "grid_attrib": {
      "HelpPath": "KRA.html",
      "sort_column": [
        [
          1,
          "desc"
        ]
      ]
    },
    "cols": [
      {
        "dtype": "bigint",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "eopt": "roles",
        "etype": "sselect",
        "hide": "10",
        "len": "20"
      },
      {
        "dtype": "int"
      },
      {
        "dtype": "int"
      },
      {
        "edit_rules": {
          "maxlength": "20"
        },
        "len": "20"
      },
      {
        "dtype": "nvarchar",
        "edit_rules": {
          "maxlength": "6"
        },
        "len": "6"
      },
      {
        "edit_rules": {
          "maxlength": "500"
        },
        "len": "500"
      },
      {
        "dtype": "nvarchar",
        "len": "-1"
      },
      {
        "dtype": "numeric"
      },
      {
        "dtype": "bit",
        "hide": "1"
      },
      {
        "dtype": "numeric"
      },
      {
        "dtype": "bit",
        "hide": "1"
      }
    ],
    "sfilters": [
      {
        "s_fld_idx": "1"
      }
    ]
  },
  "84": {
    "grid_attrib": {
      "data_fld_cnt": "6",
      "after_grid_load": "SearchDashboard(qid,data)"
    },
    "cols": [
      {
        "dtype": "nchar"
      },
      {
        "eopt": "zone_region_depot",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "1|2|3"
        },
        "len": "-1",
        "nul": "0"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "isInitialCall": "false",
          "pcfld": "1|2|3"
        },
        "len": "-1",
        "nul": "0"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "1|2|3"
        },
        "len": "-1",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "15"
        },
        "len": "15",
        "nul": "0"
      },
      {
        "dtype": "decimal"
      },
      {
        "len": "15",
        "nul": "0"
      },
      {
        "len": "15",
        "nul": "0"
      },
      {
        "dtype": "date",
        "etype": "Quatermonth",
        "frm_options": {
          "qmfld": "9"
        },
        "nul": "0"
      },
      {
        "dtype": "date",
        "hide": "1",
        "nul": "0"
      },
      {
        "defvalue": "2",
        "eopt": "prism_brands",
        "etype": "sselect",
        "hide": "1",
        "len": "-1",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "10"
        },
        "len": "10"
      }
    ],
    "sfilters": [
      {
        "isCompulsory": "True",
        "s_fld_idx": "8"
      },
      {
        "s_fld_idx": "1"
      },
      {
        "s_fld_idx": "2"
      },
      {
        "s_fld_idx": "3"
      },
      {
        "s_fld_idx": "10"
      }
    ]
  },
  "86": {
    "dmlop": "IUD",
    "frm_attrib": {
      "Cancel": "Not Approve",
      "form_load": "DisableAppReason()",
      "Update": "Approve"
    },
    "cols": [
      {
        "dtype": "bigint",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      },
      {
        "edit": "False",
        "edit_rules": {
          "maxlength": "50"
        },
        "hide": "0",
        "len": "50",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "eopt": "dealer",
        "etype": "sselect",
        "hide": "0",
        "len": "30",
        "nul": "0"
      },
      {
        "dtype": "date",
        "edit": "False",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "money",
        "edit": "False",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "edit": "False",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "edit": "False",
        "hide": "0",
        "nul": "0"
      },
      {
        "dtype": "numeric",
        "edit": "False",
        "hide": "01",
        "nul": "0"
      },
      {
        "edit_rules": {
          "type": "Address"
        },
        "eopt": "credit_limit_approval_reason",
        "etype": "sselect",
        "hide": "01",
        "len": "5",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "hide": "01",
        "len": "-1"
      },
      {
        "defvalue": "sl_login_attr:EmpCode",
        "dtype": "nvarchar",
        "edit": "False",
        "edit_rules": {
          "maxlength": "40"
        },
        "hide": "01",
        "len": "40"
      },
      {
        "defvalue": "date:today",
        "dtype": "date",
        "edit": "False",
        "hide": "0"
      }
    ]
  },
  "9": {
    "dmlop": "IUD",
    "cols": [
      {
        "dtype": "nvarchar",
        "eopt": "empcode_tsemaster",
        "etype": "sselect",
        "len": "20",
        "nul": "0",
        "pscol": "19"
      },
      {
        "eopt": "zone_region_depot",
        "etype": "pcselect",
        "frm_options": {
          "pcfld": "1|2|3"
        },
        "hide": "01",
        "len": "10"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "isInitialCall": "false",
          "pcfld": "1|2|3"
        },
        "hide": "01",
        "len": "10"
      },
      {
        "etype": "pcselect",
        "fldevent": "change:GetGroupCode()",
        "frm_options": {
          "pcfld": "1|2|3"
        },
        "hide": "01",
        "len": "10"
      },
      {
        "etype": "pcselect",
        "frm_options": {
          "type": "multiselect"
        },
        "len": "500",
        "nul": "0"
      },
      {
        "dtype": "bigint",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      }
    ]
  },
  "92": {
    "frm_attrib": {
      "form_load": "SetCurrentMthYr(qid)"
    },
    "grid_attrib": {
      "data_fld_cnt": "9",
      "custom_menu_item_click": "RenderKRA(qid)",
      "after_grid_load": "AddBalance(qid,data)",
      "hide_update_icon": "true"
    },
    "cols": [
      {
        "dtype": "int",
        "eopt": "calendar_month",
        "etype": "sselect",
        "frm_options": {
          "client_sort": "false"
        },
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "calendar_year",
        "etype": "sselect",
        "hide": "1",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "1",
        "len": "100",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "len": "-1"
      },
      {
        "dtype": "nvarchar",
        "len": "-1"
      },
      {
        "dtype": "numeric(18,2)"
      },
      {
        "dtype": "numeric(18,2)"
      },
      {
        "dtype": "numeric(18,2)"
      },
      {
        "dtype": "numeric(18,2)"
      },
      {
        "dtype": "nvarchar",
        "eopt": "empcode_csr",
        "etype": "sselect",
        "hide": "1",
        "len": "40",
        "nul": "0"
      }
    ],
    "sfilters": [
      {
        "isCompulsory": "True",
        "s_fld_idx": "0"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "1"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "9"
      }
    ]
  },
  "93": {
    "frm_attrib": {
      "form_load": "SetCurrentMthYr(qid)"
    },
    "grid_attrib": {
      "data_fld_cnt": "9",
      "custom_menu_item_click": "RenderKRA(qid)",
      "after_grid_load": "AddBalance(qid,data)",
      "hide_update_icon": "true"
    },
    "cols": [
      {
        "dtype": "int",
        "eopt": "calendar_month",
        "etype": "sselect",
        "frm_options": {
          "client_sort": "false"
        },
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "calendar_year",
        "etype": "sselect",
        "hide": "1",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "1",
        "len": "100",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "len": "-1"
      },
      {
        "dtype": "nvarchar",
        "frm_options": {
          "custom": "KRACust",
          "isExptoExl": "false"
        },
        "len": "-1"
      },
      {
        "dtype": "numeric(18,2)"
      },
      {
        "dtype": "numeric(18,2)"
      },
      {
        "dtype": "numeric(18,2)"
      },
      {
        "dtype": "numeric(18,2)"
      },
      {
        "dtype": "nvarchar",
        "eopt": "empcode_rhm",
        "etype": "sselect",
        "hide": "1",
        "len": "40",
        "nul": "0"
      }
    ],
    "sfilters": [
      {
        "isCompulsory": "True",
        "s_fld_idx": "0"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "1"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "9"
      }
    ]
  },
  "94": {
    "dmlop": "U",
    "frm_attrib": {
      "form_load": "SetCurrentMthYr(qid)"
    },
    "grid_attrib": {
      "data_fld_cnt": "9",
      "custom_menu_item_click": "RenderKRA(qid)",
      "after_grid_load": "AddBalance(qid,data)",
      "hide_update_icon": "true"
    },
    "cols": [
      {
        "dtype": "int",
        "eopt": "calendar_month",
        "etype": "sselect",
        "frm_options": {
          "client_sort": "false"
        },
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "calendar_year",
        "etype": "sselect",
        "hide": "1",
        "nul": "0"
      },
      {
        "edit": "False",
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "1",
        "len": "100",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "len": "-1"
      },
      {
        "dtype": "nvarchar",
        "edit": "False",
        "etype": "textarea",
        "frm_options": {
          "custom": "KRACust",
          "isExptoExl": "false"
        },
        "len": "-1"
      },
      {
        "dtype": "numeric(18,2)",
        "edit": "False"
      },
      {
        "dtype": "numeric(18,2)",
        "edit": "False"
      },
      {
        "dtype": "numeric(18,2)",
        "edit": "False"
      },
      {
        "dtype": "numeric(18,2)"
      },
      {
        "dtype": "nvarchar",
        "eopt": "empcode_tse",
        "etype": "sselect",
        "hide": "1",
        "len": "40",
        "nul": "0"
      },
      {
        "dtype": "bigint",
        "hide": "1",
        "nul": "0",
        "pscol": "2"
      }
    ],
    "sfilters": [
      {
        "isCompulsory": "True",
        "s_fld_idx": "0"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "1"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "9"
      }
    ]
  },
  "95": {
    "frm_attrib": {
      "form_load": "SetCurrentMthYr(qid)"
    },
    "grid_attrib": {
      "data_fld_cnt": "9",
      "custom_menu_item_click": "RenderKRA(qid)",
      "after_grid_load": "AddBalance(qid,data)",
      "hide_update_icon": "true"
    },
    "cols": [
      {
        "dtype": "int",
        "eopt": "calendar_month",
        "etype": "sselect",
        "frm_options": {
          "client_sort": "false"
        },
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "calendar_year",
        "etype": "sselect",
        "hide": "1",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "1",
        "len": "100",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "len": "-1"
      },
      {
        "dtype": "nvarchar",
        "frm_options": {
          "custom": "KRACust",
          "isExptoExl": "false"
        },
        "len": "-1"
      },
      {
        "dtype": "numeric(18,2)"
      },
      {
        "dtype": "numeric(18,2)"
      },
      {
        "dtype": "numeric(18,2)"
      },
      {
        "dtype": "numeric(18,2)"
      },
      {
        "dtype": "nvarchar",
        "eopt": "empcode_tsm",
        "etype": "sselect",
        "hide": "1",
        "len": "40",
        "nul": "0"
      }
    ],
    "sfilters": [
      {
        "isCompulsory": "True",
        "s_fld_idx": "0"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "1"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "9"
      }
    ]
  },
  "96": {
    "frm_attrib": {
      "form_load": "SetCurrentMthYr(qid)"
    },
    "grid_attrib": {
      "data_fld_cnt": "9",
      "custom_menu_item_click": "RenderKRA(qid)",
      "after_grid_load": "AddBalance(qid,data)",
      "hide_update_icon": "true"
    },
    "cols": [
      {
        "dtype": "int",
        "eopt": "calendar_month",
        "etype": "sselect",
        "frm_options": {
          "client_sort": "false"
        },
        "hide": "1",
        "nul": "0"
      },
      {
        "dtype": "int",
        "eopt": "calendar_year",
        "etype": "sselect",
        "hide": "1",
        "nul": "0"
      },
      {
        "edit_rules": {
          "maxlength": "100"
        },
        "hide": "1",
        "len": "100",
        "nul": "0"
      },
      {
        "dtype": "nvarchar",
        "len": "-1"
      },
      {
        "dtype": "nvarchar",
        "frm_options": {
          "custom": "KRACust",
          "isExptoExl": "false"
        },
        "len": "-1"
      },
      {
        "dtype": "numeric(18,2)"
      },
      {
        "dtype": "numeric(18,2)"
      },
      {
        "dtype": "numeric(18,2)"
      },
      {
        "dtype": "numeric(18,2)"
      },
      {
        "dtype": "nvarchar",
        "eopt": "empcode_zhm",
        "etype": "sselect",
        "hide": "1",
        "len": "40",
        "nul": "0"
      }
    ],
    "sfilters": [
      {
        "isCompulsory": "True",
        "s_fld_idx": "0"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "1"
      },
      {
        "isCompulsory": "True",
        "s_fld_idx": "9"
      }
    ]
  }
}