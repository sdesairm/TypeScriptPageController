import { BaseSubPage } from "../Index.js";
import { ucLogin } from "../UserControls/ucLogin.js";
import { App } from "../app.js";

export class LoginPage extends BaseSubPage {
    SetEvents() {
        var x: ucLogin = this.FindUserControlById<ucLogin>("ucLogin1");
        x.LoginClick = () => {
            App.DriverPage.LoadSubPage("Landing");
        };
    }
}