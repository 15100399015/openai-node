import { z } from "zod";
import path from "path";
import { Server } from "http";
import { LLMChain } from "langchain/chains";
import { zodToJsonSchema } from "zod-to-json-schema";
import {
  ChatPromptTemplate,
  ChatMessagePromptTemplate,
  PromptTemplate,
} from "langchain/prompts";
import { Express } from "express";
import { DataSource } from "typeorm";
import { Model } from "./Entity/model";
import { ClientOptions } from "openai";
import { Texture } from "./Entity/texture";
import { OpenAI } from "langchain/llms/openai";
import { SqlDatabase } from "langchain/sql_db";
import { SqlDatabaseChain } from "langchain/chains/sql_db";
import { StructuredOutputParser } from "langchain/output_parsers";

const configuration: ClientOptions = {
  baseURL: process.env.basePath,
};

const openAI = new OpenAI({
  temperature: 0,
  configuration,
});

const dbFile = path.resolve("src/Chinook.db");

const datasource = new DataSource({
  type: "sqlite",
  database: dbFile,
  entities: [Texture, Model],
  synchronize: true,
});

const modelListSchema: any = z.array(
  z.object({
    model: z.string().describe("3d model types, This value must be in Chinese"),
    number: z.number().describe("3d model number"),
  })
);

const parser = StructuredOutputParser.fromZodSchema<any>(modelListSchema);

const formatInstructions = parser.getFormatInstructions();

// 主进程
export default async function (app: Express, server: Server) {
  // 数据库初始化
  await datasource.initialize();
  console.log("start");
  // 场景
  const scene = "一间卧室";
  const needModelDes = await sceneChain(scene);
  console.log("需要用到模型的描述", needModelDes);
  // const models = await dataSourceChain(needModelDes);
  // console.log("实际拿到的模型资源", models);
  // const sceneCode = await genCodeChain(scene, models);
  // console.log("生成的threejs代码", models);
}

// 根据scene 和 models 生成 threejs code
async function genCodeChain(scene: string, models: string) {
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

// 根据模型json在数据库中得到具体的模型资源
async function dataSourceChain(input: string): Promise<string> {
  const db = await SqlDatabase.fromDataSourceParams({
    appDataSource: datasource,
    includesTables: ["model"],
  });

  const chain = new SqlDatabaseChain({
    llm: openAI,
    database: db,
  });

  const response = await chain.call({
    query: `
    "JSON Schema" is a declarative language that allows you to annotate and validate JSON documents.
    
    For example, the example "JSON Schema" instance {{"properties": {{"foo": {{"description": "a list of test words", "type": "array", "items": {{"type": "string"}}}}}}, "required": ["foo"]}}}}
    would match an object with one required property, "foo". The "type" property specifies "foo" must be an "array", and the "description" property semantically describes it as "a list of test words". The items within "foo" must be strings.
    Thus, the object {{"foo": ["bar", "baz"]}} is a well-formatted instance of this example "JSON Schema". The object {{"properties": {{"foo": ["bar", "baz"]}}}} is not well-formatted.

    there a piece of json: ${input}

    on the basis of below "JSON Schema" analyse json 
    \`\`\`json
    ${JSON.stringify(zodToJsonSchema(modelListSchema))}
    \`\`\`

    output data according to the following principles
    - "title" column in model data table operates LIKE "model" field in json 
    - "description" column in model data table operates LIKE "model" field in json 

    the completed output sql returns the data
    `,
  });

  return response.result;
}

// 根据描述得到场景中需要哪些模型
async function sceneChain(input: string): Promise<string> {
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
                give the 3d models that may be needed in the scene \n`,
      partialVariables: { format_instructions: formatInstructions },
    }),
  });

  const userPrompt = new ChatMessagePromptTemplate({
    role: "user",
    prompt: new PromptTemplate({
      inputVariables: ["scene"],
      template: `scene description: {scene}`,
      partialVariables: { format_instructions: formatInstructions },
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

  const response = await chainA.run({ scene: input });

  console.log("asdsa");
  
  return response || "";
}
