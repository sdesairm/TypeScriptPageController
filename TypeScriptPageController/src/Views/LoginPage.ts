import { BaseSubPage } from "../_Base/BaseSubPage";
import { ucLogin } from "../UserControls/ucLogin";
import { App } from "../app";

export class LoginPage extends BaseSubPage {
    SetEvents() {        
        var x: ucLogin = this.FindUserControlById<ucLogin>("ucLogin1");
        x.SetEvents();
        x.LoginClick = () => {
            App.DriverPage.LoadSubPage("Landing");
        };
    }
}