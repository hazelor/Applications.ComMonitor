
function validate($form, fqheader)
{
    //{ container: fqheader.frmObj+"_err" }
    var exclude = [':disabled', ':hidden'];
    if (fqheader.formtype == "tabs")
        exclude = [':disabled'];
    $form.bootstrapValidator(
    {
        excluded: exclude //:not(:visible) ':hidden',
    }).bootstrapValidator('validate');

    var bootstrapValidator = $form.data('bootstrapValidator');
    //$(fdiv).find("form").find('[multiselect="multiselect"]')

    if (bootstrapValidator.isValid())
    {

        var qid = fqheader.qid;
        var cmodel = fqheader.cols;

        try
        {
            var tfrm = fqheader.optype;
        }
        catch (e)
        {
            tfrm = "Add";
            if (fqheader.optype == "Update")
                tfrm = "Update";
        }

        var params = new Object();

        var qstr = "?cmd=" + tfrm + "&qid=" + fqheader.qid;
        var isError = false;
        var cid;
        var fname;
        var upload_img_offline = false;
        $form.find(".DataTD").each(function ()
        {

            ele = $(this).children(0);  //can use is("input")
                        
            ename = ele.get(0).tagName;
            cid = ele.attr('id');
            var isFile = false;
            if (cid == null)
            {
                if($(ele).hasClass("file-input"))
                {
                    isFile = true;
                    cid = $(ele).find("input").attr("id");                    
                }
                else if($(ele).hasClass("radio-inline"))
                {
                    cid = $(ele).find("input[type='radio']").attr("id");
                }
            }

            var idx = cid.lastIndexOf("_");
            fname = cid.substr(idx + 1);

            cinfo = cmodel[fname];

            if (cinfo.pscol == 2 || cinfo.pscol == 4 || cinfo.pscol == 5 || cinfo.pscol == 6 || cinfo.pscol == 10 || cinfo.pscol == 11)
                return true;

            if (cinfo.frm_options != null && cinfo.frm_options.custom_bootstrap_validator != null)
            {
                var result = eval(cinfo.frm_options.custom_bootstrap_validator);
                if (result == false)
                    isError = true;
            }

            if (ename == "INPUT" || ename == "TEXTAREA")
            {
                etype = ele.attr("type");
                if (etype == "radio")
                    val = ele.siblings(":checked").val();
                else if (etype == "checkbox")
                {
                    val = ele.attr('checked')

                    if (!val)
                        val = "False";
                    else if (val == "checked")
                        val = "True";
                    else
                        val = "False";
                }
                else if (etype == "button")
                {
                    if (cinfo.dtype == "capture")
                    {
                        val = $(ele).attr("filename");
                    }
                }
               
                else
                {
                    ///////// S-Pratik //////////////////                
                    if (cinfo.etype == "dselect" || cinfo.etype == "sselect")
                    {
                        val = $(ele).parent().find("li[class='active']").attr("data-value");
                        if(!val)
                            val = (ele.attr("data-value") == null ? ((ele.val() == "" || ele.val() == null) ? ele.attr("value") : ele.val()) : ele.attr("data-value"))
                    }
                    else
                        val = (ele.val() == "" || ele.val() == null) ? ele.attr("value") : ele.val();
                    ///////// E-Pratik //////////////////
                   
                }
                /*@rizwan remove the custom validation and implemented the bootstrap validation*/
                //if(cinfo.nul == "0")
                //{
                //    if ((cinfo.dtype == "date" || cinfo.dtype == "smalldatetime" || cinfo.dtype == "datetime") && (val == null || val.length == 0))
                //    {
                //        DisplayMessage(cinfo.name + " is required and cannot be empty");
                //        isError = true;
                //        $("#" + cid).addClass("Validateinput");
                //        return false;
                //    }                    
                //}
                /*@rizwan End Comment*/
            }
            else if (ename == "LABEL")
            {
                if($(ele).hasClass("radio-inline"))
                {
                    var nam = $(ele).find("input").attr("name");
                    val = $(ele).parent().find("input[name='" + nam + "']:checked").val();
                }
            }
            else if(isFile)
            {
                var path = $(ele).find("input").val();
                val = path.substr(path.lastIndexOf("\\") + 1);

                if(val =="")
                    val = $(ele).find("input").attr("value");

                /* -- start Aadilkhan -- */
                if (loginData.loginInfo.Role != "MDM" && val != null && val.length != undefined && val.indexOf("__") == -1)
                    val = loginData.loginInfo.EmpCode + "__" + val;

                
                //var valrenamed = false;
                //for (var i = 0 ; i < gQid[qid].data.length; i++) {
                //    if (gQid[qid].data[i][parseInt(fname) + 1] == val) {

                //        //confirm('dd', function () {
                //        //    console.log('confirmed')
                //        //});
                //        confirm("Do you want to continue ?");

                //        val = val.substring(1, val.lastIndexOf('.')) + "_" + (i + 1) + val.substring(val.lastIndexOf('.'), val.length);
                //        valrenamed = true;
                //    }
                //    else if (valrenamed == true)
                //        break;
                //}

                /* -- end -- */

                if(val!=null && val.length > 0)
                {
                    if ((isPhoneGap() && isNetworkAvailable()) || navigator.onLine)
                    {
                        if (fqheader.optype == "Add" || (fqheader.optype == "Update" && val != gCurRow[fname]))
                            ProcessFileUpload(qid, fname)
                    }
                    else
                    {
                        val = null; //make value null in offline mode.
                        upload_img_offline = true;
                    }
                }
            }
            else //if (ename == "SELECT")
            {
                val = ele.val();
                if (cinfo.frm_options != null && cinfo.frm_options.type == "multiselect" && val!=null && val.length > 0)
                    val = val.join(',');

           if ((cinfo.nul == "0") && (cinfo.frm_options != null && cinfo.frm_options.type != null && cinfo.frm_options.type == "multiselect" && (val == null || val.length == 0)))
                {
                    DisplayMessage(cinfo.name + " is required and cannot be empty");
                    isError = true;
                    $("#" + cid).addClass("Validateinput");
                    return false;
                }
            }

            //if (cinfo.dtype == "date")
            //{
            //    val = ProcessDateValue(val);
            //}
            if (tfrm == "Update")
            {
                if (gCurRow != null)
                {
                    var okey = $.trim(gCurRow[fname]);                  
                    if (okey != $.trim(val))
                    {
                        params[fname] =  $.trim(val).length == 0 ? null :val;
                        //params[fname] =  val;
                    }                   
                }
            }
            else
            {
                if(val!=null && val.length > 0)
                    params[fname] = val;
            }
        });

        if (upload_img_offline)
            ShowDialog("dialog-message1", error_response_type["gp2041"]);

        if (tfrm == "Update")
            qstr = UpdateQstr(qstr, qid);

        if (fqheader.grid_attrib && fqheader.grid_attrib.LocalIUD != null && fqheader.grid_attrib.LocalIUD == true)
        {
            ProcessLocalData(qid, params);
            ResetLocalIUD(qid);
        }
        else
        {
            if (!isError)
            {
                if (fqheader.frm_attrib && fqheader.frm_attrib.custom_save != null && fqheader.optype == "Add")
                {
                    eval(fqheader.frm_attrib.custom_save);
                    return;
                }
                if (fqheader.frm_attrib && fqheader.frm_attrib.custom_update != null && fqheader.optype == "Update")//Custom update
                {
                    eval(fqheader.frm_attrib.custom_update);
                    return;
                }
                if (Object.size(params) > 0)
                {
                    var offlineCallType;
                    if (fqheader.frm_attrib && fqheader.frm_attrib.offlineCallType)
                    {
                        offlineCallType = fqheader.frm_attrib.offlineCallType;
                    }
                    getData(fqheader.qid, qstr, params, offlineCallType);
                }
                else
                    DisplayMessage(error_response_type["gp2016"],null,null,null,null,true);
            }
        }
    }
}

function SetValidationAttributes(ar_html, cobj)
{
    if (cobj.nul == "0")
        ar_html.push("data-bv-notempty='true' data-bv-notempty-message='This field can not be empty'");

    if (cobj.etype == "radio")
        return;

    switch(cobj.dtype)
    {
        case "int":
            if (cobj.edit_rules != null) {
                MultipleValidation(ar_html, cobj);
            }
            else {
                //ar_html.push(" type='number' data-bv-regexp='true' data-bv-regexp-regexp='^\d*' data-bv-regexp-message='The " + cobj.name + " can only consist of integer value'")
                ar_html.push(" type='number' data-bv-regexp='true' data-bv-regexp-regexp='^\d*' data-bv-regexp-message='This field can only consist of integer value'")
            }

            break;

        case "numeric":
        case "decimal":
        case "money":
            if (cobj.edit_rules != null) {
                MultipleValidation(ar_html, cobj);
            }
            else {
                //ar_html.push("  data-bv-regexp='true' data-bv-regexp-regexp='[0-9]+(\.[0-9][0-9]?)?' data-bv-regexp-message='The " + cobj.name + " is not a valid numeric value'");
                ar_html.push("  data-bv-regexp='true' data-bv-regexp-regexp='[0-9]+(\.[0-9][0-9]?)?' data-bv-regexp-message='This is not a valid numeric value'");
            }
        case "datetime":
        case "smalldatetime":
            //ar_html.push(" type='date'  data-bv-date='true' data-bv-date-format='dd-M-yyyy H:m:s' data-bv-date-separator='-'  data-bv-date-message='The " + cobj.name + " is not a valid date'")
            break;
        case "date":
            //ar_html.push(" type='date'  data-bv-date='true' data-bv-date-format='dd-M-yyyy' data-bv-date-separator='-'  data-bv-date-message='The " + cobj.name + " is not a valid date'")
            break;
        case "upload":
        case "image":
            if (!isPhoneGap())
            {
                ar_html.push(" type='file' ");
                if (cobj.frm_options && cobj.frm_options.isMultipleUpload != null && cobj.frm_options.isMultipleUpload == "true")
                    ar_html.push(" multiple=true ");
            }
            break;
        case "varchar":
        case "nvarchar2":
        case "nvarchar":
            if (cobj.edit_rules != null)
            {
                MultipleValidation(ar_html, cobj);
            }
            else
            {
                //ar_html.push(" type='text' data-bv-regexp='true' data-bv-regexp-regexp='^[ a-zA-Z0-9.\\-\\&\\,]+$' data-bv-regexp-message='The " + cobj.name + " can only have alphabets and digits'");
                ar_html.push(" type='text' data-bv-regexp='true' data-bv-regexp-regexp='^[ a-zA-Z0-9.\\-\\&\\,]+$' data-bv-regexp-message='This field can only have alphabets and digits'");
            }
            break;
            /* --start -- Aadilkhan-- */
        case "varcharauto":
            //ar_html.push(" type='text' data-bv-regexp='true' data-bv-regexp-regexp='^[ a-zA-Z0-9.\\(\\)\\&\\,\\-]+$' data-bv-regexp-message='The " + cobj.name + " can only have alphabets and digits'");
            ar_html.push(" type='text' data-bv-regexp='true' data-bv-regexp-regexp='^[ a-zA-Z0-9.\\(\\)\\&\\,\\-]+$' data-bv-regexp-message='This field can only have alphabets and digits'");
            /* -- end -- */
        default:
            ar_html.push(" type='text' ");

    }
    if (cobj.frm_options != null)
    {
        var type = cobj.frm_options.type;
        if (type == "multiselect")
        {
            ar_html.push(" multiple='multiple' ");        
        }
    }    
}
function MultipleValidation(ar_html, cobj)
{

    if (cobj.edit_rules.maxlength != null) {
        //ar_html.push(" data-bv-stringlength='true' data-bv-stringlength-max='" + cobj.edit_rules.maxlength + "' data-bv-stringlength-message='The " + cobj.name + " should be less than or equal to " + cobj.edit_rules.maxlength + " digits'");
        ar_html.push(" data-bv-stringlength='true' data-bv-stringlength-max='" + cobj.edit_rules.maxlength + "' data-bv-stringlength-message='Value should be less than or equal to " + cobj.edit_rules.maxlength + " digits'");
    }

    if (cobj.edit_rules.minlength != null) {
        //ar_html.push(" data-bv-stringlength='true' data-bv-stringlength-min='" + cobj.edit_rules.minlength + "' data-bv-stringlength-message='The " + cobj.name + " should be greater than or equal to " + cobj.edit_rules.minlength + "'");
        ar_html.push(" data-bv-stringlength='true' data-bv-stringlength-min='" + cobj.edit_rules.minlength + "' data-bv-stringlength-message='Value should be greater than or equal to " + cobj.edit_rules.minlength + "'");
    }
    
    if (cobj.edit_rules.type != null && cobj.edit_rules.type.length > 0) {
        switch (cobj.edit_rules.type) {
            case "email":
                ar_html.push(" type='email' data-bv-emailaddress='true' data-bv-emailaddress-message='This is not a valid email address'");
                break;
            case "phone":
                ar_html.push(" type='number' data-bv-regexp='true' data-bv-regexp-regexp='^([0-9]{11})$' data-bv-regexp-message='This is not a valid phone number'");
                break;
            case "mobile":
                ar_html.push(" type='text' data-bv-regexp='true' data-bv-regexp-regexp='^([0-9]{10,10})$' data-bv-regexp-message='This is not a valid mobile number'");
                break;
            case "url":
                ar_html.push(" type='url' data-bv-regexp='true' data-bv-regexp-regexp='^(http|ftp|https):\/\/([a-zA-Z0-9\-\.]+)\/?' data-bv-regexp-message='This is not a valid url format'");
                break;
            case "zip":
                ar_html.push(" type='text' data-bv-regexp='true' data-bv-regexp-regexp='^-?\d+(\.)?([0-9]{0,0})?$' data-bv-regexp-message='This is not a valid zip format'");
                break;
            case "pincode":
                ar_html.push(" type='number' data-bv-regexp='true' data-bv-regexp-regexp='^([0-9]{6})$' data-bv-regexp-message='This is not a valid pincode format'");
                break;
            case "pwd":
                ar_html.push(" type='number' data-bv-regexp='true' data-bv-regexp-regexp='(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%])(?=.*[0-9])' data-bv-regexp-message='The " + cobj.name + " doesnt  have valid password. Password should have atleast one uppercase letter,one lowercase letter,one digit and one special character from   &#64; &#35; &#36; &#37;'  "); /*@#$%*/
                break;
            case "nonegative":
                ar_html.push(" data-bv-regexp='true' data-bv-regexp-regexp='^[0-9]+[.]?[0-9]*$' data-bv-regexp-message='This field doesnt  have valid numbers.'");
                break;
            case "onlynumbers":
                ar_html.push(" type='number' data-bv-regexp='true' data-bv-regexp-regexp='^[0-9]+$' data-bv-regexp-message='This is not valid format of numbers.'");
                break;
            case "charwithdecimalpoint":
                ar_html.push(" type='text' data-bv-regexp='true' data-bv-regexp-regexp='^[ a-zA-Z0-9]+\.[0-9]*?$' data-bv-regexp-message='This field can only consist of alphabetical and digits with decimal point allowed'");
                break;
            //case "Address":
            //    //ar_html.push(" type='text' data-bv-regexp='true' data-bv-regexp-regexp='^[ a-zA-Z0-9\s\r\n]+[\/:,;-?]?[(.a-z.A-Z0-9\s\r\n)]*?$' data-bv-regexp-message='The " + cobj.name + " can only consists valid characters'");
            //    ar_html.push(" type='text' data-bv-regexp='true' data-bv-regexp-regexp='^[ a-zA-Z0-9.\"\\%\\@\\#\\!\\$\\-\\&\\,\\(\\)\\/\\:\\_\\;\\?\\s\\\\]+$' data-bv-regexp-message='The " + cobj.name + " can only consists valid characters'");
            //    break;
            case "Address":
                //ar_html.push(" type='text' data-bv-regexp='true' data-bv-regexp-regexp='^[ a-zA-Z0-9\s\r\n]+[\/:,;-?]?[(.a-z.A-Z0-9\s\r\n)]*?$' data-bv-regexp-message='The " + cobj.name + " can only consists valid characters'");
                ar_html.push(" type='text' data-bv-regexp='true' data-bv-regexp-regexp='[\\<\\>]*$' data-bv-regexp-message='This field can only consists valid characters'");
                break;
            case "nowhitespace":
                ar_html.push(" type='text' data-bv-regexp='true' data-bv-regexp-regexp='^[a-zA-Z0-9\\-]+$' data-bv-regexp-message='This field can only allow valid characters'");
                break;
            case "onlyalpha":
                ar_html.push(" type='text' data-bv-regexp='true' data-bv-regexp-regexp='^[a-zA-Z ]+$' data-bv-regexp-message='This field can only allow valid alphabets'");
                break;
            case "nohash":
                ar_html.push(" type='text' data-bv-regexp='true' data-bv-regexp-regexp='^[^#]+$' data-bv-regexp-message='This field does not allow text &#35;'");
                break;
            case "username":
                ar_html.push(" type='text' data-bv-regexp='true' data-bv-regexp-regexp='^[a-zA-Z0-9]+$' data-bv-regexp-message='This field does not allow special characters'");
                break;
            case "rating":
                ar_html.push(" type='text' data-bv-regexp='true' data-bv-regexp-regexp='^([1-9]{1}|10)?$' data-bv-regexp-message='This field can only consists 1 to 10 numbers'");
                break;
            case "imei":
                ar_html.push(" type='text' data-bv-regexp='true' data-bv-regexp-regexp='^[0-9]{15}$' data-bv-regexp-message='This field can only consists 15 numbers'");
                break;
            case "depotcode":
                ar_html.push(" type='text' data-bv-regexp='true' data-bv-regexp-regexp='^(D|2){1}([A-Za-z0-9]){3}?$' data-bv-regexp-message='This field must start with D or 2 and allow max 4 characters'");
                break;

        }

    }
}
function PasswordValidation(cobj) {
    if (cobj.name == 'New Password')
        var htm = 'data-bv-different="true" data-bv-different-field="Old Password" data-bv-different-message="The New Password cannot be the same as Old Password" '

    else if (cobj.name == 'Confirm New Password')
        var htm = ' data-bv-identical="true" data-bv-identical-field="New Password" data-bv-identical-message="Confirm password does not match with New Password" '; // pratik

    return htm;
}

function ProcessFileUpload(qid, fname)
{
    var formData = new FormData();
    var fqheader = Headers[qid];
    var prefix = fqheader.frmObj;
    var file = $(prefix + "_" + fname).closest("div").parent().find("div.btn-file input")[0].files;

    if (file.length > 0)
    {
        $(file).each(function (i, fle)
        {
            formData.append("file[" + i + "]", fle);
        });
    }
    else if (file.length == 0)
    {
        //DisplayMessage("Please select file to upload");
        return;
    }
    $.ajax({
        url: gSvcUrl + "?qid=" + qid+ "&cmd=fileupload",
        type: 'POST',
        data: formData,
        //async:false,
        success: function (response)
        {
            if (response != null && response.response_code == "0");
            else
            {
                DisplayMessage(response.message);
            }
            
        },
        error: function (a, b, c)
        {
            DisplayMessage(a.status + " = " + a.responseText);
        },
        cache: false,
        contentType: false,
        processData: false,
        dataType: 'json'
    });
    }