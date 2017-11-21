import { homeComponent } from "./components/home/home-component"
import { settingsComponent } from "./components/settings/settings-component"
import { queuesComponent } from "./components/queues/queues-component"
import { notificationsComponent } from "./components/notifications/notifications-component"
import { dragdropComponent } from "./components/home/dragdrop-component"
import { navigationComponent } from "./components/ux/navigation-component"

const $routeOutlet = document.querySelector("#photo-app")
const routes = new Map([
    ["home", () => new homeComponent($routeOutlet, document.querySelector("#btn-home"))],
    ["settings", () => new settingsComponent($routeOutlet, document.querySelector("#btn-settings"))],
    ["queues", () => new queuesComponent($routeOutlet, document.querySelector("#btn-queues"))],
    ["notifications", () => new notificationsComponent($routeOutlet, document.querySelector("#btn-notifications"))],
    ["dragdrop", () => new dragdropComponent($routeOutlet, document.querySelector("#btn-dragdrop"))]
])

let browserReady = () => {
    let cpnt = routes.get("home")()
    cpnt.settify()

    let navCpnt = new navigationComponent(document.querySelector(".browser-qk-navs"), null)
    navCpnt.settify()
}

document.addEventListener("DOMContentLoaded", browserReady)
window.addEventListener("hashchange",(event) => {
    $routeOutlet.innerHTML = ""
    let hash = window.location.hash.substring(1)
    document.querySelector(".footer-icons .active").classList.remove("active")
    let cpnt = routes.get(hash)()
    cpnt.settify()
})


