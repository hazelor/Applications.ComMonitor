using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web;
using System.IO;
using System.Runtime.Serialization;
using System.Web.Routing;
using System.Web.Script;
using System.Data.SqlClient;
using System.Data.Common;
using Prism;

public class WebApiController : ApiController
{
    System.Web.Script.Serialization.JavaScriptSerializer serializer;
    SortedList<string, string> sl_post;
    WebApiResponse ar;
    DbDataReader dr;
    DataTable dtable;
    HttpResponseMessage response;
    int rcnt;    
    SQLHelper databaseHelper = new SQLHelper();
    LogInfo linfo = new LogInfo(HttpContext.Current.Server.MapPath("").Replace("\\api\\Webapi", ""), 3);
    [HttpPost]
    public string Test(WebApiResponse Name)
    {

        serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
        sl_post = serializer.Deserialize<SortedList<string, string>>(Name.errorCode);
        return Name.errorCode;
    }

    [HttpGet]
    public string Test()
    {
        return "Rizwan";
    }

    /// <summary>
    ///To Get all the Log activities From the Device to Admin (database)
    /// </summary>
    /// <param name="Ar"></param>
    /// <returns></returns>
    public HttpResponseMessage logActivities(logActivities LA)
    {
        ar = new WebApiResponse();        
        try
        {
            string qry = "select * from MDM_DeviceMaster where DeviceID='" + LA.uuid + "'";
            //linfo.LogFile(enLogType.QUERY, "Query = " + qry + "Device ID = " + LA.uuid, "Rizwan");
            dr = databaseHelper.getDataReader(qry);

            if (dr.Read())
            {
                ActivityLog la = new ActivityLog();
                DeviceTrackingDetail dt = new DeviceTrackingDetail();
                var list = LA.activity;

                string id = LA.uuid;
                if (!dr.IsClosed)
                    dr.Close();

                foreach (var c in list)
                {
                    la.DeviceID = id;
                    la.ActivityCode = c.activityCode;
                    la.LogText = c.actitivyDetail;
                    la.CreatedBy = 1;
                    la.UpdatedBy = 1;
                    la.LogDateTime = c.activityOn;
                    la.activityType = c.activityType;
                    if (c.activityCode == 2)
                    {
                        la.LogText = c.actitivyDetail + " Latitude : " + c.latitude + " Longitude : " + c.longitude;
                    }
                    qry = "insert into MDM_ActivityLog(LogText,DeviceID,EmployeeID,LogDateTime,ActivityCode,ActivityType)values('" + la.LogText + "','" + la.DeviceID + "','1','" + DateTime.Now.ToString("dd-MMM-yyyy HH:mm:ss") + "','" + la.ActivityCode + "','" + la.activityType + "')";

                    //linfo.LogFile(enLogType.QUERY, "\n\n Query = " + qry , "Rizwan");

                    rcnt = databaseHelper.ExecuteQuery(qry);
                }
                ar.response = true;
                response = Request.CreateResponse(HttpStatusCode.Created, ar);

                return response;
            }
            else
            {
                ar.errorCode = "No Device Found";
                ar.response = false;
                response = Request.CreateResponse(HttpStatusCode.BadRequest, ar);
                return response;
            }
        }
        catch (Exception ex)
        {
            if (!dr.IsClosed)
                dr.Close();
            linfo.LogFile(enLogType.EXCEPTION, "Function = logActivities() Error Message = "+ex.Message+"  InnerException ="+ex.InnerException.ToString(),null);

            ar.errorCode = "Problem in logActivities() WS";
            ar.response = false;
            response = Request.CreateResponse(HttpStatusCode.BadRequest, ar);
            
        }
        finally
        {
            if (dr != null && !dr.IsClosed)
                dr.Close();            
        }
        return response;
    }


    /// <summary>
    ///For Registering a Device From Android Device 
    /// </summary>
    /// <param name="Ar"></param>
    /// <returns></returns>
    public HttpResponseMessage registerDevice(SortedList<string, string> sl_post)
    {
        ar = new WebApiResponse();        
        try
        {
            string qry,EmpCode=null,UserType=null,Mobile=null,UserName=null;

            try
            {
                if (sl_post.ContainsKey("EmpCode"))
                {
                    EmpCode = sl_post["EmpCode"];                    
                    qry = "Select UserType,Mobile,UserName from AppUsers where EmpCode='" + sl_post["EmpCode"] + "'";
                    dr = databaseHelper.getDataReader(qry);                    
                    if(dr.Read())
                    {
                        UserType = dr["UserType"]!=DBNull.Value ? dr["UserType"].ToString() : null;
                        Mobile = dr["Mobile"] != DBNull.Value ? dr["Mobile"].ToString() : null;
                        UserName = dr["UserName"] != DBNull.Value ? dr["UserName"].ToString() : null;
                    }

                    if (!dr.IsClosed)
                        dr.Close();
                }

                qry = "select * from MDM_DeviceMaster where DeviceID='" + sl_post["uuid"] + "'";
                dr = databaseHelper.getDataReader(qry);

                ar.response = true;
                if (dr.Read())
                {
                    if (!dr.IsClosed)
                        dr.Close();

                    qry = "update MDM_DeviceMaster set Make='" + sl_post["make"] + "',osVersion='" + sl_post["osVersion"] + "',imeiNumber='" + sl_post["imeiNumber"] + "',macAddress='" + sl_post["macAddress"] + "',registrationId='" + sl_post["registrationId"] + "',GPSStatus=" + sl_post["gpsStatus"] + ",UserId='"+EmpCode+"',UserName='"+UserName+"', UserType='"+UserType+"',ContactNo='"+Mobile+"' where DeviceID='" + sl_post["uuid"] + "'";

                    rcnt = databaseHelper.ExecuteQuery(qry);
                    response = Request.CreateResponse(HttpStatusCode.Created, ar);
                }
                else
                {
                    if (!dr.IsClosed)
                        dr.Close();

                    qry = "insert into MDM_DeviceMaster(DeviceID,Make,UserId,UserName,UserType,ContactNo, osVersion,imeiNumber,macAddress,registrationId,GPSStatus,Manufacturer,DeviceSerialNumber,KernelVersion,APILevel,BuildNumber,ProcessorName,ProcessorSpeed,RAM,InternalStorage,TotalFreeStorage,FreeInternal,FreeExternal,DeviceRooted,ScreenResolution,ScreenLanguage,ScreenWidth,TimeZone,CameraPresent,GPSPresent,BluetoothPresent,NFCPresent,BatteryLevel,BatteryCondition)values('" + sl_post["uuid"] + "','" + sl_post["make"] + "','"+EmpCode+"','"+UserName+"','"+UserType+"','"+Mobile+"','" + sl_post["osVersion"] + "','" + sl_post["imeiNumber"] + "','" + sl_post["macAddress"] + "','" + sl_post["registrationId"] + "'," + sl_post["gpsStatus"] + ",'" + sl_post["Manufacturer"] + "','" + sl_post["DeviceSerialNumber"] + "','" + sl_post["KernelVersion"] + "','" + sl_post["APILevel"] + "','" + sl_post["BuildNumber"] + "','" + sl_post["ProcessorName"] + "','" + sl_post["ProcessorSpeed"] + "','" + sl_post["RAM"] + "','" + sl_post["InternalStorage"] + "','" + sl_post["TotalFreeStorage"] + "','" + sl_post["FreeInternal"] + "','" + sl_post["FreeExternal"] + "'," + sl_post["DeviceRooted"] + ",'" + sl_post["ScreenResolution"] + "','" + sl_post["ScreenLanguage"] + "','" + sl_post["ScreenWidth"] + "','" + sl_post["TimeZone"] + "'," + sl_post["CameraPresent"] + "," + sl_post["GPSPresent"] + "," + sl_post["BluetoothPresent"] + "," + sl_post["NFCPresent"] + ",'" + sl_post["BatteryLevel"] + "','" + sl_post["BatteryCondition"] + "')";

                    rcnt = databaseHelper.ExecuteQuery(qry);
                    response = Request.CreateResponse(HttpStatusCode.Created, ar);
                }

                /*qry = "delete from MDM_PushNotification where DeviceID='" + sl_post["uuid"] + "'";
                rcnt = databaseHelper.ExecuteQuery(qry);*/

                return response;

            }
            catch (Exception ex)
            {
                if (!dr.IsClosed)
                    dr.Close();

                linfo.LogFile(enLogType.EXCEPTION, "Problem in Register Device.Internal try catch "+ex.InnerException.ToString(), null);
            }
            finally
            {
                if (!dr.IsClosed)
                    dr.Close();
            }            
        }
        catch (Exception ex)
        {
            ar.errorCode = "Submission Failed";
            ar.response = false;
            response = Request.CreateResponse(HttpStatusCode.BadRequest, ar);
            linfo.LogFile(enLogType.EXCEPTION, "Problem in Register Device. External try catch ", null);                        
        }
        return response;
    }

    /// <summary>
    ///To Get all List of Applications From Device which are currently installed on device to Admin(Database)
    /// </summary>
    /// <param name="Ar"></param>
    /// <returns></returns>
    public HttpResponseMessage sendInstalledApps(SendInstalledApps SI)
    {
        ar = new WebApiResponse();        
        try
        {
            string qry = "select * from MDM_DeviceMaster where DeviceID='" + SI.uuid + "'";
            dr = databaseHelper.getDataReader(qry);
            if (dr.Read())
            {
                InstalledApp IA = new InstalledApp();
                IA.Device = dr["DeviceID"].ToString();
                IA.CreatedBy = 1;
                IA.UpdatedBy = 1;
                var list = SI.applications;
                if (!dr.IsClosed)
                    dr.Close();

                qry = "select * from MDM_InstalledApps where DeviceID='" + SI.uuid + "'";
                dr = databaseHelper.getDataReader(qry);
                if (dr.Read())
                {
                    if (!dr.IsClosed)
                        dr.Close();

                    qry = "Delete from MDM_InstalledApps where DeviceID='" + SI.uuid + "'";

                    rcnt = databaseHelper.ExecuteQuery(qry);

                }

                if (!dr.IsClosed)
                    dr.Close();

                foreach (var c in list)
                {
                    //Check that application package exist in installed apps(accessible application db) if not then insert application details
                    #region Accessible Apps //Check Application Package in (Accessible Apps database)/Installed apps if not then Add

                    /*qry = "select * from MDM_AccessibleApplication where ApplicationPackage='"+c.applicationPackage+"'";
                   dr = databaseHelper.getDataReader(qry);
                   if (!dr.Read())
                   {
                       if (!dr.IsClosed)
                           dr.Close();

                       qry = "insert into MDM_AccessibleApplication(ApplicationPackage,ApplicationName,CreatedDate)values('"+c.applicationPackage+"','"+c.applicationName+"','"+DateTime.Now+"')";

                       rcnt = databaseHelper.ExecuteQuery(qry);
                   }*/
                    #endregion
                    if (c.applicationName == null)//if application name recieved null then insert application package as name also
                    {
                        IA.ApplicationName = c.applicationPackage;
                    }
                    else
                    {
                        IA.ApplicationName = c.applicationName;
                    }

                    IA.ApplicationPackage = c.applicationPackage;
                    IA.CreatedDate = c.installedOn;
                    IA.UpdatedDate = DateTime.Now;
                    IA.isDownloaded = c.isDownloaded;
                    IA.applicationVersion = c.applicationVersion;
                    IA.applicationSize = c.applicationSize;
                    qry = "insert into MDM_InstalledApps(DeviceID,CreatedBy,UpdatedBy,ApplicationName,ApplicationPackage,CreatedDate,UpdatedDate,isDownloaded,ApplicationVersion,ApplicationSize) values('" + IA.Device + "'," + IA.CreatedBy + "," + IA.UpdatedBy + ",'" + IA.ApplicationName + "','" + IA.ApplicationPackage + "','" + IA.CreatedDate.ToString("yyyy-MM-dd HH:mm:ss") + "','" + IA.UpdatedDate.ToString("yyyy-MM-dd HH:mm:ss") + "'," + IA.isDownloaded + ",'" + IA.applicationVersion + "','" + IA.applicationSize + "')";

                    //linfo.LogFile(enLogType.INFO, qry, "rizwan");

                    rcnt = databaseHelper.ExecuteQuery(qry);

                    ar.errorCode += c.applicationPackage + " Added Successfully";
                }
                ar.response = true;
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, ar);

                qry = "delete from MDM_PushNotification where DeviceID='" + SI.uuid + "' and Command='Update Application List'";
                rcnt = databaseHelper.ExecuteQuery(qry);

                return response;
            }
            else
            {
                ar.errorCode = "Authentication Failed";
                ar.response = false;
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.PartialContent, ar);
                return response;
            }
        }
        catch (Exception ex)
        {
            linfo.LogFile(enLogType.EXCEPTION, ex.Message + "Problem in SendInstalledApp", null);                                    
        }
        finally
        {
            if (dr != null && !dr.IsClosed)
                dr.Close();
        }
        return null;
    }

    /// <summary>
    /// To Send The Configuration Details to the Device 
    /// </summary>
    /// <param name="Ar"></param>
    /// <returns></returns>
    [HttpPost]
    public HttpResponseMessage getConfigurationDetails(postmethod pm)
    {
        getConfigurationDetails gc = new getConfigurationDetails();
       
        string qry = "select * from MDM_DeviceMaster where DeviceID='" + pm.uuid + "'";
        dr = databaseHelper.getDataReader(qry);
        if (dr.Read())
        {
            if (!dr.IsClosed)
                dr.Close();

            qry = "select ID from MDM_ActivityCode";
            dtable = databaseHelper.getDataTable(qry);
            List<logactivity> La = new List<logactivity>();
            foreach (DataRow drow in dtable.Rows)
            {
                La.Add(new logactivity
                {
                    activityCode = drow["ID"].ToString(),
                    isLogActive = true
                });
            }

            qry = "select LowBatteryLogPer,DeviceTracingFrequency from MDM_ConfigurationPolicy";
            dr = databaseHelper.getDataReader(qry);
            int logperc = 0;
            int deviceTF = 0;
            if (dr.Read())
            {
                logperc = (dr["LowBatteryLogPer"] == null) ? 0 : Convert.ToInt32(dr["LowBatteryLogPer"]);
                deviceTF = (dr["DeviceTracingFrequency"] == null) ? 0 : Convert.ToInt32(dr["DeviceTracingFrequency"]);
            }

            gc.batteryLevel = logperc;
            gc.locationInterval = deviceTF * 60;
            gc.logactivity = La;
            gc.response = true;
            response = Request.CreateResponse(HttpStatusCode.Created, gc);

            if (!dr.IsClosed)
                dr.Close();

            qry = "delete from MDM_PushNotification where DeviceID='" + pm.uuid + "' and Command='Configuration Details'";
            rcnt = databaseHelper.ExecuteQuery(qry);

            return response;
        }

        else
        {
            gc.response = false;
            gc.errorCode = "Unable to Fetch";
            response = Request.CreateResponse(HttpStatusCode.Created, gc);
            return response;
        }
    }

    /// <summary>
    /// To send All the Application List Which are Accessible currently for that  device
    /// </summary>
    /// <param name="Ar"></param>
    /// <returns></returns>
    [HttpPost]
    public HttpResponseMessage getAccessibleApps(postmethod pm)
    {
        getConfigurationDetails gc = new getConfigurationDetails();        
        getAccessibleApps gaa = new getAccessibleApps();
        List<application> ga = new List<application>();

        string qry = "select * from MDM_DeviceMaster where DeviceID='" + pm.uuid + "'";
        dr = databaseHelper.getDataReader(qry);
        if (dr.Read())
        {
            string UserId = dr["UserId"] != DBNull.Value ? dr["UserId"].ToString().ToUpper() : null;

            if (!dr.IsClosed)
                dr.Close();

            string Designation = null;

            qry = "select UserType from AppUsers where UserName='" + UserId + "'";
            dr = databaseHelper.getDataReader(qry);
            if (dr.Read())
            {
                Designation = dr["UserType"].ToString().ToUpper();
            }

            if (!dr.IsClosed)
                dr.Close();

            qry = "select ApplicationName,ApplicationPackage,UserId,UserDesignation from MDM_AccessibleApplication";
            dtable = databaseHelper.getDataTable(qry);
            if (dtable.Rows.Count > 0)
            {
                foreach (DataRow drow in dtable.Rows)
                {
                    //linfo.LogFile(enLogType.QUERY, "drow[UserId] = " + drow["UserId"] + " drow[UserDesignation] = " + drow["UserDesignation"] + " UserId = " + UserId + ". UserDesignation = " + Designation + "", "rizwan");
                    if (drow["UserId"] == DBNull.Value && drow["UserDesignation"] == DBNull.Value) // Default Application
                    {
                        ga.Add(new application
                        {

                            applicationName = (drow["ApplicationName"] == DBNull.Value) ? "" : drow["ApplicationName"].ToString(),
                            applicationPackage = (drow["ApplicationPackage"] == DBNull.Value) ? "" : drow["ApplicationPackage"].ToString()
                        });

                        //linfo.LogFile(enLogType.INFO, "UserID,UserDesignation are null. ApplicationName = " + drow["ApplicationName"] + " ApplicationPackage = "+drow["ApplicationPackage"]+"", "rizwan");
                    }
                    else if (drow["UserId"] != DBNull.Value && drow["UserDesignation"] != DBNull.Value && drow["UserId"].ToString().Length > 0 && drow["UserDesignation"].ToString().Length > 0 && drow["UserId"].ToString().Split(',').Contains(UserId) && drow["UserDesignation"].ToString().Split(',').Contains(UserId))// Application Valid only to specific user.
                    {
                        ga.Add(new application
                        {

                            applicationName = (drow["ApplicationName"] == DBNull.Value) ? "" : drow["ApplicationName"].ToString(),
                            applicationPackage = (drow["ApplicationPackage"] == DBNull.Value) ? "" : drow["ApplicationPackage"].ToString()
                        });

                        //linfo.LogFile(enLogType.INFO, "Userid and UserDesignation are not null . drow[UserId] = " + drow["UserId"] + " and Userid=" + UserId + ". drow[UserDesignation] = " + drow["UserDesignation"] + " and Designation = " + Designation + " ApplicationName = " + drow["ApplicationName"] + " ApplicationPackage = " + drow["ApplicationPackage"] + "", "rizwan");
                    }
                    else if (drow["UserId"] != DBNull.Value && drow["UserDesignation"] == DBNull.Value && drow["UserID"].ToString().Length > 0 && drow["UserID"].ToString().Split(',').Contains(UserId))// Application Valid only to specific user.
                    {
                        ga.Add(new application
                        {

                            applicationName = (drow["ApplicationName"] == DBNull.Value) ? "" : drow["ApplicationName"].ToString(),
                            applicationPackage = (drow["ApplicationPackage"] == DBNull.Value) ? "" : drow["ApplicationPackage"].ToString()
                        });
                        //linfo.LogFile(enLogType.INFO, "Userid is not null. drow[UserId] = " + drow["UserId"] + " and Userid=" + UserId + ". drow[UserDesignation] = " + drow["UserDesignation"] + " and Designation = " + Designation + " ApplicationName = " + drow["ApplicationName"] + " ApplicationPackage = " + drow["ApplicationPackage"] + "", "rizwan");
                    }
                    else if (drow["UserDesignation"] != DBNull.Value && drow["UserId"] == DBNull.Value && drow["UserDesignation"].ToString().Length > 0 && drow["UserDesignation"].ToString().Split(',').Contains(Designation)) //application valid only to specific designation (multiple user can come to same designation)
                    {
                        ga.Add(new application
                        {

                            applicationName = (drow["ApplicationName"] == DBNull.Value) ? "" : drow["ApplicationName"].ToString(),
                            applicationPackage = (drow["ApplicationPackage"] == DBNull.Value) ? "" : drow["ApplicationPackage"].ToString()
                        });
                        //linfo.LogFile(enLogType.INFO, "UserDesignation is not null. drow[UserId] = " + drow["UserId"] + " and Userid=" + UserId + ". drow[UserDesignation] = " + drow["UserDesignation"] + " and Designation = " + Designation + " ApplicationName = " + drow["ApplicationName"] + " ApplicationPackage = " + drow["ApplicationPackage"] + "", "rizwan");
                    }
                }
            }
            gaa.applications = ga;

            #region     Website list

            qry = "Select WebsiteName from MDM_AccessibleWebsite";
            dtable = databaseHelper.getDataTable(qry);
            List<weblist> website = new List<weblist>();
            foreach (DataRow drow in dtable.Rows)
            {
                website.Add(new weblist
                 {
                     WebsiteName = (drow["WebsiteName"] == DBNull.Value) ? "" : drow["WebsiteName"].ToString()
                 });
            }
            gaa.websiteurl = website;
            #endregion

            gaa.response = true;
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, gaa);

            qry = "delete from MDM_PushNotification where DeviceID='" + pm.uuid + "' and Command='Get Accessible Apps'";
            rcnt = databaseHelper.ExecuteQuery(qry);

            return response;
        }
        else
        {
            ar = new WebApiResponse();
            ar.errorCode = "Authentication failed";
            ar.response = false;
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.BadRequest, ar);
            return response;
        }
    }

    [HttpPost]
    public HttpResponseMessage getAccessibleWebsites(postmethod pm)
    {        
        getAccessibleWebsites gaw = new getAccessibleWebsites();
        List<weblist> wl = new List<weblist>();
        try
        {
            string qry = "select * from MDM_DeviceMaster where DeviceID='" + pm.uuid + "'";
            dr = databaseHelper.getDataReader(qry);
            if (dr.Read())
            {
                string UserId = dr["UserId"].ToString().ToUpper();

                if (!dr.IsClosed)
                    dr.Close();

                string Designation = null;

                qry = "select UserType from AppUsers where UserName='" + UserId + "'";
                dr = databaseHelper.getDataReader(qry);
                if (dr.Read())
                {
                    Designation = dr["UserType"].ToString().ToUpper();
                }

                if (!dr.IsClosed)
                    dr.Close();

                qry = "Select WebsiteName,UserId,UserDesignation from MDM_AccessibleWebsite";
                dtable = databaseHelper.getDataTable(qry);
                List<weblist> website = new List<weblist>();
                foreach (DataRow drow in dtable.Rows)
                {
                    //linfo.LogFile(enLogType.QUERY, "drow[UserId] = " + drow["UserId"] + " drow[UserDesignation] = "+drow["UserDesignation"]+" UserId = "+UserId+". UserDesignation = "+Designation+"","rizwan");
                    if (drow["UserId"] == DBNull.Value && drow["UserDesignation"] == DBNull.Value) // Default Application
                    {
                        website.Add(new weblist
                        {
                            WebsiteName = (drow["WebsiteName"] == DBNull.Value) ? "" : drow["WebsiteName"].ToString()
                        });
                        //linfo.LogFile(enLogType.INFO, "UserID,UserDesignation are null. WebsiteName = " + drow["WebsiteName"] + "", "rizwan");
                    }
                    else if (drow["UserId"] != DBNull.Value && drow["UserDesignation"] != DBNull.Value && drow["UserId"].ToString().Length > 0 && drow["UserDesignation"].ToString().Length > 0 && drow["UserID"].ToString().Split(',').Contains(UserId) && drow["UserDesignation"].ToString().Split(',').Contains(UserId))// Application Valid only to specific user.
                    {
                        website.Add(new weblist
                        {
                            WebsiteName = (drow["WebsiteName"] == DBNull.Value) ? "" : drow["WebsiteName"].ToString()
                        });
                        //linfo.LogFile(enLogType.INFO, "UserId and UserDesignation are not null . drow[UserId] = " + drow["UserId"] + " drow[UserDesignation] = " + drow["UserDesignation"] + " UserId = " + UserId + ". UserDesignation = " + Designation + "", "rizwan");
                    }
                    else if (drow["UserId"] != DBNull.Value && drow["UserDesignation"] == DBNull.Value && drow["UserId"].ToString().Length > 0 && drow["UserId"].ToString().Split(',').Contains(UserId)) // Accessible to specific user.
                    {
                        website.Add(new weblist
                        {
                            WebsiteName = (drow["WebsiteName"] == DBNull.Value) ? "" : drow["WebsiteName"].ToString()
                        });
                       // linfo.LogFile(enLogType.INFO, "Userid is not null. drow[UserId] = "+drow["UserId"]+" and Userid="+UserId+". drow[UserDesignation] = "+drow["UserDesignation"]+" and Designation = "+Designation+" WebsiteName = " + drow["WebsiteName"] + "", "rizwan");
                    }
                    else if (drow["UserDesignation"] != DBNull.Value && drow["UserId"] == DBNull.Value && drow["UserDesignation"].ToString().Length > 0 && drow["UserDesignation"].ToString().Contains(Designation))//accessible to user of specific designation
                    {
                        website.Add(new weblist
                        {
                            WebsiteName = (drow["WebsiteName"] == DBNull.Value) ? "" : drow["WebsiteName"].ToString()
                        });

                        //linfo.LogFile(enLogType.INFO, "UserDesignation is not null. drow[UserId] = " + drow["UserId"] + " and Userid=" + UserId + ". drow[UserDesignation] = " + drow["UserDesignation"] + " and Designation = " + Designation + " WebsiteName = " + drow["WebsiteName"] + "", "rizwan");
                    }
                }

                gaw.websiteurl = website;
                gaw.response = true;
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, gaw);

                qry = "delete from MDM_PushNotification where DeviceID='" + pm.uuid + "' and Command='Get Accessible Website'";
                rcnt = databaseHelper.ExecuteQuery(qry);

                return response;
            }
            else
            {
                ar = new WebApiResponse();
                ar.errorCode = "Authentication failed";
                ar.response = false;
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.BadRequest, ar);
                return response;
            }
        }
        catch(Exception ex)
        {
            linfo.LogFile(enLogType.EXCEPTION, "Problem in getAccessibleWebsites function."+ex.Message+"",null);            
        }
        finally
        {
            if (dr != null && !dr.IsClosed)
                dr.Close();
        }
        return null;
    }

    /// <summary>
    ///To send All the Activity codes to the device 
    /// </summary>
    /// <param name="Ar"></param>
    /// <returns></returns>
    [HttpPost]
    public HttpResponseMessage getUserActivityCodes(postmethod pm)
    {        
        getUserActivityCodes ga = new getUserActivityCodes();
        try
        {

            string qry = "select * from MDM_DeviceMaster where DeviceID='" + pm.uuid + "'";
            dr = databaseHelper.getDataReader(qry);

            if (dr.Read())
            {
                if (!dr.IsClosed)
                    dr.Close();

                List<userCodes> uc = new List<userCodes>();
                qry = "select ActivityCode,ActivityName,Type from MDM_ActivityCode";
                dtable = databaseHelper.getDataTable(qry);

                foreach (DataRow drow in dtable.Rows)
                {
                    uc.Add(new userCodes
                    {
                        code = drow["ActivityCode"].ToString(),
                        name = drow["ActivityName"].ToString(),
                        type = drow["Type"].ToString()
                    });
                }
                ga.userCodes = uc;
                ga.response = true;
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, ga);

                /*qry = "delete from MDM_PushNotification where DeviceID='" + pm.uuid + "'";
                rcnt = databaseHelper.ExecuteQuery(qry);*/

                return response;
            }
            else
            {
                ga.response = true;
                ga.errorCode = "Authentication Failed";
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.BadRequest, ga);
                return response;
            }
        }
        catch (Exception ex)
        {
            linfo.LogFile(enLogType.EXCEPTION, ex.Message, null);            
        }
        finally
        {
            if (dr != null && !dr.IsClosed)
                dr.Close();
        }
        return null;
    }

    /// <summary>
    ///To Update the Device Location status to admin
    /// </summary>
    /// <param name="Ar"></param>
    /// <returns></returns>
    public HttpResponseMessage updateDeviceLocation(DeviceLocation DL)
    {
        ar = new WebApiResponse();        
        try
        {
            string qry = "select * from MDM_DeviceMaster where DeviceID='" + DL.uuid + "'";
            dr = databaseHelper.getDataReader(qry);

            if (dr.Read())
            {
                if (!dr.IsClosed)
                    dr.Close();

                DeviceTrackingDetail DT = new DeviceTrackingDetail();

                var list = DL.locations;
                foreach (var c in list)
                {
                    qry = "insert into MDM_DeviceTrackingDetail(DeviceId,latitude,longitude,CreatedDate)values('" + DL.uuid + "','" + c.latitude + "','" + c.longitude + "','" + c.timestamp.ToString("yyyy-MM-dd HH:mm:ss") + "')";
                    rcnt = databaseHelper.ExecuteQuery(qry);
                }
                ar.response = true;
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, ar);

                qry = "delete from MDM_PushNotification where DeviceID='" + DL.uuid + "' and Command='GetDeviceLocation'";
                rcnt = databaseHelper.ExecuteQuery(qry);

                return response;
            }
            else
            {
                ar.errorCode = "Authentication Failed";
                ar.response = false;
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.BadRequest, ar);
                return response;
            }
        }
        catch(Exception ex)
        {
            linfo.LogFile(enLogType.EXCEPTION, ex.Message,null);            
        }
        finally
        {
            if (dr != null && !dr.IsClosed)
                dr.Close();
        }
        return null;
    }

    /// <summary>
    ///To Update the device Lock Status (Lock/unlock)
    /// </summary>
    /// <param name="Ar"></param>
    /// <returns></returns>
    public HttpResponseMessage updateDeviceLockStatus(DeviceLock DL)
    {
        ar = new WebApiResponse();
        try
        {

            string qry = "select * from MDM_DeviceMaster where DeviceID='" + DL.uuid + "'";
            dr = databaseHelper.getDataReader(qry);

            if (dr.Read())
            {
                if (!dr.IsClosed)
                    dr.Close();

                qry = "delete from MDM_PushNotification where DeviceID='" + DL.uuid + "'";
                string qry1 = "update MDM_DeviceMaster set";
                if (DL.status == false)//successfully unlocked
                {
                    // SendSmsOrMail(DL.uuid); //to inform that device is unlocked
                    qry += " and Command ='Unlocked'";
                    qry1 += " Status=2 ";
                }
                else if (DL.status == true)//successfully locked
                {
                    // SendLockDeviceDetails(DL.uuid);//To send unlock details of locked device by sms/email
                    qry += " and Command ='Locked'";
                    qry1 += " Status=1 ";
                }
                rcnt = databaseHelper.ExecuteQuery(qry);
                qry1 += " where DeviceID='" + DL.uuid + "'";
                rcnt = databaseHelper.ExecuteQuery(qry1);
                ar.response = true;
                response = Request.CreateResponse(HttpStatusCode.Created, ar);
                return response;
            }
            else
            {
                ar.errorCode = "Authentication Failed";
                ar.response = false;
                response = Request.CreateResponse(HttpStatusCode.BadRequest, ar);
                return response;
            }
        }
        catch (Exception ex)
        {
            linfo.LogFile(enLogType.EXCEPTION, ex.Message, null);
            ar.errorCode = "Device Lock Status Failed";
            ar.response = false;
            response = Request.CreateResponse(HttpStatusCode.BadRequest, ar);            
        }
        finally
        {
            if (dr != null && !dr.IsClosed)
                dr.Close();
        }
        return response;
    }

    /// <summary>
    ///To Update the PushNotification During Remote Installed App
    /// </summary>
    /// <param name="Ar"></param>
    /// <returns></returns>
    public HttpResponseMessage RemotelyInstalledAPK(SortedList<string, string> pm)
    {
        ar = new WebApiResponse();
        try
        {

            if (pm.ContainsKey("uuid"))
            {
                string qry = "select * from MDM_DeviceMaster where DeviceID='" + pm["uuid"] + "'";
                dr = databaseHelper.getDataReader(qry);

                if (dr.Read())
                {
                    if (!dr.IsClosed)
                        dr.Close();

                    if (pm.ContainsKey("packageName") && pm.ContainsKey("applicationName"))
                    {
                        qry = "update MDM_RemoteInstallApp set ApplicationPackage='" + pm["packageName"] + "' where ApplicationName='" + pm["applicationName"].ToString() + "'";
                        rcnt = databaseHelper.ExecuteQuery(qry);
                    }
                    qry = "delete from MDM_PushNotification where DeviceID='" + pm["uuid"] + "' and Command like '%Remote Install%'";
                    rcnt = databaseHelper.ExecuteQuery(qry);

                    ar.response = true;
                    response = Request.CreateResponse(HttpStatusCode.Created, ar);
                    return response;
                }
                else
                {
                    ar.errorCode = "Error in service RemotelyInstalledAPK";
                    ar.response = false;
                    response = Request.CreateResponse(HttpStatusCode.BadRequest, ar);
                    return response;
                }
            }
            else
            {
                ar.errorCode = "uuid is empty";
                ar.response = false;
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.BadRequest, ar);
                return response;
            }
        }
        catch (Exception ex)
        {
            linfo.LogFile(enLogType.EXCEPTION, ex.Message, null);
            ar.errorCode = "Remote Install APK Failed";
            ar.response = false;
            response = Request.CreateResponse(HttpStatusCode.BadRequest, ar);            
        }
        finally
        {
            if (dr != null && !dr.IsClosed)
                dr.Close();
        }
        return response;
    }

    /// <summary>
    ///Process Remotely Un-installed Apk
    /// </summary>
    /// <param name="Ar"></param>
    /// <returns></returns>
    public HttpResponseMessage ProcessRemoteUnInstall(RemoteUninstall RU)
    {
        ar = new WebApiResponse();        
        try
        {
            string qry = "select * from MDM_DeviceMaster where DeviceID='" + RU.uuid + "'";
            dr = databaseHelper.getDataReader(qry);

            if (dr.Read())
            {
                if (!dr.IsClosed)
                    dr.Close();

                qry = "delete from MDM_PushNotification where DeviceID='" + RU.uuid + "' and Command like '%Remote Uninstall%'";
                rcnt = databaseHelper.ExecuteQuery(qry);

                qry = "delete from MDM_InstalledApps where DeviceID='" + RU.uuid + "' and isDownloaded=1 and ApplicationPackage='" + RU.packageName + "'";

                //linfo.LogException(null,"Process Remote Uninstall Delete Qry = "+qry);
                rcnt = databaseHelper.ExecuteQuery(qry);

                ar.response = true;
                response = Request.CreateResponse(HttpStatusCode.Created, ar);
                return response;
            }
            else
            {
                ar.errorCode = "No Device Found";
                ar.response = false;
                response = Request.CreateResponse(HttpStatusCode.BadRequest, ar);
                return response;
            }
        }
        catch (Exception ex)
        {
            linfo.LogFile(enLogType.EXCEPTION, "Problem in ProcessRemoteUninstall()",null);
            ar.errorCode = "WebService Exception in function ProcessRemoteUninstall()";
            ar.response = false;
            response = Request.CreateResponse(HttpStatusCode.BadRequest, ar);            
        }
        finally
        {
            if (dr != null && !dr.IsClosed)
                dr.Close();
        }
        return response;
    }

    /// <summary>
    ///Process The Received Gps Status from the device.
    /// </summary>
    /// <param name="Ar"></param>
    /// <returns></returns>
    public HttpResponseMessage ProcessGPSStatus(SortedList<string, string> pm)
    {
        ar = new WebApiResponse();
        try
        {

            if (pm.ContainsKey("uuid"))
            {
                string qry = "select * from MDM_DeviceMaster where DeviceID='" + pm["uuid"] + "'";
                dr = databaseHelper.getDataReader(qry);

                if (dr.Read())
                {
                    if (!dr.IsClosed)
                        dr.Close();

                    if (pm.ContainsKey("gpsStatus"))
                    {
                        qry = "Update MDM_DeviceMaster set GPSStatus=" + pm["gpsStatus"] + " where DeviceID='" + pm["uuid"] + "'";
                        rcnt = databaseHelper.ExecuteQuery(qry);
                    }

                    qry = "delete from MDM_PushNotification where DeviceID='" + pm["uuid"] + "' and Command like '%Get GPS Status%'";
                    rcnt = databaseHelper.ExecuteQuery(qry);

                    ar.response = true;
                    response = Request.CreateResponse(HttpStatusCode.Created, ar);
                    return response;
                }
                else
                {
                    ar.errorCode = "No Such Device Found";
                    ar.response = false;
                    response = Request.CreateResponse(HttpStatusCode.BadRequest, ar);
                    return response;
                }
            }
            else
            {
                ar.errorCode = "uuid is empty";
                ar.response = false;
                response = Request.CreateResponse(HttpStatusCode.BadRequest, ar);
                return response;
            }
        }
        catch (Exception ex)
        {
            ar.errorCode = "GPS Status Failed";
            ar.response = false;
            response = Request.CreateResponse(HttpStatusCode.BadRequest, ar);
            linfo.LogFile(enLogType.EXCEPTION, ex.Message, null);            
        }
        finally
        {
            if (dr != null && !dr.IsClosed)
                dr.Close();
        }
        return response;
    }

    /// <summary>
    ///Process The Remotely Enabled GPS. A webservice which is called after the gps of the selected
    ///devices are enabled
    /// </summary>
    /// <param name="Ar"></param>
    /// <returns></returns>
    public HttpResponseMessage ProcessRemotelyEnableGPS(postmethod pm)
    {
        ar = new WebApiResponse();        
        string qry = "select * from MDM_DeviceMaster where DeviceID='" + pm.uuid + "'";
        dr = databaseHelper.getDataReader(qry);
        try
        {

            if (dr.Read())
            {
                if (!dr.IsClosed)
                    dr.Close();

                qry = "update MDM_DeviceMaster set GPSStatus=1 where DeviceID='" + pm.uuid + "'";
                rcnt = databaseHelper.ExecuteQuery(qry);

                qry = "delete from MDM_PushNotification where DeviceID='" + pm.uuid + "' and Command like '%Remotely Enable GPS%'";
                rcnt = databaseHelper.ExecuteQuery(qry);

                ar.response = true;
                response = Request.CreateResponse(HttpStatusCode.Created, ar);
                return response;
            }
            else
            {
                ar.errorCode = "Authentication Failed";
                ar.response = false;
                response = Request.CreateResponse(HttpStatusCode.BadRequest, ar);
                return response;
            }
        }
        catch(Exception ex)
        {
            ar.errorCode = "Remote Enable GPS Failed";
            ar.response = false;
            response = Request.CreateResponse(HttpStatusCode.BadRequest, ar);
            linfo.LogFile(enLogType.EXCEPTION, ex.Message, null);            
        }
        finally
        {
            if (dr != null && !dr.IsClosed)
                dr.Close();
        }
        return response;
    }

    /// <summary>
    /// Get the Browse History of the selected device 
    /// </summary>
    /// <param name="Ar"></param>
    /// <returns></returns>
    [HttpPost]
    public HttpResponseMessage getBrowseHistory(BrowseHistoryList BH)
    {
        ar = new WebApiResponse();        
        try
        {
            string qry = "select * from MDM_BrowseHistory where DeviceID='" + BH.uuid + "'";
            dr = databaseHelper.getDataReader(qry);

            if (dr.Read())
            {
                if (!dr.IsClosed)
                    dr.Close();

                qry = "delete from MDM_BrowseHistory where DeviceID='" + BH.uuid + "'";
                rcnt = databaseHelper.ExecuteQuery(qry);
            }

            if (!dr.IsClosed)
                dr.Close();

            foreach (SortedList<string, string> key_val in BH.BrowseHistory)
            {
                qry = "insert into MDM_BrowseHistory(DeviceID,URL,BrowseTimeStamp)values('" + BH.uuid + "','" + key_val["url"] + "',convert(datetime,'"+key_val["BrowseTimeStamp"]+"',120))";

                //linfo.LogException(null, "Browse History Query = " + qry);

                databaseHelper.ExecuteQuery(qry);
            }

            qry = "delete from MDM_PushNotification where DeviceID='" + BH.uuid + "' and Command='Browse History'";
            rcnt = databaseHelper.ExecuteQuery(qry);

            ar.errorCode = "Successfully Completed";
            ar.response = true;
            response = Request.CreateResponse(HttpStatusCode.Created, ar);
            return response;
        }
        catch (Exception ex)
        {
            ar.errorCode = "Browse History Submission Failed";
            ar.response = false;
            response = Request.CreateResponse(HttpStatusCode.BadRequest, ar);
            linfo.LogFile(enLogType.EXCEPTION, ex.Message,null);            
        }
        finally
        {
            if (dr != null && !dr.IsClosed)
                dr.Close();
        }
        return response;
    }
    /// <summary>
    /// Verify the User Authentication 
    /// </summary>
    /// <param name="Ar"></param>
    /// <returns></returns>
    [HttpPost]
    public HttpResponseMessage VerifyUserAuthentication(SortedList<string, string> sl_post)
    {
        ar = new WebApiResponse();        
        try
        {
            string qry = "select * from AppUsers where UserName='" + sl_post["EmpCode"] + "' and password = '" + sl_post["password"] + "' and Status ='Active'";
            dr = databaseHelper.getDataReader(qry);

            if (dr.Read())
            {
                ar.errorCode = "Valid User";
                ar.response = true;
            }
            else
            {
                ar.errorCode = "Invalid User";
                ar.response = false;
            }

            if (!dr.IsClosed)
                dr.Close();

            response = Request.CreateResponse(HttpStatusCode.Created, ar);
            return response;
        }
        catch (Exception ex)
        {
            ar.errorCode = "Submission Failed";
            ar.response = false;
            response = Request.CreateResponse(HttpStatusCode.BadRequest, ar);
            linfo.LogFile(enLogType.EXCEPTION, ex.Message,null);           
        }
        finally
        {
            if (dr!=null && !dr.IsClosed)
                dr.Close();
        }
        return response;
    }
}
