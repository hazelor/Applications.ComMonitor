
var chart_info = 
{
    "colors" :  [
                   [ {
                       color: "#FF6775",
                       highlight: "#6A88FF",
                   },
                   {
                       color: "#ACFFA7",
                       highlight: "#6A88FF",
                   }]
                   ,
                   [{
                       color: "#4680FF",
                       highlight: "#6A6F99",
                   },
                   {
                       color: "#47CCB8",
                       highlight: "#6A6F99",
                   }],
                   [{
                       color: "#E88F6C",
                       highlight: "#0A6DFF",
                   },
                   {
                       color: "#6CE87F",
                       highlight: "#0A6DFF",
                   }],
                    [{
                        color: "#7838B2",
                        highlight: "#AEB24A",
                    },{
                        color: "#DCB5FF",
                        highlight: "#AEB24A",
                    }],
                    [{
                        color: "#ffd34e",
                        highlight: "#b79737",
                    },
                    {
                        color: "#1f94a0",
                        highlight: "#0f484e",
                    }]
    ],

    "pie_colors": [
        {
            color: "#9dc02e",
            highlight: "#779324",
        },
       {
           color: "#2dddf5",
           highlight: "#176d8c",
       },
       {
           color: "#e76f50",
           highlight: "#e7221e",
       },
       {
           color: "#f5fcd0",
           highlight: "#979c7e",
       },
       {
           color: "#a3d9b0",
           highlight: "#567465",
       },
       {
           color: "#8c8474",
           highlight: "#5c564a",
       },
       {
           color: "#ffd34e",
           highlight: "#b79737",
       },
       {
           color: "#1f94a0",
           highlight: "#0f484e",
       },
       {
           color: "#bd4932",
           highlight: "#6d2415",
       },
       {
           color: "#ffbe73",
           highlight: "#996a34",
       },
       {
           color: "#f23005",
           highlight: "#922006",
       },
       {
           color: "#0a7aa6",
           highlight: "#032b3b",
       },
       {
           color: "#ff8900",
           highlight: "#753f00",
       },
       {
           color: "#7e827a",
           highlight: "#3b3d3a",
       },
       {
           color: "#c77966",
           highlight: "#7a493d",
       }, {
           color: "#00ada7",
           highlight: "#006f6b",
       },
       {
           color: "#d9cc3c",
           highlight: "#aca126",
       },
       {
           color: "#b0ff90",
           highlight: "#71b257",
       },
       {
           color: "#c5b3ff",
           highlight: "#8476af",
       },
       {
           color: "#ff6775",
           highlight: "#92353e",
       }
    ],
    "scale_values": {"None":1, "Hundreds":100,"Thousands":1000,"Lakhs":100000,"Millions":1000000,"Crores":10000000},
    "types": ["Bar", "Bar", "Bar"],
    "animation": true,
    "mode": "min",
    "rows": [[6, 6],[12]],   // rows & col bootstarp panels  map 
    "row-height": 50    // row height in % 
}



var canvas_panel = '<div class="canvas-container"> <canvas id="levelxx" class="mycanvas"></canvas> </div>';
var col_panel = '<div class="col-md-xx"> <div class="panel panel-default">\
<div class="panel-heading"> <span class="panel-title">Panelxx</span> <span class="par_data"></span><span class="pull-right clickable"><i class="glyphicon glyphicon-chevron-up top0"></i></span><button class="min icon-min"><img src="assets/images/minimum-icon.png" title="Minimize"/></button><button class="back icon-min"><img src="assets/images/back-arrow.png" title="back"/></button> <button class="max icon-max" ><img src="assets/images/maximum-icon.png"  title="Maximum"/></button><select id="chart_typexx" class="pull-right charttype" title="Chart Type"><option value=""></option><option value="Bar">Bar</option><option value="Polar">Polar</option><option value="Pie">Pie</option><option value="Doughnut">Doughnut</option><option value="Radar">Radar</option><option value="Line">Line</option><option value="Table">Table</option></select></div> \
    <div class="panel-body"><div class="canvas-container" style="overflow-x:scroll;"> <canvas id="levelxx" class="mycanvas"></canvas> </div> </div> </div> </div>';
var pc_panel = '<div class="row"><div class="col-md-12"> <div class="panel panel-default"><div class="panel-heading"> <span class="panel-title">Panelxx</span><span class="pull-right clickable"><i class="glyphicon glyphicon-chevron-up"></i></span> </div> <div class="panel-body" id="xxx"></div> </div> </div> </div>';
var pc_spanel = '<div class="panel panel-default"><div class="panel-heading"><span class="panel-title">Panelxx</span><span class="pull-right clickable"><i class="glyphicon glyphicon-chevron-up top0"></i></span></div><div class="panel-body" id="xxx"></div></div>';
var drop_btn = '';
var drop_btn = '<div class="btn-group cust_srch" id="scale">\
  <button type="button" id="scale_btn" class="btn btn-info dropdown-toggle" data-toggle="dropdown" aria-expanded="false">\
   <span class="caret"></span> Scale \
  </button>\
  <ul class="dropdown-menu" role="menu">\
    <li>None</li>\
    <li>Hundreds</li>\
    <li>Thousands</li>\
    <li>Lakhs</li>\
    <li>Millions</li>\
    <li>Crores</li>\
  </ul></div>';

var chartSettingModal = '<div id="myModal" class="modal" role="dialog" aria-hidden="true" style="display: none">\
	<div class="container-fluid">\
            <div class="modal-dialog">\
                <div class="modal-content">\
                    <div class="modal-header">\
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                       <h4 class="modal-title">CTitle##</h4>\
                    </div>\
                    <div class="modal-body">\
                        <table width="100%" style="border-collapse: separate; border-spacing: 5px;">\
                        <tr> <td colspan="2"> <input id="curChartIDX" type="text" hidden="hidden" /> </td> </tr>\
                        <tr> <td  style="width:20%;text-align:right"><label >Chart Type</label></td> <td style="width:80%;text-align:left">\
                        <select id="chart_typexx" title="Chart Type" style="width:50%">\
                            <option value=""></option>\
                            <option value="Bar">Bar</option>\
                            <option value="Polar">Polar</option>\
                            <option value="Pie">Pie</option>\
                            <option value="Doughnut">Doughnut</option>\
                            <option value="Radar">Radar</option>\
                            <option value="Line">Line</option>\
                            <option value="Table">Table</option>\
                        </select>\
                        </td> </tr>\
                        <tr> <td style="width:20%;text-align:right"><label for="selFullScreen" >Sort Order</label> </td> <td style="width:30%;text-align:left"> \
                         <select id="selFullScreen" style="width:50%" >\
                            <option value="Asc" selected="selected">Descending</option>\
                            <option value="Desc"> Ascending</option>\
                        </select>\
                        </td> </tr>\
                        <tr> <td style="width:20%;text-align:right"><label for="selLimits" >Limits</label>\ </td> <td style="width:30%;text-align:left"> \
                        <input id="curChartLimit" type="text" style="width:50%" />\
                        </td> </tr>\
                        </table>\
                    </div>\
                    <div class="modal-footer">\
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
                        <button id="btnChartApply" type="button" class="btn btn-primary">Apply</button>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>';


function InitPanel(dtree,qid)
{
    var qinfo = Headers[qid];
   
    
    var ar_dflds = qry_opt[qid].data_flds;
    var ar_dfstr = [];

    var lineoptions =
        {
            bezierCurve: true,
            datasetFill: false,
            tooltipTemplate : "<%if (label){%><%=legend%>: <%}%><%= value %>"
        };

    var colnames = LangHeaders[qid].colnames;

    for (i = 0; i < ar_dflds.length; i++)
    {
        ar_dfstr.push(colnames[ar_dflds[i] - 1]);
    }

    var lang_header = LangHeaders[qid];
 
    if (dtree.child.length == 0 && dtree.labels.length == 0 && dtree.values.length == 0)
    {
        DisplayMessage(error_response_type["gp2015"]);
        return;
    }
    options = qry_opt[qid];

    var chart_options = $.extend({}, chart_info, options);



    var cdrop_btn = drop_btn;
    if (chart_options.scale)
        cdrop_btn = cdrop_btn.replace("Scale", "Scale " + chart_options.scale);

    $("#scale").remove();
    $("#div_buttons").append(cdrop_btn);
    

    $("#scale ul li").click(function ()
    {
        var scale = $(this).html();
        chart_options.scale = scale;
        $("#scale_btn").html("Scale " + scale + ' <span class="caret"></span>');
        if (max)
            $(".max").trigger("click");
        else
            $(".min").trigger("click");

    });
   

    var max = (chart_options.mode == 'max');  // max if true, will display single chart in full screen , else multiple chart would be displayed 
    var ctree;
    var activePoints;
    var level = chart_options.types.length;
    var ar_chart;   // chart objects
    var ar_index;  // index of chart data in the object tree
	var ar_plabel; // parent label 
    var ar_chdata;   // current chart data at different levels 
    var ar_pwidth, ar_pheight;   // current width & height of  each chart 
    var ar_html = [];
    var tstr, crow, cnt = 0;
    var bpanels = [];

    for (var irow in chart_options.rows)
    {
        crow = chart_options.rows[irow];
        ar_html.push('<div class="row">')
        for (var icol in crow)
        {
            tstr = col_panel;
            tstr = tstr.replace("md-xx", "md-" + crow[icol]);
            bpanels.push("col-md-" + crow[icol]);
            tstr = tstr.replace("Panelxx", chart_options.names[cnt]);
            tstr = tstr.replace("levelxx", "level" + cnt);
            tstr = tstr.replace("chart_typexx", "chart_type" + cnt++);
            ar_html.push(tstr);
        }
        ar_html.push('</div>')
    }
    $("#chart_min").html(ar_html.join(''));

    

    ar_html = [];

   
    ar_html.push('<div class="row">');
    tstr = col_panel;
    tstr = tstr.replace("md-xx", "md-12");
    tstr = tstr.replace("levelxx", "level0");
    tstr = tstr.replace("Panelxx", chart_options.names[0]);
    ar_html.push(tstr);
    ar_html.push('</div>');
    $("#chart_max").html(ar_html.join(''));

    $("#chart_max .max").hide();
    $("#chart_min .min").hide();
    $("#chart_min .back").hide();

    if (max)
        $("#chart_min").hide();
    else
        $("#chart_max").hide();
  
    CollapseExpand();
  
    InitChart();
    $(".canvas-container canvas").click(pEvent);
    
    $(".charttype").each(function ()
    {
        var idx = $(this).attr("id").substr(10);
        var ctype = chart_options.types[idx];
        $(this).val(ctype);

    });

    $(document).on("click", "#btnChartApply", function () {
        alert("#btnChartApply : OnClick Event : SpecChart.Js :LineNo.343"); 
    });

    $(".charttype").change(function ()
    {
        var idx;
        if(max)
        {
            idx = $(this).parents('.panel').find('canvas').attr('idx');
            if (idx == null)  // this is the case when the data is displayed ion table form  
                idx = $(this).parents('.panel').find("table").attr("idx");
        }
        else
            idx = $(this).attr("id").substr(10);
        idx = parseInt(idx);
        var sel = $(this).find("option:selected").text();
        SetCtree(idx);
       
        if(chart_options.types[idx] == "Table")
        {
            var cp = canvas_panel.replace("xx", idx);
            $(this).parents(".panel-heading").next().html(cp);
            $(".canvas-container canvas").click(pEvent);
            //$(this).parents(".panel-body").html(cp);
        }
        chart_options.types[idx] = sel;
        if (max)
        {
            ar_chart[0].destroy();
            ar_chart.pop();
            redraw(idx);
        }
        else
        {
            ar_chart[idx].destroy();
            redraw(idx, idx + 1);
        }
    });

    $(".back").click(function ()
    {
        var idx = $("#chart_max #level0").attr("idx");
       
        if (idx > 0)
        {
            idx--;
            var ctype = chart_options.types[idx];
            $("#chart_max .charttype").val(ctype);
            ar_chart[0].destroy();
            ar_chart.pop();

            $(event.target).attr('idx', idx);
            SetCtree(idx);
            redraw(idx);
        }
    });
    $(".max").click(function ()
    {
        for (var cidx in ar_chart)
            ar_chart[cidx].destroy();
        ar_chart = [];
        max = true;
        $("#chart_min").hide();
        $("#chart_max").show();
        var idx = $(this).parents('.panel').find('canvas').attr('idx');
        var ctype = chart_options.types[idx];
        $("#chart_max .charttype").val(ctype);
        SetCtree(idx);
        setPanelhw();
        redraw(idx);
    });

    $(".min").click(function ()
    {
        for (var cidx in ar_chart)
            ar_chart[cidx].destroy();
		ar_chart = [];	
        $("#chart_min").show();
        $("#chart_max").hide();
        max = false;
        setPanelhw();
        ctree = dtree;
        redraw(0);
    });

  

    function pEvent(event)
    {
        try
        {
            var target = event.target || event.srcElement;
            var element = target.tagName;
            var cidx, clbl;
            if (element != "CANVAS" && element != "TH") // table click 
            {
                var ptable = $(event.target).parents("TABLE");
                cidx = $(ptable).attr("idx");
                clbl = $(event.target).parents("TR").find("TD").html();
            }
            else
                cidx = $(event.target).attr('idx');

            if (parseInt(cidx) + 1 == level)  // no drill down beyond max level 
                return;
            var midx = (max) ? 0 : cidx;

            var ctype = chart_options.types[cidx];

            if (ctype == "Bar")
                activePoints = ar_chart[midx].getBarsAtEvent(event);
            else if (ctype == "Doughnut" || ctype == "Pie" || ctype == "Polar")
                activePoints = ar_chart[midx].getSegmentsAtEvent(event);
            else if (ctype == "Line" || ctype == "Radar")
                activePoints = ar_chart[midx].getPointsAtEvent(event);
                        
            if(!clbl)
            {
                if (activePoints == null || activePoints.length == 0)
                    return;
                clbl = activePoints[0].label;
            }

            var idx;

            ctree = dtree;
            if (cidx != 0)
            {
                for (var i = 0; i < cidx; i++)
                    ctree = ctree.child[ar_index[i]];
            }
            if (ctree == null)
                alert("null ctree  - 0");
            idx = $.inArray(clbl, ctree.labels);
            ctree = ctree.child[idx];
            if (ctree == null)
                alert("null ctree  - 1");
            ar_index[cidx] = idx;
			ar_plabel[cidx] = clbl;
            cidx++;
            idx = ar_chart.length - cidx;

			var tctree = ctree;
            for (i = cidx; i < ar_chart.length; i++)
            {
                if(!max)
                    ar_chart[i].destroy();
                ar_index[i] = 0;
				ar_plabel[i] = tctree.labels[0];
                if(tctree.child)
				tctree = tctree.child[0];
            }

            if (!max)
                ar_chart.splice(cidx, idx);
            else
            {
                ar_chart[0].destroy();
                ar_chart.pop();

                $(event.target).attr('idx', cidx);
                ctype = chart_options.types[cidx];
                $("#chart_max .charttype").val(ctype);
            }
            redraw(cidx);
        }
        catch (e)
        {
            alert("exception");
        }
    };

    function Limit(ctree, limit,rorder)
    {
        var blegend = false;
        var vlen = ctree.values[0].length;
        var ar_values = [];

        for(var i=0; i < ctree.labels.length; i++)
        {
            tobj = new Object();
            tobj.label = ctree.labels[i];
            tobj.value = ctree.values[i];
            if (i == 0 && ctree.legends.length > 0)
                blegend = true;
            if(blegend)
                tobj.legend = ctree.legends[i];
            ar_values.push(tobj);
        }
        if (rorder > 0)
        {
            ar_values = ar_values.sort(function (a, b)
            {
                if (vlen > 1)
                    return b.value[0] - a.value[0];
                return a.value - b.value;
            });
        }
        else
        {
            ar_values = ar_values.sort(function (a, b)
            {
                if (vlen > 1)
                    return (parseInt(b.value[0]) + parseInt(b.value[1])) - (parseInt(a.value[0]) + parseInt(a.value[1]));
                return b.value - a.value;
            });
        }
        if (limit >  0)
            ar_values = ar_values.slice(0, limit);
        var robj = {};
        robj.labels = [];
        robj.values = [];
        robj.legends = [];
        for(i = 0; i < ar_values.length; i++)
        {
            if (blegend)
                robj.legends.push(ar_values[i].legend);
            robj.labels.push(ar_values[i].label);
            robj.values.push(ar_values[i].value);
        }
        return (robj);
    }

    function redraw(idx,single)  // mlevel is passed when the chart type is changed from dropdown, only the updated chart is redrawn
    {
        var scale_name = chart_options.scale;
        var scale_val = 1;
        if (scale_name)
            scale_val = chart_options.scale_values[scale_name];

        idx = parseInt(idx);
        var tobj, plabel_str = "(";
        if (mlevel == null)
        var  mlevel = (max) ? idx + 1 : level;
        if (single)
            mlevel = single;
        var cnt = 0;
		
		
		if(!max)
		{
			$("#chart_min .panel-heading").each(function () 
			{
				if(cnt > 0)
				{
					plabel_str += chart_options.names[cnt-1] + ":" + ar_plabel[cnt-1] + ";"
					$(this).find(".par_data").html(plabel_str + ")");
					
				}
				cnt++;
			
			});
		}
		else
		{
		    var ptitle = chart_options.names[idx];

		    if (idx == 0)  // first level 
		        plabel_str = "";

		    for(i=0; i < idx; i++) 	
				plabel_str += chart_options.names[i] + ":" + ar_plabel[i] + ";"
			
			$("#chart_max .panel-heading").each(function () 
			{
			    $(this).find(".panel-title").html(ptitle);
			    if (idx > 0)
			        plabel_str += ")";
				$(this).find(".par_data").html(plabel_str);
			});
		}
		
		
		for (var i = idx; i < mlevel; i++)
        {
		    var labels, values, legends,tobj;
		    var rlimit = 0, rorder = 0;

		    if (chart_options.limit)
		        rlimit = chart_options.limit[i];
		    if (chart_options.order)
		        rorder = chart_options.order[i];

		    if (rlimit != 0 || rorder  != 0)
		    {
		        tobj = Limit(ctree, rlimit,rorder);
		        labels = tobj.labels;
		        values = tobj.values;
		        legends = tobj.legends;
		    }
		    else
		    {
		        labels = ctree.labels;
		        values = ctree.values;
		        legends = ctree.legends;
		    }

            var id,dwidth,dheight,eid;
            if (max)
            {
                eid 
                id = "#chart_max #level0" ;
                dwidth = ar_pwidth[0];
                dheight = ar_pheight[0];
            }
            else
            {
                id = "#chart_min #level" + i;
                dwidth = ar_pwidth[i];
                dheight = ar_pheight[i];
            }

            var chtype = chart_options.types[i];

            if (chtype != "Table")
            {
                if (max)
                    $(id).html("<canvas id='level0' ></canvas><div id='legend0'></div>");
                else
                    $(id).html("<canvas id='level" + i + "' ></canvas></div><div id='legend" + i + "' >");
                $(id).attr("idx", i);
                var ctx = $(id).get(0).getContext("2d");
                ctx.canvas.width = dwidth;
                ctx.canvas.height = dheight;
                if (values.length * 30 > ar_pwidth[i] && (chtype == 'Bar' || chtype == 'Line'))
                {
                    ctx.canvas.width = values.length * 30;
                    $(id).parents(".canvas-container").css("overflow-x", "scroll");
                }
                else
                    $(id).parents(".canvas-container").css("overflow-x", "");
                
            }
            else
            {
                var ar_html = [];
                var vlen = values[0].length;
                var color_idx,color_cnt = chart_options.pie_colors.length;
                
                //dheight -= 100;

                if (max)
                    ar_html.push("<div id='level0' class='table-responsive' style='overflow:scroll;' >");
                else
                    ar_html.push("<div id='level" + i + "' style='overflow-y:auto; overflow-x:hidden; height:" + dheight + "px' >");
                

               
              
                //ar_html.push('<table idx="' + i + '" height=' + dheight + ' class="table mytable"   cellpadding="0" cellspacing="0" border="0"   >');
                ar_html.push('<table idx="' + i + '" class="table mytable"   cellpadding="0" cellspacing="0" border="0" >');
                 
                ar_html.push("<tr><th>" + chart_options.names[i] + "</th>");

                var vtext = chart_options["value_text"];
                if (!vtext)
                    vtext = "Value";

                for (var j = 0; j < vlen; j++)
                    ar_html.push("<th>" + vtext + "-" + j  + "</th>");
                ar_html.push("</tr>");

                for (var j = 0; j < labels.length; j++)
                {
                    color_idx = j;
                    if (labels.length > color_cnt)
                        color_idx = j % color_cnt;
                    var bcolor = chart_options.pie_colors[color_idx].color;

                    ar_html.push("<tr  ><td style='background-color:" + bcolor + "'>" + labels[j] + "</td>");

                    if (vlen == 1)
                        ar_html.push("<td style='text-align:right; background-color:" + bcolor + "'>" + (parseFloat(values[j]) / scale_val).toFixed(2) + "</td>");
                    else
                    {
                        for (var k = 0; k < vlen; k++)
                            ar_html.push("<td style='text-align:right; background-color:" + bcolor + "'>" + (parseFloat(values[j][k]) / scale_val).toFixed(2) + "</td>");
                    }
                    ar_html.push("</tr>");
                }

                ar_html.push("</table>");
                ar_html.push("</div>");
                $(id).parent().html(ar_html.join(''));
                $(".canvas-container table tr").click(pEvent);
                $(".canvas-container").height = dheight;

                $(id).attr("idx", i);
            }

            if (chtype == "Doughnut" || chtype == "Pie" || chtype == "Polar")
            {
			    var DoughnutData = new Array();
			    var color_idx,color_cnt = chart_options.pie_colors.length;

                for (var j = 0; j < labels.length; j++)
                {
                    color_idx = j;
                    if (labels.length > color_cnt)
                        color_idx = j % color_cnt;
                    tobj = new Object();
                    tobj.label = labels[j];
                    tobj.value = parseFloat((parseFloat(values[j]) / scale_val).toFixed(2));
                    tobj.color = chart_options.pie_colors[color_idx].color;
                    tobj.highlight = chart_options.pie_colors[color_idx].highlight;
                    DoughnutData.push(tobj);
                }
                DoughnutData = DoughnutData.sort(function (a, b)
                {
                    return a.value - b.value;
                    //return a.val.localeCompare(b.val);
                });

                ar_chdata.push(DoughnutData);
				if(chtype == "Pie")
				    chart = new Chart(ctx).Pie(DoughnutData, { responsive: true });
				else if (chtype == "Polar")
				    chart = new Chart(ctx).PolarArea(DoughnutData, { responsive: true });
                else
					chart = new Chart(ctx).Doughnut(DoughnutData, { responsive: true });
            }
			else if (chtype == "Bar" || chtype == "Line" || chtype == "Radar")
			{
			    var vlen = values[0].length;
			    var BarData = new Object();
			    BarData.datasets = new Array();
			    BarData.labels = labels;
                if(legends.length > 0)
                    BarData.legend = legends;
			    else
                    BarData.legend = labels;

			    var ar_values = [];

			    for (var j = 0; j < vlen; j++)
			        ar_values.push([]);

			    for (j = 0; j < values.length; j++) {
			        for (var k = 0; k < vlen; k++) 
			        {
			           
			            ar_values[k].push( parseFloat((parseFloat(values[j][k]) / scale_val).toFixed(2)));
			        }
			    }

			    var cidx1 = i, cidx2;
			    if (vlen > 1)
			        cidx1 = 0;

			    for (var j = 0; j < vlen; j++) {
			        tobj = new Object();
			        BarData.datasets.push(tobj);
			        //tobj.legend = "xxx";
			        tobj.label = ar_dfstr[j];
			        tobj.data = ar_values[j];  //values;
			        cidx2 = j;
			        if (j >= chart_options.colors[cidx1].length)
			        {
			            cidx2 = (j % chart_options.colors[cidx1].length) ;
			            if (++cidx1 == chart_options.colors.length)
			                cidx1 = 0;
			        }
			        tobj.fillColor = chart_options.colors[cidx1][cidx2].color;
			        tobj.strokeColor = "#637b85";
			        tobj.highlightFill = chart_options.colors[cidx1][cidx2].highlight;
			        tobj.highlightStroke = "#637b85";
			    }
			    ar_chdata.push(BarData);
			    if (chtype == "Bar")
			        //chart = new Chart(ctx).Bar(BarData, { multiTooltipTemplate: 2015 + " - <%= value %>" });
			        chart = new Chart(ctx).Bar(BarData, { multiTooltipTemplate: "<%= datasetLabel %> - <%= value %>" ,tooltipTemplate : "<%if (label){%><%=legend%>: <%}%><%= value %>"});
			    else if (chtype == "Line")
			        chart = new Chart(ctx).Line(BarData, lineoptions);
			    else if (chtype == "Radar")
			        chart = new Chart(ctx).Radar(BarData, { tooltipTemplate : "<%if (label){%><%=legend%>: <%}%><%= value %>"});
			}
			
            //$("#legend" + i).html(chart.generateLegend());
			if (single)
			    ar_chart.splice(i, 1, chart);
            else
                ar_chart.push(chart);
            if(ctree.child)  // last level may not have child
            ctree = ctree.child[ar_index[i]];
        }
        //$(".canvas-container canvas").click(pEvent);
    }

    // the data pointer  is changed based on the level to be drawn 
    function SetCtree(idx)
    {
        ctree = dtree;
        if (idx != 0) {
            for (var i = 0; i < idx; i++)
                ctree = ctree.child[ar_index[i]];
        }
    }

    function InitChart()
    {
        Chart.defaults.global.animation = chart_options.animation;
        Chart.defaults.global.responsive = false;
        Chart.defaults.maintainAspectRatio = false;
        Chart.defaults.tooltipTemplate = "<%if (label){%><%=legend%>: <%}%><%= value %>";
        //Chart.defaults.customTooltips = true;
        //Chart.defaults.global.customTooltips = function (tooltip) { };

        ar_index = [];
		ar_plabel = [];
        ar_chdata = new Array();
        ctree = dtree;

        for (var i = 0; i < level; i++)
        {
            ar_index.push(0);
			ar_plabel.push(ctree.labels[0]);
            ar_chdata.push(ctree);
            if((i + 1) != level)
            ctree = ctree.child[0];
			
        }
        ctree = dtree;
        setPanelhw();
        ar_chart = new Array();
       redraw(0);

    }

    function setPanelhw()  // set height / width of eacgh panel 
    {
        ar_pheight = [], ar_pwidth = [];
        var scr_height, rheight;
        var wheight = $(window).height();
        var wwidth = $(window).width();
        var offset = $("#div_par").offset();
        wheight -= offset.top;
        wwidth -= offset.left;

        if (max)
        {
            rheight = $("#div_par").height() - 120;
            var plist = $("#chart_max .panel-body").each(function ()
            {
                ar_pheight.push(rheight);
                ar_pwidth.push($(this).width());
            });
        }
        else
        {
            rheight = $("#div_par").height() - 120;
            rheight = (rheight / chart_options.rows.length) - 50;
            var plist = $("#chart_min .panel-body").each(function ()
            {
                ar_pheight.push(rheight);
                ar_pwidth.push($(this).width());
            });
        }
    }

}

function Chart_Apply(ctrlidx,ctrl)
{

}

function onBtnSettings_Click(ctl) {
    
    $('#myModal').remove();
    $('body').append(chartSettingModal);

    var charttitle = $(ctl).siblings('.panel-title').text();
    $('#myModal .modal-title').text(charttitle);

    $("#curChartIDX").val($(ctl).parent().parent().find('canvas').attr('idx'));
    $("#myModal").modal('show', function () { title: charttitle });

}





	
	
	
    




       

