import { baseComponent } from "./../base-component"

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
                            <a class="button pull-right" id="select-auth-code" ><i class="fa fa-copy"></i></a>
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
                                Paste the auth code in the textbox below and click 'Authenticate'
                            </p>
                            <div class="field">
                                <div class="control">
                                <input class="input is-info" type="password" placeholder="Info input">
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        `
    }
    constructor($el, $link) {
        super($el, $link)
        console.log(this.$template)
        this.$el.innerHTML = this.$template
        document.querySelector("body").removeAttribute("class")
        document.querySelector("body").classList.add("activate")
        this.currentSlide = 0
        this.slides = [ "#act-hello", "#act-step-1", "#act-step-2", "#act-step-3" ]
        this.applicationKeySelected = false
    }

    settifyTriggers () {
        document.querySelector("#prev-step").classList.add("hidden")

        document.querySelector("#next-step").addEventListener("click", e => {
            if(!e.target.hasAttribute("disabled")) {
                this.$el.querySelector(this.slides[this.currentSlide]).classList.remove("is-active")
                this.$el.querySelector(this.slides[this.currentSlide]).classList.add("is-slide", "is-left")
    
                this.currentSlide++
                
                this.$el.querySelector(this.slides[this.currentSlide]).classList.remove("is-slide", "is-left", "is-right")
                this.$el.querySelector(this.slides[this.currentSlide]).classList.add("is-active")
    
                if(this.currentSlide == this.slides.length - 1)
                    document.querySelector("#next-step").classList.add("hidden")
                
                document.querySelector("#prev-step").classList.remove("hidden")
    
                if(this.currentSlide == 2 && !this.applicationKeySelected)
                    document.querySelector("#next-step").setAttribute("disabled", "")
                else 
                    document.querySelector("#next-step").removeAttribute("disabled")
            }
        })

        document.querySelector("#prev-step").addEventListener("click", e => {
            this.$el.querySelector(this.slides[this.currentSlide]).classList.remove("is-active")
            this.$el.querySelector(this.slides[this.currentSlide]).classList.add("is-slide", "is-right")

            this.currentSlide--
            
            this.$el.querySelector(this.slides[this.currentSlide]).classList.remove("is-slide", "is-left", "is-right")
            this.$el.querySelector(this.slides[this.currentSlide]).classList.add("is-active")

            if(this.currentSlide == 0)
                document.querySelector("#prev-step").classList.add("hidden")

            document.querySelector("#next-step").classList.remove("hidden")
        })

        this.$el.querySelector("#select-auth-code").addEventListener("click", e => {
            this.applicationKeySelected = true
            this.$el.querySelector("#select-auth-code").classList.add("is-active")
            document.querySelector("#next-step").removeAttribute("disabled")
        })
    }
}