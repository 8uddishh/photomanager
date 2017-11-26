
import { activationComponent } from "./components/setup/activate-component"
import { homeComponent } from "./components/home/home-component"
import { settingsComponent } from "./components/settings/settings-component"
import { queuesComponent } from "./components/queues/queues-component"
import { notificationsComponent } from "./components/notifications/notifications-component"
import { dragdropComponent } from "./components/home/dragdrop-component"
import { navigationComponent } from "./components/ux/navigation-component"
import { ipcRenderer } from "electron"

let docReady = false
const $routeOutlet = document.querySelector("#photo-app")
const routes = new Map([
    ["home", () => new homeComponent($routeOutlet, document.querySelector("#btn-home"))],
    ["settings", () => new settingsComponent($routeOutlet, document.querySelector("#btn-settings"))],
    ["queues", () => new queuesComponent($routeOutlet, document.querySelector("#btn-queues"))],
    ["notifications", () => new notificationsComponent($routeOutlet, document.querySelector("#btn-notifications"))],
    ["dragdrop", () => new dragdropComponent($routeOutlet, document.querySelector("#btn-dragdrop"))]
])

const initRoutes = (user) => {
    let cpnt = routes.get("home")()
    cpnt.settify()
    let navCpnt = new navigationComponent(document.querySelector(".browser-qk-navs"), null)
    navCpnt.settify()

    let currRoute$ = document.querySelector(".route-filler.is-right")
    
   setTimeout(() => {
        currRoute$.classList.remove("is-route-slide",  "is-right")
    }, 300)
}

const initSetup = (applicationKey) => {
    document.querySelector("#qk-nav-container").classList.add("hidden")
    document.querySelector("#footer-container").classList.add("hidden")
    let activateCpnt = new activationComponent($routeOutlet, null)
    activateCpnt.applicationKey = applicationKey
    activateCpnt.settify()
}

let browserReady = () => {  
    ipcRenderer.on("start:userExist", (e,user) => {
        initRoutes (user)
    })

    ipcRenderer.on("start:userNotExist", (e,applicationKey) => {
        initSetup (applicationKey)
    })

    ipcRenderer.send("browser:ready", { })
}

document.addEventListener("DOMContentLoaded", browserReady)
window.addEventListener("hashchange",(event) => {
    let prevRoute$ = document.querySelector(".route-filler")
    prevRoute$.classList.add("is-route-slide", "is-left")   

    let hash = window.location.hash.substring(1)
    document.querySelector(".footer-icons .active").classList.remove("active")
    let cpnt = routes.get(hash)()
    cpnt.settify()
    let nextRoute$ = document.querySelector(".route-filler.is-right")

    setTimeout(() => {
        prevRoute$.remove()
        nextRoute$.classList.remove("is-route-slide",  "is-right")
    }, 300)
})


