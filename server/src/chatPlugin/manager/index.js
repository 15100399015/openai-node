const definition = require("./definition")
const managerPlugin = {
    name: "managerPlugin",
    description: "这里是个管理插件，它可以帮你完成一些图标的操作，而不需要你自己手动完成",
    definition: definition,
    callFunction(funcName, parameter, callback) {
    const func = require("./implements")

    }
}

module.exports = managerPlugin