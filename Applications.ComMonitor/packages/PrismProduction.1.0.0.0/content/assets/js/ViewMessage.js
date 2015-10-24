function UserRightsSetting() {
    setVerticalRightsToUser();
    setRegionRightsToUser();
}

function setVerticalRightsToUser() {
    //var UserVertical = loginData.loginInfo["VerticalCode"].split(",");
    //$("form[qid=47] #myform_5 option").each(function (i) {
    //    if ($.inArray($(this).val(), UserVertical) == -1) {
    //        $(this).remove();
    //    }
    //});
    //$('#myform_5').multiselect('rebuild');
}


function setRegionRightsToUser() {
    //var UserRegion = loginData.loginInfo["RegionCode"].split(",");
    //$("form[qid=47] #myform_6 option").each(function (i) {
    //    if ($.inArray($(this).val(), UserRegion) == -1) {
    //        $(this).remove();
    //    }
    //});
    //$('#myform_6').multiselect('rebuild');
}


function SetLocalStorageForViewdMessage() {
   // localStorage.setItem("ViewMessageCount", loginData.ViewMessage[0].InformationBroadcastId);
}

var id_arr = [];

function ViewMessageUI(qid, data_src) {
    
    $("#" + qid).siblings().removeClass("selected-menu");

    if (data_src == null)
    {
        if (Headers[qid].grid_attrib != null && Headers[qid].grid_attrib.custom_menu_item_click != null)
        {
            eval(Headers[qid].grid_attrib.custom_menu_item_click);
            return;
        }
        /*@rizwan commented the code to remove the sync call*/
        /*var result = FetchInfo(qid, GetLookupOfCurrentScreen(qid));
        data_src = result.gpdata1;*/
        /*@rizwan end comment*/

        getData(qid, GetLookupOfCurrentScreen(qid));
        return;
    }
    RenderMessageUI(qid, data_src);
}

function RenderMessageUI(qid,data_src)
{
    var toolbar = "<div class='toolbar' id='toolbar'><button title='Search' class='toolbar_btns' onclick='PerformSearch(" + qid + ")'><div class='SearchButton'/></div>";

    Headers[qid].render_div = "div_par";

    var window_height = $(window).height() - 100;
    var item = "<div style='height:" + window_height + "px;overflow:scroll;display:inline-block;width:100%'>";
    if (data_src != null && data_src.length > 0)
    {
        item += toolbar;
        item += "<table border = 1  class='msg-tbl'>";

        for (var i = 0; i < data_src.length; i++)
        {
            var classofMessage = "ReadMessages";
            var ClassForunread = "";
            var FontForUnreadMessage = "";

            if (data_src[i][4].indexOf(loginData.loginInfo["EmpCode"]) == -1)
            {
                classofMessage = "UnReadMessages";
                FontForUnreadMessage = "BoldUnreadMessage";
                ClassForunread = "FontForUnreadMessage";
            }

            //if (JSON.parse(localStorage.getItem("viewMessages")) != null)
            //{
            //    var viewmsg = JSON.parse(localStorage.getItem("viewMessages"));
            //    viewmsg = viewmsg.toString();
            //    var id = data_src[i][1];
            //    if (viewmsg.indexOf(id) == -1)
            //    {
            //        classofMessage = "UnReadMessages";
            //        FontForUnreadMessage = "BoldUnreadMessage";
            //        ClassForunread = "FontForUnreadMessage";
            //    }
            //}
            item += "<tr>";
            item += "<td id='ReadUnreadMessage" + i + "' class=" + classofMessage + " onclick='ViewMessageDialog(this,\"" + i + "\",\"" + qid + "\")'> </td> <td class=" + ClassForunread + "><table class=" + FontForUnreadMessage + "> ";
            item += "<tr><td></td><td></td><td></td></tr>";
            item += "<tr><td><span ><strong>Date</strong> </span></td><td> : </td><td><span>" + data_src[i][6] + "</span></td></tr>";
            if (qid != 37)
            {

                item += "<tr><td><span ><strong>From</strong> </span></td><td> : </td><td><span>" + gLookup["empall"][data_src[i][2]] + "</span></td></tr>"; //data_src[i][2]-- Modified By Aadilkhan
            }
            else
            {
                /* start Aadilkhan */
                if (data_src[i][3] == '1')
                {
                    var Emps = data_src[i][2].split(',');
                    data_src[i][2] = '';
                    for (var j = 0; j < Emps.length; j++)
                    {
                        data_src[i][2] += (j == 0 ? '' : ',') + gLookup["empall"][Emps[j]];
                    }
                }
                /* end */

                item += "<tr><td><span ><strong>To</strong> </span></td><td> : </td><td><span>" + data_src[i][2] + "</span></td></tr>";
            }
            item += "<tr><td><span ><strong>Subject </strong> </span> </td><td> : </td><td><span> " + data_src[i][5] + "</span></td></tr>";
            var idxpath = data_src[i][10].indexOf('/');
            //item += "<tr><td><span ><strong>Attachment </strong> </span></td><td> : </td><td> <a target='_blank'  onclick='fileDownload(event,\"" + data_src[i][10] + "\")' > " + data_src[i][10] + "</a> </td></span></tr>";
            item += "<tr><td><span ><strong>Attachment </strong> </span></td><td> : </td><td> <a target='_blank'  onclick='fileDownload(event,\"" + data_src[i][10] + "\")' > " + (data_src[i][10].indexOf("__") != -1 ? data_src[i][10].substring(data_src[i][10].indexOf("__")+2) : data_src[i][10]) + "</a> </td></span></tr>";
            item += "<tr><td><span ><strong>Message Text</strong></span> </td><td> : </td><td><span  class='messageDescriptionText' style='width:300px'> " + data_src[i][7] + "</span></td></tr>";
            item += "<tr><td colspan=3></td></tr>";
            //   item.push("Download/Open File : <a style='float:none;display: inline;cursor:pointer;text-decoration: underline;' onclick='fileDownload(event,\"" + rows[i]["Download/Open File"] + "\")'>" + rows[i]["Download/Open File"] + "</a></span></li>");
            //  if(id_arr.indexOf(data_src[i][1])==-1)
            //  {
            id_arr.push(data_src[i][1]);
            //  }

            item += "</table></td>";
        }
        item += "</table></div>";


        //localStorage.setItem('viewMessages', JSON.stringify(id_arr), { expires: 10 });
        //$("#unreadNotesCnt").text(TotalUnreadMessages);

    }
    else
        item = "<ul style='font-size: 15px' class='left_link'><li>No Messages</li></ul>";

    $("#div_par").html(item);
    //$("#div_par").css("overflow", "auto");
}

/* --start Aadilkhan */
function ViewMessageDialog(data,RowNumber,qid)
{
    //var d_width = $(window).width() / 2;
    //var d_height = ($(window).height() / 2) - 150;
    //var d_height = 600;
    html = "";

    html += "<div><table width='100%'>";
    html += "<tr width='100%' ><td width='20%'><strong> Date </strong></td><td>:&nbsp;</td><td width='80%'>" + gQid[qid].data[RowNumber][6] + "</td></tr>";
    if (qid == '37')
        html += "<tr><td><strong> To </strong></td><td>:&nbsp;</td><td> " + [gQid[qid].data[RowNumber][2]] + " </td></tr>";
    else
        html += "<tr><td><strong> From </strong></td><td>:&nbsp;</td><td> " + gLookup["empall"][gQid[qid].data[RowNumber][2]] + " </td></tr>";
    html += "<tr><td><strong> Subject </strong></td><td>:&nbsp;</td><td> " + gQid[qid].data[RowNumber][5] + " </td></tr>";
    html += "<tr ><td ><strong> Attachment </strong></td><td>:&nbsp;</td><td> <a href='#' onclick='UpdateReadMessage(" + gQid[qid].data[RowNumber][1] + "," + qid + "," + RowNumber + "," + 1 + ")'> " + (gQid[qid].data[RowNumber][10].indexOf("__") != -1 ? gQid[qid].data[RowNumber][10].substring(gQid[qid].data[RowNumber][10].indexOf("__")+2) : gQid[qid].data[RowNumber][10]) + " </a> </td></tr>";
    html += "<tr><td style='vertical-align: top'><strong> Message Text </strong></td><td style='vertical-align: top'>:&nbsp;</td><td> " + gQid[qid].data[RowNumber][7] + " </td></tr>";
    html += "</table></div>";

    ShowDialog("custDetail1", html, "UpdateReadMessage(" + gQid[qid].data[RowNumber][1] + "," + qid + "," + RowNumber + ")", null, null, null, "Messsage Details", null, null, null, null, true);

    //$("#custDetail1").removeClass("height250");
    $("#custDetail1").removeClass("height250").addClass("height250");

    $(".close").click(function () { if (qid == "126") UpdateReadMessage(gQid[qid].data[RowNumber][1], qid, RowNumber); });
}
function UpdateReadMessage(MessageId, qid, RowNumber,forfile)
{

    if (forfile != undefined || forfile != null)
        fileDownload(event, gQid[qid].data[RowNumber][10]);

    var qstr = "?qid=" + qid + "&cmd=Prism_UpdateReadMessage&MessageId=" + MessageId + "&RowNumber=" + RowNumber + "";
    ajaxCall(qstr, null, "get", successUpdateReadMessage);

    //var params = new Object();
    //params["cmd"] = "Prism_UpdateReadMessage";
    //params["qid"] = qid;
    //params["MessageId"] = MessageId;
    //var response = CallServerMethod(params);
    

}
/* -- End */

function successUpdateReadMessage(response) {
    if (response.response_code == "0") {
        if (response.gpdata1 == true) {
            if (response.gpdata2 != '37')
                TotalUnreadMessages = TotalUnreadMessages - 1;
            $("#ReadUnreadMessage" + response.gpdata3).closest('td').next('td').removeClass("BoldUnreadMessage");
            $("#ReadUnreadMessage" + response.gpdata3).closest('td').next('td').removeClass("FontForUnreadMessage");
            $("#ReadUnreadMessage" + response.gpdata3).removeClass("UnReadMessages").addClass("ReadMessages");
        }
        $('#custDetail1').modal('hide');
    } else
        DisplayMessage(response.message);
}

function fileDownload(event, fname)
{
    //var height = 650;
    //var width = 1200;
    var filename = "";
    uploadpath = gSvcUrl.replace('/service.aspx', '') + "/assets/FileUpload/";

    //    Extension = ".xls";
    if (fname)
        filename = fname;
   
    if (filename == "")
    {
        DisplayMessage("File is not available....");
        return false;
    }
    try
    {
        if (UrlExists(uploadpath + filename))
        {
            if (isPhoneGap())
            {
                downloadFile("assets/FileUpload/" + filename, filename.replace(/ +/g, ""), false);
            }
            else
            {
                Popup = popupCenter(uploadpath + filename, "Popup", 300, 300);

                //window.open(uploadpath + filename, "Popup", 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=' + width + ',height=' + height + ',left = 30,top = 20');
                Popup.focus();
            }
        }
        else
        {
            //uploadpath = gSvcUrl.replace('/service.aspx', '') + "/assets/FileUpload/";
            //if ((UrlExists(uploadpath + fname)))
            //{
            //    if (isPhoneGap())
            //    {
            //        downloadFile("assets/FileUpload/" + fname, fname.replace(/ +/g, ""), false);
            //    }
            //    else
            //    {
            //        Popup = window.open(uploadpath + filename, "Popup", 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=' + width + ',height=' + height + ',left = 30,top = 20');

            //        Popup = popupCenter(uploadpath + fname, "Popup", 600, 400);

            //        Popup.focus();
            //    }
            //}
            //else
            //{
                DisplayMessage("File does not exist");
            //}
        }
    }
    catch (err)
    {
        DisplayMessage("error in opening file,file path is " + uploadpath + filename, true)
    }
}

function popupCenter(url, title, w, h)
{
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
}

function UrlExists(url)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    try
    {
        http.send();
    } catch (e)
    {

    }
    
    if (http.status != 404)
        return true;
    else
        return false;
}

function downloadFile(myfile, tofile, Isdelete, versionNumber) {
    if (isPhoneGap()) {
        window.requestFileSystem(
            LocalFileSystem.PERSISTENT, 0,
            function onFileSystemSuccess(fileSystem) {
                fileSystem.root.getFile(
                    "dummy.html", { create: true, exclusive: false },
                    function gotFileEntry(fileEntry) {
                        var sPath = fileEntry.toURL().replace("dummy.html", "");
                        webPath = fileEntry.toURL().replace("dummy.html", "");
                        var fileTransfer = new FileTransfer();
                        fileEntry.remove();
                        fileTransfer.download(

                                //@sanjay---setting up URL
                                loc.replace('/service.aspx', '/') + escape(myfile),
                                sPath + "/prism/" + tofile,
                                function (theFile) {
                                    openFile("prism/" + tofile);

                                    //@sanjay---making delete call for APK only to delete temperory file created
                                    //if (Isdelete)
                                    //    deletefileFromServer(myfile);
                                },
                                function (error) {
                                    DisplayMessage("Download error source " + error.source);
                                }
                        );
                    },
                    fail);
            },
            fail);
    }
}
function openFile(fileLocation) {
    cordova.exec(
        successCallback, // success callback function
        errorCallback, // error callback function
        'IntentChooserPlugin', // mapped to our native Java class called "CalendarPlugin"
        'openPDFReader', // with this action name
        [{                  // and this array of custom arguments to create our entry
            "path": fileLocation,
        }]
    );
}