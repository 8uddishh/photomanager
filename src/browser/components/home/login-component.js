import { baseComponent } from "./../base-component"
import { ipcRenderer } from "electron"

export class loginComponent extends baseComponent {

    constructor($el, $link) {
        super($el, $link)
        document.querySelector("body").classList.add("login")
    }

    get $template(){
        return `  
        <div class="route-filler is-route-slide is-right">
    <div class="container login-outer-container">
        <div class="login-header">
            <img src="./assets/images/newLogo.png" />
        </div>
        <div class="login-container is-shadow">
            <div class="login-user">
                <div class="field">
                    <p class="control has-icons-left has-icons-right">
                    <input class="input" placeholder="User name">
                    <span class="icon is-small is-left">
                        <i class="fa fa-user"></i>
                    </span>
                    </p>
                </div>
                <div class="field">
                    <p class="control has-icons-left">
                    <input class="input" type="password" placeholder="Password">
                    <span class="icon is-small is-left">
                        <i class="fa fa-lock"></i>
                    </span>
                    </p>
                </div>
                <div class="field">
                    <p class="control">
                    <button id="app-login" class="button is-link is-block is-gradient">
                        <i class="fa fa-key"></i> Login
                    </button>
                    </p>
                </div>
            </div>
            <div class="login-footer">
                <span>&copy; 2017 Liquidity Services, Inc.</span>
            </div>
        </div>
        </div>
    </div>`
    }

    settifyTriggers () {  
        this.$("#app-login").addEventListener("click", e => {  
            window.location.hash = "home";
        })   
    }
}