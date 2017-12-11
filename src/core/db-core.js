import loki from "lokijs"

export class model {
    constructor (db, cname, options) {
        this.collection = db.getCollection(cname) || db.addCollection(cname, options)
    }

    retrieve () {
        return this.collection.data
    }

    retrieveById (id) {
        return this.collection.get(id)
    }

    insert (obj) {
        return this.collection.insert( obj )
    }

    update (obj) {
        this.collection.update( obj )
    }

    remove (id) {
        this.collection.remove(id)
    }

    find (option) {
        return this.collection.find(option)
    }
}

export class applicationContext extends model {
    constructor(db) {
        super(db, "applications", {})
    }
}

export class profileContext extends model {    
    constructor(db) {
        super(db, "profiles", {})
    }
}

export class folderContext extends model {    
    constructor(db) {
        super(db, "folders", {
            indices: ["folderName", "folderPath"]
        })
    }
}

export class imageDbContext {

    constructor (filename) {
        this.db = new loki(filename, { persistenceMethod: "fs" })
    }

    init () {
        return new Promise((resolve, reject) => {
            this.db.loadDatabase({}, () => {
                this.profiles = new profileContext(this.db)
                this.applications = new applicationContext(this.db)
                this.folders = new folderContext(this.db)
                resolve(true)
            })
        })
    }

    saveDatabase () {
        this.db.saveDatabase()
    }
}