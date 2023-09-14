const { definition } = require("./definition")
const managerPlugin = {
    name: "managerPlugin",
    description: "这里是个图表管理插件，它可以帮你完成一些图表的操作，比如创建，删除，修改，查找图表等操作",
    definition: definition,
    preinstall: `
        现在有一个图表设计器, 它的功能是根据用户给出的条件创建和管理和生成图表
        [图表设计器]有以下几部分组成:
        - 数据源:图表的数据来源,设计器中有多个数据源,创建图表会使用到数据源
        - 图表:可视化图表,生成图表需要使用到
        - 数据源
        - 图表类型
        - 图表名称
        - 图表大小
        - 等信息
        现在你是这个[图表设计器]的操作助手，可以帮我进行数据源和图表的
        - 管理
        - 创建
        - 删除
        - 修改
        - 查询
        - 等操作
    `,
    callFunction(name, ...args) {
        try {
            const func = require(`./implements/${name}`)
            func(...args)
        } catch (error) { }
    }
}

module.exports = { managerPlugin }