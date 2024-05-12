import React, { useState, useEffect } from 'react';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: ' TODO PUT YOUR KEY HERE ', dangerouslyAllowBrowser: true });

///////////////////////////////////
const CharacterStage = ({ data, setData, setStage }) => (
 <UserPrompt
   data={data}
   setData={setData}
   nextStage={() => setStage(() => ChallengeStage)}
   Info={() => (
     <p>
       Edit the template below to create your character.
     </p>
   )}
   type="character"
 />
)

///////////////////////////////////

const ChallengeStage = ({ data, setData, setStage }) => (
 <MachinePrompt
   data={data}
   setData={setData}
   nextStage={() => setStage(() => StrategyStage)}
   Info={() => <p>{JSON.stringify(data)}</p>}
   type="challenge"
   template={`
Generate an original challenge for a comedy game show with characters:
{{ character }}

Place the content into the template (including the wrapping XML tags) to structure your response.  Within these tags place a summary of the challenge premise or objective.  Include all rules or requirements for the task.
 
<challenge_template></challenge_template>`}
/>)

///////////////////////////////////

const StrategyStage = ({ data, setData, setStage }) => (
 <UserPrompt
   data={data}
   setData={setData}
   nextStage={() => setStage(() => SceneStage)}
   Info={() => (
     <p>
       Come up with a strategy for your character for the challenge:
       {JSON.stringify(data.challenge)}
     </p>
   )}
   template={""}
 />
)

///////////////////////////////////

const SceneStage = ({ data, setData, setStage }) => (
 <MachinePrompt
   data={data}
   setData={setData}
   nextStage={() => setStage(() => CritiqueStage)}
   Info={() => <p>{JSON.stringify(data)}</p>}
   template={`
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
   [ line or action ]
   [ line or action ]
   [ ... ]
</scene_template>`}
/>)

///////////////////////////////////

const CritiqueStage = ({ data, setData }) => (
 <MachinePrompt
   data={data}
   setData={setData}
   Info={() => <p>{JSON.stringify(data)}</p>}
   template={`
You are the capriciously ponderous judge of a comedy game show challenge:
{{challenge}}

Given the character performances:
{{scene}}

Use this template (including the wrapping XML tags) to structure your critique:
<critique_template>
   [Opening volley of insults lambasting the characters performance, general nature, life choices, and such with theatrical disdain.]

   [Grudging acknowledgement of one positive moment or trait, undermined by a backhanded followup.]

   [Explanation for the score:
   - Adherence to the rules
   - Clever lateral thinking
   - Humorous moments
   - Overall effectiveness]

   [A parting shot insult issuing final judgement on both the performance and the character.]

   [score 0-5, preferrable <= 3] 
</critique_template>`}
/>)

///////////////////////////////////

// Render prompt templates and update data from user responses.
const UserPrompt = ({ data, setData, template, nextStage, type, Info }) => {
 const [input, setInput] = useState('');

 const handleSubmit = () => {
   setData({ ...data, [type]: input });
   nextStage();
 };

 return (
   <div>
     <Info />
     <textarea value={input} onChange={(e) => setInput(e.target.value)} />
     <button onClick={handleSubmit}>Proceed</button>
   </div>
 );
};

// Prompt the LLM according to a prompt template and game state. Then show the user the results.
const MachinePrompt = ({ data, setData, template, nextStage, Info, type }) => {
 const [retryCount, setRetryCount] = useState(0);
 const [structure, setStructure] = useState({});

 useEffect(() => {
   let prompt = template;
   for (const key in data) {
     const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
     prompt = prompt.replace(regex, JSON.stringify(data[key]));
   }

   const fetchData = async () => {
     try {
       const response = await openai.chat.completions.create({
         model: 'gpt-4-turbo',
         messages: [{role: 'user', content: prompt}],
         max_tokens: 1024,
       });

       const text = response.choices[0].message.content

       let [_, structureType, structureData] = text.match(/<(\w+)_template>(.*?)<\/\1_/s)

       setStructure(structureData);
       setData({ ...data, [structureType]: [...data[structureType], structureData] });
     } catch (error) {
       console.error('Error fetching data:', error);
     }
   };

   fetchData();
 }, [retryCount, template, data]);

 return (
   <div>
     <Info structure={structure} />
     <button onClick={nextStage}>Proceed</button>
     <button onClick={() => setRetryCount(retryCount + 1)}>Retry</button>
   </div>
 );
};

const App = () => {
 const [CurrentStage, setStage] = useState(() => CharacterStage);
 const [data, setData] = useState({
   character: [],
   challenge: [],
   scene: [],
   critique: [],
 });
 return CurrentStage({data, setData, setStage})
};

export default App;
