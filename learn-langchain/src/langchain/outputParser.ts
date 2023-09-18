export const needModelSchema: any = {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "array",
  items: {
    type: "object",
    properties: {
      model: {
        type: "string",
        description: "3d model name. This value must be in Chinese",
      },
      number: { type: "number", description: "3d model number" },
    },
    required: ["model", "number"],
    additionalProperties: false,
  },
};

export const needModelSchemaParser = {
  getFormatInstructions: () => {
    return JSON.stringify(needModelSchema);
  },
};
