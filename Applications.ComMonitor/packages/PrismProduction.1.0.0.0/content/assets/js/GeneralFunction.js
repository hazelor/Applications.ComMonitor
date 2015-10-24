var loginData = new Object();
var cur_qid = -1;
var req_res_arr = new Array();
var TotalUnreadMessages = 0;
function ProcessMenu(menu_obj,sobj)
{
    var mymenu = new myMenu();
    mymenu.MegaDrop(menu_obj, "pmenu");    
    $("#pmenu").css("display", "block");
    //$("#tpar").css("display", "block");
    UpdatePageCSS(sobj,true);
}

function ProcessFSOMenu(menu_obj, sobj)
{
    loginData.menu_obj = menu_obj
    UpdatePageCSS(sobj,false);

    var htm = '';
    var j = 1;
    for(var i=0;i<menu_obj.length;i++)
    {
        htm += '<div class="outer_box ' + menu_color[menu_obj[i].img.split('.')[0]] + '" onclick="FSOAction(this)" source="' + menu_obj[i].src + '" MenuId=' + menu_obj[i].MenuId + ' >';
        htm += '<a href="#">';
        htm += '<span class="marcenter wd100 martop10"><img src="assets/images/' + menu_obj[i].img + '" alt="' + menu_obj[i].src + '" /></span>';
        if (menu_obj[i].src == "Messages")
        {
            htm += '<span class="no_item" id="unreadNotesCnt">' + 0 + '</span>';
        }
        htm += ' <span class="marcenter wd100 martop10 whitefont TextSpan"> ' + menu_obj[i].src + '</span>';
        htm += '</a>';
        htm += '</div>';        
        if ((j % 4) == 0)
            htm += '<br class="clear hidden-xs" />';

        j = j + 1;
    }

    $("#fsoActionBtnDiv").html(htm).css("display", "block");
    if (sobj.ReportingTo.length == 0)
    {
        $("#fsoActionBtnDiv").find("div[MenuId='172']").addClass("disableImg");
    }
    if (loginData.reported_by!=null && (loginData.reported_by[0] == null || (Object.size(loginData.reported_by[0]) >= 0 && loginData.reported_by[0].Total == "0")))
    {
        $("#fsoActionBtnDiv").find("div[MenuId='173']").addClass("disableImg");
    }
    SetStartTime();
    var start_day_dom = $("#fsoActionBtnDiv").find("div[MenuId='159']");
    var end_day_dom = $("#fsoActionBtnDiv").find("div[MenuId='188']");

    if (!start_day_dom.hasClass("disableImg") || (start_day_dom.hasClass("disableImg") && end_day_dom.hasClass("disableImg")))
        $("#fsoActionBtnDiv").find("div[MenuId='160']").addClass("disableImg");


    $("#backtomap").hide();

    TotalUnreadMessages = loginData.unread_messages;
    $("#unreadNotesCnt").text(TotalUnreadMessages);
}

function UpdatePageCSS(sobj,isAdmin)
{
    $("#username").html("<b>" + sobj["EmpName"] + "</b> ( " + sobj["Role"] + " )");
    $("#loginTime").html("<b>Logged At:</b> " + sobj["LoggedTime"]);
    $("#LoginDiv").hide();
    $("#header_das").show();
    if(isAdmin)
        $('body').css("background", "none");
    else
        $('body').css("background", "black");

    $('body').addClass("skin-blue body-overflow  pace-done")

    sessionStorage.setItem('uName', sobj.UserName);
    sessionStorage.setItem('pWd', sobj.Password);
}

function FillCurRowData(qid,row_id)
{
    if (row_id == null)
        row_id = gCurRowId;
    var fqheader = Headers[qid];
    var cur_row_data = gDataTable.row(row_id).data();
    if (fqheader.grid_attrib && fqheader.grid_attrib.LocalIUD == true)
        cur_row_data = getRowData(qid, row_id);
    if (fqheader.frm_attrib && fqheader.frm_attrib.getRowData == "true")
        cur_row_data = getRowData(qid, row_id);

    var cols = fqheader.cols;
    var final_data = new Array();
    var value;
    for (var i = 1; i < cur_row_data.length; i++)
    {
        value = cur_row_data[i];
        //if (cols[i - 1].dtype == "date")
        //{
        //    value = ProcessDateValue(value, true);
        //}
        final_data[i - 1] = value;
    }
    return final_data;
}

function getRowData(qid,row_id)
{
    var child_data = gQid[qid].data;
    for(var i=0;i<child_data.length;i++)
    {
        if (child_data[i][0] == row_id)
            return child_data[i];
    }
    return null;
}

//function to check whether the response is json response or not.
function IsJson(str)
{
    try
    {
        JSON.parse(str);
    } catch (e)
    {
        return false;
    }
    return true;
}
function replaceAll(string, token, newtoken)
{
    if (token != newtoken)
        while (string.indexOf(token) > -1)
        {
            string = string.replace(token, newtoken);
        }
    return string;
}

function GetLookupOfCurrentScreen(qid,issearch,qry_str)
{
    var qstr = '?qid=' + qid;
    
    if (issearch)
        qstr += '&cmd=search';
    else
        qstr += '&cmd=data';

    if (qry_str != null)
        qstr = qry_str;

    var lkup_arr = new Array();
   
    var fqheader = Headers[qid];    
    var remove_lkup_list;
    if (fqheader.grid_attrib && fqheader.grid_attrib.remove_lkup_list != null && fqheader.grid_attrib.remove_lkup_list.length > 0)
    {
        remove_lkup_list = fqheader.grid_attrib.remove_lkup_list;
        for(var j=0;j<remove_lkup_list.length;j++)
        {
            if (gLookup.hasOwnProperty(remove_lkup_list[j]))
                delete gLookup[remove_lkup_list[j]];
        }
    }
    if ((isPhoneGap() && isNetworkAvailable()) || navigator.onLine)
    {
        AppendLookup(qid, lkup_arr);
        if (fqheader.ChildInfo != null && Object.size(fqheader.ChildInfo) > 0)
        {
            for (var key in fqheader.ChildInfo)
                AppendLookup(key, lkup_arr);
        }

        if (lkup_arr.length > 0)
            qstr += "&fetchlookup=" + lkup_arr.join(',');
    }
    return qstr;
}

function AppendLookup(qid,lkup_arr)
{
    var fqheader = Headers[qid];
    var cols = fqheader.cols;
    for (var i = 0; i < cols.length; i++)
    {
        if (cols[i].hasOwnProperty("etype") && cols[i]["etype"] == "sselect" || cols[i]["etype"] == "pcselect")
        {
            if (gLookup == null || !gLookup.hasOwnProperty(cols[i]["eopt"]))
            {
                if (cols[i]["eopt"] != null && cols[i]["eopt"].length > 0)
                    lkup_arr.push(cols[i]["eopt"]);
            }
        }
    }
}

// function to findout the size of the object
Object.size = function (obj)
{
    var size = 0, key;
    for (key in obj)
    {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function lettersOnly(evt)
{
    evt = (evt) ? evt : event;
    var charCode = (evt.charCode) ? evt.charCode : ((evt.keyCode) ? evt.keyCode :
  ((evt.which) ? evt.which : 0));

    if (charCode >= 48 && charCode <= 57)
    {
        return true;
    }
    else if (charCode > 31 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122))
    {
        return false;
    }
    else
        return true;
};

function LogOut()
{
    if ((isPhoneGap() && isNetworkAvailable()) || navigator.onLine) {
        checkForNetworkAndCall();
        gLookup = null;
        ajaxCall("?cmd=LogOut", null, "GET", LogOutResponse);
    }
    else {
        //localStorage.setItem('UserData', JSON.stringify(loginData));
        $("#fsoActionBtnDiv").css("display", "none");
        $("#main").css("display", "none");
        $("#tpar").css("display", "none");
        $("#pmenu").css("display", "none");
        DisplayLoginPage();
    }
      
    CurrVisitedCustID = null;
    sessionStorage.removeItem("CurrVisitedCustID");

    if (isPhoneGap() && isNetworkAvailable())
        localStorage.removeItem("UserSessionID");
}

function LogOutResponse(retStr)
{
    if (retStr.response_code == "0")
    {
        $("#fsoActionBtnDiv").css("display", "none");
        $("#main").css("display", "none");
        $("#tpar").css("display", "none");
        $("#pmenu").css("display", "none");

        //sessionStorage.removeItem("IsLoginScreen");
        DisplayLoginPage();
        gLookup = null;

        var page_name = window.location.pathname;
        if (page_name.toLowerCase().indexOf("prismadmin") >= 0)
            deleteCookie("AdminSessionID");
        else if (page_name.toLowerCase().indexOf("prismdealer") >= 0)
            deleteCookie("DealerSessionID");
        else if(page_name.toLowerCase().indexOf("prismmdm") >=0)
            deleteCookie("MDMSessionID");
        else
            deleteCookie("UserSessionID");
    }
    else if(retStr.response_code == "1000")
        DisplayLoginPage();
    else
        DisplayMessage(retStr.message);
}

function ShowDialog(dialogId, message, okEvent, data, autoCloseDuration, isError, TitleText,extra_btn,ok_title,d_width,d_height,hideform_on_ok,ok_tooltip)
{


    if (extra_btn == null || extra_btn.length == 0)
        extra_btn = "";

    if (ok_title == null || ok_title.length == 0)
        ok_title = "OK";

    if (ok_tooltip == null || ok_tooltip.length == 0)
        ok_tooltip = "OK";


    /* -- Aadilkhan --commented */
    var f_width = $(window).width() / 2;

    //if (data != null && data.closeDuration != null)
    //    closeDuration = data.closeDuration;

    //if (closeDuration == null)
    //    closeDuration = 10000;


    var hide_form = true;

    if (hideform_on_ok == false)
        hide_form = false;

    $('#' + dialogId).css({ "width": "", "height": "" });

    var Title = "Message";
    if (isError)
    {
        message += AppendTimeToMessage();
        Title = "Error";
    }

    if (TitleText)
        Title = TitleText;

    var htm = '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button><h4 id="lblHeader" class="modal-title">Message</h4></div><div class="modal-body"></div><div class="modal-footer"><button class="btn default-btn"  aria-hidden="true" title="'+ok_tooltip+'">'+ok_title+'</button>'+extra_btn+'</div>';

    $("#" + dialogId).html(htm);
    $("#" + dialogId).find("button.default-btn").bind("click", function ()
    {        
        if (okEvent != null)
            result = eval(okEvent);

        if (hide_form)
            $("#" + dialogId).modal("hide");
    });

    $("#" + dialogId + " #lblHeader").html(Title);   
    
    $("#" + dialogId + " .modal-body").html(message);

    if (d_width) {
        $("#" + dialogId).css("width", d_width + "px");
        $("#" + dialogId + " .modal-body").css("width", d_width - 20 + "px");
    }
    else if (dialogId == "dialog-message" || dialogId == "dialog-message1" || dialogId == "dialog-message2" || dialogId == "custDetail" || dialogId == "custDetail1")
    {
        $("#" + dialogId).css("width", f_width + "px");
        //$("#" + dialogId + " .modal-body").css("width", f_width - 20 + "px");
    }
    if (d_height)
    {
        $("#" + dialogId).css("height", d_height + "px");
        $("#" + dialogId + " .modal-body").css("height", d_height - 110 + "px"); 
    }
    else
    {
        $("#" + dialogId).css("height", "200px");
    }

    $('#' + dialogId).modal('show');
    window.status = message;


    /* -- start Aadilkhan -- */
    if (autoCloseDuration && autoCloseDuration != null) {
        setTimeout(function () {
            $('#' + dialog_id).modal('hide');
        }, parseInt(autoCloseDuration));
    }
    /* -- end -- */
}

function DisplayMessage(msg, isError, customTitle, customWidth,div_id, autoClose,autoCloseDuration,closeOnEnter)
{

    var f_width = $(window).width() / 2;

    var dialog_id = "dialog-message";
    if (div_id != null && div_id.length > 0)
        dialog_id = div_id;

    if (autoClose == true)
    {
        if (autoCloseDuration == null || autoCloseDuration.length == 0)
            autoCloseDuration = 3000;
    }

    var Title = "Message";
    if (isError)
    {
        msg += AppendTimeToMessage();
        Title = "Error";
    }
    $('#' + dialog_id).css({ "width": f_width+"px", "height": "" });
    var htm = '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button><h4 id="lblHeader" class="modal-title">Message</h4></div><div class="modal-body"></div><div class="modal-footer"><button class="btn" data-dismiss="modal" aria-hidden="true">OK</button></div>';

    $('#' + dialog_id).html(htm);

    $("#"+dialog_id +" #lblHeader").html(Title);
    $("#"+dialog_id +" .modal-body").html(msg);
    $('#'+dialog_id).modal('show');

    /* -- start Aadilkhan -- */
    if (autoClose == true) {
        setTimeout(function () {
            $('#' + dialog_id).modal('hide');
        }, parseInt(autoCloseDuration));
    }
    /* -- end -- */

    if(closeOnEnter)
    {
        setTimeout(function () { $("#" + dialog_id).focus(); }, 200);

        $("#" + dialog_id).keypress(function (event)
        {
            var keycode = (event.keycode ? event.keycode : event.which);
            if (keycode == '13' || keycode=='27')
            {
                $('#' + dialog_id).modal('hide');
                event.stopImmediatePropagation();
                return false;
            }
        });
    }
}

//if the user forgots the password
function ForgotPassword()
{        
    var frm = new myForm();            
    frm.drawForm(81, Headers[81],"changeforgotpwd", "ForgotPassword");
    //$("#changeforgotpwd_UserName").val($("#txtUser").val());        
}

//if the user Change the password
function ChangePassword()
{    
    var frm = new myForm();
    frm.drawForm(82,Headers[82], "changeforgotpwd", "ChangePassword");
    //$("#changeforgotpwd_Uid").val($("#txtUser").val());
    //$("#changeforgotpwd_Password").focus();               
}

function ProcessDateValue(val,isgrid)
{
    if (val == null || val.length == 0)
        return null;

    var MonthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var arr = val.split('-');
    var mon = arr[1];
    if(isgrid == null)
        mon = parseInt($.inArray(mon, MonthArray), 10) + 1;
    else
    {
        mon = parseInt(mon,10) - 1;
        mon = MonthArray[mon];
    }
    var final_val = arr[0] + "-" + mon + "-" + arr[2];
    return final_val;
}

function UpdateQstr(qstr,qid,isDelete)
{
    var final_qstr = qstr;    
    var upd_idx = GetUpdateDelIdx(qid);
    
    if (isDelete)
        return upd_idx;

    final_qstr += "&update_id=" + upd_idx + "&update_value='" + gCurRow[upd_idx] + "'"
    return final_qstr
}

function Request_Response()
{
    var qid,client_time,server_time,render_time,destroy_time;
}

function ProcessRequestResponseTime(qid,req_start, req_end, processing_time,render_start,render_end,response_len)
{
    var request_response = new Request_Response();
    request_response.qid = qid;
    request_response.caption = LangHeaders[qid].caption
    request_response.server_time = processing_time.toFixed(2) ;
    request_response.client_time = ((req_end.getTime() - req_start.getTime()) / 1000).toFixed(2) ;
    request_response.render_time = ((render_end.getTime() - render_start.getTime()) / 1000).toFixed(2) ;
    request_response.response_length = gResponseLength;
    gResponseLength = 0;

    req_res_arr.push(request_response);
}
function NetworkPerformanceCheck()
{
    var htm = '<div>';
    for(var i=0;i<req_res_arr.length;i++)
    {        
        htm += '<span> Screen Name =' + req_res_arr[i].caption + '</span></br>';
        htm += '<span> Server Time =' + req_res_arr[i].server_time + ' Seconds </span></br>';
        htm += '<span> Client Time =' + req_res_arr[i].client_time + ' Seconds </span></br>';
        htm += '<span> Render Time =' + req_res_arr[i].render_time + ' Seconds </span></br>';
        htm += '<span> Response Length  =' + req_res_arr[i].response_length + '</span></br>';
        htm += '--------------------------------------------------------------------------------</br></br>';
    }
    htm += '</div>';
    //DisplayMessage(htm, null, "Network Performance");
    //$("#dialog-message").css("height", "530px");    
    var d_width = $(window).width() - 300;
    var d_height = $(window).height() - 200;
    var extra_btn = '<button class="btn"   onclick="ClearNetworkLog()"> Clear Log </button><button class="btn"  aria-hidden="true" onclick="CloseMe(\'custDetail1\')"> Cancel </button>';
    ShowDialog("custDetail1", htm, "SaveNetworkInfo()", null, null, null, "Network Performance History", extra_btn, "Upload Network Info", d_width, d_height, true,"For network related issue please upload the log to network");
    $("#custDetail1").removeClass("center_popup height250").addClass("center_popup_dealer");
    $("#custDetail1").css("overflow", "none");
    $("#custDetail1 .modal-body").css("overflow", "auto");
}

function ClearNetworkLog()
{
    $("#custDetail1 .modal-body").html("");
    req_res_arr = new Array();
}

function SaveNetworkInfo()
{
    var param = (req_res_arr == null) ? null : req_res_arr;
    var qstr = "?cmd=Prism_NetworkLog";
    ajaxCall(qstr, param, "post", NetworkLogResponse);
}

function NetworkLogResponse(retStr)
{
    if (retStr.response_code != "1")
    {
        req_res_arr = new Array();
        DisplayMessage(error_response_type[retStr.response_code]);
    }
    else
        DisplayMessage(retStr.message);
}

function ProcessChild(qid,row_no)
{
    var fqheader = Headers[qid];
    fqheader.cur_row_id = row_no;
    if (fqheader.grid_attrib && fqheader.grid_attrib.CustChild != null && fqheader.grid_attrib.CustChild.length > 0)
    {
        eval(fqheader.grid_attrib.CustChild);
        return;
    }

    var ChildInfo = fqheader.ChildInfo;    
    var row_data = FillCurRowData(qid, row_no);
    var par_arr;
    var par_obj;
    var final_obj = new Object();
    
    for(var key in ChildInfo)
    {
        var child_obj = ChildInfo[key];

        /*@rizwan code commented no need to make double call*/
        //var qry_str = GetLookupOfCurrentScreen(key, null, "?qid=" + key);
        //if (qry_str.indexOf("fetchlookup") >= 0)
        //{
        //    qry_str += "&cmd=fetchlookup";
        //    FetchInfo(qid, qry_str, null);
        //}
        /*@rizwan end*/

        par_arr = new Array();
        for(var j=0;j<child_obj.length;j++)
        {
            par_obj = new Object();
            par_obj[child_obj[j].par_fld] = row_data[child_obj[j].par_fld];
            par_arr.push(par_obj);
        }
        final_obj[key] = par_arr;        
    }
    var qry_str = "?qid="+qid+"&cmd=parchild&parinfo="+JSON.stringify(final_obj)+"";
    getData(qid, GetLookupOfCurrentScreen(qid, false, qry_str), ChildInfo);
}
function ProcessParentChild(data, qid)
{
    var chqid;
    
    var pheader = Headers[qid];
    var obj;
    for (var tobj in data.gpdata1)
    {
        obj = new Object();
        chqid = tobj;
        obj.data = data.gpdata1[tobj];
        obj.status = SetCurrentStatus(obj.data);        
        gQid[chqid] = obj;
        Headers[chqid].par_qid = qid;
    }

    var ar_str = [];
    //pheader.form_div = "pc_pform";//set the form rendering div name
    Headers[chqid].form_div = "pc_cform";
    Headers[chqid].grid_div = "pc_cdata";
    //ar_str.push(pc_spanel.replace("Panelxx", LangHeaders[qid].caption).replace("xxx", "pc_pform"));
    ar_str.push(pc_spanel.replace("Panelxx", LangHeaders[chqid].caption).replace("xxx", "pc_cform"));
    ar_str.push(pc_spanel.replace("Panelxx", LangHeaders[chqid].caption).replace("xxx", "pc_cdata"));

    $('#parform .modal-body').html(ar_str.join(''));
    var btn = '<button class="btn action" onclick="SaveParChild('+qid+')">Save</button>';
    $("#parform .modal-footer").html(btn);
    
    CollapseExpand();
    RenderSimpleTable(chqid, "pc_cdata", "pc_table"); // render child grid
    $("#parform").modal({ backdrop: 'static' });
    $('#parform').on('hide.bs.modal', function (e)
    {
        //debugger;
    });
    var width = $(window).width() - 30;
    var height = $(window).height() - 150;
    $("#parform .modal-dialog").css({ "width": width + "px", "height": height + "px" });    
    //new myForm().drawForm(qid, pheader, "pc_pform", "Update", pheader.cur_row_id); //render parent form
    new myForm().drawForm(chqid, Headers[chqid], "pc_cform", "Add");
    SetChildField(qid);
}

function SetCurrentStatus(data)
{
    var cur_status = new Array();
    for(var i=0;i<data.length;i++)
    {
        cur_status.push(0);
    }
    return cur_status;
}

function SetChildField(pqid)
{
    var pheader = Headers[pqid];
    var ChildInfo = pheader.ChildInfo;
    for (var key in ChildInfo)
    {
        var child_arr = ChildInfo[key];
        for (var i = 0; i < child_arr.length; i++)
        {
            var par_cur_row_data = FillCurRowData(pqid, pheader.cur_row_id);
            $(Headers[key].frmObj + "_" + child_arr[i].ch_fld).val(par_cur_row_data[child_arr[i].par_fld]);//$(pheader.frmObj + "_" + child_arr[i].par_fld).val()
        }
    }
}

function ProcessLocalData(qid, params)
{
    var child_data = gQid[qid].data;    
    var child_len = child_data.length;
    var fqheader = Headers[qid];
    if (fqheader.optype == "Add")
    {
        var tmp_arr = new Array();
        var row_no = 0;
        var child_data_len = child_data.length;
        if (child_data_len > 0)
            row_no = parseInt(child_data[child_data_len - 1][0], 10) + 1;

        tmp_arr[0] = row_no;
        for (var i = 0; i < fqheader.cols.length; i++)
        {
            if (params.hasOwnProperty(i))
                tmp_arr.push(params[i]);
            else
                tmp_arr.push("");
        }
        child_data.push(tmp_arr)
        if (gQid[qid].status == null)
            gQid[qid].status = new Array();

        gQid[qid].status.push("i");
    }
    else
    {
        var orig_data = $.extend(true, {}, child_data[gCurRowId]);
        var row_to_update = child_data[gCurRowId];
        var cur_row_status = gQid[qid].status[gCurRowId];
        for(var key in params)
        {
            var k = parseInt(key,10) + 1;
            var v = params[key];
            row_to_update[k] = v;
        }
        if(cur_row_status == 0)
        {
            if (gQid[qid].updated_data == null)
                gQid[qid].updated_data = new Array();

            var isPush = CheckForDuplicateRow(qid)

            if (isPush)
                gQid[qid].updated_data.push(orig_data);
        }
    }
    RenderSimpleTable(qid, fqheader.grid_div, $("#" + fqheader.grid_div).find("table").attr("id"));
}

function CheckForDuplicateRow(qid)
{    
    var updated_data = gQid[qid].updated_data;
    if(updated_data.length == 0)    
        return true
    
    for(var i=0;i<updated_data.length;i++)
    {
        if(updated_data[i][0] == gCurRowId)
        {
            return false;
        }
    }
    return true;
}

function CollapseExpand()
{
    $('.panel-heading span.clickable').on("click", function (e)
    {
        if ($(this).hasClass('panel-collapsed'))
        {
            // expand the panel
            $(this).parents('.panel').find('.panel-body').slideDown();
            $(this).removeClass('panel-collapsed');
            $(this).find('i').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        }
        else
        {
            // collapse the panel
            $(this).parents('.panel').find('.panel-body').slideUp();
            $(this).addClass('panel-collapsed');
            $(this).find('i').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
        }
    });
}

function SaveParChild(par_qid)
{
    var pqheader = Headers[par_qid];
    var child_info = pqheader.ChildInfo;
    var localIUD;
    var localData = new Object();
    var isValid = false; //to decide whether to make a call or not.
    for(var key in child_info)
    {        
        var cqheader = Headers[key];
        var cur_child_obj = gQid[key];
        localIUD = new LocalCRUD();
        ProcessChildData(cur_child_obj, localIUD, key);
        localData[key] = localIUD;
        if ((localIUD.Insert != null && localIUD.Insert.length > 0) || (localIUD.Update != null && Object.size(localIUD.Update) > 0) || (localIUD.Delete != null && localIUD.Delete.length > 0) && isValid == false)
            isValid = true;
    }
    if (isValid)
    {
        var qstr = "?par_qid=" + par_qid + "&cmd=Prism_ProcessCRUD";
        getData(par_qid, qstr, localData);
    }
    else
    {
        DisplayMessage(error_response_type["gp2014"]);
    }
}

function ProcessChildData(cur_child_obj,localIUD,ch_qid)
{
    var status_arr = cur_child_obj.status;
    for(var i=0;i<status_arr.length;i++)
    {
        if(status_arr[i]=="i")
        {
            var cur_row_id = i;
            var cur_data = cur_child_obj.data[cur_row_id];
            var cur_data_obj = new Object();
            for(var j=1;j<cur_data.length;j++)
            {
                if (cur_data[j].length == 0)
                    continue;

                cur_data_obj[j - 1] = cur_data[j];
            }
            if (localIUD.Insert == null)
                localIUD.Insert = new Array();

            localIUD.Insert.push(cur_data_obj);
        }
    }
    var update_data = cur_child_obj.updated_data;

    if (update_data!=null && update_data.length > 0)
    {
        var idx = GetUpdateDelIdx(ch_qid);
        if (idx != -1)
            localIUD.U_Idx = idx;
        for (var i = 0; i < update_data.length; i++)
        {
            var cur_row_id = update_data[i][0];
            var modified_data = cur_child_obj.data[cur_row_id];
            var modified_obj = new Object();
            for (var j = 1; j < modified_data.length; j++)
            {
                if (modified_data[j] != update_data[i][j])
                {
                    modified_obj[j - 1] = modified_data[j];
                }
            }
            if (localIUD.Update == null)
                localIUD.Update = new Object();

            localIUD.Update[modified_data[idx + 1]] = modified_obj;
        }
    }
    var delete_data = cur_child_obj.Delete;
    if(delete_data!=null && delete_data.length > 0)
    {
        var idx = GetUpdateDelIdx(ch_qid);
        if (idx != -1)
            localIUD.U_Idx = idx;
        
        var del_arr = new Array();
        for(var i=0;i<delete_data.length;i++)
        {
            var del_data = cur_child_obj.data[delete_data[i]];
            del_arr.push(del_data[idx + 1]);
        }
        
         localIUD.Delete =del_arr.join(',');
    }
}
function GetUpdateDelIdx(qid)
{        
    var cols = Headers[qid].cols;
    var upd_idx = -1;
    for (var i = 0; i < cols.length; i++)
    {
        if (cols[i].pscol == 2)
            upd_idx = i;

        if (cols[i].pscol == 19)
        {
            upd_idx = i;
            break;
        }
    }
    return upd_idx;    
}
function LocalCRUD()
{
    var Insert;
    var Update;
    var U_Idx;
    var Delete;
}

function DeleteLocalRow(row_id,qid)
{
    var child_data = gQid[qid].data;
    var row_status = gQid[qid].status;    
    row_id = parseInt(row_id, 10);

    // find the row_id in array
    for (i = 0; i < child_data.length; i++)
    {
        if (child_data[i][0] === row_id)
        {
            row_id = i;
            break;
        }
    }

    var del_row_status = row_status[row_id];

    var fqheader = Headers[qid];
    if (del_row_status == 0)
    {
        if (gQid[qid].Delete == null)
            gQid[qid].Delete = new Array();

        if (gQid[qid].updated_data != null && gQid[qid].updated_data.length > 0)
        {
            var updated_data = gQid[qid].updated_data;
            for(var i=0;i<updated_data.length;i++)
            {
                if (updated_data[i][0] == row_id)
                {
                    updated_data.splice(i, 1);
                    break;
                }
            }
        }
        gQid[qid].Delete.push(row_id);
        row_status[row_id] = "d";
    }
    else if (del_row_status == "i")
    {
        child_data.splice(row_id, 1);
        gQid[qid].status.splice(row_id, 1);
    }
    RenderSimpleTable(qid, fqheader.grid_div, $("#" + fqheader.grid_div).find("table").attr("id"));
}
function SetRoleBaseIUD(qid)
{
    var valid_qid = loginData.valid_qid_list;
    if(valid_qid.hasOwnProperty(qid))
    {
        var IUD="";
        var AllowAdd = valid_qid[qid].AllowAdd;
        var AllowUpdate = valid_qid[qid].AllowUpdate;
        var AllowDelete = valid_qid[qid].AllowDelete;

        IUD += (AllowAdd == true) ? "I" : "";
        IUD += (AllowUpdate == true) ? "U" : "";
        IUD += (AllowDelete == true) ? "D" : "";
       
        Headers[qid].dmlop = IUD;
    }
}

function ProcessMenuOptions(data,sobj)
{
    sobj = $.parseJSON(data.gpdata1);
    $("#sform").attr("qid", null);
    loginData = $.parseJSON(data.gpdata4);
    $(".header_toggle").css("display", "block");
    if (data.session_id != null)
    {
        if (data.session_id.indexOf("Dealer") >= 0)
            writePersistentCookie("DealerSessionID", data.session_id, "hours", 12);
        else if (data.session_id.indexOf("Admin") >= 0)
            writePersistentCookie("AdminSessionID", data.session_id, "hours", 12);
        else if (data.session_id.indexOf("MDM") >= 0)
            writePersistentCookie("MDMSessionID", data.session_id, "hours", 12);
        else
        {
            writePersistentCookie("UserSessionID", data.session_id, "hours", 12);

            if (isPhoneGap() && isNetworkAvailable())
                localStorage.setItem("UserSessionID", data.session_id);
        }
    }
    var user_role = null;
    if (data.gpdata3 != null && data.gpdata3.hasOwnProperty("Role"))
    {
        user_role = data.gpdata3.Role;

        if (loginData == null)
            loginData = new Object();

        loginData.loginInfo = data.gpdata3;
        loginData.valid_qid_list = sobj.valid_qid_list[data.gpdata3.RoleId];
    }

    if (user_role != null)
    {
        var pathname = window.location.pathname;
        if (user_role == "ADMIN")
        {
            if (pathname.indexOf("prismadmin") >= 0)
            {
                //   ProcessMenu(sobj.Menu, data.gpdata3);
                ProcessFSOMenu(sobj.Menu, data.gpdata3);
            }
            else
            {
                DisplayInvalidMessageAndShowLoginPage(pathname);
                return;
            }
        }
        else if (user_role == "DEALER")
        {
            if (pathname.indexOf("prismdealer") >=0)
                ProcessFSOMenu(sobj.Menu, data.gpdata3);
            else
            {
                DisplayInvalidMessageAndShowLoginPage(pathname)
                return;
            }
        }
        else if (user_role == "MDM")
        {
            if (pathname.indexOf("prismmdm") >= 0)
            {
                ProcessFSOMenu(sobj.Menu, data.gpdata3);
                curr_menu_item = "270";
                showNextPage(true);
                RenderPrism();
                                
                $("#home").css("display", "none");
                $("#projlink").css("display", "none");
                $("#sync").css("display", "none");                
                $("#main").addClass("wrapper row-offcanvas row-offcanvas-left").css("width", '');

                showCustomerDetailmenu("270");
                ViewInformationMenuItem(this, "178", '270')
                $("#main .sidebar-menu #SubMenu-0").addClass("selected-menu");

                ManagePlannerDesign();
            }
            else
            {
                DisplayInvalidMessageAndShowLoginPage(pathname)
                return;
            }
        }
        else
        {
            if (pathname.indexOf("prismuser") >= 0)
            {
                if (loginData.start_day_info.length > 0)
                {
                    if (loginData.start_day_info[0].start_time)
                    {
                        localStorage.setItem("CurRouteID", loginData.start_day_info[0].ActualRouteId);
                        localStorage.setItem("StartDayTime", loginData.start_day_info[0].start_time);
                        localStorage.removeItem("EndDayTime");
                    }
                }
                else
                {
                    localStorage.removeItem("CurRouteID");
                    if (loginData.start_end_info.length > 0 && loginData.start_end_info[0].end_time != null)
                    {
                        localStorage.setItem("StartDayTime", loginData.start_end_info[0].start_time);
                        localStorage.setItem("EndDayTime", loginData.start_end_info[0].end_time);
                    }
                    else
                    {
                        localStorage.removeItem("StartDayTime");
                        localStorage.removeItem("EndDayTime");
                    }
                }
                ProcessFSOMenu(sobj.Menu, data.gpdata3);
            }
            else
            {
                DisplayInvalidMessageAndShowLoginPage(pathname);
                return;
            }
        }
    }
    if(loginData.visit_lookup !=null && Object.size(loginData.visit_lookup) > 0)
    {
        for (var key in loginData.visit_lookup)
        {
            if(!gLookup.hasOwnProperty(key))
                gLookup[key] = loginData.visit_lookup[key];
        }
    }
    if(loginData.visit_lookup_par_child !=null && Object.size(loginData.visit_lookup_par_child) > 0)
    {
        for (var key in loginData.visit_lookup_par_child)
        {
            if (!gLookup.hasOwnProperty(key) && key!="zone_region_depot")
                gLookup[key] = loginData.visit_lookup_par_child[key];
        }
    }
    localStorage.setItem('UserData', JSON.stringify(loginData));/*@rizwan set the logindata to be used during offline mode*/
}
function DisplayInvalidMessageAndShowLoginPage(pathname)
{
    var err_code="";
    if (pathname.indexOf("prismadmin") >= 0)
        err_code = "gp2011";
    else if (pathname.indexOf("prismdealer") >= 0)
        err_code = "gp2017";
    else if(pathname.indexOf("prismmdm") >=0)
        err_code = "gp2028";
    else
        err_code = "gp2012";

    DisplayMessage(error_response_type[err_code]);
    DisplayLoginPage();
}
function ProcessPostDMLOperations(data, fqheader,qid)
{
    var close_form = true
    var postDMLRefresh = "";
    if (fqheader.frm_attrib)
    {
        if (fqheader.frm_attrib.postDML != null)
            eval(fqheader.frm_attrib.postDML);
        if (fqheader.frm_attrib.close_form != null)
            close_form = (fqheader.frm_attrib.close_form == "false" ? false : true);
        if (fqheader.frm_attrib.postDMLRefresh != null)
            postDMLRefresh = fqheader.frm_attrib.postDMLRefresh;        
    }
    
    if (close_form)    
        $(fqheader.frmObj).modal("hide");
    
    var msg = error_response_type[data.response_code];
    if (fqheader.optype == "Add" && fqheader.frm_attrib && fqheader.frm_attrib.AddMsg != null)
        msg = fqheader.frm_attrib.AddMsg;
    
    DisplayMessage(msg, null, null, null, "dialog-message1",true,1000); // -- Modified by Aadilkhan-- only true and 1000 value added for auto close the popup

    if (fqheader.frm_attrib !=null && fqheader.frm_attrib.close_form_and_return != null && fqheader.frm_attrib.close_form_and_return == "true")
        return;

    if (fqheader.grid_attrib)
    {
        if (fqheader.grid_attrib.custom_menu_item_click != null) {
            eval(fqheader.grid_attrib.custom_menu_item_click)
            return;
        }
        if (fqheader.grid_attrib.client_menu_item_click != null) {
            eval(fqheader.grid_attrib.client_menu_item_click)
        }
    }
    
    if (fqheader.isForm != null && fqheader.isForm == "True")
        return;

    if (postDMLRefresh.length > 0)
    {
        eval(postDMLRefresh);
        return;
    }

    getData(qid, GetLookupOfCurrentScreen(qid));
}

function LoginSubmitHandler()
{

    $("#LoginDiv").keypress(function (event)
    {
        var keycode = (event.keycode ? event.keycode : event.which);
        if (keycode == '13')
        {
            //var source = event.srcElement != null ? event.srcElement : event.target;
            $(this).find("#btnLogin").click();
            event.stopImmediatePropagation();
            return false;
        }
    });
}

function ExportExcel(qid)
{
    debugger;
    var fqheader = Headers[qid];
    var sHeaders = '';
    var sWidth = "";
    $("[qid*='" + qid + "'] thead>tr>th").each(function ()
    {
        if (sWidth.length == 0)
            sWidth = $(this).width();
        if ($(this).hasClass('chk_box'))
            sWidth = 0;
        else
            sWidth = sWidth + "," + $(this).width();
    });
    for (var i = 0; i < fqheader.cols.length; i++)
    {
        if (fqheader.cols[i].hide == "0" || fqheader.cols[i].hide == 'undefined' || fqheader.cols[i].hide == undefined || fqheader.cols[i].hide == '')
        {
            sHeaders = sHeaders + i + ',';
        }

    }
    var EmpCode = loginData.loginInfo.EmpCode;
    var myloc = gSvcUrl.replace('/service.aspx', '/ExcelExport.aspx') + "?qid=" + qid + "&empcode=" + EmpCode + "&cmd=data&tit=" + LangHeaders[qid].caption + "&hdcnt=" + sHeaders + "&twidth=" + sWidth;
    var win = window.open(myloc);
}

function DisplayHomePage(type)
{
    switch(type)
    {
        case "admin":
            $("#tpar").css("display", "none");
            break;
        case "user":
            fsoHome();
        case "mdm":
            return;
    }
}

function GetFormattedCurrentDate(increment_decrement_day)
{
    var MonthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var dt = new Date();
    var day = dt.getDate();
    var mon = dt.getMonth();
    var year = dt.getFullYear();

    if (increment_decrement_day != null && increment_decrement_day.toString().length > 0)
    {                 
        day = dt.getDate() + (increment_decrement_day);
        mon = dt.getMonth();
        year = dt.getFullYear();
    }

    if (day < 10)
    {
        day = '0' + day;
    }
    
    return day + "-" + MonthArray[dt.getMonth()] +"-"+ dt.getFullYear();
}

function RefreshPage()
{
    if ((isPhoneGap() && isNetworkAvailable()) || navigator.onLine) {
        
        var saved_call = localStorage.getItem("customerCall");
        if (saved_call != null)
            DisplayMessage(error_response_type["gp2039"]);
        else
            window.location.reload(true);
    }
    else
        DisplayMessage(error_response_type["gp2039"]);
}