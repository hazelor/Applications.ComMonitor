var gSvcUrl;
var gDataTable;
var gLookup;
var gQid;
var loc;
var gResponseLength;   // set during the response of Ajax call 

var dataCols = [
                { "title": "Engine" },
                { "title": "Browser" },
                { "title": "Grade", "class": "center" }
];

function toggleChecks(obj)
{
    $('.case').prop('checked', obj.checked);
    if ($("#ptable").attr("qid") == "178")
        VisibleMoreOnDevice(obj);
}

function getCols(qid)
{
    var cols = LangHeaders[qid].colnames;
    var header = Headers[qid];

    var flen = cols.length;

    if (header.grid_attrib && header.grid_attrib.data_fld_cnt)
        flen = header.grid_attrib.data_fld_cnt;

    var cinfo = new Array();
    var cobj;

    cobj = new Object;

    if (header.dmlop && header.dmlop.indexOf("D") >= 0) //if delete right is there than and only than display the checkbox
    {
        cobj["title"] = "<input type='checkbox' id='selectall' onclick='toggleChecks(this)'; ></input>";        
        cobj["width"] = 70;
    }
    else    
        cobj["title"] = "";        
    
    cobj["bSortable"] = false;
    cinfo.push(cobj);

    for (var i = 0; i < flen; i++)
    {
        cobj = new Object;
        cobj["title"] = cols[i];
        cinfo.push(cobj);
    }

    return (cinfo);

}

function PrismCust(data, type, row, tobj)
{
    var tid = tobj.settings.sTableId;
    var qid = $("#" + tid).attr("qid");
    var header = Headers[qid];
    var cols = header.cols;
    var cno = tobj.col;

    if (header.dmlop)
        cno--;

    var cobj = cols[cno];
    //  var menu_to_render = cobj.frm_options.submenu.split('_');

    var htm = "<a href='#' class='link' onclick='ProcessRole(\"" + row[1] + ":" + row[2] + "\")'> Set Operation</a>";
    return htm;
}

function DownloadImg(data,type,row,tobj)
{
    /* -- start -- Aadilkhan -- */
    var value ="";
    if (data.indexOf("__") != -1)
        value = data.substring(data.indexOf("__") + 2, data.length);
    else
        value = data;

    return "<a href='#' onclick='fileDownload(this, \""+ data+"\")'>" + value + "</a>";

    /* -- end -- */

    //return "<a href='#' onclick='fileDownload(this, \""+data+"\")'>" + data + "</a>";
}


function ProcessLink(data, type, row, tobj)
{
    var tid = tobj.settings.sTableId;
    var qid = $("#" + tid).attr("qid");
    var header = Headers[qid];
    var cols = header.cols;
    var cno = tobj.col;


    cno = cno - 1;

    var cobj = cols[cno];
    //  var menu_to_render = cobj.frm_options.submenu.split('_');

    var htm = '<a href="#" class="link" onclick=\"ViewSubMenu(\'' + cobj.frm_options.submenu + '\',\'' + data + '\',' + qid + ',\'' + row[2] + '\')\"> ' + data + '</a>';// change by Pratik
    return htm;
}

function renderPcSelect(data, type, row, tobj)
{
    var tid = tobj.settings.sTableId;
    var qid = $("#" + tid).attr("qid");
    var header = Headers[qid];
    var cols = header.cols;
    var cno = tobj.col;
    cno = cno - 1;

    //if (header.dmlop)
    //  cno--;
    var pardata;
    var cobj = cols[cno];
    var clookup = cobj.eopt;
    var clookup = gLookup[clookup];
    if (clookup == null && cobj.etype == "pcselect") {
        cno = cobj.frm_options.pcfld.split('|')[0];
        cobj = cols[cno];
        clookup = cobj.eopt;
        clookup = gLookup[clookup];
        pardata = row[parseInt(cno) + 1];
    }
    var result = data;
    var getpardata = false;
    if (pardata != null)
        data = pardata;
    var key;
    if (clookup != null) {
        var li_key = clookup.li_key;
        var li_val = clookup.li_val;
        for (var j = 0; j < li_key.length; j++) {
            key = li_key[j];
            if (key == data) {
                if (pardata != null && getpardata == false) {
                    for (var k = 0; k < clookup.li_child[j].li_key.length; k++) {

                        data = result;
                        li_key = clookup.li_child[j].li_key;
                        li_val = clookup.li_child[j].li_val;
                        getpardata = true;
                        j = -1;//to initialize it from 0 at the time of increment
                        break;
                    }
                    continue;
                }
                result = li_val[j];
                break;
            }
            else
                continue;
        }
    }
    //for multiselect
    //if (cobj.frm_options != null)
    //{
    //    if (cobj.frm_options.type != null && cobj.frm_options.type == "multiselect" && clookup != null)
    //    {
    //        var data_arr = data.split(',');
    //        result = "";
    //        for (var i = 0; i < data_arr.length; i++)
    //        {
    //            if (clookup.hasOwnProperty(data_arr[i]))
    //            {
    //                result += (i == 0) ? clookup[data_arr[i]] : ("," + clookup[data_arr[i]]);
    //            }
    //        }
    //    }
    //}
    if (result == null)
        result = "";
    return (result);
}

function renderLookup(data, type, row, tobj)
{
    var tid = tobj.settings.sTableId;
    var qid = $("#" + tid).attr("qid");
    var header = Headers[qid];
    var cols = header.cols;
    var cno = tobj.col;
    cno = cno - 1;

    //if (header.dmlop)
    //  cno--;

    var cobj = cols[cno];
    var clookup = cobj.eopt;
    var clookup = gLookup[clookup];
    var result = data;
    if (clookup != null)
        result = clookup[data];

    if (cobj.frm_options != null)
    {
        if (cobj.frm_options.type != null && cobj.frm_options.type == "multiselect" && clookup != null)
        {
            var data_arr = data.split(',');
            result = "";
            for (var i = 0; i < data_arr.length; i++)
            {
                if (clookup.hasOwnProperty(data_arr[i]))
                {
                    result += (i == 0) ? clookup[data_arr[i]] : ("," + clookup[data_arr[i]]);
                }
            }
        }
    }
    if (result == null)
        result = "";
    return (result);
}


function getColsDef(qid)
{
    var header = Headers[qid];
    var cols = header.cols;
    var cobj, col_hide;
    var cinfo = new Array();
    var hide_array = new Array();
    var inc_target = 0;

    var flen = cols.length;

    if (header.grid_attrib)
    {
        if (header.grid_attrib.data_fld_cnt)
            flen = header.grid_attrib.data_fld_cnt;
        if (header.grid_attrib.before_grid_load)
            eval(header.grid_attrib.before_grid_load);
    }

    cobj = new Object;
    //if (header.dmlop)
    //{
    cobj["targets"] = 0;
    cobj["render"] = function (data, type, row, tobj)
    {
        var tid = tobj.settings.sTableId;
        var qid = $("#" + tid).attr("qid");
        var htm = "";
        var title = "Update";
        if (header.dmlop.indexOf("U") == -1)
        {
            title = "View"
            if (header.dmlop.indexOf("V") == -1)
                header.dmlop += "V";
        }
        if (header.dmlop.indexOf("D") >= 0)
        {
            htm += "<input type='checkbox' class='case' rowno='" + row[0] + "'";
            if (header.grid_attrib && header.grid_attrib.chk_box_onchange)
                htm += " onchange = '" + header.grid_attrib.chk_box_onchange + "' ";
            htm += "/>";
        }

        var fqheader = Headers[qid];
        var hide_update_icon = false;
        if (fqheader.grid_attrib != null && fqheader.grid_attrib.hide_update_icon != null)
            hide_update_icon = fqheader.grid_attrib.hide_update_icon;

        if (hide_update_icon == false)
            htm += "<img src='assets/images/icon-view-info.png' class='iupdate' title=" + title + " onclick='DrawFormInUpdateMode(" + row[0] + "," + qid + ")'  />";
        
        if (fqheader.ChildInfo != null && Object.size(fqheader.ChildInfo) > 0 || (fqheader.grid_attrib && fqheader.grid_attrib.CustChild != null && fqheader.grid_attrib.CustChild.length > 0))
            htm += "<img src='assets/images/icon-detail.png' title='Child Screen' class='idetail'  onclick='ProcessChild(" + qid + "," + row[0] + ")' />";

        return htm;
    };
    cobj["width"] = 70;
    //}
    //else
    //{
    //    cobj["title"] = "";
    //    hide_array.push(0);
    //}
    cinfo.push(cobj);

    for (var i = 0; i < flen; i++)
    {
        col_hide = cols[i].hide;
        if (col_hide == "1" || col_hide == "01" || col_hide == "11")
            hide_array.push(i + 1);
        if (cols[i].etype) 
        {
            
            if (cols[i].etype == "sselect" || cols[i].etype == "radio") // added radio condition by pratik)                            
            {
                cobj = new Object;
                cobj["render"] = renderLookup;
                cobj["targets"] = i + 1;
                cinfo.push(cobj);
            }
            
            ////   spratik  ///////
            if (cols[i].etype == "pcselect" && cols[i].frm_options.submenu == null)
            {
                cobj = new Object;
                cobj["render"] = renderPcSelect;
                cobj["targets"] = i + 1;
                cinfo.push(cobj);
            }
            ////   epratik  ///////
        }
        if (cols[i].frm_options != null && cols[i].frm_options.submenu != null && (loginData.loginInfo.Role != "ADMIN" && loginData.loginInfo.Role != "CSR"))
        {
            cobj = new Object;
            cobj["render"] = ProcessLink;
            cobj["targets"] = i + 1;
            cinfo.push(cobj);
        }
        if (cols[i].frm_options != null && cols[i].frm_options.custom != null)
        {
            cobj = new Object;
            cobj["render"] = window[cols[i].frm_options.custom]; // PrismCust; //cols[i].frm_options.custom;
            cobj["targets"] = i + 1;
            cinfo.push(cobj);
        }
        if(cols[i].dtype == "numeric" || cols[i].dtype == "decimal")
        {
            cobj = new Object();
            cobj["targets"] = i + 1;
            cobj["className"] = "dt-body-right";
            cinfo.push(cobj);
        }
    }

    if (hide_array.length > 0)
    {
        cobj = new Object;
        cobj["targets"] = hide_array;
        cobj["visible"] = false;
        cinfo.push(cobj);
    }
    return cinfo;
}



function getData(qid, qstr, params,callType)
{

    var tloc = gSvcUrl + qstr;
    var param = (params == null) ? null : JSON.stringify(params);
    $("#iframeloading").show();
    var req_start = new Date();
    var req_end;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: tloc,
        data: param,
        dataType: "json",
        success: function (data, textStatus, request)
        {
            //checkForNetworkAndCall();
            $("#iframeloading").hide();
            gResponseLength = request.responseText.length;
            req_end = new Date();
            var render_start = new Date();
            var fqheader = Headers[qid];
            if (data.response_code != "1")
            {
                if (data.response_code == "1000")
                    DisplayLoginPage();

                var sobj = null;
                ProcessLookup(data);
                if (data.response_type == 0) // response_type = 0 will be for rendering data in grid
                {
                    /* @Pratik --after execution of SP display successful search message */
                    if (fqheader.frm_attrib && fqheader.frm_attrib.search_msg != null) {
                        DisplayMessage(fqheader.frm_attrib.search_msg);
                        return;
                    }
                    /* end */

                    var RenderGridForcefully = false;
                    if (fqheader.grid_attrib && fqheader.grid_attrib.RenderGridForcefully == true)
                        RenderGridForcefully = true;

                    if (fqheader.isForm != null && fqheader.isForm == "True" && RenderGridForcefully == false)
                    {
                        new myForm().drawForm(qid, fqheader, "myform", "Add");
                        $("#iframeloading").hide();
                    }
                    var qid_details = new Object();
                    gQid = new Object(); // qid should be created for parent object , childs would be added to this object  
                    qid_details["data"] = data.gpdata1;

                    gQid[qid] = qid_details;
                    
                    RenderGridData(data, qid);
                }
                else if (data.response_type == 1) // response_type = 1 will be for rendering menu
                {
                    ProcessMenuOptions(data, sobj);
                }
                else if (data.response_type == 2) // For DML Operation (Insert)
                {
                    ProcessPostDMLOperations(data, fqheader, qid);
                }
                else if (data.response_type == 3) //no user with specified UserName and Password
                {
                    DisplayMessage(error_response_type[data.response_code],null,null,null,null,null,null,true);
                    $("#changeforgotpwd").modal("hide");
                }
                else if (qry_opt[qid]) // if (data.response_type == 4 || data.response_type == 5)
                { //for rendering the chart view (4) and Tree View (5)

                    if (data.response_type == 11)
                    {
                        var frm = new myForm();
                        var formdiv = fqheader.optype == "Search" ? "sform" : "myform";
                        frm.drawForm(qid, fqheader, formdiv, fqheader.optype);
                        return;
                    }

                    ProcessJtreeResponse(data, qid, "div_par");
                    if (Headers[qid].grid_attrib && Headers[qid].grid_attrib.after_grid_load)
                        eval(Headers[qid].grid_attrib.after_grid_load);
                }
                else if (data.response_type == 6) //For Rendering the Parent Child Info
                    ProcessParentChild(data, qid);
                else if (data.response_type == 7)//LocalCRUD
                {
                    DisplayMessage(error_response_type[data.response_code],null,null,null,null,true); // @adilkhan - for auto close message dialog 
                    $("#parform").modal("hide");
                    if (fqheader.frm_attrib.postDML != null)
                        eval(fqheader.frm_attrib.postDML);
                }
                else if (data.response_type == 8)//Display Message After Insert/update/delete
                {
                    var response_code = data.response_code;
                    if (fqheader.frm_attrib != null)
                    {
                        if(fqheader.frm_attrib != null && fqheader.frm_attrib.custmsg_add && fqheader.optype == "Add")
                            response_code = fqheader.frm_attrib.custmsg_add;

                        if(fqheader.frm_attrib.post_add!=null && fqheader.optype == "Add") // fire custom event after inserting
                            eval(fqheader.frm_attrib.post_add)

                        if (fqheader.frm_attrib.post_update != null && fqheader.optype == "Update") // fire custom event after updating
                            eval(fqheader.frm_attrib.post_update)

                        if (fqheader.frm_attrib.post_dml != null) //fire custom event after insert/update.
                            eval(fqheader.frm_attrib.post_add_update)

                        if (fqheader.frm_attrib.hasOwnProperty(response_code))
                            response_code = fqheader.frm_attrib[response_code];
                    }
                        

                    DisplayMessage(error_response_type[response_code]);

                }
                else if (data.response_type == 9)//Display Message For SAP
                {
                    //$("#Sync Data to SAP_8").hide();
                    DisplayMessage(data.message);
                    $("#myform").modal("hide");
                }
                else if(data.response_type == 10)
                {
                    DisplayMessage(error_response_type[data.response_code]);
                    ChangePassword();
                }
                else if(data.response_type == 11)
                {
                    var frm = new myForm();
                    var formdiv = fqheader.optype == "Search" ? "sform" : "myform";
                    frm.drawForm(qid, fqheader, formdiv, fqheader.optype);
                }
                
            }
            else
                DisplayMessage(data.message);

            var render_end = new Date();
            ProcessRequestResponseTime(qid, req_start, req_end, data.processing_time, render_start, render_end);
        },
        error: function (xhr, textStatus)
        {
            //@sanjay---Offline Functionality for Tool Call and Creating Structure Call
            $("#iframeloading").hide();
            if (callType) {
                CreateOfflineCallStructure(qstr, params, callType,qid);
            }
            else {
                ProcessErrorInfo(xhr);
            }
        }
    });
}

function PreProcessDataSource(qid, data_src)
{
    var row;
    if (qid == 145 || qid==194)
    {
        var gorb = {};
        gorb["G"] = "<span class='Ggreen'>";
        gorb["O"] = "<span class='Gorange'>";
        gorb["R"] = "<span class='Gred'>";
        gorb["B"] = "<span class='Gblack'>";
        for (var i = 0; i < data_src.length; i++)
        {
            row = data_src[i];
            if (qid == 145) {
                if (row[8] && row[7])
                    row[7] = gorb[row[8]] + row[7] + "</span>";
            } else {
                if (row[4] && row[5]) {
                    row[4] = gorb[row[5]] + row[4] + "</span>";
                    row[6] = gorb[row[7]] + row[6] + "</span>";
                    row[8] = gorb[row[9]] + row[8] + "</span>";
                    row[10] = gorb[row[11]] + row[10] + "</span>";
                    row[12] = gorb[row[13]] + row[12] + "</span>";
                    row[14] = gorb[row[15]] + row[14] + "</span>";
                    row[16] = gorb[row[17]] + row[16] + "</span>";
                    row[18] = gorb[row[19]] + row[18] + "</span>";
                }              
            }
        }
    }
    //else if (qid == 178)
    //{
    //    for (var i = 0; i < data_src.length; i++)
    //    {
    //        row = data_src[i];
    //        if (row[12] == "1")
    //        {
    //            row[12] = '<img src="assets/images/Lock.png" class="lock_unlock" onclick=StatusClicked(true,\"' + row[2] + '\") />';
    //        }
    //        else if (row[12] == "2" || row[12] == "3" || row[12]=="")
    //        {
    //            row[12] = '<img src="assets/images/Unlock.png" class="lock_unlock" onclick=StatusClicked(false,\"' + row[2] + '\") />';
    //        }

    //        if (row[13] == "")
    //        {
    //            row[13] = '<img src="assets/images/remote_uninstall.png" class="lock_unlock" />';
    //        }

    //    }
    //}
    else if (qid == 122)
    {
        for(var i=0;i<data_src.length;i++)
        {
            row = data_src[i];
            if (parseInt(row[2], 10) < 0 && $.isNumeric(row[2]))
                row[2] = Math.abs(row[2]) + '<img src="assets/images/red-down.png" class="updown" />';
            if (parseInt(row[3], 10) < 0 && $.isNumeric(row[3]))
                row[3] = Math.abs(row[3]) + '<img src="assets/images/red-down.png" class="updown" />';
            if (parseInt(row[4], 10) < 0 && $.isNumeric(row[4]))
                row[4] = Math.abs(row[4]) + '<img src="assets/images/red-down.png" class="updown" />';
            if (parseInt(row[5], 10) < 0 && $.isNumeric(row[5]))
                row[5] = Math.abs(row[5]) + '<img src="assets/images/red-down.png" class="updown" />';

            if (parseInt(row[2], 10) > 0 && $.isNumeric(row[2]))
                row[2] += '<img src="assets/images/green-up.png" class="updown" />';
            if (parseInt(row[3], 10) > 0 && $.isNumeric(row[3]))
                row[3] += '<img src="assets/images/green-up.png" class="updown" />';
            if (parseInt(row[4], 10) > 0 && $.isNumeric(row[4]))
                row[4] += '<img src="assets/images/green-up.png" class="updown" />';            
            if (parseInt(row[5], 10) > 0 && $.isNumeric(row[5]))
                row[5] += '<img src="assets/images/green-up.png" class="updown" />';
        }
    }
    else if (qid == 23)
    {
        for (var i = 0; i < data_src.length; i++)
        {
            row = data_src[i];
            var dcode = row[4];
            if (gLookup["dealer_code"][dcode] != null)
                row[4] = gLookup["dealer_code"][dcode];
            else
                row[4] = "";
        }
    }
    return data_src;
}


function RenderGridData(data, qid, rendering_div, tname)
{
   var hdr = Headers[qid];
    if (qry_opt[qid])
    {
        ProcessJtreeResponse(data, qid, "div_par");
        if (hdr.grid_attrib && hdr.grid_attrib.after_grid_load)
            eval(hdr.grid_attrib.after_grid_load);
        return;
    }

    if (hdr.grid_attrib && hdr.grid_attrib.grid_template != null && hdr.grid_attrib.grid_template.toLowerCase().indexOf("viewmessageui") >= 0)
    {
        ViewMessageUI(qid, data.gpdata1);
        return;
    }

    if (rendering_div == null)
        rendering_div = "tpar";

    var data_src;

   
    if (hdr.render_div != null)    
        rendering_div = hdr.render_div;        
    

    if (tname == null)
    {
        tname = "ptable";  // for child tname could be passed as parameter 
        data_src = data.gpdata1;
    }
    else
    {
        data_src = data.gpdata1[qid];
    }

    if (rendering_div != "div_par")/*@rizwan*/
        tname = "rtable";

    var table_id = "#" + tname;

    if ($(table_id).length > 0)
    {
        if (gDataTable)
        {
            try
            {
                $(table_id).dataTable().fnDestroy(true);
            } catch (e)
            {

            }
        }
    }

    if (hdr.grid_attrib && hdr.grid_attrib.header2)
    {
        RenderSimpleTable(qid, rendering_div, tname);
        /////////  s_pratik //////////////
        if (hdr.grid_attrib && hdr.grid_attrib.after_grid_load)
            eval(hdr.grid_attrib.after_grid_load);
        /////////  e_pratik //////////////
        return;
    }

    if(data_src!=null)
        PreProcessDataSource(qid, data_src);

    $('#' + rendering_div).html('<table cellpadding="0" cellspacing="0" border="0" class="display" qid="' + qid + '" id="' + tname + '"></table>');
    
    var d_height = $(window).height();
    var grid_height = (d_height) - (140 + $(".header").height());

    var sort_column = [[1, 'asc']];
    if (hdr.grid_attrib && hdr.grid_attrib.sort_column != null && hdr.grid_attrib.sort_column.length > 0)
        sort_column = hdr.grid_attrib.sort_column;

    gDataTable = $(table_id).DataTable({
        "data": data_src,
        "columns": getCols(qid), //
        "columnDefs": getColsDef(qid),
        "dom": 'T<"toolbar">frtiS',     // f:filtering , p:pagination, t:table , i:info, l: length changing    
        "tableTools": {
            "sSwfPath":"assets/swf/copy_csv_xls_pdf.swf",
            "aButtons": [			
				{
				    //"sExtends":    "collection",
				    //"sButtonText": "Export",
				    //"aButtons": ["csv", "xls",
                    //{
				    //    "sExtends": "pdf",
				    //    "sPdfOrientation": "landscape",
				    //    "sPdfMessage": LangHeaders[qid].caption
				    //}]
				    "sExtends": "pdf",
				    "sTitle": "Prism Cement",
				    "sButtonText": "PDF Export",
				    "sPdfOrientation": "landscape",
				    "sPdfMessage": LangHeaders[qid].caption
				}
            ]
        },
        "scrollY": grid_height,
        "scrollX": true,
        "order": sort_column, 
        "deferRender": true
    });

    ///// pratik: to add column sum
    if (hdr.grid_attrib && hdr.grid_attrib.column_sum)
        $("#ptable_info").after("<label class='footer_sum'> Total Counts:" + gDataTable.column(hdr.grid_attrib.column_sum).data().sum() + "</label>");

    $("div.toolbar").html(RenderToolbar(qid));
    if (hdr.grid_attrib && hdr.grid_attrib.after_grid_load)
        eval(hdr.grid_attrib.after_grid_load);

    //$("<div class='screen_caption'><span>" + LangHeaders[qid].caption + "</span></div>").insertAfter($("div.toolbar"));
}



function RenderSimpleTable(qid, rdiv, tname)
{
    var hdr = Headers[qid];
    var qdetail = gQid[qid];
    var cols = getCols(qid);
    var cinfo = hdr.cols;
    var col_hide;

    var ar_html = [];
    ar_html.push('<div class="table-responsive" style="overflow:auto;">');
    ar_html.push('<table width="100%" cellpadding="0" cellspacing="0" border="0" class="table mytable" qid="' + qid + '" id="' + tname + '"> <tr>');

    var data_src = qdetail["data"];
    var status = qdetail["status"];
    /*if (qdetail[data].gpdata1)
        data_src = data_src.gpdata1; */

    if (hdr.grid_attrib && hdr.grid_attrib.header2)
    {
        var hdr2 = hdr.grid_attrib.header2;

        for (var i = 0; i < hdr2.length; i++)
        {
           
            ar_html.push('<th colspan=' + hdr2[i][1] + ' >' + hdr2[i][0] + '</th>');
        }
        ar_html.push('<tr>');
    }

    var sval = (hdr.dmlop) ? 0 : 1;
    var ar_hide = [],ar_select = [];
    var ccol ;

    for (var i = sval; i < cols.length; i++)
    {
        if (i != 0)
        {
            ccol = cinfo[i - 1];
            col_hide = ccol.hide;
            if (ccol.etype && (ccol.etype == "sselect" || ccol.etype == "radio"))
                ar_select.push(ccol.eopt);
            else
                ar_select.push(null);
        }
        else
        {
            // col_hide = "1";  // not to hide first column ( control)
            col_hide = "0";  // not to hide first column ( control)
            ccol = null;
            ar_select.push(null);
        }

        
        //if (col_hide == "1" || col_hide == "01" || col_hide == "11")
        if (col_hide == null || col_hide == "0" || col_hide == "10")
        {
            ar_html.push('<th>' + cols[i].title + '</th>');
            ar_hide.push(true);
        }
        else
            ar_hide.push(false);
    }
    ar_html.push('</tr>');

    var cdata,clookup;

    for (var i = 0; i < data_src.length; i++)
    {
        if (status != null && status[i] == "d")
            continue;

        cdata = data_src[i];
        ar_html.push('<tr>');
        if (hdr.dmlop)
        {
            //<input type='checkbox' class='case' rowno='" + cdata[0] + "' />
            ar_html.push("<td><img src='assets/images/icon-view-info.png' title='Update Row' class='iupdate' onclick='DrawFormInUpdateMode(" + cdata[0] + "," + qid + ")' />");
            if (hdr.dmlop.indexOf("D") >= 0)
                ar_html.push("<img src='assets/images/delete_icon.png' title='Delete Row' class='idelete' onclick='DeleteLocalRow(" + cdata[0] + "," + qid + ")' />")
            ar_html.push("</td>");
        }

        /////   spratik   ///////
        var k = 1;
        var j;
        if (hdr.QueryOption)
            k = 0;

        /////   epratik   ///////

        for (var j = 1,p=k; j < cdata.length; j++,p++)
        {
            if (ar_hide[p])
            {
                var clookup = ar_select[p];
                if (clookup)
                {
                    clookup = gLookup[clookup];
                    if (clookup != null)
                    {
                        clookup = clookup[cdata[j]];
                        if (!clookup)
                            clookup = "";
                        ar_html.push('<td>' + clookup  + '</td>');
                    }
                }
                else
            ar_html.push('<td>' + cdata[j] + '</td>');
            }
        }
        ar_html.push('</tr>');

    }
    ar_html.push('</table></div>');
    $('#' + rdiv).html(ar_html.join(''));
}

function ProcessErrorInfo(xhr)
{
    $("#iframeloading").hide();

    switch (xhr.status)
    {
        case 404:
            alert('Page Not Found');
            break;
        case 400:
            alert('Bad Request');
            break;
        case 12002:
            alert('Server Error');
            break;
        case 12029:
        case 12030:
        case 12031:
            alert('dropped connections (either web server or DB server)');
            break;
        case 12152:
            alert('Connection closed by server');
            break;
        case 13030:
            alert('StatusText properties are unavailable, and a query attempt throws an exception');
            break;
    }
}

// for sync call , for left side sub menu items 
function FetchInfo(qid, qstr, params)
{
    var tloc = gSvcUrl + qstr;
    var param = (params == null) ? null : JSON.stringify(params);
    var result;
    $("#iframeloading").show();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: tloc,
        data: param,
        dataType: "json",
        async: false,
        success: function (data, textStatus, request)
        {
            $("#iframeloading").hide();
            gResponseLength = request.responseText.length;
            result = data;
            if (data.response_code == "1")
            {
                DisplayMessage(data.message);
                return;
            }
            if (data.response_type == 0)
            {
                var qid_details = new Object();
                gQid = new Object(); // qid should be created for parent object , childs would be added to this object  
                qid_details["data"] = data.gpdata1;

                gQid[qid] = qid_details;
            }
            ProcessLookup(data);

        },
        error: function (xhr, textStatus)
        {
            ProcessErrorInfo(xhr);
            result = null;
        }
    });
    return result;
}

// for custom call by custom function 
function ajaxCall(URL, data, Type, successCaller, failureCaller)
{
    $("#iframeloading").show();
    var tloc = gSvcUrl + URL;
    var callparam = {
        url: tloc,
        type: Type,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: function (data, textStatus)
        {
            $("#iframeloading").hide();
        },
        success: function (data, textStatus, request)
        {
            $("#iframeloading").hide();
        }
    };
    if (data)
        callparam.data = JSON.stringify(data);

    var request = $.ajax(callparam);
    successCaller = getFunction(successCaller);
    if (successCaller)
        request.done(successCaller);

    failureCaller = getFunction(failureCaller);

    if (failureCaller)
        request.fail(failureCaller);
}

// for sync call , for left side sub menu items 
function CallServerMethod(params,qstr)
{
    var ReturnResult;
    var tloc = gSvcUrl;
    if (qstr != null) {
        tloc += qstr;
    } 
    var clientStartTime = new Date();
    $("#iframeloading").show();

    $.ajax({
        url: tloc,
        cache: false,
        async: false,
        data: params,
        success: function (result, textStatus)
        {
            try
            {
                if (result.response_code != "1")
                    ReturnResult = result;
                else
                {
                    DisplayMessage(result.message);
                }

            } catch (e)
            {
                DisplayMessage("Error In function CallServerMethod", true)
            }
            $("#iframeloading").hide();
        },
        error: function (data, textStatus)
        {
            $("#iframeloading").hide();

        }
    });
    return JSON.parse(ReturnResult);
}

function getFunction(callerFun)
{
    if (callerFun)
    {
        if (jQuery.type(callerFun) == "function")
            return callerFun;
        else if (jQuery.type(callerFun) == "string" && jQuery.type(window[callerFun]) == "function")
            return window[callerFun];
    }
    return null;
}




function ajaxFail()
{
    var saved_customerCall = localStorage.getItem("customerCall");

    if (saved_customerCall == null)
        saved_customerCall = new Array();
    else
        saved_customerCall = JSON.parse(saved_customerCall);

    var callInfo = new Object();
    callInfo["url"] = URL;
    callInfo["data"] = data;
    //callInfo["successFunction"] = successCaller;
    callInfo["callType"] = callType;

    saved_customerCall.push(JSON.stringify(callInfo));

    localStorage.setItem("customerCall", JSON.stringify(saved_customerCall));
}

function CustomExportExcel(qid)
{

    var fqheader = Headers[qid];
    var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec");
    var todayDate = new Date();
    var htmlToJoin = "";
    var fqheader = Headers[qid];
    var sHeaders = '';
    var nCount = 0;
    for (var i = 0; i < fqheader.cols.length; i++)
    {
        if (fqheader.cols[i].hide == "0" || fqheader.cols[i].hide == 'undefined' || fqheader.cols[i].hide == undefined || fqheader.cols[i].hide == '')
        {
            sHeaders = sHeaders + i + ',';
            nCount = nCount + 1;
        }
    }
    htmlToJoin = "<table><thead><tr align='left'><th align='left'>Created By : " + loginData.loginInfo.EmpName + "</th></tr></thead></table><table><thead><tr align='left'><th align='left'>Date : " + todayDate.getDate() + "-" + m_names[todayDate.getMonth()] + "-" + todayDate.getFullYear() + "</th><th colspan='" + nCount + "'>" + LangHeaders[qid].caption + "</th></tr></thead></table><table><tr><td/></tr></table>";
    var sHTML = CreateHTMLforExcel(qid)// $(".dataTables_scrollBody").html();

    //======================================================
    $("#header_das").append("<div id='mycustomexport' style='display:none;'>" + sHTML + "</div>");
    $("#mycustomexport").find("table").attr("border", "1");
    $("#mycustomexport tr").each(function ()
    {
        if ($(this).height() == 0)
        {
            $(this).height("20");
        }
    });
    $("#mycustomexport tr th").each(function ()
    {
        if ($(this).height() == 0)
        {
            $(this).height("20");
        }
    });
    sHTML = $("#mycustomexport").html();
    $("#mycustomexport").remove();
    //======================================================
    var dataToSend = JSON.stringify(htmlToJoin + escape(sHTML));
    $.ajax({
        url: gSvcUrl.replace('/service.aspx', '/CustomExcelExport.aspx') + "?data_src=grid_post",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        data: dataToSend, // pass that text to the server as a correct JSON String
        success: function (msg)
        {
            var win = window.open(gSvcUrl.replace('/service.aspx', '/CustomExcelExport.aspx') + "?data_src=post_data&title=" + LangHeaders[qid].caption, '_self');
        }
    });
    
}
function CreateHTMLforExcel(qid)
{
    var fqheader = Headers[qid];
    var columnToshow = 0;
    if (fqheader.grid_attrib && fqheader.grid_attrib.data_fld_cnt)
        columnToshow = fqheader.grid_attrib.data_fld_cnt;

    var sHeaders = "";
    var LoockupCols = "";
    //var html = "<table class='display dataTable no-footer' id='ptable' role='grid' aria-describedby='ptable_info' style='left: 0px; top: 0px; width: 1108px; position: absolute;' border='1' cellspacing='0' cellpadding='0'>";
    var html = "<table style='left: 0px; top: 0px; width: 1108px; position: absolute;' border='1' cellspacing='0' cellpadding='0'>";
    for (var i = 0; i < fqheader.cols.length; i++) {
        if (fqheader.cols[i].hide == "0" || fqheader.cols[i].hide == '10' || fqheader.cols[i].hide == undefined || fqheader.cols[i].hide == NaN || fqheader.cols[i].hide == "undefined" || fqheader.cols[i].hide == null) {
            if (!(fqheader.cols[i].frm_options && fqheader.cols[i].frm_options.isExptoExl && fqheader.cols[i].frm_options.isExptoExl == "false"))
                sHeaders += parseInt(i) + (i!=(fqheader.cols.length)-1? ',':'');
        }
    } 
    
    var colArray = sHeaders.split(',');
    var sselectCols = LoockupCols.split(',');
    if (columnToshow == 0)
        columnToshow = colArray.length;

    //html += "<thead><tr role='row' style='height: 0px;'><th class='sorting_disabled' style='width: 67px; height: 0px; padding-top: 0px; padding-bottom: 0px; border-top-width: 0px; border-bottom-width: 0px; text-align:center'  rowspan='1' colspan='1'><div class='dataTables_sizing' style='height: 0px; overflow: hidden;'>SrNo.</div></th>";
    html += "<thead><tr><th style='text-align:center'>SrNo.</th>";
    for (var i = 0; i < columnToshow ; i++)
    {
        if (LangHeaders[qid].colnames[parseInt(colArray[i])] != undefined)
            html += "<th style='text-align:center'>" + LangHeaders[qid].colnames[parseInt(colArray[i])] + "</th>";
    }
    html += "</tr></thead><tbody>";

    for (var j = 0; j < gQid[qid].data.length; j++) {
        html += "<tr class='odd' role='row'><td align='center'><p align='center'>" + (j + 1) + "</p></td>";
        for (var i = 0; i < columnToshow; i++) {

            /* when column is sselect or radio */
            if (gQid[qid].data[j][parseInt(colArray[i]) + 1] != undefined && fqheader.cols[parseInt(colArray[i])].etype && fqheader.cols[parseInt(colArray[i])].eopt && (fqheader.cols[parseInt(colArray[i])].etype == "sselect" || fqheader.cols[parseInt(colArray[i])].etype == "radio")) {
                var values = $.trim(gQid[qid].data[j][parseInt(colArray[i]) + 1]).split(','); //-- if column have comma saperated vlaues
                var columnValues = '';
                /* bind lookup with each comma saperated value --Ex:multi depot with its name */
                for (var k = 0; k < values.length ; k++)
                {
                    if (gLookup[fqheader.cols[parseInt(colArray[i])].eopt][values[k]] != undefined)
                        columnValues +=(columnValues != '' ? ',':'')+ gLookup[fqheader.cols[parseInt(colArray[i])].eopt][values[k]];
                }

                html += "<td>" + columnValues + "</td>";
            }
                /* only sued to return custome value of perticular column witch have customVal  --ex: status of Device master */
            else if (gQid[qid].data[j][parseInt(colArray[i]) + 1] != undefined && fqheader.cols[parseInt(colArray[i])].frm_options && fqheader.cols[parseInt(colArray[i])].frm_options.customVal) {
                html += "<td>" + ReturnStatus(gQid[qid].data[j][parseInt(colArray[i]) + 1]) + "</td>";
            }
                /* when column is link and need to show modified value of column -- ex: only name part of upload file (and removing prefix) */
            else if (gQid[qid].data[j][parseInt(colArray[i]) + 1] != undefined && fqheader.cols[parseInt(colArray[i])].frm_options && fqheader.cols[parseInt(colArray[i])].frm_options.custom == "DownloadImg") {
                var filename = gQid[qid].data[j][parseInt(colArray[i]) + 1];
                html += "<td>" + filename.substring(filename.indexOf("__") + 2, filename.length) + "</td>";
            }
                /* else this will execute */
            else if (gQid[qid].data[j][parseInt(colArray[i]) + 1] != undefined)
                html += "<td>" + $.trim(gQid[qid].data[j][parseInt(colArray[i]) + 1]) + "</td>";
        }
        html += "</tr>";
    }
    
    return html + "</tbody></table>";
}