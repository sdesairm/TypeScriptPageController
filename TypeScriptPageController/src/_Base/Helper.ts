import * as x from "../Index";
export class Helper {
    constructor() { }
    static GetWebApiUrl(controllerAction: string): string {
        return "api/" + controllerAction;
    }
    static async GetResponseFromServer<T>(Url: string, method: string, async: boolean) : Promise<T>{
        return fetch(Url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json();
            });
    }
    static GetHtmlResponseFromServer(Url: string, method: string, async: boolean): Promise<string> {
        return fetch(Url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.text();
            })
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