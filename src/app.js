import { app,  BrowserWindow, Menu, ipcMain, dialog, Tray } from "electron"
import url from "url"
import path from "path"
import { 
            IS_MAC, IS_PROD, electronReady, folderOpen,
            directoryRead, directoryFiles$, isImagefile, fileRead$, fileUpload$
        } from "./common/process-core"
import fs from "fs"
import H from "highland"
import FormData from "form-data"
import axios from "axios"
import shortid from "shortid"


const assetsDirectory = path.join(__dirname, "browser", "assets")

const formData = (file) => {
    var data = new FormData()
    data.append('photo', file.stream$, file.filename)

    return data
}

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
  
    const x = Math.round(trayBounds.x - (windowBounds.width - 50))
  
    const y = Math.round(trayBounds.y - windowBounds.height)
  
    return {x: x, y: y}
  }

const createTray = (window) => {
    let tray = new Tray(path.join(assetsDirectory, "images", "Geography-128.png"))
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

const processDirectory = mainWindow => directory => {
    const fileListStreamFromDirectory$ = directoryFiles$(directory)
        .sequence()
        .filter(isImagefile)
        .map(file => ({
            filename: file,
            fullfilename: IS_MAC ? `${directory}/${file}` : `${directory}\\${file}`,
            shid: shortid.generate()
        }))
    
    const fileReadStream$ = fileListStreamFromDirectory$.observe()
                .map(file => ({
                    stream$: fileRead$(file.fullfilename),
                    filename: file.filename,
                    fullfilename: file.fullfilename,
                    shid: file.shid
                }))

    const Webupload$ = fileReadStream$.observe().flatMap(file => {
        return fileUpload$(formData(file))
    })

    Webupload$.each(response => {
        console.log(response.data)
    })

    fileReadStream$.each(file => {
       console.log(file.shid)
    })

    fileListStreamFromDirectory$.each(file => {
        mainWindow.webContents.send("file:read", `${ IS_MAC ? encodeURI(file.fullfilename) 
            :  file.fullfilename}`)
    })
}

electronReady(app)
    .then(msg => {
        
        let photoMainWindow = new BrowserWindow({
            width: 450,
            height: 650,
            show: false,
            frame: false,
            fullscreenable: false,
            resizable: false
        })

        photoMainWindow.loadURL(url.format({
            pathname: path.join(__dirname, "browser", "photo-manager.html"),
            protocol: "file:",
            slashes: true
        }))

        photoMainWindow.on('blur', () => {
            if (!photoMainWindow.webContents.isDevToolsOpened()) {
                photoMainWindow.hide()
            }
        })

        createTray (photoMainWindow)

        ipcMain.on("nav:open-folder", e => {
            folderOpen(photoMainWindow, { properties: ["openDirectory"] })
                .then(processDirectory(photoMainWindow))
        })
    })


/*

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
                   {   //reload
                       role: 'reload'
                   }
               ] 
            })
        }



    let mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
    Menu.setApplicationMenu(mainMenu)

*/