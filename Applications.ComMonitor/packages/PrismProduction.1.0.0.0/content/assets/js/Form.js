var gCurRowId = -1;
var gCurRow;

function myForm()
{
    var ar_html, cname, cols, ar_date, ar_upload_file, search_attrib, fdiv, prefix, qid, qheader, lang_header, ar_dynamic_select, ar_multi_select, cust_event, ar_month_qtr;
}
myForm.prototype =
{
    drawForm: function (qid, qheader, formdiv, optype, id)
    {
        this.ar_html = new Array();
        var ar_fdata = this.ar_html;
        this.ar_date = new Array();
        this.ar_upload_file = new Array();
        this.qheader = qheader;
        this.qid = qid;
        this.lang_header = LangHeaders[this.qid];
        this.cust_event = new Array();
        //if (!qheader.hasOwnProperty("dml_op"))
        //    qheader.dml_op = DefaultQueryOptions.dml_op;

        if (!qheader.hasOwnProperty("qid"))
            qheader.qid = qid;

        if (qheader.form_attrib)
        {
            if (qheader.form_attrib.form_div != null)
                formdiv = qheader.form_attrib.form_div;
        }

        this.fdiv = "#" + formdiv;
        this.prefix = formdiv + "_";
        var fdiv = this.fdiv;
        this.cname = this.lang_header.colnames;
        this.cols = qheader.cols;
        qheader.frmObj = this.fdiv;

        var org_type = optype;
        if (optype == "UpdateM")
            optype = "Update";

        this.qheader.optype = this.optype = optype;
        var isParForm = false;
        if (optype == "Search")
        {
            DrawSearchForm(this, qid, ar_fdata);
            ProcessControls(this);
            if (qheader.frm_attrib && qheader.frm_attrib.form_load)
            {
                eval(qheader.frm_attrib.form_load);
            }
            SetDefaultCSS(this, fdiv, qheader, isParForm);
            this.convertToDate();
            return;
        }

        if (id != null && optype == "Update")
        {
            gCurRowId = id;
            gCurRow = FillCurRowData(qid);
        }
        if ($(fdiv).hasClass("modal-content") || $(fdiv).find(".modal-content").length >= 1)
            $(fdiv + " .modal-content").empty();
        else
        {
            $(fdiv).empty();
            isParForm = true;
        }

        if (!isParForm)
        {
            /*Header Starts*/
            ar_fdata.push("<div class='modal-header'>");
            ar_fdata.push("<button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'> X </span><span class='sr-only'>Close</span></button>");
            ar_fdata.push("<h4 class='modal-title' id='myModalLabel'>" + this.lang_header.caption + "</h4>");
            ar_fdata.push("</div>");
            /*Header Ends*/
        }


        ar_fdata.push("<div class='modal-body'> <form qid=" + this.qid + " class='form-horizontal' data-bv-feedbackicons-valid='glyphicon glyphicon-ok' data-bv-feedbackicons-invalid='glyphicon glyphicon-remove' data-bv-feedbackicons-validating='glyphicon glyphicon-refresh'><div class='popup_bg'>")

        DrawHorizontalForm(this, ar_fdata, org_type);
        ar_fdata.push("<br class='clear'/> </div></form></div>")
        ar_fdata.push("<div class='modal-footer'>"); //footer starts
        ar_fdata.push("<div class='frm_footer' id='frm_buttons_" + this.qid + "' > </div>");
        ar_fdata.push("</div>");
        if (isParForm)
            $(fdiv).html(ar_fdata.join(''));
        else
            $(fdiv + " .modal-content").html(ar_fdata.join(''));

        ProcessFileUploads(this.ar_upload_file, qid);
        ProcessControls(this);
        OpenFormInPopup(this, fdiv, qheader, org_type, isParForm);
        this.convertToDate();

        if (qheader.frm_attrib && qheader.frm_attrib.form_load)
        {
            eval(qheader.frm_attrib.form_load);
        }

        //$(fdiv).find("form").bootstrapValidator(
        //{
        //    excluded: [':hidden', ':not(:visible)']
        //}).bootstrapValidator('validate');        
    },
    drawGroup: function (grpname, sfilters, cnames, issearch, DisplayMode, org_type)
    {
        var fqheader = this.qheader;
        var cid;
        var cols = 1;

        var ar_html = this.ar_html;

        var curr_col_len = cnames.length;
        var style_str;
        for (var i = 0; i < curr_col_len; i++)
        {
            var name = this.lang_header.colnames[cnames[i]];
            var cmodal = this.cols;
            var cobj = cmodal[cnames[i]];

            AssignDefaultProperties(cobj, name);
            style_str = "";

            if (cobj.pscol == 6 || cobj.pscol == 11 || cobj.pscol == 5 || cobj.pscol == 10)//((cobj.hide == "1" || cobj.hide=="10") && (org_type!="Search")) ||
                continue;

            cid = this.prefix + i;

            if (((cobj.nul == "0") && (cobj.pscol == 0 || cobj.pscol == 17 || cobj.pscol == 16 || cobj.pscol == 19) && !issearch) || (issearch && sfilters[i].isCompulsory == "True")) //&& !issearch pscol=17 is for password and pscol 19 is for primary key, pscol 16 is for field alias
                name = name + " <span class='star'> * </span>";

            var single_col_class = "";
            if (curr_col_len <= 8)
                single_col_class = "col-md-12";
            else
                single_col_class = "col-md-6";

            if ((cobj.hide == "1" || cobj.hide == "10") && !issearch)
                style_str = " style='display:none' ";

            var fld_container_class = "";
            if (cobj.frm_options != null)
            {
                if (cobj.frm_options.fld_container_class != null)
                    fld_container_class = cobj.frm_options.fld_container_class;
            }

            ar_html.push("<div class='pull-left form-group hi40 " + fld_container_class + " " + single_col_class + " col-sm-12 col-xs-12' " + style_str + ">") //class for specifying the height marbot20
            ar_html.push("<label class='col-sm-4 control-label CaptionTD' for='textinput'>" + name + "</label> ");
            ar_html.push("<div class='DataTD col-sm-8'>")
            this.addControl(cobj, issearch);
            ar_html.push("</div></div>");
        }
    },
    convertToDate: function ()
    {
        var fdiv = this.fdiv;
        var ar_date = this.ar_date;
        var past_date = null;
        var end_date;// pratik
        var col_obj;
        var date_range;
        for (var i = 0; i < ar_date.length; i++)
        {
            date_range = false;
            col_obj = this.cols[ar_date[i].name];
            end_date = null;
            if (col_obj.frm_options != null)
            {
                if (col_obj.frm_options.disable_past != null && col_obj.frm_options.disable_past == "true")
                    past_date = new Date();

                if (col_obj.frm_options.disable_future != null && col_obj.frm_options.disable_future == "true")// pratik
                {
                    if (col_obj.frm_options.date != null)
                    {
                        end_date = new Date();
                        end_date.setDate(end_date.getDate() - col_obj.frm_options.date);
                    }
                    else
                        end_date = new Date();
                }

                if (col_obj.frm_options.date_range != null && col_obj.frm_options.date_range == "true")
                    date_range = true;
            }
            if (date_range == true && ar_date[i].dtype == "date")
            {
                $(fdiv + "_" + ar_date[i].name).daterangepicker(
                {
                    ranges: {
                        'Today': [moment(), moment()],
                        'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
                        'Last 7 Days': [moment().subtract('days', 6), moment()],
                        'Last 30 Days': [moment().subtract('days', 29), moment()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                        'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
                    },
                    locale: {
                        cancelLabel: 'Clear'
                    },
                    showDropdowns: true,
                    format: 'DD-MMM-YYYY',
                    startDate: moment().subtract('days', 3),
                    endDate: moment()
                }).on('cancel.daterangepicker', function (ev, picker)
                {
                    $(this).val("");
                });
            }
            else if (date_range == true && (ar_date[i].dtype == "datetime" || ar_date[i].dtype == "smalldatetime"))
            {
                $(fdiv + "_" + ar_date[i].name).daterangepicker(
                {
                    ranges: {
                        'Today': [moment(), moment()],
                        'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
                        'Last 7 Days': [moment().subtract('days', 6), moment()],
                        'Last 30 Days': [moment().subtract('days', 29), moment()],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                        'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
                    },
                    locale: {
                        cancelLabel: 'Clear'
                    },
                    showDropdowns: true,
                    format: 'DD-MMM-YYYY hh:mm:ss',
                    timePicker: true,
                    timePicker12Hour: false,
                    timePickerIncrement: 30,
                    startDate: moment().subtract('days', 3),
                    endDate: moment()
                }).on('cancel.daterangepicker', function (ev, picker)
                {
                    $(this).val("");
                });
            }
            else if (ar_date[i].dtype == "date")
            {
                $(fdiv + "_" + ar_date[i].name).attr("readOnly", 'true').closest("div.input-group.date").datepicker(
                {
                    format: "dd-M-yyyy",
                    todayBtn: 'linked',
                    disableDateToggle: true,
                    todayHighlight: 1,
                    autoclose: true,
                    clearBtn: true,
                    startDate: past_date,
                    endDate: end_date// pratik
                })
                .on('changeDate', function ()
                {
                    if ($(fdiv).find("form").data('bootstrapValidator')!=null)
                        $(fdiv).find("form").data('bootstrapValidator').revalidateField($(this).find("input").attr("name"));
                    //$(this).find("input").attr("text", $(this).data('datepicker').getFormattedDate('dd-M-yyyy'));                      
                });

            }
            else if (ar_date[i].dtype == "datetime" || ar_date[i].dtype == "smalldatetime")
            {
                $(fdiv + "_" + ar_date[i].name).closest("div.input-group.date").datetimepicker({
                    format: "dd-M-yyyy hh:ii:ss",
                    todayBtn: 1,
                    autoclose: 1,
                    todayHighlight: 1,
                    clearBtn: true,
                    startDate: past_date,
                    endDate: end_date // pratik
                })
                .on('dp.change dp.show', function (e)
                {
                    if ($(fdiv).find("form").data('bootstrapValidator') != null)
                        $(fdiv).find("form").data('bootstrapValidator').revalidateField($(this).find("input").attr("name"));
                    //$(this).find("input").attr("text",$(this).data('datepicker').getFormattedDate('dd-M-yyyy hh:ii:ss'));            
                });
            }
        }
    },

    addControl: function (cobj, issearch)
    {
        var ar_html = this.ar_html;

        if (cobj.etype == "text" || cobj.etype.length == 0)
            this.getTextBox(cobj, issearch);
        else if (cobj.etype == "sselect" || cobj.etype == "dselect" || cobj.etype == "pcselect")
            this.getSelect(cobj, issearch);
        else if (cobj.etype == "textarea")
            this.getTextArea(cobj, issearch);
        else if (cobj.etype == "password")
            this.getPassword(cobj);
        else if (cobj.etype == "checkbox")
            this.getCheckBox(cobj, issearch);
        else if (cobj.etype == "radio")
            this.getRadio(cobj, issearch);
        else if (cobj.etype == "Quatermonth")
            this.getQuatermonth(cobj, issearch);
        else if (cobj.etype == "exidemonthquarteryear")
            this.getexidemonthquarteryear(cobj, issearch);
        //else if (cobj.etype == "dselect" || cobj.etype == "dynamicselect")
        //     this.getDselect(cobj, issearch);               
    },
    getPassword: function (cobj)
    {
        var field_index = $.inArray(cobj.name, this.lang_header.colnames);
        var cid = this.prefix + field_index;
        var ar_html = this.ar_html;

        ar_html.push('<input type="password" class="form-control"');
        ar_html.push(" name='" + cobj.name + "'");
        ar_html.push(" id='" + cid + "'");

        SetValidationAttributes(ar_html, cobj);

        if (cobj.frm_options)
        {
            if (cobj.frm_options.password_validator != null)
                ar_html.push(eval(cobj.frm_options.password_validator));
        }

        ar_html.push(" />");
    },
    getCheckBox: function (cobj, issearch)
    {
        var field_index = $.inArray(cobj.name, this.lang_header.colnames);
        var cid = this.prefix + field_index;
        var ar_html = this.ar_html;

        ar_html.push('<input type="checkbox" class="form-control" ');
        ar_html.push(" name='" + cobj.name + "'");
        ar_html.push(" id='" + cid + "'");

        var Evt_Arr = ProcessCustomEvents(cobj, this, cid);

        if (Evt_Arr != null)
            ar_html.push(" on" + Evt_Arr[0] + " = '" + Evt_Arr[1] + "'");

        SetValidationAttributes(ar_html, cobj);
        if (this.optype == 'Update')
        {
            if (gCurRow[field_index] == "True")
                ar_html.push(" checked='checked' ");
        }
        else if (this.optype == 'Add')
        {
            if (cobj.frm_options)
            {
                var type = cobj.frm_options["checked"];
                if (type == "true")
                    ar_html.push(" checked='checked' ");
            }
        }
        ar_html.push(' />');
    },
    getTextBox: function (cobj, issearch)
    {
        var field_index = $.inArray(cobj.name, this.lang_header.colnames);
        var cid = this.prefix + field_index;
        var ar_html = this.ar_html;
        var def_value = cobj.defvalue;
        var filenm = "";

        var today = "";
        var dat_span = "";
        if ((cobj.dtype == "smalldatetime" || cobj.dtype == "date" || cobj.dtype == "datetime") && (cobj.pscol == 0 || cobj.pscol == 16))
        {
            var dobj = new Object();
            dobj["name"] = field_index;
            dobj["dtype"] = cobj.dtype;
            this.ar_date.push(dobj);
            var sty = "";
            if (!issearch && ((cobj.formoptions && cobj.formoptions.disabled) || (cobj.edit == "False")))
                sty = "style='display:none'"
            dat_span = '<span class="input-group-addon" ' + sty + '><i class="glyphicon glyphicon-th"></i></span>';
            // Change done by : Prashant desai
            //Set   "defvalue": "date:today", for Date / smalldatetime / datetime
            if (cobj.dtype == "date")
            {
                if (cobj.hasOwnProperty("defvalue"))
                {
                    if (cobj.defvalue.indexOf("date:today") >= 0)
                    {
                        today = new Date();
                        var dd = today.getDate();
                        var mm = today.getMonth(); //January is 0!
                        var yyyy = today.getFullYear();
                        var MonthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                        if (dd < 10)
                        {
                            dd = '0' + dd
                        }
                        if (mm < 10 && mm != 0)
                        {
                            //mm = '0' + mm
                        }
                        if (cobj.defvalue.indexOf("+") >= 0)
                        {
                            var Incrementof = cobj.defvalue.split('+');
                            mm = mm + eval(Incrementof[1]);
                            if (mm >= 12)
                            {
                                yyyy = yyyy + 1;
                                mm = Incrementof[1] - 1;
                            }
                            //if (MonthArray[mm] == 'Feb')
                            {
                                var lastday = new Date(yyyy, mm + 1, 0).getDate();
                                if (lastday < dd)
                                {
                                    dd = lastday;
                                }
                            }
                            today = dd + '-' + MonthArray[mm] + '-' + yyyy;
                        }
                        else if (cobj.defvalue.indexOf('dd(') >= 0)
                        {
                            //@Jay this is to auto fill value of current date - 1 
                            var Incrementof = cobj.defvalue.split('dd(');
                            //Incrementof = cobj.defvalue.split(')');
                            //dd = dd - eval(Incrementof.substr(0,1));
                            var dVal = cobj.defvalue.substr(cobj.defvalue.indexOf('(') + 1, 1);
                            dd = dd - dVal;

                            if (dd < 10)
                            {
                                dd = '0' + dd
                            }

                            if (dd == 0)
                            {
                                mm = mm - 1;
                            }
                            today = dd + '-' + MonthArray[mm] + '-' + yyyy;
                        }
                        else
                        {
                            today = dd + '-' + MonthArray[mm] + '-' + yyyy;
                        }
                    }
                }
            }
            else if ((cobj.dtype == "smalldatetime" || cobj.dtype == "datetime") && cobj.defvalue == "date:today")
            {
                var today1 = new Date();
                var dd = today1.getDate();
                var mm = today1.getMonth(); //January is 0!
                var yyyy = today1.getFullYear();
                var MonthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                if (dd < 10)
                {
                    dd = '0' + dd
                }
                if (mm < 10 && mm != 0)
                {
                    //mm = '0' + mm
                }
                today = dd + '-' + MonthArray[mm] + '-' + yyyy;

                today += " " + today1.getHours() + ":" + today1.getMinutes() + ":" + today1.getSeconds();
            }

        }
        else if (cobj.dtype == "upload" || cobj.dtype == "image")
        {
            if (isPhoneGap())
                dat_span = "<img class='UploadIcons' title='Take Photo' src=assets/images/arrow_up.png  onclick='PhoneGapSelectImage()' />";
            else
            {
                var up_obj = new Object();
                up_obj["name"] = field_index;
                this.ar_upload_file.push(up_obj);
                dat_span = "<span id=err_" + cid + "></span>";
            }
        }
        else if (cobj.dtype == "capture")
        {
            if (this.optype == "Update")
            {
                if (gCurRow[field_index] != null && gCurRow[field_index].length > 0)
                {
                    filenm = gCurRow[field_index];
                }
            }
            ar_html.push("<input name='" + cobj.name + "' id='" + cid + "' type='button' class='form-control' onclick='capture_image(" + this.qid + "," + cid + ",\"" + filenm + "\")' value='" + cobj.name + "' />");

            if (filenm != null && filenm.length > 0 && this.optype == "Update")
            {
                ar_html.push("<a href='#' onclick='fileDownload(" + null + ",\"" + filenm + "\")'>" + filenm + "</a>");
            }
            return
        }

        ar_html.push("<input ");
        ar_html.push(" name='" + cobj.name + "'");
        ar_html.push(" id='" + cid + "'");
        ar_html.push(" class='form-control' ");

        var Evt_Arr = ProcessCustomEvents(cobj, this, cid);

        if (Evt_Arr != null)
            ar_html.push(" on" + Evt_Arr[0] + " = '" + Evt_Arr[1] + "'");


        SetValidationAttributes(ar_html, cobj);

        if (!issearch && ((cobj.formoptions && cobj.formoptions.disabled) || (cobj.edit == "False")))
        {
            ar_html.push(" disabled='disabled' ");
        }

        if (this.optype == "Update")
        {
            var cur_data = gCurRow[field_index];
            if (cur_data != null)
                ar_html.push(" value='" + cur_data + "' ");
        }
        if (this.optype == "Add" || this.optype == "Search")
        {
            if (today != "")
                ar_html.push(" value='" + today + "'");

            if (def_value != null && def_value.length > 0)
            {
                if (def_value.indexOf("sl_login_attr") != -1)
                {
                    def_value = loginData.loginInfo[def_value.split(':')[1]];
                }
                else if (def_value.indexOf("IHB") != -1 || def_value.indexOf("DLR") != -1 || def_value.indexOf("cur_visit_id") != -1 || def_value.indexOf("GDN") != -1)
                {
                    def_value = ProcessDefValue(def_value);
                }

                ar_html.push(" value = " + def_value + "");
            }
        }
        ar_html.push(" />");
        ar_html.push(dat_span);
    },
    getQuatermonth: function (cobj, issearch)
    {
        var field_index = $.inArray(cobj.name, this.lang_header.colnames);
        var cid = this.prefix + field_index;
        var ar_html = this.ar_html;
        var getyrs;
        getyrs = new Date();
        var disabled = "";

        var setyrs = getyrs.getFullYear();
        var defvalue = cobj.defvalue;
        var qtrmonth;
        if (this.ar_month_qtr == null)
            this.ar_month_qtr = new Array();

        this.ar_month_qtr.push(cid);
        ar_html.push("<select id='" + cid + "' name='Duration'");
        ar_html.push("onchange='Updateonchangeofqtrmnth(this," + this.qid + ")'");
        if (cobj != null && cobj.frm_options != null && cobj.frm_options.viewmon != null)
        {
            disabled = "disabled";
            ar_html.push(disabled);
        }
        ar_html.push(">");
        ar_html.push("<option value=1>Month</option>");
        ar_html.push("<option value=2>Quarter</option>");
        ar_html.push("<option value=3>Yearly</option>");
        ar_html.push("</select>");
        ar_html.push("<select id='mon_qtr' name='Duration2'></select>");
        ar_html.push("<select id='year' name='Duration3'>");
        for (var i = 0; i < 3; i++)
        {
            ar_html.push("<option id=" + i + " value=" + (setyrs - i) + ">" + (setyrs - i) + "</option>");

        }
        ar_html.push("</select>");
    },
    getexidemonthquarteryear: function (cobj, issearch)
    {
        var field_index = $.inArray(cobj.name, this.lang_header.colnames);
        var cid = this.prefix + field_index;
        var ar_html = this.ar_html;
        var disabled = "";
        var defvalue = cobj.defvalue;
        var qtrmonth;
        if (this.ar_month_qtr == null)
            this.ar_month_qtr = new Array();

        this.ar_month_qtr.push(cid);
        ar_html.push("<select id='" + cid + "'");
        ar_html.push("onchange='Updateonchangeofexideqtrmnthyr(this," + this.qid + ")'");
        if (cobj != null && cobj.frm_options != null && cobj.frm_options.viewmon != null)
        {
            disabled = "disabled";
            ar_html.push(disabled);
        }
        ar_html.push(">");
        ar_html.push("<option value='Month'>Month</option>");
        ar_html.push("<option value='Quarter'>Quarter</option>");
        ar_html.push("<option value='Year'>Year</option>");
        ar_html.push("</select>");
        //   ar_html.push("<select id='mon_qtr'></select>");
    },
    getSelect: function (cobj, issearch)
    {

        var field_index = $.inArray(cobj.name, this.lang_header.colnames);
        var cid = this.prefix + field_index;
        var ar_html = this.ar_html;
        var type;
        var pcfld;
        var defvalue = cobj.defvalue;
        var client_sort = true;
        if (defvalue != null && defvalue.length > 0)
        {
            if (defvalue.indexOf("sl_login_attr") != -1)
                defvalue = loginData.loginInfo[cobj.defvalue.split(':')[1]];
            else if (defvalue.indexOf("IHB") != -1 || defvalue.indexOf("DLR") != -1 || defvalue.indexOf("cur_visit_id") != -1 || defvalue.indexOf("GDN") != -1)
                defvalue = ProcessDefValue(defvalue);
        }
        if (cobj.hasOwnProperty("frm_options"))
        {
            if (cobj.frm_options.type != null)
            {
                type = cobj.frm_options.type;
                if (type == "autocomplete")
                {
                    ar_html.push("<input ");
                    ar_html.push(" name='" + cobj.name + "'");
                    ar_html.push(" id='" + cid + "'");
                    SetValidationAttributes(ar_html, cobj);
                    ar_html.push(" class='form-control' />");

                    if (!this.ar_dynamic_select)
                        this.ar_dynamic_select = new Array();
                    this.ar_dynamic_select.push(cid);
                    return;
                }
                else if (type == "multiselect")
                {
                    if (!this.ar_multi_select)
                        this.ar_multi_select = new Array();

                    this.ar_multi_select.push(cid);
                }
            }
            if (cobj.frm_options.pcfld != null)
                pcfld = cobj.frm_options.pcfld;

            if (cobj.frm_options.client_sort != null)
                client_sort = (client_sort == "true")?true:false;
        }

        var lval = gLookup[cobj.eopt];
        var lkey;

        ar_html.push("<select ");

        var Evt_Arr = ProcessCustomEvents(cobj, this, cid);

        if (Evt_Arr != null)
            ar_html.push(" on" + Evt_Arr[0] + " = '" + Evt_Arr[1] + "'");

        //copt = addAttribute(cobj, cid);
        var cls_name = 'form-control';
        if (type === "multiselect")        
            cls_name += " multiSelectionValidation";            
                
        copt = addAttribute(cobj, cid, cls_name);

        
        ar_html.push(copt);

        if (!issearch && ((cobj.formoptions && cobj.formoptions.disabled) || (cobj.edit == "False")))
        {
            ar_html.push(" disabled='disabled' ");
        }
        SetValidationAttributes(ar_html, cobj);
        if (pcfld != null)
        {
            var tmp_arr = pcfld.split('|');
            var len = tmp_arr.length;
            if (field_index != tmp_arr[len - 1])
            {
                ar_html.push(" onchange='UpdateChildLookup(this," + this.qid + ")' ");
                var temp_obj = new Object()
                temp_obj[cid] = "change";

                var isInitialCall = true;
                if (cobj.frm_options && cobj.frm_options.isInitialCall != null && cobj.frm_options.isInitialCall == "false")
                    isInitialCall = false;

                if (isInitialCall)
                    this.cust_event.push(temp_obj);
            }

            if (field_index == tmp_arr[0])
            {
                lkey = lval.li_key;
                lval = lval.li_val;

            }
        }
        else
        {
            if (lval != undefined)
            {

                lval = sortByValue(lval, client_sort);
            }
        }

        ar_html.push(" >");

        var selected = "";
        if (cobj.nul == "1" || issearch)
        {
            if (issearch && (pcfld != null && pcfld.length > 0) && lkey != null && lkey.length == 1)
                ;
            else
                ar_html.push("<option value=''></option>");
        }
        if (lval != null && Object.size(lval) > 0)
        {
            var ar_opt;

            for (var lkup_obj in lval)
            {
                if (this.optype == "Update")
                {
                    if (type == "multiselect")
                    {
                        var arr = gCurRow[field_index].split(",");
                        $.each(arr, function (key, value)
                        {
                            selected = (lval[lkup_obj][0] == value) ? " selected='selected' " : "";
                            //selected = (lkup_obj == value) ? " selected='selected' " : "";
                            if (selected.length > 0)
                                return false;
                        });
                    }
                    else if (pcfld != null)
                        selected = (lval[lkup_obj] == gCurRow[field_index]) ? " selected='selected' " : "";
                    else
                    {
                        //selected = (lkup_obj == gCurRow[field_index]) ? " selected='selected' " : "";
                        selected = (lval[lkup_obj][0] == gCurRow[field_index]) ? " selected='selected' " : "";
                    }
                }
                if (this.optype == "Add")
                {
                    if (defvalue != null && defvalue.length > 0)
                    {
                        selected = (lval[lkup_obj][0] == defvalue) ? " selected='selected' " : "";
                    }
                }
                if (pcfld != null)
                {
                    ar_html.push("<option  value='" + lkey[lkup_obj] + "' " + selected + "");
                    ar_html.push(">" + lval[lkup_obj] + "</option>");

                }
                else
                {
                    //ar_html.push("<option  value='" + lkup_obj + "' " + selected + "");
                    //ar_html.push(">" + lval[lkup_obj] + "</option>");
                    ar_html.push("<option  value='" + lval[lkup_obj][0] + "' " + selected + "");
                    ar_html.push(">" + lval[lkup_obj][1] + "</option>");
                }

            }
        }

        ar_html.push("</select>");
    },
    getRadio: function (cobj, issearch)
    {
        var field_index = $.inArray(cobj.name, this.lang_header.colnames);
        var cid = this.prefix + field_index;
        var ar_html = this.ar_html;

        var lval = gLookup[cobj.eopt];

        if (lval != null && Object.size(lval) > 0)
        {
            var ar_opt;
            var j = 0;
            for (var lkup_obj in lval)
            {
                ar_html.push("<label class='radio-inline'><input ");
                ar_html.push(" name='" + cobj.name + "'");
                ar_html.push(" id='" + cid + "'");
                SetValidationAttributes(ar_html, cobj);
                if (this.optype == "Update")
                {
                    if (lkup_obj == gCurRow[field_index])
                        ar_html.push(" checked='checked'");
                }

                var Evt_Arr;
                if (j == 0)
                    Evt_Arr = ProcessCustomEvents(cobj, this, cid);

                if (Evt_Arr != null)
                    ar_html.push(" on" + Evt_Arr[0] + " = " + Evt_Arr[1]);


                ar_html.push(" type = 'radio' value='" + lkup_obj + "' /> ");
                ar_html.push(lval[lkup_obj]);
                ar_html.push("</label>")
                j = j + 1;
            }
        }

        ar_html.push()
    },
    getTextArea: function (cobj, issearch)
    {
        var field_index = $.inArray(cobj.name, this.lang_header.colnames);
        var cid = this.prefix + field_index;
        var ar_html = this.ar_html;
        var cls = "";
        if (((cobj.pscol != 0 && cobj.pscol != 19) && !issearch) || (cobj.frm_options && cobj.frm_options.class != ""))
        {
            cls = cobj.frm_options.class;
        }

        ar_html.push("<textarea class='form-control " + cls + "' ");

        if (((cobj.pscol != 0 && cobj.pscol != 19) && !issearch))
        {
            ar_html.push(" disabled='disabled' ");
        }

        if (cobj.edit == "False")
            ar_html.push(" disabled='disabled'");

        ar_html.push(" name='" + cobj.name + "'");
        ar_html.push(" id='" + cid + "'");
        SetValidationAttributes(ar_html, cobj);
        ar_html.push(">");
        if (this.optype == "Update")
        {
            var cur_data = gCurRow[field_index];
            ar_html.push(cur_data);
        }
        ar_html.push("</textarea>");
    },
    DrawFormFooter: function (org_type)
    {
        var save = (this.optype == "Update") ? "Update" : (this.optype == "Add" ? "Save" : this.optype);
        var cancel = "Cancel";
        var ar_html = this.ar_html;

        var viewMode = false;

        if (this.qheader.dmlop != null && (this.qheader.dmlop.toUpperCase().indexOf("V") >= 0 || this.qheader.dmlop.toUpperCase().indexOf("U") < 0))    //   change by Pratik 
            viewMode = true;

        var upd = false, ins = false;
        if (this.optype == "Update" && org_type == "Update" && viewMode == false)
            upd = true;
        if (this.qheader.dmlop != null && this.qheader.dmlop.toLowerCase().indexOf('i') >= 0)
            ins = true;

        var qid = this.qheader.qid;
        var btnobj = null;

        if (this.qheader.frm_attrib && this.qheader.frm_attrib.cust_buttons)
        {
            btnobj = eval(this.qheader.frm_attrib.cust_buttons);
        }

        if (save != "" || cancel != "" || btnobj != null)
            this.InitButtons(this.fdiv, qid, upd, ins, save, cancel, btnobj, viewMode);
    },
    InitButtons: function (fdiv, qid, upd, ins, save, cancel, btnobj, viewMode)
    {
        var fqheader = this.qheader;

        var $fbtn = $(fqheader.frmObj).find("#frm_buttons_" + qid);
        $fbtn.addClass('ui-dialog-buttonpane');
        var barray = new Array();

        if (fqheader.frm_attrib)
        {
            if (fqheader.frm_attrib.Save)
                save = fqheader.frm_attrib.Save;

            if (fqheader.frm_attrib.Update)
                save = fqheader.frm_attrib.Update;

            if (fqheader.frm_attrib.Cancel)
                cancel = fqheader.frm_attrib.Cancel;
        }

        //if (upd)
        //{
        //    barray.push("<button> < </button>"); //Prev
        //    barray.push("<button> > </button>"); //Next
        //}
        //if (ins)
        //    barray.push("<button title='Duplicate Record'> ^ </button>"); //Duplicate

        barray.push("<div style='float:right; ");
        //if (fqheader.form_attrib != null && (!fqheader.form_attrib.display_navigation_btn && upd))
        //{
        //    barray.push("margin-left: 43px;");
        //}
        barray.push("' > ");
        if (btnobj != null)
        {
            for (var key in btnobj)
            {
                var val = btnobj[key];
                barray.push("<button fid='" + fdiv + "'>" + key + "</button>");  // change by Pratik
            }
        }

        if (save)
        {
            if (fqheader.optype == "Add" || (fqheader.optype == "Update" && viewMode == false) || (fqheader.optype == "ChangePassword") || (fqheader.optype == "ForgotPassword"))
                barray.push("<button fid='" + fdiv + "'>" + save + "</button>");
        }

        if (cancel)
        {
            if (viewMode == true)
                cancel = "Close";

            barray.push("<button fid='" + fdiv + "'>" + cancel + "</button>");
        }
        barray.push("</div>");

        $fbtn.html(barray.join(''));

        var btns = $fbtn.find("button");
        var cnnt = 0;
        var i = 0;
        //if (upd)
        //{
        //    cnnt = 2;
        //    $(btns[i]).button({                
        //        label: " < ",
        //        text: true
        //    }).click(function (event)
        //    { formNavigation(fdiv, true, qid) }).addClass("FormNavigation");

        //    i = i + 1;

        //    $(btns[i]).button({                
        //        label: " > ",
        //        text: true
        //    }).click(function (event)
        //    { formNavigation(fdiv, false, qid) }).addClass("FormNavigation");
        //    i = i + 1;
        //}

        //if (ins)
        //{
        //    $(btns[i]).button({               
        //        label: " ^ ",
        //        text: true
        //    }).click(function (event)
        //    { duplicateRow(fdiv, null, qid) }).css({ "margin-right": "20px" }).addClass("FormNavigation");;
        //    cnnt = 3;
        //}

        //if (cnnt != 0 && (cnnt != i + 1 && ins == true))
        //    cnnt = i + 1;

        if (btnobj != null)
        {
            for (var key in btnobj)
            {
                var value = btnobj[key];
                $(btns[cnnt++]).button()
                .attr("id", key + "_" + qid)
                .addClass('btn action')
                .click(value);
            }
        }

        if (save)
        {
            if (fqheader.optype == "Add" || (fqheader.optype == "Update" && viewMode == false) || (fqheader.optype == "ChangePassword") || (fqheader.optype == "ForgotPassword"))
            {
                $(btns[cnnt++]).button().attr({ "id": "save_id", "type": "button" }).addClass('btn action').click(function (event)
                {
                    var efrm = $(this).attr("fid");
                    efrm = $(efrm).find("form");

                    if (fqheader.frm_attrib && fqheader.frm_attrib.before_validate != null)
                        eval(fqheader.frm_attrib.before_validate);

                    if ($.trim(fqheader.dmlop).length > 0 && fqheader.dmlop.indexOf("UV") == -1)
                    {
                        validate(efrm, fqheader);
                    }
                });
            }
        }
        if (cancel)
        {
            $(btns[cnnt++]).button().attr({ "id": "cancel_id" }).addClass('btn action').click(function (event)
            {
                var efrm = $(this).attr("fid");
                efrm = $(efrm);
                var footer_id = $(this).closest("div[id^='frm_buttons_']").attr("id");
                var qid = footer_id.substr(footer_id.lastIndexOf("_") + 1);
                var isReset = ResetLocalIUD(qid);
                if (!isReset)
                    efrm.modal("hide");
            });
        }
    }
}

function ResetLocalIUD(qid)
{
    var fqheader = Headers[qid];
    var isReset = false;
    if (fqheader != null)
    {
        if (fqheader.grid_attrib && fqheader.grid_attrib.LocalIUD == true)
        {
            new myForm().drawForm(qid, fqheader, fqheader.form_div, "Add");
            if (fqheader.par_qid != null)
            {
                SetChildField(fqheader.par_qid);
            }
            isReset = true;
        }
    }
    return isReset;
}

function OpenFormInPopup(form, fdiv, qheader, org_type, isParForm)
{
    SetDefaultCSS(form, fdiv, qheader, isParForm);
    form.DrawFormFooter(org_type);
}

function SetDefaultCSS(form, fdiv, qheader, isParForm)
{


    $(fdiv + " input:disabled").addClass('ui-state-highlight');
    $(fdiv + " select:disabled").addClass('ui-state-highlight');
    $(fdiv + " textarea:disabled").addClass('ui-state-highlight');

    if (qheader.dmlop && qheader.dmlop.toUpperCase().indexOf("V") >= 0 && qheader.optype != "Search" && qheader.optype != "Add")
    {  //  change by Pratik
        $(fdiv + " input").attr("disabled", "disabled").addClass('ui-state-highlight');
        $(fdiv + " select").attr("disabled", "disabled").addClass('ui-state-highlight');
        $(fdiv + " textarea").attr("disabled", "disabled").addClass('ui-state-highlight');
        $(fdiv + " .input-group-addon").css("display", "none");
    }

    $(fdiv + " textarea").closest("div.form-group").addClass("hi60").removeClass("hi30");

    $(fdiv + " input[type='file']").closest("div.form-group").addClass("hi80").removeClass("hi30");

    $(fdiv + " span[class='input-group-addon']").closest("div").addClass("input-group date dateerror");

    $(fdiv + " .multiSelectionValidation").closest("div.DataTD").addClass("newLine");

    if (!isParForm && qheader.optype != "Search")
    {
        if (qheader.cols.length > 8)
            $(fdiv + " .modal-dialog").css("width", "80%");
        else
            $(fdiv + " .modal-dialog").css("width", "");

        $(fdiv).modal({ backdrop: 'static', keyboard: false })
    }
}

function DrawHorizontalForm(form, ar_fdata, org_type)
{
    var gcols = 1, cgcol = 0, gspan = 1;
    var fgrp;
    var fqheader = form.qheader;
    var display_legend = false;
    var ngrps = (fqheader.formgroups) ? fqheader.formgroups.length : 1;
    var grpnames = form.lang_header.grpnames;
    if (fqheader.form_attrib && fqheader.form_attrib.display_legend == true)
        display_legend = true;

    if (ngrps == null)
        ngrps = 1;
    else
    {
        if (fqheader.form_attrib && fqheader.form_attrib.gcols)
            gcols = fqheader.form_attrib.gcols;
    }

    var formtype = fqheader.formtype;
    if (formtype == null)
        formtype = "sequence";  // default

    var DisplayMode = false;
    if (fqheader.form_attrib && fqheader.form_attrib.DisplayMode)
        DisplayMode = fqheader.form_attrib.DisplayMode;
    switch (formtype)
    {
        case "sequence":
            var col_name_idx_arr = new Array();
            if (form.lang_header != null && form.lang_header.colnames != null)
            {
                for (var i = 0; i < form.lang_header.colnames.length; i++)
                {
                    col_name_idx_arr.push(i);
                }
            }
            form.drawGroup("", null, col_name_idx_arr, false, DisplayMode, org_type);
            break;
        case "tabs":
            ar_fdata.push("<div id='tabs-" + fqheader.qid + "'>");
            ar_fdata.push("<ul class='nav nav-tabs' role='tablist' >");
            var cur_grp_name;
            for (var i = 0; i < ngrps; i++)
            {
                fgrp = fqheader.formgroups[i];
                cur_grp_name = replaceAll(grpnames[i], ' ', '&nbsp;');
                ar_fdata.push("<li");
                if (i == 0)
                    ar_fdata.push(" class='active' ");

                ar_fdata.push(" ><a href='#tab" + i + "' role='tab' data-toggle='tab'>" + cur_grp_name + "</a></li>");
            }
            ar_fdata.push("</ul>");
            ar_fdata.push("<div class='tab-content'>")
            for (i = 0; i < ngrps; i++)
            {
                custom_html = "";
                fgrp = fqheader.formgroups[i];
                cur_grp_name = replaceAll(grpnames[i], ' ', '&nbsp;');
                if (i == 0)
                    ar_fdata.push("<div class='tab-pane fade in active' id='tab" + i + "' >");
                else
                    ar_fdata.push("<div class='tab-pane fade' id='tab" + i + "' >");

                ar_fdata.push(form.drawGroup(cur_grp_name, null, fgrp, false, DisplayMode, org_type));
                ar_fdata.push("</div>");
            }
            ar_fdata.push("</div>");
            ar_fdata.push("</div>");
            break;
    }
}

function AssignDefaultProperties(cobj, name)
{
    if (!cobj.hasOwnProperty("nul"))
        cobj.nul = DefaultFieldOptions.nul;

    if (!cobj.hasOwnProperty("name"))
        cobj.name = name;

    if (!cobj.hasOwnProperty("dtype"))
        cobj.dtype = DefaultFieldOptions.dtype;

    if (!cobj.hasOwnProperty("pscol"))
        cobj.pscol = DefaultFieldOptions.pscol;

    if (!cobj.hasOwnProperty("etype"))
        cobj.etype = DefaultFieldOptions.etype;
}

function addAttribute(cobj, cid, className)
{
    var copt = " class='" + className + "' ";
    copt += " name='" + cobj.name + "' ";
    copt += " id='" + cid + "' ";
    return copt;
}

function ProcessFileUploads(ar_upload_file, qid)
{
    var form_prefix = Headers[qid].frmObj;

    for (var i = 0; i < ar_upload_file.length; i++)
    {
        var fld_idx = ar_upload_file[i]["name"];
        var cobj = Headers[qid].cols[fld_idx];
        $(form_prefix + "_" + fld_idx).fileinput(setfileInputParam(cobj, qid, fld_idx));
        //$(form_prefix + "_" + fld_idx).closest(".DataTD").find("button.kv-fileinput-upload").attr("type","button").click(function ()
        //{

        //});
        $(form_prefix + "_" + fld_idx).closest(".DataTD").find(".fileinput-remove").attr("title", "Remove File");
        $(form_prefix + "_" + fld_idx).closest(".DataTD").find(".kv-fileinput-upload").attr("title", "Upload File");
        $(form_prefix + "_" + fld_idx).closest(".DataTD").find(".btn-file").attr("title", "Select File");
        if (Headers[qid].optype == "Update")
        {
            var fname = gCurRow[fld_idx];

            /* -- start Aadilkhan -- */
            var name = '';
            if (fname.indexOf("__") != -1)
                name = fname.substring(fname.indexOf("__") + 2, fname.length);
            else
                name = fname;
            /* -- end -- */

            var src_container = $(form_prefix + "_" + fld_idx).closest(".DataTD").find(".file-caption-name");
            if (src_container.length > 0)
            {
                src_container.html("<a href='#' onclick='fileDownload(this, \"" + fname + "\")'>" + name + "</a>");

                if ($("#save_id").length != 0) {
                    $(form_prefix + "_" + fld_idx).closest(".DataTD").find(".fileinput-remove").css("display", "inline").click(function () {
                        if (src_container.html().length > 0) {
                            src_container.remove('a');
                            $(form_prefix + "_" + fld_idx).closest(".DataTD").find(".fileinput-remove").css("display", "none");
                        }
                        $(form_prefix + "_" + fld_idx).closest(".DataTD").find(".fileinput-remove").removeAttr('style');
                    });
                }
            }
        }
    }
}

function setfileInputParam(cobj, qid, fld_idx)
{
    var FileExtensions = ['jpg', 'jpeg', 'png', 'ttf', 'ico']; //default extension if not specified
    var preview = true;
    var change_error_container = false;
    var fqheader = Headers[qid];
    if (cobj.frm_options)
    {
        if (cobj.frm_options.FileExtensions)
            FileExtensions = cobj.frm_options.FileExtensions.split('|');

        if (cobj.frm_options.showPreview != null && cobj.frm_options.showPreview == "false")
            preview = false;

        if (cobj.frm_options.change_error_container == "true")
            change_error_container = true;
    }



    var Obj = {
        previewFileType: "image",
        //browseClass: "btn btn-success",
        browseLabel: "",
        browseIcon: '<i class="glyphicon glyphicon-picture"></i>',
        //removeClass: "btn btn-danger",
        removeLabel: "",
        removeIcon: '<i class="glyphicon glyphicon-trash"></i>',
        removeTitle: "Delete",
        //uploadClass: "btn btn-info",
        uploadLabel: "",
        uploadIcon: '<i class="glyphicon glyphicon-upload"></i>',
        uploadTitle: "Upload",
        allowedFileExtensions: FileExtensions,
        showUpload: false,
        showPreview: preview,
        autoFitCaption: true
    };

    if (change_error_container)
        Obj.elErrorContainer = "#err_" + fqheader.frmObj.substr(1) + "_" + fld_idx;

    return Obj;
}

function ProcessControls(evt)
{
    var cid;
    var fname;
    var cobj;
    var qheader = evt.qheader;

    /* @Aadilkhan --for default enter event on form */
    var default_enter = true;
    if (qheader.frm_attrib && qheader.frm_attrib.dflt_enter == "false")
        var default_enter = false;
    /* end */

    if (evt.ar_dynamic_select != null && evt.ar_dynamic_select.length > 0)
    {
        for (var i = 0; i < evt.ar_dynamic_select.length; i++)
        {
            cid = evt.ar_dynamic_select[i];
            var idx = cid.lastIndexOf("_");
            fname = cid.substr(idx + 1);
            cobj = qheader.cols[fname];
            if (cobj.etype == "sselect")
            {
                ProcessSelectAutocomplete(cobj, cid, qheader.optype);
            }
            else if (cobj.etype == "dselect")
            {
                ProcessDselectAutocomplete(cobj, cid, qheader.optype);
            }
        }
    }
    if (evt.ar_multi_select != null && evt.ar_multi_select.length > 0)
    {
        for (var i = 0; i < evt.ar_multi_select.length; i++)
        {
            cid = evt.ar_multi_select[i];
            $("#" + cid).multiselect({
                enableCaseInsensitiveFiltering: true,
                filterPlaceholder: 'Search...',
                buttonText: function (options, select)
                {
                    return process_multiselect(options, select,evt.qid,cid);
                }
            });
        }
    }
    if (evt.cust_event != null && evt.cust_event.length > 0)
    {
        for (var i = 0; i < evt.cust_event.length; i++)
        {
            for (var key in evt.cust_event[i])
            {
                $("#" + key).trigger(evt.cust_event[i][key]);
            }
        }
    }
    if (evt.ar_month_qtr != null && evt.ar_month_qtr.length > 0)
    {
        for (var i = 0; i < evt.ar_month_qtr.length; i++)
        {
            $("#" + evt.ar_month_qtr[i]).trigger("onchange");
        }
    }

    /* @Aadilkhan -- Default enter event */
    if (default_enter == true)
    {
        $(qheader.frmObj).keypress(function (event) {
            var keycode = (event.keycode ? event.keycode : event.which);
            if (keycode == '13' || keycode == '27') {
                $("#save_id").click();
                event.stopImmediatePropagation();
                return false;
            }
        });
    }
    /*  end  */

}

function process_multiselect(options, select,qid,cid)// -- qid,cid added by Aadilkhan
{
    /* -- @Adilkhan -- */
    //var columnId = cid.split("_");
    var shw_fld = 2;
    if (qid != undefined && cid != undefined && qid.length > 0 && cid.length > 0) {
        var langheader = Headers[qid].cols[cid.substring(parseInt(cid.lastIndexOf("_") + 1))];
        if (langheader.frm_options && langheader.frm_options.SelectedField_show)
            shw_fld = parseInt(langheader.frm_options.SelectedField_show);
    }
    /* -- end -- */

    if (options.length === 0)
    {
        return 'No option selected ... ';
    }
    else if (options.length > shw_fld)
    {
        return options.length + " selected";
    }
    else
    {
        var labels = [];
        options.each(function ()
        {
            if ($(this).attr('label') !== undefined)
            {
                labels.push($(this).attr('label'));
            }
            else
            {
                labels.push($(this).html());
            }
        });
        return labels.join(', ') + ' ';
    }
}

function ProcessDselectAutocomplete(cobj, cid, optype)
{
    var lkup_name = cobj["eopt"];
    var tloc = gSvcUrl + "?cmd=DynamicLookup&lkname=" + lkup_name + "";
    var triggerLength = 3;
    if (cobj.frm_options && cobj.frm_options.triggerLength != null)
    {
        triggerLength = cobj.frm_options.triggerLength;
    }
    $("#" + cid).typeahead({
        ajax: {
            url: tloc,
            triggerLength: triggerLength,
            method: "get",
            loadingClass: "loading-circle",
            preDispatch: function (query)
            {
                return {
                    search: query
                }
            },
            preProcess: function (data)
            {
                if (data.response_code == "0")
                {
                    return $.parseJSON(data.gpdata4);
                }
                else
                    return false
            }
        }
    });
    if (optype == "Update" && gCurRow != null)
    {
        var idx = cid.lastIndexOf("_");
        var fname = cid.substr(idx + 1);
        $("#" + cid).val(gCurRow[fname]);
        $("#" + cid).parent().find("ul").append("<li class='active' data-value=" + gCurRow[fname] + ">" + gCurRow[fname] + "</li>");
    }
}

function ProcessSelectAutocomplete(cobj, cid, optype)
{
    if (cobj != null && cobj.hasOwnProperty("eopt"))
    {
        var lkup_name = cobj["eopt"];
        var type_ahead_source = ArrangeTypeAheadSource(lkup_name);
        if (type_ahead_source != null && type_ahead_source.length > 0)
        {
            $("#" + cid).typeahead({
                source: type_ahead_source
            });
        }
        if (optype == "Update" && gCurRow != null)
        {
            var idx = cid.lastIndexOf("_");
            var fname = cid.substr(idx + 1);
            $("#" + cid).attr("data-value", gCurRow[fname]);
            /////  pratik //////
            for (var i = 0; i < type_ahead_source.length; i++)
            {
                if (gCurRow[fname] == type_ahead_source[i].id)
                {
                    //alert(type_ahead_source[i].name);
                    $("#" + cid).val(type_ahead_source[i].name);
                }
            }
            /////  pratik //////
        }
    }
}

function ArrangeTypeAheadSource(lkup_name)
{
    var lkup_data = gLookup[lkup_name];
    var return_obj = null;
    var return_arr = null;
    if (lkup_data != null)
    {
        return_arr = new Array();
        for (var key in lkup_data)
        {
            return_obj = new Object();
            return_obj.id = key;
            return_obj.name = lkup_data[key];
            return_arr.push(return_obj);
        }
    }
    return return_arr;
}

function DrawFormInUpdateMode(row_no, qid)
{
    var formdiv = "myform";
    var fqheader = Headers[qid];
    if (fqheader.form_div != null)
        formdiv = fqheader.form_div;

    if (IsJson(fqheader.formgroups))
        fqheader.formgroups = $.parseJSON(fqheader.formgroups);

    new myForm().drawForm(qid, fqheader, formdiv, "Update", row_no);
}

function ProcessCustomEvents(cobj, evt, key)
{
    var EventArray = null;
    var EventObj;
    var isInitialCall = true;
    if (cobj.frm_options && cobj.frm_options.isInitialCall != null && cobj.frm_options.isInitialCall == "false")
        isInitialCall = false;

    if (cobj.hasOwnProperty("fldevent"))
    {
        EventObj = new Object();
        EventArray = cobj.fldevent.split(":");
        EventObj[key] = EventArray[0];
        if (isInitialCall)
            evt.cust_event.push(EventObj);
    }
    return EventArray;
}

function ProcessDefValue(def_value)
{
    var spl_arr;
    spl_arr = def_value.split(':');
    switch (spl_arr[0])
    {
        case "IHB":
            if (loginData.TodayCSRVisitPlan != null && CurrVisitedCustID != null)
            {
                if (loginData.TodayCSRVisitPlan.hasOwnProperty(CurrVisitedCustID))
                {
                    def_value = loginData.TodayCSRVisitPlan[CurrVisitedCustID][spl_arr[1]];
                }
            }
            break;
        case "DLR":
            if (loginData.TodayDealerVisitPlan != null && CurrVisitedCustID != null)
            {
                //   var custtype = curcustomerInfo[CurrVisitedCustID].CustomerType;
                if (loginData.TodayDealerVisitPlan.hasOwnProperty(CurrVisitedCustID))
                {
                    def_value = loginData.TodayDealerVisitPlan[CurrVisitedCustID][spl_arr[1]];
                }
                else if (loginData.TodayRetailerVisitPlan.hasOwnProperty(CurrVisitedCustID))
                {
                    def_value = loginData.TodayRetailerVisitPlan[CurrVisitedCustID][spl_arr[1]];
                }
            }
            break;
        case "cur_visit_id":
            {
                //@sanjay----AS while offline we can't have Current Route Detail ID
                if (curcustomerInfo.curRouteDetailId == null)
                {
                    curcustomerInfo.curRouteDetailId = "@UserInfo-ActualRouteDetailID";
                }
                def_value = curcustomerInfo.curRouteDetailId;

            }
            break;
            /* --start Adilkhan -- */
        case "GDN":
            if (curcustomerInfo.GodownId != null)
            {
                def_value = curcustomerInfo.GodownId;
            }
            break;
            /* --end-- */
    }
    return def_value;
}
function Updateonchangeofexideqtrmnthyr(evt, qid)
{
    var ar_htmldata = new Array();
    var value = $(evt).val();
    var htm = "";
    var mon_qtr_yr_arr;
    var id = $(evt).attr("id");
    var setmonth = new Date();
    var month = setmonth.getMonth();
    var fqheader = Headers[qid];
    var getyrs;
    getyrs = new Date();
    var setyrs = getyrs.getFullYear();
    switch (value)
    {
        case "Month":
            mon_qtr_yr_arr = ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            break;
        case "Quarter":
            mon_qtr_yr_arr = ['1', '2', '3', '4'];
            break;
        case "Year":
            mon_qtr_yr_arr = [setyrs, setyrs - 1, setyrs - 2];
            break;
    }
    var cur_fld_idx = id.lastIndexOf("_");
    cur_fld_idx = id.substr(cur_fld_idx + 1);
    var cobj = fqheader.cols[cur_fld_idx];
    var synchid, storeval;
    if (cobj != null && cobj.frm_options != null && cobj.frm_options.synch != null)
    {
        var prfix = fqheader.frmObj;
        synchid = $(prfix + "_" + cobj.frm_options.synch);
        for (var i = 0; i < mon_qtr_yr_arr.length; i++)
        {
            htm += "<option value=" + (i + 1) + ">" + mon_qtr_yr_arr[i] + "</option>";
        }
        $(synchid).html(htm);
        //$(synchid).prop("disabled", "disabled");
    }

    //$("#" + id).parent().find("#mon_qtr").show();
    //var selected;
    //for (var i = 0; i < mon_qtr_yr_arr.length; i++)
    //{
    //  //  selected = (i == month) ? " selected='selected' " : "";
    //    htm += "<option value=" + (i + 1) + ">" + mon_qtr_yr_arr[i] + "</option>";
    //}

    //$("#" + id).parent().find("#mon_qtr").html(htm);
    //if (synchid != null)
    //{
    //    Updateonchangeofqtrmnth(synchid, qid);
    //}
}
function Updateonchangeofqtrmnth(evt, qid)
{
    var ar_htmldata = new Array();
    var value = $(evt).val();
    var htm = "";
    var mon_qtr_arr;
    var id = $(evt).attr("id");
    var setmonth = new Date();
    var month = setmonth.getMonth();
    var fqheader = Headers[qid];
    switch (value)
    {
        case "1":
            mon_qtr_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            break;
        case "2":
            mon_qtr_arr = ['QTD1', 'QTD2', 'QTD3', 'QTD4'];
            break;
        case "3":
            $("#" + id).parent().find("#mon_qtr").hide();
            break;

    }
    var cur_fld_idx = id.lastIndexOf("_");
    cur_fld_idx = id.substr(cur_fld_idx + 1);
    var cobj = fqheader.cols[cur_fld_idx];
    var synchid, storeval;
    if (cobj != null && cobj.frm_options != null && cobj.frm_options.sync_fld != null)
    {
        storeval = $("#" + id).val();
        var prfix = fqheader.frmObj;
        synchid = $(prfix + "_" + cobj.frm_options.sync_fld);
        $(synchid).val(storeval);
        $(synchid).prop("disabled", "disabled");
    }

    if (value != "3")
    {
        $("#" + id).parent().find("#mon_qtr").show();
        var selected;
        for (var i = 0; i < mon_qtr_arr.length; i++)
        {
            selected = (i == month) ? " selected='selected' " : "";
            htm += "<option value=" + (i + 1) + "" + selected + ">" + mon_qtr_arr[i] + "</option>";
        }
    }
    $("#" + id).parent().find("#mon_qtr").html(htm);
    if (synchid != null)
    {
        Updateonchangeofqtrmnth(synchid, qid);
    }
}
var localMediaStream = null;
var video;
var canvas;
var ctx;
var activeStream;
function capture_image(qid, cid, filenm)
{
    var w_width = $(window).width()
    var w_height = $(window).height();
    //var link;
    //if (filenm != null && filenm.length > 0 && filenm!="undefined")
    //{
    //    link = "<a href='#' onclick='fileDownload(" + null + ",\"" + filenm + "\")'>" + filenm + "</a>";
    //}
    var html = "<div id='streamdiv'><video id='screenshot-stream' class='videostream' autoplay></video></div><div id='videodiv'><img id='screenshot' class='screenshot' src=''><canvas style='display:none;' id='screenshot-canvas'></canvas></div><div ><select id='camIDsources' ></select></div>";
    //if (link != null)
    //    html += link;
    var cust_btn = "<button class='btn' onclick='camera_snapshot()'>Capture</button><button class='btn' onclick='CloseCustDetail()'>Close</button>";
    $("#custDetail").css({ "height": w_height - 75, "width": w_width - 200 }).removeClass("height250 center_popup").addClass("center_popup_dealer");

    //$("#streamdiv").css("height", $("#custDetail").height() - 350);
    //$("#vdodiv").css("height", $("#custDetail").height() - 350);
    //$("#streamdiv").css("height", $("#custDetail").width() - 20) / 2;
    //$("#vdodiv").css("height", $("#custDetail").width() - 20) / 2;

    ShowDialog("custDetail", html, "SavePhoto($('#screenshot').attr('src'),'" + $(cid).attr("id") + "')", null, null, null, "Capture Image", cust_btn, "Save");
    $("#custDetail .modal-body").css("height", w_height - 150);
    //$(".videostream #cssfilters-stream .screenshot #screenshot-canvas").css({ "height": $("#custDetail .modal-body").height - 50,"width": })

    video = document.querySelector('video');
    canvas = document.querySelector('canvas');
    var selectList = $("#camIDsources")[0];
    $("#camIDsources").change(sourceChanged);
    ctx = canvas.getContext('2d');


    var onFailSoHard = function (e)
    {
        console.log('Rejected!', e);
    };

    video.addEventListener('click', camera_snapshot, false);
    navigator.getUserMedia_ = (navigator.getUserMedia
                        || navigator.webkitGetUserMedia
                        || navigator.mozGetUserMedia
                        || navigator.msGetUserMedia);

    if (!!navigator.getUserMedia_)
    {
        // Not showing vendor prefixes or code that works cross-browser.
        if (MediaStreamTrack.getSources)
        {
            MediaStreamTrack.getSources(gotSources);
        }
        navigator.getUserMedia_({ video: true }, startStreamingForVideo, onFailSoHard);

    }
    function sourceChanged(event)
    {
        try
        {
            if (activeStream)
            {
                activeStream.stop();
                activeStream = null;
            }
            //Try to set the video based on this source:
            navigator.getUserMedia_({ video: { optional: [{ sourceId: $(event.target).val() }] } },
            startStreamingForVideo, onFailSoHard);
        }
        catch (e)
        {
            alert('camera is in use...In another tab');
        }
    }
    function gotSources(sourceInfos)
    {

        selectList.options.length = 0;
        var storageIndex = 1;
        for (var i = 0; i < sourceInfos.length; i++)
        {
            console.log(sourceInfos[i])
            if (sourceInfos[i].kind == 'video')
            {
                selectList.options.add(new Option("Camera " + storageIndex, sourceInfos[i].id));
                //sourceIDs[storageIndex] = sourceInfos[i].id;
                storageIndex++;
            }
        }
    }
    function startStreamingForVideo(stream)
    {
        video.src = window.URL.createObjectURL(stream);
        activeStream = stream;
        localMediaStream = stream;
    }
}

function CloseCustDetail()
{
    $("#custDetail").modal("hide");
}

function camera_snapshot()
{
    if ($("#camIDsources option").length == 0)
    {
        //$("#myform_err").text('Camera Device Not Found.');
        DisplayMessage('Camera Device Not Found.');
        return;
    }
    if (localMediaStream)
    {
        ctx.drawImage(video, 0, 0, 307, 150);
        document.querySelector('#screenshot').src = canvas.toDataURL('image/png');
    }
}
function SavePhoto(img, cid)
{
    if (curcustomerInfo)
    {
        var params = new Object();
        //params["customertype"] = curcustomerInfo.CustomerType;
        params["imgstore"] = img;
        //params["customerId"] = curcustomerInfo.DealerId;
        params["cid"] = cid;
        if (img != null && img != "")
        {
            //$("#" + cid).attr("filename", img);
            var qrystr = "?cmd=Prism_SaveImage";
            //@sanjay---for saving into local call
            ajaxLocalCall(qrystr, params, "post", imgSaveSuccess, null, "ImgSave");
        }
    }
}
function imgSaveSuccess(returnStrng)
{
    if (returnStrng != null && returnStrng.response_code == "0")
    {
        var data = $.parseJSON(returnStrng.gpdata4)
        if (IsJson(data))
            data = $.parseJSON(data);

        $("#" + data.cid).attr("filename", data.filename);
        DisplayMessage("Successfully Saved");
    }
    else
        DisplayMessage("Problem in saving image");
}

function SortOptions(id)
{
    var prePrepend = "#";
    if (id.match("^#") == "#") prePrepend = "";
    $(prePrepend + id).html($(prePrepend + id + " option").sort(
        function (a, b) { return a.text == b.text ? 0 : a.text < b.text ? -1 : 1 })
    );
}

function sortByValue(obj, sort)
{
    var sortable = [];
    for (var key in obj)
        if (obj.hasOwnProperty(key))
            sortable.push([key, obj[key]]);
    if (sort == true)
    {
        sortable.sort(function (a, b)
        {
            var x = a[1].toLowerCase(),
                y = b[1].toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
        });
    }
    //else if (sort != undefined && sort.toLowerCase() != 'false' && sort.toLowerCase() == 'desc')
    //{
    //    sortable.sort(function (a, b)
    //    {
    //        var x = a[1].toLowerCase(),
    //            y = b[1].toLowerCase();
    //        return x > y ? -1 : x < y ? 1 : 0;

    //    });
    //}
    return sortable;
    //for (var i = 0; i < sortable.length; i++) {
    //    temp_obj[sortable[i][0]] = sortable[i][1];
    //}
    //return temp_obj;

}

function PhoneGapSelectImage()
{
    if (isPhoneGap())
    {
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL//,
            //sourceType : Camera.PictureSourceType.PHOTOLIBRARY
        });

        function onSuccess(imageData)
        {
            //alert("success. Image Data = " + imageData);
            /* @Aadilkhan */
            saveSnapshot("data:image/png;base64," + imageData);
            /* end */
        }

        function onFail(message)
        {
            alert('Failed because: ' + message);
        }
    }
}
function saveSnapshot(imageString) {
    try {
        var params = new Object();
        params["imageByte"] = imageString;

        var qrystr = "?cmd=Prism_SaveShopImage";
        $("#iframeloading").show();

        checkForNetworkAndCall();
        //if (loginData.loggedusertype == "MRPC") {
        //    if (curCustomerInfo.custtype == "mrpc" && (loginData.LastMRPCShopImageSaved[curCustomerInfo.DealerCode] && loginData.LastMRPCShopImageSaved[curCustomerInfo.DealerCode].length >= 6)) {
        //        $("#iframeloading").hide();
        //        viewCustomerInfo(curCustomerInfo, curCustomerInfo.custtype);
        //        settingUpDivParHeight(450);
        //        DisplayMessage("Limit Exceeded of Photo Capturing..");
        //        return;
        //    }
        //    ajaxLocalCall(qrystr, JSON.stringify(params), "post", mrpcphotoSaved, null, "mrpcvisitPhoto");
        //}
        //else
        //ajaxLocalCall(qrystr, JSON.stringify(params), "post", photoSaved, null, "visitPhoto");
        ajaxCall(qrystr, params, "POST", photoSaved);
    }
    catch (e) {
        alert("Error Occured in Saving Image");
    }

}
function photoSaved(rtnString)
{
    if (rtnString.response_code == "1") {
        DisplayMessage("File uploaded successfully with " + rtnString.gpdata4 + " name.");

        $('input[name="Upload Link"]').val(rtnString.gpdata4).prop('disabled', 'disabled').addClass("ui-state-highlight");
    }
    else {
        DisplayMessage("Error occured while uploading file..");
    }
}
