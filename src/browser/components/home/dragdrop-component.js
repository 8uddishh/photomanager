import { baseComponent } from "./../base-component"

export class dragdropComponent extends baseComponent {

    constructor($el, $link) {
        super($el, $link)
        this.$el.innerHTML = this.$template
        this.$link.classList.add("active")
        document.querySelector("body").removeAttribute("class")
        document.querySelector("body").classList.add("dragdrop")
    }

    get $template(){
        return `  
    <div class="container header-container">
        <div class="is-uppercase">
            drag drop image(s) 
        </div>
    </div>
    <div class="container default-container dragdrop">
        <ul class="vertical-flow">
            <li>
                <div class="dropzone">
                    <div class="drag-drop-block">
                        <span class="fa fa-cloud fa-6x"></span>
                        <span class="fa fa-flash fa-4x"></span>
                        <div class="Drag drop-text">Drop your photo(s)</div>
                    </div>
                </div>
            </li>
          </ul>
    </div>
    <div class="container status-container">
    <div class="field is-grouped is-grouped-multiline">
        <div class="control">
          <div class="tags has-addons">
            <span class="tag is-info">Total</span>
            <span class="tag is-dark">0</span>
          </div>
        </div>
      
        <div class="control">
          <a class="button is-link is-outlined next-button">Next 
            <span class="icon is-small icon-right ">
            <i class="fa fa-chevron-right"></i>
            </span></a>
        </div>
      </div>
</div>`
    }
}