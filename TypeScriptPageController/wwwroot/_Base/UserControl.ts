import { Helper } from "./Helper.js";

export class UserControl {
    spanElement: HTMLSpanElement; Controls: UserControl[];
    hdnRequestVerificationToken: HTMLInputElement;
    constructor() {
        this.spanElement = document.createElement("span");
        this.Controls = [];
    }
    async LoadSpanElement(url: string, id: string): Promise<void> {
        this.spanElement.id = id;
        await Helper.GetHtmlResponseFromServer(url, "GET", false).then(
            resp => {
                this.spanElement.innerHTML = resp;
            });
    }
    SetEvents() {
        this.Controls.forEach(x => { x.SetEvents() });
    }
    async LoadUserControls(el: HTMLElement) {
        var userControls: HTMLCollectionOf<HTMLObjectElement> = el.getElementsByTagName("object");
        for (var i: number = 0; i < userControls.length; i++) {
            var x: HTMLObjectElement = userControls[i];
            var userControl: UserControl = Helper.CreateInstance<UserControl>(x.attributes.getNamedItem("classid").value);
            await userControl.LoadSpanElement(x.attributes.getNamedItem("data").value, x.attributes.getNamedItem("id").value).then(
                () => {
                    userControl.spanElement.id = x.id;
                    x.parentNode.replaceChild(userControl.spanElement, x);
                    this.Controls.push(userControl);
                    this.LoadUserControls(x);
                }
            );
        }
    }
    FindChildElementById<T extends HTMLElement>(id: string): T {
        return <T>document.getElementById(id);
    }
}