import { baseComponent } from "./../base-component"
import { ipcRenderer } from "electron"

export class photoManageComponent extends baseComponent {
    
    constructor($el) {
        super($el)
    }

    settifyTriggers() { 
        ipcRenderer.on("file:read", (e, file) => {
            const $li = document.createElement("li")
            $li.appendChild(document.createTextNode(file))
            this.$el.querySelector("#photo-list").appendChild($li)
        })
    }
}