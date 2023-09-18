import { ClientOptions } from "openai";
import { OpenAI } from "langchain/llms/openai";
import { Configuration, OpenAIApi } from "openai-edge";
export const openAIllm = new OpenAI({
  temperature: 0,
  configuration: {
    baseURL: process.env.basePath,
  },
  modelName: "gpt-3.5-turbo",
});

export const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
    basePath: process.env.OPENAI_BASEURL,
  })
);
