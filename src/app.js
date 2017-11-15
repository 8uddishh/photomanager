import { app,  BrowserWindow, Menu, ipcMain, dialog } from "electron"
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
import azurestr from 'azure-storage'

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

    const Webupload$ = fileReadStream$.observe().map(fs$ => ({
        seq: fs$.stream$,
        filename: fs$.filename,
        fullfilename: fs$.fullfilename,
        shid: fs$.shid
    }))

    Webupload$.each(file => {
        //console.log(new Date().getTime())
        file.seq.each(x => {

        })
    })

    fileReadStream$.each(file => {
       // console.log(file.shid)
    })

    fileListStreamFromDirectory$.each(file => {
        mainWindow.webContents.send("file:read", `${ IS_MAC ? encodeURI(file.fullfilename) 
            :  file.fullfilename}`)
    })
}

electronReady(app)
    .then(msg => {
        
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
                .then(processDirectory(photoMainWindow))
        })
    })