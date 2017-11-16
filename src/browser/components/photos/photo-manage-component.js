import { baseComponent } from "./../base-component"
import { ipcRenderer } from "electron"
import Croppie from "croppie"

export class photoManageComponent extends baseComponent {
    
    constructor($el) {
        super($el)

        this.imageTemplate = (file, ...figureClasses) => `<figure class="${figureClasses.reduce((curr, next) => `${curr} ${next}`)}">
                <img src = "${`file://${file}`}" />
            </figure>`
        this.croppie = new Croppie($el.querySelector("#selectedImage"), {
            viewport: {
                width: 640,
                height: 480
            }
        })
    }

    onImageSelect (e) {
        let src = e.target.getAttribute("src")
        this.croppie.bind(src)
    }

    addImage (file) {
        const $li = document.createElement("li")
        $li.innerHTML = this.imageTemplate(file, "image", "is-128x128")
        $li.querySelector("img").addEventListener("click", this.onImageSelect.bind(this))
        this.$el.querySelector("#photo-list").appendChild($li)
    }

    settifyTriggers() { 
        ipcRenderer.on("file:read", (e, file) => {
            console.log(new Date().getTime())
            this.addImage(file)
        })
    }
}