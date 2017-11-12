import fs from "fs"

export const IS_MAC = process.platform == "darwin"
export const IS_PROD = process.env.NODE_ENV == "production" 
import { dialog } from "electron"

// promises
export const electronReady = (app) => new Promise((resolve, reject) => {
    app.on("ready", () => {
        resolve("Electron has started...")
    })
})

export const directoryRead = (directory) => new Promise((resolve, reject) => {
    fs.readdir(directory, {}, (err, files) => {
        console.log(directory)
        if(err)
            reject(err)
        else 
            resolve(files)
    })
})

