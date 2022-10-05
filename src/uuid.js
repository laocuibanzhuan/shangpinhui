const { v4 } = require('uuid')
export var uuidToken = (() => {
    let token = localStorage.getItem('UUIDTOKEN')
    if (!token) {
        uuidToken = v4()
        localStorage.setItem('UUIDTOKEN', uuidToken)
        return uuidToken
    } else {
        return token
    }
})()