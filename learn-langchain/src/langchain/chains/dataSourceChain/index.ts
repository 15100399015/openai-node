import { openAi } from "../../llm";
import { needModelSchema } from "../../outputParser";
import { dataSource } from "../../../database";
import { Model } from "../../../database/entity/model";
import { Like } from "typeorm";
import { systemPrompt, userPrompt } from "./prompt";

export async function dataSourceChain(input: string): Promise<string> {
  await dataSource.initialize();
  const list = JSON.parse(input) as any[];

  for (let i = 0; i < list.length; i++) {
    const model = list[i];
    const practical = await dataSource.getRepository(Model).find({
      select: ["description", "title", "id"],
      where: { title: Like(`%${model.model}%`) },
      take: 5,
    });
    model.practical = practical;
  }
  console.log(JSON.stringify(list, null, 0).length);

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
    console.log(message);
  }

  return "";
}
