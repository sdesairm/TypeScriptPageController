import { BasePage } from "./Index.js";


export class App {
    public static DriverPage: BasePage;
}

window.onload = () => {
    App.DriverPage = new BasePage();

    App.DriverPage.LoadSubPage("Login");
};