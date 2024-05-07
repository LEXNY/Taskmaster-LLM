import React, { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
const configuration = new Configuration({
  apiKey: 'YOUR_API_KEY',
});
const openai = new OpenAIApi(configuration);

// TODO: higher-order form component for the user to view prompt templates and fill in the response
// TODO: will require extracting common parsing logic, so that the textarea input can be parsed.
const PromptForm =({data, setData, template, nextStage, send})=><>
  <p>{prompt}</p>
  <textarea>TODO</textarea>
  <button onClick={TODO}>
    TODO
  </button>
</>

const PromptCompletion =({data, setData, template, nextStage, send})=>{
  // TODO: `useEffect` and call `send` directly?
}

const App = () => {
  const [CurrentStage, setStage] = useState(CharacterStage);
  const [input, setInput] = useState('');
  const [data, setData] = useState({
    character: [],
    challenge: [],
    scene:     [],
    critique:  [],
  });

  const send = async (template, data) => {
    let prompt = template;

    for (const key in data) {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      prompt = prompt.replace(regex, JSON.stringify(data[key]));
    }

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 1024,
      n: 1,
      stop: null,
      temperature: 0.7,
    });

    // TODO: extract common parsing logic /////
    const response = completion.data.choices[0].text;
    const match = response.match(/<(\w+)_template>(.*?)<\/\1_template>/s);
    const type = match[1];
    const content = JSON.parse(match[2]);

    setData(() => ({
      ...data,
      [type]: [...data[type], content],
    }));
    //////////////
  };

  return <CurrentStage input={input} data={data} send={send} setStage={setStage} />;
};

const CharacterStage =({ data, send, setStage })=>
  <PromptForm
    // TODO
    /*
`
Copy and edit the template below (including the wrapping XML tags) in your response to create your character.

<character_template>
{
  "name": "name here",
  "description": "description"
}
</character_template>`

    setStage(ChallengeStage);
*/
  ></PromptForm>

const ChallengeStage =({ data, send, setStage })=>
  <PromptForm // TODO: instead of `PromptForm`, `PromptCompletion`, because this prompt goes to the LLM not the user
    // TODO
    /*
`
Generate an original challenge for a comedy game show with characters:
{{ character }}

Use the template (including the wrapping XML tags) to structure your response.  Here are definitions for what should go in the keys:
  name: A pun name on the premise of the challenge.
  text: A summary of the challenge premise or objective.  Include all rules or requirements for the task.
  
<challenge_template>{
  "name": name,
  "text": text,
}</challenge_template>`

    setStage(SceneStage);
*/
  ></PromptForm>

/* TODO: component using PromptForm

`
Come up with a strategy for your character for the challenge.

<strategy_template>
" strategy in quotes "
</strategy_template>
`

*/

// TODO: convert to using `PromptCompletion`
const SceneStage = ({ data, send, setStage }) => {
  const handleSubmit = () => {
    send(`
Write a script for the following characters attempts at the challenge based on their provided strategies:

{{ challenge }}

{{ character }}

The script should:
- Bring the characters stated strategies to life in an engaging, descriptive way
- Account for how the different characters actions could intersect and influence each other
- Highlight moments that exemplify or clash with the characters established traits/personalities
- Leave room for creative interpretations, and mischief.

Use this template (including the wrapping XML tags) to structure your response:
<scene_template>{
  "name": " scene name ",
  "text": " \
    [ line or action ] \
    [ line or action ] \
    [ ... ] \
  "
}</scene_template>`
    );
    setStage(CritiqueStage);
  };

  return (
    <div>
      <h2>Scene Stage</h2>
      <pre>{JSON.stringify(data.scene, null, 2)}</pre>
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
};

const CritiqueStage =({ data, send, setStage })=>
  <PromptCompletion
    // TODO
    /*
    `
You are the capriciously ponderous judge of a comedy game show challenge:
{{challenge}}

Given the character performances:
{{scene}}

Use this template (including the wrapping XML tags) to structure your critique:
<critique_template>{
  "name": " name ",
  "text": " \
    [Opening volley of insults lambasting the characters performance, general nature, life choices, and such with theatrical disdain.] \
 \
    [Grudging acknowledgement of one positive moment or trait, undermined by a backhanded followup.] \
 \
    [Explanation for the score: \
    - Adherence to the rules \
    - Clever lateral thinking \
    - Humorous moments \
    - Overall effectiveness] \
 \
    [A parting shot insult issuing final judgement on both the performance and the character.] \
 \
    [score 0-5, preferrable <= 3] \
  "
}</critique_template>`
*/
  ></PromptCompletion>

export default App;
