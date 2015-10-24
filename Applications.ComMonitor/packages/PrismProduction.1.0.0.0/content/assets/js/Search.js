function DrawSearchForm(evt, qid, ar_fdata)
{
    var arr_filter = new Array();
    var fqheader = Headers[qid];
    var search_label = "Search";

    var cur_qid = $("#sform").attr("qid");
    if ($("#sform").html() != null && $("#sform").html().length > 0 && qid == cur_qid)
    {
        $('#sform').modal('show');
        return;
    }
    for (var i = 0; i < fqheader.sfilters.length; i++)
    {
        arr_filter.push(fqheader.sfilters[i].s_fld_idx);
    }
    //// spratik /////
    if (fqheader.frm_attrib && fqheader.frm_attrib.Search)
        search_label = fqheader.frm_attrib.Search;
    //// epratik /////

    evt.drawGroup("", fqheader.sfilters, arr_filter, true, false, "Search");
    ar_fdata.push('<br class="clear">')
    $(evt.fdiv + " .modal-body").html(ar_fdata.join(''));
    var btn = '<button class="btn action" id="btnSearch">'+search_label+'</button><button class="btn action" id="btnCancel">Cancel</button>'
    $(evt.fdiv + " .modal-footer").html(btn);
    $(evt.fdiv + " .modal-header").find("#myModalLabel").html(LangHeaders[qid].caption);
   
    $(evt.fdiv + " .modal-footer #btnCancel").click(function()
    {
        $('#sform').modal('hide');
    })
    $(evt.fdiv + " .modal-footer #btnSearch").click(function ()
    {
        Search(qid);
        //$('#sform').modal('hide');
    })

    $("#sform").keypress(function (event)
    {
        var keycode = (event.keycode ? event.keycode : event.which);
        if (keycode == '13')
        {
            Search(qid);
            event.stopImmediatePropagation();
            return false;
        }
    });

    $('#sform').modal('show');
    $("#sform").attr("qid", qid);
}

function Search(qid)
{
    var ele;
    var params;
    var qstr = "?cmd=search&qid=" + qid;
    var ename, fname, cinfo, storesearch;
    var fqheader = Headers[qid];
    var id = new Array();   
    var cmodel = fqheader.cols;
    var srch_arr = new Array();
    var k = 0;
    var op;
    var isCompulsory = false;
    $("#sform .modal-body").find(".DataTD").each(function ()
    {
        params = new Object();
        ele = $(this).children(0);
        ename = ele.get(0).tagName;
        fname = ele.attr('id');
        if (fname == null)
        {
            if ($(ele).hasClass("radio-inline"))
            {
                fname = $(ele).find("input[type='radio']").attr("id");
            }
        }
        fname = fname.split("_")[1];
        params["fld_idx"] = fname;
        
        cinfo = cmodel[fname];
        id = fname;
        op = "eq";
        var cur_srch_obj = fqheader.sfilters[k];
        if (ename == "INPUT" || ename == "TEXTAREA")
        {
            etype = ele.attr("type");
            if (etype == "radio")
                val = ele.siblings(":checked").val();
            else if (etype == "checkbox")
            {
                val = ele.attr('checked')

                if (!val)
                    val = "False";
                else if (val == "checked")
                    val = "True";
                else
                    val = "False";
            }
            else
            {
                val = ele.val();
            }
        }
        else if (ename == "LABEL")
        {
            if ($(ele).hasClass("radio-inline"))
            {
                var nam = $(ele).find("input").attr("name");
                val = $(ele).parent().find("input[name='" + nam + "']:checked").val();
            }
        }
        else
        {
            val = ele.val();
        }
        k = k + 1;
        if (cinfo.etype == "Quatermonth")
        {
            ProcessQuaterMonthControl(cinfo, qid, fname, srch_arr);
            return true;
        }
        if (cinfo.frm_options != null)
        {
            if (cinfo.frm_options.date_range != null && cinfo.frm_options.date_range == "true")
            {
                ProcessDateRange(val, fname,srch_arr);
                return true;
            }
        }
        if (cur_srch_obj.isCompulsory == "True" && (val == null || val.length == 0))
        {
            $("#" + ele.attr('id')).addClass("Validateinput");
            isCompulsory = true;
            return false;
        }
        if (cur_srch_obj.op != null && cur_srch_obj.op.length > 0)
            op = cur_srch_obj.op;

        if (op == "cn")
            val = "%" + val + "%";

        if (val != null && val.length > 0)
        {
            params["val"] = val;
            params["op"] = op;
            srch_arr.push(params);
        }
    })

    if (isCompulsory == false)
    {
        getData(qid, qstr, srch_arr)
        $('#sform').modal('hide');
    }
    
}

function ProcessDateRange(val,fname,srch_arr)
{
    var obj = new Object();
    obj["fld_idx"] = fname;
    var val_arr = val.split(" - ");
    obj["val"] = val_arr[0];
    obj["op"] = "ge";
    srch_arr.push(obj);

    obj = new Object();
    obj["fld_idx"] = fname;
    obj["val"] = val_arr[1];
    obj["op"] = "le";
    srch_arr.push(obj);
}

function ProcessQuaterMonthControl(cinfo, qid, fname, srch_arr)
{
        var monthqtr;
        var fqheader = Headers[qid];
        var firstdate;
        var lastday;
        var lastdate;
        var totalmonth;
        var year = $(fqheader.frmObj + "_" + fname).parent().find("#year").val();
        var montharray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        if ($(fqheader.frmObj + "_" + fname).val() == "1")
        {
            totalmonth = 0;
            monthqtr = $(fqheader.frmObj + "_" + fname).parent().find("#mon_qtr").val();
            monthqtr = parseInt(monthqtr) + 1;
            lastday = new Date(year, monthqtr-1, 0).getDate();
            for (i = 0; i < montharray.length; i++)
            {
                if (monthqtr-2 == i)
                {
                    monthqtr = montharray[i];
                    break;
                }
            }
            firstdate = '01' + "-" + monthqtr + "-" + year;
            lastdate = lastday + "-" + monthqtr + "-" + year;
        }
        else if ($(fqheader.frmObj + "_" + fname).val() == "2")
        {
            totalmonth = 3;
            monthqtr = $(fqheader.frmObj + "_" + fname).parent().find("#mon_qtr").val();
            var firstqtrmonth;
            for (var i = 0; i < monthqtr; i++)
            {
                totalmonth = parseInt(totalmonth) + 3;
                if (totalmonth > 12)
                {
                    totalmonth = 3;
                }
            }
            
            lastday = new Date(year, totalmonth, 0).getDate();
            for (i = 0; i <= montharray.length; i++)
            {
                if (totalmonth == i)
                {
                    totalmonth = montharray[i-1];
                    firstqtrmonth = montharray[i - 3];
                    break;
                }
            }
            
            if (monthqtr == "4")
            {
                year = parseInt(year) + 1;
            }
            firstdate = '01' + "-" + firstqtrmonth + "-" + year;
            lastdate = lastday + "-" + totalmonth + "-" + year;
        }
        //////////////////  KHUSHALI   ////////////////////////
        //else if ($(fqheader.frmObj + "_" + fname).val() == "3")
        //{
        //    totalmonth = 0;
        //    monthqtr = $(fqheader.frmObj + "_" + fname).parent().find("#mon_qtr").val();
        //    for (var j = 0; j < monthqtr; j++)
        //    {
        //        totalmonth = parseInt(totalmonth) + 6;
        //    }
        //    lastday = new Date(year, totalmonth, 0).getDate();
        //    for (j = 0; j <= montharray.length; j++)
        //    {
        //        if (totalmonth == j)
        //        {
        //            totalmonth = montharray[j - 1];
        //            firstqtrmonth = montharray[j - 6];
        //            break;
        //        }
        //    }
        //    firstdate = '01' + "-" + firstqtrmonth + "-" + year;
        //    lastdate = lastday + "-" + totalmonth + "-" + year;
        //}
        //////////////////  KHUSHALI   ////////////////////////
        else
        {
            firstdate = '01' + "-" + "Jan" + "-" + year;
            lastdate = '31' + "-" + "Dec" + "-" + year;
        }
        var params = new Object();
        params["fld_idx"] = fname
        params["val"] = firstdate;
        params["op"] = "eq";
        srch_arr.push(params);

        params = new Object();
        params["fld_idx"] = cinfo.frm_options.qmfld;
        params["val"]  = lastdate;
        params["op"] = "eq";
        srch_arr.push(params);
}