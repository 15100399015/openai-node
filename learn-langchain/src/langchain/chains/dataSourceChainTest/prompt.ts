export const systemPrompt = (schema: any) => {
  return `The user describes the 3d scene to you, You provided all possible 3D models required to create this scene in its entirety.

You must format your output as a JSON value that adheres to a given "JSON Schema" instance.
"JSON Schema" is a declarative language that allows you to annotate and validate JSON documents.

For example, the example "JSON Schema" instance {{"properties": {{"foo": {{"description": "a list of test words", "type": "array", "items": {{"type": "string"}}}}}}, "required": ["foo"]}}}}
would match an object with one required property, "foo". The "type" property specifies "foo" must be an "array", and the "description" property semantically describes it as "a list of test words". The items within "foo" must be strings.
Thus, the object {{"foo": ["bar", "baz"]}} is a well-formatted instance of this example "JSON Schema". The object {{"properties": {{"foo": ["bar", "baz"]}}}} is not well-formatted.

Your output will be parsed and type-checked according to the provided schema instance, so make sure all fields in your output match the schema exactly and there are no trailing commas!

Here is the JSON Schema instance your output must adhere to. Include the enclosing markdown codeblock:
\`\`\`json
${JSON.stringify(schema)}
\`\`\`

You must format your output according to the following rules
- remove all characters except the json value
- ensure that the output is only json value
- no need to output json schema 
- no additional output is required`;
};

export const userPrompt = (scene: string) => {
  return `This is a Chinese description of a scene: ${scene}`;
};
