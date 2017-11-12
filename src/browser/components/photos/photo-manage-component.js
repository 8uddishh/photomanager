import { baseComponent } from "./../base-component"
import { ipcRenderer } from "electron"

export class photoManageComponent extends baseComponent {
    
    constructor($el) {
        super($el)
    }

    addImage (file) {
        const figureClasses = ["image", "is-128x128"]
        const $li = document.createElement("li")
        const $figure = document.createElement("figure")
        $figure.classList.add(...figureClasses)
        const $img = document.createElement("img")
        $img.setAttribute("src", encodeURI(`file://${file}`))
        $figure.appendChild($img)
        $li.appendChild($figure)
        this.$el.querySelector("#photo-list").appendChild($li)
    }

    settifyTriggers() { 
        ipcRenderer.on("file:read", (e, file) => {
            this.addImage(file)
        })
    }
}