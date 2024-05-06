//// TEMPLATES ////

character =`
Copy and edit the template below (including the wrapping XML tags) in your response to create your character.

<character_template>
{
  "name": "name here",
  "description": "description"
}
</character_template>`



challenge =`
Generate an original challenge for a comedy game show with characters:
{{ character }}

Use this template (including the wrapping XML tags) to structure your response:
<challenge_template>{
  "name": " name ",
  "text": " \
    [Summary of the challenge premise or objective] \
   \
    1. [Rule or requirement 1] \
    2. [Rule or requirement 2] \
    3. [Rule or requirement 3] \
    4. [Rule or requirement 4] \
  "
}</challenge_template>`



strategy =`
Come up with a strategy for your character for the challenge.

<strategy_template>
" strategy in quotes "
</strategy_template>
`



scene =`
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



critique =`
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



import React, { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';

const App = () => {
  const systemPrompt = "You analyze prompts with internal templates, then fill in and return the internal template.";

  const configuration = new Configuration({
    apiKey: 'YOUR_API_KEY',
  });
  const openai = new OpenAIApi(configuration);

  const [state, setState] = useState({
    stage: 'initial',
    data: {
      character: {},
      challenge: {},
      scene: {},
      critique: {},
    },
  });

  const send = async (template, data) => {
    let prompt = template;

    for (const key in state.data) {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
      prompt = prompt.replace(regex, JSON.stringify(state.data[key]));
    }

    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${systemPrompt}\n\n${prompt}`,
      max_tokens: 1024,
      n: 1,
      stop: null,
      temperature: 0.7,
    });

    const response = completion.data.choices[0].text;
    const match = response.match(/<(\w+)_template>(.*?)<\/\1_template>/s);
    const entityType = match[1];
    const content = JSON.parse(match[2]);

    setState((prevState) => ({
      ...prevState,
      stage: stageTransitions[prevState.stage][entityType] || prevState.stage,
      data: {
        ...prevState.data,
        [entityType]: { ...prevState.data[entityType], ...content },
      },
    }));
  };

  const stageTransitions = {
    initial: { character: CharacterStage },
    character: { challenge: ChallengeStage },
    challenge: { scene: SceneStage },
    scene: { critique: CritiqueStage },
    critique: { initial: InitialStage },
  };

  const CurrentStage = stageTransitions[state.stage][state.data[state.stage]] || InitialStage;

  return <CurrentStage data={state.data[state.stage]} send={send} />;
};

const InitialStage = ({ send }) => {
  return <button onClick={() => send(`<character_template>{}</character_template>`)}>Start</button>;
};

const CharacterStage = ({ data, send }) => {
  return (
    <div>
      <h2>Character Stage</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={() => send(`<challenge_template>{}</challenge_template>`)}>Next</button>
    </div>
  );
};

const ChallengeStage = ({ data, send }) => <div>Challenge Stage</div>;
const SceneStage = ({ data, send }) => <div>Scene Stage</div>;
const CritiqueStage = ({ data, send }) => <div>Critique Stage</div>;

export default App;
