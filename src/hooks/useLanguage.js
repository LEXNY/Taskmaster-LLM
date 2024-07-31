import { useState, useEffect } from 'react';
import * as language from '@mlc-ai/web-llm';

export const useLanguage = (setter) => {
  const [engine, setEngine] = useState(undefined);

  useEffect(() => {
    (async () => {
      setEngine(await language.CreateMLCEngine("Phi-3-mini-4k-instruct-q4f16_1-MLC"));
    })();
  }, []);

  if (engine) {
    return async (prompt, schematic, callback) => {
      const strungifiedSchematic = JSON.stringify(schematic);

      while (true) {
        try {
          await engine.chatCompletion({
            stream: false,
            response_format: { type: "json_object" },
            temperature: 0.8,
            messages: [
              { role: "system", content: "You respond with JSON matching the schema of this object: \n```" + strungifiedSchematic + "```"},
              { role: "user", content: prompt }
            ],
          });

          const message = await engine.getMessage();

          // callback is the API-consumer-provided plan.
          // setter is the `useImmer` setter.
          // JSON.parse(message) is the generated content.
          console.log(`generated: ${message}`);
          const parsedResponse = JSON.parse(message);

          // TODO: keep?  Or better idea?  Search codebase for VALIDATION
          // additional validation of parsedResponse against schematic.
          // TODO: pass in a validation function.
          for(const key in schematic) {
            // TODO: hack until improving validation of optional keys.
            if(key === 'does' || key === 'says') { continue }
            if(!(key in parsedResponse)) {
              console.error(JSON.stringify(parsedResponse), JSON.stringify(schematic));
              throw new Error(`Key ${key} not found in response`);
            }
          }

          setter(callback(parsedResponse));
          break;
        } catch (e) {
          console.error(e, prompt);
        }
      }
    };
  }
};