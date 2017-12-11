import { app,  BrowserWindow, Menu, ipcMain, dialog, Tray } from "electron"
import url from "url"
import path from "path"
import { IS_MAC, electronReady, folderOpen } from "./core/electron-core"

// Start new
import { imageDbContext } from "./core/db-core"
import { folderConfigureContext } from "./core/folder-core"
import { fileContext } from "./core/file-core"
import { utilitiesContext } from "./core/utilities-core"

import { applicationContext } from "./core/application-core"



const queuedDirs = []
const assetsDirectory = path.join(__dirname, "browser", "assets")
const dbContext = new imageDbContext("photo-electron.json")


const toggleWindow = (window, tray) => {
    if (window.isVisible()) {
      window.hide()
    } else {
      showWindow(window, tray)
    }
  }

  // need separate implementation for mac
const getWindowPosition = (window, tray) => {
    const windowBounds = window.getBounds()
    const trayBounds = tray.getBounds()
    
    if (IS_MAC) {
        const xmac = Math.round(trayBounds.x - (windowBounds.width - 50))
        const ymac = Math.round(trayBounds.y - windowBounds.height)

        return {x: xmac, y: ymac}
    }

    const xwin = Math.round(trayBounds.x - (windowBounds.width - 50))
  
    const ywin = Math.round(trayBounds.y - windowBounds.height)
  
    return {x: xwin, y: ywin}
  }

const createTray = (window) => {
    let tray = new Tray(path.join(assetsDirectory, "images", "lens.png"))
    tray.on("right-click", e => {
        toggleWindow(window, tray)
    })

    tray.on("double-click", e => {
        toggleWindow(window, tray)
    })

    tray.on("click", e => {
        toggleWindow(window, tray)
    })

    const contextMenu = Menu.buildFromTemplate([
        {
            label: "Show/Hide Window",
            click: () => {
                toggleWindow(window, tray)
            }
        }, {
            label: "Toggle DevTools",
            accelerator: IS_MAC ? "Command+I" : "Ctrl+I",
            //type: 'radio',
            click: () => {
                showWindow(window, tray)
                window.toggleDevTools()
            }
        }, {
            label: 'Quit', 
            accelerator: IS_MAC ? "Command+Q" : "Ctrl+Q",
            //type: 'radio',
            click: () => {
                app.quit()
            }
        }
      ])

    tray.setToolTip('Gojiraaaaaaaaaaaa')
    tray.setContextMenu(contextMenu)
    return tray
}

const showWindow = (window, tray) => {
    const position = getWindowPosition(window, tray)
    window.setPosition(position.x, position.y, false)
    window.show()
    window.focus()
}
    
electronReady(app).then(msg => {
        
    let electronApp
    let photoMainWindow = new BrowserWindow({
        width: 375,
        height: 633,
        show: false,
        frame: false,
        fullscreenable: false,
        resizable: false,
        movable: true
    })

    // load application to chrome
    photoMainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "browser", "photo-manager.html"),
        protocol: "file:",
        slashes: true
    }))

    // window events
    photoMainWindow.on('blur', () => {
        // if (!photoMainWindow.webContents.isDevToolsOpened()) {
        //     photoMainWindow.hide()
        // }
    })

    // create Tray
    createTray (photoMainWindow)


    // Contexts
    let folderCtx = {}
    let fileCtx = {}
    let utilitiesCtx = {}
    let applicationCtx = {}


    // IPC event listeners
    //browser 
    ipcMain.on("browser:ready", e => {
        dbContext.init()
            .then(response => {
                folderCtx = new folderConfigureContext(dbContext)
                folderCtx.settify()
                fileCtx = new fileContext()
                fileCtx.settify()
                utilitiesCtx = new utilitiesContext()
                utilitiesCtx.settify()
                applicationCtx = new applicationContext(photoMainWindow, folderCtx, fileCtx, utilitiesCtx)
                applicationCtx.settify()
                photoMainWindow.webContents.send("start:app-ready", {})
            })
    })

    ipcMain.on("app:close", e => {
        photoMainWindow.hide()
    })

    // folder process
    // handle folder dialog cancel
    ipcMain.on("nav:open-folder", e => {
        folderOpen(photoMainWindow, { properties: ["openDirectory"] })
            .then(dir => {
                queuedDirs.push(dir)
                photoMainWindow.webContents.send("directory:firstselect", {})
            })
    })

    ipcMain.on("process:folder", e => {
        let next = queuedDirs.pop()
        applicationContext.processDirectory(next)("http://127.0.0.1:3000/photos/upload")
    })

    
    //folder settings
    ipcMain.on("folders:retrieve", e => {
        let folders = folderCtx.getFolders()
        photoMainWindow.webContents.send("st-folders:retrieved", folders)
        photoMainWindow.webContents.send("qu-folders:retrieved", folders)
    })

    ipcMain.on("folder:open", e => {
        folderOpen(photoMainWindow, { properties: ["openDirectory"] })
            .then(dir => {
                photoMainWindow.webContents.send("st-folder:selected", dir)
            })
    })

    ipcMain.on("folder:add", (e, folderInfo) => {
        var folder = dbContext.folders.find({
            "folderName": folderInfo.folderName
        })
        if(folder.length > 0) {
            photoMainWindow.webContents.send("st-folder:error", ["folder name already exists"])
        }
        else {
            folder = dbContext.folders.find({
                "folderPath": folderInfo.folderPath
            })

            if(folder.length > 0) {
                photoMainWindow.webContents.send("st-folder:error", ["folder path already mapped"])
            }
            else {
                folderCtx.createfolder(folderInfo, (newFolder) => {
                    photoMainWindow.webContents.send("st-folder:added", newFolder)
                })
            }
        }
    })

    ipcMain.on("folder:delete", (e, folderId) => {
        folderCtx.removeFolder(folderId, (folderId) => {
            photoMainWindow.webContents.send("st-folder:deleted", folderId)
        })
    })
})