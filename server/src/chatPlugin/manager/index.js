const { definition } = require("./definition")
const managerPlugin = {
    name: "managerPlugin",
    description: "这里是个图表管理插件，它可以帮你完成一些图表的操作，比如创建，删除，修改，查找图表等操作",
    definition: definition,
    callFunction(name, ...args) {
        try {
            const func = require(`./implements/${name}`)
            func(...args)
        } catch (error) { }
    }
}

module.exports = { managerPlugin }