import React, { useEffect, useState } from 'react'


export default ({ characters, challenge, query, response }) => {
  /* TODO:  for each character's scene.
    const critique = useLanguage(`
      You are the capricious judge of a comedy game show challenge:
      ===
      ${challenge}
      ===
  
      Given the scenes for each character:
      ===
      ${scene}
      ===
  
      Use this template to structure your critique for each character:
      ===
      [Opening volley of insults lambasting the character's performance and general life choices with theatrical disdain.]
  
      [Grudging acknowledgement of one positive moment or trait, undermined by a backhanded followup.]
  
      [Explanation for the score:
      - Adherence to the rules
      - Clever lateral thinking
      - Humorous moments
      - Overall effectiveness]
  
      [A parting shot insult issuing final judgement on both the performance and the character.]
      ===
    `)
  
    setCritique(critique)
    return <div><p>{critique}</p></div>
    */
     return '' // TODO

     const states = {}
      Object.keys(characters).forEach(name => {
        states[name] = useState('')
      })
      useEffect(() => {
        for(const [name, scene] of Object.entries(characters)) {
          (async () => {
            const setState = states[name][1]
            const critique = await query(`
              You are the capricious judge of a comedy game show challenge:
              ===
              ${challenge}
              ===
          
              Given the scene for ${name}:
              ===
              ${scene}
              ===
          
              Use this template to structure your critique:
              ===
              [Opening volley of insults lambasting the character's performance and general life choices with theatrical disdain.]
          
              [Grudging acknowledgement of one positive moment or trait, undermined by a backhanded followup.]
          
              [Explanation for the score:
              - Adherence to the rules
              - Clever lateral thinking
              - Humorous moments
              - Overall effectiveness]
          
              [A parting shot insult issuing final judgement on both the performance and the character.]
              ===
            `)
            setState(critique)
          })()
        }})
  }