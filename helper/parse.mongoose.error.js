exports.errorParser = function (err) {
    let msg = err.message;

    msg = msg.substring(msg.indexOf(':') + 1).trim().split(",").map(m => {
        m = m.trim();
        return m.split(":").map(_m => _m.trim())[1];
    });

    return msg.join("\n");

}