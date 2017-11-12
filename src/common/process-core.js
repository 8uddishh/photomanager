import fs from "fs"
import { dialog } from "electron"
import H from 'highland'

export const IS_MAC = process.platform == "darwin"
export const IS_PROD = process.env.NODE_ENV == "production" 

// Validators
export const isImagefile = file => file.endsWith(".png") || file.endsWith(".jpg") || file.endsWith(".jpeg")

// Buffers
export const directoryFiles$ = H.wrapCallback(fs.readdir)


// Promises
export const electronReady = (app) => new Promise((resolve, reject) => {
    app.on("ready", () => {
        resolve("Electron has started...")
    })
})

export const folderOpen = (window, options) => new Promise((resolve, reject) => {
    dialog.showOpenDialog(window, options, directories => {
        resolve(directories[0])
    })
})

