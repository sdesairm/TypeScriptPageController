import { BasePage } from "./Index.js";
import { Default } from "./default.js";


export class App {
    public static DriverPage: BasePage;
}

window.onload = () => {
    App.DriverPage = new BasePage();

    var lnkLogOut: HTMLLinkElement = document.getElementById("lnkLogOut") as HTMLLinkElement;
    lnkLogOut.onclick = () => {
        App.DriverPage.Logout();
    }
    App.DriverPage.LoadNavConfig().then(
        () => {
            App.DriverPage.LoadSubPage("Login");
        }
    );    
};