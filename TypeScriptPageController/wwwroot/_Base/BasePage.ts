import { NavSubPage, NavSubPageList } from "./NavConfig.js";
import { BaseSubPage } from "./BaseSubPage.js";
import { Helper } from "./Helper.js";

export class BasePage {
    NavConfig: NavSubPageList;
    divBreadcrumb: HTMLElement;
    pageHistory: any[];
    Subpage: BaseSubPage;
    hdnRequestVerificationToken: HTMLInputElement;
    constructor() {
        let js = Helper.GetResponseFromServer("pagenavigation.json", "GET", false);
        let o = JSON.parse(js);
        this.NavConfig = o.NavSubPageList;
        this.divBreadcrumb = document.getElementById("divBreadcrumb");
        this.pageHistory = [];
        this.hdnRequestVerificationToken = document.createElement("input");
        document.body.appendChild(this.hdnRequestVerificationToken);
        this.hdnRequestVerificationToken.type = "hidden";
        this.hdnRequestVerificationToken.hidden = true;
        this.hdnRequestVerificationToken.id = "hdnRequestVerificationToken";
    }
    LoadSubPage(subpageName: string) {
        var parsedQueryString: any = Helper.ParseQueryString(subpageName);
        subpageName = parsedQueryString.SubPageName;
        var subPageNode: NavSubPage;
        var nodes: NavSubPage[] = this.NavConfig.NavSubPages;
        for (var i: number = 0; i < nodes.length; i++) {
            if (nodes[i].Name == subpageName) {
                subPageNode = nodes[i];
                break;
            }
        }
        this.Subpage = Helper.CreateInstance<BaseSubPage>(subPageNode.CodeBehind);
        this.Subpage.QueryParams = parsedQueryString;
        this.Subpage.Name = subpageName;
        this.Subpage.Url = subPageNode.Url;
        var i: number;

        this.pageHistory.push({ SubPagename: subpageName });
        for (i = 0; i < this.pageHistory.length; i++) {
            if (this.pageHistory[i].SubPagename == subpageName)
                break;
        }
        while (i + 1 < this.pageHistory.length) this.pageHistory.pop();
        this.Subpage.LoadSubPage();
        this.Subpage.SetEvents();

    }
    Logout() {
        this.Subpage.CallAPI<boolean>(Helper.GetWebApiUrl("mm/Logout"), "POST", '', (authenticated: boolean) => {
            if (authenticated)
                this.LoadSubPage("Login");
        });
    }
}