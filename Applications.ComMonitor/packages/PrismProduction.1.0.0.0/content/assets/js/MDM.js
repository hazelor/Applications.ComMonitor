
//var mdm_more_operations = "<div id='more_operation' style='float:right'><button title='Send Configuration Details' class='mdm_more_btns' onclick='ConfigurationDetails()'> <div class='ConfigurationDetails' ></div> </button><button title='Remote Install Apps' class='mdm_more_btns' onclick='RemoteInstall()'> <div class='RemoteInstall' ></div> </button><button title='Remote Uninstall Apps' class='mdm_more_btns' onclick='RemoteUninstallFromAllDevices()'> <div class='RemoteUninstall' ></div> </button><button title='Get Device Location' class='mdm_more_btns' onclick='DeviceLocation()'> <div class='DeviceLocation' ></div> </button><button title='Get Application List' class='mdm_more_btns' onclick='ApplicationList()'> <div class='ApplicationList' ></div> </button><button title='Send Accessible Applications' class='mdm_more_btns' onclick='AccessibleAps()'> <div class='AccessibleAps' ></div> </button><button title='Send Accessible Website' class='mdm_more_btns' onclick='AccessibleWebsite()'> <div class='AccessibleWebsite' ></div> </button><button title='Get GPS Status' class='mdm_more_btns' onclick='GetGPSStatus()'> <div class='GetGPSStatus' ></div> </button><button title='Enable GPS Remotely' class='mdm_more_btns' onclick='EnableGPSRemotely()'> <div class='EnableGPSRemotely' ></div> </button><button title='View Device Location' class='mdm_more_btns' onclick='ViewDeviceLocation()'> <div class='ViewDeviceLocation' ></div> </button></div>";


var mdm_more_operations = "<div id='more_operation' style='margin-top:5px;float: left;'> <select id='more_select' class='DataTD' onchange='PerformMDMOperations()'> <option></option><option value='SendConfigurationDetails'> Send Configuration Details </option><option value='RemoteInstallApps'> Remote Install Apps </option><option value='RemoteUnInstallApps'> Remote Uninstall Apps </option><option value='GetDeviceLocation'> Get Device Location </option><option value='GetApplicationList'> Get Application List </option><option value='SendAccessibleApplications'> Send Accessible Applications </option><option value='SendAccessibleWebsite'> Send Accessible Website </option><option value='GetGPSStatus'> Get GPS Status </option><option value='EnableGPSRemotely'> Enable GPS Remotely </option><option value='GetBrowseHistory'> Get Browse History </option><option value='ViewDeviceLocation'> View Device Location </option> </select> </div>";

function UploadRemoteInstalledApps()
{
    var btnobj = new Object();
    btnobj["Upload"] = function ()
    {
        RemoteInstalledApps();
    };
    return (btnobj);
}

function RemoteInstalledApps()
{
    var fname = $("#myform_ApplicationName").val();
    upLoadClick("myform_Path", "MDMResources/InstalledApps", fname, ".apk", "File");
}

function StatusClicked(isLocked, deviceId)
{
    var lock_unlock;
    if (isLocked)
        lock_unlock = "Unlocked"
    else if (!isLocked)
        lock_unlock = "Locked";

    var msg = "Are you sure you want to " + lock_unlock.substr(0, lock_unlock.length - 2) + " the device ?";

    var options = "";
    if (lock_unlock == "Locked")
    {
        options += "<option value=1>Device misuse</option><option value=2>Device lost</option>";
    }
    else
    {
        options += "<option value=3>Device found</option><option value=4>Warning given</option>";
    }
    options += "<option value=5>Blank</option>";

    msg += "<br /><br /><div>Reason Code : <select id='ddlReasonCode' class='DataTD'>" + options + "</select></div>";
    //ConfirmDialog("dialog-message", msg, "LockUnLock('" + lock_unlock + "','" + deviceId + "')",null,null,null,null,true);
    ShowDialog("dialog-message1", msg, "LockUnLock('" + lock_unlock + "','" + deviceId + "')", null, null, null, null, null, null, null, 230);
}

function LockUnLock(LockUnlock, deviceId)
{
    var params = new Object();
    var qrystr = "?cmd=Prism_MDM_LockUnlockDevice";
    params["DeviceID"] = deviceId;
    params["Command"] = LockUnlock;
    params["NoOfAttempts"] = "0";
    params["ReasonCode"] = $('#ddlReasonCode').val();

    ajaxCall(qrystr, params, "post", LockUnlockStatus);
}

function LockUnlockStatus(retStr)
{
    var result = $.parseJSON(retStr.gpdata4);
    DisplayMessage("Command send to selected devices. Status = Awaited");

    sessionStorage.setItem("totalLockUnlockCall", 0);
    var myVar = setInterval(function ()
    {
        var params = new Object();
        var qrystr = "?cmd=Prism_MDM_CurrentDeviceStatus";
        params["DeviceID"] = result.DeviceID;
        ajaxCall(qrystr, params, "post", CurrentDeviceStatus);

        var total_calls_count = sessionStorage.getItem("totalLockUnlockCall");
        if (total_calls_count >= 3) // it will make maximum 4 calls to check the updated status of the device.
            clearInterval(myVar);
        else
        {
            total_calls_count = parseInt(total_calls_count, 10) + 1;
            sessionStorage.setItem("totalLockUnlockCall", total_calls_count);
        }

    }, 2500);

    function CurrentDeviceStatus(returnStr)
    {
        var subResult = $.parseJSON(returnStr.gpdata4);
        switch (subResult[0].Status)
        {
            case "1":
                DisplayMessage("Screen Locked Successfully");
                clearInterval(myVar);
                //menuClick(14);
                getData(178, GetLookupOfCurrentScreen(178));
                break;
            case "2":
                DisplayMessage("Screen Unlocked Successfully");
                clearInterval(myVar);
                //menuClick(14);
                getData(178, GetLookupOfCurrentScreen(178));
                break;
            case "3":
                DisplayMessage("Screen is in an Awaited Mode.");
        }
    }
}

function VisibleMoreOnDevice(evt)
{
    $("#div_ch1z").css("display", "none");
    var push_div = $("#ptable_wrapper").find(".toolbar");
    if ((evt.checked == true || $(evt).closest("tr").siblings().find("input[type=checkbox]").attr("checked") == "checked") && push_div.find("#more_operation").length == 0)
    {
        if (push_div.length > 0)
        {
            push_div.append(mdm_more_operations);
        }
        return;
    }

    if (evt.checked == false && push_div.find("#more_operation").length > 0)
    {
        var removeHtml = true;
        $(evt).closest("tr").siblings().find("input[type=checkbox]").each(function ()
        {
            if (this.checked == true)
            {
                removeHtml = false;
                return false;
            }
        });

        if (removeHtml)
        {
            push_div.find("#more_operation").remove();
        }
    }
}

function ConfigurationDetails()
{
    //ConfirmDialog("dialog-message", "Are you sure you want to send configuration details to the selected devices ?", "ProcessMDMDeviceMore('Configuration Details', 2)",null,null,null,null,true);

    var msg = "Are you sure you want to send configuration details to the selected devices ?";
    ShowDialog("dialog-message1", msg, "ProcessMDMDeviceMore('Configuration Details', 2)");
}

function GetBrowseHistory()
{
    //ConfirmDialog("dialog-message", "Are you sure you want to get the Browse History of the selected devices ?", "ProcessMDMDeviceMore('Browse History', 17)", null, null, null, null, true);

    var msg = "Are you sure you want to get the Browse History of the selected devices ?";
    ShowDialog("dialog-message1", msg, "ProcessMDMDeviceMore('Browse History', 17)");
}

function RemoteInstall()
{
    var qrystr = "?cmd=Prism_MDM_RemoteInstallApps";
    var params = new Object();
    params["cmd"] = "Prism_MDM_RemoteInstallApps";
    ajaxCall(qrystr, params, "post", RemoteInstallSuccess);
}

function RemoteInstallSuccess(retStr)
{
    var result = $.parseJSON(retStr.gpdata4);
    var msg = "Please select the Application to install in the selected devices ";
    msg += "<br /><br /><div><select id='ddlRemoteInstalledApps' multiple size='7' class='DataTD'>";
    $.each(result, function (key, value)
    {
        msg += "<option value='" + value["Path"] + "'>" + value["ApplicationName"] + "</option>";
    });

    msg += "</select></div>";

    //ConfirmDialog("dialog-message", msg, "RemoteInstallOK()",null,null,null,null,true);
    ShowDialog("dialog-message1", msg, "RemoteInstallOK()", null, null, null, null, null, null, null, 350);
}

function RemoteInstallOK()
{
    ProcessMDMDeviceMore("Remote Install", 11, $("#ddlRemoteInstalledApps").val());
}

function DeviceLocation()
{
    //ConfirmDialog("dialog-message", "Are you sure you want to get device location details of the selected devices ?", "ProcessMDMDeviceMore('GetDeviceLocation', 5)", null, null, null, null, true);
    var msg = "Are you sure you want to get device location details of the selected devices ?";
    ShowDialog("dialog-message1", msg, "ProcessMDMDeviceMore('GetDeviceLocation', 5)");
}

function RemoteUninstall(DeviceID)
{
    var qrystr = "?cmd=Prism_MDM_RemoteUnInstallApps";
    var params = new Object();
    params["cmd"] = "Prism_MDM_RemoteUnInstallApps";
    params["DeviceID"] = DeviceID;
    ajaxCall(qrystr, params, "post", RemoteUnInstallSuccess);
}

function RemoteUnInstallSuccess(retStr)
{
    var result = $.parseJSON(retStr.gpdata4);
    if (IsJson(result))
        result = $.parseJSON(result)

    var customData = result.custom_data;
    var msg = "Please select the Application to un-install from the selected devices ";
    msg += "<br /><br /><div><select id='ddlRemoteUnInstalledApps' class='DataTD' multiple size='7'>";
    $.each(result.applist, function (key, value)
    {
        msg += "<option value='" + value["ApplicationPackage"] + "'>" + value["ApplicationName"] + "</option>";
    });

    msg += "</select></div>";

    //ConfirmDialog("dialog-message", msg, "RemoteUnInstallOK('"+customData.DeviceID+"')", null, null, null, null, true);
    ShowDialog("dialog-message1", msg, "RemoteUnInstallOK('" + customData.DeviceID + "')", null, null, null, null, null, null, null, 350);
}

function RemoteUnInstallOK(DeviceID)
{
    if ($("#ddlRemoteUnInstalledApps").val() != null && $("#ddlRemoteUnInstalledApps").val().length > 0)
        ProcessMDMDeviceMore("Remote Uninstall", 12, $("#ddlRemoteUnInstalledApps").val(), DeviceID);
    else
        DisplayMessage("Please select one of the application from given list to uninstall");
}

function GetGPSStatus()
{
    //ConfirmDialog("dialog-message", "Are you sure you want to get GPS status of the selected devices ?", "ProcessMDMDeviceMore('Get GPS Status', 13)", null, null, null, null, true);
    var msg = "Are you sure you want to get GPS status of the selected devices ?";
    ShowDialog("dialog-message1", msg, "ProcessMDMDeviceMore('Get GPS Status', 13)");
}
function EnableGPSRemotely()
{
    //ConfirmDialog("dialog-message", "Are you sure you want to enable GPS of the selected devices ?", "ProcessMDMDeviceMore('Remotely Enable GPS', 14)",null,null,null,null,true);
    var msg = "Are you sure you want to enable GPS of the selected devices ?";
    ShowDialog("dialog-message1", msg, "ProcessMDMDeviceMore('Remotely Enable GPS', 14)");
}
function ApplicationList()
{
    //ConfirmDialog("dialog-message", "Are you sure you want to get installed application list of the selected devices ?", "ProcessMDMDeviceMore('Update Application List', 4)", null, null, null, null, true);
    var msg = "Are you sure you want to get installed application list of the selected devices ?";
    ShowDialog("dialog-message1", msg, "ProcessMDMDeviceMore('Update Application List', 4)");
}

function AccessibleAps()
{
    //ConfirmDialog("dialog-message", "Are you sure you want to send accessible aps to the selected devices ?", "ProcessMDMDeviceMore('Get Accessible Apps', 3)", null, null, null, null, true);
    var msg = "Are you sure you want to send accessible aps to the selected devices ?";
    ShowDialog("dialog-message1", msg, "ProcessMDMDeviceMore('Get Accessible Apps', 3)");
}
function AccessibleWebsite()
{
    //ConfirmDialog("dialog-message", "Are you sure you want to send accessible websites to the selected devices ?", "ProcessMDMDeviceMore('Get Accessible Website', 6)", null, null, null, null, true);
    var msg = "Are you sure you want to send accessible websites to the selected devices ?";
    ShowDialog("dialog-message1", msg, "ProcessMDMDeviceMore('Get Accessible Website', 6)");
}
function ProcessMDMDeviceMore(Command, ActivityCode, AppName, DeviceID)
{
    var params = new Object();
    var qrystr = "?cmd=Prism_MDM_DeviceMore";
    params["DeviceID"] = SelectedDeviceIDList().join(',');
    params["Command"] = Command;
    params["NoOfAttempts"] = "0";
    params["ActivityCode"] = ActivityCode;
    if (AppName != null && AppName.length > 0)
    {
        if (typeof AppName == "object")
            params["ApplicationName"] = AppName.join(',');
        else if (typeof AppName == "string")
            params["ApplicationName"] = AppName;
        else
            params["ApplicationName"] = AppName;
    }

    if (DeviceID != null && DeviceID.length > 0)
        params["DeviceID"] = DeviceID;

    ajaxCall(qrystr, params, "post", ProcessMDMDeviceMoreSuccess);
}

function ProcessMDMDeviceMoreSuccess(retStr)
{
    var result = $.parseJSON(retStr.gpdata4);
    var ActivityCode = result["ActivityCode"];

    DisplayMessageBasedOnActivityCode(ActivityCode);
    sessionStorage.setItem("totalCurrentMDMOperationStatusCall", 0);
    var myVar = setInterval(function ()
    {
        var params = new Object();
        var qrystr = "?cmd=Prism_MDM_CurrentMDMOperationStatus";
        params["DeviceID"] = result.DeviceID;
        if (result.ActivityCode == "12")
            result.ActivityCode = "16";
        if (result.ActivityCode == "11")
            result.ActivityCode = "15";

        params["ActivityCode"] = result.ActivityCode;
        params["TCount"] = result.TCount;
        ajaxCall(qrystr, params, "post", CurrentDeviceOperationStatus);

        var total_calls_count = sessionStorage.getItem("totalCurrentMDMOperationStatusCall");
        if (total_calls_count > 5) // it will make maximum 6 calls to check the updated status of the device.
            clearInterval(myVar);
        else
        {
            total_calls_count = parseInt(total_calls_count, 10) + 1;
            sessionStorage.setItem("totalCurrentMDMOperationStatusCall", total_calls_count);
        }
    }, 2500);

    function CurrentDeviceOperationStatus(returnStr)
    {
        var subResult = $.parseJSON(returnStr.gpdata4);
        if (subResult.RequestReceived == "true")
        {
            var msg;
            switch (subResult.ActivityCode)
            {
                case "2":
                    msg = "Send Configuration details request received by device '" + subResult.DeviceID + "'";
                    break;
                case "3":
                    msg = "Accessible Applications are received by the device '" + subResult.DeviceID + "'";
                    break;
                case "4":
                    msg = "Installed Applications are received by the device '" + subResult.DeviceID + "'";
                    break;
                case "5":
                    msg = "Device Location information is forwarded by the device '" + subResult.DeviceID + "'";
                    break
                case "6":
                    msg = "Accessible Websites are received by the device '" + subResult.DeviceID + "'";
                    break;
                case "15":
                    msg = "Application is installed successfully in the device '" + subResult.DeviceID + "'";
                    break;
                case "16":
                    msg = "Application is uninstalled successfully from the device '" + subResult.DeviceID + "'";
                    break;
                case "13":
                    msg = "GPS Status is forwarded by the device '" + subResult.DeviceID + "'";
                    getData(178, GetLookupOfCurrentScreen(178));
                    break;
                case "14":
                    msg = "Command to Enable GPS Remotely is received by the device '" + subResult.DeviceID + "'";
                    break;
                case "17":
                    msg = "Command to get Browse History is received by the device '" + subResult.DeviceID + "'";
                    break;
            }
            DisplayMessage(msg);
            clearInterval(myVar);
        }
    }
}

function DisplayMessageBasedOnActivityCode(ActivityCode)
{
    var msg;
    switch (ActivityCode)
    {
        case "2":
            msg = "Command send to device. Configuration details will be forwarded to the selected devices";
            break
        case "3":
            msg = "Accessible Applications will be forwarded to the selected devices";
            break;
        case "4":
            msg = "Installed applications will be received from the selected devices.";
            break;
        case "5":
            msg = "Request send for getting device location";
            break
        case "6":
            msg = "Accessible Websites will be forwarded to the selected devices";
            break;
        case "11":
            msg = "Command to install application remotely is forwarded to the selected devices";
            break;
        case "12":
            msg = "Command to Un-install application remotely is forwarded to the selected devices";
            break;
        case "13":
            msg = "Command to Get GPS Status is forwarded to the selected devices";
            break;
        case "14":
            msg = "Command to Enable GPS Remotely is forwarded to the selected devices";
            break;
        case "17":
            msg = "Command to get the Browse History is forwarded to the selected devices";
            break;

    }
    DisplayMessage(msg);
}

function SelectedDeviceIDList()
{
    var device_id_list = new Array();
    $("#ptable[qid='178'] >tbody tr").each(function ()
    {
        if ($(this).find("input[type=checkbox]")[0].checked == true)
        {
            device_id_list.push($.trim($(this).find(".link").html()));
        }
        else
            return true;
    });

    return device_id_list;
}

function DisplayLocationPoints(retObj)
{

    var ReportData = new Object();
    if (JSON.parse(retObj.gpdata4).length > 0)
        ReportData = JSON.parse(retObj.gpdata4);

    var getCurrentPosition;

    if (ReportData.length > 0)
    {
        var setLan = parseFloat(ReportData[0].latitude).toFixed(2);
        var setLon = parseFloat(ReportData[0].longitude).toFixed(2);
    }

    /* @Aadilkhan - added if lat and long will be null */
    if (setLan == undefined || setLon == undefined)
    {
        $("#custDetail").modal("hide");
        DisplayMessage("Device location not found..");
        return;
    }
    /* end */

    var map = L.map('div_mapdraw').setView([setLan, setLon], 10);
    var poly, circle, plat = 0, plng = 0;

    var compname, lat, longi, address, dealername, phone;



    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        unloadInvisibleTiles: true,
        updateWhenIdle: false,
        reuseTiles: true,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
    }).addTo(map);

    var LeafIcon = L.Icon.extend({
        options: {
            iconSize: [49, 41],
            popupAnchor: [0, -15]
        }
    });

    var blueIcon = new LeafIcon({ iconUrl: 'map\\marker-icon.png' }),
        redIcon = new LeafIcon({ iconUrl: 'map\\map_red.png' });

    var GpsLatLng = new Array();


    for (var key in ReportData)
    {

        if (key == "indexOf")
            continue;
        else
        {

            var nearestDealerObj = new Object();

            lat1 = ReportData[key].latitude;
            lng1 = ReportData[key].longitude;

            GpsLatLng.push(new L.LatLng(lat1, lng1));

            var label = ReportData[key].UserName;

            var time = ReportData[key].CreatedDate.substring(ReportData[key].CreatedDate.indexOf("T") + 1, ReportData[key].CreatedDate.lastIndexOf(":"));

            popUpText = '<br/><b>Employee Name : </b>' + ReportData[key].UserName + '<br/><b>Location : </b>' + (ReportData[key].latitude + "/" + ReportData[key].longitude) + '<br/><b>Date : </b>' + ReportData[key].CreatedDate + '</br><b>Time : </b>' + time + '</br>';
            L.marker([lat1, lng1], { icon: blueIcon }).bindLabel(label, { noHide: true }).addTo(map).bindPopup(popUpText).openPopup();
        }
    }
    //map.fitBounds(GpsLatLng, 10);
}

function ViewDeviceLocation()
{
    var dealermap = new Array();
    dealermap.push('<div id="div_mapdraw" style="height:500px;" >');
    dealermap.push('</div>');
    var d_width = $(window).width() - 100;
    var d_height = $(window).height() - 200;
    ShowDialog("custDetail", "", null, null, null, null, "Device Location", null, "Close", d_width, d_height)
    setTimeout(function () {
        $("#custDetail .modal-body").html(dealermap.join(''));
        $("#custDetail").removeClass("center_popup height250").addClass("center_popup_dealer");
        //$("#devmap").html(dealermap.join(''));
        //$("#devmap").dialog({
        //    modal: true,
        //    title: "Device Location",
        //    width: $(window).width() - 100,
        //    buttons: {

        //        CANCEL: function ()
        //        {
        //            $(this).dialog("close");
        //            return;
        //        }
        //    }
        //});
        //$('#devmap').dialog('open');

        var myDeviceIds = SelectedDeviceIDList();
        var deviceList = "";
        for (var i = 0; i < myDeviceIds.length; i++) {
            if (deviceList.length > 0)
                deviceList += ",'" + myDeviceIds[i] + "'";
            else
                deviceList = "'" + myDeviceIds[i] + "'";
        }


        var params = new Object();
        var qrystr = "?cmd=Prism_GetDeviceLocation";
        params["DeviceIds"] = deviceList;
        $("#iframeloading").show();
        ajaxCall(qrystr, params, "post", DisplayLocationPoints);
    }, 200);
}

function GetDeviceLocationNotTracedSince2Hour(cellValue, options, rowdata, qid)
{
    return "<div style='text-align:center;cursor:pointer' onclick=\"GetLocationOfDeviceNotTracedSinceTwoHour('" + rowdata["Latitude"] + "','" + rowdata["Longitude"] + "','" + rowdata["DeviceID"] + "','" + rowdata["EmpName"] + "')\"><img src='MDMResources/css/images/NotTraceable.jpg'  /> </div>";
}

function GetLocationOfDeviceNotTracedSinceTwoHour(Latitude, Longitude, DeviceID, EmpName)
{
    var dealermap = new Array();
    dealermap.push('<div id="div_mapdraw" style="height:500px;" >');
    dealermap.push('</div>');
    $("#devmap").html(dealermap.join(''));
    $("#devmap").dialog({
        modal: true,
        title: "Device Location",
        width: $(window).width() - 100,
        buttons: {

            CANCEL: function ()
            {
                $(this).dialog("close");
                return;
            }
        }
    });
    $('#devmap').dialog('open');


    Latitude = parseFloat(Latitude).toFixed(2);
    Longitude = parseFloat(Longitude).toFixed(2);

    var map = L.map('div_mapdraw').setView([Latitude, Longitude], 10);
    var poly, circle, plat = 0, plng = 0;

    var compname, lat, longi, address, dealername, phone;

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        unloadInvisibleTiles: true,
        updateWhenIdle: false,
        reuseTiles: true,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
    }).addTo(map);

    var LeafIcon = L.Icon.extend({
        options: {
            iconSize: [49, 41],
            popupAnchor: [0, -15]
        }
    });

    var blueIcon = new LeafIcon({ iconUrl: 'map\\marker-icon.png' }),
        redIcon = new LeafIcon({ iconUrl: 'map\\map_red.png' });

    var GpsLatLng = new Array();

    var nearestDealerObj = new Object();

    lat1 = Latitude
    lng1 = Longitude

    GpsLatLng.push(new L.LatLng(lat1, lng1));

    var label = EmpName;

    popUpText = '<br/><b>Employee Name : </b>' + EmpName + '<br/><b>Location : </b>' + (Latitude + "/" + Longitude) + '<br/></br>';
    L.marker([lat1, lng1], { icon: blueIcon }).bindLabel(label, { noHide: true }).addTo(map).bindPopup(popUpText).openPopup();
}

function RemoteUnInstallFormatter(cellValue, options, rowdata, action)
{
    return "<div style='text-align:center;cursor:pointer' onclick=\"RemoteUninstall('" + rowdata["DeviceID"] + "')\"> <img src='MDMResources\\css\\images\\remote_uninstall.png'> </img> </div>";
}

function RemoteUnInstallChildFormatter(cellValue, options, rowdata, action)
{
    return "<div style='text-align:center;cursor:pointer' onclick=\"ProcessMDMDeviceMore('Remote Uninstall', 12,'" + rowdata["Application Package"] + "' ,'" + rowdata["DeviceID"] + "');\"> <img src='MDMResources\\css\\images\\remote_uninstall.png'> </img> </div>";
}

function ChangeUserTypeAndUserName(evt)
{
    var UserID = $("#parform_UserId").val();
    $("#parform_UserName").val(UserID);
}

function RemoteUninstallFromAllDevices()
{
    var qrystr = "?cmd=Prism_MDM_RemoteUnInstallApps";
    var params = new Object();
    params["DeviceID"] = SelectedDeviceIDList().join(',');
    params["isMultipleDevice"] = true;
    ajaxCall(qrystr, params, "post", RemoteUnInstallSuccess);
}

function PerformMDMOperations()
{
    var mdm_value = $("#more_select").val();
    switch (mdm_value)
    {
        case "SendConfigurationDetails":
            ConfigurationDetails();
            break;
        case "RemoteInstallApps":
            RemoteInstall();
            break;
        case "RemoteUnInstallApps":
            RemoteUninstallFromAllDevices();
            break;
        case "GetDeviceLocation":
            DeviceLocation()
            break;
        case "GetApplicationList":
            ApplicationList();
            break;
        case "SendAccessibleApplications":
            AccessibleAps();
            break;
        case "SendAccessibleWebsite":
            AccessibleWebsite();
            break;
        case "GetGPSStatus":
            GetGPSStatus();
            break;
        case "EnableGPSRemotely":
            EnableGPSRemotely();
            break;
        case "GetBrowseHistory":
            GetBrowseHistory();
            break;
        case "ViewDeviceLocation":
            ViewDeviceLocation();
            break;

    }
}

function MDM_DeleteAll()
{
    var htm = "<button id='btn_DeleteAll' title='Delete All' class='toolbar_btns' onclick=MDM_DeleteAll_Options()><div class='DeleteAll' ></div></button>";
    return htm;
}
function MDM_DeleteAll_Options()
{
    var msg = '<div style="width:50%;float:left"><input type="checkbox" class="leftcheckboxmargin" name="logactivity" value="2a">Device Unlock attempt with location<br /> <input type="checkbox" class="leftcheckboxmargin" name="logactivity" value="1a">Device Restarted <br /><input type="checkbox" class="leftcheckboxmargin" name="logactivity" value="3a">New application installed<br> <input type="checkbox" class="leftcheckboxmargin" name="logactivity" value="4a">Attempt to run restricted application <br /> <input type="checkbox" class="leftcheckboxmargin" name="logactivity" value="5a">Log application exceptions<br> <input type="checkbox" class="leftcheckboxmargin" name="logactivity" value="6a">Low battery <br /><input type="checkbox" class="leftcheckboxmargin" name="logactivity" value="1p">Lock device<br> <input type="checkbox" class="leftcheckboxmargin" name="logactivity" value="2p">Configuration Details <br /><input type="checkbox" class="leftcheckboxmargin" name="logactivity" value="3p">Get Accessible Apps<br> <input type="checkbox" class="leftcheckboxmargin" name="logactivity" value="4p">Update Application List <br /> <input type="checkbox" class="leftcheckboxmargin" name="logactivity" value="5p">GetDeviceLocation<br><input type="checkbox" class="leftcheckboxmargin" name="logactivity" value="17p">Get Browse History<br> </div><div style="width:50%;float:left"><input type="checkbox" class="leftcheckboxmargin" name="logactivity" value="7a">Password Change<br /> <input type="checkbox" class="leftcheckboxmargin" name="logactivity" value="8a">Device Shutdown Initiated <br /><input type="checkbox" class="leftcheckboxmargin" name="logactivity" value="9a">Sim Changed<br> <input type="checkbox" class="leftcheckboxmargin" name="logactivity" value="10p">Unlock Device <br /> <input type="checkbox" class="leftcheckboxmargin" name="logactivity" value="11a">Remote Install<br> <input type="checkbox" class="leftcheckboxmargin" name="logactivity" value="6p">Get Accessible Website <br /><input type="checkbox" class="leftcheckboxmargin" name="logactivity" value="12a">Remote Uninstall<br> <input type="checkbox" class="leftcheckboxmargin" name="logactivity" value="13p">Get GPS Status <br /><input type="checkbox" class="leftcheckboxmargin" name="logactivity" value="14p">Remotely Enable GPS<br> <input type="checkbox" class="leftcheckboxmargin" name="logactivity" value="15p">Successfully Install Remote Application <br /> <input type="checkbox" class="leftcheckboxmargin" name="logactivity" value="16p">Successful Uninstall Remote Application<br><input type="checkbox" class="leftcheckboxmargin" name="logactivity" value="7a">Enable Location Service<br> </div><br /><br /><br /><br /><div style="margin-top:3%;float:left"><span style="margin-right:5px;">From Date</span><input type="text" id="frmdatepicker"><span style="margin-left:25px;margin-right:5px">To Date</span><input type="text" id="todatepicker"><input style="margin-left:5px;" type="checkbox" name="logactivity" class="leftcheckboxmargin" onchange="ToggleDelete(this)" value="allp">All</div>';
    //ConfirmDialog("custom_html", msg, "DeleteFromActivityLog()", null, null, null, null, true, "MDM_ActivityLog_AddDatePicker()", "Delete all rows satisfying the below criteria ?", "50%", null, false);

    ShowDialog("custDetail", msg, "DeleteFromActivityLog()", null, null, null, "Delete all rows satisfying the below criteria ?");
}

function ToggleDelete(evt)
{
    if (evt.checked)
    {
        $("#custom_html").find("input[type='checkbox']").each(function ()
        {
            $(this).prop("checked", true);
        });
    }
    else
    {
        $("#custom_html").find("input[type='checkbox']").each(function ()
        {
            $(this).prop("checked", false);
        });
    }

}

function MDM_ActivityLog_AddDatePicker()
{
    $("#frmdatepicker").datepicker({
        changeMonth: true,
        changeYear: true,
        buttonImageOnly: true,
        numberOfMonths: 1,
        dateFormat: 'dd-mm-yy',
        showButtonPanel: true,
        closeText: 'Clear'
    });

    $("#todatepicker").datepicker({
        changeMonth: true,
        changeYear: true,
        buttonImageOnly: true,
        numberOfMonths: 1,
        dateFormat: 'dd-mm-yy',
        showButtonPanel: true,
        closeText: 'Clear'
    });
}

function DeleteFromActivityLog()
{
    var checked_arr = new Array();
    $("#custom_html").find("input[name='logactivity']").each(function ()
    {
        if ($(this).attr("checked") == "checked")
            checked_arr.push($(this).val());
    })
    if (checked_arr.length == 0)
    {
        DisplayMessage("Please select the options to delete");
        return;
    }
    var qrystr = "?cmd=Prism_MDM_ActivityLog_Delete";
    var params = new Object();
    params["DeviceID"] = headers[11].par_id;
    params["DelCondition"] = checked_arr.join(',');
    if ($("#frmdatepicker").val() != null && $("#frmdatepicker").val().length > 0)
        params["FromDate"] = ProcessDate("frmdatepicker");

    if ($("#todatepicker").val() != null && $("#todatepicker").val().length > 0)
        params["ToDate"] = ProcessDate("todatepicker");

    ajaxCall(qrystr, params, "post", ActivityLogDeleteSuccess);
}

function ActivityLogDeleteSuccess(retStr, qid)
{
    ShowDialog("dialog-message", retStr.gpdata4, null, null);
    var QueryID = 11;
    if (qid != null && $.isNumeric(qid))
        QueryID = qid;

    var fqheader = headers[QueryID];
    var page = (fqheader.jqgrid && fqheader.jqgrid.page) ? fqheader.jqgrid.page : 1;
    var paging_combo = (fqheader.LastPageComboSelectedVal) ? fqheader.LastPageComboSelectedVal : (fqheader.rownum ? fqheader.rownum : rowlist[0]);
    LoadPage(fqheader, "first", paging_combo, page);
}
function ProcessDate(DateId)
{
    var finalDate;
    var year = $("#" + DateId).datepicker("getDate").getFullYear();
    var month = $("#" + DateId).datepicker("getDate").getMonth() + 1;
    var day = $("#" + DateId).datepicker("getDate").getDate();

    if (day < 10)
    {
        day = "0" + day;
    }
    if (month < 10)
    {
        month = "0" + month;
    }
    finalDate = year + "-" + month + "-" + day;
    return finalDate;
}
function _MDM_DeleteAll(evt, qid)
{
    var htm = "<button id='btn_DeleteAll' title='Delete All' class='toolbar_btns' onclick=_MDM_DeleteAll_Records(" + qid + ")><div class='DeleteAll' ></div></button>";
    return htm;
}

function _MDM_DeleteAll_Records(qid)
{
    var msg = "Are you sure you want to delete all the records ?";
    //ConfirmDialog("dialog-message", msg, "MDM_DeleteAllRecords("+qid+",'"+headers[qid].par_id+"')", null, "YES", "NO", null, true,null,"Delete All Records");

    ShowDialog("dialog-message", msg, "MDM_DeleteAllRecords(" + qid + ",'" + headers[qid].par_id + "')", null, null, null, "Delete all Records", null, "YES");
}

function MDM_DeleteAllRecords(qid, DeviceID)
{
    var qrystr = "?cmd=Prism_MDM_DeleteAll";
    var params = new Object();
    params["DeviceID"] = DeviceID;
    params["Qid"] = qid;

    ajaxCall(qrystr, params, "post", MDM_DeleteAllSuccess);
}

function MDM_DeleteAllSuccess(retStr)
{
    var result = $.parseJSON(retStr.customData);
    ActivityLogDeleteSuccess(retStr, result.Qid);
}
function DisplayDeviceOptions(data, type, row, tobj)
{
    return '<a href="#" class="link" onclick=ProcessDeviceOptions("' + data + '")> ' + data + '</a>';
}
function RemoteUninstallImage(data, type, row, tobj)
{
    return '<img src="assets/images/remote_uninstall.png" class="lock_unlock" onclick=RemoteUninstall("' + row[2] + '")>';
}

function ProcessDeviceOptions(device_id)
{
    var htm = '<div id="div_buttons">';
    htm += '<input type="button" id="activity_log" value="Activity Log" onclick="MDMDeviceButtonClick(\'' + device_id + '\',' + 175 + ',2,4)" />';
    htm += '<input type="button" id="browse_history" value="Browse History" onclick="MDMDeviceButtonClick(\'' + device_id + '\',' + 176 + ',1,3)" />';
    htm += '<input type="button" id="device_tracking_detail" value="Device Tracking Details" onclick="MDMDeviceButtonClick(\'' + device_id + '\',' + 179 + ',1,4)" />';
    htm += '<input type="button" id="installed_app" value="Installed Applications" onclick="MDMDeviceButtonClick(\'' + device_id + '\',' + 180 + ',1,5)" />';
    htm += '</div><div id="cust_div"></div>';

    var d_width = $(window).width() - 200;
    var d_height = $(window).height() - 150;
    ShowDialog("custDetail1", htm, "ViewInformationMenuItem(this,'178','270')", null, null, null, "Device Info for device : " + device_id + "", null, null, d_width, d_height);
    $("#custDetail1").removeClass("height250 center_popup").addClass("center_popup_dealer");
}

/*fld_seq1 = appflds sequence of device_id
  fld_seq2 = appflds sequence of Created Date */
function MDMDeviceButtonClick(device_id, qid, fld_seq1, fld_seq2)
{

    /* -- start -- Aadilkhan -- */
    var DeviceId = $("#custDetail1").find("#lblHeader").text().split(':')[1] != null ? $("#custDetail1").find("#lblHeader").text().split(':')[1].trim() : null;
    if (device_id == null || device_id == undefined || device_id.length <= 0)
        device_id = DeviceId;
    if (fld_seq1 == undefined || fld_seq2 == undefined)
    {
        if (qid == "175")
        {
            fld_seq1 = 2; fld_seq2 = 4;
        }
        else if (qid == "176")
        {
            fld_seq1 = 1; fld_seq2 = 3;
        }
        else if (qid == "179")
        {
            fld_seq1 = 1; fld_seq2 = 4;
        }
        else if (qid == "180")
        {
            fld_seq1 = 1; fld_seq2 = 5;
        }
    }
    /* -- end -- */

    Headers[qid].render_div = 'cust_div';
    var srch_arr = new Array();
    var params = new Object();
    params["fld_idx"] = fld_seq1;
    params["op"] = "eq";
    params["val"] = device_id;
    params[fld_seq1] = device_id;
    srch_arr.push(params);

    params = new Object();
    params["fld_idx"] = fld_seq2;
    params["op"] = "ge";
    params["val"] = GetFormattedCurrentDate(0) + " 00:00:00";
    srch_arr.push(params);

    //params = new Object();
    //params["fld_idx"] = fld_seq2;
    //params["op"] = "le";
    //params["val"] = GetFormattedCurrentDate(1) + " 00:00:00";
    //srch_arr.push(params);

    if (qid == 180)
    {
        params = new Object();
        params["fld_idx"] = 9;
        params["op"] = "eq";
        params["val"] = 1;
        srch_arr.push(params);
    }
    getData(qid, GetLookupOfCurrentScreen(qid, true), srch_arr);
}

function SetDeviceID(qid)
{
    var header_title = $("#custDetail1 .modal-header #lblHeader").html();
    var spl_arr = header_title.split(":");
    var dev_id = null
    if (spl_arr.length == 2)
    {
        dev_id = $.trim(spl_arr[1]);
    }

    if (dev_id != null)
    {
        var suffix1 = null;
        var suffix2 = null;
        var dt = GetFormattedCurrentDate() + " 00:00:00" + " - " + GetFormattedCurrentDate() + " 00:00:00"
        switch (qid)
        {
            case 175:
                suffix1 = 2;
                suffix2 = 4;
                break;
            case 176:
                suffix1 = 1;
                suffix2 = 3;
                break;
            case 179:
                suffix1 = 1;
                suffix2 = 4;
                break;
            case 180:
                suffix1 = 1;
                suffix2 = 4;
                break;
        }
        if (suffix1 != null)
        {
            $("#sform_" + suffix1).attr("disabled", 'disabled').val(dev_id);
        }
        if (suffix2 != null)
        {
            $("#sform_" + suffix2).val(dt);
        }
        /* --start -- Aadilkhan -- */
        if(qid == "180")
            $("#sform_9").append("<option value='1' selected='selected'>YES</option>").attr("disabled", 'disabled');
        
        /* --end -- */
    }
}

/* --start  Aadilkhan-- */
function SetStatusImage(data, type, row, tobj)
{

    if (row[12] == "1")
    {
        return '<img src="assets/images/Lock.png" class="lock_unlock" onclick=StatusClicked(true,\"' + row[2] + '\") />';
    }
    else if (row[12] == "2" || row[12] == "3" || row[12] == "")
    {
        return '<img src="assets/images/Unlock.png" class="lock_unlock" onclick=StatusClicked(false,\"' + row[2] + '\") />';
    }
}

//function DeviceConfigPolicy(qid)
//{
//    var params = new Object();
//    params["cmd"] = "data";
//    params["qid"] = qid;

//    var response = CallServerMethod(params);

//    var qid_details = new Object();
//    gQid = new Object();
//    qid_details["data"] = response.gpdata1;
//    gQid[qid] = qid_details;

//    DrawFormInUpdateMode(0, qid);
//    $("#div_par").empty();
//}

function DeviceConfigPolicy(qid) {
   
    var qstr = "?cmd=data&qid=" + qid + "";
    ajaxCall(qstr, null, "get", successDeviceConfigPolicy);
    

   
}
function successDeviceConfigPolicy(retStr) {
    var qid_details = new Object();
    gQid = new Object();
    qid_details["data"] = retStr.gpdata1;
    gQid["177"] = qid_details;

    DrawFormInUpdateMode(0, 177);
    $("#div_par").empty();
}

function ReturnStatus(key)
{
    if (key == 1)
        return "Lock";
    else
        return "Unlock";
}

function LogtextColorChange(data, type, row, tobj)
{
    if (data.indexOf("restricted") != -1)
        return "<div style='color:red'>" + data + "</div>";
    else
        return data;
}
/* -- end -- */