import { UserControl, Helper } from "../Index.js";
export class ucLogin extends UserControl {
    LoginClick: (ev: MouseEvent) => any;
    SetEvents() {
        var btnLogin: HTMLButtonElement = this.FindChildElementById<HTMLButtonElement>("btnLogin");
        var txtUserName: HTMLInputElement = this.FindChildElementById<HTMLInputElement>("txtUserName");
        var txtPassword: HTMLInputElement = this.FindChildElementById<HTMLInputElement>("txtPassword");
        btnLogin.onclick = (e) => {
            var data = { username: txtUserName.value, password: txtPassword.value };
            this.CallAPI<boolean>(Helper.GetWebApiUrl("mm/AuthenticateUser"), "POST", data, (authenticated: boolean) => {
                if (authenticated)
                    this.LoginClick(e);
            });
        };
    }
}
