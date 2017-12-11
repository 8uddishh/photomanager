
import { activationComponent } from "./components/setup/activate-component"
import { homeComponent } from "./components/home/home-component"
import { settingsComponent } from "./components/settings/settings-component"
import { queuesComponent } from "./components/queues/queues-component"
import { notificationsComponent } from "./components/notifications/notifications-component"
import { dragdropComponent } from "./components/home/dragdrop-component"
import { navigationComponent } from "./components/ux/navigation-component"
import { loginComponent } from "./components/home/login-component"
import { ipcRenderer } from "electron"

let docReady = false
const $routeOutlet = document.querySelector("#photo-app")
let currentCpnt = {}
const routes = new Map([
    ["login", () => new loginComponent($routeOutlet, null)],
    ["home", () => new homeComponent($routeOutlet, document.querySelector("#btn-home"))],
    ["settings", () => new settingsComponent($routeOutlet, document.querySelector("#btn-settings"))],
    ["queues", () => new queuesComponent($routeOutlet, document.querySelector("#btn-queues"))],
    ["notifications", () => new notificationsComponent($routeOutlet, document.querySelector("#btn-notifications"))],
    ["dragdrop", () => new dragdropComponent($routeOutlet, document.querySelector("#btn-dragdrop"))]
])

const initRoutes = (usr) => {
    let cpnt = routes.get("login")()
    cpnt.settify()

    currentCpnt = cpnt
    document.querySelector("#qk-nav-container").classList.add("hidden")
    document.querySelector("#footer-container").classList.add("hidden")
    document.querySelector("#footer-setup-container").classList.add("hidden")
    let currRoute$ = document.querySelector(".route-filler.is-right")
    
   setTimeout(() => {
        currRoute$.classList.remove("is-route-slide",  "is-right")
    }, 300)
}

const initSetup = (applicationKeyInfo) => {
    document.querySelector("#qk-nav-container").classList.add("hidden")
    document.querySelector("#footer-container").classList.add("hidden")
    let activateCpnt = new activationComponent($routeOutlet, null)
    activateCpnt.applicationKey = applicationKeyInfo.applicationKey
    activateCpnt.applicationKeyHash = applicationKeyInfo.applicationKeyHash
    activateCpnt.settify()
}

let browserReady = () => {  
    ipcRenderer.on("start:app-ready", e => {
        initRoutes ()
    })
    ipcRenderer.send("browser:ready", { })
}

document.addEventListener("DOMContentLoaded", browserReady)
window.addEventListener("hashchange",(event) => {
    let prevRoute$ = document.querySelector(".route-filler")
    prevRoute$.classList.add("is-route-slide", "is-left")   
    document.querySelector("#qk-nav-container").classList.remove("hidden")
    document.querySelector("#footer-container").classList.remove("hidden")
    let hash = window.location.hash.substring(1)
    document.querySelector(".footer-icons .active").classList.remove("active")
    if(currentCpnt.unsettify)
        currentCpnt.unsettify()
    let cpnt = routes.get(hash)()
    cpnt.settify()
    let nextRoute$ = document.querySelector(".route-filler.is-right")
    currentCpnt = cpnt
    setTimeout(() => {
        prevRoute$.remove()
        nextRoute$.classList.remove("is-route-slide",  "is-right")
        
    }, 300)
})

document.querySelector("#browser-close").addEventListener("click", e => {
    ipcRenderer.send("app:close", { })
})


