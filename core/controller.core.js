class Controller {
    constructor() {

    }

    resError(code, message, error) {
        if (typeof message == "string") {
            message = {
                success: false,
                code: code,
                message: message,
                error: error
            }
        }

        return res.status(code).json(message);
    }

    resSuccess(message) {
        if (typeof message == "string") {
            message = {
                success: false,
                code: code,
                message: message,
            }
        }

        return res.status(200).json(message);
    }
}

module.exports = new Controller();