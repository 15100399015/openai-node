const http = require('http');
const express = require("express");
const { OpenAIStream } = require('ai')
const { Configuration, OpenAIApi } = require('openai-edge')
const { EventSocket } = require('./webSocket.js');
const { functions } = require("./functions/definition.js");

require("dotenv").config();

const app = express();
const httpServer = http.createServer(app)
const eventSocket = new EventSocket({ server: httpServer, path: "/api/ws" })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
httpServer.listen(process.env.port, function () {
  console.log("listening on port " + process.env.port);
});

const configuration = new Configuration({
  organization: process.env.organization,
  apiKey: process.env.apiKey,
  basePath: process.env.basePath
});

const openai = new OpenAIApi(configuration);


let currentConnect = null

app.post("/api/char", async function (req, res) {
  const char_res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: req.body.messages,
    functions: functions,
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

eventSocket.addListener("connection", (ws) => {
  currentConnect = ws
})
