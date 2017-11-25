export class baseComponent {
    
    constructor ($el, $link) {
        this.$el = $el
        this.$link = $link
        this.$ = (selector) => this.$el.querySelector(selector)
        this.$All = (selector) => this.$el.querySelectorAll(selector)

        if(this.$template) {
            var container$ = document.createElement('div')
            container$.innerHTML = this.$template
            this.$el.appendChild(container$.querySelector(".route-filler"))
            if(this.$link)
                this.$link.classList.add("active")
            document.querySelector("body").removeAttribute("class")
        }  
    }

    get $template (){
        return null
    }

    settifyTriggers() { }
    settifyWidgets() { }

    settify () {
        this.settifyTriggers()
        this.settifyWidgets()
    }
}