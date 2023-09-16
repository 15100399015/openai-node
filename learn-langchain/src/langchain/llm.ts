import { ClientOptions } from "openai";
import { OpenAI } from "langchain/llms/openai";
const configuration: ClientOptions = {
  baseURL: process.env.basePath,
};

export const openAI = new OpenAI({
  temperature: 0,
  configuration,
  // modelName: "gpt-3.5-turbo",
});
