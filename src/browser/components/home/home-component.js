import { baseComponent } from "./../base-component"
import { ipcRenderer } from "electron"

export class homeComponent extends baseComponent {

    constructor($el, $link) {
        super($el, $link)
        document.querySelector("body").classList.add("home")

        this.fileProcessed = {
            total: 0,
            success: 0,
            error: 0
        }
    }

    get $template(){
        return `  
        <div class="route-filler is-route-slide is-right">
    <div class="container header-container">
        <div class="is-uppercase">
            upload options
        </div>
    </div>
    <div class="container default-container is-shadow">
        <ul class="vertical-flow">
            <li>
                <input class="with-gap" id="upld-by-file-name" name="upload-option" type="radio" checked>
                <label for="upld-by-file-name">Identify Items By File Name</label>
            </li>
            <li>
                <input class="with-gap" disabled id="upld-by-bar-code" name="upload-option" type="radio">
                <label for="upld-by-bar-code">Identify Items By Bar code</label>
            </li>
            <li>
                <input class="with-gap" id="upld-by-exif" name="upload-option" type="radio">
                <label for="upld-by-exif">Identify Items By Exif Meta Data</label>
            </li>
            <li>
                <input class="with-gap" id="upld-aft-crop" name="upload-option" type="radio">
                <label for="upld-aft-crop">Enable Crop/Resize</label>
            </li>
          </ul>
    </div>
    <div class="container header-container">
        <div class="is-uppercase">
            upload to
        </div>
    </div>
    <div class="container default-container is-shadow">
        <ul class="vertical-flow">
          <li>
              <input class="with-gap" id="idn-by-sku" name="identifier-option" type="radio" checked>
              <label for="idn-by-sku">Identifier is SKU</label>
          </li>
          <li>
              <input class="with-gap" disabled id="idn-by-dtid" name="identifier-option" type="radio">
              <label for="idn-by-dtid">Identifier is DTID</label>
          </li>
          <li>
              <input class="with-gap" id="idn-by-lot" name="identifier-option" type="radio">
              <label for="idn-by-lot">Identifier is LOT</label>
          </li>
        </ul>
    </div>
    <div class="container status-container">
        <div class="field is-grouped is-grouped-multiline">
            <div class="control">
              <div class="tags has-addons">
                <span class="tag is-info">Total</span>
                <span class="tag is-dark" id="spn-total">0</span>
              </div>
            </div>
          
            <div class="control">
              <div class="tags has-addons">
                <span class="tag is-success">Success</span>
                <span class="tag is-dark" id="spn-success">0</span>
              </div>
            </div>
          
            <div class="control">
              <div class="tags has-addons">
                <span class="tag is-danger">Failed</span>
                <span class="tag is-dark" id="spn-error">0</span>
              </div>
            </div>
          </div>
    </div>
    </div>`
    }

    settifyTriggers () {

        ipcRenderer.on("file:complete", e => {
            this.fileProcessed.success++
            this.$("#spn-success").innerHTML = this.fileProcessed.success
        })
    }
}