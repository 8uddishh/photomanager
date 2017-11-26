import loki from "lokijs"

export class model {
    constructor (db, cname) {
        this.collection = db.getCollection(cname) || db.addCollection(cname)
    }

    retrieve () {
        return this.collection.data
    }

    retrieveById (id) {
        return this.collection.get(id)
    }

    insert (obj) {
        this.collection.insert( obj )
    }

    update (obj) {
        this.collection.update( obj )
    }

    remove (id) {
        this.collection.remove(id)
    }
}

export class profileContext extends model {    
    constructor(db) {
        super(db, "profiles")
    }
}

export class testContext extends model {
    constructor(db) {
        super(db, "test")
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
                resolve(true)
            })
        })
    }

    saveDatabase () {
        this.db.saveDatabase()
    }
}