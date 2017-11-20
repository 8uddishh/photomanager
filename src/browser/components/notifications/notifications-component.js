import { baseComponent } from "./../base-component"

export class notificationsComponent extends baseComponent {

    constructor($el, $link) {
        super($el, $link)
        this.$el.innerHTML = this.$template
        this.$link.classList.add("active")
        document.querySelector("body").removeAttribute("class")
        document.querySelector("body").classList.add("notifications")
    }

    get $template(){
        return `  
        <div class="tabs is-toggle is-fullwidth">
            <ul>
                <li class="is-active is-uppercase"><a>All</a></li>
                <li class="is-uppercase"><a>Success</a></li>
                <li class="is-uppercase"><a>Error</a></li>
            </ul>
      </div>
      <div class="container default-container is-shadow notif">
        <ul class="vertical-flow">
            <li class="notification-item">
                <div class="pull-left">
                    <div class="title">
                        Image1.jpg
                    </div>
                </div>
                <figure class="image is-48x48 pull-right">
                    <img src="https://bulma.io/images/placeholders/128x128.png">
                </figure>
            </li>
            <li class="notification-item is-error">
                <div class="pull-left">
                    <div class="title">
                        Image2.jpg
                    </div>
                </div>
                <figure class="image is-48x48 pull-right">
                    <img src="https://bulma.io/images/placeholders/128x128.png">
                </figure>
            </li>
            <li class="notification-item">
                <div class="pull-left">
                    <div class="title">
                        Image3.jpg
                    </div>
                </div>
                <figure class="image is-48x48 pull-right">
                    <img src="https://bulma.io/images/placeholders/128x128.png">
                </figure>
            </li>
            <li class="notification-item">
                <div class="pull-left">
                    <div class="title">
                        Image4.jpg
                    </div>
                </div>
                <figure class="image is-48x48 pull-right">
                    <img src="https://bulma.io/images/placeholders/128x128.png">
                </figure>
            </li>
        </ul>
      </div>
    `
    }
}