let notFoundHandler = require('./notFoundHandler.middleware');
let {authHandler} = require('./authHandler.middleware');
let middleware = {
    notFoundHandler: notFoundHandler,
    authHandler: authHandler,
}

module.exports=middleware