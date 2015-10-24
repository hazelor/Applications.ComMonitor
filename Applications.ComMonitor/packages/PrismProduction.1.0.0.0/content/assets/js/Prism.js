var loginTemplate = '<div  class="logo-1"><img src="assets/images/MPower-Logo.png" alt="M-Power Logo" class="logo-login"/></div>\
 <div class="login_box">\
 <div class="detail_box">\
  <div class="login_title">\
              	<img src="assets/images/logo.png" alt="Prism Logo"/>\
              </div>\
  <input class="textbox" type="text"  id="txtUser" onkeypress="return lettersOnly(event)" placeholder="Enter Username" />\
<input class="textbox" type="password"  id="txtPass" placeholder="Enter Password" />\
 <br class="clear">\
     <div class="checkbox_custom">\
                                            <label>\
                                                <input type="checkbox"  id="RememberMe">Remember me\
                                            </label>\
                                        </div>\
 <input type="button" class="signin" value="LOGIN" id="btnLogin" onclick="Login()"/>\
<div class="marcenter wd90">\
                  <a href="#" class="forgotlink redfont" onclick="ForgotPassword()">\
                    Forgot Password?\
                  </a>\
    			  <span class="forgotlink">|</span>\
                  <a href="#" class="forgotlink" onclick="ChangePassword()">\
                    Change Password?\
                  </a>\
              </div><div class="error_msg" style="display:none"><div>\
            	<img src="assets/images/error.png" alt="error"/><span></span></div>\
            </div>\
</div>\
</div>';

var GPS_Not_Found_Message = "GPS cannot be captured in the Customer Shop,Request you to please move to open space and try again! if still not available you can continue your visit !";

var curr_menu_item = null;
var IsDayStarted = false;
var IsDayEnded = false;
var StartDayTime = new Date();
var CurrVisitedCustID = null;
var curcustomerInfo = null;
var CustomerVisitStartTime;
var gtRoleId;
var cur_lat = 0, cur_lon = 0, cur_accuracy = 0;
var timeoutTime = 20000;
//// check for the running on phonegap or the browser
function isPhoneGap()
{
    if (navigator.onLine)
    {
        $("#dvOnlineStatus").removeClass("imgOnlineStatusoffline");
        $("#dvOnlineStatus").addClass("imgOnlineStatusOnline");
        if (localStorage.getItem("customerCall") != null)
        {
            UploadLocalData(false);
        }
    }
    else
    {
        $("#dvOnlineStatus").removeClass("imgOnlineStatusOnline");
        $("#dvOnlineStatus").addClass("imgOnlineStatusoffline");
    }

    return /^file:\/{3}[^\/]/i.test(window.location.href)
    && /ios|iphone|ipod|ipad|android/i.test(navigator.userAgent);
}


var qry_opt = {
    "188": {              // Stock Dashboard
        "type": "chart",  // tree view  or grid view 
        "key_flds": 4,
        "data_flds": [5, 6],
        "legend_flds": { 2: 7 },
        "sum_func": "sum",
        "types": ["Bar", "Bar", "Bar", "Bar"],
        "names": ["Zone", "Region", "Depot", "Storage Location"],
        "rows": [[6, 6], [6, 6]]

    },
    "195":{               // MTD Dashboard
        "type": "chart",  // tree view  or grid view 
        "key_flds": 1,
        "data_flds": [2, 3],
        "sum_func": "sum",
        "types": ["Bar"], "names": ["Month To Date "], "rows": [[12]]

    },
    "189": {              // Wholesale v/s Retail Price
        "type": "chart",  // tree view  or grid view 
        "key_flds": 4,
        "data_flds": [5, 6],
        "sum_func": "sum",
        "types": ["Bar", "Bar", "Bar", "Bar"], "names": ["Zone", "Region", "Depot", "Dealer"], "rows": [[6, 6], [6, 6]]

    },
    "84": {               // Sales Dashboard
        "type": "chart",  // tree view  or grid view 
        "key_flds": 5,
        "data_flds": [6],
        "legend_flds": { 3: 7, 4: 8 },
        "sum_func": "sum",
        "types": ["Pie", "Bar", "Bar", "Bar", "Bar"],
        "scale": "None",
        "names": ["SaleType", "Zone", "Region", "Depot", "Dealer"],
        "rows": [[4, 4, 4], [6, 6]],
        "order": [0, 0, 0, 0, -1],
        "limit": [0, 0, 0, 0, 0]
    },
    "132": {              // Sales Comparision Dashboard
        "type": "chart",  // tree view  or grid view 
        "key_flds": 4,
        "data_flds": [5, 6],
        "legend_flds": { 2: 7, 3: 8 },
        "sum_func": "sum",
        "types": ["Bar", "Bar", "Bar", "Bar"],
        "scale": "None",
        "names": ["Zone", "Region", "Depot", "Dealer"],
        "rows": [[6, 6], [6, 6]],
        "order": [0, 0, 0, -1]
    },

    "111": {              // Collection Dashboard
        "type": "chart",  // tree view  or grid view 
        "key_flds": 4,
        "data_flds": [5],
        "legend_flds": { 2: 6, 3: 7 },
        "sum_func": "sum",
        "types": ["Bar", "Bar", "Bar", "Bar"],
        "limit": [0, 0, 0, 0],
        "scale": "Lakhs",
        "value_text": "Collection", "scale": "Lakhs",
        "names": ["Zone", "Region", "Depot", "Dealer"],
        "rows": [[6, 6], [6, 6]],
        "order": [0, 0, 0,-1]

    },
    "131":                    // Collection Comparision Dashboard
        {
            "type": "chart",  // tree view  or grid view 
            "key_flds": 4,
            "data_flds": [5, 6],
            "sum_func": "sum",
            "types": ["Bar", "Bar", "Bar", "Bar"],
            "limit": [0, 0, 0, 0],
            "scale": "Lakhs",
            "names": ["Zone", "Region", "Depot", "Dealer"],
            "rows": [[6, 6], [6, 6]],
            "order": [0, 0, 0, -1]

        },
    "133": {              // Collection Tgt Vs Act Dashboard
        "type": "chart",  // tree view  or grid view 
        "key_flds": 4,
        "data_flds": [5, 6],
        "sum_func": "sum",
        "scale": "Lakhs",
        "types": ["Bar", "Bar", "Bar", "Bar"],
        "names": ["Zone", "Region", "Depot", "Dealer"],
        "rows": [[6, 6], [6, 6]]

    },
    "134": {              // Sales Tgt Vs Act Dashboard
        "type": "chart",  // tree view  or grid view 
        "key_flds": 4,
        "data_flds": [5, 6],
        "legend_flds": { 2: 7, 3: 8 },
        "sum_func": "sum",
        "types": ["Bar", "Bar", "Bar", "Bar"],
        "scale": "None",
        "names": ["Zone", "Region", "Depot", "Dealer"],
        "rows": [[6, 6], [6, 6]]
    },
    "165":                 // DailyData - Dashbaord
        {
            "type": "chart",  // tree view  or grid view 
            "key_flds": 1,
            "data_flds": [2, 3],
            "sum_func": "sum",
            "types": ["Bar"], "names": ["Daily Values"], "rows": [[12]]

        },

    /* Start---Aadilkhan   */
    "1214": {
        "type": "chart",  // tree view  or grid view 
        "key_flds": 3,
        "data_flds": [4, 5],
        "sum_func": "sum",
        "types": ["Bar", "Bar", "Bar"],
        "scale": "Thousands",
        "names": ["Zone", "Region", "Depot"],
        "rows": [[6, 6], [6]]
    },
    "1217": {
        "type": "chart",  // tree view  or grid view 
        "key_flds": 4,
        "data_flds": [5, 6],
        "sum_func": "sum",
        "types": ["Bar", "Bar", "Bar", "Bar"], "scale": "Thousands", "names": ["Zone", "Region", "Depot", "Dealer"], "rows": [[6, 6], [6, 6]]
    }
    /* End */
};


/*
84	Get Sales Dashboard
111	Get Collection Dashboard
131	Get Collection Comparision Dashboard
132 Get Sales Comparision Dashboard
133	Get Collection Tgt Vs Act Dashboard
134	Get Sales Tgt Vs Act Dashboard
165	GetDailyData */

function initURLLocationtoCall()
{
    if (isPhoneGap() && !window.cordova)
    {
        ///Initialize from the phonegap
        document.addEventListener("deviceready", startDocumentExecution, false);
        $.getScript("cordova.js", function (script, textStatus)
        {
        })
        .fail(function (jqxhr, settings, exception)
        {
            alert('Cordova script load error');
        });
        //gSvcUrl = "https://automobi.exideindustries.com/Exide_dev/app_srvc.aspx";
        gSvcUrl = "http://10.37.54.158/PrismProduction/service.aspx";
        //gSvcUrl = "http://10.37.54.107/PrismProduction/service.aspx";

    }
    else
    { /// Intitalize using windows location
        var pathname = window.location.pathname;
        if (window.location.pathname.toLowerCase().indexOf(".html") != -1)
        {
            pathname = pathname.substring(0, window.location.pathname.lastIndexOf("/"));
        }
        gSvcUrl = window.location.protocol + "//" + window.location.host + pathname + "/service.aspx";
        startDocumentExecution();
    }
}
function startDocumentExecution()
{
    var existing_cookie;

    var page_name = window.location.pathname;
    if (page_name.toLowerCase().indexOf("prismadmin") >= 0)
        existing_cookie = getCookieValue("AdminSessionID");
    else if (page_name.toLowerCase().indexOf("prismdealer") >= 0)
        existing_cookie = getCookieValue("DealerSessionID");
    else if (page_name.toLowerCase().indexOf("prismmdm") >= 0)
        existing_cookie = getCookieValue("MDMSessionID");
    else
        existing_cookie = getCookieValue("UserSessionID");

    if (existing_cookie == false)
    {
        DisplayLoginPage();
        return;
    }
    Login(sessionStorage.getItem("uName"), sessionStorage.getItem("pWd"));
}

function DisplayLoginPage()
{
    $("#iframeloading").hide();
    $("#header_das").hide();
    $(".header_toggle").css("display", "none");
    $('body').removeClass('skin-blue');
    $('body').removeAttr("style");
    $('body').addClass('wrapper_login');
    $('body').css({ 'background-image': 'url("assets/images/prism_login_background.png")' });
    $("#LoginDiv").html(loginTemplate);
    $("#LoginDiv").css("display", "block");
    $("#pmenu").css("display", "none");
    $("#tpar").css("display", "none");
    LoginSubmitHandler();
    if (localStorage.getItem(window.location.pathname.toLowerCase() + "-Prism-remember") == "true")
    {
        var cval = localStorage.getItem(window.location.pathname.toLowerCase() + "-Prism-UserName"); //localStorage.getItem("Prism-UserName");
        $("#txtUser").val(cval);
        cval = localStorage.getItem(window.location.pathname.toLowerCase() + "-Prism-password"); //localStorage.getItem("Prism-password");
        $("#txtPass").val(cval);
        $("#RememberMe").attr("checked", "checked");
    }
    $("#fsoActionBtnDiv").css("display", "none");

    if (isPhoneGap() && isNetworkAvailable())
    {
        $.ajaxSetup({
            beforeSend: function (xhr, settings)
            {
                var session_id = localStorage.getItem("UserSessionID");
                if (session_id != false)
                {
                    settings.url += (settings.url.indexOf("?") >= 0) ? "&UserSessionID=" + session_id + "" : "?UserSessionID=" + session_id + "";
                }
            }
        });
    }
}

function Login(uname, pwd)
{
    //@sanjay----every 3 minute this will be fired, for checking internet conncetion and uploading data
    myTimeInterval = setInterval(function ()
    {
        //@sanjay---Everty 3 minute System will check for Online Data to be moved on Server
        checkForNetworkAndCall();
    }, 180000);

    //@sanjay---disabling synch button icon
    if (localStorage.getItem("customerCall") == null)
    {
        $("#sync").attr('disabled', true);
        $("#sync").addClass('disableImg');
    }

    //@sanjay---Sync Button Click Event
    $("#sync").click(function ()
    {
        if (localStorage.getItem("customerCall") != null)
        {
            if ((isPhoneGap() && isNetworkAvailable()) || navigator.onLine)
                UploadLocalData(true);
            else
                DisplayMessage(error_response_type["gp2039"]);
        }
    });

    if ((isPhoneGap() && isNetworkAvailable()) || navigator.onLine)
    {

        $("#iframeloading").show();
        checkForNetworkAndCall();
        var params = new Object();
        var uName = $("#txtUser").val();
        var pWd = $("#txtPass").val();

        /////       spratik  //////////

        if (uname == null && pwd == null && (uName == "" || pWd == ""))
        {
            if (uName == null || uName == "")
            {
                DisplayMessage(error_response_type["gp2026"]);
                $("#iframeloading").hide();
                return;
            }
            else if (pWd == null || pWd == "")
            {
                DisplayMessage(error_response_type["gp2027"]);
                $("#iframeloading").hide();
                return;
            }
        }

        /////       epratik  //////////

        if (uname != null)
            uName = uname;

        if (pwd != null)
            pWd = pwd;

        params["UserName"] = uName;
        params["password"] = pWd;

        if ($("#RememberMe").length > 0)
        {
            if ($("#RememberMe").prop("checked") == true && uName != null && pWd != null)
            {
                for (var key in params)
                {
                    localStorage.setItem(window.location.pathname.toLowerCase() + "-Prism-" + key, params[key]);
                }
                localStorage.setItem(window.location.pathname.toLowerCase() + "-Prism-remember", true);
            }
            else
            {
                for (var key in params)
                {
                    localStorage.removeItem(window.location.pathname.toLowerCase() + "-Prism-" + key, params[key]);
                }
                localStorage.removeItem(window.location.pathname.toLowerCase() + "-Prism-remember", true);
            }
        }
        var qrystr = "?cmd=login";
        getData(50, qrystr, params);
    }
    else
    {
        $(".header_toggle").css("display", "block");
        loginData = JSON.parse(localStorage.getItem('UserData'));
        $("#iframeloading").hide();
        ProcessFSOMenu(loginData.menu_obj, loginData.loginInfo)
    }
}

function RenderToolbar(qid)
{
    var fqheader = Headers[qid];
    var htm = "";
    var insert = false;
    var del = false;
    var export_to_excel = true;
    var refresh = true;
    var help_block = false;
    if (fqheader.hasOwnProperty("dmlop"))
    {
        if (fqheader.dmlop.indexOf("I") >= 0)
            insert = true;
        if (fqheader.dmlop.indexOf("D") >= 0)
            del = true;
    }
    if (fqheader.grid_attrib)
    {
        if (fqheader.grid_attrib.excel_export == false)
            export_to_excel = false;

        if (fqheader.grid_attrib.refresh == false)
            refresh = false;

        if (fqheader.grid_attrib.HelpPath != null && fqheader.grid_attrib.HelpPath.length > 0)
            help_block = true;
    }

    if (insert)
        htm += "<button title='Add Record' cmd='Add' id='addbtn' class='toolbar_btns' onclick=AddRow(" + qid + ",this)> <div class='AddButton' ></div> </button>";

    if (del)
        htm += "<button title='Delete Record' class='toolbar_btns' onclick=DeleteRow(" + qid + ")><div class='DeleteButton' ></div></button>";

    if (fqheader.hasOwnProperty("sfilters"))
        htm += "<button title='Search' class='toolbar_btns' onclick=PerformSearch(" + qid + ")><div class='SearchButton' ></div></button>";

    if (refresh)
        htm += "<button title='Refresh' class='toolbar_btns' onclick=RefreshGrid(" + qid + ")><div class='RefreshButton' ></div></button>";

    //htm += "<button title='ViewChart' class='toolbar_btns' onclick=ViewChart(" + qid + ")><div class='ViewChartButton' ></div></button>";    
    if (export_to_excel)
        htm += "<button title='Export to Excel' class='toolbar_btns' onclick=CustomExportExcel(" + qid + ")><div class='ExportButton' ></div></button>";

    if (help_block)
        htm += "<button title='Help' class='toolbar_btns' onclick=OpenHelpPage(" + qid + ")><div class='HelpButton' ></div></button>";

    return htm;
}

function OpenHelpPage(qid)
{
    var fqheader = Headers[qid];
    var w = 500;
    var h = 400;
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);

    var testwindow = window.open("\assets\\HelpFiles\\" + fqheader.grid_attrib.HelpPath, "mywindow", 'location=no,resizable=1,width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

}

function RefreshGrid(qid)
{
    $("#sform").attr("qid", null);
    if (qid == "0")
        return;
    if (Headers[qid].grid_attrib != null && Headers[qid].grid_attrib.custom_menu_item_click != null)
    {
        eval(Headers[qid].grid_attrib.custom_menu_item_click);
        return;
    }
    getData(qid, GetLookupOfCurrentScreen(qid));
}

function DeleteRow(qid)
{
    var qstr = "?qid=" + qid + "";
    //var chk_box = $("#ptable >tbody .case");
    var fqheader = Headers[qid];
    var render_div = fqheader.render_div;
    var chk_box = $("#" + render_div + " .case");
    if (chk_box.length > 0)
    {
        var del_row_arr = new Array();
        $(chk_box).each(function ()
        {
            if ($(this).is(':checked'))
                del_row_arr.push($(this).attr("rowno"));
        });
        if (del_row_arr.length == 0)
        {
            DisplayMessage(error_response_type["gp2018"],null,null,null,null);
            return;
        }
        else
        {
            var deletingrow = JSON.stringify(del_row_arr);
            ShowDialog("dialog-message2", "Are you sure you want to delete selected records ?", "deleterows('" + deletingrow + "','" + qid + "','" + qstr + "')", null, null, null, "Message", null, null, null, null, true);
        }

    }
}
function deleterows(deletingrow, qid, qstr)
{
    var del_row_arr = JSON.parse(deletingrow);
    var del_id = UpdateQstr(null, qid, true);
    var del_value = GetDeleteRowValues(del_row_arr, del_id, qid);
    qstr += "&cmd=Del&del_id=" + del_id + "&del_value=" + del_value + "";
    var fqheader = Headers[qid];
    fqheader.optype = "Delete";
    if (fqheader.grid_attrib && fqheader.grid_attrib.custom_delete)
    {
        eval(fqheader.grid_attrib.custom_delete)
        return;
    }
    getData(qid, qstr);
}

function GetDeleteRowValues(del_row_arr, del_id, qid)
{
    var del_row_value;
    if (del_row_arr.length > 0)
    {
        del_row_value = new Array();
        for (var i = 0; i < del_row_arr.length; i++)
        {
            cur_row = FillCurRowData(qid, del_row_arr[i]);
            del_row_value.push(cur_row[del_id]);
        }
    }
    return del_row_value.join(',');
}

function AddRow(qid, evt)
{
    var formdiv = "myform";
    if (IsJson(Headers[qid].formgroups))
        Headers[qid].formgroups = $.parseJSON(Headers[qid].formgroups);
    new myForm().drawForm(qid, Headers[qid], formdiv, "Add");
}

function FSOAction(event)
{
    var MenuId = $(event).attr("MenuId")
    if (!MenuId || MenuId.length == 0)
        return;

    if (!((isPhoneGap() && isNetworkAvailable()) || navigator.onLine))
    {
        if (MenuId != "160" && MenuId!="190")
        {
            DisplayMessage(error_response_type["gp2039"]);
            return;
        }
    }
   
    switch (MenuId)
    {
        case "172":/*Plan Route*/
            curr_menu_item = MenuId;
            if ($(".main_row2").find("div[MenuId='172']").hasClass("disableImg"))
                return;
            showNextPage(true);
            ProcessRoutePlan();
            break;
        case "105":/*View Information*/
        case "88":        /*Reports*/
        case "175": /*Market intelligence*/
        case "179": /*Operations*/
        case "171": /*Messages*/
        case "189":/*VTS*/
        case "270": /*MDM*/
        case "93":/* Excel Import*/
        case "70": /* Location Master */
        case "76": /* Masters */
            curr_menu_item = MenuId;
            showNextPage(true);
            RenderPrism();
            showCustomerDetailmenu(MenuId);
            break;
        case "173": /*Approve Plan*/
            curr_menu_item = MenuId;
            if ($(".main_row2").find("div[MenuId='173']").hasClass("disableImg"))
                return;
            //if (loginData.EmpPlanList == null || loginData.EmpPlanList.length == 0)
            //{
            //    DisplayMessage("No Planner Pending to be approved");
            //    return;
            //}
            showNextPage(true);
            ProcessSeniorPlan();
            break;
        case "159":            /*Start Day*/
            curr_menu_item = MenuId;
            ProcessStartDay();
            break;
        case "188": /*End Day*/
            curr_menu_item = MenuId;
            ProcessEndDay();
            break;
        case "160": /*Visits*/
            curr_menu_item = MenuId;
            if ($(".main_row2").find("div[MenuId='160']").hasClass("disableImg"))
                return;
            if (checkIsDayStarted())
                return;
            showNextPage(true);
            ProcessCustomerDataSequence();
            //ManagePlannerDesign();
            break;
        case "190": /*LogOut*/
            curr_menu_item = MenuId;
            LogOut();
            break;
    }
    ManagePlannerDesign();
    $("#main").addClass("wrapper row-offcanvas row-offcanvas-left").css("width", '');
}

function ProcessEndDay()
{
    if ($(".main_row2").find("div[MenuId='188']").hasClass("disableImg"))
        return;

    var CustomerList = SetTodayCustomerList()
    ProcessReplannedCustomers(CustomerList, false)
}

function SetTodayCustomerList()
{
    var TodayVisitPlan;
    var notVisitedCustomer = new Array();
    var RePlannedDealer = loginData.CustomerList;
    var RePlannedRetailer = loginData.RetailerVisit;
    var RePlannedIHBSite = loginData.IHBSiteInfo;
    var RePlannedProject = loginData.ProjectList;
    var RePlannedInfluencerLead = loginData.InfluencerList;
    var RePlannedArea = loginData.AreaInfo;
    var RePlannedGodown = loginData.GodownList;
    for (var i = 0; i < 7; i++)
    {
        TodayVisitPlan = ((i == 0) ? loginData.TodayCSRVisitPlan : ((i == 1) ? loginData.TodayDealerVisitPlan : ((i == 2) ? loginData.TodayInfluencerVisitPlan : ((i == 3) ? loginData.TodayProjectVisitPlan : ((i == 4) ? loginData.TodayAreaVisitPlan : ((i == 5) ? loginData.TodayRetailerVisitPlan : ((i == 6) ? loginData.TodayGodownVisitPlan : null)))))));

        for (var key in TodayVisitPlan)
        {
            notVisitedCustomer.push(TodayVisitPlan[key])
        }
    }
    var CustomerList = new Object();
    CustomerList.notVisitedCustomer = notVisitedCustomer;
    CustomerList.RePlannedDealer = RePlannedDealer;
    CustomerList.RePlannedRetailer = RePlannedRetailer;
    CustomerList.RePlannedIHBSite = RePlannedIHBSite;
    CustomerList.RePlannedProject = RePlannedProject;
    CustomerList.RePlannedInfluencerLead = RePlannedInfluencerLead;
    CustomerList.RePlannedArea = RePlannedArea;
    CustomerList.RePlannedGodown = RePlannedGodown;
    return CustomerList;
}

//function PerformEndDay()
//{
//    var EndDayHtm = '<div class="margin-top-2per"><form class="form-horizontal"> <div> <label class="pull-left text-right lbl_planner_comment">EndDay Comment</label> <textarea cols="50" rows="3" id="EndDayComment" style="font-size: 13px;"></textarea> </div> </form> </div>';

//    var form_html = '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button><h4 id="lblHeader" class="modal-title">Message</h4></div><div class="modal-body"></div><div class="modal-footer"><button class="btn" data-dismiss="modal" aria-hidden="true" onclick=EndDayOK(this)>OK</button></div>';

//    $("#custDetail1").html(form_html);
//    $("#custDetail1 #lblHeader").html("EndDay Comment");
//    $("#custDetail1 .modal-body").html(EndDayHtm);
//    $("#custDetail1").modal('show');
//}

function EndDayOK(evt)
{
    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(storeCurPositionAndEndDay, onGPSNotFoundEndDay, { enableHighAccuracy: true, timeout: timeoutTime });
}

function onGPSNotFoundEndDay()
{
    $("#iframeloading").hide();
    BeginEndDay();
}

function storeCurPositionAndEndDay(position)
{
    $("#iframeloading").hide();
    if (position !== undefined)
    {
        cur_lat = position.coords.latitude;
        cur_lon = position.coords.longitude;
        cur_accuracy = position.coords.accuracy;
    }
    BeginEndDay();
}

function BeginEndDay()
{
    var Comment = $("#EndDayComment").val();
    var params = new Object();
    params["DeviationComment"] = Comment;
    params["ActualRouteID"] = localStorage.getItem("CurRouteID");

    if (parseInt(cur_lat) != 0 && parseInt(cur_lon) != 0)
    {
        params["endLat"] = cur_lat;
        params["endLon"] = cur_lon;
        params["endAccuracy"] = cur_accuracy;
    }

    var qstr = "?cmd=Prism_ProcessEndDay";
    //@sanjay---Upload Offline Call on End Day
    checkForNetworkAndCall();
    ajaxCall(qstr, params, "post", EndDayResponse);
}

function EndDayResponse(retStr)
{
    if (retStr.response_code == "0")
    {
        //localStorage.removeItem("StartDayTime");
        //localStorage.removeItem("CurRouteID");
        var StartDayDOM = $(".main_row2").find("div[MenuId='159']");
        //StartDayDOM.find("span.TextSpan").html("Start Day");
        //StartDayDOM.removeClass("disableImg");        
        var EndTime = $.parseJSON(retStr.gpdata4);
        if (IsJson(EndTime))
            EndTime = $.parseJSON(EndTime)

        localStorage.setItem("EndDayTime", EndTime);
        var EndDayDOM = $(".main_row2").find("div[MenuId='188']");
        EndDayDOM.find("span.TextSpan").html("End Day (" + EndTime + ")");
        EndDayDOM.addClass("disableImg");

        IsDayStarted = false;
        IsDayEnded = true;
    }
    else
    {
        DisplayMessage(retStr.message);
    }
}

function ProcessStartDay()
{
    var StartDayDOM = $(".main_row2").find("div[MenuId='159']");
    if (StartDayDOM.hasClass("disableImg"))
        return;

    ProcessRescheduling(true);
}

//function ProcessRescheduling(isStartDay)
//{
//    var params = new Object();
//    showNextPage(false);
//    params["cmd"] = "Prism_GetNotVisitedCustomer";
//    var retStr = CallServerMethod(params);
//    if (retStr.response_code == "0")
//    {
//        var CustomerList = retStr.gpdata4;
//        if (IsJson(CustomerList))
//            CustomerList = $.parseJSON(CustomerList);

//        if (CustomerList.notVisitedCustomer != null && CustomerList.notVisitedCustomer.length > 0)
//        {
//            ProcessReplannedCustomers(CustomerList, isStartDay);
//        }
//        else
//        {
//            if (isStartDay)
//                callToStartDay();
//            //else
//            //    PerformEndDay();
//        }
//    }
//    else
//        DisplayMessage(retStr.message);
//}

function ProcessRescheduling(isStartDay) {
    showNextPage(false);
    var qstr = "?cmd=Prism_GetNotVisitedCustomer&startday=" + isStartDay + "";
    ajaxCall(qstr, null, "get", successProcessRescheduling);
   
}

function successProcessRescheduling(retStr) {
    if (retStr.response_code == "0") {
        var CustomerList = retStr.gpdata4;
        if (IsJson(CustomerList))
            CustomerList = $.parseJSON(CustomerList);

        if (CustomerList.notVisitedCustomer != null && CustomerList.notVisitedCustomer.length > 0) {
            ProcessReplannedCustomers(CustomerList, retStr.gpdata3);
        }
        else {
            if (retStr.gpdata3)
                callToStartDay();
            //else
            //    PerformEndDay();
        }
    }
    else
        DisplayMessage(retStr.message);
}
function ProcessReplannedCustomers(CustomerList, isStartDay)
{
    var ar_html = [];
    var EndDayHtm = '<div class="margin-bottom-2per"><form class="form-horizontal"> <div> <label class="pull-left text-right lbl_planner_comment">EndDay Comment</label> <textarea cols="50" rows="3" id="EndDayComment" style="font-size: 13px;"></textarea> </div> </form> </div>';
    if (!isStartDay)
        ar_html.push(EndDayHtm);

    ar_html.push('<div class="table-responsive c-plan" id="replanForm">');
    ar_html.push('<table width="100%" cellpadding="0" cellspacing="0" border="0" class="table mytable">');
    ar_html.push('<tr>');
    ar_html.push('<th></th><th>Status</th><th>Reason</th>');
    if (isStartDay)
        ar_html.push('<th>Plan Date</th>');

    ar_html.push('<th>Replan Date</th>');
    ar_html.push('</tr>')

    var not_visited_customer = CustomerList.notVisitedCustomer;
    var RePlannedDealer = CustomerList.RePlannedDealer;
    var RePlannedRetailer = CustomerList.RePlannedRetailer;
    var RePlannedIHBSite = CustomerList.RePlannedIHBSite;
    var RePlannedProject = CustomerList.RePlannedProject;
    var RePlannedInfluencerLead = CustomerList.RePlannedInfluencerLead;
    var RePlannedArea = CustomerList.RePlannedArea;
    var RePlannedGodown = CustomerList.RePlannedGodown;
    for (var i = 0; i < not_visited_customer.length; i++)
    {
        var cur_cust = new Object();
        var cust_type = not_visited_customer[i].CustomerType;
        cur_cust = not_visited_customer[i];
        var cust_id = not_visited_customer[i].CustomerId;
        cur_cust.DealerCode = cust_id;
        switch (cust_type)
        {
            case "1":
                cur_cust.DealerName = RePlannedIHBSite[cust_id].IHBSiteName;
                cur_cust.visitStatus = RePlannedIHBSite[cust_id].visitStatus
                break;
            case "2":
                cur_cust.DealerName = RePlannedDealer[cust_id].DealerName;
                cur_cust.visitStatus = RePlannedDealer[cust_id].visitStatus
                break;
            case "3":
                cur_cust.DealerName = RePlannedGodown[cust_id].GodownName;
                cur_cust.visitStatus = RePlannedGodown[cust_id].visitStatus
                break;
            case "4":
                cur_cust.DealerName = RePlannedProject[cust_id].Name;
                cur_cust.visitStatus = RePlannedProject[cust_id].visitStatus
                break;
            case "6":
                cur_cust.DealerName = RePlannedInfluencerLead[cust_id].LeadName;
                cur_cust.visitStatus = RePlannedInfluencerLead[cust_id].visitStatus
                break;
            case "7":
                cur_cust.DealerName = RePlannedArea[cust_id].AreaName;
                cur_cust.visitStatus = RePlannedArea[cust_id].visitStatus
                break;
            case "8":
                cur_cust.DealerName = RePlannedRetailer[cust_id].DealerName;
                cur_cust.visitStatus = RePlannedRetailer[cust_id].visitStatus
                break;
        }

        if (Object.size(cur_cust) > 0 && cur_cust.visitStatus != "1")
        {
            var prev_date_dom = '<td class="prev_plan_date"> ' + cur_cust.PlanDate + ' </td>';
            var status_dom = '<td><input type="radio" onchange="checkbox_change(this)" name="status_' + cur_cust.DealerCode + '_' + cur_cust.CustomerType + "_" + i + '" value="reschedule"><span class="v-align-text-btm">RePlan</span> <input type="radio" onchange="checkbox_change(this)" name="status_' + cur_cust.DealerCode + '_' + cur_cust.CustomerType + "_" + i + '" value="cancel" checked> <span class="v-align-text-btm">Cancel</span> </td>';

            ar_html.push('<tr class="data_row" DealerCode="' + cur_cust.DealerCode + '" DealerName="' + cur_cust.DealerName + '" CustomerType=' + cur_cust.CustomerType + '>');
            ar_html.push('<td>' + cur_cust.DealerName + '(' + cur_cust.DealerCode + ')' + ' </td>');
            ar_html.push(status_dom);
            ar_html.push('<td><select class="nextPlanReason"><option></option> <option> Shop closed </option><option> Natural Calamity </option><option> Lack Of Time </option><option> Personal Reason </option><option> Visit Postponed </option><option> Traffic Jam </option><option> Had taken leave </option><option> In adhoc Meeting </option><option> Others </option></select></td>');
            if (isStartDay)
                ar_html.push(prev_date_dom);

            ar_html.push('<td><div class="width80per input-group date"><input class="form-control next-plan-date" type="text"><span class="input-group-addon hide_icon"><i class="glyphicon glyphicon-th"></i></span></div></td>');
            ar_html.push('</tr>')
        }

    }


    ar_html.push('</table></div>');

    var d_width = $(window).width() - 80;
    var d_height = $(window).height() - 150;
    $("#custDetail").removeClass("height250 center_popup").addClass("center_popup_dealer");
    var extra_btn = '<button class="btn"  aria-hidden="true" onclick="CloseMe(\'custDetail\')"> Cancel </button>';
    ShowDialog("custDetail", ar_html.join(''), "ProcessReplanVisits(this," + isStartDay + ")", null, null, null, "Customer Replanning - Customer not visited in past dates", extra_btn, null, d_width, d_height, false);
    $("#custDetail .modal-body").css("overflow-x", "auto");
    var sDate = new Date();
    var today_btn = 'linked';
    if (!isStartDay)
    {
        sDate.setDate(sDate.getDate() + 1);
        today_btn = false;
    }
    $("#custDetail .modal-body").find("div.input-group.date").datepicker(
    {
        format: "dd-M-yyyy",
        todayBtn: today_btn,
        disableDateToggle: true,
        todayHighlight: 1,
        autoclose: true,
        clearBtn: true,
        startDate: sDate
    })
    var replan_dt_input = $("#custDetail .modal-body").find("div.input-group.date input");
    replan_dt_input.attr("disabled", "disabled");

}

function ProcessReplanVisits(evt, isStartDay)
{
    var reschedule_arr = new Array();
    var cancel_arr = new Array();
    var today_date = null;
    if (!isStartDay)
    {
        today_date = new Date();
        var d = today_date.getDate();
        var m = parseInt(today_date.getMonth(),10) + parseInt(1,10);
        var y = today_date.getFullYear();
        today_date = ProcessDateValue(d + "-" +  m + "-" + y, true);
    }
    var isError = false;
    $("#replanForm table tr.data_row").each(function ()
    {
        var params = new Object();
        var isReschedule = $(this).find("input[type='radio']")[0].checked ? true : false;
        var Reason = $(this).find(".nextPlanReason").removeClass("ui-state-error").val();
        if (Reason == null || Reason.length == 0)
        {
            var msg_keyword = (isReschedule ? "Rescheduling" : "Cancelling");
            DisplayMessage("Please specify the reason for " + msg_keyword);
            $(this).find(".nextPlanReason").addClass("ui-state-error");
            isError = true;
            return false;
        }

        if (isReschedule)
        {
            var NextPlanDate = $(this).find(".next-plan-date").removeClass("ui-state-error").val();
            if (NextPlanDate == null || NextPlanDate.length == 0)
            {
                DisplayMessage("Please specify the Plan Date for Rescheduling");
                $(this).find(".next-plan-date").addClass("ui-state-error");
                isError = true;
                return false;
            }
            params["PlanDate"] = NextPlanDate;
            reschedule_arr.push(params);
        }
        else
            cancel_arr.push(params);

        params["Reason"] = Reason;
        params["CustomerType"] = $(this).attr("CustomerType");
        var prev_date = $(this).find(".prev_plan_date").html() != null ? $(this).find(".prev_plan_date").html().trim() : null;
        if (today_date != null)
            prev_date = today_date;

        params["PreviousPlannedDate"] = prev_date;
        params["curRouteId"] = localStorage.getItem('curRouteId');
        params["DealerName"] = $(this).attr("DealerName");
        params["DealerCode"] = $(this).attr("DealerCode");

    })
    if ((reschedule_arr.length > 0 || cancel_arr.length > 0) && !isError)
    {
        var final_obj = new Object();
        final_obj["reschedule"] = reschedule_arr;
        final_obj["cancel"] = cancel_arr;

        ajaxCall("?cmd=Prism_CustomerVisitAndSaveNewPlanCustomer&isStartDay=" + isStartDay + "", final_obj, "post", messageAfterRescheduleCustomer);
    }
    if (!isStartDay && isError == false)
    {
        EndDayOK(evt);
    }
    if (!isError)
        $("#custDetail").modal("hide");
}

function messageAfterRescheduleCustomer(retStr)
{
    if (retStr.response_code == "0")
    {
        var data = $.parseJSON(retStr.gpdata4);

        if (data.isStartDay == true) // need to change
            callToStartDay();

        switch (loginData.loginInfo.Role)
        {
            case "CSR":
                loginData.TodayCSRVisitPlan = data.TodayCSRVisitPlan;
                loginData.TodayAreaVisitPlan = data.TodayAreaVisitPlan
                break;
            case "TTE":
            case "TTM":
                loginData.TodayAreaVisitPlan = data.TodayAreaVisitPlan
                loginData.TodayCSRVisitPlan = data.TodayCSRVisitPlan;
                loginData.TodayInfluencerVisitPlan = data.TodayInfluencerVisitPlan
                loginData.TodayProjectVisitPlan = data.TodayProjectVisitPlan
                loginData.TodayDealerVisitPlan = data.TodayDealerVisitPlan
                loginData.TodayRetailerVisitPlan = data.TodayRetailerVisitPlan
                break;
            case "TSE":
            case "TSM":
                loginData.TodayInfluencerVisitPlan = data.TodayInfluencerVisitPlan
                loginData.TodayDealerVisitPlan = data.TodayDealerVisitPlan
                loginData.TodayRetailerVisitPlan = data.TodayRetailerVisitPlan
                break;
            case "RHM":
            case "ZHM":
            case "CMO":
                loginData.TodayDealerVisitPlan = data.TodayDealerVisitPlan
                loginData.TodayInfluencerVisitPlan = data.TodayInfluencerVisitPlan
                loginData.TodayRetailerVisitPlan = data.TodayRetailerVisitPlan
                loginData.TodayProjectVisitPlan = data.TodayProjectVisitPlan
                break;
            case "ACCOUNT":
            case "LOGISTIC":
                loginData.TodayGodownVisitPlan = data.TodayGodownVisitPlan
                break;
        }
        //else
        //PerformEndDay();
    }
    else
    {
        DisplayMessage(retStr.message);
    }
}

function checkbox_change(evt)
{
    var val = $(evt).val();
    if (val == "reschedule" && evt.checked == true)
        $(evt).closest("tr").find("span.input-group-addon").removeClass("hide_icon").addClass("show_icon");
    else
    {
        $(evt).closest("tr").find("span.input-group-addon").removeClass("show_icon").addClass("hide_icon");
        $(evt).closest("tr").find("input.next-plan-date").val("");
    }
}

function callToStartDay()
{
    $(".main_row2").find("div[MenuId='160']").removeClass("disableImg");

    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(storeCurPositionAndStartDay, onGPSNotFoundStartDay, { enableHighAccuracy: true, timeout: timeoutTime });
}

function storeCurPositionAndStartDay(position)
{
    $("#iframeloading").hide();
    if (position !== undefined)
    {
        cur_lat = position.coords.latitude;
        cur_lon = position.coords.longitude;
        cur_accuracy = position.coords.accuracy;
    }
    StartDayBegins();
}

function onGPSNotFoundStartDay()
{
    $("#iframeloading").hide();
    StartDayBegins();
}

function StartDayBegins()
{
    var qstr = "?cmd=Prism_ProcessStartDay";

    var params = new Object();
    params["cmd"] = "Prism_ProcessStartDay";
    if (parseInt(cur_lat) != 0 && parseInt(cur_lon) != 0)
    {
        params["startLat"] = cur_lat;
        params["startLon"] = cur_lon;
        params["startAccuracy"] = cur_accuracy;
    }

    ajaxCall(qstr, params, "post", StartDayResponse);
}

function StartDayResponse(retStr)
{
    if (retStr.response_code == "0")
    {
        var data = $.parseJSON(retStr.gpdata4);

        if (IsJson(data))
            data = $.parseJSON(data)

        if (data != null)
        {
            localStorage.setItem("CurRouteID", data.ActualRouteID);
            localStorage.setItem("StartDayTime", data.StartTime);
            SetStartTime();
        }
    }
    else
    {
        DisplayMessage(retStr.message);
    }
}

function SetStartTime()
{
    var StartDayDOM = $(".main_row2").find("div[source='Start Day']");
    if (StartDayDOM.length > 0 && localStorage.getItem("StartDayTime"))
    {
        var StartTime = localStorage.getItem("StartDayTime");
        StartDayDOM.find("span.TextSpan").html("Start Day(" + StartTime + ")");
        StartDayDOM.addClass("disableImg");
        var EndDayDom = $(".main_row2").find("div[MenuId='188']");
        EndDayDom.removeClass("disableImg");
        if (localStorage.getItem("EndDayTime"))
        {
            EndDayDom.addClass("disableImg");
            EndDayDom.find("span.TextSpan").html("End Day (" + localStorage.getItem("EndDayTime") + ")");
        }
        IsDayStarted = true;
        IsDayEnded = false;
    }
    else
    {
        $(".main_row2").find("div[MenuId='188']").addClass("disableImg");
        IsDayStarted = false;
        IsDayEnded = true;
    }
}

function showNextPage(Flag)
{
    if (Flag)
    {
        $("#fsoActionBtnDiv").hide();

        $("#home").show();
        $("#main").show();
        $("#network").hide();

        // $("body").css('background', '');
    }
    else
    {
        $("#fsoActionBtnDiv").show();

        $("#home").hide();
        $("#main").hide();
        $("#network").show();
        //$("body").css('background', '#E0EAF4;');
    }
    $("#backtomap").hide();
}

function ManagePlannerDesign()
{
    var height = $(window).height();
    var height_header = $('.header').height();


    //    alert("HEader Height "+ height_header)

    var height_header1 = $('.blue-bg').height();
    var Leftblockheight = height - (height_header + height_header1);
    var planner_height = height - (height_header + 140);
    var blockheight = height - height_header;

    //var schedual_height = height -height_header - height_header1;

    var blockheight1 = height - (height_header + height_header1);
    var blockheight2 = height - (height_header1 - 12);
    $('.block_height').css('height', blockheight);
    $('.Leftblockheight').css('height', Leftblockheight);
    $('#planToDisplay').css('height', height - height_header - 85);
    //$(".dataTables_scrollBody").css("height", (height - 175) + height_header);
    //var height = $(window).height();
    //var height_header = $('.header').height();
    //var height_header1 = $('.blue-bg').height();
    //var Leftblockheight = height - height_header - height_header1;
    //var blockheight = height - (height_header 5 + $(".panel.panel-default.marg-both15.panel-bg").height());
    //$('.block_height').css('height', blockheight);
    //$('.Leftblockheight').css('height', Leftblockheight);
    $("#div_par").css("height", blockheight);
    $("#plannerTable").css("height", planner_height);
    $("#daySchedule").css("height", planner_height);
    //$("#dayScheduleDiv").css("height", schedual_height);
    $("#div_ch10").css("height", blockheight);

    /* -- Start -- Aadilkhan-- */
    //$(".msg-tbl").css("height", blockheight);
    /* -- End -- */
}

function ProcessCustomerDataSequence()
{
    var msg;
    switch (loginData.loggedusertype)
    {
        case "CSR":
            if (Object.size(loginData.TodayCSRVisitPlan) == 0 && Object.size(loginData.TodayAreaVisitPlan) == 0)
                msg = "No IHBSite/Area to be visited today ";
            break;
        case "TSE":
        case "TSM":
            if (Object.size(loginData.TodayDealerVisitPlan) == 0 && Object.size(loginData.TodayInfluencerVisitPlan) == 0 && Object.size(loginData.TodayRetailerVisitPlan) == 0)
                msg = "No Dealer/Retailer/Influencer to be visited today ";
            break;
        case "TTE":
        case "TTM":
            if (Object.size(loginData.TodayCSRVisitPlan) == 0 && Object.size(loginData.TodayInfluencerVisitPlan) == 0 && Object.size(loginData.TodayProjectVisitPlan) == 0 && Object.size(loginData.TodayAreaVisitPlan) == 0 && Object.size(loginData.TodayDealerVisitPlan) == 0 && Object.size(loginData.TodayRetailerVisitPlan) == 0)
                msg = "No IHBSite / Area / Influencer / Project / Dealer / Retailer to be visited today ";
            break;
        case "RHM":
        case "ZHM":
            if (Object.size(loginData.TodayInfluencerVisitPlan) == 0 && Object.size(loginData.TodayProjectVisitPlan) == 0 && Object.size(loginData.TodayDealerVisitPlan) == 0 && Object.size(loginData.TodayRetailerVisitPlan) == 0)
                msg = "No Influencer/Project/Dealer/Retailer to be visited today ";
            break;
        case "ACCOUNT":
        case "LOGISTIC":
            if (Object.size(loginData.TodayGodownVisitPlan) == 0)
                msg = "No Godown to be visited today ";
            break;
    }
    if (msg != null && msg.length > 0)
    {
        DisplayMessage(msg);
        showNextPage(false);
    }
    else
    {
        RenderPrism();
        DisplayVisitCustomerList();
        showDealerMap();
    }
}

function DisplayVisitCustomerList()
{
    var htm = new Array();
    htm.push('<div class="col-xs-12 blue-bg customer_data_sequence_header"><span>Customers</span></div>');
    htm.push('<div class="white-bg padd-left8 col-xs-12  Leftblockheight" id="catalog" >');

    var TodayVisitPlan;
    for (var i = 0; i < 7; i++)
    {
        TodayVisitPlan = ((i == 0) ? loginData.TodayCSRVisitPlan : ((i == 1) ? loginData.TodayDealerVisitPlan : ((i == 2) ? loginData.TodayInfluencerVisitPlan : ((i == 3) ? loginData.TodayProjectVisitPlan : ((i == 4) ? loginData.TodayAreaVisitPlan : ((i == 5) ? loginData.TodayRetailerVisitPlan : ((i == 6) ? loginData.TodayGodownVisitPlan : null)))))));
        if (TodayVisitPlan != null)
        {
            for (var key in TodayVisitPlan)
            {
                ProcessVisitCustList(htm, key, TodayVisitPlan[key].CustomerType)
            }
        }
    }
    htm.push('</div>');

    $("#div_ch10").html(htm.join(" "));
    $("#div_ch10").addClass("col-sm-5 col-md-4 col-lg-3 col-xs-4 pull-left");
    //$("#div_par").html(palnnerHTML.join(" "));
    $("#div_par").addClass("col-md-8 col-lg-9 col-xs-7");
    $("#main").addClass("container-fluid gray-bg margin-top-10");
}

function ProcessVisitCustList(htm, key, CustomerType)
{
    var curCustomer;
    var curCustomerObj = GetCurrCustomer(key, CustomerType);
    curCustomer = curCustomerObj.curCustomer;
    var class_name = curCustomerObj.class_name;
    var name = curCustomerObj.name;

    htm.push('<div class="pstn-rltv"> <div class="round"> <img alt="" src="assets/images/round-active.png"> </div>');
    htm.push('<div class="blue-box ' + class_name + '" onclick="ProcessCustomerVisit(this,\'' + key + '\',' + CustomerType + ')"> <h4 class="lin-he23"> ' + name + "(" + key + ")" + ' </h4>');
    if (curCustomer.IsVisitEnd && curCustomer.IsVisitEnd == "true")
        htm.push('<img class="icon-visited" alt="" src="assets/images/icn-visited.png"/>');

    htm.push('</div></div>')

    if (!curCustomer.hasOwnProperty("visitStatus") && curCustomer.hasOwnProperty("IsVisitStart") && !curCustomer.hasOwnProperty("IsReplanned"))
    {
        CurrVisitedCustID = key;
        curcustomerInfo = curCustomer;
        curcustomerInfo.CustomerType = CustomerType;
    }
}

function GetCurrCustomer(key, CustomerType)
{
    var obj = new Object();
    if (CustomerType == "1")
    {
        obj.curCustomer = loginData.IHBSiteInfo[key];
        obj.name = obj.curCustomer.IHBSiteName;
        obj.class_name = "IHBSiteVisit"
    }
    else if (CustomerType == "2" || CustomerType == "8")
    {
        obj.curCustomer = loginData.CustomerList[key];
        obj.class_name = "DealerVisit"
        if (CustomerType == "8")
        {
            obj.class_name = "RetailerVisit";
            obj.curCustomer = loginData.RetailerVisit[key];
        }
        obj.name = obj.curCustomer.DealerName;
    }
    else if (CustomerType == "4")
    {
        obj.curCustomer = loginData.ProjectList[key];
        obj.name = obj.curCustomer.Project;
        obj.class_name = "ProjectVisit"
    }
    else if (CustomerType == "6")
    {
        obj.curCustomer = loginData.InfluencerList[key];
        obj.name = obj.curCustomer.LeadName;
        obj.class_name = "InfluencerVisit"
    }
    else if (CustomerType == "7")
    {
        obj.curCustomer = loginData.AreaInfo[key];
        obj.name = obj.curCustomer.AreaName;
        obj.class_name = "AreaVisit"
    }
    else if (CustomerType == "3")
    {
        obj.curCustomer = loginData.GodownList[key];
        obj.name = obj.curCustomer.GodownName;
        obj.class_name = "GodownVisit"
    }
    return obj;
}

function ProcessCustomerVisit(evt, cust_id, cust_type)
{
    var msg_arr = getMsgForCustomer(cust_id, cust_type);
    if (CurrVisitedCustID != null && CurrVisitedCustID != cust_id)
    {
        DisplayMessage(msg_arr[0]);
        return;
    }
    var msg = msg_arr[1];

    if (CurrVisitedCustID == null)
    {
        var curCustomer = GetCustomerBasedOnVisitType(cust_type, cust_id, null);

        /*@rizwan commented the code for max 2 visit for same dealer */
        //if (curCustomer.visitFrequency != null && curCustomer.visitFrequency.length > 0)
        //{
        //    var cur_frequency = parseInt(curCustomer.visitFrequency, 10);
        //    if (cur_frequency >= 2)
        //    {
        //        DisplayMessage("Only two visit is allowed in single day.");
        //        return;
        //    }
        //}
        /*End Comment */

        $("#iframeloading").show();
        navigator.geolocation.getCurrentPosition(function (position)
        {
            $("#iframeloading").hide();
            if (position !== undefined)
            {
                cur_lat = position.coords.latitude;
                cur_lon = position.coords.longitude;
                cur_accuracy = position.coords.accuracy;
            }
            var IsAllow = true;
            if (curCustomer.hasOwnProperty("Lat") && curCustomer.hasOwnProperty("Lon") && curCustomer.Lon.toString().length > 0 && curCustomer.Lat.toString().length > 0)
            {
                IsAllow = checkForCustomerPosition(curCustomer.Lat, curCustomer.Lon);
            }
            if ((IsAllow || cust_type == 7) && (CurrVisitedCustID != cust_id))/*during area visit don't check for current location*/
            {
                var extra_btn = '<button class="btn"  aria-hidden="true" onclick="CloseMe(\'dialog-message\')"> Cancel </button>';
                ShowDialog("dialog-message", msg, "StartVisitOK(" + cust_type + ",'" + cust_id + "')", null, null, null, "Start Visit", extra_btn);
            }
            //else {
            //    saveStartCallParameterToLog(ele, custType);
            //}
        }, function (error)
        {

            $("#iframeloading").hide();
            var IsAllow = true;
            if (curCustomer.hasOwnProperty("Lat") && curCustomer.hasOwnProperty("Lon") && curCustomer.Lon.toString().length > 0 && curCustomer.Lat.toString().length > 0)
            {
                IsAllow = checkForCustomerPosition(curCustomer.Lat, curCustomer.Lon);
            }
            if ((IsAllow || cust_type == 7) && (CurrVisitedCustID != cust_id))/*during area visit don't check for current location*/
            {
                ShowDialog("dialog-message", msg, "StartVisitOK(" + cust_type + ",'" + cust_id + "')", null, null, null, "Start Visit");
            }
            //else {
            //    saveStartCallParameterToLog(ele, custType);
            //}            
        }, { enableHighAccuracy: true, timeout: timeoutTime });
    }
    else
    {
        DisplayDashboard();
    }
}

function checkForCustomerPosition(cLat, cLon)
{
    if (parseInt(cur_lat) != 0 && parseInt(cur_lon) != 0)
    {
        var m = distance(cLat, cLon, cur_lat, cur_lon);
        var distanceToCheck = loginData.max_gps_meter;

        if (m > distanceToCheck)
        {
            DisplayMessage('You are at a distance of ' + m + ' meter from recorded client location ...');
            return false;
        }
    }
    return true;
}

function distance(lat1, lon1, lat2, lon2)
{
    var R = 6371; // km (change this constant to get miles)
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
		Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return Math.round(d * 1000);
}

function getCustObj(cust_id, cust_type)
{
    var obj = new Object();
    cust_type = parseInt(cust_type, 10);
    switch (cust_type)
    {
        case 1:
            obj.name = loginData.IHBSiteInfo[cust_id].IHBSiteName;
            break;
        case 2:
            obj.name = loginData.CustomerList[cust_id].DealerName;
            break;
        case 3:
            obj.name = loginData.GodownList[cust_id].GodownName;
            break;
        case 4:
            obj.name = loginData.ProjectList[cust_id].Project;
            break;
        case 6:
            obj.name = loginData.InfluencerList[cust_id].LeadName;
            break
        case 7:
            obj.name = loginData.AreaInfo[cust_id].AreaName;
            break
        case 8:
            obj.name = loginData.RetailerVisit[cust_id].DealerName;
    }
    return obj;
}

function getMsgForCustomer(cust_id, cust_type)
{
    var msg_arr = new Array();
    var msg_1 = "Please complete the visit for ";
    var msg_2 = "Are you sure you want to start ";

    if (CurrVisitedCustID != null)
        msg_arr.push(msg_1 + getCustObj(CurrVisitedCustID, curcustomerInfo.CustomerType).name);
    else
        msg_arr.push("none");

    var again_visit = "";

    switch (cust_type)
    {
        case 1:
            if (loginData.IHBSiteInfo[cust_id].visitStatus != null && loginData.IHBSiteInfo[cust_id].visitStatus.length > 0)
                again_visit = " Again ";

            msg_arr.push(msg_2 + "IHBSite visit for <b>" + loginData.IHBSiteInfo[cust_id].IHBSiteName + "(" + cust_id + ")" + again_visit + " ? </b>");
            break;
        case 2:
        case 8:
            var keyfld = "Dealer";
            var cust_list = loginData.CustomerList;
            if (cust_type == 8)
            {
                keyfld = "Retailer";
                cust_list = loginData.RetailerVisit;
            }

            if (cust_list[cust_id].visitStatus != null && cust_list[cust_id].visitStatus.length > 0)
                again_visit = " Again ";

            msg_arr.push(msg_2 + "" + keyfld + " visit for <b>" + cust_list[cust_id].DealerName + "(" + cust_id + ") " + again_visit + " ? </b>");
            break;
        case 4:
            if (loginData.ProjectList[cust_id].visitStatus != null && loginData.ProjectList[cust_id].visitStatus.length > 0)
                again_visit = " Again ";

            msg_arr.push(msg_2 + "Project visit for <b>" + loginData.ProjectList[cust_id].Project + "(" + cust_id + ") " + again_visit + " ? </b>");
            break;
        case 6:
            if (loginData.InfluencerList[cust_id].visitStatus != null && loginData.InfluencerList[cust_id].visitStatus.length > 0)
                again_visit = " Again ";
            msg_arr.push(msg_2 + "Influencer Provided Lead visit for <b>" + loginData.InfluencerList[cust_id].LeadName + "(" + cust_id + ") " + again_visit + " ? </b>");
            break;
        case 7:
            if (loginData.AreaInfo[cust_id].visitStatus != null && loginData.AreaInfo[cust_id].visitStatus.length > 0)
                again_visit = " Again ";

            msg_arr.push(msg_2 + "Area visit for <b>" + loginData.AreaInfo[cust_id].AreaName + "(" + cust_id + ") " + again_visit + " ? </b>");
            break;
        case 3:
            if (loginData.GodownList[cust_id].visitStatus != null && loginData.GodownList[cust_id].visitStatus.length > 0)
                again_visit = " Again ";

            msg_arr.push(msg_2 + "Godown visit for <b>" + loginData.GodownList[cust_id].GodownName + "(" + cust_id + ") " + again_visit + " ? </b>");
            break;
    }
    return msg_arr;
}

function StartVisitOK(CustomerType, cust_id)
{
    CurrVisitedCustID = cust_id;
    curcustomerInfo = GetCustomerBasedOnVisitType(CustomerType, cust_id);
    curcustomerInfo.CustomerType = CustomerType;

    if (curcustomerInfo.visitStatus != null && curcustomerInfo.visitStatus.length > 0) // visited second time.
    {
        delete curcustomerInfo.visitStatus;
        delete curcustomerInfo.IsVisitEnd;
        delete curcustomerInfo.StartTime;
        curcustomerInfo.visitedAgain = "true";
    }
    //@sanjay---settting up offline startvisit time
    CustomerVisitStartTime = new Date();
    localStorage.setItem("StartVisitTime", pad2(CustomerVisitStartTime.getHours()) + ":" + pad2(CustomerVisitStartTime.getMinutes()));
    sessionStorage.setItem("CustomerVisitStartTime", CustomerVisitStartTime);
    //Ends here

    sessionStorage.setItem("CurrVisitedCustID", CurrVisitedCustID);
    if ((curcustomerInfo.Lat == null || $.trim(curcustomerInfo.Lat) == "" || parseInt($.trim(curcustomerInfo.Lat)) == 0) && (curcustomerInfo.Lon == null || $.trim(curcustomerInfo.Lon) == "" || parseInt($.trim(curcustomerInfo.Lon)) == 0))
    {
        if (((isPhoneGap() && isNetworkAvailable()) || navigator.onLine) && (curcustomerInfo.CustomerType != 7))
        {
            var msg = error_response_type["gp2022"];
            var extra_btn = '<button class="btn"  aria-hidden="true" onclick="CloseMe(\'dialog-message1\')"> Cancel </button>';
            ShowDialog("dialog-message1", msg, "UpdateCurrentLatLon()", null, null, null, "Update Position", extra_btn);
            //return;
        }
    }
    PerformStartVisit();
}

function CloseMe(dialog_id)
{
    $("#" + dialog_id).modal("hide");
}

function UpdateCurrentLatLon()
{
    $("#iframeloading").show();
    navigator.geolocation.getCurrentPosition(function (position)
    {
        $("#iframeloading").hide();
        if (position !== undefined)
        {
            cur_lat = position.coords.latitude;
            cur_lon = position.coords.longitude;
            cur_accuracy = position.coords.accuracy;
        }
        curcustomerInfo.Lat = cur_lat;
        curcustomerInfo.Lon = cur_lon;
        saveLonLonInformation(CurrVisitedCustID, curcustomerInfo.CustomerType);
        //PerformStartVisit();
    }, function (error)
    {
        $("#iframeloading").hide();
        //PerformStartVisit();
        //alert('Either GPS is not enabled Or not able to Capture GPS data...');
    }, { enableHighAccuracy: true, timeout: timeoutTime });
}

function saveLonLonInformation(custId, custType)
{
    var params = new Object();
    params["Lat"] = cur_lat;
    params["Lon"] = cur_lon;
    params["Accuracy"] = cur_accuracy;
    params["customerId"] = custId;
    params["custType"] = custType;

    var qrystr = "?cmd=Prism_SaveCurrentLatLon";

    ajaxCall(qrystr, params, "post", messageAfterLatLonSave);
}

function messageAfterLatLonSave(retStr)
{
    if (retStr.response_code != "1")
        DisplayMessage(error_response_type[retStr.response_code]);
    else
        DisplayMessage(retStr.message);
}

function PerformStartVisit() // function added by Aadilkhan to execute PerformStartVisit operation after getting Start time form server
{
    var datetime = new Date();
    if ((isPhoneGap() && isNetworkAvailable()) || navigator.onLine) {
        var qstr = "?cmd=Prism_GetEndVisitTime&StartorEndTime=PerformStartVisit";
        ajaxCall(qstr, null, "get", GetVisitTimeSuccess);
        //getVisitTime("PerformStartVisit");
    }
    else
        PerformStartVisitSucess(pad2(datetime.getHours()) + ":" + pad2(datetime.getMinutes()))
}
function PerformStartVisitSucess(StartTime) {

    var qstr = "?qid=118&cmd=Prism_StartEndVisit";
    var params = new Object();
    params["type"] = "startvisit";
    params["ActualRouteID"] = localStorage.getItem("CurRouteID");
    params["CustomerID"] = CurrVisitedCustID;
    params["CustomerType"] = curcustomerInfo.CustomerType;
    params["StartTime"] = StartTime;
    if (parseInt(cur_lat) != 0 && parseInt(cur_lon) != 0) {
        params["startLat"] = cur_lat;
        params["startLon"] = cur_lon;
        params["startAccuracy"] = cur_accuracy;
    }

    if (curcustomerInfo.Lon.toString().length > 0 && curcustomerInfo.Lat.toString().length > 0) {
        var meter = getDistanceInmeter(curcustomerInfo.Lat, curcustomerInfo.Lon);
        if (parseInt(meter) >= 0) {
            params["startDistance"] = meter;
        }
    }
    checkForNetworkAndCall();
    ajaxLocalCall(qstr, params, "post", StartVisitResponse, null, "StartVisit");
}

function getDistanceInmeter(cLat, cLon)
{

    if (parseInt(cur_lat) != 0 && parseInt(cur_lon) != 0)
    {
        var m = distance(cLat, cLon, cur_lat, cur_lon);
        return m;
    }
    return -1;
}

function DisplayDashboard()
{
    showNextPage(true);
    RenderPrism();
    showCustomerDetailmenu("160");
    $("#backtomap").show();
    $(".sidebar-menu").append('<li id="SubMenu-EndVisit" onclick="EndVisit()"><a href="#"><span class="icon-endvisit"></span><span class="detail">End Visit</span></a></li>');

    if ((curcustomerInfo.Lat == null || curcustomerInfo.Lat.toString().length == 0) && (curcustomerInfo.Lon == null || curcustomerInfo.Lon.toString().length == 0))
    {
        if (((isPhoneGap() && isNetworkAvailable()) || navigator.onLine) && (curcustomerInfo.CustomerType != 7))
            $(".sidebar-menu").append('<li id="SubMenu-UpdateGPS" onclick="UpdateGPSLocation(\'' + CurrVisitedCustID + '\',' + curcustomerInfo.CustomerType + ')"><a href="#"><span class="icon-gpsloc"></span><span class="detail">Update GPS Location</span></a></li>');
    }
}

function UpdateGPSLocation(custId, custType)
{
    $("#iframeloading").show();
    navigator.geolocation.getCurrentPosition(function (position)
    {
        $("#iframeloading").hide();
        if (position !== undefined)
        {
            cur_lat = position.coords.latitude;
            cur_lon = position.coords.longitude;
            cur_accuracy = position.coords.accuracy;
        }
        curcustomerInfo.Lat = cur_lat;
        curcustomerInfo.Lon = cur_lon;
        saveLonLonInformation(custId, custType);
    }, function (error)
    {
        $("#iframeloading").hide();
        alert(GPS_Not_Found_Message);
    }, { enableHighAccuracy: true, timeout: timeoutTime });
}

function EndVisit()
{
    //if (curcustomerInfo.CustomerType == "3" && ((isPhoneGap() && isNetworkAvailable()) || navigator.onLine))
    //{
    //    var qstr = "?cmd=Prism_EndGodownVisit&VisitId=" + curcustomerInfo.curRouteDetailId + "";
    //    var data = CallServerMethod(null, qstr);
    //    if (IsJson(data))
    //        data = $.parseJSON(data)
    //    if (data != null) {
    //        if (data.gpdata4 == 0) {
    //            DisplayMessage(error_response_type["gp2036"]);
    //            return;
    //        }
    //    }
    //}

    //if (navigator.geolocation)
    //    navigator.geolocation.getCurrentPosition(storeCurPositionAndEndvisit, onGPSNotFoundEndVisit, { enableHighAccuracy: true, timeout: timeoutTime });
    var status=checkEndStatus();
    if (status) {
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition(storeCurPositionAndEndvisit, onGPSNotFoundEndVisit, { enableHighAccuracy: true, timeout: timeoutTime });
    }
}
//// SPRATIK  /////
function checkEndStatus() {
    if (curcustomerInfo.CustomerType == "3" && ((isPhoneGap() && isNetworkAvailable()) || navigator.onLine)) {
        var qstr = "?cmd=Prism_EndGodownVisit&VisitId=" + curcustomerInfo.curRouteDetailId + "";
        //var data = CallServerMethod(null, qstr);
        ajaxCall(qstr, null, "get", successEndVisit);
        return false;
    }
    else {
        return true;
    }
}

function successEndVisit(data) {
    if (IsJson(data))
        data = $.parseJSON(data)
    if (data != null) {
        if (data.gpdata4 == 0) {
            DisplayMessage(error_response_type["gp2036"]);
            return;
        } else {
            if (navigator.geolocation)
                navigator.geolocation.getCurrentPosition(storeCurPositionAndEndvisit, onGPSNotFoundEndVisit, { enableHighAccuracy: true, timeout: timeoutTime });
        }
    }
}
///// EPRATIK /////
function callToEndVisit()
{
    var IsAllow = true;
    var custType = curcustomerInfo.CustomerType;

    /* Remove checking the current distance as per client requirement @rizwan */
    //if (curcustomerInfo.hasOwnProperty("Lat") && curcustomerInfo.hasOwnProperty("Lon") && curcustomerInfo.Lon.toString().length > 0 && curcustomerInfo.Lat.toString().length > 0)
    //{
    //    IsAllow = checkForCustomerPosition(curcustomerInfo.Lat, curcustomerInfo.Lon);
    //}
    /* End Remove */
    if (IsAllow)
    {
        var msg = "Are you sure you want to end the visit? ";
        if (curcustomerInfo.CustomerType == "3" && !((isPhoneGap() && isNetworkAvailable()) || navigator.onLine))
            msg += error_response_type["gp2042"];

        var extra_btn = '<button class="btn"  aria-hidden="true" onclick="CloseMe(\'dialog-message\')"> Cancel </button>';
        ShowDialog("dialog-message", msg, "EndVisitOK()", null, null, null, "End Visit", extra_btn);
    }
    else
    {
        var params = new Object();
        if (parseInt(cur_lat) != 0 && parseInt(cur_lon) != 0)
        {
            params["endLat"] = cur_lat;
            params["endLon"] = cur_lon;
            params["endAccuracy"] = cur_accuracy;
        }
        if (curcustomerInfo.hasOwnProperty("Lat") && curcustomerInfo.hasOwnProperty("Lon") && curcustomerInfo.Lon.toString().length > 0 && curcustomerInfo.Lat.toString().length > 0)
        {
            var meter = getDistanceInmeter(curcustomerInfo.Lat, curcustomerInfo.Lon);
            if (parseInt(meter) >= 0)
            {
                params["endDistance"] = meter;
            }
        }

        if (curcustomerInfo.curRouteDetailId)
            params["curRouteDetailId"] = curcustomerInfo.curRouteDetailId;

        var qrystr = "?cmd=Prism_UpdateEndLatLon";
        ajaxCall(qrystr, params, "post");
    }
}

function storeCurPositionAndEndvisit(position)
{

    $("#iframeloading").hide();
    if (position !== undefined)
    {
        cur_lat = position.coords.latitude;
        cur_lon = position.coords.longitude;
        cur_accuracy = position.coords.accuracy;
    }
    callToEndVisit();
}

function onGPSNotFoundEndVisit()
{
    $("#iframeloading").hide();
    callToEndVisit();
}

function GetVisitTimeSuccess(Response)
{
    var StartEndTime = Response.message;
    if (Response.gpdata1 == "PerformStartVisit")
        PerformStartVisitSucess(StartEndTime);
    else if (Response.gpdata1 == "EndVisitOK")
        EndVisitOKSucess(StartEndTime);
}

function EndVisitOK() // function added to get end time before executing EndVisit operation
{
    var datetime = new Date();
    if ((isPhoneGap() && isNetworkAvailable()) || navigator.onLine) {
        var qstr = "?cmd=Prism_GetEndVisitTime&StartorEndTime=EndVisitOK";
        ajaxCall(qstr, null, "get", GetVisitTimeSuccess);
        //getVisitTime("EndVisitOK");
    }
    else
        EndVisitOKSucess(pad2(datetime.getHours()) + ":" + pad2(datetime.getMinutes()))
}
function EndVisitOKSucess(Time)
{
    var EndTime = Time;

    curcustomerInfo.EndTime = EndTime;
    var timeInfoArray = getEndVisitTime(curcustomerInfo).split("   ");

    var timeInfoHTML = new Array();
    timeInfoHTML.push('<div><table>');
    for (var i = 0; i < timeInfoArray.length; i++)
    {
        timeInfoHTML.push('<tr><td style="background:none;padding:10px;width: 200px;" class="CaptionTD">' + timeInfoArray[i] + '</td></tr>');
    }
    timeInfoHTML.push("</table>");
    var extra_btn = '<button class="btn"  aria-hidden="true" onclick="CloseMe(\'custDetail\')"> Cancel </button>';
    ShowDialog("custDetail", timeInfoHTML.join(''), "EndVisitTimeDisplayOK()", null, null, null, "Visit Summary", extra_btn, null, null, 300);
    $("#custDetail").removeClass("height250");
}

function EndVisitTimeDisplayOK()
{
    var qstr = "?qid=118&cmd=Prism_StartEndVisit";
    var params = new Object();
    params["type"] = "endvisit";

    //@sanjay---by sanjay
    if (curcustomerInfo.curRouteDetailId)
    {
        params["RouteDetailId"] = curcustomerInfo.curRouteDetailId;
    }

    params["EndTime"] = curcustomerInfo.EndTime;

    var mobile = (curcustomerInfo.DealerContactNo != null && curcustomerInfo.DealerContactNo.length > 0) ? "&Mobile=" + curcustomerInfo.DealerContactNo.trim() + "&DealerName=" + curcustomerInfo.DealerName + "" : "";
    qstr += mobile;

    if (parseInt(cur_lat) != 0 && parseInt(cur_lon) != 0)
    {
        params["endLat"] = cur_lat;
        params["endLon"] = cur_lon;
        params["endAccuracy"] = cur_accuracy;
    }

    if (curcustomerInfo.hasOwnProperty("Lat") && curcustomerInfo.hasOwnProperty("Lon") && curcustomerInfo.Lon.toString().length > 0 && curcustomerInfo.Lat.toString().length > 0)
    {
        var meter = getDistanceInmeter(curcustomerInfo.Lat, curcustomerInfo.Lon);
        if (parseInt(meter) >= 0)
        {
            params["endDistance"] = meter;
        }
    }
    checkForNetworkAndCall();
    ajaxLocalCall(qstr, params, "post", EndVisitResponse, null, "EndVisit");

}

function EndVisitResponse(retStr)
{
    if (retStr.response_code == "0")
    {
        CurrVisitedCustID = null;
        sessionStorage.removeItem("CurrVisitedCustID");
        curcustomerInfo.visitStatus = "1";//customer is visited.
        curcustomerInfo.IsVisitEnd = "true";
        if (curcustomerInfo.visitFrequency == null)
            curcustomerInfo.visitFrequency = "1";
        else
            curcustomerInfo.visitFrequency = (parseInt(curcustomerInfo.visitFrequency) + 1).toString();

        BackToMap();
    }
    else
    {
        DisplayMessage(retStr.message);
    }
}

function getEndVisitTime(curcustomerInfo)
{
    var datetime = new Date();
    if (!curcustomerInfo.visitDate)
    {
        var cur_end_visit_day = CustomerVisitStartTime.getDate().toString();
        curcustomerInfo.visitDate = GeneratePlanDate(cur_end_visit_day, CustomerVisitStartTime.getMonth() + 1, CustomerVisitStartTime.getFullYear()); //pad2(CustomerVisitStartTime.getDate()) + "-" + pad2(CustomerVisitStartTime.getMonth() + 1) + "-" + pad2(CustomerVisitStartTime.getFullYear());
    }
    if (!curcustomerInfo.StartTime)
        curcustomerInfo.StartTime = pad2(CustomerVisitStartTime.getHours()) + ":" + pad2(CustomerVisitStartTime.getMinutes());

    var startDate = 'Date:  ' + curcustomerInfo.visitDate + "   Start Time: " + curcustomerInfo.StartTime;

    if (!curcustomerInfo.EndTime)
        curcustomerInfo.EndTime = pad2(datetime.getHours()) + ":" + pad2(datetime.getMinutes());

    var curDate = '   End Time: ' + curcustomerInfo.EndTime;

    var timeSpent = '   Time Spent: ' + TimeDiff(curcustomerInfo.EndTime, curcustomerInfo.StartTime);
    if (!curcustomerInfo.TimeSpent)
        curcustomerInfo.TimeSpent = timeSpent;
    return (startDate + curDate + timeSpent);
}

function TimeDiff(a, b)
{
    var first = a.split(":")
    var second = b.split(":")
    var xx;
    var yy;
    if (parseInt(first[0]) < parseInt(second[0]))
    {
        if (parseInt(first[1]) < parseInt(second[1]))
        {
            yy = parseInt(first[1]) + 60 - parseInt(second[1]);
            xx = parseInt(first[0]) + 24 - 1 - parseInt(second[0])

        }
        else
        {
            yy = parseInt(first[1]) - parseInt(second[1]);
            xx = parseInt(first[0]) + 24 - parseInt(second[0])
        }
    }
    else if (parseInt(first[0]) == parseInt(second[0]))
    {

        if (parseInt(first[1]) < parseInt(second[1]))
        {

            yy = parseInt(first[1]) + 60 - parseInt(second[1]);
            xx = parseInt(first[0]) + 24 - 1 - parseInt(second[0])

        } else
        {
            yy = parseInt(first[1]) - parseInt(second[1]);
            xx = parseInt(first[0]) - parseInt(second[0])
        }

    }
    else
    {
        if (parseInt(first[1]) < parseInt(second[1]))
        {
            yy = parseInt(first[1]) + 60 - parseInt(second[1]);
            xx = parseInt(first[0]) - 1 - parseInt(second[0])

        } else
        {
            yy = parseInt(first[1]) - parseInt(second[1]);
            xx = parseInt(first[0]) - parseInt(second[0])
        }
    }

    if (xx < 10)
        xx = "0" + xx
    if (yy < 10)
        yy = "0" + yy

    return xx + ":" + yy;
}

function StartVisitResponse(retStr)
{
    if (retStr.response_code == "0")
    {
        var data = $.parseJSON(retStr.gpdata4);
        if (IsJson(data))
            data = $.parseJSON(data);

        //localStorage.setItem("isVisitStart", true);
        localStorage.setItem("CurRouteDetailID", data.ActualRouteDetailID);
        localStorage.setItem("StartVisitTime", data.StartVisitTime);
        curcustomerInfo.curRouteDetailId = data.ActualRouteDetailID;
        CustomerVisitStartTime = new Date();
        sessionStorage.setItem("CustomerVisitStartTime", CustomerVisitStartTime);
        DisplayDashboard();
    }
    else
    {
        DisplayMessage(retStr.message);
    }
}

function BackToMap()
{
    isPhoneGap();
    ProcessCustomerDataSequence();
    ManagePlannerDesign();
    $("#backtomap").hide();
}

function ProcessRoutePlan()
{
    glo_obj = new Object();
    RenderPrism();
    $("#iframeloading").show();
    generatePlanner();
    onforthNightChange(null, true);
    ManagePlannerDesign();
}

function ProcessSeniorPlan()
{
    RenderPrism();
    $("#iframeloading").show();
    generatePlanner(true);
    SetSeniorPlanData();
    ManagePlannerDesign();
}

function RenderPrism()
{
    var $panel = $("#main");
    var ar_str = new Array();
    var dtls = ["ch10", "par"];
    for (var i = 0; i < dtls.length; i++)
    {
        ar_str.push("<div class='dg_child' id='div_" + dtls[i] + "'></div>");
    }
    $panel.html(ar_str.join(" "));
}

function Holidays(D)
{
    var nth = ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
    dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
    'Thursday', 'Friday', 'Saturday'],
    monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

    var result = nth[Math.floor(D.getDate() / 7)] + dayNames[D.getDay()];
    //if (result == "SecondSaturday" || result == "ThirdSaturday")
    //    return true;
    //else
    {
        result = dayNames[D.getDay()];
        if (result == "Sunday")
            return true;
        else
            return false;
    }
}

function fsoHome()
{

    $("#websitemenu").css("display", "none");
    $("#unreadNotesCnt").text(TotalUnreadMessages);
    $("#fsoActionBtnDiv").show();
    $("#home").hide();
    $("#main").hide();
    $("#network").show();
    $("#backtomap").hide();
    $("body").css("background", "black");
    /* -- Added To Test -- Aadilkhan -- */
    $("#div_par").empty();

    /* -- end -- */
}

function ViewChart(qid)
{
    alert("chart");
}
function PerformSearch(qid)
{
    if (Headers[qid].sfilters == null || Headers[qid].sfilters.length == 0)
        return
    else
    {
        if (typeof Headers[qid].sfilters != "object")
            Headers[qid].sfilters = $.parseJSON(Headers[qid].sfilters);

        var fqheader = Headers[qid];
        var lang_header = LangHeaders[qid];

        if (fqheader.sfilters != null && fqheader.sfilters.length > 0)
        {
            var formdiv = "sform";
            new myForm().drawForm(qid, fqheader, formdiv, "Search");
        }
    }
}

function pad2(number)
{
    return (number < 10 ? '0' : '') + number
}

function AppendTimeToMessage()
{
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();

    var ampm = h >= 12 ? 'pm' : 'am';

    h = h % 12;
    h = h ? h : 12; // the hour '0' should be '12'

    m = checkTime(m);
    s = checkTime(s);

    return "  (" + h + ":" + m + ":" + s + " " + ampm + ")";
}

function checkTime(i)
{
    if (i < 10)
    {
        i = "0" + i;
    }
    return i;
}
function checkIsDayStarted()
{
    if (!IsDayStarted)
    {
        $("#fsoActionBtnDiv").show();
        $("#home").hide();
        $("#main").hide();
        return true;
    }
    return false;
}


function ProcessRole(data, type, row, tobj)
{
    var params = new Object();
    gtRoleId = data;
    params["RoleId"] = data.split(':')[0];
    var qstr = "?cmd=Prism_ProcessRole";
    ajaxCall(qstr, params, "post", RoleResponse);
}

function RoleResponse(retStr)
{
    if (retStr.response_code == "0")
    {
        var data = $.parseJSON(retStr.gpdata4);

        if (IsJson(data))
            data = $.parseJSON(data);

        var ar_str = [];
        ar_str.push(pc_spanel.replace("Panelxx", "Operation for Role : " + gtRoleId).replace("xxx", "pc_cdata"));

        $('#parform .modal-body').html(ar_str.join(''));
        var btn = '<button class="btn action" onclick="UpdateRoleOperation()">Update</button>';
        $("#parform .modal-footer").html(btn);

        $("#parform").modal({ backdrop: 'static' });
        var width = $(window).width() - 30;
        var height = $(window).height() - 150;
        $("#parform .modal-dialog").css({ "width": width + "px", "height": height + "px" });

        var crow;
        var rows = [];
        var jrows = data;
        var cols = ["Menu", "Add", "Update", "Delete", "View"];

        rows.push('<table id="example-advanced"><tbody><tr>');
        var ccnt = cols.length;

        for (var i = 0; i < ccnt; i++)
            rows.push("<th>" + cols[i] + '</th>')
        rows.push('</tr>');


        for (var i = 1; i < jrows.length; i++)
        {
            crow = jrows[i];
            rows.push("<tr data-tt-id='" + i + "' ");
            if (crow.length > 4)  // operation specified 
                rows.push(" op_id='" + crow[3] + "' ");
            if (crow[0] != "-1")
                rows.push(" data-tt-parent-id='" + crow[0] + "'  >");
            else
                rows.push(">");
            rows.push("<td>" + crow[2] + "</td>");
            if (crow.length > 4)
            {
                var ar_ck = crow[4].split(',');
                var ck_str;
                for (var j = 0; j < ar_ck.length; j++)
                {
                    if (ar_ck[j] != "-1")
                        ck_str = (ar_ck[j] == "1") ? "checked = 'checked'" : "";
                    else
                        ck_str = ' disabled = "" ';
                    rows.push("<td><input type='checkbox' " + ck_str + " ></input></td>");
                }
            }
            rows.push("</tr>");
        }
        rows.push("</tbody></table>");

        $("#pc_cdata").html(rows.join(''));
        $("#example-advanced").treetable({ expandable: true });
    }
    else
    {
        DisplayMessage(retStr.message);
    }
}

function UpdateRoleOperation()
{
    var oper = {};
    var ar_op, op_id;
    $("#example-advanced tr").each(
        function ()
        {
            op_id = $(this).attr("op_id");
            if (op_id)
            {
                op_str = [];
                $(this).find("input").each(function ()
                {
                    if ($(this).is(':disabled'))
                        op_str.push(-1);
                    else
                        op_str.push($(this).is(':checked') ? 1 : 0);
                });
                oper[op_id] = op_str;
            }

        });

    var params = new Object();
    //gtRoleId = data;
    params["RoleId"] = gtRoleId.split(':')[0];
    params["oplist"] = oper;
    var qstr = "?cmd=Prism_UpdateRole";
    ajaxCall(qstr, params, "post", UpdateResponse);

}


function UpdateResponse(retStr)
{
    DisplayMessage(retStr.message);
}
//function CaptureImage()
//{
//    //start for apk
//      var video = document.querySelector('video');
//      var canvas = document.querySelector('canvas');
//      var selectList = $("#camIDsources")[0];
//      $("#camIDsources").change(sourceChanged);
//      var ctx = canvas.getContext('2d');
//      var localMediaStream = null;

//      var onFailSoHard = function (e)
//      {
//          console.log('Rejected!', e);
//      };

//      video.addEventListener('click', snapshot, false);
//      navigator.getUserMedia_ = (navigator.getUserMedia
//                          || navigator.webkitGetUserMedia
//                          || navigator.mozGetUserMedia
//                          || navigator.msGetUserMedia);

//      if (!!navigator.getUserMedia_)
//      {
//          // Not showing vendor prefixes or code that works cross-browser.
//          if (MediaStreamTrack.getSources)
//          {
//              MediaStreamTrack.getSources(gotSources);
//          }
//          navigator.getUserMedia_({ video: true }, startStreamingForVideo, onFailSoHard);

//      }


//      var activeStream;
//      function sourceChanged(event)
//      {

//          try
//          {
//              if (activeStream)
//              {
//                  activeStream.stop();
//                  activeStream = null;
//              }
//              navigator.getUserMedia_({ video: { optional: [{ sourceId: $(event.target).val() }] } },
//              startStreamingForVideo, onFailSoHard);
//          }
//          catch (e)
//          {
//              alert('camera is in use...In another tab');
//          }
//      }

//    //var sourceInfos = new Array();
//      function gotSources(sourceInfos)
//      {

//          selectList.options.length = 0;
//          var storageIndex = 1;
//          for (var i = 0; i < sourceInfos.length; i++)
//          {
//              console.log(sourceInfos[i])
//              if (sourceInfos[i].kind == 'video')
//              {
//                  selectList.options.add(new Option("Camera " + storageIndex, sourceInfos[i].id));
//                  //sourceIDs[storageIndex] = sourceInfos[i].id;
//                  storageIndex++;
//              }
//          }
//      }

//      function startStreamingForVideo(stream)
//      {
//          video.src = window.URL.createObjectURL(stream);
//          activeStream = stream;
//          localMediaStream = stream;
//      }
//    //end for apk

//}



///@sanjay----Offline Functionalities Starts

//@sanjay--- for solving problem of native application ...to check wheather connection is available or not while phonegap....
function isNetworkAvailable()
{
    var networkAvailable = false;
    var networkState = navigator.connection.type;
    //alert(navigator.connection.type);
    var states = {};
    states[Connection.UNKNOWN] = 'UNKNOWN';
    states[Connection.ETHERNET] = 'ETHERNET';
    states[Connection.WIFI] = 'WIFI';
    states[Connection.CELL_2G] = 'CELL_2G';
    states[Connection.CELL_3G] = 'CELL_3G';
    states[Connection.CELL_4G] = 'CELL_4G';
    states[Connection.NONE] = 'NO NETWORK';
    if (states[networkState] == 'NO NETWORK' || states[networkState] == 'UNKNOWN')
    {
        networkAvailable = false;
    } else
    {
        networkAvailable = true;
    }
    return networkAvailable;
}


//@sanjay--call when uploading data on server
function UploadLocalData(IsMessageDisplay)
{

    var qrystr = gSvcUrl + "?cmd=Prism_TestServer";
    var callparam = {
        url: qrystr,
        type: 'post',
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: function (data, textStatus)
        {
            $("#iframeloading").hide();
        },
        success: function (data, textStatus, request)
        {

            var saved_call = localStorage.getItem("customerCall");
            try
            {
                if (saved_call)
                {

                    $("#toast-container").show();
                    saved_call = JSON.parse(saved_call);
                    var params;
                    for (var i = 0; i < saved_call.length; i++)
                    {
                        params = JSON.parse(saved_call[i]);
                        $("#iframeloading").show();
                        //if (params.ToolCall == true) {
                        //    getData(params.qid, params.url, params.data);
                        //}
                        //else {
                        ajaxCallDataUpload(params.url, params.data, "post", params);
                        //}
                    }

                    localStorage.removeItem("customerCall");
                    setTimeout(function ()
                    {
                        $("#toast-container").hide();
                        if (IsMessageDisplay)
                            DisplayMessage("Uploaded Local Data On Server Successfully....");

                        if (localStorage.getItem("customerCall") == null)
                        {
                            $("#sync").attr('disabled', true);
                            $("#sync").addClass('disableImg');
                        }
                    }, 1000);
                }

            }
            catch (e)
            {
                DisplayMessage("Error In function AjaxCall when Saving from Local", true)
            }
            $("#iframeloading").hide();
        }

    };
    var request = $.ajax(callparam);

}

//@sanjay---uploading local call data
function ajaxCallDataUpload(URL, data, Type, successCaller, failureCaller)
{
    $("#iframeloading").show();
    var tloc = gSvcUrl + URL + "&onlineofflineCheck=offline";
    var callparam = {
        url: tloc,
        type: Type,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: function (data, textStatus)
        {
            $("#iframeloading").hide();
        },
        success: function (data, textStatus, request)
        {
            $("#iframeloading").hide();
            //var datas = $.parseJSON(data.gpdata4);
            //if (datas != null)
            //{
            //    if (IsJson(datas))
            //        datas = $.parseJSON(datas);
            //    if (datas.ActualRouteDetailID)
            //    {
            //        localStorage.setItem("CurRouteDetailID", datas.ActualRouteDetailID);
            //        localStorage.setItem("StartVisitTime", datas.StartVisitTime);                    
            //        CustomerVisitStartTime = new Date();
            //        sessionStorage.setItem("CustomerVisitStartTime", CustomerVisitStartTime);
            //    }
            //}
            //else if (data != null && data.message == "EndVisit")
            //{
            //    sessionStorage.removeItem("CurRouteDetailID");                
            //    localStorage.removeItem("StartVisitTime");                
            //    sessionStorage.removeItem("CustomerVisitStartTime");
            //}
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

//@sanjay----checking Network Connectivity and Uploading Data On Server
function checkForNetworkAndCall()
{
    if (localStorage.getItem("customerCall") != null)
    {
        if ((isPhoneGap() && isNetworkAvailable()) || navigator.onLine)
        {
            UploadLocalData(false);
        }
    }
}

//@sanjay ----managing ajax local call while offline
function ajaxLocalCall(URL, data, Type, successCaller, failureCaller, callType)
{

    $("#iframeloading").show();
    var tloc = gSvcUrl + URL;
    var callparam = {
        url: tloc,
        type: Type,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: function (xhr, textStatus)
        {

            $("#iframeloading").hide();
            CreateOfflineCallStructure(URL, data, callType);
        },
        success: function (xhr, textStatus, request)
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

//@sanjay---Creating offline mode call structure
function CreateOfflineCallStructure(URL, data, callType, myqid)
{

    var saved_customerCall = localStorage.getItem("customerCall");
    if (saved_customerCall == null)
        saved_customerCall = new Array();
    else
        saved_customerCall = JSON.parse(saved_customerCall);

    var callInfo = new Object();
    callInfo["url"] = URL;
    callInfo["data"] = data;
    callInfo["callType"] = callType;

    callInfo["ToolCall"] = false;
    if (myqid)
    {
        callInfo["qid"] = myqid;
        callInfo["ToolCall"] = true;
    }

    saved_customerCall.push(JSON.stringify(callInfo));
    localStorage.setItem("customerCall", JSON.stringify(saved_customerCall));

    if (callType == "StartVisit")
    {
        var datetime = new Date();
        localStorage.setItem("StartVisitTime", pad2(datetime.getHours()) + ":" + pad2(datetime.getMinutes()));
        CustomerVisitStartTime = new Date();
        sessionStorage.setItem("CustomerVisitStartTime", CustomerVisitStartTime);
        curcustomerInfo.StartTime = pad2(datetime.getHours()) + ":" + pad2(datetime.getMinutes());
        DisplayDashboard();
    }
    else if (callType == "EndVisit")
    {
        CurrVisitedCustID = null;
        sessionStorage.removeItem("CurrVisitedCustID");
        curcustomerInfo.visitStatus = "1";//customer is visited.
        curcustomerInfo.IsVisitEnd = "true";
        BackToMap();
    }
    else if (callType == "VisitFeedback")
    {
        curcustomerInfo.IsFeedbackTaken = true;
        $("#myform").modal("hide");
        DisplayMessage(error_response_type["gp2038"]);
    }
    else if (callType == "DealerVisit")
    {
        $("#myform").modal("hide");
        DisplayMessage(error_response_type["gp2040"]);
    }
    else if (callType == "DealerCounterSale")
    {
        $("#myform").modal("hide");
        DisplayMessage(error_response_type["gp2040"]);
    }
    else if (callType == "DealerQuery")
    {
        $("#myform").modal("hide");
        DisplayMessage(error_response_type["gp2040"]);
    }
    //else if (callType == "SalesOrder")
    //{
    //    $("#myform").modal("hide");
    //    DisplayMessage("Record is Added.");
    //}
    else if (callType == "ImgSave")
    {
        $("#myform").modal("hide");
        DisplayMessage("Successfully Saved");
    }
    else
    {
        $("#myform").modal("hide");
        DisplayMessage(error_response_type["gp2040"]);
    }

    $("#sync").attr('disabled', false);
    $("#sync").removeClass('disableImg');
    //localStorage.setItem('UserData', JSON.stringify(loginData));
}

//Offline Functionality Code Ends here