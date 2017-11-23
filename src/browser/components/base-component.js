export class baseComponent {
    
    constructor ($el, $link) {
        this.$el = $el
        this.$link = $link
        this.$ = (selector) => this.$el.querySelector(selector)
        this.$All = (selector) => this.$el.querySelectorAll(selector)
    }

    get $template (){
        return ""
    }

    settifyTriggers() { }
    settifyWidgets() { }

    settify () {
        this.settifyTriggers()
        this.settifyWidgets()
    }
}