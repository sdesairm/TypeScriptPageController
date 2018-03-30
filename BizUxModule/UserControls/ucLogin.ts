/// <reference path="../FrontController.ts" />
module PageNavigation {
    export class ucLogin extends FrontController.UserControl {
        LoginClick: (ev: MouseEvent) => any;
        SetEvents() {
            var btnLogin: HTMLButtonElement = this.FindChildElementById<HTMLButtonElement>("btnLogin");
            var txtUserName: HTMLInputElement = this.FindChildElementById<HTMLInputElement>("txtUserName");
            var txtPassword: HTMLInputElement = this.FindChildElementById<HTMLInputElement>("txtPassword");
            btnLogin.onclick = (e) => {
                var data = { username: txtUserName.value, password: txtPassword.value };                
                this.CallAPI<boolean>(FrontController.Helper.GetWebApiUrl("mm/AuthenticateUser"), __FormMethod.POST, data, (authenticated: boolean) => {
                    if (authenticated)
                        this.LoginClick(e);
                });
            };
        }
    }
}
