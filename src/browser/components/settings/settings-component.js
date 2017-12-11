import { baseComponent } from "./../base-component"
import { accordionComponent } from "./../ux/accordion-component"
import { modalComponent } from "./../ux/modal-component"
import { ipcRenderer } from "electron"

export class settingsComponent extends baseComponent {

    constructor($el, $link) {
        super($el, $link)
        this.folderTemplate = (folderInfo) => `
          <div class="pull-left">
            <div class="title is-capitalized">
              ${folderInfo.folderName}
            </div>
            <div class="subtitle is-uppercase">
              ${folderInfo.folderPermissions.reduce((curr, next) => `${curr} ${next}`)}
            </div>
          </div>
          <a class="button icon remove pull-right" folder-id=${folderInfo.$loki} ><i class="fa fa-minus-circle"></i></a>
        `
        document.querySelector("body").classList.add("settings")
    }

    get $template(){
        return `
        <div class="route-filler is-route-slide is-right">
        <div id="settings-accordion" class="accordion">
          <div class="dropdown is-active">
            <div class="dropdown-trigger">
              <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                <div class="is-uppercase">folder(s) configuration</div>
                <div class="icon">
                  <a id="btn-conf-folder" class="button is-link">Add</a>
                </div>
                <div class="icon">
                  <i class="fa fa-angle-down" aria-hidden="true"></i>
                </div>
              </button>
            </div>
            <div class="dropdown-menu is-shadow" id="dropdown-menu" role="menu">
            <ul id="conf-folder-list" class="dropdown-content vertical-flow">
              <li class="dropdown-item no-folders">
                <div class="pull-left">
                <div class="title">
                  No configured folder(s)
                </div>
              </li>
            </ul>
            </div>
          </div>

          <!--<div class="dropdown accordion">
          <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
              <div class="is-uppercase" style="width:73%">security settings</div>
              <div class="icon">
                <a class="button is-link">Change auth code</a>
              </div>
              <div class="icon">
                <i class="fa fa-angle-down" aria-hidden="true"></i>
              </div>
            </button>
          </div>
          <div class="dropdown-menu is-shadow" id="dropdown-menu" role="menu">
            <ul class="dropdown-content vertical-flow">
              <li class="dropdown-item">
              Authorization status
              <span class="tag is-success">Registered</span>
              <span class="tag is-danger" style="display:none">Expired</span>
              </li>
            </ul>
          </div>
        </div>-->

        <div class="dropdown accordion">
        <div class="dropdown-trigger">
          <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
            <div class="is-uppercase">notifications</div>
            <div class="icon">
              <i class="fa fa-angle-down" aria-hidden="true"></i>
            </div>
          </button>
        </div>
        <div class="dropdown-menu is-shadow" id="dropdown-menu" role="menu">
        <ul class="dropdown-content vertical-flow">
          <li class="dropdown-item">
          Show live notifications
          <div class="switch is-pulled-right">
          <label>
            Off
            <input id="conf-live-nofication" type="checkbox">
            <span class="lever"></span>
            On
          </label>
        </div>
          </li>
        </ul>
        </div>
      </div>

      <div class="dropdown accordion">
      <div class="dropdown-trigger">
        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
          <div class="is-uppercase">diagnostics</div>
          <div class="icon">
            <i class="fa fa-angle-down" aria-hidden="true"></i>
          </div>
        </button>
      </div>
      <div class="dropdown-menu is-shadow" id="dropdown-menu" role="menu">
        <ul class="dropdown-content vertical-flow">
          <li class="dropdown-item">
          Diagonise the tool <a class="button icon diagonize" ><i class="fa fa-flask"></i></a>
          </li>
        </ul>
      </div>
    </div>
    </div>
    
    <div id="conf-folder-modal" class="modal">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
        </header>
        <section class="modal-card-body">
        <article class="message is-danger is-hidden">
          <div class="message-body">
            <ul id="conf-folder-error">

            </ul>
          </div>
        </article>
          <div class="field">
            <label class="label is-uppercase">Name</label>
            <div class="control">
              <input class="input" id="txt-conf-folder-name" type="text" placeholder="Folder Name">
            </div>
          </div>
          <div class="field">
            <label class="label is-uppercase">Folder path</label>
            <div class="field has-addons">
              <div class="control" style="width:280px">
                <input class="input" id="txt-conf-folder-path" type="text" placeholder="Find a folder">
              </div>
              <div class="control">
                <a class="button is-info" id="btn-conf-folder-select"><i class="fa fa-folder-open-o"></i></a>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <div class="columns is-mobile is-buttons">
            <div class="column">
            <button id="btn-conf-save-folder" class="button is-block"><i class="fa fa-save"></i> Save</button>
            </div>
            <div class="column">
            <button id="btn-conf-cancel-folder" class="button is-block"><i class="fa fa-ban"></i> Cancel</button>
            </div>
          </div>
        </footer>
      </div>
    </div>
    
    </div>
    `
    }

    addFolderConfig (folderInfo) {
      this.$("#conf-folder-list .no-folders").classList.add("is-hidden")
      let template = this.folderTemplate(folderInfo)
      let $li = document.createElement("li")
      $li.classList.add("dropdown-item", "restored-item")
      $li.innerHTML = template
      $li.querySelector(".remove").addEventListener("click", e => {
        ipcRenderer.send("folder:delete", e.currentTarget.getAttribute("folder-id"))
      })
      this.$("#conf-folder-list").appendChild($li)
      if(this.$All("#conf-folder-list li").length > 5)
        this.$("#btn-conf-folder").classList.add("is-hidden")
    }

    addFolderConfigError (error) {
      let $li = document.createElement("li")
      $li.innerHTML = error
      $li.classList.add("is-capitalized")
      this.$("#conf-folder-error").appendChild($li)

      if(this.$("#conf-folder-modal .message.is-danger.is-hidden"))
        this.$("#conf-folder-modal .message.is-danger.is-hidden").classList.remove("is-hidden")
    }

    clearfolderConfigErrors () {
      this.$All("#conf-folder-error li").forEach($li => {
        $li.remove()
      })
      this.$("#conf-folder-modal .message.is-danger").classList.add("is-hidden")
    }

    clearFolderSetupModal () {
      this.clearfolderConfigErrors()
      this.$("#txt-conf-folder-name").value = ""
      this.$("#txt-conf-folder-path").value = ""
    }

    settifyWidgets () {
      this.accordion = new accordionComponent(this.$("#settings-accordion"))
      this.accordion.settify()

      this.folderModal = new modalComponent(this.$("#conf-folder-modal"))
      this.folderModal.settify()
    }

    settifyTriggers () {
      
      ipcRenderer.on("st-folders:retrieved", (e, folders) => {
        folders.forEach(folderInfo => {
          this.addFolderConfig(folderInfo)
        })
      })

      this.$("#conf-live-nofication").addEventListener("change", e => {
        console.log(e.target.checked)
      })

      this.$("#btn-conf-folder").addEventListener("click", e => {
        this.folderModal.show()
      })

      this.$("#btn-conf-folder-select").addEventListener("click", e => {
        ipcRenderer.send("folder:open", {})
      })

      this.$("#btn-conf-save-folder").addEventListener("click", e => {
        let errs = []
        if(!this.$("#txt-conf-folder-name").value || this.$("#txt-conf-folder-name").value.trim() == "")
          errs.push("folder name is required")
        if(!this.$("#txt-conf-folder-path").value || this.$("#txt-conf-folder-path").value.trim() == "")
          errs.push("folder path is required")

        if(errs.length < 1) {
          ipcRenderer.send("folder:add", {
            folderName: this.$("#txt-conf-folder-name").value.toLowerCase(),
            folderPath: this.$("#txt-conf-folder-path").value.toLowerCase()
          })
        }
        else {
          errs.forEach(error => {
            this.addFolderConfigError(error)
          })
        }
      })

      this.$("#btn-conf-cancel-folder").addEventListener("click", e => {
        this.folderModal.hide()
        this.clearFolderSetupModal()
      })

      ipcRenderer.on("st-folder:selected", (e, dir) => {
        this.$("#txt-conf-folder-path").value = dir
      })

      ipcRenderer.on("st-folder:added", (e, folderInfo) => {
        this.addFolderConfig(folderInfo)
        this.folderModal.hide()
        this.clearFolderSetupModal()
      })

      ipcRenderer.on("st-folder:error", (e, errors) => {
        this.clearfolderConfigErrors()
        errors.forEach(error => {
          this.addFolderConfigError(error)
        })
      })

      ipcRenderer.send("folders:retrieve", {})

      ipcRenderer.on("st-folder:deleted", (e, folderId) => {
        let $li = this.$(`#conf-folder-list a[folder-id='${folderId}']`)
          .closest("li")
        $li.classList.remove("restored-item")
        $li.classList.add("removed-item")  
        setTimeout(() => {
          $li.remove()
          if(this.$All("#conf-folder-list li").length <= 1)
            this.$(".no-folders").classList.remove("is-hidden")
        }, 500)
      })
    }

    unsettifyTriggers () {
      console.log("removing listener")
      ipcRenderer.removeAllListeners("st-folder:selected")
      ipcRenderer.removeAllListeners("st-folder:added")
      ipcRenderer.removeAllListeners("st-folder:error")
      ipcRenderer.removeAllListeners("st-folder:deleted")
      ipcRenderer.removeAllListeners("st-folders:retrieved")
    }
}