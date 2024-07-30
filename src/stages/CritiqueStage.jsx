import React, { useEffect, useState } from 'react'


const prompt = 'TODO' /*`
  You are the capricious judge of a comedy game show challenge:
  ===
  ${challenge}
  ===
          
  Given the scene for ${name}:
  ===
  ${scene}
  ===
          
  Write a critique of the character's performance.
`*/

const schematic = {
  "opening volley": "[Opening volley of insults lambasting the character's performance and general life choices with theatrical disdain.]",
  "grudging acknowledgement": "[Grudging acknowledgement of one positive moment or trait, undermined by a backhanded followup.]",
  "explanation": "[Explanation for the score: - Adherence to the rules - Clever lateral thinking - Humorous moments - Overall effectiveness]",
  "parting shot": "[A parting shot insult issuing final judgement on both the performance and the character.]",
  "score": "[Score between 1-5, preferably < 4]",
}


export default ({ }) => {
  /* TODO
     const states = {}
      Object.keys(characters).forEach(name => {
        states[name] = useState('')
      })
      useEffect(() => {
        for(const [name, scene] of Object.entries(characters)) {
          (async () => {
            const setState = states[name][1]
            // TODO: doesn't return anything.
            const critique = await query(prompt)
            setState(critique)
          })()
        }})
    */
  }