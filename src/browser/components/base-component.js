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
        console.log(this.$el)
        this.settifyTriggers()
        this.settifyWidgets()
    }
}