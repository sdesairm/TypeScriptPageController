import { Helper } from "./Helper.js";

export class UserControl {
    spanElement: HTMLSpanElement; Controls: UserControl[];
    hdnRequestVerificationToken: HTMLInputElement;
    constructor() {
        this.spanElement = document.createElement("span");
        this.Controls = [];
    }
    LoadSpanElement(url: string, id: string) {
        this.spanElement.id = id;
        this.spanElement.innerHTML = Helper.GetHtmlResponseFromServer(url, "GET", false);
    }
    SetEvents() { }
    LoadUserControls(el: HTMLElement) {
        var userControls: HTMLCollectionOf<HTMLObjectElement> = el.getElementsByTagName("object");
        for (var i: number = 0; i < userControls.length; i++) {
            var x: HTMLObjectElement = userControls[i];
            var userControl: UserControl = Helper.CreateInstance<UserControl>(x.attributes.getNamedItem("classid").value);
            userControl.LoadSpanElement(x.attributes.getNamedItem("data").value, x.attributes.getNamedItem("id").value);
            userControl.spanElement.id = x.id;
            x.parentNode.replaceChild(userControl.spanElement, x);
            userControl.SetEvents();
            this.Controls.push(userControl);
            this.LoadUserControls(x);
        }
    }
    FindChildElementById<T extends HTMLElement>(id: string): T {
        return <T>document.getElementById(id);
    }

    CallAPI<T>(Url: string, method: string, data: any, success: (x: T) => any) {
        Helper.CallAPI(Url, method, data, (ev) => {
            if (Helper.objHttpReq.readyState == 4 && Helper.objHttpReq.status == 200) {
                this.hdnRequestVerificationToken = (<HTMLInputElement>(document.getElementById("hdnRequestVerificationToken")));
                this.hdnRequestVerificationToken.value = Helper.objHttpReq.getResponseHeader("RequestVerificationToken");
                if (Helper.objHttpReq.responseText.length > 0) {
                    var t = (JSON.parse(Helper.objHttpReq.responseText));
                    return success(t);
                }
            }
        });
    }
}