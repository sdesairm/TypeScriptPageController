import { UserControl } from "./UserControl.js";

export class BaseSubPage extends UserControl {
    SubPageName: string; Url: string; element: HTMLElement; Name: string; QueryParams: any;
    FindUserControlById<T extends UserControl>(id: string): T {
        for (var i: number = 0; i < this.Controls.length; i++) {
            if (this.Controls[i].spanElement.id == id)
                return <T>this.Controls[i];
        }
        return null;
    }
    constructor() {
        super();
        this.element = document.getElementById("content");
        this.element.innerHTML = "";
        this.element.appendChild(this.spanElement);
    }
    LoadSubPage() {
        this.LoadSpanElement(this.Url, this.Name);
        this.LoadUserControls(this.element);
    }
}