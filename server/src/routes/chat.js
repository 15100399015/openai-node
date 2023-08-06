const express = require("express");
const { OpenAIStream, streamToResponse } = require('ai')
const { Configuration, OpenAIApi } = require('openai-edge')
const chatPlugins = require("../chatPlugin")
const router = express.Router();

const configuration = new Configuration({
  organization: process.env.organization,
  apiKey: process.env.apiKey,
  basePath: process.env.basePath
});

const openai = new OpenAIApi(configuration);

router.post('/chat', async function (req, res, next) {
  const body = req.body || {}
  const reqMessages = body.messages
  const reqPlugin = body.plugin
  let plugin = null
  if (reqPlugin) plugin = Object.values(chatPlugins).find((plugin) => plugin.name === reqPlugin)
  if (reqPlugin) {
    if (!plugin || plugin.definition.length <= 0) {
      return res.send("为找到您要使用的插件")
    }
  }
  const char_res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: reqMessages,
    n: 1,
    functions: reqPlugin ? plugin.definition : void 0,
    stream: !reqPlugin
  })
  if (reqPlugin) {
    const { id, object, created, model, choices, usage } = await char_res.json()
    const { index, message, finish_reason } = choices[0]
    const { content, function_call, role } = message
    if (function_call) {
      plugin.callFunction(function_call.name, JSON.parse(function_call.arguments || "{}"))
    }
    res.send(content)
  } else {
    const stream = OpenAIStream(char_res)
    streamToResponse(stream, res)
  }

});

module.exports = router;
