import { baseComponent } from './../base-component'
import { ipcRenderer } from "electron"

export class navigationComponent extends baseComponent {
    constructor($el, $link) {
        super($el, $link)
    }

    settifyTriggers() {
        this.$el.querySelector("#idx-folder-open").addEventListener("click", 
            e => ipcRenderer.send("nav:open-folder"))

        ipcRenderer.on("directory:firstselect", e => {
            this.$el.querySelector("#idx-run").removeAttribute("disabled")
        })

        this.$el.querySelector("#idx-run").addEventListener("click", e => {
            ipcRenderer.send("process:folder", { })
            this.$el.querySelector("#idx-run").setAttribute("disabled", "")
        })
    }
}