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

router.post("/chat", async function (req, res, next) {
  const session = req.cookies.session;
  const body = req.body || {};
  let reqMessages = body.messages;
  const { plugin, preinstall, functions } = validationPlugin(body.plugin);

  const char_req_params = {
    model: "gpt-3.5-turbo",
    messages: reqMessages,
    stream: true,
  };
  if (preinstall) {
    char_req_params.messages = [{ role: "system", content: preinstall }].concat(
      char_req_params.messages
    );
  }
  if (functions) {
    char_req_params.plugin = functions;
    char_req_params.stream = false;
  }
  const char_res = await openai.createChatCompletion(char_req_params);

  if (functions) {
    const { id, object, created, model, choices, usage } =
      await char_res.json();
    const answer = choices && choices.length && choices[0];
    if (answer) {
      const { index, message, finish_reason } = answer;
      const { content, function_call, role } = message;
      if (function_call) {
        plugin.callFunction(
          function_call.name,
          session,
          JSON.parse(function_call.arguments || "{}")
        );
        res.send("以为您执行操作");
      } else {
        res.send(content);
      }
    } else {
      res.send("你可以说的更详细一点哦");
    }
  } else {
    const stream = OpenAIStream(char_res);
    streamToResponse(stream, res);
  }
});

function validationPlugin(pluginName) {
  let plugin = null;
  let functions = null;
  let preinstall = null;
  if (pluginName) {
    plugin = Object.values(chatPlugins).find(({ name }) => name === pluginName);
    if (plugin) {
      if (plugin.functions && plugin.functions.length) {
        functions = plugin.functions;
      }
      if (plugin.preinstall) {
        preinstall = plugin.preinstall;
      }
    }
  }
  return {
    plugin,
    preinstall,
    functions,
  };
}

module.exports = router;
