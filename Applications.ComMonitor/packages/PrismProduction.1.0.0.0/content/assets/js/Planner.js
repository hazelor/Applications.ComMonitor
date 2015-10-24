var my_day_cust_list = null;
var display_day_cust_list = new Array();
var glo_obj_key = null;
var boxId = null;
var glo_obj = new Object();
var IsChangeCount = new Object();
var copy_customer_list;
var copy_from_box;
var IHBSiteCount = 0;
var InfluencerCount = 0;
var ProjectCount = 0;
var GodownCount = 0;
var DealerCount = 0;
var RetailerCount = 0;
var RakeCount = 0;
var AreaCount = 0;
var TotalCount = 0;
var NonCSRList = new Object();

function generatePlanner(isApprove)
{
    var palnnerHTML = new Array();

    if (isApprove)
        getFsoListHTML(palnnerHTML);
    else
        getCustomerListHTML(palnnerHTML);

    $("#div_ch10").html(palnnerHTML.join(" "));

    if (!isApprove || isApprove == null)
    {
        $("#routeInfo").html(fillRouteCombo());

        var visitType = $("#cmbVisitType").length == 0 ? (loginData.loggedusertype == "CSR" ? "1" : -1) : $("#cmbVisitType").val();
        $("#catalog").html(routeChange(visitType));
        if (visitType == "3")
            $("#catalog").html(visitTypeChange(this, visitType));
    }

    $("#div_ch10").addClass("col-sm-4 col-md-4 col-lg-3 pull-left");
    palnnerHTML = new Array();

    palnnerHTML.push('<div id="cart" class="row marg-right0 white-bg"><div class="col-xs-12 blue-bg">');
    addPlannerHeader(palnnerHTML, isApprove);
    palnnerHTML.push('</div>');
    palnnerHTML.push('<div class="col-sm-12"> <div class="row" id="dayScheduleDiv"><div class="cont"> <div class="panel panel-default marg-both15 panel-bg"><div class="panel-body marg-panel-body"><span class="text-left text-inline">Plan Status : <b id="planStatusMsg">Planning Mode </b></span> <span class="text-left text-inline"><b id="planCommentMsg"></b></span><span class="pull-right"> <img src="assets/images/icon-information-1.png" alt="" onclick="showLegend()" id="showlegend"  /> </span> </div> </div>');

    palnnerHTML.push('<div class="col-sm-5 pull-left margin-top-10 nopadright" id="daySchedule"> </div>');
    CreatePlannerCal(palnnerHTML, 16);
    palnnerHTML.push('</div></div></div></div>');
    $("#div_par").html(palnnerHTML.join(" "));
    $("#div_par").addClass("col-sm-8 col-md-8 col-lg-9")
    $("#main").addClass("container-fluid gray-bg margin-top-10");
}

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function CreatePlannerCal(htmlArr, count)
{
    htmlArr.push('<div id="plannerTable" class="col-sm-7 pull-right margin-top-10">');
    var boxNo = 1;
    for (var i = 0; i < count; i++)
    {
        addPlannerDayBOx(htmlArr, boxNo);
        boxNo++;
    }
    htmlArr.push('</div>');
}

function ProcessRouteChange(evt)
{
    var type = $("#cmbVisitType").length == 0 ? (loginData.loggedusertype == "CSR" ? "1" : -1) : $("#cmbVisitType").val();
    var htm = routeChange(type);
    $("#catalog").html(htm);
}

function routeChange(type)
{
    var htm = '';
    loginData.customer_search_source = null
    var place_holder = '';
    var spn_dlr_srch = "Dealer"
    if (type == "2" || type == "8") //type 2 is for dealer and type 8 is for sur dealer (retailer)
    {
        if (type == "8")
            spn_dlr_srch = "Retailer";
        if (!loginData.RouteInfo || (loginData.RouteInfo && loginData.RouteInfo.length == 0))
        {
            $("#spn_dlr_srch").html(spn_dlr_srch);
            return null;
        }

        htm = GenerateDealerCustomerList(type);
        place_holder = "Enter Dealer Code / Name";
    }
    else if (type == "1")
    {
        spn_dlr_srch = "IHBSite";
        if (loginData.IHBSiteInfo == null || Object.size(loginData.IHBSiteInfo) == 0)
        {
            $("#spn_dlr_srch").html(spn_dlr_srch);
            return null;
        }

        htm = GenerateIHBCustomerList(type);
        place_holder = "Enter IHBSite Code / Name";
    }
    ProcessTypeAhead(type);
    $("#spn_dlr_srch").html(spn_dlr_srch);
    return htm;
}

function ProcessTypeAhead(type)
{
    if ($(".typeahead").length == 0)
    {
        $("#ddl_srch").attr("type", type).typeahead({
            source: loginData.customer_search_source
        });
    }
    else
    {
        if ($("#ddl_srch").attr("type", type).data('typeahead') != null)
            $("#ddl_srch").attr("type", type).data('typeahead').source = loginData.customer_search_source;
        else
        {
            $("#ddl_srch").attr("type", type).typeahead({
                source: loginData.customer_search_source
            });
        }
    }
}

function typeahead_change()
{
    var type = $("#ddl_srch").attr("type");
    var value = $("#ddl_srch").val();
    var srch_val = (value != null && value.length > 0) ? value.substr(0, value.indexOf('_')) : null;
    if (srch_val != null && srch_val.length > 0)
    {
        var cust_list = GetCustomerListBasedOnType(type);
        var customer = GetCustomerBasedOnVisitType(type, srch_val, cust_list);
        var html = new Array();
        html.push('<div><div class="round"> <img  src="assets/images/round-active.png" alt=""/> </div>')
        if (type == "2" || type == "1" || type == "8")
            html.push(InitialCustomerRendering(customer, type, true));
        else if (type == "4" || type == "6" || type == "7" || type == "3")
            html.push(ListCustomers(type, customer, true));
        html.push('<span id="plannedOn"></span></h4> </div></div>');
        $("#catalog").html(html.join(''));
    }
    else
    {
        visitTypeChange(this, type);
    }
}

function GenerateIHBCustomerList(type, isReturnList)
{
    var AreaID = $("#routeInfo").val();
    if (loginData.IHBSiteInfo != null && Object.size(loginData.IHBSiteInfo) > 0)
    {
        var customerList = new Array();
        for (var cnt in loginData.IHBSiteInfo)
        {
            if (loginData.IHBSiteInfo[cnt].AreaId == AreaID)
            {
                customerList.push(loginData.IHBSiteInfo[cnt]);
            }
        }
        if (isReturnList)
            return customerList;

        if (customerList != null)
            return ProcessCustomerList(customerList, type);
    }
}

function GenerateDealerCustomerList(type)
{
    var customerList = loginData.CustomerList;
    var custList = loginData.CustomerList;
    if (type == "8")
    {
        customerList = loginData.RetailerVisit;
        custList = loginData.RetailerVisit;
    }
    var routeID = $("#routeInfo").val();

    customerList = new Object();
    for (var i = 0; i < loginData.RouteWiseList.length; i++)
    {
        if (loginData.RouteWiseList[i].SalesGroupCode == routeID)
        {
            if (custList[loginData.RouteWiseList[i].DealerId])
            {
                customerList[loginData.RouteWiseList[i].DealerId] = custList[loginData.RouteWiseList[i].DealerId];
            }
        }
    }
    return ProcessCustomerList(customerList, type);
}

function ProcessCustomerList(customerList, type)
{
    var html = new Array();
    for (var curCustomer in customerList)
    {
        var customer = customerList[curCustomer];

        html.push('<div><div class="round"> <img  src="assets/images/round-active.png" alt=""/> </div>')
        html.push(InitialCustomerRendering(customer, type));

        html.push('<span id="plannedOn"></span></h4> </div></div>');
    }
    return html.join(" ");
}

function InitialCustomerRendering(customer, type, isSearch)
{
    var htm = '';
    var obj = new Object();
    if (loginData.loggedusertype == "CSR" || type == "1")
    {
        htm += '<div class="blue-box IHBSiteVisit" onclick=scheduleCustomerByDay(this,"' + customer.IHBSiteId + '",' + type + ') > <h4 class="lin-he23"> ';
        htm += customer.IHBSiteName + '</br>(' + customer.IHBContactNo1 + ')';
        obj.id = customer.IHBSiteId;
        obj.name = customer.IHBSiteId + "_" + customer.IHBSiteName;
    }
    else if (type == "2" || type == "8")
    {
        var clas = "DealerVisit";
        if (type == "8")
            clas = "RetailerVisit";
        htm += '<div class="blue-box ' + clas + '" onclick=scheduleCustomerByDay(this,"' + customer.DealerId + '",' + type + ') > <h4 class="lin-he23"> ';
        htm += customer.DealerName + '</br>(' + customer.DealerId + ') Visit Made:' + customer.madeVisit + ' </br> Visit Missed:' + customer.missedVisit;
        obj.id = customer.DealerId;
        obj.name = customer.DealerId + "_" + customer.DealerName;
    }
    if (loginData.customer_search_source == null)
        loginData.customer_search_source = new Array();

    if (!isSearch)
        loginData.customer_search_source.push(obj);

    return htm;
}
function getCustomerListHTML(palnnerHTML)
{
    var html = palnnerHTML;
    html.push('<div id="products" class="col-xs-12 blue-bg"><div class="row"><form class="marg-60" role="form"> <div class="form-group"> <label for="inputEmail3" class="col-xs-3 padd-top4 control-label">');

    //if (loginData.loggedusertype == "TSE" || loginData.loggedusertype == "TSM")
    html.push('<span class="font-white" id="spn_dlr_srch">Dealer: </span>');
    //else
    //    html.push('<span class="font-white">IHBSite ID: </span>');

    html.push('</label> <div class="col-xs-9"> <input type="text" class="form-control frm-cont28" id="ddl_srch" onchange="typeahead_change()" />');
    //if (loginData.loggedusertype == "TSE" || loginData.loggedusertype == "TSM")
    //    html.push('placeholder="Dealer Code">');
    //else
    //    html.push('placeholder="IHBSite ID">');
    html.push("</div>");
    //html.push('<div class="col-xs-2 pull-left search"><label id="searchLbl"></label> <a href=""> <img src="assets/images/search.jpg" alt="Search Dealer" title="Search Dealer" onclick="openSearchDialog()" /> </a> </div>');
    html.push("</div> </form>")

    html.push('<div class="bord1"> </div> <form class="marg-3 padd-r-l-2" role="form">');
    //if (loginData.loggedusertype == "TSE" || loginData.loggedusertype == "TSM" || loginData.loggedusertype=="TTE")
    //{
    html.push('<select class="form-control marg-3" name="VisitType" id="cmbVisitType" onchange="visitTypeChange(this)"> ' + fillVisitInfo() + ' </select>');
    //}

    html.push('<select class="form-control marg-3" name="routeInfo" id="routeInfo" onchange="ProcessRouteChange(this)"> </select>');
    html.push('</form> </div> </div> ');

    html.push('<div id="catalog" class="white-bg padd-left8 col-xs-12  Leftblockheight">');
    //html.push(routeChange());


    html.push('</div>');
}

function addPlannerDayBOx(htmlArr, boxno)
{
    htmlArr.push('<div class="alert alert-info alert-text1 padd-top-btm10" role="alert" id="th' + boxno + '" onclick="displaySchedulerDiv(this.id,' + boxno + ');">');
    htmlArr.push('<span class="calanderdatewidth" id="day' + boxno + '"></span>');
    htmlArr.push('<span  id="DealerVisit" class="DealerVisit headerCount" ></span>');
    htmlArr.push('<span  id="IHBSiteVisit" class="IHBSiteVisit headerCount"></span>');
    htmlArr.push('<span  id="InfluencerVisit" class="InfluencerVisit headerCount"></span>');
    htmlArr.push('<span  id="GodownVisit" class="GodownVisit headerCount"></span>');
    htmlArr.push('<span  id="ProjectVisit" class="ProjectVisit headerCount"></span>');
    htmlArr.push('<span  id="RakeVisit" class="RakeVisit headerCount"></span>');
    htmlArr.push('<span  id="AreaVisit" class="AreaVisit headerCount"></span>');
    htmlArr.push('<span  id="RetailerVisit" class="RetailerVisit headerCount"></span>');
    htmlArr.push('</div>');
}




var currentlyShown;
//Mishal Start
function displaySchedulerDiv(id, boxno)
{
    var newId = $("#monthPick").val() + "_" + $("#yearPick").val() + "_";
    id = id.replace('th', newId);
    boxId = boxno;

    EmptyAllDealerCounts();

    $("#daySchedule").css("display", "block");
    var htm = '<div class="alert alert-text1 alert-success  padd-top-btm10" role="alert"> <span class="font13" id="SelectedDay" SelectedDate="' + GeneratePlanDate(id.split('_')[2], parseInt(id.split('_')[0]) + 1, id.split('_')[1]) + '">' + $('#day' + boxno).text() + '</span> <div class="pull-right marg-top-3"> <a href="#"> <img id="img_copy" title="Copy Customer" src="assets/images/icon-copy.png" onclick="CopyCustomer(this,' + boxno + ')" alt="copy customer" /> <img src="assets/images/icon-paste.png" id="img_paste" title="Paste Customer"  alt="Paste Customer" onclick="PasteCustomer(this,' + boxno + ')"/> </a> <a href="#"> </a> </div></div>';
    $("#daySchedule").html(htm);

    display_day_cust_list = glo_obj[id];

    if (display_day_cust_list != null)
    {
        AddCustomersForSelectedDay();
    }

    glo_obj_key = id;

    if (display_day_cust_list != null)
        my_day_cust_list = display_day_cust_list.slice(0);
    else
        my_day_cust_list = new Array();

    var dateTocompare = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    var plannerDate = new Date(parseInt(id.split('_')[1]), (parseInt(id.split('_')[0])), parseInt(id.split('_')[2]));

    var PlanMonth = eval($("#monthPick").val()) + 1;
    var year = $("#yearPick").val();

    var plannerKey = year + "_" + PlanMonth;

    if (plannerDate < dateTocompare || (loginData.PlanStatus && loginData.PlanStatus.hasOwnProperty(plannerKey) && loginData.PlanStatus[plannerKey].PlanStatus == "request") || curr_menu_item == "173")
    {
        $("#daySchedule").attr('IsDisable', true);
        $("#daySchedule div.plannerdealer").addClass('disablePlannerDiv');
    }
    else
    {
        $("#daySchedule").attr('IsDisable', false);
        $("#daySchedule div.plannerdealer").removeClass('disablePlannerDiv');
    }
}

function AddCustomersForSelectedDay()
{
    var DealerId;
    var VisitType;

    var CustomerList = null;
    for (var i = 0; i < display_day_cust_list.length; i++)
    {
        DealerId = display_day_cust_list[i].split('_')[1];
        VisitType = display_day_cust_list[i].split('_')[0];
        if (VisitType != null)
            VisitType = parseInt(VisitType, 10);

        switch (VisitType)
        {
            case 1:
                //CustomerList = FetchIHBSiteCustomerList(DealerId, false);
                CustomerList = loginData.IHBSiteInfo;
                break
            case 2:
                CustomerList = loginData.CustomerList;
                break;
            case 3:
                CustomerList = loginData.GodownList;
                break;
            case 4:
                CustomerList = loginData.ProjectList;
                break;
            case 5:
                break;
            case 6:
                CustomerList = loginData.InfluencerList;
                break
            case 7:
                CustomerList = loginData.AreaInfo;
                break;
            case 8:
                CustomerList = loginData.RetailerVisit;
                break;
        }
        if ((CustomerList == null || !CustomerList.hasOwnProperty(DealerId)) && NonCSRList.hasOwnProperty(DealerId))
            CustomerList = NonCSRList;

        if (CustomerList == null && VisitType == 1)
            continue

        AddCustomerInDayPlanner(CustomerList, VisitType, DealerId)
        updateCount(VisitType, 1);
    }
}

function FetchIHBSiteCustomerList(IHBSiteID, ReturnCustomer)
{
    var IHBSiteInfo = loginData.IHBSiteInfo;
    var break_flag = false;
    var CustomerList = null;
    var Customer;
    for (var k in IHBSiteInfo)
    {
        var IHBlist = IHBSiteInfo[k];
        for (var j = 0; j < IHBlist.length; j++)
        {
            if (IHBlist[j].IHBSiteId == IHBSiteID)
            {
                CustomerList = IHBlist;
                Customer = IHBlist[j];
                break_flag = true;
                break;
            }
        }
        if (break_flag)
            break;
    }
    if (ReturnCustomer)
    {
        if (Customer == null && NonCSRList.hasOwnProperty(IHBSiteID))
            return NonCSRList[IHBSiteID];

        return Customer
    }
    else
    {
        if (CustomerList == null && NonCSRList.hasOwnProperty(IHBSiteID))
            return NonCSRList;

        return CustomerList;
    }
}

function ProcessIHBSite(IHBSiteId)
{
    var IHBSiteInfo = loginData.IHBSiteInfo;
    var customer = null;
    var break_flag = false;
    for (var i in IHBSiteInfo)
    {
        var IHBlist = IHBSiteInfo[i];
        for (var j = 0; j < IHBlist.length; j++)
        {
            if (IHBlist[j].IHBSiteId = IHBSiteId)
            {
                customer = IHBlist[j];
                break_flag = true;
                break;
            }
        }
        if (break_flag)
            break;
    }
    if (customer != null)
    {
        RenderDaySchedule(customer, "1");
    }
}

function EmptyAllDealerCounts()
{
    IHBSiteCount = 0;
    InfluencerCount = 0;
    ProjectCount = 0;
    GodownCount = 0;
    DealerCount = 0;
    RakeCount = 0;
    AreaCount = 0;
    TotalCount = 0;
    RetailerCount = 0;
}

function AddMonths(htmlArr, selectedMonth)
{
    if (!selectedMonth)
    {
        selectedMonth = new Date().getMonth();
    }

    for (var i = 0; i < 12; i++)
    {
        if (i == selectedMonth)
        {
            htmlArr.push('<option value="' + i + '" selected="selected">' + months[i] + '</option>');
        }
        else
        {
            htmlArr.push('<option value="' + i + '">' + months[i] + '</option>');
        }
    }
}

function AddChartMonths(htmlArr, selectedMonth)
{

    if (!selectedMonth)
    {
        selectedMonth = new Date().getMonth() + 1;
    }

    for (var i = 1; i <= 12; i++)
    {
        if (i == selectedMonth)
        {
            htmlArr.push('<option value="' + i + '" selected="selected">' + months[i - 1] + '</option>');
        }
        else
        {
            htmlArr.push('<option value="' + i + '">' + months[i - 1] + '</option>');
        }
    }
}

function addYears(htmlArr, selected, min, max, isFirstOptionBlank)
{
    if (!selected)
    {
        selected = new Date().getFullYear();
    }

    if (!min)
    {
        min = new Date().getFullYear() - 1;
    }

    if (!max)
    {
        max = new Date().getFullYear() + 1;
    }

    if (isFirstOptionBlank)
        htmlArr.push('<option value=""></option>');

    for (var i = min; i <= max; i++)
    {
        if (i == selected)
        {
            htmlArr.push('<option value="' + i + '" selected="selected">' + i + '</option>');
        }
        else
        {
            htmlArr.push('<option value="' + i + '">' + i + '</option>');
        }
    }
}

function addPlannerHeader(htmlArr, isApprove)
{
    htmlArr.push('<div class="row">  <div class="col-sm-3 col-md-3"> <form class="marg-3 width50 mar7 padd-r-l-2 pull-left" role="form"> <select class="form-control marg-3 month-padd" onchange="onforthNightChange()" id="monthPick" title="Month" placeholder="Month">');
    AddMonths(htmlArr);
    htmlArr.push('</select></form><form class="marg-3 mar7 width50 pull-right padd-r-l-2" role="form"><select class="form-control marg-3 month-padd" onchange="onforthNightChange()"  id="yearPick" title="Year" placeholder="Year">');
    addYears(htmlArr);
    htmlArr.push("</select></form></div>")
    htmlArr.push('<div class="col-sm-9 col-md-9 pull-right nopad"> <div class="col-sm-6 col-md-6 pull-left nopad"><span class="fortnight pull-left">Fortnight </span> <div class="image-mrg-pad">  <a href="#"> <img id="btnFortNight" fortnight="0" src="assets/images/btn-first.png" onclick="onforthNightChange(true)"> </a></div></div> ')

    htmlArr.push('<div class="col-sm-6 col-md-6 pull-right nopad"> <div class="row"> ');

    if (isApprove)
    {
        htmlArr.push('<button type="button" id="btnplanapprove" class="btn save btn-danger" onclick="PlanAction(event)"> <span class="font11 marg-left-11 bld_txt"> Approve Plan </span></button> <button type="button" class="btn btn-primary req-btn" id="btnplanreject" onclick="PlanAction(event)"> <span class="font11 marg-left-11 bld_txt"> Reject Plan </span> </button>');
    }
    else
    {
        htmlArr.push('<button type="button" id="btnsaveplan" class="btn save btn-danger" onclick="SaveRoutePlan()"> <span class="font11 marg-left-11 bld_txt"> SAVE PLAN </span></button> <button type="button" class="btn btn-primary req-btn" id="btnplanrequest" onclick="PlanAction(event)"> <span class="font11 marg-left-11 bld_txt"> REQUEST FOR APPROVAL </span> </button>');
    }


    htmlArr.push('</div></div> </div>');
    htmlArr.push('</div>');
}
//@rizwan to generate the sequence and plan date of customer 
function GeneratePlanDate(day, month, year)
{
    var final_date;
    var d, m, y;
    var arr;
    arr = day.split('  ');
    d = arr[1] == null ? pad2(parseInt(arr[0])) : pad2(parseInt(arr[1]));
    m = pad2(month);
    y = parseInt(year);

    var MonthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    final_date = d + "-" + MonthArray[parseInt(m, 10) - 1] + "-" + y;
    return final_date;
}


function plannerData(planMonth, planYear, isfortNight, routeID)
{
    this["PlanMonth"] = planMonth;
    this["PlanYear"] = planYear;
    this["PlanFortNight"] = isfortNight;
    this["RoutePlanInfo"] = new Array();
}

plannerData.prototype.addPlan = function (planDate, customerIDs)
{

    var dayplan = new Object();
    dayplan["PlanDate"] = planDate;
    if ($.isArray(customerIDs))
    {
        dayplan["CustomerId"] = customerIDs;
    }
    else
    {
        dayplan["CustomerId"] = [];
    }
    this["RoutePlanInfo"].push(dayplan);
}

function LoadPlanner(CurEmp)
{
    var qrystr = "?cmd=Prism_LoadRoutePlan&RoutePlanQid=21&PlanDateQid=18&RouteCustomerMapQid=15";
    var params = new Object();

    var PlannedMonth, PlannedYear;

    if ($("#monthPick").val() != null)
        PlannedMonth = eval($("#monthPick").val()) + 1;
    if ($("#yearPick").val() != null)
        PlannedYear = $("#yearPick").val();

    qrystr += "&PlanMonth=" + PlannedMonth + "&PlanYear=" + PlannedYear;
    $("#iframeloading").show();

    if (CurEmp)
    {
        qrystr += "&EmpCode=" + CurEmp;
    }

    ajaxCall(qrystr, params, "post", responseOfLoadPlanner);
}

function responseOfLoadPlanner(data)
{
    try
    {
        glo_obj = new Object();
        IsChangeCount = new Object();
        if (data.response_code == "1000")
        {
            DisplayLoginPage();
            return;
        }
        if (data.response_type == 1001) // no data (empty)
        {
            $("#planStatusMsg").text('Planning Mode');
            $("#btnplanrequest").removeAttr('disabled');
            $("#btnsaveplan").removeAttr('disabled');
            //$("#btnplanapprove").attr('disabled', true);
            //$("#btnplanreject").attr('disabled', true);
            $("#btnplanrequest").attr('disabled', true);
            $("#planCommentMsg").text('');
            window.status = data.message;
            $("#iframeloading").hide();
            var fortnight = ($("#btnFortNight").attr('fortnight') == "0") ? '0' : '15';
            DisplayFirstDayBoxDefault(fortnight);
        }
        else
        {
            var message;
            try
            {
                message = $.parseJSON(data.gpdata4);
            }
            catch (e)
            {
                eval("message=" + data.gpdata4);
            }
            if (message.hasOwnProperty("PlanStatus"))
            {
                $("#btnsaveplan").attr('disabled', true);
                $("#btnplanrequest").attr('disabled', true);
                $("#btnplanapprove").removeAttr('disabled');
                $("#btnplanreject").removeAttr('disabled')
                $("#planCommentMsg").text('');
                configurePlannerStatus(message["PlanStatus"]);
                if (message["PlanComment"] != "")
                {
                    var plan_comm = message["PlanComment"];
                    plan_comm = convert_to_special_char(plan_comm);
                    $("#planCommentMsg").text(' (' + plan_comm + ')');
                }
            }

            RoutePlanObj = message["RouteInfo"];

            if (loginData.loggedusertype != "CSR")
                loadData(RoutePlanObj, message["CustList"]);
            else
                loadData(RoutePlanObj);
            $("#iframeloading").hide();
        }
    } catch (e)
    {
        DisplayMessage(e.message, true);
        $("#iframeloading").hide();
    }
}

function convert_to_special_char(str)
{
    str = str.replace(/&#123;/g, "{");
    str = str.replace(/&#125;/g, "}");
    str = str.replace(/&ldquo;/g, "\"");
    return str;
}

function configurePlannerStatus(pstatus)
{
    if (pstatus == 'saved')
    {
        $("#planStatusMsg").text('Planned');
        $("#btnplanrequest").removeAttr('disabled');
        $("#btnsaveplan").removeAttr('disabled');
        $("#btnplanapprove").attr('disabled', true);
        $("#btnplanreject").attr('disabled', true);
    }
    else if (pstatus == 'request')
    {
        $("#planStatusMsg").text('Request For Approval');
    }
    else if (pstatus == 'approved')
    {
        $("#planStatusMsg").text('Plan Approved');
        $("#btnsaveplan").removeAttr('disabled');
        $("#btnplanapprove").attr('disabled', true);
        $("#btnplanreject").attr('disabled', true);
    }
}

function loadData(RoutePlanObj, custList)
{

    if (custList)
        NonCSRList = custList;

    var newId = $("#monthPick").val() + "_" + $("#yearPick").val() + "_";
    var fortnight = ($("#btnFortNight").attr('fortnight') == "0") ? '0' : '15';
    var htm;
    var arr_date;
    for (var counter = 0; counter < RoutePlanObj.length; counter++)
    {
        htm = "";
        EmptyAllDealerCounts()

        var PlanDate = RoutePlanObj[counter].PlanDate;
        var day;
        arr_date = PlanDate.split('-');
        day = parseInt(arr_date[0], 10);
        var iDay = new Date(parseInt(arr_date[2]), $("#monthPick").val(), parseInt(day));
        var cust_list = RoutePlanObj[counter].CustomerId;


        glo_obj[newId + day] = cust_list;
        var customerList = loginData.CustomerList;
        var spli_arr;
        var dealer_code;
        var visit_type;
        var customer;
        for (var i = 0; i < cust_list.length; i++)
        {
            spli_arr = cust_list[i].split('_');
            dealer_code = spli_arr[1];
            visit_type = spli_arr[0];
            customer = GetCustomerBasedOnVisitType(visit_type, dealer_code, custList); //customerList[dealer_code]
            if (customer != null)
            {
                updateCount(parseInt(visit_type, 10), 1);
            }
            TotalCount = IHBSiteCount + InfluencerCount + ProjectCount + RakeCount + DealerCount + GodownCount + AreaCount + RetailerCount;
            if (day >= 16 && fortnight == "15")
            {
                var dId = day - 15;
                $('#day' + dId).text(window.day[iDay.getDay()] + "   " + iDay.getDate() + " [ " + TotalCount + " ]");
            }
            else if (day < 15 && fortnight == "0")
                $('#day' + day).text(window.day[iDay.getDay()] + "   " + iDay.getDate() + " [ " + TotalCount + " ]");

            updateHeaderCount(day)
        }
    }
    IsChangeCount = jQuery.extend({}, glo_obj);
    DisplayFirstDayBoxDefault(fortnight);
}

function GetCustomerBasedOnVisitType(visit_type, dealer_code, custList)
{
    var CustomerList;
    visit_type = parseInt(visit_type, 10);
    var Customer;
    switch (visit_type)
    {
        case 1:
            //Customer = FetchIHBSiteCustomerList(dealer_code,true);
            if (loginData.IHBSiteInfo && loginData.IHBSiteInfo.hasOwnProperty(dealer_code))
                Customer = loginData.IHBSiteInfo[dealer_code];
            break;
        case 3:
            if (loginData.GodownList && loginData.GodownList.hasOwnProperty(dealer_code))
                Customer = loginData.GodownList[dealer_code];
            break;
        case 4:
            if (loginData.ProjectList && loginData.ProjectList.hasOwnProperty(dealer_code))
                Customer = loginData.ProjectList[dealer_code];
            break;
        case 6:
            if (loginData.InfluencerList && loginData.InfluencerList.hasOwnProperty(dealer_code))
                Customer = loginData.InfluencerList[dealer_code];
            break;
        case 2:
            if (loginData.CustomerList && loginData.CustomerList.hasOwnProperty(dealer_code))
                Customer = loginData.CustomerList[dealer_code];
            break;
        case 7:
            if (loginData.AreaInfo && loginData.AreaInfo.hasOwnProperty(dealer_code))
                Customer = loginData.AreaInfo[dealer_code];
            break;
        case 8:
            if (loginData.RetailerVisit && loginData.RetailerVisit.hasOwnProperty(dealer_code))
                Customer = loginData.RetailerVisit[dealer_code];
            break;

    }
    if (Customer == null && custList != null)
    {
        if (custList.hasOwnProperty(dealer_code))
            Customer = custList[dealer_code];
    }
    return Customer;
}

function onforthNightChange(IsCallFromButton, IsInitialRendering, CurrentEmp)
{
    var iMonth = $("#monthPick").val();
    var iYear = $("#yearPick").val();
    var tDate = new Date(iYear, iMonth, 1);

    glo_obj_key = null;
    $('#daySchedule').html('');


    var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
				"Friday", "Saturday"];
    var iDay;

    var fortnightDay;
    if (IsCallFromButton)
    {
        if ($("#btnFortNight").attr('fortnight') == "0")
        {
            fortnightDay = '15';
            $("#btnFortNight").attr('src', 'assets/images/btn-second.png');
            $("#btnFortNight").attr('fortnight', '15');
        }
        else
        {
            fortnightDay = '0';
            $("#btnFortNight").attr('src', 'assets/images/btn-first.png');
            $("#btnFortNight").attr('fortnight', '0');
        }
    }
    else if (IsInitialRendering)
    {
        fortnightDay = ($("#btnFortNight").attr('fortnight') == "0") ? '0' : '15'
    }
    else
    {
        fortnightDay = ($("#btnFortNight").attr('fortnight') == "0") ? '0' : '15'
        glo_obj = new Object();// Make the object empty
    }

    if (fortnightDay == '0')
    {

        var j = 16;
        for (var i = 1; i <= 15; i++)
        {

            iDay = new Date(tDate.getFullYear(), tDate.getMonth(), i, 23,
						59, 59);

            var th = i;

            $('#day' + i).text(day[iDay.getDay()] + "   " + iDay.getDate() + " [0]");

            $("#plannerTable > div:nth-child(" + i + ")").attr("id", "th" + i);
            $('#day' + i).parent().css("display", "block");

            //setting holiday color @sanjay
            $('#day' + i).parent().removeClass('alert-holiday').removeClass('alert-lightgray');
            var hkey = iYear + "_" + (parseInt(iMonth) + 1) + "_" + iDay.getDate();
            if (Holidays(iDay))
            {
                $('#day' + i).parent().addClass('alert-holiday');
            }
            else
            {
                var dateTocompare = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
                var plannerDate = new Date(parseInt(iYear), iMonth, i);
                if (plannerDate < dateTocompare)
                    $("#day" + i).parent().removeClass("alert-info").addClass("alert-lightgray");
                else
                    $("#day" + i).parent().addClass("alert-info");
            }
            j++;
        }
        $('#day16').parent().css("display", "none");
    }
    if (fortnightDay == '15')
    {
        var tLastDay = new Date(tDate.getFullYear(), tDate.getMonth() + 1,
					0, 23, 59, 59);
        tLastDay = tLastDay.getDate();

        for (var i = 16; i <= tLastDay; i++)
        {
            iDay = new Date(tDate.getFullYear(), tDate.getMonth(), i, 23,
						59, 59);

            $('#day' + (i - 15)).text(
						day[iDay.getDay()] + "   " + iDay.getDate() + " [0]");

            $("#plannerTable > div:nth-child(" + (i - 15) + ")").attr("id", "th" + i);

            //setting holiday color @sanjay
            $('#day' + (i - 15)).parent().removeClass('alert-holiday').removeClass('alert-lightgray');

            if (Holidays(iDay))
            {
                $('#day' + (i - 15)).parent().addClass('alert-holiday');
            }
            else
            {
                var dateTocompare = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
                var plannerDate = new Date(parseInt(iYear), iMonth, i);
                if (plannerDate < dateTocompare)
                    $("#day" + (i - 15)).parent().removeClass("alert-info").addClass("alert-lightgray");
                else
                    $("#day" + (i - 15)).parent().addClass("alert-info");
            }
        }
        if (tLastDay < 31)
        {
            for (; i <= 31; i++)
            {
                $('#day' + (i - 15)).parent().css("display", "none");
            }
        }
        else
        {
            $('#day' + (tLastDay - 15)).parent().css("display", "block");
        }
    }

    DisplayFirstDayBoxDefault(fortnightDay);
    ClearHeaderCount();
    $("#catalog").find('#plannedOn').html('');

    if (IsCallFromButton == true)
        PreserveFortNightData();
    else
        LoadPlanner(CurrentEmp);

    //if (loginData.PlanStatus) //commented by rizwan.
    //    setPlanMode(iYear + "_" + (parseInt(iMonth) + 1));
    $("#iframeloading").hide();
}

function PreserveFortNightData()
{
    for (var obj in glo_obj)
    {
        var cur_day = obj.split('_')[2];
        if ($("#th" + cur_day).length == 1)
        {
            var cust_list = glo_obj[obj];
            var visittype = null;
            var dealer_id = null;
            EmptyAllDealerCounts();
            var customer;
            for (var i = 0; i < cust_list.length; i++)
            {
                visittype = cust_list[i].split('_')[0];
                dealer_id = cust_list[i].split('_')[1];

                customer = (curr_menu_item == "173") ? GetCustomerBasedOnVisitType(visittype, dealer_id, NonCSRList) : GetCustomerBasedOnVisitType(visittype, dealer_id);//customerList[dealer_code]
                if (customer != null || !IsVisitRightToCurrentUser(visittype))
                    updateCount(parseInt(visittype, 10), 1);
            }
            //for updating the total count of box
            TotalCount = IHBSiteCount + InfluencerCount + ProjectCount + RakeCount + DealerCount + GodownCount + AreaCount + RetailerCount;
            $("#th" + cur_day).find("span[id^=day]").html(updateTotalCount($("#th" + cur_day).find("span[id^=day]").html(), TotalCount));
            updateHeaderCount(cur_day);
        }
    }
}

function IsVisitRightToCurrentUser(visittype)
{
    var visit_id = loginData.loginInfo.visitid;
    var result = true;
    if (visit_id != null)
    {
        var spl_visit_id = visit_id.split(',');
        result = $.inArray(visittype, spl_visit_id) != -1 ? true : false;
    }
    return result;
}

//Displaying First Day Box By Default when planenr Changes
function DisplayFirstDayBoxDefault(fortnight)
{
    if (fortnight == "0")
        $("#th1").click();
    else
        $("#th16").click();

    $("#img_paste").attr("disabled", "disabled");
}

function fillVisitInfo()
{
    var htm;
    for (var i = 0; i < loginData.visitinfo.length; i++)
    {
        htm += '<option value =' + loginData.visitinfo[i].VisitId + '>' + loginData.visitinfo[i].VisitType + '</option>';
    }
    return htm;
}

/*@rizwan Filling the Route Combo */
function fillRouteCombo()
{
    var html = new Array();
    var visittype = $("#cmbVisitType").length == 0 ? (loginData.loggedusertype == "CSR" ? "1" : -1) : $("#cmbVisitType").val();
    var RouteList = null;
    if (loginData.loggedusertype == "CSR" || visittype == "1")
    {
        RouteList = PrepareUniqueList();

        for (var counter in RouteList)
        {
            html.push('<option name=' + counter
            + ' value=' + RouteList[counter].AreaId + '> ' + RouteList[counter].AreaName + '</option>');
        }
    }
    else if (visittype == "2" || visittype == "8")
    {
        RouteList = loginData.RouteInfo;
        for (var counter = 0; counter < RouteList.length; counter++)
        {
            html.push('<option name=' + RouteList[counter].SalesGroupCode
            + ' value=' + RouteList[counter].SalesGroupCode + '> ' + RouteList[counter].SalesGroupName + ' (' + RouteList[counter].Description + ') </option>');
        }
    }
    return html.join('');
}

function PrepareUniqueList()
{
    loginData.IHBSiteInfo
    var obj;
    var final_obj = new Object();
    for (var key in loginData.IHBSiteInfo)
    {
        if (!final_obj.hasOwnProperty(loginData.IHBSiteInfo[key].AreaId))
        {
            obj = new Object();
            obj.AreaId = loginData.IHBSiteInfo[key].AreaId;
            obj.AreaName = loginData.IHBSiteInfo[key].AreaName;
            final_obj[loginData.IHBSiteInfo[key].AreaId] = obj;
        }
    }
    return final_obj;
}

function visitTypeChange(evt, type)
{
    var visitType = $("#cmbVisitType").val();
    if (type != null && type.length > 0)
        visitType = type;
    var List;
    var spn_dlr_srch = "Dealer";
    switch (visitType)
    {
        case "6": /* influencer lead visit */
            $("#routeInfo").hide();
            List = loginData.InfluencerList;
            DisplayList(6, List);
            spn_dlr_srch = "Influencer"
            break;
        case "4": /* Project visit */
            $("#routeInfo").hide();
            List = loginData.ProjectList;
            DisplayList(4, List);
            spn_dlr_srch = "Project"
            break;
        case "2": /* Dealer visit */
        case "8": /* Retailer Visit*/
            $("#routeInfo").html(fillRouteCombo());
            $("#routeInfo").show();
            $("#catalog").html(routeChange(visitType));
            break;
        case "1": /* IHBSite Visit */
            $("#routeInfo").html(fillRouteCombo());
            $("#routeInfo").show();
            $("#catalog").html(routeChange("1"));
            spn_dlr_srch = "IHBSite"
            break
        case "7": /* Project visit */
            $("#routeInfo").hide();
            List = loginData.AreaInfo;
            DisplayList(7, List);
            spn_dlr_srch = "Area"
            break;
        case "3": /* Project visit */
            $("#routeInfo").hide();
            List = loginData.GodownList;
            DisplayList(3, List);
            spn_dlr_srch = "Godown"
            break;
    }
    $("#spn_dlr_srch").html(spn_dlr_srch);
    ManagePlannerDesign();

    $("#ddl_srch").val("");
}
function DisplayList(type, List)
{
    var html = "";
    loginData.customer_search_source = null;
    for (var curCustomer in List)
    {
        var customer = List[curCustomer];

        html += '<div><div class="round"> <img  src="assets/images/round-active.png" alt=""/> </div>';
        html += ListCustomers(type, customer);

        html += '<span id="plannedOn"></span></h4> </div></div>';
    }
    $("#catalog").html(html);
    ProcessTypeAhead(type);
}
function ListCustomers(type, customer, isSearch)
{
    var htm = '';
    var obj = new Object();
    switch (type)
    {
        case 6:
        case "6":
            htm += '<div class="blue-box InfluencerVisit" onclick=scheduleCustomerByDay(this,"' + customer.LeadID + '","' + type + '")><h4 class="lin-he23">';
            htm += customer.LeadName + '</br>(' + customer.Name + ' / ' + customer.Contact1 + ') ';
            obj.id = customer.LeadID;
            obj.name = customer.LeadID + "_" + customer.LeadName;
            break;
        case 4:
        case "4":
            htm += '<div class="blue-box ProjectVisit" onclick=scheduleCustomerByDay(this,"' + customer.ProjectId + '","' + type + '")><h4 class="lin-he23">';
            /*--start Aadilkhan--*/
            var type_sector = "";
            if (customer.ProjectType != "")
                type_sector = '(' + customer.ProjectType + ')';
            if (customer.Sector != "")
                type_sector += '(' + customer.Sector + ')';
            /* -- end--*/
            htm += customer.Project + '</br>' + type_sector;//Modified by Aadilkhan
            //htm += customer.Project + '</br>(' + customer.ProjectType + ')(' + customer.Sector + ') ';
            obj.id = customer.ProjectId;
            obj.name = customer.ProjectId + "_" + customer.Project;
            break
        case 7:
        case "7":
            htm += '<div class="blue-box AreaVisit" onclick=scheduleCustomerByDay(this,"' + customer.AreaCode + '","' + type + '")><h4 class="lin-he23">';
            htm += customer.AreaName + '</br>(' + customer.AreaCode + ')';
            obj.id = customer.AreaCode;
            obj.name = customer.AreaCode + "_" + customer.AreaName;
            break
        case 3:
        case "3":
            htm += '<div class="blue-box GodownVisit" onclick=scheduleCustomerByDay(this,"' + customer.GodownId + '","' + type + '")><h4 class="lin-he23">';
            htm += customer.GodownName + '</br>(' + customer.GodownId + ')';
            obj.id = customer.GodownId;
            obj.name = customer.GodownId + "_" + customer.GodownName;
            break
    }
    if (loginData.customer_search_source == null)
        loginData.customer_search_source = new Array();

    if (!isSearch)
        loginData.customer_search_source.push(obj);
    return htm;
}
/*
type==null or 2 (DealerId = DealerId)
type==4 (DealerId = ProjectId)
type==6 (DealerId = LeadID)
type==1 (DealerId = IHBSiteId)
*/
function scheduleCustomerByDay(evt, DealerId, type)
{
    if (!($('#daySchedule').attr('IsDisable') == "true"))
    {
        type = parseInt(type, 10);
        var customerFound = $("#daySchedule").find("div[value='" + DealerId + "_" + type + "']");
        if (customerFound.length == 0)
        {
            var customerList = GetCustomerListBasedOnType(type);
            if (customerList == null && NonCSRList.hasOwnProperty(DealerId))
                customerList = NonCSRList;

            AddCustomerInDayPlanner(customerList, type, DealerId);

            my_day_cust_list.push(type + '_' + DealerId);// push visitType_DealerId to identify whether the dealer is influencer/IHBSite/Dealer/Godown/Rack/Project etc.

            UpdatePlannerCount(type, 1);
        }
    }
    else
    {
        DisplayMessage("Planner With past dates and pending approval can't be modified..");
    }
}

function GetCustomerListBasedOnType(type)
{
    var customerList = null;
    if (type == 2)
        customerList = loginData.CustomerList;
    else if (type == 1)
        customerList = GenerateIHBCustomerList(1, true);
    else if (type == 6)
        customerList = loginData.InfluencerList;
    else if (type == 4)
        customerList = loginData.ProjectList;
    else if (type == 7)
        customerList = loginData.AreaInfo;
    else if (type == 8)
        customerList = loginData.RetailerVisit;
    else if (type == 3)
        customerList = loginData.GodownList;

    return customerList;
}

function UpdatePlannerCount(type, update_cnt)
{
    //Add in to Global Key for Save 
    glo_obj[glo_obj_key] = my_day_cust_list;

    updateCount(type, update_cnt);
    TotalCount = IHBSiteCount + InfluencerCount + ProjectCount + RakeCount + DealerCount + GodownCount + AreaCount + RetailerCount;

    //for updating the total count of box
    $("#day" + boxId).html(updateTotalCount($("#day" + boxId).html(), TotalCount));
    updateHeaderCount(glo_obj_key.split('_')[2]);
    $("#daySchedule").find("#SelectedDay").html(updateTotalCount($("#daySchedule").find("#SelectedDay").html(), TotalCount));
}

function AddCustomerInDayPlanner(customerList, type, DealerId)
{
    if (type == 1)
    {
        for (var i = 0; i < customerList.length; i++)
        {
            if (customerList[i].IHBSiteId == DealerId)
            {
                RenderDaySchedule(customerList[i], type, DealerId);
                return;
            }
        }
    }

    if (customerList.hasOwnProperty(DealerId))
    {
        var customer = customerList[DealerId];
        RenderDaySchedule(customer, type, DealerId);
    }
}

function RenderDaySchedule(customer, type, DealerId)
{
    var htm = '';
    htm += PlaceCustomerInPlanner(customer, type);
    htm += '<div class="pull-right marg-top-3"><a href="#"> <img onclick="removeCustPlanner(this);deleteCustomerFromList(\'' + DealerId + '\',' + type + ')" class="dlt-store" src="assets/images/close-icon-red-small.png"> </a> </div>';
    htm += '</div>';
    $("#daySchedule").append(htm);
}

function deleteCustomerFromList(DealerId, VisitType)
{
    if ($("#daySchedule").attr('isdisable') == "true")
        return;

    var cur_customer = GetCustomerBasedOnVisitType(VisitType, DealerId)

    if (cur_customer != null && cur_customer.visitStatus == "1" && cur_customer.visitDate == $("#SelectedDay").attr("SelectedDate"))
        return;

    var itemtoRemove = VisitType + '_' + DealerId;
    var removeIndx = $.inArray(itemtoRemove, my_day_cust_list);

    my_day_cust_list.splice(removeIndx, 1);

    UpdatePlannerCount(VisitType, -1);
}

function PlaceCustomerInPlanner(customer, type)
{
    var htm = '';
    htm += FindCustomerBasedOnVisitType(customer, type);
    return htm;
}

function FindCustomerBasedOnVisitType(customer, type)
{
    var htm = '';
    var id, name;
    var disable_cls = "";
    if (customer != null && customer.visitStatus == "1" && customer.visitDate == $("#SelectedDay").attr("SelectedDate"))
    {       
        disable_cls = " disableSingleDealer";
    }
    switch (type)
    {
        case 1:
            id = customer.IHBSiteId;
            name = customer.IHBSiteName;
            if (id == null)
            {
                id = customer.DealerId;
                name = customer.DealerName;
            }
            htm += '<div class="alert alert-text1 alert-success plannerdealer ' + disable_cls + ' IHBSiteVisit padd-top-btm10" value="' + id + "_" + type + '" role="alert">';
            htm += '<span class="font13">' + name + '</span>';
            break;
        case 2:
        case 8:
            var cls = "DealerVisit";
            if (type == 8)
                cls = "RetailerVisit"
            htm += '<div class="alert alert-text1 alert-success plannerdealer ' + cls + ' ' + disable_cls + ' padd-top-btm10" value="' + customer.DealerId + "_" + type + '" role="alert">';
            htm += '<span class="font13">' + customer.DealerName + '</span>';
            break;
        case 6:
            id = customer.LeadID;
            name = customer.LeadName;
            if (id == null)
            {
                id = customer.DealerId;
                name = customer.DealerName;
            }
            htm += '<div class="alert alert-text1 alert-success plannerdealer ' + disable_cls + ' InfluencerVisit padd-top-btm10" value="' + id + "_" + type + '" role="alert">';
            htm += '<span class="font13">' + name + '</span>';
            break;
        case 4:
            id = customer.ProjectId;
            name = customer.Project;
            if (id == null)
            {
                id = customer.DealerId;
                name = customer.DealerName;
            }
            htm += '<div class="alert alert-text1 alert-success plannerdealer ' + disable_cls + ' ProjectVisit padd-top-btm10" value="' + id + "_" + type + '" role="alert">';
            htm += '<span class="font13">' + name + '</span>';
            break;
        case 7:
            id = customer.AreaCode;
            name = customer.AreaName;
            if (id == null)
            {
                id = customer.DealerId;
                name = customer.DealerName;
            }
            htm += '<div class="alert alert-text1 alert-success plannerdealer ' + disable_cls + ' AreaVisit padd-top-btm10" value="' + id + "_" + type + '" role="alert">';
            htm += '<span class="font13">' + name + '</span>';
            break;
        case 3:
            id = customer.GodownId;
            name = customer.GodownName;
            if (id == null)
            {
                id = customer.DealerId;
                name = customer.DealerName;
            }
            htm += '<div class="alert alert-text1 alert-success plannerdealer ' + disable_cls + ' GodownVisit padd-top-btm10" value="' + id + "_" + type + '" role="alert">';
            htm += '<span class="font13">' + name + '</span>';
            break;
    }
    return htm;
}

function removeCustPlanner(evt)
{
    if ($("#daySchedule").attr('isDisable') != "true")
    {
        if ($(evt).closest("div.alert-text1").hasClass("disableSingleDealer"))
            return;

        $(evt).closest("div").parent().remove();
    }
}

/* update (add/delete)  planner count */
function updateCount(VisitType, ValueToUpdate)
{
    switch (VisitType)
    {
        case 1:
            IHBSiteCount = IHBSiteCount + ValueToUpdate;
            break;
        case 2:
            DealerCount = DealerCount + ValueToUpdate;
            break;
        case 3:
            GodownCount = GodownCount + ValueToUpdate;
            break;
        case 4:
            ProjectCount = ProjectCount + ValueToUpdate;
            break;
        case 5:
            RakeCount = RakeCount + ValueToUpdate;
            break;
        case 6:
            InfluencerCount = InfluencerCount + ValueToUpdate;
            break;
        case 7:
            AreaCount = AreaCount + ValueToUpdate;
            break
        case 8:
            RetailerCount = RetailerCount + ValueToUpdate;
            break;
    }
}

function updateTotalCount(htm, totalCount)
{
    var idx = htm.indexOf('[');
    var idx1 = htm.indexOf(']');
    var cur_value = htm.substr(idx + 1, idx1 - idx - 1);
    var rep_value = htm.replace("[" + cur_value + "]", "[" + totalCount + "]");
    return rep_value;
}

//if color count > 0 or customer is available then show and set it's value on header else hide 
function updateHeaderCount(curDay)
{
    (DealerCount > 0) ? $("#th" + curDay).find('#DealerVisit').text(' ' + DealerCount + ' ').show() : $("#th" + curDay).find('#DealerVisit').hide();
    (IHBSiteCount > 0) ? $("#th" + curDay).find('#IHBSiteVisit').text(' ' + IHBSiteCount + ' ').show() : $("#th" + curDay).find('#IHBSiteVisit').hide();
    (InfluencerCount > 0) ? $("#th" + curDay).find('#InfluencerVisit').text(' ' + InfluencerCount + ' ').show() : $("#th" + curDay).find('#InfluencerVisit').hide();
    (GodownCount > 0) ? $("#th" + curDay).find('#GodownVisit').text(' ' + GodownCount + ' ').show() : $("#th" + curDay).find('#GodownVisit').hide();
    (ProjectCount > 0) ? $("#th" + curDay).find('#ProjectVisit').text(' ' + ProjectCount + ' ').show() : $("#th" + curDay).find('#ProjectVisit').hide();
    (RakeCount > 0) ? $("#th" + curDay).find('#RakeVisit').text(' ' + RakeCount + ' ').show() : $("#th" + curDay).find('#RakeVisit').hide();
    (AreaCount > 0) ? $("#th" + curDay).find('#AreaVisit').text(' ' + AreaCount + ' ').show() : $("#th" + curDay).find('#AreaVisit').hide();
    (RetailerCount > 0) ? $("#th" + curDay).find('#RetailerVisit').text(' ' + RetailerCount + ' ').show() : $("#th" + curDay).find('#RetailerVisit').hide();
}

function ClearHeaderCount()
{
    $("#plannerTable #DealerVisit").hide();
    $("#plannerTable #IHBSiteVisit").hide();
    $("#plannerTable #InfluencerVisit").hide();
    $("#plannerTable #GodownVisit").hide();
    $("#plannerTable #ProjectVisit").hide();
    $("#plannerTable #RakeVisit").hide();
    $("#plannerTable #AreaVisit").hide();
    $("#plannerTable #RetailerVisit").hide();
}

function SaveRoutePlan()
{
    if (JSON.stringify(IsChangeCount) === JSON.stringify(glo_obj))
    {
        DisplayMessage("No Data Available To Save.");
        return;
    }
    var PlanCount = Object.size(glo_obj);
    var tloc = "?cmd=Prism_SaveRoutePlan&RoutePlanQid=21&PlanDateQid=18&PlanCustomerMapQid=15";
    var params;
    params = generateData();

    var PlanMonth = parseInt($("#monthPick").val(), 10) + 1;
    var year = $("#yearPick").val();

    var plannerKey = year + "_" + PlanMonth;
    var plannerObject = new Object();
    var IsDeletePlanner = false;
    if (params.RoutePlanInfo && params.RoutePlanInfo.length == 0)
    {
        if (loginData.PlanStatus.hasOwnProperty(plannerKey) && loginData.PlanStatus[plannerKey].PlanStatus == "saved")
        {
            tloc = tloc + "&IsDeletePlanner=true";
            IsDeletePlanner = true;
            delete loginData.PlanStatus[plannerKey];
            setPlanMode(plannerKey);
        }
        else
        {
            DisplayMessage("No Data Available To Save..");
            return;
        }
    }

    if ((!loginData.PlanStatus.hasOwnProperty(plannerKey) && !IsDeletePlanner) || (loginData.PlanStatus.hasOwnProperty(plannerKey) && checkPlanStatus(plannerKey, params)))//&& loginData.PlanStatus[plannerKey].PlanStatus != "approved"
    {

        plannerObject["PlanStatus"] = "saved";
        plannerObject["pkey"] = plannerKey;
        loginData.PlanStatus[plannerKey] = plannerObject;

        setPlanMode(plannerKey);
    }
    else
    {
        tloc = tloc + "&IsChangeStatus=false";
    }
    ajaxCall(tloc, params, "post", routeplanSaved);
}

function checkPlanStatus(plannerKey, params)
{
    var result = true;
    if (loginData.PlanStatus[plannerKey].PlanStatus == "approved")
    {
        var RoutePlanInfo = params.RoutePlanInfo;
        var change_count;
        var today_csr_visit = new Array();
        for (var i = 0; i < RoutePlanInfo.length; i++)
        {
            change_count = ReturnExistingCustList(RoutePlanInfo[i]);
            var customer_ids = RoutePlanInfo[i].CustomerId;
            var iDay = ReturnDateObj(RoutePlanInfo[i].PlanDate);
            for (var j = 0; j < customer_ids.length; j++)
            {
                var split_obj = customer_ids[j].split("_");

                if (iDay - new Date().setHours(0, 0, 0, 0) == 0 && split_obj[0] == "1")
                {
                    today_csr_visit.push(customer_ids[j]);
                }

                if ($.inArray(customer_ids[j], change_count) >= 0)
                    continue;


                if (split_obj[0] == "1")
                    result = false;
                else
                    return true;

            }
        }
        if (result == false && today_csr_visit.length > 0)
        {
            UpdateTodaysVisit(today_csr_visit);
        }
    }

    return result;
}

function ReturnExistingCustList(RoutePlanInfo)
{
    var plan_date = RoutePlanInfo.PlanDate
    var day = parseInt(plan_date.split("-")[0], 10);
    var year = parseInt(plan_date.split("-")[2], 10);
    var fort_night = $("#btnFortNight").attr('fortnight');
    /*var key1 = "0_" + year + "_" + day
    var key2 = "1_" + year + "_" + day
    if (IsChangeCount.hasOwnProperty(key1))
        return IsChangeCount[key1];
    else if(IsChangeCount.hasOwnProperty(key2))
        return IsChangeCount[key2];*/

    var key = parseInt($("#monthPick").val(), 10) + "_" + year + "_" + day;
    if (IsChangeCount.hasOwnProperty(key))
        return IsChangeCount[key];
    else
        return new Array();

}

function UpdateTodaysVisit(today_csr_visit)
{
    var obj;
    var final_obj = new Object();
    for (var i = 0; i < today_csr_visit.length; i++)
    {
        obj = new Object();
        var split_obj = today_csr_visit[i].split("_");
        obj.CustomerType = split_obj[0];
        obj.CustomerId = split_obj[1];
        if (loginData.IHBSiteInfo != null && loginData.IHBSiteInfo.hasOwnProperty(split_obj[1]))
            obj.AreaId = loginData.IHBSiteInfo[split_obj[1]].AreaId;

        final_obj[split_obj[1]] = obj;
        //final_obj.IHBSiteID = split_obj[1];
    }
    loginData.TodayCSRVisitPlan = final_obj;
}

function ReturnDateObj(dat_obj)
{
    var MonthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var split_obj = dat_obj.split("-");
    var day = parseInt(split_obj[0], 10);
    var mon = parseInt(MonthArray.indexOf(split_obj[1]));
    var year = parseInt(split_obj[2]);

    var dt = new Date(year, mon, day);
    return dt;
}

function routeplanSaved(data)
{
    ShowDialog("dialog-message", data.message, null, data);
}

function generateData()
{
    var PlanMonth = eval($("#monthPick").val()) + 1;
    var PlannerData = new plannerData(PlanMonth, $("#yearPick").val());

    var year = $("#yearPick").val();
    var month = $("#monthPick").val();
    var newId = month + "_" + year + "_";
    var plannerKey = year + "_" + PlanMonth;
    for (var i = 1; i <= 31; i++)
    {
        var cust_list = new Array();
        var cust_list = glo_obj[newId + i];
        if (cust_list == null || $.trim(cust_list).length == 0)
            continue;

        var day = "0  " + i
        var PlanDate = GeneratePlanDate(day, PlanMonth, year);
        if (cust_list.length > 0)
            PlannerData.addPlan(PlanDate, cust_list);
    }
    return PlannerData;
}

function plannerData(planMonth, planYear)
{
    this["PlanMonth"] = planMonth;
    this["PlanYear"] = planYear;
    this["RoutePlanInfo"] = new Array();
}

plannerData.prototype.addPlan = function (planDate, customerIDs)
{

    var dayplan = new Object();
    dayplan["PlanDate"] = planDate;
    if ($.isArray(customerIDs))
    {
        dayplan["CustomerId"] = customerIDs;
    }
    else
    {
        dayplan["CustomerId"] = [];
    }
    this["RoutePlanInfo"].push(dayplan);
}

function PlanAction(evt)
{
    var cmd = $(evt.currentTarget).attr('id') || $(evt.srcElement).attr('id');
    var comment_label = (cmd == "btnplanrequest") ? "Planner Comment" : (cmd == "btnplanapprove" ? "Approver Comment" : (cmd == "btnplanreject" ? "Plan Reject Comment" : "Planner Comment"));
    var plannerCommentHTML = '<div><form class="form-horizontal"> <div> <label class="lbl_planner_comment">' + comment_label + '</label> <textarea cols="50" rows="3" id="plannerComment" style="font-size: 13px;"></textarea> </div> </form> </div>';

    var form_html = '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">X</button><h4 id="lblHeader" class="modal-title">Message</h4></div><div class="modal-body"></div><div class="modal-footer"><button class="btn" data-dismiss="modal" aria-hidden="true" onclick=PlanActionOK("' + cmd + '")>OK</button> <button class="btn"  aria-hidden="true" onclick="CloseMe(\'custDetail1\')"> Cancel </button></div>';

    /* @Aadilkhan */
    var f_width = $(window).width() / 2;
    /* end */

    $("#custDetail1").html(form_html).css("width",f_width+"px");//--width added by Aadilkhan
    $("#custDetail1 #lblHeader").html("Add Comment");
    $("#custDetail1 .modal-body").html(plannerCommentHTML);
    $("#custDetail1").modal('show');
}

function PlanActionOK(cmd)
{
    var iMonth = parseInt($("#monthPick").val()) + 1;
    var iYear = $("#yearPick").val();

    var PStatus = "";
    var qrystr = "?cmd=Prism_SetPlanStatus";
    var params = new Object();
    var plannerKey = iYear + "_" + iMonth;
    params["plannerkey"] = plannerKey;
    params["pComment"] = $("#plannerComment").val();
    params["EmpCode"] = loginData.loginInfo.EmpCode;

    if (cmd == "btnplanrequest")
    {
        PStatus = "request";
        params["calltype"] = "requestForApproval";
        params["PStatus"] = PStatus;
    }
    else if (cmd == "btnplanapprove")
    {
        if (loginData.SeniorPlanKey && loginData.SeniorPlanKey.hasOwnProperty(plannerKey))
        {
            params["plannerId"] = loginData.SeniorPlanKey[plannerKey];
        }
        PStatus = "approved";
        params["PStatus"] = PStatus;
        params["calltype"] = "sentForApproval";
    }
    else if (cmd == "btnplanreject")
    {
        if (loginData.SeniorPlanKey && loginData.SeniorPlanKey.hasOwnProperty(plannerKey))
        {
            params["plannerId"] = loginData.SeniorPlanKey[plannerKey];
        }
        params["calltype"] = "sentForReject";
        PStatus = "saved";
        params["PStatus"] = PStatus;
    }
    ajaxCall(qrystr, params, "post", messageAfterPlannerAction);
}

function messageAfterPlannerAction(response)
{
    if (response.response_code == "0")
    {
        var plannerObject = new Object();
        var params = JSON.parse(response.gpdata4);
        if (params["plannerkey"])
            plannerObject["Id"] = params["plannerkey"];
        plannerObject["PlanStatus"] = params["PStatus"];
        plannerObject["PlanComment"] = params["pComment"];
        var plannerKey = params["plannerkey"];
        plannerObject["pkey"] = plannerKey;
        loginData.PlanStatus[plannerKey] = plannerObject;
        setPlanMode(plannerKey);

        if (params.PStatus == "approved" || params.PStatus == "saved")
        {
            $("#planToDisplay").find("div[id='" + params.plannerId + "']").parent().remove();
            for (var i = 0; i < loginData.EmpPlanList.length; i++)
            {
                if (loginData.EmpPlanList[i].Id == params.plannerId)
                {
                    loginData.EmpPlanList.splice(i, 1);
                }
            }
        }
    }
    else
        response.message = "Network Error..Incomplete Action...";


    ShowDialog("dialog-message", response.message);
}

//setting Planner Mode(Planned, Request , Approved etc..)
function setPlanMode(planKey)
{
    if (loginData.PlanStatus.hasOwnProperty(planKey))
    {
        $("#btnsaveplan").attr('disabled', true);
        $("#btnplanrequest").attr('disabled', true);
        $("#btnplanapprove").removeAttr('disabled');
        $("#btnplanreject").removeAttr('disabled')
        $("#planCommentMsg").text('');

        configurePlannerStatus(loginData.PlanStatus[planKey].PlanStatus);

        if (loginData.PlanStatus[planKey].PlanComment && loginData.PlanStatus[planKey].PlanComment != "")
        {
            $("#planCommentMsg").text(' (' + loginData.PlanStatus[planKey].PlanComment + ')');
        }
    }
    else
    {
        $("#planStatusMsg").text('Planning Mode');
        $("#btnplanrequest").removeAttr('disabled');
        $("#btnsaveplan").removeAttr('disabled');
        $("#btnplanapprove").attr('disabled', true);
        $("#btnplanreject").attr('disabled', true);
        $("#btnplanrequest").attr('disabled', true);
        $("#planCommentMsg").text('');
    }
}

// getting CSR list which plan needed to approve/reject
function getFsoListHTML(palnnerHTML)
{
    var EmpPlanList = loginData.EmpPlanList;
    if (EmpPlanList)
    {
        var html = palnnerHTML;
        html.push('<div id="products" class="col-xs-12 blue-bg">');
        html.push('<div id="planViewApproveOption"><div class="filter-bg"><span><input type="radio" id="approvePlan" class="margin-right-5" name="planRadio" onclick="ManageViewPlanData(this)" checked>Approve Plan </span> <span><input id="viewPlan" name="planRadio" onclick="ManageViewPlanData(this)" type="radio" class="margin-right-5"> View Plan </span> </div></div>');
        html.push('<div id="planToDisplay" class="white-bg padd-left8 col-xs-12 Leftblockheight">');
        html.push(planToApproveHTML(EmpPlanList));
        html.push('</div>');
        html.push('</div>');
    }
}

//Get HTML To Approve Plan Of CSR
function planToApproveHTML(EmpPlanList)
{
    var planHTML = new Array();

    for (var counter = 0; counter < EmpPlanList.length; counter++)
    {
        planHTML.push('<div><div class="round"><img alt="" src="assets/images/round-active.png"> </div> <div class="blue-box" onclick="fsoPlanChanged(this)" userType="' + EmpPlanList[counter].UserType + '" pkey=' + EmpPlanList[counter].pkey + ' id=' + EmpPlanList[counter].Id + ' value=' + EmpPlanList[counter].EmpCode + '> <h4 class="lin-he23"><p> ' + EmpPlanList[counter].EmpName + '</p><p>year:' + EmpPlanList[counter].PlanYear + ', month:' + EmpPlanList[counter].PlanMonth + '</p></h4></div></div>');
    }

    return planHTML.join('');
}

function SetSeniorPlanData()
{
    if (loginData.EmpPlanList.length > 0)
        $("#planToDisplay").find("div[id='" + loginData.EmpPlanList[0].Id + "']").click();
    else
    {
        $("#viewPlan").click();
    }

    $("#monthPick").attr("disabled", true);
    $("#yearPick").attr("disabled", true);

}

function fsoPlanChanged(ele)
{
    $(ele).parent().parent().find(".blue-box").removeClass("selected-menu");
    $(ele).parent().find(".blue-box").addClass("selected-menu");

    var pkey_arr = $(ele).attr('pkey').split('_');
    $("#monthPick").val(parseInt(pkey_arr[1]) - 1);
    $("#yearPick").val(pkey_arr[0]);

    $("#btnFortNight").attr('src', 'assets/images/btn-first.png');
    $("#btnFortNight").attr('fortnight', '0');

    loginData.SeniorPlanKey = new Object();
    loginData.SeniorPlanKey[$(ele).attr('pkey')] = $(ele).attr('id');

    onforthNightChange(null, true, $(ele).attr("value"));

}

function CopyCustomer(a, boxno)
{

    copy_customer_list = $("#daySchedule .plannerdealer").clone();

    if (copy_customer_list.length == 0)
        ShowDialog("dialog-message", "No Customer To Copy ", null, null);
    else
    {
        ShowDialog("dialog-message", "Customer Copied Successfully ", null, null);

        $("#img_paste").attr("disabled", false);
        $("#img_copy").attr("disabled", "disabled");

        var iMonth = parseInt($("#monthPick").val()) + 1;
        var iYear = $("#yearPick").val();
        var fortnightDay = $("#btnFortNight").attr('fortnight');

        copy_from_box = iMonth + "_" + iYear + "_" + fortnightDay + "_" + boxno;
    }
}

function PasteCustomer(a, boxno)
{

    var mon = parseInt($("#monthPick").val())
    var iMonth = mon + 1;
    var iYear = $("#yearPick").val();
    var fortnightDay = $("#btnFortNight").attr('fortnight');
    var plan_key = mon + "_" + iYear + "_" + boxno;
    if ((copy_from_box == iMonth + "_" + iYear + "_" + fortnightDay + "_" + boxno) && glo_obj.hasOwnProperty(plan_key) && glo_obj[plan_key].length >0)
    {
        ShowDialog("dialog-message", "Cannot Paste Same Customer in Same Plan ", null, null);
    }
    else
    {
        if (copy_customer_list && copy_customer_list.length == 0)
        {
            ShowDialog("dialog-message", "There are no customers to paste ", null, null);
        }
        else if ($("#daySchedule").length > 0 && $("#daySchedule").attr("isDisable") == "true")
        {
            ShowDialog("dialog-message", "Cannot be pasted in disabled planner", null, null);
        }
        else
        {
            //var d = boxno.split('_')[2];            
            var d = boxno;
            var fort_night = parseInt($("#btnFortNight").attr('fortnight'), 10);
            var final_day = d;
            if (fort_night == 15)
                final_day = d + fort_night;

            var insertHTML = "";
            copy_customer_list.each(function ()
            {
                if ($("#daySchedule").find('div[value="' + $(this).attr("value") + '"]').length == 0)
                {
                    var value = $(this).attr("value");
                    var id = value.split('_')[0];
                    var type = parseInt(value.split('_')[1]);
                    my_day_cust_list.push(type + '_' + id);// push visitType_DealerId to identify whether the dealer is influencer/IHBSite/Dealer/Godown/Rack/Project etc.
                    UpdatePlannerCount(type, 1);
                    var htm = '';
                    /* @Aadilkhan --remove disable class from visits */
                    $(this)[0].className = ($(this)[0].className.indexOf("disableSingleDealer") != -1) ? $(this)[0].className.replace("disableSingleDealer", "") : $(this)[0].className;
                    $(this)[0].className = ($(this)[0].className.indexOf("disablePlannerDiv") != -1) ? $(this)[0].className.replace("disablePlannerDiv", "") : $(this)[0].className;                    
                    /* end */
                    htm += '<div class="' + $(this)[0].className + '" value="' + id + "_" + type + '" role="alert">';
                    htm += '<span class="font13">' + $(this).find('span').text() + '</span>';
                    htm += '<div class="pull-right marg-top-3"><a href="#"> <img onclick="removeCustPlanner(this);deleteCustomerFromList(\'' + id + '\',' + type + ')" class="margin-top-5" src="assets/images/close-icon-red-small.png"> </a> </div></div>';
                    $("#daySchedule").append(htm);
                }
            });
        }
    }
}
function showLegend()
{
    var msg = '';
    msg += '<div class="marbot10"><span class="DealerVisit headerCount"  style="display: inline;"></span><span class="mar-left10"> Dealer Visit </span> </div>'
    msg += '<div class="marbot10"><span class="IHBSiteVisit headerCount"  style="display: inline;"></span><span class="mar-left10"> IHBSite Visit </span> </div>'
    msg += '<div class="marbot10"><span class="InfluencerVisit headerCount"  style="display: inline;"></span><span class="mar-left10"> Influencer Lead Visit </span> </div>'
    msg += '<div class="marbot10"><span class="ProjectVisit headerCount"  style="display: inline;"></span><span class="mar-left10"> Project Visit </span> </div>'
    msg += '<div class="marbot10"><span class="AreaVisit headerCount"  style="display: inline;"></span><span class="mar-left10"> Area Visit </span> </div>'
    msg += '<div class="marbot10"><span class="RetailerVisit headerCount"  style="display: inline;"></span><span class="mar-left10"> Retailer Visit </span> </div>'
    msg += '<div class="marbot10"><span class="GodownVisit headerCount"  style="display: inline;"></span><span class="mar-left10"> Godown Visit </span> </div>'

    ShowDialog("dialog-message", msg, "ResizeDialogToOriginal()", null, null, null, "Legend");
    $("#dialog-message").css({ "height": "370px", "width": "250px" })
}
function ResizeDialogToOriginal()
{
    $("#dialog-message").css({ "height": "200px", "width": "600px" });
}
function ManageViewPlanData(el)
{
    if ($(el).attr('id') == "approvePlan")
    {
        $("#planToDisplay").html(planToApproveHTML(loginData.EmpPlanList));
        if (loginData.EmpPlanList.length > 0)
        {
            /* --added By Aadilkhan -- */
            $("#btnplanapprove").removeAttr("disabled");
            $("#btnplanreject").removeAttr("disabled");
            /* -- End -- */

            $("#planToDisplay").find("div[id='" + loginData.EmpPlanList[0].Id + "']").click();
        }
        else
            onforthNightChange(null, null, "-1");

    }
    else
    {
        /* --added By Aadilkhan -- */
        $("#btnplanapprove").attr("disabled", 'disabled');
        $("#btnplanreject").attr("disabled", 'disabled');
        /* -- End -- */

        $("#planToDisplay").html(planToViewHTML(loginData.EmpList));
        if (loginData.EmpList.length > 0)
            $("#planToDisplay").find("div[id='" + loginData.EmpList[0].EmpCode + "']").click();
        else
            onforthNightChange(null, null, "-1");
    }

    $("#monthPick").attr("disabled", true);
    $("#yearPick").attr("disabled", true);
}
function planToViewHTML(EmpList)
{
    var planHTML = new Array();
    planHTML.push("<div id='fsoViewInfo'>")
    var EmpList = loginData.EmpList;
    for (var counter = 0; counter < EmpList.length; counter++)
    {
        planHTML.push('<div><div class="round"><img alt="" src="assets/images/round-active.png"> </div> <div class="blue-box" onclick="fsoViewChanged(this)" userType="' + EmpList[counter].UserType + '" id=' + EmpList[counter].EmpCode + ' value=' + EmpList[counter].EmpCode + '> <h4 class="lin-he23"><p> ' + EmpList[counter].EmpName + '</p></h4></div></div>');
    }
    planHTML.push("</div>")
    return planHTML.join('');
}
function fsoViewChanged(ele)
{
    //$("#fsoViewInfo").find("li").removeClass('plannerSelected');
    //$(ele).addClass('plannerSelected');
    $(ele).parent().parent().find(".blue-box").removeClass("selected-menu");
    $(ele).parent().find(".blue-box").addClass("selected-menu");

    $("#btnplanapprove").attr("disabled", 'disabled');
    $("#btnplanreject").attr("disabled", 'disabled');
    $("#monthPick").attr("disabled", 'disabled');
    $("#yearPick").attr("disabled", 'disabled');

    onforthNightChange(null, true, $(ele).attr("value"));
    //$("#monthPick").attr("disabled", false);
    //$("#yearPick").attr("disabled", false);

    //$("#daySchedule li.plannerdealer").remove();
}