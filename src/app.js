import { app,  BrowserWindow, Menu, ipcMain, dialog } from "electron"
import url from "url"
import path from "path"
import { IS_MAC, IS_PROD, electronReady, directoryRead, folderOpen } from "./common/process-core"
import fs from "fs"

const mainMenuTemplate = [
    {
        label: "File",
        submenu: [
            {
                label: "Open Image(s)"
            },
            {
                label: "Open Folder"
            },
            {
                label: "Quit",
                accelerator: IS_MAC ? "Command+Q" : "Ctrl+Q",
                click() {
                    app.quit()
                }
            }
        ]
    }
]

if(!IS_PROD) {
    mainMenuTemplate.push({
       label: "Developer tools",
       submenu: [
           {
               label: "Toggle DevTools",
               accelerator: IS_MAC ? "Command+I" : "Ctrl+I",
               click(item, focusedWindow) {
                   focusedWindow.toggleDevTools()
               }
           },
           {
               //reload
               role: 'reload'
           }
       ] 
    })
}

const onDirectoryRead = ({ directory, files}, mainWindow) => {
    files.filter(file => file.endsWith(".png") || file.endsWith(".jpg") || file.endsWith(".jpeg") )
        .forEach(file => mainWindow.webContents.send("file:read", `${directory}/${file}`))  
}

electronReady(app)
    .then(msg => {
        console.log(msg)

        let photoMainWindow = new BrowserWindow({})
        photoMainWindow.loadURL(url.format({
            pathname: path.join(__dirname, "browser", "photo-manager.html"),
            protocol: "file:",
            slashes: true
        }))

        photoMainWindow.maximize()

        let mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
        Menu.setApplicationMenu(mainMenu)

        ipcMain.on("nav:open-folder", e => {
            folderOpen(photoMainWindow, { properties: ["openDirectory"] })
                .then(directoryRead)
                .then(files => onDirectoryRead(files, photoMainWindow))
        })
    })