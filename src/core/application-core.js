import shortid from "shortid"
import FormData from "form-data"
import { IS_MAC } from "./electron-core"

const formData = (file) => {
    var data = new FormData()
    data.append('photo', file.stream$, file.filename)

    return data
}

export class applicationContext {
    constructor(mainWindow, folderContext, fileContext, utilitiesContext) {
        this._mainWindow = mainWindow
        this._folderContext = folderContext
        this._fileContext = fileContext
        this._utilitiesContext = utilitiesContext
    }


    settify () {
        this.processDirectory = (directoryName) => (url) => {
            const fileListStreamFromDirectory$ = this._folderContext.directoryFiles$(directory)
                .sequence()
                .filter(this._utilitiesContext.isImagefile)
                .map(file => ({
                    filename: file,
                    fullfilename: IS_MAC ? `${directory}/${file}` : `${directory}\\${file}`,
                    shid: shortid.generate()
                }))
            
            const fileReadStream$ = fileListStreamFromDirectory$.observe()
                .map(file => ({
                    stream$: this._fileContext.fileRead$(file.fullfilename),
                    filename: file.filename,
                    fullfilename: file.fullfilename,
                    shid: file.shid
                }))

            const Webupload$ = fileReadStream$.observe().flatMap(file => {
                    return this._fileContext.fileUpload$(url)(formData(file))
                })

            Webupload$.each(response => {
                this._mainWindow.webContents.send("file:complete", { status: "success" })
            }).done(() => {
                    console.log("done")
            })
            
            fileReadStream$.each(file => {
            })
            
            fileListStreamFromDirectory$.each(file => {
                this._mainWindow.webContents.send("file:read", `${ IS_MAC ? encodeURI(file.fullfilename) 
                    :  file.fullfilename}`)
            })
        }
    }
}