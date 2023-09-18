import { needModelSchema } from "../../outputParser";
import { Configuration, OpenAIApi } from "openai-edge";
import { systemPrompt, userPrompt } from "./prompt";
import { openAi } from "../../llm";

// 根据描述得到场景中需要哪些模型
export async function sceneChain(input: string): Promise<string> {
  const char_res = await openAi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: systemPrompt(needModelSchema),
      },
      {
        role: "user",
        content: userPrompt(input),
      },
    ],
    n: 1,
    temperature: 0.5,
  });
  const res = await char_res.json();
  if (res.choices[0]) {
    const { message } = res.choices[0];
    try {
      return JSON.stringify(JSON.parse(message.content));
    } catch (error) {}
  }
  return "";
}
