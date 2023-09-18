const { definition } = require("./definition")

const scenePlugin = {
    name: "scenePlugin",
    description: "",
    definition: definition,
    preinstall: `Answer the users question as best as possible 

    You must format your output as a JSON value that adheres to a given "JSON Schema" instance.
    
    "JSON Schema" is a declarative language that allows you to annotate and validate JSON documents.
    
    For example, the example "JSON Schema" instance {{"properties": {{"foo": {{"description": "a list of test words", "type": "array", "items": {{"type": "string"}}}}}}, "required": ["foo"]}}}}
    would match an object with one required property, "foo". The "type" property specifies "foo" must be an "array", and the "description" property semantically describes it as "a list of test words". The items within "foo" must be strings.
    Thus, the object {{"foo": ["bar", "baz"]}} is a well-formatted instance of this example "JSON Schema". The object {{"properties": {{"foo": ["bar", "baz"]}}}} is not well-formatted.
    
    Your output will be parsed and type-checked according to the provided schema instance, so make sure all fields in your output match the schema exactly and there are no trailing commas!
    
    Here is the JSON Schema instance your output must adhere to. Include the enclosing markdown codeblock:
    \`\`\`json
    {"type":"array","items":{"type":"object","properties":{"model":{"type":"string","description":"3d model types, This value must be in Chinese"},"number":{"type":"number","description":"3d model number"}},"required":["model","number"],"additionalProperties":false},"$schema":"http://json-schema.org/draft-07/schema#"}
    \`\`\`
     
    your answers should follow the following rules 
    - only need to output json values that conform to json schema rules 
    - no need to output json schema 
    - no additional output is required 
    - no line breaks are required 
    - make sure the output is json 
    
    users description 3d scene 
    give the 3d models that may be needed in the scene 
    describe the 3d model in as much detail as possible 
                    `,
    callFunction(name, ...args) {
        try {
            const func = require(`./implements/${name}`)
            func(...args)
        } catch (error) { }
    }
}

module.exports = { scenePlugin }