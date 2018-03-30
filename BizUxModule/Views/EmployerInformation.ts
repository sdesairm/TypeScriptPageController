/// <reference path="..\FrontController.ts" />
///<reference path="..\Scripts\typings\knockout\knockout.d.ts" />
module PageNavigation {
    export class EmployerInformation extends FrontController.BaseSubPage {
        groupId: string;
        employerInformation: KnockoutObservable<WebMain.Models.EmployerInformationModel>; 
        LoadSubPage() {
            super.LoadSubPage();
            var data = { GroupID: this.QueryParams["groupId"] };
            this.CallAPI<WebMain.Models.EmployerInformationModel>(FrontController.Helper.GetWebApiUrl("mm/EmployerInformation"), __FormMethod.POST, data, (db: WebMain.Models.EmployerInformationModel) => {
                this.employerInformation = ko.observable(db);
                ko.cleanNode(this.element);
                ko.applyBindings(this.employerInformation, this.element);
            });
        }
    }
}