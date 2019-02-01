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
        this.divBreadcrumb = document.getElementById("divBreadcrumb");
        this.pageHistory = [];
    }

    async LoadNavConfig():Promise<void> {
        await Helper.GetResponseFromServer<NavSubPageList>("pagenavigation.json", "GET", false).then(
            (resp) => {
                this.NavConfig = resp;
            }
        );     
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
        this.Subpage.LoadSubPage().then(
            () => {
                this.Subpage.SetEvents();
            }
        )

    }
    Logout() {
        this.LoadSubPage("Login");
    }
}