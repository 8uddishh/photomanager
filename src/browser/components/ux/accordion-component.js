import { baseComponent } from './../base-component'


export class accordionComponent extends baseComponent {

    constructor($el, $link) {
        super($el, $link)
    }

    accordionSelect ($btn) {
       return e => {
           this.$(".is-active").classList.remove("is-active")
           $btn.closest(".dropdown").classList.add("is-active")
       }
    }

    settifyTriggers () {
        this.$All(".dropdown-trigger button")
            .forEach($btn => {
                $btn.addEventListener("click", this.accordionSelect($btn))
            })
    }
}