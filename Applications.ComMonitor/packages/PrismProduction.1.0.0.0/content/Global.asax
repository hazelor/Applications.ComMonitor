<%@ Application Language="C#" %>
<%@ Import Namespace="System.Web.Routing" %>
<%@ Import Namespace="System.Web.Http" %>
<%@ Import Namespace="System.Web" %>
<%@ Import Namespace="Prism" %>

<script runat="server">

    public SortedList<string, AppLookup> lkup_query;
    public SortedList<string, SortedList<string, string>> sl_session;
    
    void Application_Start(object sender, EventArgs e) 
    {
        RouteTable.Routes.MapHttpRoute
            (
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new
                {
                    controller = "WebApi",
                    action = "Test",
                    id = System.Web.Http.RouteParameter.Optional
                }
            );

        sl_session = new SortedList<string, SortedList<string, string>>();
        Application["SessionInfo"] = sl_session;
        Prism.AppCtrl.root_path = Server.MapPath("");
        Prism.AppCtrl.loglevel = ConfigurationManager.AppSettings.Get("loglevel");
        FillLookupQuery();
        GblCache gcache = new GblCache();
        gcache.lkup_query = new SortedList<string, AppLookup>();
        gcache.lkup_query = lkup_query;
        Application["GblCache"] = gcache;

    }

    void FillLookupQuery()
    {
        lkup_query = new SortedList<string, AppLookup>();
        string qry = "select LkName, Query,LoginFilter,Type from AppLookup where Query is not null order by LkName";
        System.Data.SqlClient.SqlDataReader reader = ReturnDataTable(qry);

        if (reader.HasRows)
        {
            AppLookup lkup;
            while (reader.Read())
            {
                lkup = new AppLookup();
                lkup.Query = reader.GetSqlValue(1).ToString();
                if (!reader.IsDBNull(2))
                    lkup.LoginFilter = reader.GetSqlValue(2).ToString();
                if (!reader.IsDBNull(3))
                    lkup.Type = reader.GetSqlValue(3).ToString();
                lkup_query[reader.GetSqlValue(0).ToString()] = lkup;
            }
        }
        if (!reader.IsClosed)
            reader.Close();
    }
    System.Data.SqlClient.SqlDataReader ReturnDataTable(string qry)
    {
        System.Data.SqlClient.SqlConnection scon = new System.Data.SqlClient.SqlConnection(ConfigurationManager.AppSettings.Get("Prism"));
        System.Data.SqlClient.SqlDataReader sreader = null;
        try
        {
            if (scon.State == System.Data.ConnectionState.Closed)
                scon.Open();

            System.Data.SqlClient.SqlCommand scmd = new System.Data.SqlClient.SqlCommand(qry, scon);
            sreader = scmd.ExecuteReader(System.Data.CommandBehavior.CloseConnection);
        }
        catch (Exception ex)
        {

        }
        finally
        {
            //scon.Close();
        }
        return (sreader);
    }
    
    protected void Application_BeginRequest(object sender, EventArgs e)
    {

    }
    void Application_End(object sender, EventArgs e) 
    {
        //  Code that runs on application shutdown

    }
        
    void Application_Error(object sender, EventArgs e) 
    { 
        // Code that runs when an unhandled error occurs

    }

    void Session_Start(object sender, EventArgs e) 
    {
        // Code that runs when a new session is started

    }

    void Session_End(object sender, EventArgs e) 
    {
        // Code that runs when a session ends. 
        // Note: The Session_End event is raised only when the sessionstate mode
        // is set to InProc in the Web.config file. If session mode is set to StateServer 
        // or SQLServer, the event is not raised.

    }
       
</script>
