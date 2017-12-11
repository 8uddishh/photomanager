import fs from "fs"
import H from "highland"
import { IS_MAC } from "./process-core"

export class folderConfigureContext {

    constructor (dbContext) {
        this.dbContext = dbContext
    }

    settify () {
        this.folderCheckRead = (folder) => new Promise((resolve, reject) => {
            fs.readdir(folder, (err, files) => {
                if(err)
                    reject("no read")
                else
                    resolve("read")
            })
        })

        this.folderCheckWrite = (folder) => new Promise((resolve, reject) => {
            let fileName = IS_MAC ? `${folder}/electron-test.txt` : `${folder}\\electron-test.txt`
            fs.writeFile(fileName, "Hello electron", 'utf8', (err) => {
                if(err) 
                    reject("no write")  
                else 
                    resolve("write")
            })
        })

        this.folderCheckDelete = (folder) => new Promise((resolve, reject) => {
            fs.unlink(IS_MAC ? `${folder}/electron-test.txt` : `${folder}\\electron-test.txt`, (err) => {
                if(err)
                    reject("no delete")
                else 
                    resolve("delete")
            })
        })

        this.directoryFiles$ = H.wrapCallback(fs.readdir)
    }

    getFolders () {
        return this.dbContext.folders.retrieve()
    }

    createfolder (folderInfo, exec) {
        let create = (folderInfo, exec) => {
            let newFolder = this.dbContext.folders.insert(folderInfo)
            this.dbContext.saveDatabase()

            if(exec)
                exec(newFolder)
        }
        let folder = folderInfo.folderPath
        folderInfo.folderPermissions = []
        let permissions = []
        this.folderCheckRead(folder)
            .then(perm => {
                folderInfo.folderPermissions.push(perm)
                return this.folderCheckWrite(folder)
            }).then(perm => {
                folderInfo.folderPermissions.push(perm)
                return this.folderCheckDelete(folder)
            }).then(perm => {
                folderInfo.folderPermissions.push(perm)
                create(folderInfo, exec)
            }).catch(err => {
                if(folderInfo.folderPermissions.length > 0) {
                    create(folderInfo, exec)
                }
            })
    }

    removeFolder (folderId, exec) {
        this.dbContext.folders.remove(parseInt(folderId.trim()))
        this.dbContext.saveDatabase()

        if(exec)
            exec(folderId)
    }
}