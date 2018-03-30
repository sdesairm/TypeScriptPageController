/// <reference path="..\FrontController.ts" />
///<reference path="..\Scripts\typings\knockout\knockout.d.ts" />
///<reference path="..\Models\Models.d.ts" />
module PageNavigation {
    export class Dashboard extends FrontController.BaseSubPage {
        tblGroups: HTMLTableElement;
        
        dashboard: KnockoutObservable<WebMain.Models.DashboardModel>;        
        LoadSubPage() {
            super.LoadSubPage();
            this.tblGroups = this.FindChildElementById<HTMLTableElement>("tblGroups");
            this.CallAPI<WebMain.Models.DashboardModel>(FrontController.Helper.GetWebApiUrl("mm/GetDashboard"), __FormMethod.GET, '', (db: WebMain.Models.DashboardModel) => {                
                this.dashboard = ko.observable(db);
                ko.cleanNode(this.element);
                ko.applyBindings(this.dashboard, this.element);
            });
        }
        SetEvents() {
        
        }
    }
}