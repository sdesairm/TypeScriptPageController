/// <refernce path="..\..\Scripts\typings\knockout\Jquery.d.ts" />
/// <refernce path="..\..\Scripts\typings\knockout\Knockout.d.ts" />
var DriverPage: FrontController.BasePage;
window.onload = () => {
    DriverPage = new FrontController.BasePage();
    DriverPage.LoadSubPage("Login");
};
enum __FormMethod { GET, POST };
module FrontController {
    export class Helper {
        constructor() { }        
        static GetWebApiUrl(controllerAction: string): string {
            return "api/" + controllerAction;
        }
        static GetXmlResponseFromServer(Url: string, method: __FormMethod, async: boolean): XMLDocument {
            return <XMLDocument>(this.callServer(Url, method, async).responseXML);
        }
        static GetHtmlResponseFromServer(Url: string, method: __FormMethod, async: boolean): string {
            return this.callServer(Url, method, async).responseText;
        }
        private static callServer(Url: string, method: __FormMethod, async: boolean): XMLHttpRequest {
            var objHttpReq = new XMLHttpRequest();
            if (Url.toLowerCase().substr(0, 4) != "http")
                Url = "" + Url;
            if (method == __FormMethod.GET)
                Url = Url + "?timestamp=" + Math.random();
            objHttpReq.open(method == __FormMethod.GET ? "get" : "post", Url, async);
            objHttpReq.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            objHttpReq.withCredentials = true;
            objHttpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            objHttpReq.setRequestHeader("Connection", "close");
            objHttpReq.send();            
            if (objHttpReq.readyState == 4 && objHttpReq.status == 200)
                return objHttpReq;
        }
        static objHttpReq: XMLHttpRequest = new XMLHttpRequest();
        static CallAPI(Url: string, method: __FormMethod, data: any, stateChange: (ev: Event) => any) {
            if (method == __FormMethod.GET) {
                data.timestamp = Math.random();
                Url = Url + "?" + $.param(data);
            }
            this.objHttpReq.open(method == __FormMethod.GET ? "get" : "post", Url, true);
            this.objHttpReq.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            this.objHttpReq.withCredentials = true;
            this.objHttpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            this.objHttpReq.setRequestHeader("Connection", "close");
            var reqToken = (<HTMLInputElement>(document.getElementById("hdnRequestVerificationToken"))).value;
            if (reqToken.length > 0)
                this.objHttpReq.setRequestHeader("RequestVerificationToken", reqToken);
            if (method == __FormMethod.POST)
                this.objHttpReq.send("=" + JSON.stringify(data));
            else
                this.objHttpReq.send();
            this.objHttpReq.onreadystatechange = stateChange;
        }
        static CreateInstance<T>(ClassFullName: string): T {
            var reference: T;
            var className: string[] = ClassFullName.split('.');
            switch (className.length) {
                case 1:
                    reference = Object.create(window[className[0]].prototype);
                    break;
                case 2:
                    reference = Object.create(window[className[0]][className[1]].prototype);
                    reference.constructor.apply(reference);
                    break;
            }
            return <T>reference;
        }
        static ParseQueryString(queryString: string): any {
            var rtnObj: any[] = [];
            if (queryString.length > 0) {
                var params: string[] = queryString.split('?');
                rtnObj["SubPageName"] = params[0];
            }
            if (params.length > 1) {
                var queryParams: string[] = params[1].split('&');
                for (var i: number = 0; i < queryParams.length; i++) {
                    var queryparamKeyValue: string[] = queryParams[i].split('=');
                    for (var j: number = 0; j < queryparamKeyValue.length; j++) {
                        rtnObj[queryparamKeyValue[j]] = queryparamKeyValue[++j];
                    }
                }
            }
            return rtnObj;
        }
    }
    export class UserControl {
        spanElement: HTMLSpanElement; Controls: UserControl[];
        hdnRequestVerificationToken: HTMLInputElement;
        constructor() {
            this.spanElement = document.createElement("span");
            this.Controls = [];
        }
        LoadSpanElement(url: string, id: string) {
            this.spanElement.id = id;
            this.spanElement.innerHTML = Helper.GetHtmlResponseFromServer(url, __FormMethod.GET, false);
        }
        SetEvents() { }
        LoadUserControls(el: HTMLElement) {
            var userControls: NodeListOf<HTMLObjectElement> = el.getElementsByTagName("object");
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
        
        CallAPI<T>(Url: string, method: __FormMethod, data: any, success: (x: T) => any) {
            Helper.CallAPI(Url, method, data, (ev) => {
                $("#tblWait").show();
                if (Helper.objHttpReq.readyState == 4 && Helper.objHttpReq.status == 200) {
                    this.hdnRequestVerificationToken = (<HTMLInputElement>(document.getElementById("hdnRequestVerificationToken")));
                    this.hdnRequestVerificationToken.value = Helper.objHttpReq.getResponseHeader("RequestVerificationToken");
                    if (Helper.objHttpReq.responseText.length > 0) {
                        var t = (JSON.parse(Helper.objHttpReq.responseText));
                        $("#tblWait").hide();
                        return success(t);
                    }
                }
            });
        }
    }
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
            this.element = document.getElementById("divSubpage");
            this.element.innerHTML = "";
            this.element.appendChild(this.spanElement);
        }
        LoadSubPage() {
            this.LoadSpanElement(this.Url, this.Name);
            this.LoadUserControls(this.element);
        }        
    }
    export class BasePage {
        NavConfig: XMLDocument;
        divBreadcrumb: HTMLElement;
        pageHistory: any[];
        Subpage: BaseSubPage;
        hdnRequestVerificationToken: HTMLInputElement;
        constructor() {
            $("#tblWait").hide();
            this.NavConfig = Helper.GetXmlResponseFromServer("PageNavigation.xml", __FormMethod.GET, false);
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
            var subPageNode: Node;
            var nodes: NodeList = this.NavConfig.documentElement.getElementsByTagName("SubPage");
            for (var i: number = 0; i < nodes.length; i++) {
                if (nodes.item(i).attributes.getNamedItem("Name").value == subpageName) {
                    subPageNode = nodes.item(i);
                    break;
                }
            }
            this.Subpage = Helper.CreateInstance<BaseSubPage>(subPageNode.attributes.getNamedItem("CodeBehind").value);
            this.Subpage.QueryParams = parsedQueryString;
            this.Subpage.Name = subpageName;
            this.Subpage.Url = subPageNode.attributes.getNamedItem("Url").value;
            var i: number;

            this.pageHistory.push({ SubPagename: subpageName });
            for (i = 0; i < this.pageHistory.length; i++) {
                if (this.pageHistory[i].SubPagename == subpageName)
                    break;
            }
            while (i + 1 < this.pageHistory.length) this.pageHistory.pop();
            ko.cleanNode(this.divBreadcrumb);
            ko.applyBindings({ pgHistory: ko.observableArray(this.pageHistory) }, this.divBreadcrumb);
            this.Subpage.LoadSubPage();
            this.Subpage.SetEvents();
            
        }
        Logout() {            
            this.Subpage.CallAPI<boolean>(FrontController.Helper.GetWebApiUrl("mm/Logout"), __FormMethod.POST, '', (authenticated: boolean) => {
                if (authenticated)
                    this.LoadSubPage("Login");
            });
        }
    }
} 