import { LLMChain } from "langchain/chains";
import {
  ChatPromptTemplate,
  ChatMessagePromptTemplate,
  PromptTemplate,
} from "langchain/prompts";
import { needModelSchemaParser } from "../outputParser";
import { openAI } from "../llm";

// 根据描述得到场景中需要哪些模型
export async function sceneChain(input: string): Promise<string> {
  const format_instructions = needModelSchemaParser.getFormatInstructions();
  const systemPrompt = new ChatMessagePromptTemplate({
    role: "system",
    prompt: new PromptTemplate({
      inputVariables: [],
      template: `Answer the users question as best as possible \n
                  {format_instructions} \n
                  only need to output json values that conform to json schema rules \n
                  no need to output json schema \n
                  no additional output is required \n
                  no line breaks are required \n
                  make sure the output is json \n
                  users description 3d scene \n
                  give the 3d models that may be needed in the scene \n
                  `,
      partialVariables: { format_instructions },
    }),
  });

  const userPrompt = new ChatMessagePromptTemplate({
    role: "user",
    prompt: new PromptTemplate({
      inputVariables: ["scene"],
      template: `scene description: {scene}`,
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

  const response = await chainA.call({ scene: input });

  return response.text || "";
}
