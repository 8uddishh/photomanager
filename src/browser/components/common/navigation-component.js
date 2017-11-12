import { baseComponent } from './../base-component'
import { ipcRenderer } from "electron"

export class navigationComponent extends baseComponent {
    constructor($el) {
        super($el)
        this.openFolder = false
    }

    settifyTriggers() {
        this.$el.querySelector("#opn-folder").addEventListener("click", 
            e => ipcRenderer.send("nav:open-folder"))
    }
}