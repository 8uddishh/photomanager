export class baseComponent {
    
    constructor ($el, $link) {
        this.$el = $el
        this.$link = $link
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