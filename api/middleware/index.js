const appMiddleware = require('./appLevel')

const constructorMethod = (app) => {
    appMiddleware.templateMiddleware(app)
}

module.exports = constructorMethod