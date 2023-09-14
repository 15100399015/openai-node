const { definition } = require("./definition")
const list = require("/Users/lipengyang/Desktop/assets/modelStore/meta/thingModelTree.json");

const scenePlugin = {
    name: "scenePlugin",
    description: "这里是个图表管理插件，它可以帮你完成一些图表的操作，比如创建，删除，修改，查找图表等操作",
    definition: definition,
    preinstall: `现在有一段json结构: ${JSON.stringify(list)},它表示一些3d模型的数据定义,title 字段表示这个3d模型的描述信息,请你理解这段json,后续我会对这段json进行提问`,
    callFunction(name, ...args) {
        try {
            const func = require(`./implements/${name}`)
            func(...args)
        } catch (error) { }
    }
}

module.exports = { scenePlugin }