const express = require("express");
const { Configuration, OpenAIApi } = require('openai-edge')
const router = express.Router();

const configuration = new Configuration({
  organization: process.env.organization,
  apiKey: process.env.apiKey,
  basePath: process.env.basePath
});


const openai = new OpenAIApi(configuration);

/* GET home page. */
router.post('/chat', async function (req, res, next) {
  const char_res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: req.body.messages,
    // functions: functions,
    n: 1
  })
  const { id, object, created, model, choices, usage } = await char_res.json()
  const { index, message, finish_reason } = choices[0]
  const { content, function_call, role } = message
  if (function_call && currentConnect) {
    currentConnect.send(JSON.stringify(function_call));
  }
  res.send(content)
});

module.exports = router;
