const { connect } = require("../../../eventSocket")

module.exports = function (parameter, callback) {
    console.log("调用了 createChart", parameter);
    if (connect.currentConnect) {
        connect.currentConnect.send(JSON.stringify({
            type: "event",
            name: "createBarView",
            parameter
        }))
    }
}