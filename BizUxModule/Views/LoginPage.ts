/// <reference path="..\FrontController.ts" />
module PageNavigation {
    export class LoginPage extends FrontController.BaseSubPage {
        SetEvents() {
            var x: ucLogin = this.FindUserControlById<ucLogin>("ucLogin1");
            x.LoginClick = (e) => {
                DriverPage.LoadSubPage("Dashboard");
            };
        }
    }
}