import { baseComponent } from "./../base-component"
import { accordionComponent } from "./../ux/accordion-component"

export class queuesComponent extends baseComponent {

    constructor($el, $link) {
        super($el, $link)
        this.$el.innerHTML = this.$template
        this.$link.classList.add("active")
        document.querySelector("body").removeAttribute("class")
        document.querySelector("body").classList.add("queues")
    }

    get $template(){
        return `
        <div id="settings-accordion" class="accordion">
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
      <ul class="dropdown-content vertical-flow">
        <li class="dropdown-item">
            <div class="pull-left">
            <div class="title">
                Folder # 1
            </div>
            <div class="subtitle is-uppercase">
                read write delete
            </div>
            </div>
            <a class="button icon run pull-right" ><i class="fa fa-play-circle"></i></a>
        </li>
        <li class="dropdown-item">
            <div class="pull-left">
            <div class="title">
            Folder # 2
            </div>
            <div class="subtitle is-uppercase">
            read write delete
            </div>
            </div>
            <a class="button icon run pull-right" ><i class="fa fa-play-circle"></i></a>
        </li>
      </ul>
      </div>
    </div>
      </div>`
    }

    settifyWidgets () {
        this.accordion = new accordionComponent(this.$("#settings-accordion"))
        this.accordion.settify()
      }
}