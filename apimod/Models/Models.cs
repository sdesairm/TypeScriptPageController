using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TypeLite;

namespace WebMain.Models
{
    [TsClass]
    public class DashboardModel
    {
        public string AgentID { get; set; }
        public string Dashboard_CreateSoldGroupButton_Text { get; set; }
        public string Dashboard_Tab_AllGroups { get; set; }
        public string Dashboard_Tab_MyGroups { get; set; }
        public string Dashboard_Table_Header_EffectiveDate { get; set; }
        public string Dashboard_Table_Header_EnrollmentProgress { get; set; }
        public string Dashboard_Table_Header_Name { get; set; }
        public string Dashboard_Table_Header_Status { get; set; }
        public string Dashboard_Table_Header_Zip { get; set; }
        public string Dashboard_Table_Link_ViewBreak { get; set; }
        public GroupModel[] Data;
        public string GroupMember_Display_Count_Label { get; set; }
        public string GroupMember_DisplayRecords_Label { get; set; }
        public string GroupMember_EntriesPrefix_Label { get; set; }
        public string GroupMember_Search_NoResultMsg { get; set; }
        public string JsonEmployers { get; set; }
        public string Pagination_PageSizes_Xml { get; set; }
        public int TotalCount { get; set; }
    }

    [TsClass]
    public class GroupModel
    {
        public int CensusCount { get; set; }
        public string City { get; set; }
        public bool COBRAQualified { get; set; }
        public int CompanyID { get; set; }
        public string CompanyName { get; set; }
        public int CompletionPercent { get; set; }
        public string ContactEmailAddress { get; set; }
        public string ContactFirstName { get; set; }
        public string ContactLastName { get; set; }
        public string ContactPhoneNumber { get; set; }
        public string CreatedWhen { get; set; }
        public string DateAdded { get; set; }
        public string DoingBusinessAs { get; set; }
        public string EffectiveDate { get; set; }
        public string EmployerID { get; set; }
        public string EncryptedEmployerID { get; set; }
        public string ExternalCompanyID { get; set; }
        public string FEIN { get; set; }
        public string GroupId { get; set; }
        public bool IsActive { get; set; }
        public bool IsMedicareSecondary { get; set; }
        public bool IsSubsidiary { get; set; }
        public bool IsUnionized { get; set; }
        public string ManagingAgent { get; set; }
        public string ModifiedWhen { get; set; }
        public string Name { get; set; }
        public int ParticipationPercent { get; set; }
        public string SICCode { get; set; }
        public string State { get; set; }
        public string Status { get; set; }
        public string Street1 { get; set; }
        public string Street2 { get; set; }
        public int TotalEmployees { get; set; }
        public string ZipCode { get; set; }
    }
    [TsClass]
    public class EmployerLocation
    {
        public string Address { get; set; }
        public string City { get; set; }
        public string Class { get; set; }
        public string ContactEmail { get; set; }
        public string ContactName { get; set; }
        public string ContactPhone { get; set; }
        public string Division { get; set; }
        public string FullAddress { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
    }
    [TsClass]
    public class EmployerInformationModel
    {
        public string EmployerInformation_Class_Label { get; set; }
        public string EmployerInformation_EmployerContact_Label { get; set; }
        public string EmployerInformation_OtherLocations_Label { get; set; }
        public string Name { get; set; }
        public EmployerLocation[] OtherLocations;
        private EmployerLocation _primaryLocation = new EmployerLocation();
        public EmployerLocation PrimaryLocation
        {
            get
            {
                return _primaryLocation;
            }
            set
            {
                _primaryLocation = value;
            }
        }
    }
}