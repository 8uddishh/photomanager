import fs from "fs"
import { dialog } from "electron"
import H from 'highland'
import axios from 'axios'

// Inferences
export const IS_MAC = process.platform == "darwin"
export const IS_PROD = process.env.NODE_ENV == "production" 

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

export const authorize = (data) => axios.post("http://127.0.0.1:5000/api/imageupload/token", data)



