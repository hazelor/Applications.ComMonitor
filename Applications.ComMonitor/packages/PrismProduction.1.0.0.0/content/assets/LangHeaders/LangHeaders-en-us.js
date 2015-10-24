var LangHeaders = {
  "1": {
    "caption": "Dealer Visit Norms",
    "colnames": [
      "ID",
      "Role",
      "Dealer Type A",
      "Dealer Type B",
      "Dealer Type C",
      "Dealer Type D"
    ]
  },
  "10": {
    "caption": "Sales Group Master",
    "colnames": [
      "ID",
      "Sales Group Code",
      "Sales Group Name",
      "Depot",
      "Description"
    ],
    "sfilters": [
      "Sales Group Code",
      "Sales Group Name",
      "Depot"
    ]
  },
  "11": {
    "caption": "Dealer Query Complain",
    "colnames": [
      "ID",
      "Dealer Visit Id",
      "Query Date",
      "Complaint Type",
      "Complaint Remarks",
      "Complaint Response",
      "Status"
    ],
    "sfilters": [
      "Complaint  Date",
      "Complaint Type"
    ]
  },
  "111": {
    "caption": "Collection",
    "colnames": [
      "Zone",
      "Region",
      "Depot",
      "DealerId",
      "TotalCollection",
      "Depot Name",
      "Dealer Name",
      "Duration",
      "To Date",
      "Collection Type",
      "EmpCode"
    ],
    "sfilters": [
      "FromDate",
      "ZoneCode",
      "RegionCode",
      "DepotCode",
      "PaymentMode"
    ]
  },
  "112": {
    "caption": "Project Visit",
    "colnames": [
      "Id",
      "Project Name",
      "Present Status",
      "Present Brand InUse",
      "Visit Date",
      "Employee Code",
      "Remarks"
    ]
  },
  "113": {
    "caption": "Influencer Visit",
    "colnames": [
      "InfluencerVisitId",
      "Lead Id",
      "Lead Status",
      "Visit Date",
      "Employee Code",
      "Followup Required",
      "Follow-up Visit Date",
      "Visit Remarks"
    ]
  },
  "114": {
    "caption": "Outstanding Details",
    "colnames": [
      "OutstandingDetails",
      "Dealer Code",
      "Payment Due Date",
      "Collection Amount",
      "Cheque Bounced",
      "Amount Received",
      "Amount Received Date",
      "Sales Type"
    ],
    "sfilters": [
      "Dealer Code",
      "Payment Due Date"
    ]
  },
  "115": {
    "caption": "Visit History",
    "colnames": [
      "Time",
      "PlanVisit_New",
      "PlanVisit_FollowUp",
      "PlanVisitTotal",
      "CompleteVisit_New",
      "CompleteVisit_FollowUp",
      "CompleteVisitTotal",
      "EmpCode"
    ]
  },
  "116": {
    "caption": "CSR Visits",
    "colnames": [
      "IHBSite Visits(New)",
      "IHBSite Visits(FollowUp)",
      "No of Masons Visited",
      "No of Contractors Visited",
      "No of Architects Visited",
      "No of Engineers Visited",
      "No of Owners Visited",
      "Conversion Qty",
      "From Date",
      "To Date",
      "EmpCode"
    ],
    "sfilters": [
      "From Date",
      "EmpCode"
    ]
  },
  "117": {
    "caption": "ActualVisit",
    "colnames": [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ]
  },
  "118": {
    "caption": "ActualVisitDetail",
    "colnames": [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ]
  },
  "12": {
    "caption": "Area Master",
    "colnames": [
      "Area Code",
      "Area Name",
      "Depot",
      "Description"
    ],
    "sfilters": [
      "AreaCode",
      "AreaName",
      "DepotCode"
    ]
  },
  "120": {
    "caption": "Dealer Sales Vs Achievement",
    "colnames": [
      "Quantity",
      "Product",
      "Target Sales",
      "Total Sales",
      "Balance",
      "Month",
      "Year",
      "DealerId",
      "",
      "",
      "",
      "",
      ""
    ],
    "sfilters": [
      "Month",
      "Year",
      "DealerId"
    ]
  },
  "1205": {
    "caption": "Customer Contact Program",
    "colnames": [
      "CCPId",
      "Name of Meet",
      "Meeting Date",
      "Invitees Type",
      "Place",
      "Depot",
      "Program Details"
    ],
    "sfilters": [
      "Name of Meet",
      "Meeting Date",
      "Depot"
    ]
  },
  "121": {
    "caption": "Add CSR User",
    "colnames": [
      "Uid",
      "User Name",
      "Password",
      "Emp Code",
      "Emp Name",
      "User Role",
      "Zone",
      "Region",
      "Depot",
      "Mobile Number",
      "Reporting To",
      "Email ID",
      "Birth Date",
      "City",
      "Address",
      "Pincode",
      "Status"
    ]
  },
  "1211": {
    "caption": "Influencer Visit",
    "colnames": [
      "InfluencerVisitId",
      "Lead Name",
      "Lead Status",
      "Visit Date",
      "Employee Code",
      "Followup Required",
      "Follow-up Visit Date",
      "Visit Remarks"
    ]
  },
  "1213": {
    "caption": "Influencer Lead Master",
    "colnames": [
      "Lead ID",
      "Influencer ID",
      "Lead Name",
      "Lead Address",
      "Lead Contact No",
      "Lead Type",
      "Work Type",
      "Brand Used",
      "Total Cost of Work (in Thousands Rs)",
      "Total Cement Requirement (in MT)",
      "Reason For Prism not in use",
      "Depot Code",
      "Lead Status",
      "Follow-up Required",
      "Followup By",
      "Qty (if Lead Converted)",
      "Reason Not Converted",
      "Lead Remarks",
      "Date",
      "Reset GPS"
    ],
    "sfilters": [
      "Lead ID",
      "Lead Name",
      "Lead Contact No"
    ]
  },
  "1214": {
    "caption": "Stock Comparison",
    "colnames": [
      "Zone",
      "Region",
      "Depot",
      "Duration 1",
      "Duration 2",
      "Duration-1",
      "Duration-2",
      "Material Type",
      "EmpCode"
    ],
    "sfilters": [
      "Duration1",
      "Duration2",
      "MaterialType",
      "ZoneCode",
      "RegionCode",
      "DepotCode"
    ]
  },
  "1215": {
    "caption": "NetworkLog",
    "colnames": [
      "User ID",
      "Screen Name",
      "Server Time (in seconds)",
      "Client Time (in seconds)",
      "Render Time (in seconds)",
      "Response Length (in bytes)",
      "Log Date Time"
    ]
  },
  "1216": {
    "caption": "SP/ CF Rating",
    "colnames": [
      "Id",
      "SP or CF",
      "SP / CF Code",
      "Rating Date",
      " Man Power Deployed Rating",
      "Infrastructure Provided Rating",
      "Market Visit Rating",
      " Servicing Network Rating",
      "Support Rating"
    ]
  },
  "1217": {
    "caption": "Outstanding Comparison",
    "colnames": [
      "Zone Code",
      "Region Code",
      "Depot Code",
      "Dealer Id",
      "Duration1",
      "Duration2",
      "DepotName",
      "DealerName",
      "Duration-1",
      "Duration-2",
      "EmpCode"
    ],
    "sfilters": [
      "Duration-1",
      "Duration-2",
      "ZoneCode",
      "RegionCode",
      "DepotCode",
      "DealerId"
    ]
  },
  "1218": {
    "caption": "Add Dealer",
    "colnames": [
      "Uid",
      "User Name",
      "Password",
      "Dealer Code",
      "Dealer Name",
      "User Role",
      "Zone",
      "Region",
      "Depot",
      "Contact Number",
      "Reporting To",
      "Email ID",
      "Birth Date",
      "City",
      "Address",
      "Pincode",
      "Status"
    ]
  },
  "1219": {
    "caption": "Influencer Visit",
    "colnames": [
      "id",
      "Date",
      "Influencer",
      "Influencer Met?",
      "No of Lead Provided",
      "Remarks",
      "Employee"
    ],
    "sfilters": [
      "Date",
      "Influencer"
    ]
  },
  "122": {
    "caption": "Get Dealer Sales Growth History",
    "colnames": [
      "Period",
      "SALES IN MT (YoY)",
      "SALES IN MT %(YoY)",
      "SALES IN MT (MoM)",
      "SALES IN MT %(MoM)",
      "Material Type",
      "DealerId",
      "Date"
    ],
    "sfilters": [
      "MaterialType",
      "DealerId",
      "Date"
    ]
  },
  "1220": {
    "caption": "Current Location Report",
    "colnames": [
      "VanId",
      "Latitude",
      "Longitude",
      "Date",
      "Emp Code"
    ]
  },
  "1221": {
    "caption": "Dealer/Retailer Visit Details",
    "colnames": [
      "ID",
      "Visit Id",
      "Emp Code",
      "Dealer/Retailer",
      "Date",
      "Complaint Type",
      "Complaint Remarks",
      "Suggestion Remarks"
    ]
  },
  "1222": {
    "caption": "Dealer Feedback",
    "colnames": [
      "Visit Id",
      "Shop Signage Details",
      "Certificate Details",
      "Shop Painting Details",
      "Poster Details",
      "Shop Signage Photo",
      "Certificate Photo",
      "Shop Painting Photo",
      "External Shop Photo",
      "Advertisement Material Details",
      "Req Pen",
      "Req Pad",
      "Req Key Chain",
      "Req T Shirts",
      "Created By",
      "Created Date"
    ],
    "grpnames": [
      "POP Materials Feedback",
      "Give Away material Details",
      "Capture Images"
    ]
  },
  "1223": {
    "caption": "Dealer Counter Sale",
    "colnames": [
      "Dealer Counter Sale Id",
      "Visit Id",
      "Brand",
      "Quantity (Bags)",
      "WS (price/bag)",
      "RS (price/bag)"
    ]
  },
  "1224": {
    "caption": "Competitor Pricing Information",
    "colnames": [
      "I D",
      "Date",
      "Depot",
      "DealerId",
      "Brand",
      "WS (price/bag)",
      "RS (price/bag)",
      "Stocks in MT",
      "Employee"
    ],
    "sfilters": [
      "Depot",
      "Brand"
    ]
  },
  "1225": {
    "caption": "Dealer Query Complain",
    "colnames": [
      "ID",
      "Visit Id",
      "Query Date",
      "Complaint Type",
      "Complaint Remarks",
      "Complaint Response",
      "Status"
    ],
    "sfilters": [
      "Complaint  Date",
      "Complaint Type"
    ]
  },
  "1226": {
    "caption": "ApplicationUsage",
    "colnames": [
      "Zone",
      "Region",
      "Depot",
      "Screen",
      "Date Created",
      "Count",
      "From Date",
      "To Date",
      "Module"
    ],
    "sfilters": [
      "Zone",
      "Region",
      "Depot",
      "From Date",
      "To Date",
      "Screen"
    ]
  },
  "123": {
    "caption": "Get Dealer Order Item",
    "colnames": [
      "DealerId",
      "SalesOrder",
      "PODate",
      "PONumber",
      "Quantity",
      "MaterialType",
      "ShipToParty",
      "From Date",
      "To Date"
    ],
    "sfilters": [
      "StartDate",
      "EndDate",
      "DealerId"
    ]
  },
  "124": {
    "caption": "Get Dealer Sales Summary",
    "colnames": [
      "",
      "",
      "",
      "DealerId",
      "SalesOrderNo",
      "",
      "",
      "PODate",
      "PONumber",
      "",
      "",
      "Quantity",
      "MaterialType",
      "SalesType",
      "ShipToParty",
      "STARTDATE",
      "DealerId"
    ],
    "sfilters": [
      "DealerId",
      "STARTDATE"
    ]
  },
  "125": {
    "caption": "Dealer Account Ledger",
    "colnames": [
      "",
      "",
      "",
      "Id",
      "DocumentNum",
      "",
      "",
      "DealerCode",
      "FiscalYear",
      "",
      "",
      "DocType",
      "DocDate",
      "",
      "",
      "GLIndicator",
      "Qty",
      "",
      "",
      "Amount",
      "DrCrIndicator",
      "Balance",
      "Product",
      "ChequeNo",
      "DC",
      "CollectionType",
      "ChequeBouncedCount",
      "InvoiceNum",
      "GLRefNo",
      "StartDate",
      "EndDate",
      "DealerId"
    ],
    "sfilters": [
      "StartDate",
      "EndDate",
      "DealerCode"
    ]
  },
  "126": {
    "caption": "View Message",
    "colnames": [
      "MessageId",
      "From User Id",
      "Message Type",
      "Message Read",
      "Subject",
      "Message Date",
      "Message Text",
      "TargetAllEmp",
      "TargetDealers",
      "Upload Doc Link"
    ],
    "sfilters": [
      "MessageDate",
      "Subject",
      "FromUserId"
    ]
  },
  "127": {
    "caption": "Get Dealer Sales Summary",
    "colnames": [
      "ShipToParty",
      "Type",
      "CHAMPION",
      "HI-TECH",
      "OPC43",
      "Total Qty",
      "DealerId",
      "From Date",
      "To date"
    ],
    "sfilters": [
      "FromDate",
      "ToDate",
      "DealerId"
    ]
  },
  "128": {
    "caption": "Dealer Sales Target VS Ach",
    "colnames": [
      "Duration",
      "Product",
      "Actual Sales in MT",
      "Target Sales in MT",
      "Balance",
      "DealerId",
      "Year",
      "Month"
    ],
    "sfilters": [
      "Month",
      "Year",
      "DealerId"
    ]
  },
  "129": {
    "caption": "Dealer Account Ledger Details Report",
    "colnames": [
      "Doc Date",
      "Doc Type",
      "Plant",
      "Document Number",
      "Product",
      "Qty",
      "INST No / Narration",
      "INST Date",
      "Debit",
      "Credit",
      "Balance",
      "DealerId",
      "To Date",
      "From Date",
      "Ledger Type"
    ],
    "sfilters": [
      "DealerId",
      "StartDate",
      "EndDate",
      "LedgerType"
    ]
  },
  "13": {
    "caption": "Depot Master",
    "colnames": [
      "Depot Code",
      "Depot Name",
      "Region Name",
      "Description"
    ],
    "sfilters": [
      "Depot Code",
      "Depot Name",
      "Region Code"
    ]
  },
  "131": {
    "caption": "Collection Comparision",
    "colnames": [
      "Zone",
      "Region",
      "Depot",
      "DealerId",
      "DURATION 1",
      "DURATION 2",
      "DepotName",
      "DealerName",
      "Duration 1",
      "Duration 1ToDate",
      "Duration 2",
      "Duration 2 ToDate",
      "Collection Type",
      "EmpCode"
    ],
    "sfilters": [
      "D1FromDate",
      "D2FromDate",
      "ZoneCode",
      "RegionCode",
      "DepotCode",
      "CollectionType"
    ]
  },
  "132": {
    "caption": "Sales Comparision",
    "colnames": [
      "Zone",
      "Region",
      "Depot",
      "DealerId",
      "DURATION 1",
      "DURATION 2",
      "Depot Name",
      "Dealer Name",
      "Duration 1 From Date",
      "Duration 1 ToDate",
      "Duration 2 From Date",
      "Duration 2 To Date",
      "Material Type",
      "EmpCode"
    ],
    "sfilters": [
      "D1FromDate",
      "D2FromDate",
      "ZoneCode",
      "RegionCode",
      "DepotCode",
      "MaterialType"
    ]
  },
  "133": {
    "caption": "Collection Target Vs Achievement",
    "colnames": [
      "Zone",
      "Region",
      "Depot",
      "DealerId",
      "Actual",
      "Target",
      "Depot Name",
      "Dealer Name",
      "Duration",
      "ToDate",
      "Collection Type",
      "EmpCode"
    ],
    "sfilters": [
      "FromDate",
      "ZoneCode",
      "RegionCode",
      "DepotCode",
      "CollectionType"
    ]
  },
  "134": {
    "caption": "Sales Target Vs Achievement",
    "colnames": [
      "Zone",
      "Region",
      "Depot",
      "Dealer ID",
      "Actual",
      "Target",
      "Depot Name",
      "Dealer Name",
      "Duration",
      "ToDate",
      "EmpCode"
    ],
    "sfilters": [
      "FromDate",
      "ZoneCode",
      "RegionCode",
      "DepotCode"
    ]
  },
  "136": {
    "caption": "Get Depot GORB",
    "colnames": [
      "Zone",
      "Region",
      "Depot",
      "Trade Sale (% Achieved)",
      "Non-Trade Sale (% Achieved)",
      "Total Sale (% Achieved)",
      "W1 Sales (% Achieved)",
      "W2 Sales (% Achieved)",
      "W3 Sales (% Achieved)",
      "W4 Sales (% Achieved)",
      "Category A (% Achieved)",
      "Category B (% Achieved)",
      "Category C (% Achieved)",
      "Category D (% Achieved)",
      "Trade",
      "NonTrade",
      "Cheque Bouncing (Nos)",
      "Depot Contribution",
      "Firing Ratio (in %)",
      "Crossing Diversion (in %)",
      "Expenses",
      "Dealer",
      "Year",
      "Month",
      "EmpCode"
    ],
    "sfilters": [
      "Month",
      "Year",
      "ZoneCode",
      "RegionCode",
      "DepotId"
    ]
  },
  "137": {
    "caption": "GORB",
    "colnames": [
      "GORB Type",
      "GORB Parameter",
      "Parameter Description",
      "GORB Code",
      "Green Min",
      "Yellow Min",
      "Red Min",
      "Black Min",
      "GORB Id"
    ],
    "sfilters": [
      "GORBType"
    ]
  },
  "139": {
    "caption": "Target For Dealer",
    "colnames": [
      "DealerId",
      "Month",
      "Year",
      "Product",
      "Sales TargetMT",
      "Collection TargetRS",
      "TargetForDealerId"
    ]
  },
  "142": {
    "caption": "Rake Other Details",
    "colnames": [
      "Id",
      "Rake No",
      "Material Type",
      "Unit1 Qty",
      "Unit2 Qty",
      "Unit1 RR No",
      "Unit2 RR No",
      "RR Date",
      "Excise Gate Pass No",
      "Excise Gate Pass Date",
      "Freight Amount",
      "Road Permit No"
    ]
  },
  "143": {
    "caption": "Rake Quantitive Details",
    "colnames": [
      "Id",
      "Rake No",
      "Unit1 Trade Qty",
      "Unit2 Trade Qty",
      "MRP",
      "Unit1 Non-Trade Qty",
      "Unit2 Non-Trade Qty",
      "Week",
      "Year",
      "Transit Qty"
    ]
  },
  "144": {
    "caption": "Send new Message",
    "colnames": [
      "Message Id",
      "Message Type",
      "Message From ",
      "Message Date",
      "Message To",
      "MessageRead",
      "Message Expired On",
      "Subject",
      "Upload Link",
      "Message Text",
      "Target Dealers",
      "Target All Employee"
    ]
  },
  "145": {
    "caption": "Get Employee GORB",
    "colnames": [
      "ZoneCode",
      "RegionCode",
      "DepotCode",
      "UserType",
      "EmpCode",
      "EmpName",
      "Score",
      "GORB",
      "Month",
      "Year",
      "EmpCode"
    ],
    "sfilters": [
      "Month",
      "Year",
      "ZoneCode",
      "RegionCode",
      "DepotCode"
    ]
  },
  "146": {
    "caption": "Sales MIS Monthwise",
    "colnames": [
      "Month",
      "Year",
      "Target",
      "Actual",
      "Percentage",
      "Target",
      "Actual",
      "Percentage",
      "Target",
      "Actual",
      "Percentage",
      "ZoneCode",
      "RegionCode",
      "DepotCode",
      "DealerId",
      "Duration",
      "Duration To",
      "EmpCode"
    ],
    "sfilters": [
      "FromDate",
      "ZoneCode",
      "RegionCode",
      "DepotCode"
    ]
  },
  "147": {
    "caption": "Godown MIS",
    "colnames": [
      "ZoneCode",
      "RegionCode",
      "DepotCode",
      "Godown Name",
      "Address",
      "Area (Sq.Ft.)",
      "Standard Capacity",
      "Rent",
      "Last Inspection Date",
      "Inspection By",
      "Stock as per Book",
      "Physical Stock",
      "EmpCode"
    ],
    "sfilters": [
      "ZoneCode",
      "RegionCode",
      "DepotCode",
      "GodownName"
    ]
  },
  "148": {
    "caption": "Dealer MIS",
    "colnames": [
      "Zone Code",
      "Region Code",
      "Depot Code",
      "Dealer Code",
      "Dealer Name",
      "Dealer/ Retailer",
      "SD",
      "CR Limit",
      "Potential",
      "EX/MB",
      "Sale Budget",
      "Sale Actual",
      "Sale Variance",
      "Sale Today",
      "Month",
      "Year",
      "EmpCode"
    ],
    "sfilters": [
      "Month",
      "Year",
      "ZoneCode",
      "RegionCode",
      "DepotCode",
      "DealerId"
    ]
  },
  "149": {
    "caption": "Capture Collection Details",
    "colnames": [
      "Id",
      "Group No",
      "House Bank Code",
      "Party Code",
      "Party Name",
      "Transaction Type",
      "DDRTGS Charges",
      "DD / RTGS Type",
      "Cheque Number",
      "UTR Number",
      "Issuer Bank",
      "Value Date",
      "Posting Date",
      "Inst Date",
      "Amount",
      "MR Number"
    ]
  },
  "15": {
    "caption": "Plan Customer Map",
    "colnames": [
      "Id",
      "Plan Key",
      "Customer Id",
      "Sequence",
      "CustomerType"
    ]
  },
  "150": {
    "caption": "Sales MIS Weekwise",
    "colnames": [
      "Month",
      "Year",
      "Budget",
      "Actual",
      "Percentage",
      "Budget",
      "Actual",
      "Percentage",
      "Budget",
      "Actual",
      "Percentage",
      "Budget",
      "Actual",
      "Percentage",
      "ZoneCode",
      "RegionCode",
      "DepotCode",
      "DealerId",
      "Duration",
      "Duration To",
      "EmpCode"
    ],
    "sfilters": [
      "FromDate",
      "ZoneCode",
      "RegionCode",
      "DepotCode"
    ]
  },
  "151": {
    "caption": "Sales MIS Categorywise",
    "colnames": [
      "Month",
      "Year",
      "Budget",
      "Actual",
      "Percentage",
      "Budget",
      "Actual",
      "Percentage",
      "Budget",
      "Actual",
      "Percentage",
      "Budget",
      "Actual",
      "Percentage",
      "Budget",
      "Actual",
      "Percentage",
      "Zone",
      "Region",
      "Depot",
      "Duration",
      "Duration To",
      "EmpCode"
    ],
    "sfilters": [
      "Fromdate",
      "ZoneCode",
      "RegionCode",
      "DepotCode"
    ]
  },
  "152": {
    "caption": "Rake Damage Shortage",
    "colnames": [
      "Id",
      "Rake No",
      "Total Shortage Unit1",
      "Total Shortage Unit2",
      "CT Unit1",
      "CT Unit2",
      "SW Unit1",
      "SW Unit2",
      "Total Damaged Unit1",
      "Total Damaged Unit2",
      "Total Excess Unit1",
      "Total Excess Unit2"
    ]
  },
  "156": {
    "caption": "Survey Questions",
    "colnames": [
      "Survey Id",
      "Question Id",
      "Question Text",
      "Control Type",
      "Response Option",
      "Min Value",
      "Max Value",
      "Optional"
    ]
  },
  "157": {
    "caption": "Survey Title",
    "colnames": [
      "Id",
      "Target Role",
      "Description",
      "Start Date",
      "End Date"
    ]
  },
  "159": {
    "caption": "Survey Response Header",
    "colnames": [
      "Id",
      "Emp Id",
      "Person Type",
      "Person Id",
      "Person Name",
      "Mobile No",
      "Email Id",
      "Depot Id",
      "Response Date"
    ]
  },
  "160": {
    "caption": "Survey Response Detail",
    "colnames": [
      "Id",
      "Header Id",
      "Question Id",
      "Response Value"
    ]
  },
  "161": {
    "caption": "Dealer Query Complain",
    "colnames": [
      "I D",
      "Dealer Visit Id",
      "Query Date",
      "Complaint Type",
      "Complaint Remarks",
      "Complaint Response",
      "Status",
      "Dealer"
    ],
    "sfilters": [
      "Complaint  Date",
      "Complaint Type"
    ]
  },
  "163": {
    "caption": "Plan Vs Actual Visits",
    "colnames": [
      "Zone Code",
      "Region Code",
      "Depot Code",
      "Emp Code",
      "Visit Type",
      "Plan Visits",
      "Actual Visits",
      "%Visit Achieved",
      "From Date",
      "To Date",
      "Emp Code"
    ],
    "sfilters": [
      "FromDate",
      "EmpName"
    ]
  },
  "164": {
    "caption": "Employee Attendance",
    "colnames": [
      "Emp Code",
      "Date",
      "Start Time",
      "End Time",
      "Present",
      "To Date",
      "To Date"
    ],
    "sfilters": [
      "EmpCode",
      "FromDate"
    ]
  },
  "165": {
    "caption": "Daily Data",
    "colnames": [
      "Day",
      "Value",
      "Target",
      "From Date",
      "To Date",
      "Report Type",
      "Zone Code",
      "Region Code",
      "Depot Code",
      "EmpCode"
    ],
    "sfilters": [
      "FromDate",
      "ReportTypeZoneCode",
      "RegionCode",
      "DepotCode"
    ]
  },
  "166": {
    "caption": "Distance Travelled Report",
    "colnames": [
      "Vehicle",
      "Date",
      "Distance Travelled (Kms)",
      "Vehicle Name",
      "FromDate",
      "ToDate",
      "Depot"
    ],
    "sfilters": [
      "Depot",
      "VehicleList",
      "FromDate",
      "ToDate"
    ]
  },
  "167": {
    "caption": "Halt Report",
    "colnames": [
      "Location",
      "From",
      "To",
      "Halt Duration In Mins.",
      "View",
      "GPSLongitude",
      "Vehicle",
      "Date",
      "Depot",
      "Min. Halt Duration(In Mins.)"
    ],
    "sfilters": [
      "Depot",
      "VehicleList",
      "HaltDate",
      "HaltDuration"
    ]
  },
  "168": {
    "caption": "Route Movement Report",
    "colnames": [
      "VanId",
      "Latitude",
      "Longitude",
      "Date"
    ]
  },
  "169": {
    "caption": "Dealers GORB",
    "colnames": [
      "Zone Code",
      "Region Code",
      "Depot Code",
      "Dealer Code",
      "Dealer Name",
      "Sale Percentage",
      "SalePer GORB",
      "NCR",
      "NCR GORB",
      "Cheque Bounced Count",
      "ChBounce GORB",
      "MOM Percentage",
      "MoM GORB",
      "YOY Percentage",
      "YoY GORB",
      "Month",
      "Year"
    ],
    "sfilters": [
      "Month",
      "Year",
      "ZoneCode",
      "RegionCode",
      "DepotCode",
      "DealerId"
    ]
  },
  "170": {
    "caption": "Current Location Report",
    "colnames": [
      "VanId",
      "Latitude",
      "Longitude",
      "Date"
    ]
  },
  "171": {
    "caption": "Dealers GORB",
    "colnames": [
      "Zone Code",
      "Region Code",
      "Depot Code",
      "Dealer Id",
      "Dealer Name",
      "NCR",
      "Sales %",
      "Cheque Bounce",
      "MoM %",
      "YoY %",
      "Month",
      "Year",
      "EmpCode"
    ],
    "sfilters": [
      "Month",
      "Year",
      "ZoneCode",
      "RegionCode",
      "DepotCode"
    ]
  },
  "172": {
    "caption": "Accessible Application",
    "colnames": [
      "ID",
      "Application Name",
      "Application Package",
      "Application Description",
      "User Designation",
      "User Id",
      "Created By",
      "Updated By",
      "Created Date",
      "Updated Date"
    ]
  },
  "173": {
    "caption": "Accessible Website",
    "colnames": [
      "Id",
      "Website Name",
      "Description",
      "User Id",
      "User Designation",
      "Created By",
      "Update By",
      "Created Date",
      "Update Date"
    ]
  },
  "174": {
    "caption": "Activity Code",
    "colnames": [
      "Id",
      "Activity Name",
      "Activity Code",
      "Created By",
      "Updated By",
      "Created Date",
      "Updated Date",
      "Type"
    ]
  },
  "175": {
    "caption": "Activity Log",
    "colnames": [
      "ID",
      "Log Text",
      "Device ID",
      "Employee ID",
      "Log Date Time",
      "Activity Code",
      "Activity Type"
    ]
  },
  "176": {
    "caption": "Browse History",
    "colnames": [
      "ID",
      "Device ID",
      "URL",
      "Browse TimeStamp"
    ]
  },
  "177": {
    "caption": "Configuration Policy",
    "colnames": [
      "ID",
      "Policy Name",
      "Auto Attempt of PSDuration",
      "No of Auto Attempt For PS",
      "Device Tracing Frequency",
      "Low Battery Log Per",
      "Sms Url",
      "Email Params",
      "Sms Params",
      "Configuration ID",
      "Alert Code",
      "Alerts Email IDs",
      "Alerts Contact Nos",
      "Alerts By"
    ]
  },
  "178": {
    "caption": "Device Master",
    "colnames": [
      "ID",
      "Device ID",
      "Model",
      "User Id",
      "User Name",
      "User Type",
      "Contact No",
      "OS Version",
      "IMEI Number",
      "Mac Address",
      "Password",
      "Status",
      "Remote UnInstall",
      "Created By",
      "Updated By",
      "Created Date",
      "Updated Date",
      "Registration ID",
      "Reason Code",
      "Comments",
      "GPS Status",
      "Manufacturer",
      "Device Serial Number",
      "Kernel Version",
      "APILevel",
      "Build Number",
      "Processor Name",
      "Processor Speed",
      "RAM",
      "Internal Storage",
      "Total Free Storage",
      "Free Internal",
      "Free External",
      "Device Rooted",
      "Screen Resolution",
      "Screen Language",
      "Screen Width",
      "Time Zone",
      "Camera Present",
      "GPS Present",
      "Bluetooth Present",
      "NFC Present",
      "Battery Level",
      "Battery Condition"
    ]
  },
  "179": {
    "caption": "Device Tracking Detail",
    "colnames": [
      "Id",
      "Device Id",
      "latitude",
      "longitude",
      "Created Date",
      "Alert Send Date"
    ]
  },
  "18": {
    "caption": "Plan Date",
    "colnames": [
      "Id",
      "Route Plan Id",
      "Plan Date"
    ]
  },
  "180": {
    "caption": "Installed Apps",
    "colnames": [
      "ID",
      "DeviceID",
      "Created By",
      "Updated By",
      "Created Date",
      "Updated Date",
      "Application Name",
      "Application Package",
      "Application Description",
      "Is Installed",
      "Application Version",
      "Application Size"
    ]
  },
  "181": {
    "caption": "Push Notification",
    "colnames": [
      "ID",
      "Device ID",
      "Command",
      "No Of Attempts",
      "Apk Name",
      "Notification Send DateTime"
    ]
  },
  "182": {
    "caption": "Remote Installed App",
    "colnames": [
      "Id",
      "Application Name",
      "Application Package",
      "Upload APK",
      "Created By",
      "Created Date"
    ]
  },
  "183": {
    "caption": "Forbidden Application",
    "colnames": [
      "id",
      "Application Name",
      "Application Package"
    ]
  },
  "184": {
    "caption": "Dealer Stock",
    "colnames": [
      "StockId",
      "Dealer",
      "Product",
      "Date",
      "Stock Received Qty (Bags)"
    ]
  },
  "186": {
    "caption": "GetOrderStatusInformation",
    "colnames": [
      "Sales Order No",
      "DealerId",
      "Order Date",
      "Material",
      "Order Qty",
      "Delivered Qty",
      "Pending Qty",
      "From Date",
      "To Date"
    ],
    "sfilters": [
      "DealerId",
      "FromDate",
      "ToDate"
    ]
  },
  "187": {
    "caption": "Proposal Request Calculated",
    "colnames": [
      "ProposalChildId",
      "Proposal Id",
      "Category",
      "Primary Rate",
      "Secondary Rate",
      "Rate As Per Bag",
      "Rate As Per MT",
      "Service Tax On Frght",
      "Sales CST Tax",
      "Excise MRP",
      "Packing",
      "Handling",
      "Entry Tax",
      "Total Expenses",
      "NCR"
    ]
  },
  "188": {
    "caption": "Stock Information",
    "colnames": [
      "Zone Code",
      "Region Code",
      "Depot Code",
      "Storage Loc",
      "Fresh",
      "Damaged",
      "Depot Name",
      "Material Type",
      "Date",
      "EmpCode"
    ],
    "sfilters": [
      "Date",
      "ZoneCode",
      "RegionCode",
      "DepotCode",
      "MaterialType"
    ]
  },
  "189": {
    "caption": "Retail Vs Wholesale Price",
    "colnames": [
      "Zone",
      "Region",
      "Depot",
      "Dealer Id",
      "Retail Price",
      "Wholesale Price",
      "Depot Name",
      "Dealer Name",
      "Duration",
      "",
      "EmpCode"
    ],
    "sfilters": [
      "FromDate",
      "ZoneCode",
      "RegionCode",
      "DepotCode",
      "DealerId"
    ]
  },
  "190": {
    "caption": "SPC_FGORB",
    "colnames": [
      "Zone Code",
      "Region Code",
      "Depot Code",
      "Actual Sales Percentage",
      "Actual Collection Percentage",
      "YoY Percentage",
      "Over Due Outstanding",
      "Network Addition",
      "Duration",
      "To Date",
      "EmpCode"
    ],
    "sfilters": [
      "FromDate",
      "ZoneCode",
      "RegionCode",
      "DepotCode"
    ]
  },
  "191": {
    "caption": "KRA For TTE / TTM",
    "colnames": [
      "Month",
      "Year",
      "Employee Name",
      "Category",
      "KRA Description",
      "Target",
      "Actual",
      "Weightage",
      "Score",
      "Emp Code"
    ],
    "sfilters": [
      "Month",
      "Year",
      "Emp Code"
    ]
  },
  "192": {
    "caption": "KRAScoreForTSE",
    "colnames": [
      "Employee Code",
      "Month",
      "Year",
      "KRA Item",
      "Score",
      "Target",
      "Actual",
      "ID"
    ],
    "sfilters": [
      "EmpId",
      "Month",
      "Year",
      "KRACode"
    ]
  },
  "193": {
    "caption": "Proposal Application Approval",
    "colnames": [
      "Approval Id",
      "Sequence",
      "Proposal Application Id",
      "Approval Remarks",
      "Approval Status",
      "Approval Date",
      "Approved By Emp"
    ]
  },
  "194": {
    "caption": "GetLogisticGORB",
    "colnames": [
      "Zone",
      "Region",
      "Depot",
      "Champion Road",
      "CRoadGORB",
      "OPC43 Road",
      "ORoadGORB",
      "Hitech Road",
      "HRoadGORB",
      "Road Variance",
      "RoadDelayGORB",
      "Champion Rail",
      "CRailGORB",
      "OPC43 Rail",
      "ORaillGORB",
      "Hitech Rail",
      "HRailGORB",
      "Rail Variance",
      "RailDelayGORB",
      "Duration",
      "To Date",
      "TR / NT",
      "EmpCode"
    ],
    "sfilters": [
      "FromDate",
      "ZoneCode",
      "RegionCode",
      "DepotCode",
      "TRorNT"
    ]
  },
  "195": {
    "caption": "Month To Date Data",
    "colnames": [
      "DAY",
      "Actual",
      "Target",
      "Duration",
      "ToDate",
      "Zone",
      "Region",
      "Depot",
      "Dealer",
      "Type",
      "EmpCode"
    ],
    "sfilters": [
      "FromDate",
      "ZoneCode",
      "RegionCode",
      "DepotCode",
      "DealerId",
      "Type"
    ]
  },
  "196": {
    "caption": "Outstanding Details",
    "colnames": [
      "Date",
      "Dealer Id",
      "Outstanding",
      "Slot 1 Day 0-1",
      "Slot 2 Day 1-2",
      "Slot 3 Day 2-3",
      "Slot 4 Day 3-4",
      "Slot 5 Day 4-5",
      "Slot 6 Day 5-6",
      "Slot 7 Day 6-7",
      "Slot 8 Day 7-8",
      "Slot 9 Day > 8",
      "Security Deposit",
      "Credit Limit",
      "MAX OS Days",
      "As On Date",
      "Zone",
      "Region",
      "Depot",
      "Dealer"
    ],
    "sfilters": [
      "AsOnDate",
      "ZoneCode",
      "RegionCode",
      "DepotCode",
      "DealerId"
    ]
  },
  "197": {
    "caption": "GetDealerSecondarySale",
    "colnames": [
      "Date",
      "Dealer",
      "Sold To",
      "Brand",
      "Quantity",
      "Retail Price",
      "MiddleMan",
      "Bill No",
      "Duration",
      "To date"
    ],
    "sfilters": [
      "Fromdate",
      "Brand",
      "Dealer"
    ]
  },
  "198": {
    "caption": "GetTravelDistance",
    "colnames": [
      "ID",
      "Date",
      "Visit Type",
      "Visited Name",
      "Start Time",
      "End Time",
      "Distance (In KM)",
      "From Date",
      "To Date",
      "Emp Code"
    ],
    "sfilters": [
      "FromDate",
      "ToDate",
      "EmpCode"
    ]
  },
  "199": {
    "caption": "StockRegister",
    "colnames": [
      "Product",
      "Entry Date",
      "IN QTY",
      "OUT QTY",
      "BAL QTY",
      "From Date",
      "To Date"
    ],
    "sfilters": [
      "FromDate",
      "Product"
    ]
  },
  "2": {
    "caption": "Dealer Feedback",
    "colnames": [
      "Visit Id",
      "Shop Signage Details",
      "Certificate Details",
      "Shop Painting Details",
      "Poster Details",
      "Shop Signage Photo",
      "Certificate Photo",
      "Shop Painting Photo",
      "External Shop Photo",
      "Advertisement Material Details",
      "Req Pen",
      "Req Pad",
      "Req Key Chain",
      "Req T Shirts",
      "Created By",
      "Created Date"
    ],
    "grpnames": [
      "POP Materials Feedback",
      "Give Away material Details",
      "Capture Images"
    ]
  },
  "20": {
    "caption": "District Master",
    "colnames": [
      "District Id",
      "District Name",
      "Depot"
    ],
    "sfilters": [
      "District Id",
      "District Name"
    ]
  },
  "200": {
    "caption": "Credit Limit Approval For Pending Orders",
    "colnames": [
      "Sales Order No",
      "Order Date",
      "Credit Limit",
      "",
      "",
      "Dealer",
      "Approved By Emp",
      "",
      "",
      "Approval Reason",
      "",
      "Quantity",
      "",
      "Order Value",
      "",
      "",
      "Approved Date",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "Total Outstanding",
      "Approval Remarks",
      "Approve By EmpCode"
    ]
  },
  "201": {
    "caption": "IHB Site",
    "colnames": [
      "IHB Site",
      "Source",
      "IHB Contact No 2",
      "Engineer Name",
      "Area / Locality",
      "Construction Area (Sq. Ft)",
      "Engineer Contact No",
      "Date Identified",
      "Buying Decision",
      "Contractor Name",
      "Emp Code",
      "Construction Stage",
      "Contractor Contact No",
      "IHB Site Name",
      "Cement Req (Bags)",
      "Next Slab Casting On",
      "IHB Site Address",
      "Architect Name",
      "Brand Under Use",
      "IHB Site City",
      "Mason Name",
      "Price (per bag)",
      "IHB Site Pincode",
      "Mason Contact No",
      "Dealer Retailer Name",
      "IHB Contact No 1",
      "Architect Contact No",
      "IHB Site Status",
      "GPS Latitude",
      "GPS Longtitide",
      "Site Photo",
      "Consumer Name",
      "No of Floors",
      "Brand Loyalty Type"
    ],
    "grpnames": [
      "IHB Site Details",
      "Contact Details"
    ],
    "sfilters": [
      "Date Identified",
      "IHB Site Name",
      "Consumer Name",
      "IHB Site Status"
    ]
  },
  "202": {
    "caption": "IHB Site Visit",
    "colnames": [
      "Visit Id",
      "IHB Site",
      "Area",
      "Visited By",
      "EmpName",
      "Visit Date",
      "Person Met",
      "Visit Number",
      "Slab Casting On",
      "IHB Site Status",
      "Construction Stage",
      "Follow Up Visit Date",
      "Follow Up With",
      "Conversion Influencer",
      "Conversion Prism Dealer",
      "Conversion Purchase Qty (Bags)",
      "Is Conversion Qty Verified",
      "Verified Conversion Qty (Bags)",
      "Reason Site Not Converted",
      "Visit Remarks",
      "Is Prism Used In Slab Casting",
      "Reason Not Used",
      "Cement Used (Bags)",
      "Slab Casting Area (Sq. ft.)",
      "Cover blocks provided (Num)",
      "Mix Ratio",
      "MCV Service Provided ",
      "MCV Services",
      "Slump Test Reading",
      "Compressive Strength",
      "Open Mould Date",
      "Cube Crushing Date",
      "RO Construction Stage",
      "RO Prism Dealer",
      "Purchase Qty (Bags)",
      "RO Purchase Date",
      "Is RO Qty Verified",
      "Verified Qty (Bags)",
      "GPS Longtitide",
      "GPS Latitude",
      "Site Photograph",
      "Site Photograph Description",
      "Conversion Material",
      "RO Material",
      "Visit Type"
    ],
    "grpnames": [
      "Primary Details",
      "Construction Stage",
      "Repeat Order"
    ],
    "sfilters": [
      "EmpId",
      "IHBSiteId",
      "AreaId",
      "PersonMet",
      "IHBSiteStatus"
    ]
  },
  "203": {
    "caption": "Godown Visit",
    "colnames": [
      "Visit Id",
      "Emp Code",
      "Godown",
      "Visit Date",
      " SAP Day OP. Stk",
      "Actually Physical Stock",
      "Min Stacking",
      "Max Stacking",
      "Oldest Stk Week #",
      "Fresh Stk Week #",
      "Damage Stk Week #",
      "Godown Photo",
      "Is enough parking place available?",
      "Is enough movement place available?",
      "Loading   Rates / MT",
      "Unloading Rates /MT ",
      "Local Frieght MT",
      "MRP Found On Bag",
      "Specific Observation",
      "Is FIFO Followed",
      "Is Stock Piled On Plank",
      "Has Godown Banker Board",
      "Has Godown Stock Board",
      "Has Godown Guidline Board",
      "Is Damage Stock Seperated from Fresh",
      "Is Stock Piled Away from Side Wall",
      "Is Stock Piled More Than 4 Bags",
      "Is Any Leakages",
      "Leakage Details",
      "Is Tarpauline Laid On Floor",
      "Stock Registered Maintained",
      "Stock Registered Last Updated",
      "Is Damage Stock Generated",
      "Damage Stock info provided at clearing of siding",
      "Truck for order execution available",
      "Vehicle Required",
      "Manpower Required",
      "Score",
      "Id"
    ],
    "grpnames": [
      "Primary Details",
      "Audit Details"
    ]
  },
  "204": {
    "caption": "Project Visit",
    "colnames": [
      "Id",
      "Project",
      "Present Status",
      "Present Brand",
      "Visit Date",
      "Visited By",
      "Remarks"
    ]
  },
  "205": {
    "caption": "Influencer Visit",
    "colnames": [
      "InfluencerVisitId",
      "Lead",
      "Lead Status",
      "Visit Date",
      "Visited By",
      "Followup Required",
      "Follow-up Visit Date",
      "Visit Remarks"
    ]
  },
  "21": {
    "caption": "Route Plan",
    "colnames": [
      "Id",
      "C S R Code",
      "Plan Year",
      "Plan Month",
      "Plan Fort Night",
      "Approved Date",
      "Approved By",
      "Plan Status",
      "Planner Comment",
      "Approver Comment",
      "Created By",
      "Create Date",
      "Modified By",
      "Modify Date"
    ]
  },
  "22": {
    "caption": "Region Master",
    "colnames": [
      "Region Code",
      "Region Short Name",
      "Region Name",
      "Zone Name",
      "Description"
    ],
    "sfilters": [
      "Region Code",
      "Region Short Name",
      "Region Name"
    ]
  },
  "23": {
    "caption": "Competitor Pricing Information",
    "colnames": [
      "I D",
      "Date",
      "Depot",
      "Dealer",
      "Brand",
      "WS (price/bag)",
      "RS (price/bag)",
      "Stocks in MT",
      "Employee"
    ],
    "sfilters": [
      "Depot",
      "Brand"
    ]
  },
  "25": {
    "caption": "AppQry",
    "colnames": [
      "Qid",
      "Par Id",
      "Tname",
      "Insert Action",
      "Title",
      "",
      "View",
      "",
      "",
      "Data On Footer",
      "Total",
      "",
      "",
      "Form Type",
      "Form Groups",
      "Form Attributes",
      "Grid Attributes",
      "Child Layout",
      "Query Type",
      "Calander View",
      "Form",
      "Chart View",
      "Dml Op",
      "Search Attributes",
      "Parent Filter",
      "Login Filter",
      "Q Description",
      "Inline Editing",
      "Query Filter",
      "Sibling Qids",
      "Proc Params",
      "Is Screen"
    ]
  },
  "27": {
    "caption": "AppFlds",
    "colnames": [
      "Id",
      "Qid",
      "Field Name",
      "Data Type",
      "",
      "Length",
      "Prec",
      "Scale",
      "Nullable",
      "Align",
      "Hidden",
      "Editable",
      "Edit Type",
      "Edit Option",
      "Edit Rules",
      "Form Options",
      "Type",
      "Tpl",
      "",
      "Pseudo Type",
      "Width",
      "Sortable",
      "Resizable",
      "Def Value",
      "Formatter",
      "Field Label",
      "Calculate",
      "Field Alias",
      "S E Q U E N C E _ N A M E",
      "Tool Tip Text"
    ]
  },
  "28": {
    "caption": "CSR - Area Mapping",
    "colnames": [
      "Employee Code",
      "Zone",
      "Region",
      "Depot",
      "Area Code",
      "CSR Area Mapping Id"
    ]
  },
  "29": {
    "caption": "Godown Master",
    "colnames": [
      "Godown Id",
      "Godown Name",
      "Address",
      "Locality",
      "City",
      "Pincode",
      "Linked Depot Code",
      "Owner Name",
      "Owner Contact No",
      "Godown Area (sq. ft.)",
      "Standard Capacity (in MT)",
      "Entry/Exit doors (Number)",
      "Godown Height (in feets)",
      "Shutter Height (in feets)",
      "Rent (per month)",
      "Lease Duration (in Months)",
      "Agreement Date",
      "Sales Tax No",
      "Description",
      "Floor Type",
      "Floor height (in feets)",
      "Loading / Unloading Points (Num)",
      "Reset GPS"
    ],
    "grpnames": [
      "Primary Details",
      "Infrastructural Details"
    ],
    "sfilters": [
      "Godown Name",
      "City",
      "Pincode"
    ]
  },
  "31": {
    "caption": "Customer Contact Program",
    "colnames": [
      "CCPId",
      "Name of Meet",
      "Meeting Date",
      "Invitees Type",
      "Place",
      "Depot",
      "Program Details"
    ],
    "sfilters": [
      "Name of Meet",
      "Meeting Date",
      "Depot"
    ]
  },
  "32": {
    "caption": "Godown Stock Reconciliation",
    "colnames": [
      "Reconciliation Id",
      "Prism Brand",
      "Fresh Stock",
      "Damage Stock",
      "VisitId",
      "Godown"
    ]
  },
  "34": {
    "caption": "Delayed Dispatch Details",
    "colnames": [
      "Delayed Dispatch Details Id",
      "Doc No",
      "Doc Date Time",
      "Dispatch Date Time",
      "Order Execution Time (in Minutes)",
      "Delayed Dispatch Reason",
      "Reason Remarks"
    ]
  },
  "35": {
    "caption": "Godown Visit",
    "colnames": [
      "Visit Id",
      "Emp Code",
      "Godown",
      "Visit Date",
      "SAP Day OP. Stk",
      "Actually Physical Stock",
      "Min Stacking",
      "Max Stacking",
      "Oldest Stk Week #",
      "Fresh Stk Week #",
      "Damage Stk Week #",
      "Godown Photo",
      "Is enough parking place available?",
      "Is enough Space for Movemoment ?",
      "Loading   Rates / MT\r\n  \r\n \r\n",
      "Unloading Rates /MT \r\n",
      "Local Frieght MT\r\n",
      "MRP Found On Bag",
      "Specific Observation",
      "Is FIFO Followed ?",
      "Is Stock Piled On Plank ?",
      "Does Godown have Banker Board ?",
      "Does Godown have Stock Board ?",
      "Does Godown have Guidline Board ?",
      "Is Damage & Fresh Stock Seperated?",
      "Is Stock Piled Away from Side Wall ?",
      "Is Stock Piled More Than 4 Bags ?",
      "Is Any Leakages ?",
      "Leakage Details",
      "Is Tarpauline Laid On Floor ?",
      "Stock Registered Maintained",
      "Stock Registered Last Updated",
      "Is Damage Stock Generated ?",
      "Dmg Stk Info (clearing/siding site)",
      "Truck for order execution available",
      "Vehicle Required",
      "Manpower Required",
      "Score",
      "Id"
    ],
    "grpnames": [
      "Primary Details",
      "Audit Details"
    ]
  },
  "36": {
    "caption": "IHB Site",
    "colnames": [
      "IHB Site",
      "Source",
      "IHB Contact No 2",
      "Engineer Name",
      "Area / Locality",
      "Construction Area (Sq. Ft)",
      "Engineer Contact No",
      "Date Identified",
      "Buying Decision",
      "Contractor Name",
      "Emp Code",
      "IHB Site Name",
      "Contractor Contact No",
      "IHB Site City",
      "Cement Req (Bags)",
      "Next Slab Casting On",
      "IHB Site Address",
      "Architect Name",
      "Brand Under Use",
      "IHB Contact No 1",
      "Mason Name",
      "Price (per bag)",
      "IHB Site Pincode",
      "Mason Contact No",
      "Dealer Retailer Name",
      "IHB Site Status",
      "Architect Contact No",
      "Construction Stage",
      "GPS Latitude",
      "GPS Longitude",
      "Site Photo",
      "Consumer Name",
      "No of Floors",
      "Brand Loyalty Type",
      "Reset GPS"
    ],
    "grpnames": [
      "IHB Site Details",
      "Contact Details"
    ],
    "sfilters": [
      "Date Identified",
      "IHB Site Name",
      "Consumer Name",
      "IHB Site Status"
    ]
  },
  "37": {
    "caption": "Sent Message",
    "colnames": [
      "Broadcast Message Id",
      "Message To",
      "Message Type",
      "Messsage Read",
      "Subject",
      "Message Date",
      "Message Text",
      "Target All Employee",
      "Target Dealers",
      "Upload Doc Link",
      "Message Expired On",
      "Message From"
    ],
    "sfilters": [
      "MessageDate",
      "Subject",
      "ToUserId"
    ]
  },
  "38": {
    "caption": "Market Intelligence",
    "colnames": [
      "M I Id",
      "Emp Code",
      "Date Recorded",
      "Company",
      "Intelligence Type",
      "Intelligence Remarks",
      "Forwarding Remarks"
    ],
    "sfilters": [
      "Emp Code",
      "Date Recorded",
      "Company",
      "Intelligence Type"
    ]
  },
  "39": {
    "caption": "Project Master",
    "colnames": [
      "ProjectId",
      "Lead Source",
      "Region",
      "Depot",
      "Identified Date",
      "Name",
      "Project",
      "Project Type",
      "Sector",
      "Client Name & Contact",
      "Consultant Name & Contact",
      "Contractor Name & Contact",
      "Project Cost (in Lakhs)",
      "Project Duration (in months)",
      "Approving Authority (Decision Maker)",
      "Total Cement Req (in MT)",
      "Project Status",
      "Currently Used Brand",
      "Remarks",
      "Employee Code",
      "Reset GPS"
    ],
    "sfilters": [
      "Lead Source",
      "Depot",
      "Visit Date",
      "Name",
      "Project"
    ]
  },
  "4": {
    "caption": "AppHmenu",
    "colnames": [
      "Menu Id",
      "Parent Id",
      "Menu Name",
      "Operation Id",
      "Shortcut",
      "Img",
      "Menu Sequence",
      "Operation Type",
      "Toolbar Icon"
    ]
  },
  "40": {
    "caption": "Non Trade Sale Approval Request",
    "colnames": [
      "ProposalId",
      "Party Name",
      "Destination",
      "Party Code",
      "Qty in  (MT)\r\n",
      "Grade",
      "Payment Terms",
      "Price Validity",
      "Delivery Validity",
      "Non-Trade Rate (Rs. /MT)\r\n",
      "Rate (Rs /Bag)\r\n",
      "Non-Trade NCR (Rs / MT)",
      "Transportation Mode",
      "Delivery Condition",
      "Trade Price as on Date (Rs/MT)\r\n",
      "Trade NCR as on Date\r\n",
      "TPC Agent\r\n",
      "TPC Rate (Rs. /MT)\r\n",
      "Supply Against (Sales Tax Forms)\r\n",
      "Supply Against (Sales Exemption Certificate)\r\n",
      "Outstanding (Rs. in lacs)\r\n",
      "Supply from (Depot Name)\r\n",
      "Primary Freight Rate",
      "Freight Mode",
      "Secondary Freight Rate (Rs. /MT)\r\n",
      "Packing & Labeling requirement\r\n",
      "Statutory Requirement",
      "Pre-Dispatch inspection in Plant\r\n",
      "Requirement Specified by Customer\r\n",
      "Packing Charges",
      "Handling Charges",
      "Category",
      "VAT %",
      "CST Tax%",
      "Service Tax %",
      "MRP",
      "Service Tax Handling",
      "Discount/RD",
      "U/L",
      "Depot",
      "Custom Payment",
      "Requesting EmpCode",
      "SP Commision"
    ],
    "grpnames": [
      "Party Details",
      "Product Price Details",
      "Supply Details"
    ],
    "sfilters": [
      "Party Code",
      "Party Name",
      "Category",
      "Depot"
    ]
  },
  "41": {
    "caption": "Prospective Dealer",
    "colnames": [
      "P _ Dealer I D",
      "Firm Name",
      "Owner Name",
      "Address",
      "Locality",
      "Contact No",
      " Dealer Type",
      "Cement Brands (deals in)",
      "Business Type (Deals In)",
      "Firm Type",
      " Counter Potential (in MT)",
      "Remarks",
      " Nearest Prism Dealer",
      "Depot"
    ],
    "sfilters": [
      "Firm Name",
      "Owner Name",
      "Contact No"
    ]
  },
  "42": {
    "caption": "Zone Master",
    "colnames": [
      "Zone Code",
      "Zone Name",
      "Description"
    ]
  },
  "44": {
    "caption": "Dealer Outstanding",
    "colnames": [
      "I D",
      "Duration Type",
      "Dealer Code",
      "Duration From",
      "Duration To",
      "Dealer Name",
      "Total Outstanding",
      "Outstanding Since",
      "Aging Days"
    ]
  },
  "48": {
    "caption": "UserRoleLink",
    "colnames": [
      "Uid",
      "Role Id",
      "I D"
    ]
  },
  "49": {
    "caption": "Van Master",
    "colnames": [
      "I D",
      "Vehicle No",
      "Vehicle Name",
      "Driver Name",
      "Driver License No",
      "License Expiry Date",
      "Driver Contact No",
      "IMEI",
      "SIM Card",
      "Insurance Policy Number",
      "Insurance From",
      "Insurance To",
      "Owner Name",
      "Owner Mobile No",
      "Agreement From",
      "Agreement To",
      "Vehicle Status",
      "Zone",
      "Region",
      "Depot",
      "Drivers Photograph",
      "Depot Name",
      "Created By",
      "Created Date"
    ],
    "sfilters": [
      "Vehicle No",
      "Vehicle Name",
      "Driver Name",
      "Driver License No",
      "Driver Contact No"
    ]
  },
  "5": {
    "caption": "Dealer Counter Sale",
    "colnames": [
      "Dealer Counter Sale Id",
      "Dealer Visit Id",
      "Brand",
      "Quantity (Bags)",
      "WS (price/bag)",
      "RS (price/bag)"
    ]
  },
  "50": {
    "caption": "Add Users",
    "colnames": [
      "Uid",
      "User Name",
      "Password",
      "Emp Code",
      "Emp Name",
      "User Role",
      "Zone",
      "Region",
      "Depot",
      "Designation Code",
      "Department Code",
      "Mobile",
      "Email Id",
      "Birth Date",
      "Anniversary Date",
      "Joining Date",
      "Reporting To",
      "Status",
      "Status Updated Date",
      "No Of Attemps",
      "Last Modified On",
      "Password 1",
      "Password 2",
      "Password 3",
      "Is Account Locked",
      "Reset Password"
    ]
  },
  "51": {
    "caption": "Message Group Info",
    "colnames": [
      "Message Group Id",
      "Message Group Name",
      "Message Group Desc",
      "Zone",
      "Region",
      "Depot",
      "Role Type",
      "Employee Code",
      "Created Date",
      "Created By",
      "Is Active"
    ]
  },
  "52": {
    "caption": "Bank Master",
    "colnames": [
      "Bank Code",
      "Account Id",
      "Bank Name"
    ],
    "sfilters": [
      "Bank Name"
    ]
  },
  "55": {
    "caption": "Department Master",
    "colnames": [
      "Department Code",
      "Department Name"
    ],
    "sfilters": [
      "Department Name"
    ]
  },
  "56": {
    "caption": "Designation Master",
    "colnames": [
      "Designation Code",
      "Designation Name"
    ],
    "sfilters": [
      "Designation Name"
    ]
  },
  "58": {
    "caption": "POP Give Away Stock",
    "colnames": [
      "P O P Id",
      "Depot Code",
      "Item Code",
      "Item Description",
      "Stock Quantity"
    ],
    "sfilters": [
      "Depot Code",
      "Item Code"
    ]
  },
  "59": {
    "caption": "Vendor Master",
    "colnames": [
      "Vendor Code",
      "Vendor Type",
      "Name",
      "Address",
      "Sales Group Code",
      "Mobile No",
      "Email Id",
      "Birth Day"
    ],
    "sfilters": [
      "Vendor Code",
      "Vendor Type",
      "Name",
      "Mobile No"
    ]
  },
  "60": {
    "caption": "Roles",
    "colnames": [
      "Role Id",
      "Role Name",
      "Custom Operation",
      "Operation Id"
    ]
  },
  "61": {
    "caption": "Drop Downs",
    "colnames": [
      "Id",
      "Group Name",
      "Name",
      "Value"
    ]
  },
  "62": {
    "caption": "Depot Expenses",
    "colnames": [
      "Depot Expense Id",
      "Depot Code",
      "Category",
      "MTD Expense",
      "Date"
    ],
    "sfilters": [
      "DepotCode",
      "MTDExpense"
    ]
  },
  "63": {
    "caption": "Dispatch Details",
    "colnames": [
      "Dispatch No",
      "Order No",
      "Order Date",
      "Dispatch From Plant",
      "Customer Code",
      "Transpotation Zone",
      "Week",
      "Year",
      "Excise Gate Pass Num",
      "Excise Gate Pass Date",
      "Road Permit No",
      "Store Location",
      "Rake Vehicle No",
      "Quantity",
      "Execution Date",
      "Mode",
      "RRGR No",
      "RRGR Date",
      "Material Receipt Date",
      "Wagon Detail",
      "Rail Freight",
      "Material Name",
      "DC Type",
      "Transporter",
      "Consignee Code",
      "Value",
      "Basic Rate",
      "MRP"
    ],
    "sfilters": [
      "DispatchFromPlant",
      "MaterialName"
    ]
  },
  "64": {
    "caption": "IHB Site Visit",
    "colnames": [
      "Visit Id",
      "IHB Site",
      "Area",
      "Date",
      "Emp Code",
      "Visit Type",
      "Person Met",
      "Visit Number",
      "Slab Casting On",
      "IHB Site Status",
      "Construction Stage",
      "Follow Up Visit Date",
      "Follow Up With",
      "Conversion Influencer",
      "Conversion Prism Dealer",
      "Conversion Purchase Qty (Bags)",
      "Is Conversion Qty Verified",
      "Verified Conversion Qty (Bags)",
      "Reason Site Not Converted",
      "Visit Remarks",
      "Is Prism Used In Slab Casting",
      "Reason Not Used",
      "Cement Used (Bags)",
      "Slab Casting Area (Sq. ft.)",
      "Cover blocks provided (Num)",
      "Mix Ratio",
      "MCV Service Provided ",
      "MCV Services",
      "Slump Test Reading",
      "Compressive Strength",
      "Open Mould Date",
      "Cube Crushing Date",
      "RO Construction Stage",
      "RO Prism Dealer",
      "Purchase Qty (Bags)",
      "RO Purchase Date",
      "Is RO Qty Verified",
      "Verified Qty (Bags)",
      "GPS Longtitide",
      "GPS Latitude",
      "Site Photograph",
      "Site Photograph Description",
      "Conversion Material",
      "RO Material",
      "EmpName"
    ],
    "grpnames": [
      "Primary Details",
      "Construction Stage",
      "Repeat Order"
    ]
  },
  "65": {
    "caption": "Influencer Lead Master",
    "colnames": [
      "Lead ID",
      "Influencer",
      "Lead Name",
      "Lead Address",
      "Lead Contact No",
      "Lead Type",
      "Work Type",
      "Brand Used\r\n",
      "Total Cost of Work (in Thousands Rs)\r\n",
      "Total Cement Requirement (in MT)\r\n",
      "Reason For Prism not in use",
      "Depot Code",
      "Lead Status",
      "Follow-up Required\r\n",
      "Followup By",
      "Qty (if Lead Converted)\r\n",
      "Reason Not Converted",
      "Lead Remarks",
      "Date",
      "Reset GPS"
    ],
    "sfilters": [
      "Lead ID",
      "Lead Name",
      "Lead Contact No"
    ]
  },
  "66": {
    "caption": "Influencer Master",
    "colnames": [
      "Influencer Id",
      "Region",
      "Depot",
      "Tehsil",
      "Date Identified",
      "Influencer Type",
      "Name",
      "Address",
      "Locality",
      "City",
      "District",
      "Contact 1",
      "Contact 2",
      "Employee Code",
      "Birth Date",
      "Anniversary Date",
      "Reset GPS"
    ],
    "sfilters": [
      "Depot",
      "Date Visited",
      "Influencer Type",
      "Name",
      "City",
      "Contact 1"
    ]
  },
  "68": {
    "caption": "Product Information Catalogue",
    "colnames": [
      "I D",
      "Product Id",
      "Product Name",
      "Product Description",
      "Product Brochure",
      "Product Launch Date",
      "Created By",
      "Created Date"
    ]
  },
  "7": {
    "caption": "Dealer Secondary Sale",
    "colnames": [
      "Dealer Secondary Salei D",
      "Sold Date",
      "Dealer",
      "Sold To",
      "Brand",
      "Quantity (Bags)",
      "Retail Price",
      "Middle Man",
      "Bill No"
    ]
  },
  "70": {
    "caption": "Dealer/Retailer Information",
    "colnames": [
      "Dealer Code",
      "Dealer Name",
      "Dealer Category",
      "Price List",
      "Depot",
      "Loyalty Type",
      "Delivering Plant",
      "Dealer Address",
      "Godown Capacity (in MT)",
      "Has Dealer Company Board",
      "Dealer Locality",
      "No of Service Vehicles",
      "Board Dimension",
      "Dealer City",
      "Manpower",
      "Board Installation Date",
      "Dealer Pincode",
      "Security Deposit",
      "Has Dealer Company Certificate",
      "Dealer Contact No",
      "Credit Limit",
      "Has Dealer Shop Painting",
      "Birth Date",
      "Dealer Potential",
      "Shop Painting Date",
      "Anniversary Date",
      "Transportation Zone",
      "Shop Painting Area(Sq. Ft)",
      "Business Type",
      "Dealer POP Material Info",
      "Dealer Contact No2",
      "Registration Date",
      "Sales Group Code",
      "INCO Term1",
      "INCO Term2",
      "Division",
      "Distribution Channel",
      "Sales Organisation",
      "Region Code",
      "Reset GPS"
    ],
    "grpnames": [
      "Dealer Primary Details",
      "Infrastructure Details",
      "POP Materials Details"
    ],
    "sfilters": [
      "Depot",
      "DealerId"
    ]
  },
  "72": {
    "caption": "Order Status Information",
    "colnames": [
      "I D",
      "DealerId",
      "Dealer Name",
      "Order Date",
      "Amount",
      "Sales Document Number"
    ],
    "sfilters": [
      "Sales Document Number"
    ]
  },
  "74": {
    "caption": "Dealer Visit",
    "colnames": [
      "ID",
      "Visit Id",
      "Emp Code",
      "Dealer",
      "Date",
      "Complaint Type",
      "Complaint Remarks",
      "Suggestion Remarks"
    ]
  },
  "79": {
    "caption": "Rake Arrival / Disposal Visit",
    "colnames": [
      "RakeNo",
      "Region",
      "Depot",
      "Dispatch From",
      "Dispatch Date",
      "Rake Type",
      "No of Wagons",
      "Placement Date",
      "Placement Date Time",
      "U/L Date",
      "U/L Date Time",
      "U/L Time",
      "Transit Wagon No",
      "Transit Wagon Details",
      "Firing Ratio (in %)",
      "Whether material covered with tarpaulin or not",
      "Tampering with wagons",
      "Weather condition on placement date",
      "Whether siding covered with tin shed or not",
      "Stock Condition",
      "Reason for Set Wet material",
      "Reasons for Cut & Torn material",
      "Total time taken for U/L the material at wharf",
      "Demurrage Imposed By Railways With rate and reason",
      "Total time taken for shifting the material from wharf",
      "Wharf Age Imposed By Railways with rate and reason",
      "CRWC charges Imposed By Railways with Reason",
      " Transit Days",
      "Surveyor Firm Details",
      "Damage Date",
      "Surveyor Visit Date",
      "Inserted by"
    ],
    "grpnames": [
      "Rake Details",
      "Other Details",
      "Quantitative Details",
      "Disposal Details"
    ]
  },
  "8": {
    "caption": "Sale Order",
    "colnames": [
      "Order Id",
      "Order No",
      "Order Date",
      "Sold To Party",
      "Ship To Party",
      "PO Number",
      "PO Date",
      "Price Code",
      "Delivering Plant",
      "Destination",
      "Shipping Point",
      "Shipping Point Description",
      "Inco Term 1",
      "Inco Term 2",
      "Material Type",
      "Material Description",
      "Quantity (in MT)",
      "MTL Quality",
      "Transportation Group",
      "Transporter",
      "Remarks",
      "ORD_TYPE",
      "SALES_ORG",
      "DIST_CHNL",
      "DIVISION"
    ]
  },
  "80": {
    "caption": "Rake Disposal Details",
    "colnames": [
      "Id",
      "Rake No",
      "Day",
      "Sale From Siding Unit1",
      "Sale From Siding Unit2",
      "Shifted To Godown Unit1",
      "Shifted To Godown Unit2",
      "Total Disposals Unit1",
      "Total Disposals Unit2",
      "Balance Qty At Siding Unit1",
      "Balance Qty At Siding Unit2",
      "Cumulative Godown"
    ]
  },
  "81": {
    "caption": "Forgot Password",
    "colnames": [
      "Uid",
      "Enter User Name",
      "password"
    ]
  },
  "82": {
    "caption": "Change Password",
    "colnames": [
      "Uid",
      "Username",
      "Old Password",
      "New Password",
      "Confirm New Password"
    ]
  },
  "83": {
    "caption": "KRA",
    "colnames": [
      "Id",
      "Role",
      "Month",
      "Year",
      "Employee Code",
      "KRA Code",
      "KRA Item",
      "KRA Description",
      "Target",
      "IsTargetEditable",
      "Weightage",
      "IsTargetEditable"
    ],
    "sfilters": [
      "Role"
    ]
  },
  "84": {
    "caption": "Sales",
    "colnames": [
      "Sales ->Zone ->Region ->Depot",
      "Zone",
      "Region",
      "Depot",
      "Dealer Id ",
      "TotalQuantity",
      "Depot Name",
      "Dealer Name",
      "Duration",
      "ToDate",
      "Material Type",
      "EmpCode"
    ],
    "sfilters": [
      "FromDate",
      "ZoneCode",
      "RegionCode",
      "DepotCode",
      "MaterialType"
    ]
  },
  "86": {
    "caption": "Credit Limit Approval",
    "colnames": [
      "Id",
      "Sales Order No",
      "Dealer",
      "Order Date",
      "Credit Limit",
      "Total Outstanding",
      "Quantity",
      "Order Value",
      "Approval Reason",
      "Appoval Remarks",
      "Approved By Emp",
      "Approved Date"
    ]
  },
  "9": {
    "caption": "TSE Sales Group Mapping",
    "colnames": [
      "TSE Code",
      "Zone",
      "Region",
      "Depot",
      "Sales Group Code",
      "Id"
    ]
  },
  "92": {
    "caption": "KRA For CSR",
    "colnames": [
      "Month",
      "Year",
      "Employee Name",
      "Category",
      "KRA Description",
      "Target",
      "Actual",
      "Weightage",
      "Score",
      "Emp Code"
    ],
    "sfilters": [
      "Month",
      "Year",
      "Emp Code"
    ]
  },
  "93": {
    "caption": "KRA For RHM",
    "colnames": [
      "Month",
      "Year",
      "Employee Name",
      "Category",
      "KRA Description",
      "Target",
      "Actual",
      "Weightage",
      "Score",
      "Emp Code"
    ],
    "sfilters": [
      "Month",
      "Year",
      "Emp Code"
    ]
  },
  "94": {
    "caption": "KRA For TSE",
    "colnames": [
      "Month",
      "Year",
      "Employee Name",
      "Category",
      "KRA Desc",
      "Target",
      "Actual",
      "Weightage",
      "Score",
      "Emp Code",
      "I D"
    ],
    "sfilters": [
      "Month",
      "Year",
      "Emp Code"
    ]
  },
  "95": {
    "caption": "KRA For TSM",
    "colnames": [
      "Month",
      "Year",
      "Employee Name",
      "Category",
      "KRA Description",
      "Target",
      "Actual",
      "Weightage",
      "Score",
      "Emp Code"
    ],
    "sfilters": [
      "Month",
      "Year",
      "Emp Code"
    ]
  },
  "96": {
    "caption": "KRA For ZHM",
    "colnames": [
      "Month",
      "Year",
      "Employee Name",
      "Category",
      "KRA Description",
      "Target",
      "Actual",
      "Weightage",
      "Score",
      "Emp Code"
    ],
    "sfilters": [
      "Month",
      "Year",
      "Emp Code"
    ]
  }
}