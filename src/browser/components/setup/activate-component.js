import { baseComponent } from "./../base-component"
import { ipcRenderer } from "electron"

export class activationComponent extends baseComponent {

    get $template() {
        return `
        <div class="container header-container">
            <div class="is-uppercase">
                activate your app
            </div>
        </div>
        <div class="container default-container is-shadow">
            <div id="activate-interchange" class="interchange">
                <div id="act-hello" class="interchange-item is-active">
                    <h1 class="title">Hello</h1>
                    <h3 class="subtitle">
                        Thanks for your interest in Gojira. With 3 easy steps you can activate the application. Click next to proceed. 
                    </h3>
                </div>
                <div id="act-step-1" class="interchange-item is-slide is-right">
                    <h1 class="title">Step 1</h1>
                    <ul class="vertical-flow setup">
                        <li><p>Log in to 'Back Office Tools' and click on the <i class="fa fa-gears"></i> button</p></li>
                        <li>In the widgets configuration displayed, click on 'Remotes' tab</li>
                        <li>'Gojira' should be one of the option</li>
                        <li>Click on 'Request Auth Code' on the option</li>
                    </ul>
                </div>
                <div id="act-step-2" class="interchange-item is-slide is-right">
                    <h1 class="title">Step 2</h1>
                    <ul class="vertical-flow setup">
                        <li><p>Copy application id below by clicking the <i class="fa fa-copy"></i> button</p></li>
                        <li class="auth-code">
                            <div class="pull-left">
                                <span class="bar-code">710b962e-041c-11e1-9234-0123456789ab</span>
                            </div>
                            <a class="button is-pulse pull-right" id="select-auth-code" ><i class="fa fa-copy"></i></a>
                        </li>
                        <li>Paste the copied code into the BOT textbox and click generate</li>
                        <li>You would be displayed with an auth code</li>
                    </ul>
                </div>
                <div id="act-step-3" class="interchange-item is-slide is-right">
                    <h1 class="title">Step 3</h1>
                    <ul class="vertical-flow setup">
                        <li><p>Copy the displayed auth code in BOT by clicking <i class="fa fa-copy"></i> button</p></li>
                        <li>
                            <p>
                                Paste the auth code in the textbox below and click 'Activate'
                            </p>
                            <div class="field">
                                <div class="control">
                                <input id="act-auth-code" class="input is-info" type="password" placeholder="Paste BOT Auth code here">
                                </div>
                            </div>
                        </li>
                    </ul>
                    <a class="button is-link is-block is-gradient" id="act-app"><i class="fa fa-key fa-flip-vertical"></i> Activate</a>
                    <div id="act-auth-error" class="notification is-danger is-size-7 has-text-centered  margin top-20">
                        The auth code entered is invalid. Please try again.
                    </div>
                </div>
                <div id="act-step-4" class="is-thinky interchange-item is-slide is-right">
                    <svg>
                        <defs>
                        <filter>
                            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"></feColorMatrix>
                            <feBlend in="SourceGraphic" in2="goo"></feBlend>
                        </filter>
                        </defs>
                    </svg>
                    <div class="bubble bubble-0"></div>
                    <div class="bubble bubble-1"></div>
                    <div class="bubble bubble-2"></div>
                    <div class="bubble bubble-3"></div>
                    <div class="bubble bubble-4"></div>
                    <div class="bubble bubble-5"></div>
                    <div class="is-uppercase has-text-centered is-size-7">
                        Please wait while we activate your app... This can take a few minutes...
                    </div>
                </div>
                <div id="act-welcome" class="interchange-item is-slide is-right">
                    <h1 class="title">Welcome</h1>
                    <h3 class="subtitle user-name is-uppercase" id="act-logged-user">
                    </h3>
                    <h3 class="subtitle is-size-7 has-text-centered">
                        Your app has been activated successfully. Secure your application with a 4 digit code. 
                        This code can be used to lock and unlock your app when not in use.
                    </h3>
                    <div class="columns is-mobile is-pass-code">
                        <div class="column">
                            <span class="auth-1"></span>
                        </div>
                        <div class="column">
                            <span class="auth-2"></span>
                        </div>
                        <div class="column">
                            <span class="auth-3"></span>
                        </div>
                        <div class="column">
                            <span class="auth-4"></span>
                        </div>
                    </div>
                    <a id="act-apply-passcode" class="button is-link is-block is-gradient is-hide" id="act-app"><i class="fa fa-check-circle"></i> Apply</a>
                    <a id="act-cancel-passcode" class="button is-error is-block is-gradient is-hide" id="act-app"><i class="fa fa-times-circle"></i> Cancel</a>
                </div>
            </div>
        </div>
        <div id="act-pass-code" class="act-pass-code" style="display:none">
            <div class="columns is-mobile">
                <div class="column is-one-third">
                    <a class="button is-white auth-select">1</a>
                </div>
                <div class="column is-one-third">
                    <a class="button is-white auth-select">2</a>
                </div>
                <div class="column is-one-third">
                    <a class="button is-white auth-select">3</a>
                </div>
            </div>
            <div class="columns is-mobile">
                <div class="column is-one-third">
                    <a class="button is-white auth-select">4</a>
                </div>
                <div class="column is-one-third">
                    <a class="button is-white auth-select">5</a>
                </div>
                <div class="column is-one-third">
                    <a class="button is-white auth-select">6</a>
                </div>
            </div>
            <div class="columns is-mobile">
                <div class="column is-one-third">
                    <a class="button is-white auth-select">7</a>
                </div>
                <div class="column is-one-third">
                    <a class="button is-white auth-select">8</a>
                </div>
                <div class="column is-one-third">
                    <a class="button is-white auth-select">9</a>
                </div>
            </div>
            <div class="columns is-mobile">
                <div class="column is-one-third">
                </div>
                <div class="column is-one-third">
                    <a class="button is-white auth-select">0</a>
                </div>
                <div class="column is-one-third">
                    <a class="button is-white auth-select auth-bk-space">
                        <i class="fa fa-shield fa-rotate-90"></i>
                    </a>
                </div>
            </div>
        </div>
        `
    }
    constructor($el, $link) {
        super($el, $link)
        this.$el.innerHTML = this.$template
        document.querySelector("body").removeAttribute("class")
        document.querySelector("body").classList.add("activate")
        this.currentSlide = 0
        this.slides = [ "#act-hello", "#act-step-1", "#act-step-2", "#act-step-3", "#act-step-4", "#act-welcome" ]
        this.applicationKeySelected = false
        this.authCode = ""
    }

    settifyTriggers () {
        document.querySelector("#prev-step").classList.add("hidden")

        document.querySelector("#next-step").addEventListener("click", e => {
            if(!e.currentTarget.hasAttribute("disabled")) {
                this.$(this.slides[this.currentSlide]).classList.remove("is-active")
                this.$(this.slides[this.currentSlide]).classList.add("is-slide", "is-left")
    
                this.currentSlide++
                
                this.$(this.slides[this.currentSlide]).classList.remove("is-slide", "is-left", "is-right")
                this.$(this.slides[this.currentSlide]).classList.add("is-active")
    
                if(this.currentSlide == this.slides.length - 1)
                    document.querySelector("#next-step").classList.add("hidden")
                
                document.querySelector("#prev-step").classList.remove("hidden")
    
                if(this.currentSlide == 2 && !this.applicationKeySelected)
                    document.querySelector("#next-step").setAttribute("disabled", "")
                else 
                    document.querySelector("#next-step").removeAttribute("disabled")

                if(this.currentSlide >= 3)
                    document.querySelector("#next-step").classList.add("hidden")
            }
        })

        document.querySelector("#prev-step").addEventListener("click", e => {
            this.$(this.slides[this.currentSlide]).classList.remove("is-active")
            this.$(this.slides[this.currentSlide]).classList.add("is-slide", "is-right")

            this.currentSlide--
            
            this.$(this.slides[this.currentSlide]).classList.remove("is-slide", "is-left", "is-right")
            this.$(this.slides[this.currentSlide]).classList.add("is-active")

            if(this.currentSlide == 0)
                document.querySelector("#prev-step").classList.add("hidden")

            document.querySelector("#next-step").classList.remove("hidden")
            document.querySelector("#next-step").removeAttribute("disabled")
        })

        this.$("#select-auth-code").addEventListener("click", e => {
            this.applicationKeySelected = true
            this.$("#select-auth-code").classList.add("is-active")
            document.querySelector("#next-step").removeAttribute("disabled")
        })

        this.$("#act-app").addEventListener("click", e => {
            if(!e.currentTarget.hasAttribute("disabled")) {
                this.$(this.slides[this.currentSlide]).classList.remove("is-active")
                this.$(this.slides[this.currentSlide]).classList.add("is-slide", "is-left")
    
                this.currentSlide++
                
                this.$(this.slides[this.currentSlide]).classList.remove("is-slide", "is-left", "is-right")
                this.$(this.slides[this.currentSlide]).classList.add("is-active")

                document.querySelector("#footer-setup-container").classList.add("hidden")
                ipcRenderer.send("auth:activate", this.$("#act-auth-code").value)
            }
        })

        this.$All(".auth-select:not(.auth-bk-space)")
            .forEach($btn => {
                $btn.addEventListener("click", e => {
                    if(this.authCode.length < 4) {
                        this.authCode = `${this.authCode}${$btn.innerHTML.trim()}`
                        this.$(`.auth-${this.authCode.length}`).classList.add("is-active")
                    }

                    if(this.authCode.length == 4) {
                        this.$("#act-apply-passcode").classList.remove("is-hide")
                        this.$("#act-cancel-passcode").classList.remove("is-hide")
                    }
                })
            })
        
        this.$(".auth-bk-space").addEventListener("click", e => {
            if(this.authCode.length > 0) {
                this.$(`.auth-${this.authCode.length}`).classList.remove("is-active")
                this.authCode = this.authCode.slice(0, this.authCode.length  - 1)

                this.$("#act-apply-passcode").classList.add("is-hide")
                this.$("#act-cancel-passcode").classList.add("is-hide")
            }
        })

        this.$("#act-apply-passcode").addEventListener("click", e => {
            this.$("#act-apply-passcode").classList.add("is-hide")
            this.$("#act-cancel-passcode").classList.add("is-hide")

            this.$("#act-pass-code").setAttribute("style", "display: none")

            setTimeout(() => {
                document.querySelector("#qk-nav-container").classList.remove("hidden")
                document.querySelector("#footer-container").classList.remove("hidden")
                window.location.hash = '#home';
            }, 200)
        })

        this.$("#act-cancel-passcode").addEventListener("click", e => {
            this.$(".auth-1").classList.remove("is-active")
            this.$(".auth-2").classList.remove("is-active")
            this.$(".auth-3").classList.remove("is-active")
            this.$(".auth-4").classList.remove("is-active")
            this.authCode = ""

            this.$("#act-apply-passcode").classList.add("is-hide")
            this.$("#act-cancel-passcode").classList.add("is-hide")
        })

        ipcRenderer.on("auth:success", (e, user) => {
            this.applicationKeySelected = true
            this.$("#act-logged-user").innerHTML = user.userFullname
            document.querySelector("#next-step").click()
            setTimeout(() => {
                this.$("#act-auth-error").classList.remove("is-active")
                document.querySelector("#act-pass-code").removeAttribute("style")
            }, 200)
        })

        ipcRenderer.on("auth:failed", (e, err) => {
            document.querySelector("#prev-step").click()
            setTimeout(() => {
                this.$("#act-auth-error").classList.add("is-active")
            }, 200)
        })
    }
}