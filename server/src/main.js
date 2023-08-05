const express = require("express");
const { OpenAIStream, streamToResponse } = require('ai')
const { Configuration, OpenAIApi } = require('openai-edge')
const functions = require("./functions.json");

require("dotenv").config();

const app = express();

const configuration = new Configuration({
  organization: process.env.organization,
  apiKey: process.env.apiKey,
  basePath: process.env.basePath
});

const openai = new OpenAIApi(configuration);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());

app.post("/api/char", async function (req, res) {
  const char_res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: req.body.messages,
    stream: true,
    functions: functions
  })
  streamToResponse(OpenAIStream(char_res), res)
});

app.listen(process.env.port, function () {
  console.log("listening on port " + process.env.port);
});
