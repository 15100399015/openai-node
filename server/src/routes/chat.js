const express = require("express");
const { OpenAIStream, streamToResponse } = require("ai");
const { Configuration, OpenAIApi } = require("openai-edge");
const chatPlugins = require("../chatPlugin");
const router = express.Router();
const cookie = require("cookie");

const configuration = new Configuration({
  organization: process.env.organization,
  apiKey: process.env.apiKey,
  basePath: process.env.basePath,
});

const openai = new OpenAIApi(configuration);

// - 操作区:所有的图表都会出现在操作区,操作区中的图表可进行[位置变换],[大小变换],[删除],[新增],[导出]等操作
const preinstall = {
  role: "system",
  content: `
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
  `
}

router.post('/chat', async function (req, res, next) {
  const session = req.cookies.session
  const body = req.body || {}
  const reqMessages = body.messages
  const reqPlugin = body.plugin
  let plugin = null
  if (reqPlugin) plugin = Object.values(chatPlugins).find((plugin) => plugin.name === reqPlugin)
  if (reqPlugin) {
    if (!plugin || plugin.definition.length <= 0) {
      return res.send("为找到您要使用的插件");
    }
  }
  const char_res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [preinstall].concat(reqMessages),
    n: 1,
    functions: reqPlugin ? plugin.definition : void 0,
    stream: !reqPlugin,
  });
  if (reqPlugin) {
    const { id, object, created, model, choices, usage } = await char_res.json()
    const answer = choices && choices.length && choices[0]
    if (answer) {
      const { index, message, finish_reason } = answer
      const { content, function_call, role } = message
      if (function_call) {
        plugin.callFunction(function_call.name, session, JSON.parse(function_call.arguments || "{}"))
        res.send("以为您执行操作")
      } else {
        res.send(content)
      }
    } else {
      res.send("你可以说的更详细一点哦")
    }
  } else {
    const stream = OpenAIStream(char_res);
    streamToResponse(stream, res);
  }
});

module.exports = router;
