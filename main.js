// PREPOSTEROUS GAUNTLET


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



//// DECLARE ////

const data = {
  character: {},
  challenge: {},
  scene: {},
  critique: {},
}

const extract = (response) => {
  const match = response.match(/<(\w+)_template>(.*)<\/\w+>/s)
  const entityType = match[1]
  const content = JSON.parse(match[2])
  return { entityType, content }
}

async function send(template, recipient) {
  let prompt = template
  const type = extract(template).entityType
  const schema = Object.keys(extract(template).content)

  for (const key in data) {
    const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g')
    prompt = prompt.replace(regex, data[type][key])
  }

  const { content } = extract(await recipient(prompt))
  data[type][content.name] = content
}



//// EPISODE FORMAT ////

async function episode() {
  await send(character, user)
  
  for (let i = 0; i < 3; i++) {
    await send(challenge, robo)
    await send(strategy,  user)
    await send(scene,     robo)
    await send(critique,  robo)
  }
}
episode()
