import { baseComponent } from "./../base-component"
import { accordionComponent } from "./../ux/accordion-component"
import { ipcRenderer } from "electron"

export class queuesComponent extends baseComponent {

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
        <a class="button icon run pull-right" folder-id=${folderInfo.$loki}><i class="fa fa-play-circle"></i></a>
      `
        document.querySelector("body").classList.add("queues")
    }

    get $template(){
        return `
        <div class="route-filler is-route-slide is-right">
        <div id="queues-accordion" class="accordion">
        <div class="dropdown is-active">
          <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
              <div class="is-uppercase">folder(s) in queue</div>
              <div class="icon">
                <i class="fa fa-angle-down" aria-hidden="true"></i>
              </div>
            </button>
          </div>
          <div class="dropdown-menu is-shadow" id="dropdown-menu" role="menu">
          <ul class="dropdown-content vertical-flow in-progress-queues">
            <li class="dropdown-item">
              <div class="pull-left">
                <div class="title padding-before-progress">
                  Folder # 1
                  <span class="tag is-danger">3/100</span>
                  <span class="tag is-success">7/100</span>
                </div>
                <div class="subtitle">
                    <progress class="progress is-success" value="15" max="100">30%</progress>
                </div>
              </div>
            </li>
            <li class="dropdown-item">
              <div class="pull-left">
              <div class="title padding-before-progress">
                Folder # 2
              </div>
              <div class="subtitle">
                <progress class="progress is-success" value="15" max="100">30%</progress>
              </div>
              </div>
              <a class="button icon remove pull-right" ><i class="fa fa-minus-circle"></i></a>
            </li>
            <li class="dropdown-item">
            <div class="pull-left">
            <div class="title padding-before-progress">
              Folder # 3
            </div>
            <div class="subtitle">
              <progress class="progress is-success" value="15" max="100">30%</progress>
            </div>
            </div>
            <a class="button icon remove pull-right" ><i class="fa fa-minus-circle"></i></a>
          </li>
          </ul>
          </div>
        </div>

        <div class="dropdown accordion">
        <div class="dropdown-trigger">
          <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
            <div class="is-uppercase">completed folder(s)</div>
            <div class="icon">
              <i class="fa fa-angle-down" aria-hidden="true"></i>
            </div>
          </button>
        </div>
        <div class="dropdown-menu is-shadow" id="dropdown-menu" role="menu">
          <ul class="dropdown-content vertical-flow processed-queue">
            <li class="dropdown-item">
                <div class="pull-left">
                    <div class="title">
                    Folder # 1
                    <span class="tag is-danger">30/100</span>
                    <span class="tag is-success">70/100</span>
                    </div>
                    <div class="subtitle is-uppercase">
                        today
                    </div>
                </div>
            </li>
            <li class="dropdown-item">
            <div class="pull-left">
                <div class="title">
                Folder # 2
                <span class="tag is-danger">30/100</span>
                <span class="tag is-success">70/100</span>
                </div>
                <div class="subtitle is-uppercase">
                    06/15/2017 09:15 am
                </div>
            </div>
        </li>
          </ul>
        </div>
      </div>

      <div class="dropdown accordion">
      <div class="dropdown-trigger">
        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
          <div class="is-uppercase">saved folder(s)</div>
          <div class="icon">
            <i class="fa fa-angle-down" aria-hidden="true"></i>
          </div>
        </button>
      </div>
      <div class="dropdown-menu is-shadow" id="dropdown-menu" role="menu">
      <ul id="qus-folder-list" class="dropdown-content vertical-flow">
        <li class="dropdown-item no-folders">
          <div class="pull-left">
          <div class="title">
            No configured folder(s)
          </div>
        </li>
      </ul>
      </div>
    </div>
      </div></div>`
    }

    addFolderConfig (folderInfo) {
      this.$("#qus-folder-list .no-folders").classList.add("is-hidden")
      let template = this.folderTemplate(folderInfo)
      let $li = document.createElement("li")
      $li.classList.add("dropdown-item")
      $li.innerHTML = template
      $li.querySelector(".run").addEventListener("click", e => {
        //ipcRenderer.send("folder:run", e.currentTarget.getAttribute("folder-id"))
      })
      this.$("#qus-folder-list").appendChild($li)
    }

    settifyWidgets () {
        this.accordion = new accordionComponent(this.$("#queues-accordion"))
        this.accordion.settify()
    }

    settifyTriggers () {

      ipcRenderer.on("qu-folders:retrieved", (e, folders) => {
        folders.forEach(folderInfo => {
          this.addFolderConfig(folderInfo)
        })
      })

      ipcRenderer.send("folders:retrieve", {})
    }

    unsettifyTriggers () {
      console.log("removing listener")
      ipcRenderer.removeAllListeners("qu-folders:retrieved")
    }
}