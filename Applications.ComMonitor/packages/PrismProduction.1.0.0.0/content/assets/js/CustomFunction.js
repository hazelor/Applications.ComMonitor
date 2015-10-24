

function changeOnIHBSiteStatus()
{

    if ($('#myform_9').val() != "2")
    {

        $('#myform_11').prop("disabled", "disabled").addClass("ui-state-highlight").val('');
        $('#myform_12').prop("disabled", "disabled").addClass("ui-state-highlight").val('');

    }
    else
    {
        $('#myform_11').prop("disabled", false).removeClass("ui-state-highlight");
        $('#myform_12').prop("disabled", false).removeClass("ui-state-highlight");
    }

    if ($('#myform_9').val() != "3")
    {
        $('#myform_13').prop("disabled", "disabled").addClass("ui-state-highlight").val('');
        $('#myform_14').prop("disabled", "disabled").addClass("ui-state-highlight").val('');
        $('#myform_15').prop("disabled", "disabled").addClass("ui-state-highlight").val('');
        $('#myform_16').prop("disabled", "disabled").addClass("ui-state-highlight");
        $('#myform_17').prop("disabled", "disabled").addClass("ui-state-highlight").val('');
        $('#myform_42').prop("disabled", "disabled").addClass("ui-state-highlight").val('');
        $("#tabs-64").children().find("li").eq(2).children().prop("disabled", true);
    }
    else
    {

        // if ($("#myform_16:checked").val() != "2")
        //{
        $('#myform_13').prop("disabled", false).removeClass("ui-state-highlight");
        $('#myform_14').prop("disabled", false).removeClass("ui-state-highlight");
        $('#myform_15').prop("disabled", false).removeClass("ui-state-highlight");
        $('#myform_16').prop("disabled", false).removeClass("ui-state-highlight");
        $('#myform_17').prop("disabled", false).removeClass("ui-state-highlight");
        $('#myform_42').prop("disabled", false).removeClass("ui-state-highlight");
        $("#tabs-64").children().find("li").eq(2).children().prop("disabled", false);
        //}
    }
    if ($('#myform_9').val() != "4")
    {

        $('#myform_18').prop("disabled", "disabled").addClass("ui-state-highlight");

    }
    else
    {
        $('#myform_18').prop("disabled", false).removeClass("ui-state-highlight");
    }

}
function changeQtyVerified()
{
    if ($('#myform_16:checked').val() == "2")
    {

        $('#myform_17').prop("disabled", "disabled").addClass("ui-state-highlight");

    }
    else
    {
        $('#myform_17').prop("disabled", false).removeClass("ui-state-highlight");
    }
}
//function changeMCVServices() {
//    if ($('#myform_26').val() != "5") {
//        $('#myform_27').prop("disabled", "disabled").addClass("ui-state-highlight");
//    } else {
//        $('#myform_27').prop("disabled", false).removeClass("ui-state-highlight");
//    }
//    if ($('#myform_26').val() != "4") {
//        $('#myform_28').prop("disabled", "disabled").addClass("ui-state-highlight");
//        $('#myform_29').prop("disabled", "disabled").addClass("ui-state-highlight");
//        $('#myform_30').prop("disabled", "disabled").addClass("ui-state-highlight");
//        $('#myform_31').prop("disabled", "disabled").addClass("ui-state-highlight");
//    } else {
//        $('#myform_28').prop("disabled", false).removeClass("ui-state-highlight");
//        $('#myform_29').prop("disabled", false).removeClass("ui-state-highlight");
//        $('#myform_30').prop("disabled", false).removeClass("ui-state-highlight");
//        $('#myform_31').prop("disabled", false).removeClass("ui-state-highlight");
//    }

//}
function IsMCVProvided()
{
    if ($('#myform_26:checked').val() == "2")
    {
        $('#myform_27').prop("disabled", "disabled").addClass("ui-state-highlight").val('');
        $('#myform_28').prop("disabled", "disabled").addClass("ui-state-highlight").val('');
        $('#myform_29').prop("disabled", "disabled").addClass("ui-state-highlight").val('');
        $('#myform_30').prop("disabled", "disabled").addClass("ui-state-highlight").val('');
        $('#myform_31').prop("disabled", "disabled").addClass("ui-state-highlight").val('');
    } else
    {
        $('#myform_28').prop("disabled", false).removeClass("ui-state-highlight");
        $('#myform_29').prop("disabled", false).removeClass("ui-state-highlight");
        $('#myform_30').prop("disabled", false).removeClass("ui-state-highlight");
        $('#myform_31').prop("disabled", false).removeClass("ui-state-highlight");
        $('#myform_27').prop("disabled", false).removeClass("ui-state-highlight");
    }
}
function changeLeakages()
{
    if ($('#myform_27:checked').val() == "2")
    {
        $('#myform_28').prop("disabled", "disabled").addClass("ui-state-highlight");
    } else
    {
        $('#myform_28').prop("disabled", false).removeClass("ui-state-highlight");
    }
}

function changeLeadStatus()
{
    if ($('#pc_cform_12').val() != "2")
    {
        $('#pc_cform_13').prop("disabled", "disabled").addClass("ui-state-highlight").val('');
        $('#pc_cform_14').prop("disabled", "disabled").addClass("ui-state-highlight").val('');
    } else
    {
        $('#pc_cform_13').prop("disabled", false).removeClass("ui-state-highlight");
        $('#pc_cform_14').prop("disabled", false).removeClass("ui-state-highlight");
    }
    if ($('#pc_cform_12').val() != "5")
    {
        $('#pc_cform_15').prop("disabled", "disabled").addClass("ui-state-highlight").val('');
    } else
    {
        $('#pc_cform_15').prop("disabled", false).removeClass("ui-state-highlight");
    }
    if ($('#pc_cform_12').val() != "4")
    {
        $('#pc_cform_16').prop("disabled", "disabled").addClass("ui-state-highlight").val('');
    } else
    {
        $('#pc_cform_16').prop("disabled", false).removeClass("ui-state-highlight");
    }
}

function changeCompanyBoard()
{
    if ($('#myform_9:checked').val() == "2")
    {

        $('#myform_12').prop("disabled", "disabled").addClass("ui-state-highlight").val('');
        $('#myform_15').prop("disabled", "disabled").addClass("ui-state-highlight").val('');

    }
    else
    {
        $('#myform_12').prop("disabled", false).removeClass("ui-state-highlight");
        $('#myform_15').prop("disabled", false).removeClass("ui-state-highlight");
    }
}
function changeShopPainting()
{
    if ($('#myform_21:checked').val() == "2")
    {

        $('#myform_24').prop("disabled", "disabled").addClass("ui-state-highlight").val('');
        $('#myform_27').prop("disabled", "disabled").addClass("ui-state-highlight").val('');

    }
    else
    {
        $('#myform_24').prop("disabled", false).removeClass("ui-state-highlight");
        $('#myform_27').prop("disabled", false).removeClass("ui-state-highlight");
    }
}

function changeMessageType(event)
{
    var qid = $("#" + event.target.id).closest("form").attr("qid");
    var fqheader = Headers[qid];
    var value;
    if (fqheader.optype == "Update")
        value = (gCurRow != null && gCurRow[4] != null) ? gCurRow[4] : null;

    var qstr = "?cmd=Prism_GetReceiverList";

    if (value != null && value.length > 0)
        qstr += "&value=" + value;

    if ($('#myform_1 option:selected').val() == "1") {
        ajaxCall(qstr, null, "get", MessageRecepientSuccess);
        $("#myform_3").parent().find("span").hide();
    }
    else {
        var html = "";
        //var EmpCodes = gLookup.empData;

        $("#myform_4").multiselect("destroy");
        for (var key in gLookup.emp_active)
        {
            html += "<option value='" + key + "'>" + gLookup.emp_active[key] + "</option>";
        }

        $("#myform_4").html(html);
        if ($("#myform_4").attr("multiple") == null)
            $("#myform_4").attr("multiple", "multiple");

        $("#myform_4").multiselect({
            enableCaseInsensitiveFiltering: true,
            filterPlaceholder: 'Search...',
            buttonText: function (options, select) {
                return process_multiselect(options, select);
            }
        });
        $('myform_4 option:selected').prop('selected', false);
    }

    //if ($('#myform_1 option:selected').val() == "1")
    //    qstr += "&type=Group";
    //else
    //    qstr += "&type=Individual";

    //ajaxCall(qstr, null, "get", MessageRecepientSuccess);
    //$("#myform_3").parent().find("span").hide();

}
function MessageRecepientSuccess(Retstrg)
{
    if (Retstrg.response_code == "0")
    {
        var data = $.parseJSON(Retstrg.gpdata4);
        if (IsJson(data))
            data = $.parseJSON(data)

        if (data != null)
        {
            $("#myform_4").html(data.EmpHtml);
            if ($("#myform_4").attr("multiple") == null)
                $("#myform_4").attr("multiple", "multiple")

            $("#myform_4").multiselect("destroy");
            $("#myform_4").multiselect({
                enableCaseInsensitiveFiltering: true,
                filterPlaceholder: 'Search...',
                buttonText: function (options, select)
                {
                    return process_multiselect(options, select);
                }
            });
        }
    }
    else
        DisplayMessage(Retstrg.message);
}

function changeInfluencerFollowup()
{
    if ($('#myform_3:checked').val() == "2")
    {
        $('#myform_4').prop("disabled", "disabled").addClass("ui-state-highlight");
    }
    else
    {
        $('#myform_4').prop("disabled", false).removeClass("ui-state-highlight");
    }
}
function changeDamageStock()
{
    if ($('#myform_32:checked').val() == "2")
    {
        $('#myform_33').prop("disabled", "disabled").addClass("ui-state-highlight");
    }
    else
    {
        $('#myform_33').prop("disabled", false).removeClass("ui-state-highlight");
    }
}
function changePrismUsed()
{
    if ($('#myform_20:checked').val() == "1")
    {
        $('#myform_21').prop("disabled", "disabled").addClass("ui-state-highlight").val('');
        $('#myform_22').prop("disabled", false).removeClass("ui-state-highlight");
        $('#myform_23').prop("disabled", false).removeClass("ui-state-highlight");
        $('#myform_24').prop("disabled", false).removeClass("ui-state-highlight");
        $('#myform_25').prop("disabled", false).removeClass("ui-state-highlight");
        $('#myform_26').prop("disabled", false).removeClass("ui-state-highlight");
        //$('#myform_27').prop("disabled", false).removeClass("ui-state-highlight");
        //$('#myform_28').prop("disabled", false).removeClass("ui-state-highlight");
        //$('#myform_29').prop("disabled", false).removeClass("ui-state-highlight");
        //$('#myform_30').prop("disabled", false).removeClass("ui-state-highlight");
        //$('#myform_31').prop("disabled", false).removeClass("ui-state-highlight");
    }
    else
    {
        $('#myform_21').prop("disabled", false).removeClass("ui-state-highlight");
        $('#myform_22').prop("disabled", "disabled").addClass("ui-state-highlight").val('');
        $('#myform_23').prop("disabled", "disabled").addClass("ui-state-highlight").val('');
        $('#myform_24').prop("disabled", "disabled").addClass("ui-state-highlight").val('');
        $('#myform_25').prop("disabled", "disabled").addClass("ui-state-highlight").val('');
        $('#myform_26').prop("disabled", "disabled").addClass("ui-state-highlight").val('');
        $('#myform_27').prop("disabled", "disabled").addClass("ui-state-highlight");
        $('#myform_28').prop("disabled", "disabled").addClass("ui-state-highlight").val('');
        $('#myform_29').prop("disabled", "disabled").addClass("ui-state-highlight").val('');
        $('#myform_30').prop("disabled", "disabled").addClass("ui-state-highlight").val('');
        $('#myform_31').prop("disabled", "disabled").addClass("ui-state-highlight").val('');
    }
}

function changeROQtyVerified()
{

    if ($('#myform_36:checked').val() == "2")
    {
        $('#myform_37').prop("disabled", "disabled").addClass("ui-state-highlight");
    }
    else
    {
        $('#myform_37').prop("disabled", false).removeClass("ui-state-highlight");
    }
}
function DisableTarget()
{
    //if ($("#myform_3").val() == null || $("#myform_3").val()=="")
    //{
    $("#myform_2").prop("disabled", "disabled").addClass("ui-state-highlight");
    $("#myform_3").prop("disabled", "disabled").addClass("ui-state-highlight");
    $("#myform_4").prop("disabled", "disabled").addClass("ui-state-highlight");
    $("#myform_5").prop("disabled", "disabled").addClass("ui-state-highlight");
    $("#myform_6").prop("disabled", "disabled").addClass("ui-state-highlight");
    $("#myform_7").prop("disabled", "disabled").addClass("ui-state-highlight");
    //}
}

function RenderKRA(qid)
{
    var srch_arr = new Array();
    var params = new Object();
    params["fld_idx"] = 9;
    params["val"] = loginData.loginInfo.EmpCode;
    params["op"] = "eq";
    srch_arr.push(params);

    getData(qid, GetLookupOfCurrentScreen(qid, true), srch_arr);
}

/*added parameters srch_id_seq (sequence number of search field of appflds) */
function GetVisitId(qid, srch_id_seq)
{
    var srch_arr = new Array();
    var params = new Object();
    params["fld_idx"] = srch_id_seq;
    params["val"] = curcustomerInfo.curRouteDetailId; //curRouteDetailId, Modified by Aadilkhan
    params["op"] = "eq";
    srch_arr.push(params);

    getData(qid, GetLookupOfCurrentScreen(qid, true), srch_arr);
}

function GetVisitDealerId(qid, srch_id_seq)
{

    var srch_arr = new Array();
    var params = new Object();
    params["fld_idx"] = srch_id_seq;
    params["val"] = curcustomerInfo.DealerId; //curRouteDetailId, Modified by Aadilkhan
    params["op"] = "eq";
    srch_arr.push(params);

    getData(qid, GetLookupOfCurrentScreen(qid, true), srch_arr);
}
function calculateproposalapproval()
{
    if ($("#myform_10").val() != "")
    {
        var nontraderate = $("#myform_10").val() / 20;
        $("#myform_11").val(nontraderate);
    }
}
function SetCurrentMthYr(qid)
{
    var fqheader = Headers[qid];
    //if (fqheader.optype != "Search")
    //{
    if ($("#sform_0").val() == "" && $("#sform_1").val() == "")
    {
        $("#sform_0").val((new Date).getMonth() + 1);
        $("#sform_1").val((new Date).getFullYear());
    }
    //}
}
function getshiptopartydealerid()
{
    var qstr = "?cmd=Prism_GetShipToParty&type=shiptopartyid&DealerID='" + $("#myform_3").val() + "'";
    if ($("#myform_3").val().length > 0)
    {
        $("#myform_3").prop("disabled", "disabled");
        ajaxCall(qstr, null, "get", ShipCallSuccess);
    }
}

function GetShippingDestinationDetails()
{
    var qstr = "?cmd=Prism_GetShipToParty&type=shiptopartyshippingdetails&ShipToParty='" + $("#myform_4").val() + "'";
    ajaxCall(qstr, null, "get", ShipCallSuccess);
}
function ShipCallSuccess(returnStrng)
{
    if (returnStrng.response_code == "0")
    {
        var data = $.parseJSON(returnStrng.gpdata4);
        if (IsJson(data))
            data = $.parseJSON(data)

        if (data != null)
        {
            $("#myform_4").html(data.retailerdetails);
            $("#myform_7").val(data.PriceCode);
            //$("#myform_7").html(data.Depot);
            //$("#myform_9").html(data.TransportZone);
            $("#myform_8").val(data.DepotCode);
            //$("#myform_9").val(data.ShippingPoint);
            //$("#myform_10").val(data.ShippingPointDesc);
            $("#myform_9").html(data.TransportDesc);
            $("#myform_12").val(data.INCOTerm1);
            $("#myform_13").val(data.INCOTerm2);
            $("#myform_17").val("OK");
            $("#myform_18").val("TRUK");
            if (data.distribution == "EX")
                $("#myform_21").val("ZEXP");
            else
                $("#myform_21").val("ZOR");
            $("#myform_22").val(data.salesorga);
            $("#myform_23").val(data.distribution);
            $("#myform_24").val(data.division);

            if (data.DepotCode != null && data.DepotCode != "")
            {
                var qstr = "?cmd=Prism_GetShippingPoint&depot='" + data.DepotCode + "'";

                ajaxCall(qstr, null, "get", ShippingPointSuccess);
            }
        }
    }
    else
        DisplayMessage(returnStrng.message);
}

function onTransactionTypeChange()
{
    // if (Headers[149].optype != "Update") {
    if ($('#myform_5').val() == 'IN22')
    {// || $('#myform_3').val() == 'IN23'
        var option = gLookup["collection_dd_type"];
        //gLookup["collection_dd_type"].DDUPNSBI;
        //gLookup["collection_dd_type"].DDUPSBI;

        //Headers[149].cols[7].nul = "1";

        if (Headers[149].optype != "Update")
        {
            $("#myform_7").val('');
        }

        $("#myform_7 option[value='RTGSUPNSBI']").attr("disabled", true);
        $("#myform_7 option[value='RTGSUPSBI']").attr("disabled", true);
        $("#myform_7 option[value='DDUPSBI']").attr("disabled", false);
        $("#myform_7 option[value='DDUPNSBI']").attr("disabled", false);
        $("#myform_6").val('DD');

        $("#myform_7 option[value='']").remove();
        $("#myform_7").val('DDUPNSBI');


        $('#myform_9').prop("disabled", "disabled").addClass("ui-state-highlight").val('');

    }
    else if ($('#myform_5').val() == 'IN28')
    {
        if (Headers[149].optype != "Update")
        {
            $("#myform_7").val('');
        }
        $("#myform_7 option[value='DDUPSBI']").attr("disabled", true);
        $("#myform_7 option[value='DDUPNSBI']").attr("disabled", true);
        $("#myform_7 option[value='RTGSUPNSBI']").attr("disabled", false);
        $("#myform_7 option[value='RTGSUPSBI']").attr("disabled", false);
        $("#myform_6").val('RTGS');
        //$('#myform_7').prop("disabled", "disabled").addClass("ui-state-highlight").val('');
        $('#myform_9').prop("disabled", false).removeClass("ui-state-highlight");

        $("#myform_7 option[value='']").remove();
        $("#myform_7").val('RTGSUPNSBI');

    }
    else
    {
        if (Headers[149].optype != "Update")
        {
            $("#myform_7").val('');
        }
        $("#myform_7 option[value='DDUPSBI']").attr("disabled", true);
        $("#myform_7 option[value='DDUPNSBI']").attr("disabled", true);
        $("#myform_7 option[value='RTGSUPNSBI']").attr("disabled", true);
        $("#myform_7 option[value='RTGSUPSBI']").attr("disabled", true);
        $("#myform_6").val('');
        //if ($('#myform_4').val() == 'IN23') {
        //    $('#myform_7').prop("disabled", false).removeClass("ui-state-highlight");
        //} else {

        //    $('#myform_7').prop("disabled", "disabled").addClass("ui-state-highlight").val('');
        //}
        //$('#myform_6').prop("disabled", "disabled").addClass("ui-state-highlight").val('');
        $('#myform_9').prop("disabled", "disabled").addClass("ui-state-highlight").val('');

        $("#myform_7").prepend('<option value=""> </option>');
        //$("#myform_7 option[value='']").remove();
        $("#myform_7").val('');

    }
    // }
}
function getdispatchdetails()
{
    if ($("#myform_0").val() != "")
    {
        var qstr = "?cmd=Prism_GetDispatchDet&RakeNo='" + $("#myform_0").val() + "'";
        ajaxCall(qstr, null, "get", DispatchDetailsSuccess);
    }
}
function DispatchDetailsSuccess(retStrg)
{
    if (retStrg.response_code == "0")
    {
        var data = $.parseJSON(retStrg.gpdata4);
        if (IsJson(data))
            data = $.parseJSON(data)

        if (data != null && Object.size(data) > 0)
        {
            var getdateonly = data.RakeDetailsDate;
            var gettingdatefromobj = getdateonly.split(" ");
            $("#myform_4").val(gettingdatefromobj[0]);
            $("#myform_3").val("PCIH");
            $("#myform_6").val(data.Wagon);
            //DisplayMessage(error_response_type["gp2001"]);
        }
        enableRake();
    }
    else if (retStrg.response_code == "1")
        DisplayMessage(retStrg.message);
    else
        DisplayMessage(error_response_type[retStrg.response_code]);
}
function SaveRakeDetails(params)
{
    var rake_no = $("#myform_0").val();
    rake_no = rake_no.trim();
    var qstr = "?cmd=Prism_SetRakeDispatchDet&RakeNo='" + rake_no + "'";
    ajaxCall(qstr, params, "post", SetrakeDetailssuccess);
    RefreshGrid(79);
}
function SetrakeDetailssuccess(returnmsg)
{
    if (returnmsg.response_code == "0")
    {
        var data = $.parseJSON(returnmsg.gpdata4);
        if (IsJson(data))
            data = $.parseJSON(data);

        if (data != null)// /*&& Object.size(data) > 0*/
        {
            $("#myform").modal("hide");
            DisplayMessage(error_response_type["gp2001"]);
        }
        enableRake();
    }
    else if (returnmsg.response_code == "1")
        DisplayMessage(returnmsg.message);
    else
        DisplayMessage(error_response_type[returnmsg.response_code]);
}
function GetSurveyDetailsQs(qid, row_no)
{
    var curr_row_data = FillCurRowData(qid, row_no);
    var qstr = "?cmd=Prism_GetSurveyDetails&qid=" + qid + "&rowid=" + curr_row_data[0];
    ajaxCall(qstr, null, "get", SuccessfulSurveyHeader);
}
function SuccessfulSurveyHeader(retStrg)
{
    if (retStrg.response_code == "0")
    {
        var data = $.parseJSON(retStrg.gpdata4);
        if (IsJson(data))
            data = $.parseJSON(data)

        if (data != null)
        {
            RenderSurveyChildGridData(data);
        }
    }
    else
        DisplayMessage(retStrg.message);
}
function RenderSurveyChildGridData(data)
{
    var htmldata = new Array();
    var hasdata = false;
    var Text = "", Disable = "";
    var getsurveyoptions = "";
    if (Object.size(data) > 0)
    {

        for (var key in data.SurveyDetails)
        {
            if (data.SurveyReponseDetails)
            {
                hasdata = true;
                getsurveyoptions = data.SurveyReponseDetails[key];
            }
            var cur_data = data.SurveyDetails[key];
            htmldata.push("<div class='pqa'>");
            htmldata.push("<div class='left_que' >");
            htmldata.push("<span class='q_text' que_id =" + cur_data.QuestionId + ">" + cur_data.QuestionText + " </span>");
            htmldata.push("<br />");
            htmldata.push("</div>");
            htmldata.push("<div class='right_que' >");
            var r_Options;
            switch (cur_data.ResponseType)
            {
                case "1":
                    FormControlRadioCheck(cur_data, htmldata, hasdata, getsurveyoptions);
                    break;
                case "2":
                    if (hasdata == true)
                    {
                        Text = 'value=' + getsurveyoptions.ResponseValue;
                        Disable = 'disabled';
                    }
                    htmldata.push("<input type='textbox' " + Text + " " + Disable + "/><br />");
                    break;
                case "3":
                    FormControlRadioCheck(cur_data, htmldata, hasdata, getsurveyoptions);
                    break;
                case "4":
                    if (hasdata == true)
                    {
                        Text = 'value=' + getsurveyoptions.ResponseValue;
                        Disable = 'disabled';
                    }
                    htmldata.push("<input type='textarea' " + Text + " " + Disable + "><br />");
                    htmldata.push("</input>");
                    break;
            }
            htmldata.push("</div></div>");
        }
    }
    var qid = data.qid;
    var pheader = Headers[qid];
    var ar_str = [];
    pheader.form_div = "pc_pform";//set the form rendering div name
    ar_str.push(pc_spanel.replace("Panelxx", LangHeaders[qid].caption).replace("xxx", "pc_pform"));
    ar_str.push(pc_spanel.replace("Panelxx", "Survey Questions").replace("xxx", "pc_cform"));
    $('#parform .modal-body').html(ar_str.join(''));
    var btn = '<button class="btn action" onclick="SaveSurvey(' + qid + ',' + pheader.cur_row_id + ')">Save Survey</button>';
    $("#parform .modal-footer").html(btn);

    $("#parform").modal({ backdrop: 'static' });
    var width = $(window).width() - 30;
    var height = $(window).height() - 150;
    $("#parform .modal-dialog").css({ "width": width + "px", "height": height + "px" });
    new myForm().drawForm(qid, pheader, "pc_pform", "Update", pheader.cur_row_id); //render parent form

    $("#parform .modal-body #pc_cform").html(htmldata.join(''));
    CollapseExpand();
}
function FormControlRadioCheck(cur_data, htmldata, hasdata, getsurveyoptions)
{
    var surveyresponsedetail;
    var check = "";
    var disable = "";
    if (hasdata == true)
    {
        disable = 'disabled="disabled"';
    }
    var type;
    var option;
    var r_Options = cur_data.ResponseOptions.split(',');
    if (cur_data.ResponseType == '1')
        type = "checkbox";
    else if (cur_data.ResponseType == '3')
        type = "radio";
    for (var i = 0; i < r_Options.length; i++)
    {
        if (getsurveyoptions != null && getsurveyoptions != "")
        {
            var data = getsurveyoptions.ResponseValue.indexOf(',');
            if (data == -1)
            {
                if (r_Options[i] == getsurveyoptions.ResponseValue)
                {
                    check = 'checked = "checked"';
                }
            }
            else
            {
                var option = getsurveyoptions.ResponseValue.split(',');
                if (r_Options[i] == option[i])
                {
                    check = 'checked = "checked"';
                }
            }
        }
        htmldata.push("  <input type='" + type + "' ");
        htmldata.push(" name='" + cur_data.QuestionId + "' value='" + r_Options[i] + "'" + check + " " + disable + "/>   " + r_Options[i]);
        check = "";
    }
    htmldata.push("<br />");
    htmldata.push("<br />");
}

function enableRake()
{
    var setviewrake = true;
    $("#80").prop("disabled", false);
    $("#142").prop("disabled", false);
    $("#143").prop("disabled", false);
    $("#152").prop("disabled", false);
}
function SaveSurvey(qid, rowid)
{
    var result_obj = new Object();
    $("#pc_cform .pqa").each(function ()
    {
        var ques_id = $(this).find(".left_que").find("span.q_text").attr("que_id");
        var ele = $(this).find(".right_que");
        var tagName = $(ele).children()[0].tagName;
        var val = "";
        if (tagName == "INPUT")
        {
            var type = $(ele).children(0).attr("type");
            if (type == "checkbox" || type == "radio")
            {
                $(ele).children().each(function ()
                {
                    if ($(this).is(":checked") && type == "checkbox")
                        val += $(this).val() + ",";
                    else if ($(this).is(":checked"))
                        val = $(this).val();

                });
                if (type == "checkbox")
                    val = val.substr(0, val.lastIndexOf(","));
            }
            if (type == "text")
            {
                val = $(ele).children().val();
            }
            result_obj[ques_id] = val;
        }
    });
    var qstr = "?cmd=Prism_SaveSurveyDetails&rowid=" + gCurRow[0] + "&result=" + JSON.stringify(result_obj) + "";
    ajaxCall(qstr, null, "get", DispatchDetailsSuccess);
}
function getonchangeperson(event)
{
    var qstr = "?cmd=Prism_GetSurveyPerson&typenmid=personnm&TypeId=" + $("#myform_2").val() + "";
    var qid = $("#" + event.target.id).closest("form").attr("qid");
    var fqheader = Headers[qid];
    var value;
    if (fqheader.optype == "Update")
        value = (gCurRow != null && gCurRow[4] != null) ? gCurRow[4] : null;

    if (value != null && value.length > 0)
        qstr += "&value=" + value;
    ajaxCall(qstr, null, "get", successpersondata);
}
function getpersonId()
{
    //var qstr = "?cmd=Prism_GetSurveyPerson&typenmid=personid&TypeId=" + $("#myform_2").val() + "&Typenm=" + $("#myform_4").val() + "";
    //ajaxCall(qstr, null, "get", successpersondata);
    $("#myform_3").val($("#myform_4 option:selected").attr('name').split(',')[0]);
    $("#myform_7").val($("#myform_4 option:selected").attr('name').split(',')[1]);
}
function successpersondata(retrn)
{
    if (retrn.response_code == "0")
    {
        $("#myform_4").removeAttr("disabled");
        var data = $.parseJSON(retrn.gpdata4);
        if (IsJson(data))
            data = $.parseJSON(data)
        if (data != null)
        {
            $("#myform_4").html(data.OptionPersonValue);
            //$("#myform_3").val(data.OptionPersonKey);
            $("#myform_3").val($("#myform_4 option:selected").attr('name').split(',')[0]);
            $("#myform_7").val($("#myform_4 option:selected").attr('name').split(',')[1]);
            if ($("#myform_2").val() == '9')
                $("#myform_4").attr("disabled", "disabled");
            //   if ($("#myform_4").length<0)
            $("#pc_pform_4").html(data.OptionPersonValue);
        }
    }
    else
        DisplayMessage(retrn.message);
}
function GetUniqueId(qid)
{
    var fqheader = Headers[qid];
    if (qid == 65 && curr_menu_item == "105")//dynamically changing the LocalIUD because 65 is parent of (113) and child of (66)
    {
        if (fqheader.grid_attrib == null)
            fqheader.grid_attrib = new Object();

        fqheader.grid_attrib.LocalIUD = true;
        return;/* @rizwan because the leadid for child is taken care from server side.*/
    }
}
function SuccessfulUniqueId(retStrg)
{
    if (retStrg.response_code == "0")
    {
        var data = $.parseJSON(retStrg.gpdata4);
        if (IsJson(data))
            data = $.parseJSON(data)
        if (data != null)
        {
            $("#myform_0").val(data);
            $("#pc_cform_0").val(data);
        }
    }
    else
        DisplayMessage(retStrg.message);
}

function showMap()
{
    ShowMap(23.02, 72.2);
    $("#iframeloading").hide();
}
function getInsuranceTo()
{
    var datefrom = $("#myform_10").val(); //Modified --9 to 10 and 10 to 11 ----Aadilkhan
    if (datefrom != null && datefrom.length > 0)
    {
        datefrom = datefrom.split("-");
        var dateinsurance = new Date(datefrom);
        var MonthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        //var temp = new Date(datefrom[2], MonthArray.indexOf(datefrom[1]), datefrom[0]);
        dateinsurance.setDate(dateinsurance.getDate() - 1);
        var dd = dateinsurance.getDate();
        var mm = dateinsurance.getMonth(); //January is 0!
        var yyyy = dateinsurance.getFullYear() + 1;
        //var MonthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        if (dd < 10)
        {
            dd = '0' + dd
        }
        dateinsurance = dd + '-' + MonthArray[mm] + '-' + yyyy;
        $("#myform_11").val(dateinsurance);
        //var dateinsurance = datefrom.split('-');
        //var year = parseInt(dateinsurance[2]) + 1;
        //var dateto = dateinsurance[0] - 1 + "-" + dateinsurance[1] + "-" + year;
        //$("#myform_10").val(dateto);
    }
}
function GetGroupCode()
{
    var params = new Object();
    params["grpcode"] = $("#myform_3").val();
    var qstr = "?cmd=Prism_GetSalesGroupCode";
    /*@rizwan start*/
    if (Headers[9].optype == "Update" && gCurRow != null)
    {
        qstr += "&value=" + gCurRow[4] + "";
    }
    /*@rizwan end*/
    ajaxCall(qstr, params, "post", successGroupCode);
}
function successGroupCode(retStrg)
{
    if (retStrg.response_code == "0")
    {
        var data = $.parseJSON(retStrg.gpdata4);
        if (IsJson(data))
            data = $.parseJSON(data)
        if (data != null)
        {
            $("#myform_4").html(data.GroupCode);

            if ($("#myform_4").attr("multiple") == null)
                $("#myform_4").attr("multiple", "multiple")


            $("#myform_4").multiselect("destroy");
            $("#myform_4").multiselect({
                enableCaseInsensitiveFiltering: true,
                filterPlaceholder: 'Search...',
                buttonText: function (options, select)
                {
                    return process_multiselect(options, select);
                }
            });
        }
    }
    else
        DisplayMessage(retStrg.message);
}
function getEmpCode()
{
    var role = $("#myform_6").val();
    var depot = $("#myform_5").val();
    var region = $("#myform_4").val();
    var zone = $("#myform_3").val();
    var EmpCode;

    if (Headers[51].optype == "Update" && gCurRow[7] != null && gCurRow[7].length > 0)
        EmpCode = gCurRow[7];

    if ((role != null && role.length > 0) || (depot != null && depot.length > 0))
    {
        var qstr = "?cmd=Prism_GetEmpCode&role=" + (role != null && role.length > 0 ? role.join() : null) + "&depot=" + (depot != null && depot.length > 0 ? depot.join() : null) + "&region=" + region + "&zone=" + zone + "";

        if (EmpCode != null && EmpCode.length > 0)
            qstr += "&empcode=" + EmpCode + "";

        ajaxCall(qstr, null, "get", successGetEmpCode);
    }
}
function successGetEmpCode(retstrg)
{
    if (retstrg.response_code == "0")
    {
        var data = $.parseJSON(retstrg.gpdata4);
        
        if (data != null)
        {
            $("#myform_7").html(data);

            if ($("#myform_7").attr("multiple") == null)
                $("#myform_7").attr("multiple", "multiple")


            $("#myform_7").multiselect("destroy");
            $("#myform_7").multiselect({
                enableCaseInsensitiveFiltering: true,
                filterPlaceholder: 'Search...',
                buttonText: function (options, select)
                {
                    return process_multiselect(options, select);
                }
            });
        }
    }
    else
        DisplayMessage(retstrg.message);
}
function DisableRepeatOrder()
{
    var getdata = $("#tabs-64").children().find("li").eq(2).html().length;
    if (getdata > 0 && $('#myform_9').val() != "3")
    {
        $("#tabs-64").children().find("li").eq(2).children().prop("disabled", true);
    }
    if (Headers[64].optype == "Update" && gCurRow[0] != curcustomerInfo.curRouteDetailId)
    {
        $("#save_id").hide();
        $("#myform").find(".DataTD").each(function ()
        {
            ele = $(this).children(0);
            ele.prop('disabled', true);
            $('span.input-group-addon').hide();
            ($('.radio-inline').children(0)).prop('disabled', true);
        });
    }

    //-----Added By Aadilkhan----
    if (Headers[64].optype == "Add")
    {
        /* added by rizwan */
        if (curr_menu_item == "160" && !((isPhoneGap() && isNetworkAvailable()) || navigator.onLine))
            return;
        /* End added by rizwan */

        var IHBSite = $("#myform_1").val();
        var EmpCode = $("#myform_4").val();

        if (IHBSite != null && IHBSite != "" && EmpCode != null && EmpCode != "")
        {
            var qstr = "?cmd=Prism_GetVisitNumberForIhbSite&IhbsiteId=" + IHBSite + "&EmpCode='" + EmpCode + "'";

            ajaxCall(qstr, null, "get", GetVisitNumberOnSuccess);
        }

    }
    //---End of--Added By Aadilkhan----

}

//-----Added By Aadilkhan---------
function GetVisitNumberOnSuccess(returnStrng)
{
    if (returnStrng.response_code == "0")
    {
        var data = $.parseJSON(returnStrng.gpdata4);
        if (IsJson(data))
            data = $.parseJSON(data)

        if (data != null)
        {
            $("#myform_7").val(data);
        }
    }
    else
        DisplayMessage(returnStrng.message);
}
//---End of--Added By Aadilkhan---------



function CheckValue(qid)
{
    if (qid == "5") {
        if (($("#myform_4").val() < 150 || $("#myform_4").val() > 999) || ($("#myform_5").val() < 150 || $("#myform_5").val() > 999)) {
            DisplayMessage("Please enter WS & RS Price between 150 and 999");
            return false;
        }
        else
            return true;
    }
    else {
        if (($("#myform_6").val() < 150 || $("#myform_6").val() > 999) || ($("#myform_5").val() < 150 || $("#myform_5").val() > 999)) {
            DisplayMessage("Please enter WS & RS Price between 150 and 999");
            return false;
        }
        else
            return true;
    }
}

function GetVisitDealerId(qid)
{
    var srch_arr = new Array();
    var params = new Object();
    params["fld_idx"] = 3;
    params["val"] = CurrVisitedCustID;
    params["op"] = "eq";
    srch_arr.push(params);

    getData(qid, GetLookupOfCurrentScreen(qid, true), srch_arr);
}

function DisableAppReason()
{
    var role = loginData.loginInfo.Role;
    if (role != "RHM" && role != "ZHM" && role != "CMO" && role != "ADMIN")
    {
        $('#myform_8').prop("disabled", "disabled").addClass("ui-state-highlight");
    }
}

function HideCSRFields(qid)
{
    var role = loginData.loginInfo.Role;
    var header = Headers[qid];
    var cols = header.cols;
    var colsHeader = LangHeaders[qid].colnames;

    if (role == "CSR")
    {
        cols[2].hide = "01";
        cols[4].hide = "01";
        cols[28].hide = "01";
        cols[32].hide = "01";
        header.grid_attrib.hide_update_icon = true;
    }
    else
    {

        cols[4].hide = "0";
        cols[28].hide = "0";
        cols[32].hide = "0";
        header.grid_attrib.hide_update_icon = false;
    }

    if (loginData.loginInfo.Role == "ADMIN")
    {
         if (qid == 70)
             header.cols[39].hide = "10";        
    }
    else
    {
        if (qid == 70)
            header.cols[39].hide = "1";       
    }
}


function AutoFillSecondarySale()
{
    var areaqry = "?cmd=Prism_GetSecondarySaleData";
    ajaxCall(areaqry, null, "get", successAutoFillSecondarySale);
}
function successAutoFillSecondarySale(retstrg)
{
    if (retstrg.response_code == "0")
    {
        var data = $.parseJSON(retstrg.gpdata4);
        $("#myform_3").val(data[0].SoldTo);
        $("#myform_5").val(data[0].Quantity);
        $("#myform_6").val(data[0].RetailPrice);
        $("#myform_7").val(data[0].MiddleMan);
        $("#myform_8").val(data[0].BillNo);

    }
    else
        DisplayMessage($.parseJSON(retstrg.message));
}

//function SaveInfluencerId(params, qid, qstr) {
//    var influencerid = gCurRow[0];
//    jQuery.extend(params, { '1': influencerid });
//    getData(qid, qstr, params,null);

//}
function DisableInfluencer(qid)
{
    var role = loginData.loginInfo.Role;
    var header = Headers[qid];
    var cols = header.cols;
    cols[2].edit = "False";
    cols[3].edit = "False";
    cols[4].edit = "False";
    cols[5].edit = "False";
    cols[6].edit = "False";
    cols[7].edit = "False";
    cols[8].edit = "False";
    cols[9].edit = "False";
    cols[10].edit = "False";
    cols[11].edit = "False";
    cols[12].edit = "False";
    cols[13].edit = "False";
    cols[14].edit = "False";
    cols[15].edit = "False";
    cols[16].edit = "False";
    cols[17].edit = "False";
    // $('#pc_pform_2').prop("disabled", "disabled").addClass("ui-state-highlight").val('');
    if (qid == 65 && header.grid_attrib != null && header.grid_attrib.hasOwnProperty("LocalIUD"))
        delete header.grid_attrib.LocalIUD;

    GetInfluencerVisit(qid);
}
function EnableInfluencer(qid)
{
    var role = loginData.loginInfo.Role;
    var header = Headers["65"];
    var cols = header.cols;
    cols[2].edit = "True";
    cols[3].edit = "True";
    cols[4].edit = "True";
    cols[5].edit = "True";
    cols[6].edit = "True";
    cols[7].edit = "True";
    cols[8].edit = "True";
    cols[9].edit = "True";
    cols[10].edit = "True";
    cols[11].edit = "True";
    cols[12].edit = "True";
    cols[17].edit = "True";

    if (qid == "66")
        header.grid_attrib.LocalIUD = true;
}

function GetDealerId(qid)
{
    var message = $('#custDetail').find('#lblHeader').text();
    var mes = message.split(" ");
    if (qid == 122)
    {
        $('#sform_6').val(mes[2]);
        $('#sform_6').prop("disabled", "disabled").addClass("ui-state-highlight");
    }
    else if (qid == 128)
    {
        $('#sform_5').val(mes[2]);
        $('#sform_5').prop("disabled", "disabled").addClass("ui-state-highlight");
    }
    else if (qid == 127)
    {
        $('#sform_6').val(mes[2]);
        $('#sform_6').prop("disabled", "disabled").addClass("ui-state-highlight");
    }
    else if (qid == 123)
    {
        $('#sform_0').val(mes[2]);
        $('#sform_0').prop("disabled", "disabled").addClass("ui-state-highlight");
    }
    else if (qid == 129)
    {
        $('#sform_11').val(mes[2]);
        $('#sform_11').prop("disabled", "disabled").addClass("ui-state-highlight");
    }
    else if (qid == 186)
    {
        $('#sform_1').val(mes[2]);
        $('#sform_1').prop("disabled", "disabled").addClass("ui-state-highlight");
    }
}

////////////////////////   s-pratik  //////////////////////////////
function AddBalance(qid, data)
{

    var curr_qid = $("#sform").attr("qid");
    //if (qid == 129) {
    //    var value = 0;
    //    if (data.gpdata1[0] != null || data.gpdata1[0] != undefined)
    //        value = data.gpdata1[0][11];
    //    $(".toolbar").append("<label class='labelmargin'>Open Balance:" + value + "</label>");
    //}
    var flag = false;
    if ($(".toolbar").parents("#div_parr").length != 1) {
        $('#div_parr').prepend($('<div class="toolbar1"></div>'));
        //$('.toolbar').css({ "float": "none" });
        //$('.toolbar').css({ "width": "100%" });
    } else {
        $('.toolbar').css({ "width": "65%" });
    }

    if ($("#sform").html() != undefined && qid == curr_qid)
    {
        var render_div = Headers[$("#sform").attr("qid")].render_div;
        var append_div = render_div == null ? $(".toolbar") : $("#" + render_div).find(".toolbar");
        if (qid == 136 || qid == 146 || qid == 150 || qid == 151) {
            append_div = render_div == null ? $(".toolbar1") : $("#" + render_div).find(".toolbar1");
        }
        $("#sform input").each(function ()
        {            
            if (($(this).attr("type") == "checkbox" || $(this).attr("type") == "radio"))
            {
                if ($(this).is(":checked"))
                    append_div.append("<label class='labelmargin'>" + $(this).attr('name') + ":" + $(this).val() + "</label>");
            }
            else
            {
                if ($(this).val() != null && $(this).val().length > 0)
                    append_div.append("<label class='labelmargin'>" + $(this).attr('name') + ":" + $(this).val() + "</label>");
            }

        });
        var val;
        $("#sform select").each(function ()
        {
            if (qid == 197 || qid == 199 || qid==163 || qid==164 || qid==116) {
                val = $("option:selected", this).val();
                if ($(this).attr('name') != "Duration2" && $(this).attr('name') != "Duration3") {
                    if (val != null && val.length > 0)
                        append_div.append( "<label class='labelmargin'>" + $(this).attr('name') + ":" + $("option:selected", this).text() + "</label>");
                }
                else if ($(this).attr('name') == "Duration2")
                    append_div.append("<label class='labelmargin'>" + "(" + $("option:selected", this).text() + "</label>");
                else if ($(this).attr('name') == "Duration3")
                    append_div.append("<label class='labelmargin'>" + "-" + $("option:selected", this).text() + ")" + "</label>");
            }
            else if ($(this).val() != null && $(this).val().length > 0)
                append_div.append("<label class='labelmargin'>" + $(this).attr('name') + ":" + $("option:selected", this).text() + "</label>");
        });
    }
}


function SearchDashboard(qid, data)
{
    var curr_qid = $("#sform").attr("qid");
    $("#dashboard_srch").remove();
    $("#dashboard_name").remove();
    if ($("#sform").html() != undefined && qid == curr_qid)
    {        
        var append_div = $("#div_buttons");
        //$("#div_buttons").append("<div id='dashboard_name'><label class='dashboard_header'>Dashboard --> " + LangHeaders[qid].caption + "</label></div>");
        $("#Report_header").append("<span id='dashboard_name'> --> " + LangHeaders[qid].caption + "</span>");
        var htm = "<div id='dashboard_srch'>";
        $("#sform input").each(function ()
        {
            if (($(this).attr("type") == "checkbox" || $(this).attr("type") == "radio"))
            {
                if ($(this).is(":checked"))
                    htm+= "<label class='labelmargin'>" + $(this).attr('name') + ":" + $(this).val() + "</label>";
            }
            else
            {
                if ($(this).val() != null && $(this).val().length > 0)
                    htm+="<label class='labelmargin'>" + $(this).attr('name') + ":" + $(this).val() + "</label>";
            }

        });
        var val;
        $("#sform select").each(function ()
        {
            val = $("option:selected", this).val();
            if ($(this).attr('name') != "Duration2" && $(this).attr('name') != "Duration3")
            {
                if (val!=null && val.length > 0)
                    htm += "<label class='labelmargin'>" + $(this).attr('name') + ":" + $("option:selected", this).text() + "</label>";
            }
            else if ($(this).attr('name') == "Duration2")
                htm += "<label class='labelmargin'>" + "(" + $("option:selected", this).text() + "</label>";
            else if ($(this).attr('name') == "Duration3")
                htm += "<label class='labelmargin'>" + "-" + $("option:selected", this).text() + ")" + "</label>";
        });
        htm+="</div>"
        append_div.append(htm);
    }
}
function getTransportationZone()
{
    if ($("#myform_3").val() == "new")
    {
        $('#myform_40').prop("disabled", false).removeClass("ui-state-highlight");
        $("#myform_1").prop("disabled", false).removeClass("ui-state-highlight");
        $("#myform_2").val('');
    }
    else
    {
        $('#myform_40').prop("disabled", "disabled").addClass("ui-state-highlight").val('');
        $("#myform_1").prop("disabled", "disabled").addClass("ui-state-highlight");
        var partycode = $("#myform_3").val();
        $("#myform_1").val(partycode);
        var qstr = "?cmd=Prism_GetDestination&DealerID='" + $("#myform_3").val() + "'";
        if ($("#myform_3").length > 0)
        {
            ajaxCall(qstr, null, "get", TransportaionZoneSuccess);
        }
    }
}

function TransportaionZoneSuccess(returnStrng)
{
    if (returnStrng.response_code == "0")
    {
        var data = returnStrng.gpdata4;


        if (data != null)
        {
            data = data.trim();
            $("#myform_2").val(data);

        }
    }
    else
        DisplayMessage(returnStrng.message);
}
function CustomProposalRequestButton(qid)
{
    var btnobj = new Object();
    btnobj["Calculate Fields and Save"] = function ()
    {
        validatefields(this, qid);
    };
    return (btnobj);
}
function validatefields(ref, qid)
{
    var efrm = $(ref).attr("fid");
    efrm = $(efrm).find("form");
    var fqheader = Headers[qid];
    validate(efrm, fqheader);
}
function CalculateFieldsforProposal(params, qid)
{
    //if (event.srcElement.id == "Calculate Fields and Save_40")
    //{
    if (Object.size(params) > 0)
    {
        var fqheader = Headers[qid];
        var getparams = new Object();
        var nontraderate, traderate, ntservicetax, tservicetax, vat, ntcsttax, tcsttax, ntrateperbag, trateperbag, exisent, exiset, entrytax, ncrtrade, ncrnontradevar, ncrnt, ncrt;
        getparams["nontraderate"] = parseInt($("#myform_9").val()); // non tade price
        getparams["traderate"] = parseInt(($("#myform_14").val())); // trade price
        if ($("#myform_9").val() == "" || $("#myform_14").val() == "")
        {
            DisplayMessage("Enter Values for Calculation");
        }
        else
        {
            var servicetaxtotal = parseFloat($("#myform_34").val()) / 100;
            getparams["ntservicetax"] = parseFloat($("#myform_24").val()) * (0.25) * servicetaxtotal;  // secondary fright rate
            getparams["tservicetax"] = parseFloat($("#myform_24").val()) * (0.25) * servicetaxtotal;   // secondary fright rate
            vat = parseFloat($("#myform_32").val());
            getparams["vat"] = vat / 100;
            getparams["primary"] = parseFloat($("#myform_22").val());
            getparams["secondary"] = parseFloat($("#myform_24").val());
            getparams["packing"] = parseFloat($("#myform_29").val());
            getparams["handling"] = parseFloat($("#myform_30").val());
            getparams["ntcsttax"] = parseFloat(((getparams["nontraderate"] / (1 + getparams["vat"])) * getparams["vat"]).toFixed(2));
            getparams["tcsttax"] = parseFloat(((getparams["traderate"] / (1 + getparams["vat"])) * getparams["vat"]).toFixed(2));
            getparams["exisent"] = parseFloat(((((getparams["nontraderate"] / (1 + getparams["vat"])) / (1 + servicetaxtotal)) * 0.12) * (1.03)).toFixed(2));
            getparams["ntrateperbag"] = getparams["nontraderate"] / 20;
            $("#myform_10").val((getparams["ntrateperbag"]).toFixed(2));
            getparams["trateperbag"] = getparams["traderate"] / 20;
            var value = ($("#myform_35").val() != null || $("#myform_35").val() != "") ? parseFloat($("#myform_35").val()) : 0; //mrp
            getparams["exiset"] = parseFloat(((getparams["traderate"] + (value - getparams["trateperbag"]) * 20) * 0.7 * servicetaxtotal + (servicetaxtotal * 1000)).toFixed(2));
            getparams["entrytax"] = (2650 + getparams["exisent"] + getparams["primary"] + getparams["secondary"]) * (parseFloat($("#myform_33").val()) / 100);
            getparams["entrytaxtrade"] = (2650 + getparams["exiset"] + getparams["primary"] + getparams["secondary"]) * (parseFloat($("#myform_33").val()) / 100);

            var discount = ($("#myform_37").val() != "") ? parseFloat($("#myform_37").val()) : 0;
            var servicetax = ($("#myform_36").val() != "") ? parseFloat($("#myform_36").val()) : 0;//servicetaxhandling
            var spcomm = (parseFloat($("#myform_42").val()) != "") ? parseFloat($("#myform_42").val()) : 0;//modified by khushali
            var ul = ($("#myform_38").val() != "") ? parseFloat($("#myform_38").val()) : 0;
            var totalexpense = getparams["ntservicetax"] + getparams["ntcsttax"] + getparams["exisent"] + getparams["primary"] + getparams["secondary"] + getparams["packing"] + getparams["handling"] + getparams["entrytax"] + servicetax + parseFloat($("#myform_17").val()) + ul;
            var totalexpenset = getparams["tservicetax"] + getparams["entrytaxtrade"] + getparams["tcsttax"] + getparams["exiset"] + getparams["primary"] + getparams["secondary"] + getparams["packing"] + getparams["handling"] + servicetax + discount + ul + spcomm;

            getparams["totalexpensent"] = totalexpense;
            getparams["totalexpenset"] = totalexpenset;
            ncrnt = parseFloat($("#myform_9").val()) - totalexpense;
            ncrt = parseFloat($("#myform_14").val()) - totalexpenset;
            getparams["ncrnt"] = ncrnt;
            getparams["ncrt"] = ncrt;
            $("#myform_11").val((ncrnt).toFixed(2));
            $("#myform_15").val((ncrt).toFixed(2));
            getparams["type"] = fqheader.optype;
            if (fqheader.optype == "Update")
            {
                getparams["proposalid"] = gCurRow[0];
            }
            getparams["count"] = 0;
            var storenontrade = "?cmd=Prism_SetProposalRequestData";
            ajaxCall(storenontrade, getparams, "post", successProposalRequest);
        }
        //}
        //else
        //{
        if (fqheader.optype == "Add")
        {
           
            params[11] = ncrnt;
            params[15] = ncrt;
            
            var qry_str = "?cmd=Add&qid=" + qid;
            getData(qid, GetLookupOfCurrentScreen(qid, null, qry_str), params);
        }
        if (fqheader.optype == "Update")
        {
            var qry_str = "?cmd=Update&qid=" + qid + "&update_id=" + 0 + "&update_value=" + gCurRow[0] + "";
            getData(qid, GetLookupOfCurrentScreen(qid, null, qry_str), params);
        }
    }
    else
    {
        DisplayMessage(error_response_type["gp2016"]);
    }

    //  }
}
function GetNewParty(qid)
{
    //var option = gLookup["dealer_code_proposal"];
    //option["new"] = "new";
    var temp = { "new": "new" };
    gLookup["dealer_code_proposal"] = $.extend(temp, gLookup["dealer_code_proposal"]);

}
function PaymentTerms()
{
    if ($("#myform_6").val() == "6")
        $('#myform_40').prop("disabled", false).removeClass("ui-state-highlight");
    else
        $('#myform_40').prop("disabled", "disabled").addClass("ui-state-highlight").val('');
}
function successProposalRequest(retstrg)
{
    if (retstrg.response_code == "0")
    {
        var data = retstrg.gpdata4;
        if (data != null)
        {
            var qid = 187;
            Headers[qid].render_div = 'cust_div';
            var qstr = GetLookupOfCurrentScreen(qid, false);
            var srch_arr = new Array();
            var params = new Object();
            params["fld_idx"] = 1;
            params["val"] = data;
            params["op"] = "eq";
            srch_arr.push(params);

            var d_width = $(window).width() - 300;
            var d_height = $(window).height() - 140;
            ShowDialog("custDetail", "", null, null, null, null, "Calculated Fields", null, "Close", d_width, d_height);
            $("#custDetail").removeClass("height250 center_popup").addClass("center_popup_dealer");
            //$("#custDetail").css({ "left": 200, "margin-top": 20});
            $("#custDetail .modal-body").html("<div id='cust_div'></div>");
            //$("#custDetail .modal-body").css({ "height": $(window).height() - 300 });
            var watchClose = setInterval(function ()
            {
                clearTimeout(watchClose);
                getData(qid, GetLookupOfCurrentScreen(qid, true), srch_arr);
            }, 500);

            /*  --added --Aadilkhan */
            $('#custDetail').on('hide.bs.modal', function (e) {
                $("#div_ch10").find("li.selected-menu").click();
            });
            /*  -- end --  */

        }
    }
}

function GetIHBVisit(qid)
{
    var srch_arr = new Array();
    var params = new Object();
    params["fld_idx"] = 1;
    //params["val"] = curcustomerInfo.curRouteDetailId;
    params["val"] = curcustomerInfo.IHBSiteId;
    params["op"] = "eq";
    srch_arr.push(params);


    getData(qid, GetLookupOfCurrentScreen(qid, true), srch_arr);
}

function SetKRACode(qid)
{
    //var fqheader = Headers[qid];   
    // $('#sform_3').prop("disabled", "disabled").addClass("ui-state-highlight");
}

//function GetInfluVisit(qid) {
//    DisableInfluencer(qid);
//    var params = new Object();
//    params[0] = curcustomerInfo.LeadID;
//    getData(qid, GetLookupOfCurrentScreen(qid, true), params);
//}
function KRACust(data, type, row, tobj)
{
    var tid = tobj.settings.sTableId;
    var qid = $("#" + tid).attr("qid");

    var htm = "";
    if ((loginData.loginInfo.Role == "TSM" && data == "Competitors Activities,  Price related information,  secondary sales and Dealer/Retailer stock level") ||
        (loginData.loginInfo.Role == "RHM" && (data == "Sales Promotion Activities" || data == "Competitors Activities,  Price related information,  secondary sales and Dealer/Retailer stock level for TSM")) ||
        (loginData.loginInfo.Role == "ZHM" && (data == "Reviewing Performance of SPs and C_Fs" || data == "Tracking competitors activities, SFA Implementation" || data == "Implementing the Base Initiatives launched by CMO eg.SO and TSO PJP monitoring, BTL Implementation, Loyalty Programs, Market Mapping")) ||
        (loginData.loginInfo.Role == "CMO" && (data == "Reviewing Performance of SPs and C_Fs for ZHM" || data == "Tracking competitors activities, SFA Implementation for ZHM" || data == "Implementing the Base Initiatives launched by CMO eg.SO and TSO PJP monitoring, BTL Implementation, Loyalty Programs, Market Mapping for ZHM")))
    {
        htm = "<a href='#' class='link' onclick='scoreDialog(\"" + row[1] + "\",\"" + row[2] + "\",\"" + row[3] + "\",\"" + row[5] + "\",\"" + qid + "\",\"" + row[8] + "\")' > " + row[5] + " </a>";
    }
    else
        htm = row[5];
    return htm;
}


function scoreDialog(row1, row2, row3, row4, qid,row8)
{
    var pop_score = "<div><label for=\'txt_score\'>Score&nbsp;</label><input type=\'text\' id=\'txt_score\'> out of 10<br/><div id='custKRAval'></div></div>";
    ShowDialog('custDetail', pop_score, 'UpdateKRAScore(\'' + row1 + '\',\'' + row2 + '\',\'' + row3 + '\',\'' + row4 + '\',\'' + qid + '\',\'' + row8 + '\')', null, null, null, 'KRA Score', null, null, null, null, false);
    $("#custDetail").removeClass("center_popup_dealer height250 ").addClass("center_popup");
}

function UpdateKRAScore(row1, row2, row3, row4, qid, row8)
{
    var actual = $("#txt_score").val();
    if (actual > 10 || actual < 0 || !($.isNumeric(actual))) {
        $("#custKRAval").html('<span>Score must be between 0 and 10</span>');
        //DisplayMessage("Score can be between 0 to 10");        
        return;
    }
    var score=(actual * row8) / 10;
    var empcode = row3.split('-');
    if (score != null && score != "")
    {
        var qstr = "?cmd=Prism_UpdateKRAScore&month=" + row1 + "&year=" + row2 + "&empcode=" + empcode[0] + "&kradesc=" + row4 + "&score=" + score + "&qid=" + qid + "";
        ajaxCall(qstr, null, "get", successUpdateKRAScore);

    }
    $("#custDetail").modal("hide");
    
}
function successUpdateKRAScore(Retstrg)
{
    if (Retstrg.response_code != "0") {
        DisplayMessage(Retstrg.message);

    } else {
        var data = $.parseJSON(Retstrg.gpdata4);
        if (IsJson(data))
            data = $.parseJSON(data)
        if (data != null) {
            var qstr = "?cmd=search&qid=" + data.qid + "";
            var srch_arr = new Array();
            var params = new Object();
            var params1 = new Object();
            var params2 = new Object();
            params["fld_idx"] = 0;
            params["val"] = data.month;
            params["op"] = "eq";
            params1["fld_idx"] = 1;
            params1["val"] = data.year;
            params1["op"] = "eq";
            params2["fld_idx"] = 9;
            params2["val"] = data.empcode;
            params2["op"] = "eq";
            srch_arr.push(params);
            srch_arr.push(params1);
            srch_arr.push(params2);
            //params[0] = data.month;
            //params[1] = data.year;
            //params[9] = data.empcode;
            getData(data.qid, GetLookupOfCurrentScreen(data.qid, null, qstr), srch_arr);

            //var srch_arr = new Array();
            //var params = new Object();
            //params["fld_idx"] = 3;
            //params["val"] = CurrVisitedCustID;
            //params["op"] = "eq";
            //srch_arr.push(params);

            //getData(qid, GetLookupOfCurrentScreen(qid, true), srch_arr);
        }
    }
}

function approvedapplication()
{
    var areaqry = "?cmd=Prism_GetNontradeApplicationRequest";
    ajaxCall(areaqry, null, "get", successgetApplicationRequest);
}
function successgetApplicationRequest(retstrg)
{
    if (retstrg.response_code == "0")
    {
        IsSapSyn
        var qid = 40;
        var data = $.parseJSON(retstrg.gpdata4);
        if (IsJson(data))
            data = $.parseJSON(data)
        if (data != null)
        {
            var qry_str = "?cmd=data&qid=" + qid + "";
            var params = new Object();
            params[1] = data;
            getData(qid, GetLookupOfCurrentScreen(qid, null, qry_str), params);
        }
    }


}


function SetPartyCode(qid)
{

    if (Headers[qid].optype == "Add")
    {
        var dealercode = gLookup["dealer_name"][CurrVisitedCustID];
        $("#myform_3").val(CurrVisitedCustID);
        //var dealer = gLookup["dealer_code"][dealercode];
        var name = dealercode.split(' (');
        $("#myform_4").val(name[0]);
    }
    if (Headers[qid].optype == "Update" && $("#myform_1").val() != "" && $("#myform_1").val() != null)
    {
        $("#save_id").hide();
        $("#myform").find(".DataTD").each(function ()
        {
            ele = $(this).children(0);
            ele.prop('disabled', true);
            $('span.input-group-addon').hide();
            //($('.radio-inline').children(0)).prop('disabled', true);
        });
    }

    GetDealerName(qid, null)
}

function GetVisitDealerIdForCollection(qid)
{
    var srch_arr = new Array();
    var params = new Object();
    params["fld_idx"] = 3;
    params["val"] = CurrVisitedCustID;
    params["op"] = "eq";
    srch_arr.push(params);

    getData(qid, GetLookupOfCurrentScreen(qid, true), srch_arr);

}

function CustomSAPButton(qid)
{
    //var efrm = $(this).attr("fid");
    //var fqheader = Headers[qid];
    //validate(efrm, fqheader);
    if (Headers[qid].optype == "Update" && ($("#myform_1").val() == "" || $("#myform_1").val() == null))
    {
        var btnobj = new Object();
        btnobj["Sync Data to SAP"] = function ()
        {
            Headers[qid].optype = "Add";
            validatefields(this, qid);
        };
        return (btnobj);
    }

}
function SaveCreditLimit(params, qid)
{

    if ($($(event)[0].currentTarget).html() == "Sync Data to SAP")
    {

        //if (params[10] != null && params[10].length > 0)
        //    params[10] = dateConversion(params[10]);

        //if (params[11] != null && params[11].length > 0)
        //    params[11] = dateConversion(params[11]);

        //if (params[12] != null && params[12].length > 0)
        //    params[12] = dateConversion(params[12]);
        var id = GetUpdateDelIdx(149);
        params[0] = gCurRow[id];
        var qry_str = "?cmd=Prism_ProcessSap&qid=" + qid;
        getData(qid, GetLookupOfCurrentScreen(qid, null, qry_str), params);
        RefreshGridForSAP(149);
    }
    else if ($($(event)[0].currentTarget).html() == "Save")
    {
        var qry_str = "?cmd=Add&qid=" + qid;
        getData(qid, GetLookupOfCurrentScreen(qid, null, qry_str), params);
    }

}

function RefreshGridForSAP(qid)
{
    var index;
    if (qid == 149 || qid == 8)
    {
        index = 3;
    }
    var srch_arr = new Array();
    var params = new Object();
    params["fld_idx"] = index;
    params["val"] = CurrVisitedCustID;
    params["op"] = "eq";
    srch_arr.push(params);
    $("#sform").attr("qid", null);
    getData(qid, GetLookupOfCurrentScreen(qid, true), srch_arr);
}

function CustomSAPButtonSaleOrder(qid)
{

    if (Headers[qid].optype == "Update" && ($("#myform_1").val() == "" || $("#myform_1").val() == null))
    {//&& $("#myform_15").val() == "False"
        var btnobj = new Object();
        btnobj["Sync Data to SAP"] = function ()
        {
            Headers[qid].optype = "Add";
            validatefields(this, qid);
        };
        return (btnobj);
    }

}
function SaveSaleOrder(params, qid)
{

    if ($($(event)[0].currentTarget).html() == "Sync Data to SAP")
    {

        //if (params[4] != null && params[4].length > 0)
        //    params[4] = dateConversion(params[4]);

        //if (params[5] != null && params[5].length > 0)
        //    params[5] = dateConversion(params[5]);
        //params[0]=gCurRowId;
        var id = GetUpdateDelIdx(8);
        params[0] = gCurRow[id];
        var qry_str = "?cmd=Prism_ProcessSap&qid=" + qid;
        getData(qid, GetLookupOfCurrentScreen(qid, null, qry_str), params);
        //RefreshGrid(8);
        RefreshGridForSAP(8);
        //$($(event)[0].currentTarget).hide();
    }
    else if ($($(event)[0].currentTarget).html() == "Save")
    {
        var qry_str = "?cmd=Add&qid=" + qid;
        getData(qid, GetLookupOfCurrentScreen(qid, null, qry_str), params);

    }
    //$($(event)[0].currentTarget).hide();



}

function SetUpdateOff(qid)
{
    if (Headers[qid].optype == "Update" && $("#myform_1").val() != "" && $("#myform_1").val() != null)
    {
        //$("#save_id").hide();
        $("#save_id").hide();
        $("#myform").find(".DataTD").each(function ()
        {
            ele = $(this).children(0);
            ele.prop('disabled', true);
            $('span.input-group-addon').hide();
            //($('.radio-inline').children(0)).prop('disabled', true);
        });
    }

    GetDealerName(qid, null);

}

function dateConversion(olddate)
{
    if (olddate != null && olddate.length > 0)
    {
        olddate = olddate.split("-");
        var newdate = new Date(olddate);
        newdate.setDate(newdate.getDate());
        var dd = newdate.getDate();
        var mm = (newdate.getMonth()) + 1; //January is 0!
        var yyyy = newdate.getFullYear();
        if (dd < 10)
        {
            dd = '0' + dd
        }
        if (mm < 10)
        {
            mm = '0' + mm
        }
        newdate = dd + '-' + mm + '-' + yyyy;
        return newdate;
    }
}
function GetVisitPicture(qid)
{
    var fqheader = Headers[qid];
    if (fqheader.optype == "Update")
    {
        if (gCurRow != null && gCurRow[5] != "" && gCurRow[5].length > 0)
        {
            $("#myform_5").attr("filename", gCurRow[5]);
        }
        if (gCurRow != null && gCurRow[6] != "" && gCurRow[6].length > 0)
        {
            $("#myform_6").attr("filename", gCurRow[6]);
        }
        if (gCurRow != null && gCurRow[7] != "" && gCurRow[7].length > 0)
        {
            $("#myform_7").attr("filename", gCurRow[7]);
        }
        if (gCurRow != null && gCurRow[8] != "" && gCurRow[8].length > 0)
        {
            $("#myform_8").attr("filename", gCurRow[8]);
        }

    }

    GetDealerName(qid, null);
}
function GetMaterialDesc()
{

    var qstr = "?cmd=Prism_GetMaterialDesc&Material='" + $("#myform_14").val() + "'";

    ajaxCall(qstr, null, "get", MaterialDescSuccess);

}

function MaterialDescSuccess(returnStrng)
{
    if (returnStrng.response_code == "0")
    {
        var data = returnStrng.gpdata4;


        if (data != null)
        {

            $("#myform_15").val(data);

        }
    }
    else
        DisplayMessage(returnStrng.message);
}

function SetVisitArea(qid)
{
    $("#myform_4").val(curcustomerInfo.AreaCode);
    $("#myform_4").prop("disabled", "disabled").addClass("ui-state-highlight");
}

function RenderIHBSite(qid)
{
    // var areacode=curcustomerInfo.AreaCode;
    var srch_arr = new Array();
    var params = new Object();
    params["fld_idx"] = 4;
    params["val"] = curcustomerInfo.AreaCode;
    params["op"] = "eq";
    srch_arr.push(params);

    getData(qid, GetLookupOfCurrentScreen(qid, true), srch_arr);
}

function RenderCompetitorPricingInfo(qid)
{
    // var areacode=curcustomerInfo.AreaCode;
    if (curr_menu_item == "160" && qid == "23")
    {
        delete Headers[qid].sfilters;
        var srch_arr = new Array();
        var params = new Object();
        params["fld_idx"] = 3;
        params["val"] = curcustomerInfo.DealerId;
        params["op"] = "eq";
        srch_arr.push(params);

        getData(qid, GetLookupOfCurrentScreen(qid, true), srch_arr);
    }
    else
    {
        Headers[qid]["sfilters"] = [{ "s_fld_idx": "2" }, { "s_fld_idx": "4" }];
        getData(qid, GetLookupOfCurrentScreen(qid));
    }
}

function getShippingPoint()
{
    var depot = $("#myform_8").val();
    if (depot != null && depot != "")
    {
        var qstr = "?cmd=Prism_GetShippingPoint&depot='" + depot + "'";

        ajaxCall(qstr, null, "get", ShippingPointSuccess);
    }
}

function ShippingPointSuccess(returnStrng)
{
    if (returnStrng.response_code == "0")
    {
        var data = $.parseJSON(returnStrng.gpdata4);
        if (IsJson(data))
            data = $.parseJSON(data)

        if (data != null)
        {
            $("#myform_10").html(data.Shipping);
            $("#myform_11").val(data.Shippingdesc);
        }
    }
    else
        DisplayMessage(returnStrng.message);
}
function getShippingPointDesc()
{
    var shippingpoint = $("#myform_10").val();
    if (shippingpoint != null && shippingpoint != "")
    {
        var qstr = "?cmd=Prism_GetShippingPointDesc&shippingpoint='" + shippingpoint + "'";

        ajaxCall(qstr, null, "get", getShippingPointDescSuccess);
    }
}

function getShippingPointDescSuccess(returnStrng)
{
    if (returnStrng.response_code == "0")
    {
        var data = $.parseJSON(returnStrng.gpdata4);
        if (IsJson(data))
            data = $.parseJSON(data)

        if (data != null)
        {
            $("#myform_11").val(data.shipdesc);

        }
    }
    else
        DisplayMessage(returnStrng.message);
}

function GetDealerName(qid, data)
{
    //To date DealerName and DealerId in Header of form
    var DealerInformation = curcustomerInfo;
    if ($(".toolbar").find(".labelmargin").length <= 0)
    {
        $(".toolbar").append("<label class='labelmargin'>" + "Dealer: " + DealerInformation.DealerId + "(" + DealerInformation.DealerName + ")" + "</label>");
    }
    if (data == null)
    {
        $("#myform").find("#myModalLabel").text($("#myform").find("#myModalLabel").text() + " : " + DealerInformation.DealerId + "(" + DealerInformation.DealerName + ")");
    }
}

function SetProjectId(qid)
{
    $("#myform_1").val(curcustomerInfo.ProjectId);
    disableOldVisits(qid);//Modified by Aadilkhan
}

//---Added by Aadilkhan
function SetLeadId(qid)
{
    if (Headers[qid].optype == "Add")
    {
        $("#myform_1").val(curcustomerInfo.LeadID);
    }
    disableOldVisits(qid);//Modified by Aadilkha
}
//---End of---Added by Aadilkhan

function GetProjectVisit(qid)
{
    var srch_arr = new Array();
    var params = new Object();
    params["fld_idx"] = 1;
    //params["val"] = curcustomerInfo.curRouteDetailId;
    params["val"] = curcustomerInfo.ProjectId;
    params["op"] = "eq";
    srch_arr.push(params);


    getData(qid, GetLookupOfCurrentScreen(qid, true), srch_arr);
}
function GetLeadVisit(qid)
{
    var srch_arr = new Array();
    var params = new Object();
    params["fld_idx"] = 1;
    //params["val"] = curcustomerInfo.curRouteDetailId;
    params["val"] = curcustomerInfo.LeadID;
    params["op"] = "eq";
    srch_arr.push(params);


    getData(qid, GetLookupOfCurrentScreen(qid, true), srch_arr);
}

function RenderGoDownVisit(qid)
{
    var srch_arr = new Array();
    var params = new Object();
    params["fld_idx"] = 2;
    //params["val"] = curcustomerInfo.curRouteDetailId;
    params["val"] = curcustomerInfo.GodownId;
    params["op"] = "eq";
    srch_arr.push(params);


    getData(qid, GetLookupOfCurrentScreen(qid, true), srch_arr);
}

function DisableOldGodownVisit(qid)
{

    disableOldVisits(qid);//Modified by Aadilkhan

    $("#save_id").click(function () {

        $("#tab1").find('i').css({ 'top': '0px' , 'float':'right'});
        //$(".glyphicon").css({'top': '0px'});
        $('</br>').insertBefore($("#tab1").find('small')); //Adilkhan --used to align error message
    });
}

function disableOldVisits(qid)
{ //Added By Aadilkhan
    var i;
    if (qid == 74)
        i = 1;
    else
        i = 0;

    if (Headers[qid].optype == "Update" && gCurRow[i] != curcustomerInfo.curRouteDetailId) {
        $("#save_id").hide();
        $("#myform").find(".DataTD").each(function () {
            ele = $(this).children(0);
            ele.prop('disabled', true);
            $('span.input-group-addon').hide();
            ($('.radio-inline').children(0)).prop('disabled', true);
        });
    }//end
}

function GetInfluencerVisit(qid)
{
    var srch_arr = new Array();
    var params = new Object();
    params["fld_idx"] = 1;
    //params["val"] = curcustomerInfo.curRouteDetailId;
    params["val"] = curcustomerInfo.LeadID;
    params["op"] = "eq";
    srch_arr.push(params);


    getData(qid, GetLookupOfCurrentScreen(qid, true), srch_arr);
}

//--Added by Aadilkhan----------
function DealerVisitFormLoad(qid)
{
    disableOldVisits(qid);
    GetDealerName(qid, null);
}
//---end of added by Aadilkhan------

function GetDealerCompetitor()
{
    var val;
    var depot = $("#myform_2").val();
    if (depot != null && depot != "")
    {
        var qstr = "?cmd=Prism_GetDealerDepotwise&depot='" + depot + "'";

        if (Headers[23].optype == "Update" && gCurRow != null && gCurRow[3] != null)
            val = gCurRow[3];

        if (val != null)
            qstr += "&val=" + val + "";

        ajaxCall(qstr, null, "get", DealerCompetitorSuccess);
    }
}



function DealerCompetitorSuccess(returnStrng)
{
    var qid='23';
    var fqheader=Headers[qid];
    if (returnStrng.response_code == "0")
    {
        var data = $.parseJSON(returnStrng.gpdata4);
        if (IsJson(data))
            data = $.parseJSON(data)

        if (data != null)
        {
            $("#myform_3").html(data.dealerdetails);
            if (fqheader.optype == "Update" && gCurRow[3]!=null) {
                
                $("#myform_3").val(gCurRow[3].split(" -")[0]);
            }
            //$("#myform_11").val(data.Shippingdesc);
            if (curcustomerInfo && curcustomerInfo.DealerId && fqheader.optype!="Update")
            {
                var id = curcustomerInfo.DealerId + "-" + curcustomerInfo.DealerName;
                $("#myform_3").val(curcustomerInfo.DealerId);
            }
        }
    }
    else
        DisplayMessage(returnStrng.message);
}
function SetAreaDisable(qid)
{
    if (Headers[qid].optype == "Update")
    {
        $("#myform_4").prop("disabled", "disabled").addClass("ui-state-highlight");
    }
}
function getZoneReg()
{
    var qstr = "?cmd=Prism_GetZoneReg&EmpCode=" + $("#myform_0").val() + "";
    ajaxCall(qstr, null, "get", GetEmpCodedatasuccess);
}
function GetEmpCodedatasuccess(returnStrng)
{
    if (returnStrng.response_code == "0")
    {
        var data = $.parseJSON(returnStrng.gpdata4);
        if (IsJson(data))
            data = $.parseJSON(data)

        if (data != null)
        {
            $("#myform_3").removeAttr("disabled");
            $("#myform_1").html(data.zone);
            $("#myform_2").html(data.region);
            $("#myform_3").html(data.depot);
            $("#myform_1").attr("disabled", "disabled");
            $("#myform_2").attr("disabled", "disabled");
            if (loginData.loginInfo.Role == 'CSR')
                $("#myform_1").attr("disabled", "disabled");
            if ($("#myform_3").attr("multiple") == null)
                $("#myform_3").attr("multiple", "multiple")
            $("#myform_3").multiselect("destroy");
            $("#myform_3").multiselect({
                enableCaseInsensitiveFiltering: true,
                filterPlaceholder: 'Search...',
                buttonText: function (options, select)
                {
                    return process_multiselect(options, select);
                }
            });
            getAreaCode();
        }
    }
    else
        DisplayMessage(returnStrng.message);
}
function getAreaCode()
{

    var depot = $("#myform_3").val();

    var areaqry = "?cmd=Prism_GetAreaCode&depot=" + depot + "";

    /*@rizwan start*/
    if (Headers[28].optype == "Update" && gCurRow != null)
    {
        areaqry += "&value=" + gCurRow[4] + "";
    }
    /*@rizwan end*/

    ajaxCall(areaqry, null, "get", successAreaCode);
}

function successAreaCode(retstrg)
{
    if (retstrg.response_code == "0")
    {
        var data = $.parseJSON(retstrg.gpdata4);
        if (IsJson(data))
            data = $.parseJSON(data)
        if (data != null)
        {
            $("#myform_4").html(data.AreaCode);

            if ($("#myform_4").attr("multiple") == null)
                $("#myform_4").attr("multiple", "multiple")


            $("#myform_4").multiselect("destroy");
            $("#myform_4").multiselect({
                enableCaseInsensitiveFiltering: true,
                filterPlaceholder: 'Search...',
                buttonText: function (options, select)
                {
                    return process_multiselect(options, select);
                }
            });
        }
    }
    else
        DisplayMessage(retstrg.message);
}

/*Start adil khan pathan*/

function SetResetGPSLink(data, type, row, tobj) {
    return '<a href="#" id="resetGpslink" class="link" onclick=ResetGPS("' + row[1] + '")>  Reset GPS </a>';
}


function ResetGPS(id) {
    var qid = $("#" + event.target.id).closest("table").attr("qid");

    var qstr = "?cmd=Prism_ResetGPSLocation";

    if (id != null)
        qstr += "&qid=" + qid + "&id=" + id;

    ajaxCall(qstr, null, "get", GPSResetSuccesss);
}

function GPSResetSuccesss(Retstrg) {
    if (Retstrg.response_code != "1") {
        DisplayMessage(error_response_type[Retstrg.response_code]);
    }
    else {
        DisplayMessage(Retstrg.message);
    }
}

function HideGPSLink(qid) {
    if (loginData.loginInfo.Role == "ADMIN") {
        if (qid == 39)
            Headers[39].cols[20].hide = "10";
        else if (qid == 36)
            Headers[36].cols[34].hide = "10";
        else if (qid == 29)
            Headers[29].cols[22].hide = "10";
        else if (qid == 70)
            Headers[70].cols[39].hide = "10";
        else if (qid == 1213)
            Headers[1213].cols[19].hide = "10";
    }
    else {
        if (qid == 39)
            Headers[39].cols[20].hide = "1";
        else if (qid == 36)
            Headers[36].cols[34].hide = "1";
        else if (qid == 29)
            Headers[29].cols[22].hide = "1";
        else if (qid == 70)
            Headers[70].cols[39].hide = "1";
        else if (qid == 1213)
            Headers[1213].cols[19].hide = "1";
    }
}


function GetSPandCF()
{
    var fqheader = Headers[1216];
    var Type = '';
    var id ='';

    if (fqheader.optype == "Add") {

        Type = $("#myform_1:checked").prop('value');
    }

    var qstr = "?cmd=Prism_GetSPCFList";

    if (Type != null && Type != "")
        qstr += "&Type=" + Type;

    ajaxCall(qstr, null, "get", FillSpCfValues);
}
function FillSpCfValues(Retstrg)
{

    if (Retstrg.response_code == "0") {
        var data = $.parseJSON(Retstrg.gpdata4);
        if (IsJson(data))
            data = $.parseJSON(data)

        if (data != null) {
            $("#myform_2").html(data.EmpHtml);
        }
    }
    else
        DisplayMessage(Retstrg.message);

}
function getDealerCode(qid)
{
    var empcode = loginData.loginInfo.EmpCode;
    //var qid = 70;

    if (qid == 70) {
        var depot = $("#sform_4").val();
        var qstr = "?cmd=Prism_GetDealerDepotwise&depot='" + depot + "'&qid=" + qid + "";
        if(loginData.loginInfo.Role=="DEALER")
            qstr = "?cmd=Prism_GetDealerDepotwise&depot='" + depot + "'&qid=" + qid + "&empcode='" + empcode + "'";

    }
    else if (qid == 196) {
        var depot = $("#sform_18").val();
        var qstr = "?cmd=Prism_GetDealerDepotwise&depot='" + depot + "'";
        if (loginData.loginInfo.Role == "DEALER")
            qstr = "?cmd=Prism_GetDealerDepotwise&depot='" + depot + "'&empcode='" + empcode + "'";
    }

    if (depot != null && depot != "")
    {
        
        ajaxCall(qstr, null, "get", successGetDealerCodeList);
    }
  
}
function successGetDealerCodeList(retrnstrng)
{
    if (retrnstrng.response_code == "0")
    {
        var data = $.parseJSON(retrnstrng.gpdata4);
        if (IsJson(data))
            data = $.parseJSON(data)

        if (data != null && $("#sform_19").attr('name') && $("#sform_19").attr('name') == "Dealer")
        {
            $("#sform_19").html(data.dealerdetails);
            //$("#myform_11").val(data.Shippingdesc);
        }
        if (data != null && $("#sform_1").attr('name') && $("#sform_1").attr('name') == "Dealer Name") {
            $("#sform_1").html(data.dealerdetails);
            //$("#myform_11").val(data.Shippingdesc);
        }
    }
    else
        DisplayMessage(returnStrng.message);
}
function ApproveCredit(params, qid) {
    var id = GetUpdateDelIdx(200);
    params[0] = gCurRow[id];
    if ($($(event)[0].currentTarget).html() == "Approve")
        params[14] = "02";
    else 
        params[14] = "03";
    var qry_str = "?cmd=Prism_ProcessSap&qid=" + qid;
    getData(qid, GetLookupOfCurrentScreen(qid, null, qry_str), params);
    RefreshGridForSAP(200);
}
function CustomSAPButtonCredit(qid) {
   
    if (Headers[qid].optype == "Update") {
        
        var btnobj = new Object();
        btnobj["Approve"] = function () {
            Headers[qid].optype = "Add";
            validatefields(this, qid);
        };
        btnobj["Not Approve"] = function () {
            Headers[qid].optype = "Add";
            validatefields(this, qid);
        };
        return (btnobj);
    }

}
function HideUpdate(qid) {
    $("#save_id").hide();
    $("#cancel_id").hide();
}
function SetDepotDisable(qid) {
    var role = loginData.loginInfo.Role;
    if (role == "RHM" || role == "ZHM" || role == "CMO" || role == "ADMIN") {
        $('#myform_13').prop("disabled", false).removeClass("ui-state-highlight");
    }
}
//khushali Shah:To save the ihb site entered today and even enter the data in planning
function SaveIHBSitedate(params, qid)
{
    var qstr = "?cmd=Prism_SetIHBSiteData&qid=" + qid + "";
    ajaxCall(qstr, params, "post", GetEmpCodedatasuccess);
}
//function GetDealerCode(qid)
//{
//    $("#sform_4").trigger("onchange");
//}

function ProcessIHBSiteInfo(qid,data)
{
    var fqheader = Headers[qid]; //-- Headers[36] Modified by Aadilkhan--
    var CustomerID = data.gpdata3;
    //if ((fqheader.optype == "Add" || fqheader.optype == "Delete") && CustomerID != null && CustomerID.length > 0)
    if (fqheader.optype == "Add" || fqheader.optype == "Delete")
    {
        var deletetrue = fqheader.optype == "Delete" ? true : false;
        var qstr = "?cmd=Prism_ProcessIHBSiteInfo&CustomerID=" + CustomerID + "&Delete="+deletetrue;

        ajaxCall(qstr, null, "get", IHBSiteInfoResponse);
        delete gLookup.ihbsiteid;
    }
}

function IHBSiteInfoResponse(retStr)
{
    if(retStr.response_code == "0")
    {
        var IHBData = $.parseJSON(retStr.gpdata4);
        loginData.IHBSiteInfo = IHBData.IHBSiteInfo;
        loginData.TodayCSRVisitPlan = IHBData.TodayCSRVisitPlan;
    }
    else    
        DisplayMessage(retStr.message);    
}

function ProcessProjectInfo(qid, data) {
    var fqheader = Headers[qid]; //-- Headers[36] Modified by Aadilkhan--
    //var CustomerID = data.gpdata3;
    //if ((fqheader.optype == "Add" || fqheader.optype == "Delete") && CustomerID != null && CustomerID.length > 0)
    if (fqheader.optype == "Add" || fqheader.optype == "Delete") {
        var qstr = "?cmd=Prism_ProcessProjectInfo";

        ajaxCall(qstr, null, "get", ProjectInfoResponse);
    }
}

function ProjectInfoResponse(retStr) {
    if (retStr.response_code == "0") {
        var ProjectData = $.parseJSON(retStr.gpdata4);
        loginData.ProjectList = ProjectData.ProjectList;
        loginData.TodayProjectVisitPlan = ProjectData.TodayProjectVisitPlan;
    }
    else
        DisplayMessage(retStr.message);
}

function ProcessInfluencerInfo(qid, data) {
    var fqheader = Headers[qid];
    if ((fqheader.optype == "Add" || fqheader.optype == "Delete") && data.response_type=="7") {
        var qstr = "?cmd=Prism_ProcessInfluencerInfo";
        ajaxCall(qstr, null, "get", InfluencerInfoResponse);
    }
}

function InfluencerInfoResponse(retStr) {
    if (retStr.response_code == "0") {
        var InfluencerData = $.parseJSON(retStr.gpdata4);
        loginData.InfluencerList = InfluencerData.InfluencerList;
        loginData.TodayInfluencerVisitPlan = InfluencerData.TodayInfluencerVisitPlan;
    }
    else
        DisplayMessage(retStr.message);
}

/* start --Aadilkhan */
function SetRakeNo(qid) {

    var value = $('#custDetail').find('#lblHeader').text();
    var mes = value.split(" ");
    $('#myform_1').val(mes[2]);

}

function PostProcessOperation(qid)
{
    $("#custDetail").find("#div_buttons input[id='"+qid+"']").click();
}


function HideResetPasswordField(qid) {
    //var role = loginData.loginInfo.Role;
    var header = Headers[qid];
    var cols = header.cols;

    if (loginData && loginData.loginInfo && loginData.loginInfo.Role == "ADMIN") {
        if (qid == 50)
            header.cols[25].hide = "10";
    }
    else {
        if (qid == 50)
            header.cols[25].hide = "1";
    }
}

function SetResetPasswordLink(data, type, row, tobj) {
    return "<a href='#' id='resetPasswordlink' class='link' onclick='ResetPassword(\"" + row[2] + "\")' >  Reset Password </a>";
}

function ResetPassword(UserName) {
    var qid = $("#" + event.target.id).closest("table").attr("qid");
    var params = new Object();
    var offlineCallType = null;
    params[1] = UserName
    var qstr = "?cmd=ForgotPassword&isReset=true";

    if (UserName != null || UserName != "")
        qstr += "&qid=" + qid;

    getData(qid, qstr, params, offlineCallType);
}

function PasswordResetSuccesss(Retstrg) {
    if (Retstrg.response_code != "1") {
        DisplayMessage(error_response_type[Retstrg.response_code]);
    }
    else {
        DisplayMessage(Retstrg.message);
    }
}

/* end */

function GetDealerNameFromCode() {
    var val;
    var dealercode = $("#myform_3").val();
    if (dealercode != null && dealercode != "") {
        var qstr = "?cmd=Prism_GetDealerNameFromCode&dealercode='" + dealercode + "'";

        //if (Headers[23].optype == "Update" && gCurRow != null && gCurRow[3] != null)
        //    val = gCurRow[3];

        //if (val != null)
        //    qstr += "&val=" + val + "";

        ajaxCall(qstr, null, "get", GetDealerNameFromCodeSuccess);
    }
}



function GetDealerNameFromCodeSuccess(returnStrng) {
    
    if (returnStrng.response_code == "0") {
        var data = $.parseJSON(returnStrng.gpdata4);
        if (IsJson(data))
            data = $.parseJSON(data)

        if (data != null) {           
            $("#myform_4").val(data.dealername);
            $("#myform_6").val(data.zonecode);
            $("#myform_7").val(data.regioncode);
            $("#myform_8").val(data.depotcode);
            $("#myform_9").val(data.contactno);
            $("#myform_12").val(data.birthdate);
            $("#myform_13").val(data.city);
            $("#myform_14").val(data.address);
            $("#myform_15").val(data.pincode);
           
        }
    }
    else
        DisplayMessage(returnStrng.message);
}

function DisableDealer() {
    $('#sform_1').prop("disabled", "disabled").addClass("ui-state-highlight");
}

function InfluencerMet(){
    if ($('#myform_3:checked').val() == "2") {
        $('#myform_4').prop("disabled", "disabled").addClass("ui-state-highlight").val('0');
       
    } else {
        $('#myform_4').prop("disabled", false).removeClass("ui-state-highlight");
        
    }
}


function GetDepotFromRegionSuccess(returnStrng) {
//    if (returnStrng.response_code == "0") {
//        var data = $.parseJSON(returnStrng.gpdata4);
//        if (IsJson(data))
//            data = $.parseJSON(data);

//        if (data != null) {
//            //$("#myform_5").html('<option value="D024"  selected="selected" >Jabalpur Depot</option>');
//            $("#myform_5").html(data.depotdetails);
//            if ($("#myform_5").attr("multiple") == null)
//                $("#myform_5").attr("multiple", "multiple")
//            $("#myform_5").multiselect("destroy");
//            $("#myform_5").multiselect({
//                enableCaseInsensitiveFiltering: true,
//                filterPlaceholder: 'Search...',
//                buttonText: function (options, select) {
//                    return process_multiselect(options, select);
//                }
//            });
//        }
//    }
//    else
//        DisplayMessage(returnStrng.message);
}
//---End of Pratik code--

/*adil khan start*/
//function VisitMasterDelete(qid,del_id,del_value)
//{
//    var params = new Object();
//    params["cmd"] = "Prism_VisitMasterDelete";
//    params["qid"] = qid;
//    params["field"] = del_id;
//    params["value"] = del_value;
//    var response = CallServerMethod(params);
//    if (response.gpdata4 == true)
//    {
//        var qstr = "?qid=" + qid + "&cmd=Del&del_id=" + del_id + "&del_value=" + del_value + "";
//        getData(qid, qstr);
//    }
//    else
//        DisplayMessage(error_response_type[response.response_code]);
//}

function VisitMasterDelete(qid, del_id, del_value)
{    
    var qstr = "?cmd=Prism_VisitMasterDelete&qid=" + qid + "&field=" + del_id + "&value=" + del_value + "";    
    ajaxCall(qstr, null, "post", successVisitMaster);
}
function successVisitMaster(retStrg) {
    if (retStrg.response_code == "0") {
        if (retStrg.gpdata4 == true) {
            var qstr = "?qid=" + retStrg.gpdata1 + "&cmd=Del&del_id=" + retStrg.gpdata2 + "&del_value=" + retStrg.gpdata3 + "";
            getData(retStrg.gpdata1, qstr);
        }
        else
            DisplayMessage(error_response_type[retStrg.response_code]);
    }
    else
        DisplayMessage(error_response_type[retStrg.response_code]);
}

function CustomeVisitMasterSave(qid, params)
{

    var qstr = "?qid=" + qid + "&cmd=Prism_VisitMasterSave";
    //ajaxCall(qstr, params, "post", IHBSiteSaveResponse);
    ajaxLocalCall(qstr, params, "post", VisitMasterSaveResponse, null, "Default");
}

function VisitMasterSaveResponse(retStr)
{
    if (retStr.response_type == 2)
    {
        var fqheader = Headers[retStr.gpdata4];
        ProcessPostDMLOperations(retStr, fqheader, retStr.gpdata4);
    }
}
/*end*/
function HandlingCharge() {
    var handling = $("#myform_30").val();
    var service = handling * 0.1236;
    $("#myform_36").val((service).toFixed(2));
}

function MinMaxStack() {

    var minvalue = parseInt($("#myform_6").val());
    var maxvalue = parseInt($("#myform_7").val());

    if (minvalue >= maxvalue) {
        DisplayMessage("MinStacking should be less than MaxStacking");
        return false;
    }
    else
        return true;
}

/* --start --Aadilkhan */

function SetDepotDealerforComPricInfo(qid)
{
    if (curr_menu_item == "160" && qid == "23")
    {
        
        for (var i = 0; i < gLookup["depotdealer"].li_key.length; i++)
        {
            if ($.inArray(curcustomerInfo.DealerId, gLookup["depotdealer"].li_child[i].li_key) >= 0)
            {
                $("#myform_2").val(gLookup["depotdealer"].li_key[i]).prop('disabled', 'disabled').addClass("ui-state-highlight").trigger("onchange");
            }
        }
        $("#myform_3").val(curcustomerInfo.DealerId).prop('disabled', 'disabled').addClass("ui-state-highlight");
    }
    else if (Headers[qid].optype == "Update" && qid == "23" && curr_menu_item != "160")
    {
        $("#myform_2").val(gLookup["depotdealer"].li_key[gLookup["depotdealer"].li_key.indexOf(gCurRow[2])]).prop('disabled', 'disabled').addClass("ui-state-highlight");
        $("#myform_3").val(gLookup["depotdealer"].li_child[gLookup["depotdealer"].li_key.indexOf(gCurRow[2])].li_key[gLookup["depotdealer"].li_child[gLookup["depotdealer"].li_key.indexOf(gCurRow[2])].li_val.indexOf(gCurRow[3])]);
    }
}
function GenerateSubordinateLocationReport()
{
    try {
        var zoneid = loginData.loginInfo["ZoneCode"];
        var RouteDeviationHTML = new Array();
        RouteDeviationHTML.push('<p class="validateTips paddingTop10" id="myform_err" style=""></p>');
        RouteDeviationHTML.push('<table class="EditTable"><tr>');
        RouteDeviationHTML.push('<td class="DataTD" style="text-align:right">Employee : </td><td class="DataTD"><select name=Empinfo id="empcode" style="width:200px;"><option></option></select></td>');
        RouteDeviationHTML.push('</tr></table><div class="grid_layout"></div>');
        RouteDeviationHTML.push('<div id="devmap" style="width: auto; height:84%;position:relative;"></div>');
        $("#div_par").html(RouteDeviationHTML.join(''));

        var html = "<option value=''></option>";
        for(var key in gLookup["empData"])
        {
            html += '<option value="' + key + '">' + gLookup["empData"][key]; + '</option>';
        }
        $("#empcode").empty();

        $("#empcode").html(html).change(function ()
        {
            GenerateGraphicalReportFroSumordinate($("#empcode").val());
        });

        $("#ReportStartDate").datepicker({
            changeMonth: true,
            changeYear: true,
            buttonImageOnly: true,
            numberOfMonths: 1,
            dateFormat: 'dd-mm-yy',
            showButtonPanel: true,
            closeText: 'Clear'
        });
        loadDevMap();

        GenerateGraphicalReportFroSumordinate('');
    }
    catch (e) {
        DisplayMessage("Exception ocurred in GenerateSubordinateLocationReport()");
    }

}
function GenerateGraphicalReportFroSumordinate(EmpCode)
{
    var params = new Object();
    params["cmd"] = "Prism_SubordinateTracking";
    params["EmpCode"] = EmpCode;
    if (devmap != undefined)
        devmap.remove();
    loadDevMap();

    var qstr = "?cmd=Prism_SubordinateTracking&EmpCode=" + EmpCode;
    ajaxCall(qstr, null, "get", SubordinateTrackingSuccess);
}
function SubordinateTrackingSuccess(ReportData)
{
    if (ReportData.message == "[]") {
        var isChrome = window.chrome;
        //if (isChrome)
        DisplayMessage("No data found");
        //else
        //showValidateTips("", "No data found");
        $("#div_par .grid_layout").html("");
        return;
    }
    var Report = JSON.parse(ReportData.message);
    var LeafIcon = L.Icon.extend({ options: { iconSize: [30, 30], popupAnchor: [0, -15] } });
    var VanHaltedIcon = new LeafIcon({ iconUrl: 'map\\marker-icon.png' });


    var GpsLatLng = new Array();
    var popUpText;

    for (var key in Report) {
        if (key == "0") {
            lat1 = Report[key].latitude;
            lng1 = Report[key].longitude;
        }

        if (key == "indexOf")
            continue;
        else {
            lat1 = Report[key].latitude;
            lng1 = Report[key].longitude;
            lat2 = Report[key].latitude;
            lng2 = Report[key].longitude;

            var date = Report[key].CreatedDate;
            var Device = Report[key].DeviceID;
            var Employee = Report[key].Employee;

            popUpText = '<b>Device ID : </b>' + Report[key].DeviceID + '<br/><b>Employee : </b>' + Report[key].Employee + '<br/><b>Date Time : </b>' + Report[key].CreatedDate + '<br/>'/*<b>Location : </b>' + Glocation + '<br/>'*/;
            GpsLatLng.push(new L.LatLng(lat1, lng1));

            L.marker([lat1, lng1], { icon: VanHaltedIcon }).bindLabel(Device, { noHide: true }).addTo(devmap).bindPopup(popUpText).openPopup();
        }

        if (Report.length == 1)
            devmap.setView(L.latLngBounds(GpsLatLng).getCenter(), 11);
    }

}

/* --End*/
/* start Aadilkha */
function DisableDateDuration(qid)
{
    $("#sform_3").prop("disabled","disabled");
}

function ClearScreen() {
    $("#div_par").empty();
}
function GORBValues() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; i < 4; i++) {
            if (i != j) {
                if ($("#myform_" + (i + 4)).val() == $("#myform_" + (j + 4)).val()) {
                    DisplayMessage("Min values of any fields can not be same");
                    return false;
                }
            }
        }
    }
    return true;
}
/* end */
function disableProposalApproval(qid) {
    if (Headers[qid].optype == "Update") {
        if (gCurRow[6] == loginData.loginInfo.EmpCode) {
            var qstr = "?cmd=Prism_GetProposalApproval&ApprovalId=" + gCurRow[0] + "&ProposalId=" + gCurRow[2] + "";
            ajaxCall(qstr, null, "get", GetProposalApprovalSuccess);
        } else {
            $("#save_id").hide();
                $("#pc_cform").find(".DataTD").each(function () {
                    ele = $(this).children(0);
                    ele.prop('disabled', 'disabled').addClass("ui-state-highlight");
                    $('span.input-group-addon').hide();
                    ($('.radio-inline').children(0)).prop('disabled', 'disabled').addClass("ui-state-highlight");
                });
        }
    }
    //if (Headers[qid].optype == "Update" && gCurRow[5] != loginData.loginInfo.EmpCode) {
        
    //    $("#save_id").hide();
    //    $("#pc_cform").find(".DataTD").each(function () {
    //        ele = $(this).children(0);
    //        ele.prop('disabled', true);
    //        $('span.input-group-addon').hide();
    //        ($('.radio-inline').children(0)).prop('disabled', true);
    //    });
    //}
}

function GetProposalApprovalSuccess(returnStrng) {

    if (returnStrng.response_code == "0") {
        var data = $.parseJSON(returnStrng.gpdata4);
        if (IsJson(data))
            data = $.parseJSON(data)

        if (data != null) {
            if (data.month == "0") {
                $("#save_id").hide();
                $("#pc_cform").find(".DataTD").each(function () {
                    ele = $(this).children(0);
                    ele.prop('disabled', 'disabled').addClass("ui-state-highlight");
                    $('span.input-group-addon').hide();
                    ($('.radio-inline').children(0)).prop('disabled', 'disabled').addClass("ui-state-highlight");
                });
            }
            
        }
    }
    else
        DisplayMessage(returnStrng.message);
}

function SetDefaultDealer() {
    if (loginData.loginInfo.Role == "DEALER") {
        $("#sform_0").val(loginData.loginInfo.EmpCode);
        $("#sform_0").prop("disabled","disabled");
    }

    $("#sform_0").parent().parent().find('label').text("Dealer");
    $("#myform_0").parent().parent().find('label').text("Dealer");
}

/* start -- Aadilkhan */
function GetCustomerContactProgram(qid)
{
    var qstr ="?cmd=data&&qid=" + qid;
    getData(qid, qstr);

}
/* -- end -- */

function GetYearwiseMonth() {
    
    if ($("#sform_4").val() == ((new Date).getFullYear())) {
        for (var i = ((new Date().getMonth()) + 1) ; i < 13; i++)
            $("#sform_5 option[value='" + i + "']").attr("disabled", true);
    } else {
        for (var i = 1; i < 13; i++)
            $("#sform_5 option[value='" + i + "']").attr("disabled", false);
    }
}