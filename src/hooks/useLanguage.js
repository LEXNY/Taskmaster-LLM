export const query = async (content, schematic, callback, engine) => {
  const system = "You generate JSON-formatted content for a comedy game show application."

  const prompt = content + "Respond only with JSON, matching the object keys of this example:\n```" +
    JSON.stringify(schematic, null, 2) + "```"

  while (true) {
    try {
      console.log('todo')
      await engine.chatCompletion({
        stream: false, response_format: { type: "json_object" },
        n: 1024,
        messages: [
          { role: "system", content: system },
          // TODO: shot-prompting
          { role: "user", prompt }
        ],
      })
      const message = await engine.getMessage()
      // TODO: keep in mind this callback is non-atomic in exceptions.
      callback(JSON.parse(message))
      break
    } catch (e) {
      console.error(e)
    }
  }
}