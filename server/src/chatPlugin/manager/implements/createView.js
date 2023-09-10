const { getConnect } = require("../../../eventSocket")

module.exports = function (session, parameter, callback) {
    console.log("调用了 createChart", session, parameter);
    const connect = getConnect(session)
    if (connect) {
        const message = JSON.stringify({
            type: "event",
            name: "createView",
            parameter
        })
        connect.send(message)
    }
}