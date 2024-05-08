import React, { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'
const configuration = new Configuration({
  apiKey: 'TODO',
})
const openai = new OpenAIApi(configuration)


// an extracted structure can either be the JSON template of an entity or a completed entity.
const extract =({text, data})=>{
  const match = text.match(/<(\w+)_template>(.*?)<\/\1_template>/s)
  const type = match[1]
  const structure = JSON.parse(match[2]) // TODO: allow extracting this, for UserPrompt.  Return {structure, set: ({data})=>(...)}
  return ({data})=>({
    ...data,
    [type]: [...data[type], structure],
  })
}

// higher-order form component for the user to view prompt templates and fill in the response
const UserPrompt =({data, setData, template, nextStage})=>{
  // TODO
  const {structure, update} = extract({text: template, data})
  ///
  const [input, setInput] = useState(JSON.stringify(structure))
  return <>
    <p>{prompt}</p>
    <textarea onChange={({target: {value}})=>setInput(value)} value={TODO is value correct? `input`}></textarea>
    <button onClick={setData(extract(input).set({data})) && nextStage()}>proceed</button>
  </>
}

const MachinePrompt =({data, setData, template, nextStage})=>{
  // TODO: useState
  // structure, update
  
  // TODO: useEffect
  let prompt = template
  for (const key in data) {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g')
    prompt = prompt.replace(regex, JSON.stringify(data[key]))
  }
  const {text} = await openai.createCompletion({model: 'text-davinci-003', prompt, max_tokens: 1024}).data.choices[0]
  const {structure, update} = extract({text, data})
  setData(update)
  nextStage && nextStage()
  return <>{structure}</>
}

const App =()=>{
  const [CurrentStage, setStage] = useState(CharacterStage)
  const [data, setData] = useState({
    character: [],
    challenge: [],
    scene:     [],
    critique:  [],
  })
  return <CurrentStage data={data} setData={setData} setStage={setStage} />
}

const CharacterStage =({ data, setData, setStage })=>
  <UserPrompt
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
  <MachinePrompt
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
  >/* TODO:   {data.challenge.last}    // ??? */</MachinePrompt>


///////////////////////////////////
const StrategyStage =({ data, setData, setStage })=> <MachinePrompt data={data} setData={setData}
nextStage={()=> setStage(SceneStage)}
template={`
Come up with a strategy for your character for the challenge.

<strategy_template>
" strategy in quotes "
</strategy_template>
`></MachinePrompt>
///////////////////////////////////


///////////////////////////////////
const SceneStage =({ data, setData, setStage })=> <MachinePrompt data={data} setData={setData}
nextStage={()=> setStage(CritiqueStage)}
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
  "name": " scene name ",
  "text": " \
    [ line or action ] \
    [ line or action ] \
    [ ... ] \
  "
}</scene_template>
`></MachinePrompt>
///////////////////////////////////


const CritiqueStage =({ data, send, setStage })=> <MachinePrompt data={data} setData={setData}
template={`
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
}</critique_template>
`></MachinePrompt>
///////////////////////////////////

export default App;
