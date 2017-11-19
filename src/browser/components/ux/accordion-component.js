import { baseComponent } from './../base-component'


export class accordionComponent extends baseComponent {

    constructor($el, $link) {
        super($el, $link)
    }

    accordionSelect ($btn) {
       return e => {
           this.$el.querySelector(".is-active").classList.remove("is-active")
           $btn.closest(".dropdown").classList.add("is-active")
       }
    }

    settifyTriggers () {
        this.$el.querySelectorAll(".dropdown-trigger button")
            .forEach($btn => {
                $btn.addEventListener("click", this.accordionSelect($btn))
            })
    }
}