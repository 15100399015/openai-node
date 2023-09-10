const definition = [
  {
    "name": "createView",
    "description": "创建或添加一个新的图表",
    "parameters": {
      "type": "object",
      "required": [
        "name",
        "class",
        "dataSource"
      ],
      "properties": {
        "name": {
          "type": "string",
          "description": "这是图表名称",
        },
        class: {
          type: "string",
          description: "这是图表的类型,[echarts_bar]表示柱状图,[echarts_line]表示线图",
          enum: ["echarts_bar", "echarts_line"],
          default: "echarts_bar",
          required: true,
        },
        dataSource: {
          type: "string",
          description: "这是图表的需要使用的数据源",
        },
        required: ["name", "dataSource"],
      },
    },
  },
  //
  {
    name: "getChartId",
    description: "根据图表名称获取图表id",
    parameters: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "这是图表名称",
        },
      },
    },
  },
  //
  {
    name: "changeChartSize",
    description: "根据图表名称改变图表的大小",
    parameters: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "这是图表的id",
        },
        width: {
          type: "number",
          description: "这是需要设置是宽度",
        },
        height: {
          type: "number",
          description: "这是需要设置的高度",
        },
      },
    },
  },
];

module.exports = {
  definition,
};
