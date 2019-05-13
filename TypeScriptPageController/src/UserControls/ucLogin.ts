import { UserControl } from "../_Base/UserControl";
import { Helper } from "../_Base/Helper";
import { App } from "../app";
import { UserDetails } from "../_Base/UserDetails";


export class ucLogin extends UserControl {
    LoginClick: (ev: MouseEvent) => any;
    SetEvents() {
        var btnLogin: HTMLButtonElement = this.FindChildElementById<HTMLButtonElement>("btnLogin");
        var txtUserName: HTMLInputElement = this.FindChildElementById<HTMLInputElement>("txtUserName");
        var txtPassword: HTMLInputElement = this.FindChildElementById<HTMLInputElement>("txtPassword");
        btnLogin.onclick = (e) => {
            var data = { username: txtUserName.value, password: txtPassword.value };
            //call API to Validate
            if (data.username == "test" && data.password == "Test") {
                App.Session.AddSessionItem("User", "test");
                var userDetails: UserDetails = new UserDetails();
                userDetails.FirstName = "Test";
                userDetails.LastName = "lName";
                userDetails.Claims = ["x", "y"];
                App.Session.AddSessionItem("UserDetails", userDetails)
                this.LoginClick(e);
            }
            else {

            }            
        };
    }
}
