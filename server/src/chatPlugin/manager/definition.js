const definition = [
  {
    name: "createView",
    description: "创建或添加一个新的图表",
    parameters: {
      type: "object",
      required: [
        "name",
        "class",
        "dataSource"
      ],
      properties: {
        name: {
          type: "string",
          description: "这是图表名称",
        },
        class: {
          type: "string",
          description: "这是图表的类型, [echarts_bar]表示柱状图, [echarts_line]表示线图",
          enum: ["echarts_bar", "echarts_line"],
          default: "echarts_bar",
        },
        dataSource: {
          type: "string",
          description: "这是图表的需要使用的数据源",
        },
      },
    },
  },
];

module.exports = {
  definition,
};
