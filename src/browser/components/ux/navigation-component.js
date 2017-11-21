import { baseComponent } from './../base-component'
import { ipcRenderer } from "electron"

export class navigationComponent extends baseComponent {
    constructor($el, $link) {
        super($el, $link)
    }

    settifyTriggers() {
        this.$el.querySelector("#idx-folder-open").addEventListener("click", 
            e => ipcRenderer.send("nav:open-folder"))
    }
}