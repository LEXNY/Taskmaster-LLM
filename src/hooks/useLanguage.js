import { useState, useEffect } from 'react';
import * as language from '@mlc-ai/web-llm';

export const useLanguage = (setter) => {
  const [engine, setEngine] = useState(undefined);
  const [debounce, setDebounce] = useState(false);

  useEffect(() => {
    (async () => {
      setEngine(await language.CreateMLCEngine("Phi-3-mini-4k-instruct-q4f16_1-MLC"));
    })();
  }, []);

  if (engine) {
    return async (prompt, schematic, callback) => {
      if(debounce) {return}
      setDebounce(true);
      const strungifiedSchematic = JSON.stringify(schematic);

      while (true) {
        try {
          await engine.chatCompletion({
            stream: false,
            response_format: { type: "json_object" },
            temperature: 0.75,
            messages: [
              { role: "system", content: "You respond only with JSON." },
              { role: "user", content: `repeat ${strungifiedSchematic}` },
              { role: "assistant", content: strungifiedSchematic },
              { role: "user", content: 'Now use those same property keys, but fill in the values according to the following.  ' + prompt }
            ],
          });

          const message = await engine.getMessage();

          // callback is the API-consumer-provided plan.
          // setter is the `useImmer` setter.
          // JSON.parse(message) is the generated content.
          console.log(`generated: ${message}`);
          const parsedResponse = JSON.parse(message);
          // TODO: additional validation of parsedResponse against schematic?
          setter(callback(parsedResponse));
          setDebounce(false);
          break;
        } catch (e) {
          console.error(e);
        }
      }
    };
  }
};