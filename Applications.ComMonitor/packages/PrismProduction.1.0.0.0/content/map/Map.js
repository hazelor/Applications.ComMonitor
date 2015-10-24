function showDealerMap()
{

    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(storecurrentpositionandLoadMap, onGPSNotFound, { enableHighAccuracy: true, timeout: timeoutTime });
    else
    {
        ShowDialog("dialog-message", "GPS Functionality doesn't support by your current browser..", null, null, 30000);
    }
}

function onGPSNotFound()
{
    cur_lat = 0;
    cur_lon = 0;
    cur_accuracy = 0;
    //DisplayMessage(GPS_Not_Found_Message);
    ShowDialog("dialog-message1", GPS_Not_Found_Message, null, null, null, null, "GPS Not Found");
}

function storecurrentpositionandLoadMap(position)
{
    if (position !== undefined)
    {
        cur_lat = position.coords.latitude;
        cur_lon = position.coords.longitude;
        cur_accuracy = position.coords.accuracy;
        if (parseInt(cur_lat) != 0)
            ShowMap();
    }
    else
        alert('Unable to Load Map because of InValid Lat Lon..');
}

function ShowMap(lat,lon)
{
    var setLan;
    var setLon;
    if (lat != null && lon != null) {
        setLan = lat;
        setLon = lon;
    }
    else {
        setLan = cur_lat.toFixed(2);
        setLon = cur_lon.toFixed(2);
    }
     
   

    //$("#div_par").height('95%');
    $("#div_par").html('<div id="customermap"></div>');

    var map = L.map('customermap').setView([setLan, setLon], 10);

    var LeafIcon = L.Icon.extend({
        options: {
            iconSize: [49, 41],
            popupAnchor: [0, -15]
        }
    });

    var blueIcon = new LeafIcon({ iconUrl: 'map\\marker-icon.png' }),
        redIcon = new LeafIcon({ iconUrl: 'map\\map_red.png' });

    var TodayVisitPlan;    
    for (var i = 0; i < 7; i++)
    {
        TodayVisitPlan = ((i == 0) ? loginData.TodayCSRVisitPlan : ((i == 1) ? loginData.TodayDealerVisitPlan : ((i == 2) ? loginData.TodayInfluencerVisitPlan : ((i == 3) ? loginData.TodayProjectVisitPlan : ((i == 4) ? loginData.TodayAreaVisitPlan : ((i == 5) ? loginData.TodayRetailerVisitPlan : ((i == 6) ? loginData.TodayGodownVisitPlan : null)))))));

        if (TodayVisitPlan != null)
        {
            for (var key in TodayVisitPlan)
            {
                var cur_cust_obj = GetCurrCustomer(key, TodayVisitPlan[key].CustomerType);
                var curCustomer = cur_cust_obj.curCustomer;
                var visitStatus = curCustomer.hasOwnProperty("visitStatus") ? curCustomer["visitStatus"] : 0;
                var name = cur_cust_obj.name;
                var lat = curCustomer.hasOwnProperty("Lat") ? curCustomer["Lat"] : "";
                var lon = curCustomer.hasOwnProperty("Lon") ? curCustomer["Lon"] : "";

                if (visitStatus && visitStatus == 1 && lat.length > 0 && lon.length > 0)
                {
                    L.marker([lat, lon], { icon: blueIcon }).addTo(map)
                                    .bindPopup("<b>" + name);
                }
                else if (lat.toString().length > 0 && lon.toString().length > 0)
                {
                    L.marker([lat, lon], { icon: redIcon }).addTo(map)
                                    .bindPopup("<b>" + name);
                }
            }
        }
    }
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        unloadInvisibleTiles: true,
        updateWhenIdle: false,
        reuseTiles: true,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
    }).addTo(map);
}
function takeCustomerSign()
{
    var htmlstr = '<div id="customerSign" style="margin:10px">\
                    <div class="content_inner_left_head_das"><p>Customer Signature</p></div>\
                    <canvas id="signcanvas" class="pad" style="border: 2px solid #000000;background: #fff;"></canvas>\
                    <button id="save_id" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only btn action" onclick="saveCustomerSign()" value="Submit" ><span class="ui-button-text">Save</span></button>\
                    </div>';

    var $panel = $("#tpar");
    var pos = $panel.offset();
    $panel.html(htmlstr).css("height", "450px");
    var width = $(window).width() - pos.left; //24 is subtracted for vertical scroll bar
    var height = $(window).height() - pos.top - 24;
    var ocss = new Object();
    ocss.height = 400;
    if ($(window).width() > 1000)
        ocss.width = width - 120;

    $("#customerSign").show();
    $("#customerSign").css(ocss);
    $("#signcanvas").css(ocss);
    $canvas = $('#signcanvas');
    $canvas.attr({
        height: ocss.height,
        width: ocss.width
    });

    $('#customerSign').signaturePad({
        drawOnly: true,
        defaultAction: 'drawIt',
        validateFields: false,
        lineWidth: 0,
        output: null,
        sigNav: null,
        name: null,
        typed: null,
        clear: 'input[type=reset]',
        typeIt: null,
        drawIt: null,
        typeItDesc: null,
        drawItDesc: null,
        lineTop: 35
    });
}

function saveCustomerSign()
{
    $("#iframeloading").show();
    var canvas = document.getElementById("signcanvas");
    alert(canvas.toDataURL('image/png'));
    //var qrystr = "?cmd=saveSignature";
    //var params = new Object();
    //params["imageByte"] = canvas.toDataURL('image/png');
    //params["customerId"] = curCustomerInfo.DealerCode;
    //params["ClientTimeToCheck"] = new Date();
    //if (curCustomerInfo.curRouteDetailId)
    //    params["curRouteDetailId"] = curCustomerInfo.curRouteDetailId;

    //curCustomerInfo.custtype = custtype;
    //checkForNetworkAndCall();
    //ajaxLocalCall(qrystr, JSON.stringify(params), "post", signatureSaved, null, "visitSignature");

}


function showImageDialog()
{

    var htmlStr = '<div class="modal-header">\
                        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>\
                        <h4 class="modal-title" id="myModalLabel">Capture Image</h4>\
                      </div>';

    htmlStr += '<div class="modal-body">\
                        <form class="form-horizonta" data-bv-feedbackicons-valid="glyphicon glyphicon-ok" data-bv-feedbackicons-invalid="glyphicon glyphicon-remove" data-bv-feedbackicons-validating="glyphicon glyphicon-refresh">\
                            <div class="form-group"><video id="screenshot-stream" class="videostream" autoplay></video></div>\
                            <div class="form-group"><img id="screenshot" class="screenshot" src=""><canvas style="display:none;" id="screenshot-canvas"></canvas></div>\
                            <div class="form-group"><select id="camIDsources" ></select></div>\
                        </form></div>';
    htmlStr += '<div class="modal-footer">\
                      	<button type="button" class="btn btn-primary" onclick="">Capture</button>\
                        <button type="button" class="btn btn-primary" onclick="">Save</button>\
                        <button type="button" class="btn btn-default" data-dismiss="modal">CANCEL</button>\
                      </div>'

    //$("#captureImage").html(htmlStr);

    $("#myform .modal-content").html(htmlStr);
    $("#myform").modal('show');
    //$("#captureImage").dialog({
    //    title: 'Capture Image',
    //    modal: true,
    //    resizable: false,
    //    width: 'auto',
    //    close: function (event, ui) {
    //        if (activeStream) {
    //            activeStream.stop();
    //            activeStream = null;
    //        }
    //    },
    //    buttons: [{
    //        text: "Capture",
    //        click: function () {
    //            $("#myform_err").text('');
    //            if ($("#camIDsources option").length == 0) {
    //                $("#myform_err").text('Camera Device Not Found.');
    //                //DisplayMessage('Camera Device Not Found.');
    //                return;
    //            }
    //            snapshot();
    //        }
    //    },
    //{
    //    text: "Save",
    //    id: 'save_id',
    //    click: function () {
    //        $("#myform_err").text('');
    //        if ($("#camIDsources option").length == 0) {
    //            $("#myform_err").text('Camera Device Not Found.');
    //            //DisplayMessage('Camera Device Not Found.');
    //            return;
    //        }
    //        $(this).dialog("close");
    //        saveSnapshot($('#screenshot').attr("src"), IsShopPhoto, textBoxId, prefix);
    //    }
    //}, {
    //    text: "Cancel",
    //    id: 'cancel_id',
    //    click: function () {
    //        $(this).dialog("close");
    //    }
    //}]
    //});
    //$('#captureImage').dialog('open');
}

function snapshot()
{
    var canvas = document.getElementById("signcanvas");
    document.querySelector('#screenshot').src = canvas.toDataURL('image/png');
}

function saveSnapshot()
{

}