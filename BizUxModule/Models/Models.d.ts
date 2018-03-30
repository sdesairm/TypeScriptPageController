
 
 

 

/// <reference path="Enums.ts" />

declare module WebMain.Models {
	interface DashboardModel {
		AgentID: string;
		Dashboard_CreateSoldGroupButton_Text: string;
		Dashboard_Tab_AllGroups: string;
		Dashboard_Tab_MyGroups: string;
		Dashboard_Table_Header_EffectiveDate: string;
		Dashboard_Table_Header_EnrollmentProgress: string;
		Dashboard_Table_Header_Name: string;
		Dashboard_Table_Header_Status: string;
		Dashboard_Table_Header_Zip: string;
		Dashboard_Table_Link_ViewBreak: string;
		GroupMember_Display_Count_Label: string;
		GroupMember_DisplayRecords_Label: string;
		GroupMember_EntriesPrefix_Label: string;
		GroupMember_Search_NoResultMsg: string;
		JsonEmployers: string;
		Pagination_PageSizes_Xml: string;
		TotalCount: number;
	}
	interface GroupModel {
		CensusCount: number;
		City: string;
		COBRAQualified: boolean;
		CompanyID: number;
		CompanyName: string;
		CompletionPercent: number;
		ContactEmailAddress: string;
		ContactFirstName: string;
		ContactLastName: string;
		ContactPhoneNumber: string;
		CreatedWhen: string;
		DateAdded: string;
		DoingBusinessAs: string;
		EffectiveDate: string;
		EmployerID: string;
		EncryptedEmployerID: string;
		ExternalCompanyID: string;
		FEIN: string;
		GroupId: string;
		IsActive: boolean;
		IsMedicareSecondary: boolean;
		IsSubsidiary: boolean;
		IsUnionized: boolean;
		ManagingAgent: string;
		ModifiedWhen: string;
		Name: string;
		ParticipationPercent: number;
		SICCode: string;
		State: string;
		Status: string;
		Street1: string;
		Street2: string;
		TotalEmployees: number;
		ZipCode: string;
	}
	interface EmployerLocation {
		Address: string;
		City: string;
		Class: string;
		ContactEmail: string;
		ContactName: string;
		ContactPhone: string;
		Division: string;
		FullAddress: string;
		State: string;
		Zip: string;
	}
	interface EmployerInformationModel {
		EmployerInformation_Class_Label: string;
		EmployerInformation_EmployerContact_Label: string;
		EmployerInformation_OtherLocations_Label: string;
		Name: string;
		PrimaryLocation: WebMain.Models.EmployerLocation;
	}
}


