const express = require("express");
const { OpenAIStream, streamToResponse } = require("ai");
const { Configuration, OpenAIApi } = require("openai-edge");
const chatPlugins = require("../chatPlugin");
const router = express.Router();

const configuration = new Configuration({
  organization: process.env.organization,
  apiKey: process.env.apiKey,
  basePath: process.env.basePath,
});

const openai = new OpenAIApi(configuration);

router.post('/chat', async function (req, res, next) {
  const session = req.cookies.session
  const body = req.body || {}
  let reqMessages = body.messages
  let reqPlugin = body.plugin
  let plugin = null
  if (reqPlugin) {
    plugin = Object.values(chatPlugins).find((plugin) => plugin.name === reqPlugin)
    console.log(plugin);
    if (plugin) {
      reqMessages = [{ role: "system", content: plugin.preinstall }].concat(reqMessages)

      console.log(reqMessages);
    } else {
      return res.send("为找到您要使用的插件");
    }
  }

  const char_res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: reqMessages,
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
