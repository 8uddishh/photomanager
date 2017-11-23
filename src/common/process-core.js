import fs from "fs"
import { dialog } from "electron"
import H from 'highland'
import axios from 'axios'

export const IS_MAC = process.platform == "darwin"
export const IS_PROD = process.env.NODE_ENV == "production" 

// Validators
export const isImagefile = file => file.endsWith(".png") || file.endsWith(".jpg") || file.endsWith(".jpeg")

// Buffers
export const directoryFiles$ = H.wrapCallback(fs.readdir)

export const fileRead$ = H.wrapCallback(fs.readFile)

export const fileUpload$ = (data) => H(axios.post("http://127.0.0.1:3000/photos/upload", data, {
    headers: {
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`
    }
}))

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

export const authorize = (data) => axios.post("http://127.0.0.1:3000/photos/auth", data)

