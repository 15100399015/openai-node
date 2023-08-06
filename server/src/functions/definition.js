const functions = [
  {
    "name": "getChartId",
    "description": "根据图表名称获取图表id",
    "parameters": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "这是图表名称"
        }
      }
    }
  },
  {
    "name": "changeChartSize",
    "description": "根据图表名称改变图表的大小",
    "parameters": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "这是图表的id"
        },
        "width": {
          "type": "number",
          "description": "这是需要设置是宽度"
        },
        "height": {
          "type": "number",
          "description": "这是需要设置的高度"
        }
      }
    }
  },
  {
    "name": "changeChartDimensionStyle",
    "description": "根据图表名称改变图表的大小",
    "parameters": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "description": "这是图表的名称"
        },
        "dimension": {
          "type": "number",
          "description": "这是需要设置的维度"
        },
        "style": {
          "type": "object",
          "description": "这是需要设置的样式",
          "properties": {
            "color": {
              "type": "string",
              "description": "这是需要设置为的颜色"
            },
          }
        }
      }
    }
  }
]

module.exports.functions = functions