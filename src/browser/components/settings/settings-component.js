import { baseComponent } from "./../base-component"

export class settingsComponent extends baseComponent {

    constructor($el, $link) {
        super($el, $link)
        this.$el.innerHTML = this.$template
        this.$link.classList.add("active")
        document.querySelector("body").removeAttribute("class")
        document.querySelector("body").classList.add("settings")
    }

    get $template(){
        return `
        <div class="dropdown accordion is-active">
        <div class="dropdown-trigger">
          <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
            <div class="is-uppercase">folder(s) configuration</div>
            <div class="icon">
              <a class="button is-link">Add</a>
            </div>
            <div class="icon">
              <i class="fa fa-angle-down" aria-hidden="true"></i>
            </div>
          </button>
        </div>
        <div class="dropdown-menu is-shadow" id="dropdown-menu" role="menu">
        <ul class="dropdown-content vertical-flow">
          <li class="dropdown-item">
          Folder #1 <a class="button icon remove" ><i class="fa fa-minus-circle"></i></a>
          </li>
          <li class="dropdown-item">
          Folder #2 <a class="button icon remove" ><i class="fa fa-minus-circle"></i></a>
          </li>
        </ul>
        </div>
      </div>

      <div class="dropdown accordion is-active">
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
    </div>

    <div class="dropdown accordion is-active">
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
         <input checked type="checkbox">
         <span class="lever"></span>
         On
       </label>
     </div>
      </li>
    </ul>
    </div>
  </div>

  <div class="dropdown accordion is-active">
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
    `
    }
}