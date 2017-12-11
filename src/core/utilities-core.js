

export class utilitiesContext {
    constructor () {

    }

    settify () {
        this.isImagefile = file => file.endsWith(".png") || file.endsWith(".jpg") || file.endsWith(".jpeg")

        this.setTimeOut = (time) => new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true)
            }, time)
        })
    }
}