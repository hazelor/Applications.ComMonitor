
function showCustomerDetailmenu(MenuId)
{
    var htmlstr = ' <section class="sidebar">\
        	            <ul class="sidebar-menu">';

    var subMenu;
    var menu_obj = loginData.menu_obj;
    for (var i = 0; i < menu_obj.length; i++)
    {
        if (menu_obj[i].MenuId == MenuId)
        {
            subMenu = menu_obj[i].subMenu;
            break;
        }
    }

    htmlstr += '<li class="toggle"><a role="button" data-toggle="offcanvas" class=" btn-toggle sidebar-toggle " href="#"><span class="icon-0"></span></a></li>';

    var menu_itm_idx;
    for (var subMenuObj in subMenu)
    {
        if (subMenu[subMenuObj].MenuId == "219" || subMenu[subMenuObj].MenuId == "1326" || subMenu[subMenuObj].MenuId == "248" && subMenu[subMenuObj].id == "0")
            continue;
        else if (MenuId == "160")
        {
            var visits = subMenu[subMenuObj].Visit;
            if (visits != null && visits.length > 0)
            {
                var spl_visit = visits.split(",");
                var cust_type = curcustomerInfo.CustomerType;
                if ($.inArray(cust_type.toString(), spl_visit) == -1)
                {
                    continue;
                }
            }
        }


        menu_itm_idx = 1 + parseInt(subMenuObj, 10);
        htmlstr += '<li  id="SubMenu-' + subMenuObj + '"';
        htmlstr += ' onclick=\"ViewInformationMenuItem(this,\'' + subMenu[subMenuObj].id + '\',\'' + MenuId + '\')\" qid=' + subMenu[subMenuObj].id + ' ><a href="#" title="' + subMenu[subMenuObj].src + '"><span class="icon-' + menu_itm_idx + '"></span><span class="detail">' + subMenu[subMenuObj].src + '</span></a></li>';

    }

    htmlstr += '</ul>\
                    </section>\ ';

    //$("#div_par").addClass('right-side').css({ "overflow": "auto", "height": $(window).height() - 110 });
    //$("#div_ch10").addClass('left-side sidebar-offcanvas').css({ "overflow": "auto", "height": $(window).height() - 110 });

    $("#div_par").addClass('right-side');//.css({ "overflow": "auto"});
    $("#div_ch10").addClass('left-side sidebar-offcanvas').css({ "overflow": "auto"});

    $("#div_ch10").html(htmlstr);
    //$("#main").addClass("wrapper row-offcanvas row-offcanvas-left").css("width", '');

}

function ViewInformationMenuItem(evt, qid, MenuId)
{
    if (!((isPhoneGap() && isNetworkAvailable()) || navigator.onLine))
    {
        if(MenuId != "160")
        {
            DisplayMessage(error_response_type["gp2039"]);
            return;
        }
    }
    var mainmenus = loginData.menu_obj;
    var subMenu;
    var disableprop;
    var cur_menu = $(evt).find("span.detail").html();

    var win_width = $(window).width();
    if (win_width <= 768 || qid == "0")
    {
        if (!$("#div_ch10").hasClass("collapse-left"))
            $("#div_ch10").addClass("collapse-left")

        if (!$("#div_par").hasClass("strech"))
            $("#div_par").addClass("strech")

        $("#header_toggle").css("display", "none");

        setTimeout(function ()
        {
            //  alert($("#header_toggle").height());
            ManagePlannerDesign();
        }, 1000);
    }

    if (qid.indexOf('funct') == 0)
    {
        var fun_to_call = qid.substr(6)
        eval(fun_to_call);
        return;
    }
    if (qid == 0)
    {
        for (var i = 0; i < mainmenus.length; i++)
        {
            if (mainmenus[i].MenuId == MenuId)
            {
                subMenu = mainmenus[i].subMenu;
                break;
            }
        }
        var grand_sub_menu;
        for (var j = 0; j < subMenu.length; j++)
        {
            if (subMenu[j].hasOwnProperty("subMenu") && subMenu[j].src == cur_menu)
            {
                grand_sub_menu = subMenu[j].subMenu;
                break;
            }
        }
        if (grand_sub_menu != null && grand_sub_menu.length > 0)
        {
            var disableprop;
            var htm = '<div id="div_buttons">';
            /// spratik ///
            htm += "<label id='Report_header' class='dashboard_header'>" + cur_menu + "</label>";
            /// epratik ///
            htm += '<select id="ddl_submenu" class="ddl_submenu" onchange="SetSubMenuEvent(this)"><option value=""> SubMenu Options</option>';
            for (var k = 0; k < grand_sub_menu.length; k++)
            {
                //htm += '<input type="button" id=' + grand_sub_menu[k].id + ' value="' + grand_sub_menu[k].src + '" ' + disableprop + ' onclick="ViewInformationDetails(this, ' + grand_sub_menu[k].id + ')"/>';
                htm += "<option value=" + grand_sub_menu[k].id + ">" + grand_sub_menu[k].src + "</option>";
            }
            htm += '</select></div>';
            $("#div_par").html(htm);
        }
    }
    else
    {
        $("#div_buttons").remove();
        var fqheader = Headers[qid]
        if (fqheader.grid_attrib && fqheader.grid_attrib.grid_template != null)
            eval(fqheader.grid_attrib.grid_template)
        else
            ViewInformationDetails(evt, qid);
    }
    $(evt).siblings().removeClass("selected-menu");
    $(evt).addClass("selected-menu");
    $("body").css("background", "white");
}

function SetSubMenuEvent(evt)
{
    var qid = $(evt).val();
    if (qid != null && Headers.hasOwnProperty(qid))
    {
        var fqheader = Headers[qid];
        var htm = "";
        if ($("#div_buttons").find("button").length > 0)
            $("#div_buttons").find("button").remove();

        /// spratik ///
        if ($("#dashboard_srch").length > 0)
            $("#dashboard_srch").remove();
        /// epratik ///

        if (fqheader.hasOwnProperty("sfilters"))
        {
            htm += "<button title='Search' class='toolbar_btns cust_srch' onclick=PerformSearch(" + qid + ")><div class='SearchButton' ></div></button>";
            $("#div_buttons").append(htm);
        }

        if ($("#div_par").find("#div_parr").length == 0)
            $("#div_par").append("<div id='div_parr'></div>");

        if (qid == "136" || qid == "146" || qid == "150" || qid == "151")
        {
            $("#div_par").css({ "overflow": "auto" });
            $("#div_parr").css({ "float": "left"});
            
            if(qid == "146" || qid == "150" || qid == "151")
                $("#div_parr").css({ "width": "100%" });
        }
        else
        {
            $("#div_par").css({ "overflow": "" });
            $("#div_parr").css({ "float": "" ,"width":""});
        }

        ViewInformationDetails(evt, qid);
    }
}

function ViewSubMenu(parentmenuid, dealerid, qid, dealername)
{
    var menu = loginData.menu_obj;
    var render_menu = parentmenuid.split('_');

    var get_render_menu;
    for (var i = 0; i < render_menu.length; i++)
    {
        get_render_menu = fetch_menu(menu, render_menu[i]);
        menu = get_render_menu;
    }
    if (get_render_menu != null && get_render_menu.length > 0)
    {
        var htm = '<div id="div_buttons">';
        for (var k = 0; k < get_render_menu.length; k++)
        {
            htm += '<input type="button" id=' + get_render_menu[k].id + ' value="' + get_render_menu[k].src + '" onclick="ViewInformationDetails(this, ' + get_render_menu[k].id + ',\'' + dealerid + '\')" />';
        }
        htm += '</div>';
        //  var htmldata = '<div height:"530px" width:"540px"></div>';        
        //$("#dialog-message").find(".modal-footer").css({ "bottom": "0px" });
        //if (dealername == "")
        ///    PRATIK //////
        var header = Headers[qid];
        var dialogheader = new Array();
        
        if (header.grid_attrib && header.grid_attrib.dialog_header != null)
            dialogheader = header.grid_attrib.dialog_header;
        

        if (dialogheader.length==1)
            ShowDialog("custDetail", htm, null, null, null, null, ""+dialogheader[0]+": " + dealerid + "");
        else
            ShowDialog("custDetail", htm, null, null, null, null, "" + dialogheader[0] + ": " + dealerid + "  " + dialogheader[1] + ":" + dealername);

        ///    PRATIK //////

        $(document).keypress(function (e) { if (e.which == 27) { ViewInformationDetails(null, qid); $("#custDetail").modal('hide'); } });
        $("#custDetail").css({ "height": $(window).height() - 80, "width": $(window).width() - 100, "z-index": 1039 }).removeClass("height250 center_popup").addClass("center_popup_dealer");
        $("#custDetail .modal-body").css({ "height": $(window).height() - 200, "overflow": "auto" });

        $('#custDetail').on('hide.bs.modal', function (e)
        {
            $("#div_ch10").find("li.selected-menu").click();            
        });
    }
}

function fetch_menu(menu, menu_id)
{
    for (var j = 0; j < menu.length; j++)
    {
        if (menu[j].MenuId == menu_id)
        {
            return menu[j].subMenu;
        }
    }
    return null;
}


function getSummary(dtree, sfunc)
{
    var k, l, val;
    var ar_sum_val = [];
    var dflds = dtree.values[0].length;

    for (k = 0; k < dtree.values.length; k++)
    {
        for (l = 0; l < dflds; l++)
        {
            val = dtree.values[k][l];
            if (val.length == 0)
                val = 0;
            if (k == 0)
                ar_sum_val.push(parseInt(val));
            else
                ar_sum_val[l] += parseInt(val);
        }
    }
    if (sfunc == "avg") // average 
    {
        for (l = 0; l < dflds; l++)
        {
            ar_sum_val[l] = ar_sum_val[l] / dtree.values.length;
        }
    }
    return (ar_sum_val);
}

function initSummary(data, ar_dflds)
{
    var tval, j;
    var ar_sum_val = [];
    for (j = 0; j < ar_dflds.length; j++)
    {
        tval = data[ar_dflds[j]];
        if (!tval)
            tval = 0;
        ar_sum_val.push(tval);
    }
    return (ar_sum_val);
}

function getTreeNode(child)
{
    var dtree = {};
    dtree.labels = [];
    dtree.legends = [];
    dtree.values = [];
    if (child)
        dtree.child = [];
    return (dtree);
}

function ProcessJtreeResponse(result, qid, rdiv)
{
    if ($("#div_par #div_buttons").length > 0)
    {
        if ($("#div_par").find("#div_parr").length == 0)
            $("#div_par").append("<div id='div_parr'></div>");

        rdiv = "div_parr";
    }
    //RenderGridData(result, qid, rdiv);
    //return;

    var fqhdr = Headers[qid];
    var qopt = qry_opt[qid];
   
    var dis_type =qopt.type;
    var kflds = qopt.key_flds;
    var ar_sum_val = [];
    var sfunc = "";
   
    var ar_dflds = qopt.data_flds;
    var i, j, k, l, r, tval;
   
    sfunc = qopt.sum_func;

    slegend = qopt.legend_flds;
   

    var data = result.gpdata1;
    var rdata, rdata1;
    var ar_tree = [];
    var clevel;

    if (data.length == 0)
    {
        $("#div_parr").html(null);// pratik to clear old charts
        DisplayMessage("No Data Returned");
        return;
    }

    rdata = data[0];

    if (dis_type == 'chart')  // chart 
    {
        var jtree, dtree, ptree;
        // create levels of Jtree

        for (i = 0; i < kflds ; i++)
        {
            dtree = getTreeNode(true);
            ar_tree.push(dtree);
            dtree.labels.push(rdata[i + 1]);
            if (slegend && slegend[i])
                ar_tree[i].legends.push(rdata[i + 1] + ":" + rdata[slegend[i]]);

            if (ptree)
                ptree.child[0] = dtree;
            ptree = dtree;
        }
        dtree.values.push(initSummary(rdata, ar_dflds));

        jtree = ar_tree[0];

        // scan through records to initialise data in jtree
        for (r = 1; r < data.length; r++)
        {
            rdata1 = data[r];
            clevel = -1;

            for (i = 0; i < kflds - 1 ; i++)
            {
                if (rdata[i + 1] != rdata1[i + 1])
                {
                    if (clevel == -1)
                        clevel = i;
                    for (j = kflds - 1; j > i ; j--)
                    {
                        dtree = ar_tree[j];
                        ar_sum_val = getSummary(dtree, sfunc);
                        ar_tree[j - 1].values.push(ar_sum_val);

                    }
                    break;
                }
            }

            if (clevel != -1)
            {
                // add an entry in the current level 
                ar_tree[clevel].labels.push(rdata1[clevel + 1]);
                if (slegend && slegend[clevel])
                    ar_tree[clevel].legends.push(rdata1[clevel + 1] + ":" +rdata1[slegend[clevel]]);

                for (i = clevel + 1; i < kflds; i++)
                {
                    dtree = getTreeNode(true);
                    if (i != kflds - 1)
                    {
                        dtree.labels.push(rdata1[i + 1]);
                        if (slegend && slegend[i])
                            dtree.legends.push(rdata1[i + 1] + ":" +rdata1[slegend[i]]);
                    }
                    ar_tree[i] = dtree;
                }

                for (i = clevel; i < kflds - 1; i++)
                {
                    ar_tree[i].child.push(ar_tree[i + 1]);
                }
            }

            dtree.labels.push(rdata1[kflds]);
            if (slegend && slegend[kflds-1])
                dtree.legends.push(rdata1[kflds] + ":" + rdata1[slegend[kflds-1]]);
             
            dtree.values.push(initSummary(rdata1, ar_dflds));
            rdata = rdata1;
        }
        // push in to tree balance values
        for (j = kflds - 1; j > 0; j--)
        {
            dtree = ar_tree[j];
            if (dtree.labels.length > 0)
            {
                ar_sum_val = getSummary(dtree, sfunc);
                ar_tree[j - 1].values.push(ar_sum_val);
            }
        }
        $("#" + rdiv).addClass("float_left").html('<div class="container" id="chart_min"> </div><div class="container" id="chart_max"> </div>');
        InitPanel(jtree, qid);
        return;        
    }
    else if(dis_type="tree")
    {
        var crow;
        var rows = [];
        var jrows = result.gpdata1;
        /*if (jrows == null)
            jrows = result; */
        var hdr = Headers[qid];
        var cols = LangHeaders[qid].colnames;
        var ccnt = cols.length;
        if (hdr.grid_attrib && hdr.grid_attrib.data_fld_cnt)
            ccnt = hdr.grid_attrib.data_fld_cnt;


        //rows.push('<a href="#" onclick="jQuery('#example-advanced').treetable('expandAll'); return false;">Expand all</a><a href="#" onclick="jQuery('#example-advanced').treetable('collapseAll'); return false;">Collapse all</a>')

        rows.push('<table id="example-advanced"><tbody><tr>');

        for (var i = 0; i < ccnt; i++)
            rows.push("<th>" + cols[i] + '</th>')
        rows.push('</tr>');


        for (var i = 0; i < jrows.length; i++)
        {
            crow = jrows[i];
            rows.push("<tr data-tt-id='" + i + "' ");
            if (crow[0] != "-1")
                rows.push(" data-tt-parent-id='" + crow[0] + "'  >");
            else
                rows.push(">");
            for (var j = 1; j < crow.length; j++)
            {
                rows.push("<td>" + crow[j] + "</td>");
            }
            rows.push("</tr>");
        }
        rows.push("</tbody></table>");

        $("#" + rdiv).html(rows.join(''));
        $("#example-advanced").treetable({ expandable: true });
    }
};


/*

function ProcessJtreeResponse(result, qid, rdiv)
{
    if ($("#div_par #div_buttons").length > 0)
    {
        $("#div_par").append("<div id='div_parr'></div>");
        rdiv = "div_parr";
    }
    if (result.response_type == 4)
    {
        $("#" + rdiv).html('<div id="search_panel">Search</div><div class="container" id="chart_min"> </div><div class="container" id="chart_max"> </div>');
        InitPanel(result.gpdata1, qid);
    }
    else
    {
        var crow;
        var rows = [];
        var jrows = result.gpdata1;
        if (jrows == null)
            jrows = result;
        var hdr = Headers[qid];
        var cols = LangHeaders[qid].colnames;
        var ccnt = cols.length;
        if (hdr.grid_attrib && hdr.grid_attrib.data_fld_cnt)
            ccnt = hdr.grid_attrib.data_fld_cnt;


        //rows.push('<a href="#" onclick="jQuery('#example-advanced').treetable('expandAll'); return false;">Expand all</a><a href="#" onclick="jQuery('#example-advanced').treetable('collapseAll'); return false;">Collapse all</a>')

        rows.push('<table id="example-advanced"><tbody><tr>');

        for (var i = 0; i < ccnt; i++)
            rows.push("<th>" + cols[i] + '</th>')
        rows.push('</tr>');


        for (var i = 0; i < jrows.length; i++)
        {
            crow = jrows[i];
            rows.push("<tr data-tt-id='" + i + "' ");
            if (crow[0] != "-1")
                rows.push(" data-tt-parent-id='" + crow[0] + "'  >");
            else
                rows.push(">");
            for (var j = 1; j < crow.length; j++)
            {
                rows.push("<td>" + crow[j] + "</td>");
            }
            rows.push("</tr>");
        }
        rows.push("</tbody></table>");

        $("#" + rdiv).html(rows.join(''));
        $("#example-advanced").treetable({ expandable: true });
    }
}; */



function ViewInformationDetails(evt, qid, dealerId)
{
    var cur_qid;
    cur_qid = qid;
    var req_start = new Date();
    var req_end;    
    var fqheader = Headers[qid];
    fqheader.render_div = "div_par"

    if ($("#sform").attr("qid") != qid)
        $("#sform").attr("qid", null);
    $("#iframeloading").show();
    SetRoleBaseIUD(qid);
    $("#" + qid).addClass("selected-menu");
    if ($("#div_par #div_buttons").length > 0)
    {
        if ($("#div_par").find("#div_parr").length == 0)
            $("#div_par").append("<div id='div_parr'></div>");

        fqheader.render_div = "div_parr";
    }

    $("#" + qid).siblings().removeClass("selected-menu");

    var params;
    var isButton = false;    
    var isCompulsory = false;

    if (fqheader.sfilters && fqheader.sfilters.length > 0)
    {
        for (var i = 0; i < fqheader.sfilters.length; i++)
        {
            if (fqheader.sfilters[i].isCompulsory != null && fqheader.sfilters[i].isCompulsory == "True")
            {
                isCompulsory = true;
                break;
            }
        }
    }

    if (isCompulsory && dealerId == null)
    {
        getlookup("Search", qid, fqheader);
        return;
    }
    if (fqheader.isForm != null && fqheader.isForm == "True")
    {
        getlookup("Add", qid, fqheader);
        if (curr_menu_item == "160" && !((isPhoneGap() && isNetworkAvailable()) || navigator.onLine))
            return;

        if (fqheader.frm_attrib != null && fqheader.frm_attrib.OnlyForm == "true")
            return;
    }
    
    if ($("#custDetail").find("#div_buttons").length > 0 && $("#custDetail").is(':visible') == true && dealerId != null)
    {

        isButton = true;
        $("#custDetail").find(".modal-body").append("<div id='div_parr'></div>");        
        fqheader.render_div = "div_parr";

        if (isCompulsory)
        {
            getlookup("Search", qid, fqheader);
            return;
        }
        var srch_arr = new Array();
        params = new Object();
        var storeid = LangHeaders[qid].colnames.indexOf("DealerId");
        if (storeid != -1)
            params["fld_idx"] = LangHeaders[qid].colnames.indexOf("DealerId");

            //// pratik  //////
        //else
        //    params["fld_idx"] = LangHeaders[qid].colnames.indexOf("Rake No");
        else if (LangHeaders[qid].colnames.indexOf("Rake No") != -1)
            params["fld_idx"] = LangHeaders[qid].colnames.indexOf("Rake No");
        else if (LangHeaders[qid].colnames.indexOf("Visit Id") != -1)
            params["fld_idx"] = LangHeaders[qid].colnames.indexOf("Visit Id");

        //// pratik  //////

        if (params["fld_idx"] == -1)
            params["fld_idx"] = LangHeaders[qid].colnames.indexOf("Proposal Id");
       

        params["val"] = dealerId;
        params["op"] = "eq";
        srch_arr.push(params);
        var qstr = "?cmd=search&qid=" + qid;
        getData(qid, qstr, srch_arr);
        return;
    }
    else
    {        
        if (fqheader.grid_attrib != null)
        {
            if (fqheader.grid_attrib.custom_menu_item_click != null)
            {
                eval(fqheader.grid_attrib.custom_menu_item_click);
                return;
            }

            /////////////  s-Pratik   //////////////////////
            if (fqheader.grid_attrib.client_menu_item_click != null)
            {
                eval(fqheader.grid_attrib.client_menu_item_click)
            }
            /////////////  e-Pratik   //////////////////////
        }

        /* @rizwan Commented the below code to convert the sync call to async*/

        /*var result = FetchInfo(qid, GetLookupOfCurrentScreen(qid));
        if (result == null)
            return;
        req_end = new Date();
        var render_start = new Date();

        //if (result.response_type == 4 || result.response_type == 5)
        if (qry_opt[qid])
            ProcessJtreeResponse(result, qid, rendering_div);
        else                                
            RenderGridData(result, qid, rendering_div);
        
        var render_end = new Date();
        ProcessRequestResponseTime(qid, req_start, req_end, result.processing_time, render_start, render_end);*/

        /*@rizwan End Comment*/

        /* @rizwan Replace the above code with async call*/

        getData(qid, GetLookupOfCurrentScreen(qid));

        /*@rizwan End*/
    }
}
function getlookup(optype, qid, fqheader)
{
    var qry_str = GetLookupOfCurrentScreen(qid, null, "?qid=" + qid);
    fqheader.optype = optype;
    if (qry_str.indexOf("fetchlookup") >= 0)
    {
        qry_str += "&cmd=fetchlookup";

        /*@rizwan commented the sync call to convert it to async*/
        //FetchInfo(qid, qry_str, null);
        getData(qid, qry_str);
        return;
        /*@rizwan End */
    }
    var frm = new myForm();
    var formdiv = fqheader.optype == "Search" ? "sform" : "myform";
    frm.drawForm(qid, fqheader, formdiv, fqheader.optype);
    $("#iframeloading").hide();
}

var sales_chart = '<div class="wrapper">  <div class="container clearfix"> <div class="third widget" style="margin-top:0%; margin-left: 32px;"> <div class="chart-legend"> <h3>Total Quantity</h3> </div> <div class="canvas-container"> <canvas id="chart-area"></canvas> </div> </div> <div class="third widget" style="margin-top:0%;"> <div class="chart-legend"> <h3>Zone Wise Data</h3> </div> <div class="canvas-container"> <canvas id="shipments"></canvas> </div> </div> <div class="third widget" style="margin-top:0%;"> <div class="chart-legend"> <h3>Region Wise Data</h3> </div> <div class="canvas-container" id="canvasdiv"> <canvas id="departments"></canvas> </div> </div> <div class="third widget" style="width:85%;margin-top: 10px;height: 500px;"> <div class="chart-legend"> <h3>Depo Wise Data</h3> </div> <div class="canvas-container" id="depodiv"></div> </div> </div> </div>';