var gtmp_pclookup;


function ProcessLookup(data)
{
    if (data.gpdata2 != null)
    {
        if (gLookup == null)
            gLookup = data.gpdata2;
        else
        {
            for (var key in data.gpdata2)
            {
                gLookup[key] = data.gpdata2[key];
            }
        }
    }
    if (data.gpdata4 != null && data.response_type == 0 || data.response_type == 11)
    {
        for (var key in data.gpdata4)
        {
            gLookup[key] = data.gpdata4[key];
        }
    }
}

function UpdateChildLookup(evt, qid)
{
    var cid = $(evt).attr("id");
    var cur_idx = cid.split('_')[1];
    var fqheader = Headers[qid];
    var cols = fqheader.cols

    var cobj = cols[cur_idx];

    var pcfld = cobj.frm_options.pcfld;
    var pc_arr = pcfld.split('|');
    var len = pc_arr.length;

    var clvl = $.inArray(cur_idx, pc_arr);
    var lktree;

    if (clvl == 0)
    {
        gtmp_pclookup = new Array();
        lktree = gLookup[cols[pc_arr[0]].eopt];
    }
    else
        lktree = gtmp_pclookup[clvl - 1];

    var sel_val = $("#" + cid).val();

    if (($("#" + cid).attr("isUpdate") == null) && (fqheader.optype == "Update" && (sel_val == null || sel_val.length == 0 || (cobj.nul == "0" && sel_val != null && sel_val.length > 0))))
    {
        sel_val = gCurRow[cur_idx];
        $("#" + cid).val(sel_val);  
    }

    $("#" + cid).attr("isUpdate", "isUpdate");

    if (lktree == null)
    {
        for (var i = 1; i < pc_arr.length; i++)
        {
            $(fqheader.frmObj + "_" + pc_arr[i]).html("");
        }
        return;
    }

    var index = $.inArray(sel_val, lktree.li_key);

    lktree = lktree.li_child[index];

    if (lktree == null)
    {
        for (var i = 1; i < pc_arr.length; i++)
        {
            $(fqheader.frmObj + "_" + pc_arr[i]).html("");
        }
        return;
    }
    for (var i = clvl; i < len - 1 ; i++)
    {
        gtmp_pclookup[i] = lktree;

        var lkey, lval;
        if (lktree != null)
        {
            lkey = lktree.li_key;
            lval = lktree.li_val;

            var child_idx = pc_arr[i + 1];

            var ar_htm = new Array();            
            var sel = 0;
            cobj = cols[child_idx];

            if (lkey.length != 1)
            {
                if (!(cobj.frm_options != null && cobj.frm_options.type != null && cobj.frm_options.type == "multiselect"))
                    ar_htm.push("<option></option>");
            }

            for (var key in lktree.li_key)
            {
                if (fqheader.optype == "Update") 
                {
                    if (cobj.frm_options != null && cobj.frm_options.type != null && cobj.frm_options.type == "multiselect")
                    {
                        var spl_arr = gCurRow[pc_arr[i + 1]] != null ? gCurRow[pc_arr[i + 1]].split(',') : null;
                        if (spl_arr != null && $.inArray(lkey[key], spl_arr) != -1)
                        {
                            ar_htm.push("<option value='" + lkey[key] + "' selected=selected >" + lval[key] + "</option>");
                            sel = key;
                        }
                        else
                            ar_htm.push("<option value='" + lkey[key] + "'>" + lval[key] + "</option>");
                    }
                    else if (gCurRow[pc_arr[i + 1]] == lkey[key])
                    {
                        ar_htm.push("<option value='" + lkey[key] + "' selected=selected >" + lval[key] + "</option>");
                        sel = key;
                    }
                    else
                        ar_htm.push("<option value='" + lkey[key] + "'>" + lval[key] + "</option>");
                }
                else  
                   ar_htm.push("<option value='" + lkey[key] + "'>" + lval[key] + "</option>");
            }
            
            
            $(fqheader.frmObj + "_" + child_idx).html(ar_htm);

            if ($(fqheader.frmObj + "_" + child_idx).is("[onchange]") && $(fqheader.frmObj + "_" + child_idx).attr("onchange").indexOf("UpdateChildLookup") == -1 && $(fqheader.frmObj + "_" + child_idx +" option").size() == 1)
                $(fqheader.frmObj + "_" + child_idx).trigger("onchange");


            if (cobj.frm_options != null && cobj.frm_options.type == "multiselect")
            {
                if ($(fqheader.frmObj + "_" + child_idx).attr("multiple") == null)
                    $(fqheader.frmObj + "_" + child_idx).attr("multiple", "multiple")

                $(fqheader.frmObj + "_" + child_idx).multiselect("destroy");
                $(fqheader.frmObj + "_" + child_idx).multiselect({
                    enableCaseInsensitiveFiltering: true,
                    filterPlaceholder: 'Search...',
                    buttonText: function (options, select)
                    {
                        return process_multiselect(options, select);
                    }
                });
            }

            lktree = lktree.li_child[sel];
        }
    }    
}
