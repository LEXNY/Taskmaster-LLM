import React, { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'
const configuration = new Configuration({
  apiKey: 'TODO',
})
const openai = new OpenAIApi(configuration)


// Render prompt templates and update data from user responses.
// Accept an `Info` component prop, wherein we pass the prompt for type-bespoke rendering.
const UserPrompt =({data, setData, template, nextStage, Info})=>{ // TODO: type
  const [input, setInput] = useState('')
  return <div>
    <Info prompt={prompt}></Info>
    <textarea
      onChange={({target: {value}})=>setInput(value)}
      defaultValue={input}
    ></textarea>
    <button
      onClick={setData({...data, [type]: [...data[type], input]}) && nextStage()}
    >proceed</button>
  </div>
}

// Prompt the LLM according a prompt template and game state.  Then show the user the results.
// Accept an `Info` component prop, wherein we pass the structure for type-bespoke rendering.
const MachinePrompt =({data, setData, template, nextStage, Info})=>{
  const [structure, setStructure] = useState({})
  const [retryCount, setRetryCount] = useState(0)
  useEffect(()=>{
    let prompt = template
    for (const key in data) {
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g')
      prompt = prompt.replace(regex, JSON.stringify(data[key]))
    }
    try {
      const {text} = await openai.createCompletion({model: 'text-davinci-003', prompt, max_tokens: 1024}).data.choices[0]
      const structure = JSON.parse(text.match(/<(\w+)_template>(.*?)<\/\1_template>/s))[2]
      setData({...data, [type]: [...data[type], structure]})
    } catch {}
  }, [retryCount])
  return <div>
    <Info structure={structure}></Info>
    <button onClick={()=> nextStage && nextStage()}>proceed</button>
    <button onClick={()=> setRetryCount(retryCount + 1)}>retry</button>
  </div>
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


///////////////////////////////////
const CharacterStage =({ data, setData, setStage })=> <UserPrompt data={data} setData={setData}
nextStage={()=> setStage(ChallengeStage)}

Info={()=><p>
  Edit the template below to create your character.
</p>}

template={`
{
  "name": "name here",
  "description": "description"
}`}
></UserPrompt>
///////////////////////////////////


///////////////////////////////////
const ChallengeStage =({ data, setData, setStage })=> <MachinePrompt data={data} setData={setData}
nextStage={()=> setStage(StrategyStage)}

Info={({challenge})=><p>
  {JSON.stringify(challenge)}
</p>}

template={`
Generate an original challenge for a comedy game show with characters:
{{ character }}

Use the template (including the wrapping XML tags) to structure your response.  Here are definitions for what should go in the keys:
  name: A pun name on the premise of the challenge.
  text: A summary of the challenge premise or objective.  Include all rules or requirements for the task.
  
<challenge_template>{
  "name": name,
  "text": text,
}</challenge_template>`}
></MachinePrompt>
///////////////////////////////////


///////////////////////////////////
const StrategyStage =({ data, setData, setStage })=> <UserPrompt data={data} setData={setData}
nextStage={()=> setStage(SceneStage)}

Info={()=><p>
  Come up with a strategy for your character for the challenge:
  {JSON.stringify(data.challenge)}
</p>}

template={``}
>
</UserPrompt>
///////////////////////////////////


///////////////////////////////////
const SceneStage =({ data, setData, setStage })=> <MachinePrompt data={data} setData={setData}
nextStage={()=> setStage(CritiqueStage)}

Info={({scene: {name, text}})=><div>
  <h3>{name}</h3>
  <p>{text}</p>
</div>}

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
}</scene_template>`}
></MachinePrompt>
///////////////////////////////////


///////////////////////////////////
const CritiqueStage =({ data, setStage })=> <MachinePrompt data={data} setData={setData}

Info={({critique})=><div>
  <h3>{critique.name}</h3>
  <p>{critique.text}</p>
</div>}

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
}</critique_template>`}
></MachinePrompt>
///////////////////////////////////

export default App;
