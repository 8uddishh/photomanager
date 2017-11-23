import { baseComponent } from './../base-component'
import { ipcRenderer } from "electron"

export class navigationComponent extends baseComponent {
    constructor($el, $link) {
        super($el, $link)
    }

    settifyTriggers() {
        this.$("#idx-folder-open").addEventListener("click", 
            e => ipcRenderer.send("nav:open-folder"))

        ipcRenderer.on("directory:firstselect", e => {
            this.$("#idx-run").removeAttribute("disabled")
        })

        this.$("#idx-run").addEventListener("click", e => {
            ipcRenderer.send("process:folder", { })
            this.$("#idx-run").setAttribute("disabled", "")
        })
    }
}