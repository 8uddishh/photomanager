import { baseComponent } from './../base-component'

export class modalComponent extends baseComponent {

    constructor($el, $link) {
        super($el, $link)
    }

    show() {
        this.$el.classList.add("is-active")
    }

    hide() {
        this.$el.classList.add("m-off")
        setTimeout(() => {
            this.$el.classList.remove("is-active")
            this.$el.classList.remove("m-off")
        }, 1500)
        
    }

    settifyTriggers () {
    }
}