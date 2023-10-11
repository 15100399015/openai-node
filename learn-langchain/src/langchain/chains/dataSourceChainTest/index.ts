import { openAIllm, openAi } from "../../llm";
import { needModelSchema } from "../../outputParser";
import { dataSource } from "../../../database";
import { SqlDatabase } from "langchain/sql_db";
import { SqlDatabaseChain } from "langchain/chains/sql_db";
import { OpenAI } from "langchain/llms/openai";
import { Model } from "../../../database/entity/model";
import { Like } from "typeorm";
import { systemPrompt, userPrompt } from "./prompt";

export async function dataSourceChain(): Promise<string> {
  await dataSource.initialize();
  const db = await SqlDatabase.fromDataSourceParams({
    appDataSource: dataSource,
  });
  const chain = new SqlDatabaseChain({
    llm: openAIllm,
    database: db,
    sqlOutputKey: "sql",
  });
  const res = await chain.call({ query: "我需要一个关于床的3d模型" });
  console.log(res);
  return "";
}
