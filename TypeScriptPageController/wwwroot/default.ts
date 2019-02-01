import { BasePage } from "./_Base/BasePage.js";
export class Default extends BasePage{
    setEvents() {
        var lnkLogOut: HTMLLinkElement = document.getElementById("lnkLogOut") as HTMLLinkElement;
        lnkLogOut.onclick = () => {
            this.Logout();
        }
    }
}