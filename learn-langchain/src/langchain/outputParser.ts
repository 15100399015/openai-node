import { z } from "zod";
import { StructuredOutputParser } from "langchain/output_parsers";

export const needModelSchema: any = z.array(
  z.object({
    model: z.string().describe("3d model types, This value must be in Chinese"),
    number: z.number().describe("3d model number"),
  })
);
export const actualModelSchema: any = z.array(
  z.object({
    size: z.string().describe("model size"),
    type: z.string().describe("model type"),
    title: z.string().describe("model name"),
    version: z.string().describe("model version"),
    description: z.string().describe("model description"),
    resourceId: z.string().describe("model resourceId id"),
    layer: z.string().describe("model hierarchy"),
  })
);

export const needModelSchemaParser =
  StructuredOutputParser.fromZodSchema<any>(needModelSchema);
export const actualModelSchemaParser =
  StructuredOutputParser.fromZodSchema<any>(actualModelSchema);
