import { photoManageComponent } from "./components/photos/photo-manage-component"
import { navigationComponent } from "./components/common/navigation-component"

let browserReady = () => {
    let pmCpnt = new photoManageComponent(document.querySelector("#photo-app"))
    let navCpnt = new navigationComponent(document.querySelector(".vertical-menu"))
    pmCpnt.settify()
    navCpnt.settify()
}

document.addEventListener("DOMContentLoaded", browserReady)



