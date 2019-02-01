import * as x from "../Index.js";
export class Helper {
    constructor() { }
    static GetWebApiUrl(controllerAction: string): string {
        return "api/" + controllerAction;
    }
    static GetResponseFromServer(Url: string, method: string, async: boolean) {
        return this.callServer(Url, method, async).response;
    }
    static GetHtmlResponseFromServer(Url: string, method: string, async: boolean): string {
        return this.callServer(Url, method, async).responseText;
    }
    private static callServer(Url: string, method: string, async: boolean): XMLHttpRequest {
        var objHttpReq = new XMLHttpRequest();
        if (Url.toLowerCase().substr(0, 4) != "http")
            Url = "" + Url;
        if (method == "GET")
            Url = Url + "?timestamp=" + Math.random();
        objHttpReq.open(method == "GET" ? "get" : "post", Url, async);
        objHttpReq.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        objHttpReq.withCredentials = true;
        objHttpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        objHttpReq.setRequestHeader("Connection", "close");
        objHttpReq.send();
        if (objHttpReq.readyState == 4 && objHttpReq.status == 200)
            return objHttpReq;
    }
    static objHttpReq: XMLHttpRequest = new XMLHttpRequest();
    static CallAPI(Url: string, method: string, data: any, stateChange: (ev: Event) => any) {
        if (method == "GET") {
            data.timestamp = Math.random();
            Url = Url + "?" + data;
        }
        this.objHttpReq.open(method == "GET" ? "get" : "post", Url, true);
        this.objHttpReq.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        this.objHttpReq.withCredentials = true;
        this.objHttpReq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        this.objHttpReq.setRequestHeader("Connection", "close");
        var reqToken = (<HTMLInputElement>(document.getElementById("hdnRequestVerificationToken"))).value;
        if (reqToken.length > 0)
            this.objHttpReq.setRequestHeader("RequestVerificationToken", reqToken);
        if (method == "POST")
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
                reference = new (<any>x)[className[0]]();
                //reference = Object.create(window[className[0]].prototype);
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