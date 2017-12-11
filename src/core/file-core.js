import fs from "fs"
import H from "highland"
import axios from "axios"

export class fileContext {
    constructor () { 
    }

    settify () {
        this.fileRead$ = H.wrapCallback(fs.readFile)
        this.fileUpload$ = (url) => (data) => (axios.post("http://127.0.0.1:3000/photos/upload", data, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`
            }
        }))
    }

}