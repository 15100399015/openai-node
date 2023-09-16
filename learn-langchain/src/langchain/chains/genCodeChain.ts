import { LLMChain } from "langchain/chains";
import {
  ChatPromptTemplate,
  ChatMessagePromptTemplate,
  PromptTemplate,
} from "langchain/prompts";
import { openAI } from "../llm";

export async function genCodeChain(scene: string, models: string) {
  const systemPrompt = new ChatMessagePromptTemplate({
    role: "system",
    prompt: new PromptTemplate({
      inputVariables: [],
      template: `You are a top threejs developer, I describe the scene to you, you give me the html code`,
    }),
  });

  const userPrompt = new ChatMessagePromptTemplate({
    role: "user",
    prompt: new PromptTemplate({
      inputVariables: ["scene", "models"],
      template: `scene description: {scene} \n
                 list of 3d model resources: {models}`,
    }),
  });
  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    systemPrompt,
    userPrompt,
  ]);
  const chainA = new LLMChain({
    llm: openAI,
    prompt: chatPrompt,
  });

  const response = await chainA.call({ scene, models });

  return response.text || "";
}
