using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for WebApiResponse
/// </summary>
public class WebApiResponse
{
	public WebApiResponse()
	{
	}
    public string errorCode
    {
        get;
        set;
    }
    public bool response
    {
        get;
        set;
    }
}

public partial class logActivities
{
    public string uuid
    {
        get;
        set;
    }
    public List<activity> activity
    {
        get;
        set;
    }
}
public class activity
{
    public Int64 activityCode
    {
        get;
        set;
    }
    public string activityDetailDataType
    {
        get;
        set;
    }
    public DateTime activityOn
    {
        get;
        set;
    }
    public string actitivyDetail
    {
        get;
        set;
    }
    public string latitude
    {
        get;
        set;
    }
    public string longitude
    {
        get;
        set;
    }
    public string activityType
    {
        get;
        set;
    }
}

public partial class ActivityLog
{
    public long ID
    {
        get;
        set;
    }
    public string LogText
    {
        get;
        set;
    }
    public string DeviceID
    {
        get;
        set;
    }
    public Nullable<long> EmployeeID
    {
        get;
        set;
    }
    public Nullable<System.DateTime> LogDateTime
    {
        get;
        set;
    }
    public Nullable<long> ActivityCode
    {
        get;
        set;
    }
    public Nullable<System.DateTime> CreatedDate
    {
        get;
        set;
    }
    public Nullable<System.DateTime> UpdatedDate
    {
        get;
        set;
    }
    public Nullable<int> CreatedBy
    {
        get;
        set;
    }
    public Nullable<int> UpdatedBy
    {
        get;
        set;
    }
    public string activityType
    {
        get;
        set;
    }
}

public partial class DeviceTrackingDetail
{
    public long employeeid
    {
        get;
        set;
    }
    public string employeename
    {
        get;
        set;
    }
}

public partial class SendInstalledApps
{
    public string uuid
    {
        get;
        set;
    }
    public List<applications> applications
    {
        get;
        set;
    }
}

public class applications
{
    public string applicationName
    {
        get;
        set;
    }
    public string applicationPackage
    {
        get;
        set;
    }
    public DateTime installedOn
    {
        get;
        set;
    }
    public int isDownloaded
    {
        get;
        set;
    }
    public string applicationVersion
    {
        get;
        set;
    }
    public string applicationSize
    {
        get;
        set;
    }
}
public partial class InstalledApp
{
    public long ID
    {
        get;
        set;
    }
    public string Device
    {
        get;
        set;
    }
    public Nullable<int> CreatedBy
    {
        get;
        set;
    }
    public Nullable<int> UpdatedBy
    {
        get;
        set;
    }
    public System.DateTime CreatedDate
    {
        get;
        set;
    }
    public System.DateTime UpdatedDate
    {
        get;
        set;
    }
    public string ApplicationName
    {
        get;
        set;
    }
    public string ApplicationPackage
    {
        get;
        set;
    }
    public string ApplicationDescription
    {
        get;
        set;
    }
    public int isDownloaded
    {
        get;
        set;
    }
    public string applicationVersion
    {
        get;
        set;
    }
    public string applicationSize
    {
        get;
        set;
    }
}

public partial class RemoteUninstall
{
    public string uuid
    {
        get;
        set;
    }
    public string packageName
    {
        get;
        set;
    }
}

public partial class postmethod
{
    public string uuid
    {
        get;
        set;
    }
}
public class getConfigurationDetails
{
    public string errorCode
    {
        get;
        set;
    }
    public List<logactivity> logactivity
    {
        get;
        set;
    }
    public int locationInterval
    {
        get;
        set;
    }
    public int batteryLevel
    {
        get;
        set;
    }
    public bool response
    {
        get;
        set;
    }
}
public class logactivity
{
    public string activityCode
    {
        get;
        set;
    }
    public bool isLogActive
    {
        get;
        set;
    }
}

public class getAccessibleApps
{
    public List<application> applications
    {
        get;
        set;
    }
    public List<weblist> websiteurl
    {
        get;
        set;
    }
    public string errorCode
    {
        get;
        set;
    }
    public bool response
    {
        get;
        set;
    }

}
public class getAccessibleWebsites
{
    public List<weblist> websiteurl
    {
        get;
        set;
    }
    public string errorCode
    {
        get;
        set;
    }
    public bool response
    {
        get;
        set;
    }
}
public class application
{
    public string applicationName
    {
        get;
        set;
    }
    public string applicationPackage
    {
        get;
        set;
    }
}
public class weblist
{
    public string WebsiteName
    {
        get;
        set;
    }
}
public class getUserActivityCodes
{
    public List<userCodes> userCodes { get; set; }
    public string errorCode { get; set; }
    public bool response { get; set; }
}
public class userCodes
{
    public string code { get; set; }
    public string name { get; set; }
    public string type { get; set; }

}
public partial class DeviceLocation
{
    public string uuid { get; set; }
    public List<locations> locations { get; set; }
}
public class locations
{
    public DateTime timestamp { get; set; }
    public string latitude { get; set; }
    public string longitude { get; set; }
}
public partial class DeviceLock
{
    //public string lockId { get; set; }
    public Boolean status { get; set; }
    public DateTime lockedOn { get; set; }
    public string uuid { get; set; }
}
public class BrowseHistoryList
{
    public string uuid { get; set; }
    public List<SortedList<string, string>> BrowseHistory { get; set; }
}