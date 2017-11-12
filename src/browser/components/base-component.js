export class baseComponent {
    
    constructor ($el) {
        this.$el = $el
    }

    settifyTriggers() { }
    settifyWidgets() { }

    settify () {
        console.log(this.$el)
        this.settifyTriggers()
        this.settifyWidgets()
    }
}