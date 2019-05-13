import { BasePage } from "./_Base/BasePage";
import { Default } from "./default";
import { SessionState } from "./_Base/SessionState";


export class App {
    public static DriverPage: BasePage;
    public static Session: SessionState = new SessionState();
}

window.onload = () => {
    App.DriverPage = new BasePage();

    var lnkLogOut: HTMLLinkElement = document.getElementById("lnkLogOut") as HTMLLinkElement;
    lnkLogOut.onclick = () => {
        App.DriverPage.Logout();
        App.Session.Abandon();
        return false;
    }
    App.DriverPage.LoadNavConfig().then(
        () => {
            App.DriverPage.LoadSubPage("Login");
        }
    );    
};

window.onpopstate = function (event) {
    App.DriverPage.LoadSubPage(window.location.pathname.replace("/",""));
};