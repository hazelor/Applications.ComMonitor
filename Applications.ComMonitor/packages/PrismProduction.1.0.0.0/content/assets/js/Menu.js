
function myMenu()
{
    var mtype, mdata, mdiv;
}

myMenu.prototype =
{
    MegaDrop: function (data, dest)
    {
        var ar_data = new Array();
        this.mdiv = "#" + dest;
        ar_data.push(' <ul class="nav navbar-nav"> ');
        $(this.mdiv).empty();
        convert(data, ar_data);
        ar_data.push("</ul>");
        $(this.mdiv).html(ar_data.join(''));


        $('#pmenu ul > li ul')
    .click(function (e)
    {
        var $ele;
        e.stopPropagation();

        var ele = $(e.target).get(0).tagName;
        if (ele == "A")
            $ele = $(e.target).parent();
        else
            $ele = $(e.target);

        $(this).closest("ul[class='dropdown-menu']").closest("li").removeClass("open");

        id = $ele.attr("id");
        if (id && id != "0")
        {
            //added for iframe report
            if (id.indexOf('frame') == 0)
            {
                $("#main").html("");
                $("#i_frame").show();
                $("#i_frame").css('border', "none");

                var iframe = document.getElementById("i_frame");
                iframe.src = "";
                iframe.src = id.substr(6);
                return;
            }
            else if (id.indexOf('funct') == 0)
            {
                var fun_to_call = id.substr(6)
                eval(fun_to_call);
                return;
            }
            $("#i_frame").attr("style", "display:none;");
            //iframe ended here

            if (Headers[id] == null)
                alert(" Header for the Query ID = " + id + " is not available ");
            else
            {
                cur_qid = id;
                $("#tpar").css("display", "block");
                SetRoleBaseIUD(id);
                getData(id,GetLookupOfCurrentScreen(id));
            }
            return;
        }
    });
    }
}

function convert(objJson, ar_data)
{
    var MenuStr = "";

    $(objJson).each(function (i)
    {
        if (objJson[i] == null)
            return true;
        if (objJson[i].hasOwnProperty("subMenu"))
        {
            //ar_data.push("<li id='" + objJson[i].id + "'>");

            ar_data.push("<li menuname='" + objJson[i].src + "' class='dropdown'>");
            ar_data.push("<a href='#' class='dropdown-toggle' data-toggle='dropdown'> " + objJson[i].src + " <b class='caret'></b> </a>")

            //ar_data.push(objJson[i].src);
            var temp = objJson[i].subMenu;
            ar_data.push("<ul class='dropdown-menu'>");
            
            ar_data.push(convert(temp, ar_data));
            
            ar_data.push("</ul>");
            ar_data.push("</li>");
        }
        else
        {   
            ar_data.push("<li id='" + objJson[i].id + "'>");
            ar_data.push("<a href='#'>")
            ar_data.push(objJson[i].src);
            ar_data.push("</a>")            
            ar_data.push("</li>");
        }
    })
}

var menu_color = {'ic1':'blueb', 'ic2':'orangeb', 'ic3':'greenb', 'ic4':'redb', 'ic5':'lredb', 'ic6':'pinkb', 'ic7':'dblueb', 'ic8':'purpleb', 'ic9':'sblueb', 'ic10':'blackb', 'ic11':'yellowb', 'ic12':'greenc'};