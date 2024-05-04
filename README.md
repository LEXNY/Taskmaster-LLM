# Preposterous Gauntlet

Preposterous Gauntlet is a comedic game show simulation project where characters compete in wacky challenges. It's a Node.js application that uses the OpenAI API to generate content for the game show.

## Coming next!

I will leverage this existing project to try to make an easy, free frontend version of this game.  https://github.com/abi/secret-llama


## How it Works

The game follows a series of steps for each episode:

1. **Character Creation**: The user creates a character by providing a name and description.
2. **Challenge Generation**: The OpenAI API generates an original challenge with rules and requirements.
3. **Strategy Formation**: The user comes up with a strategy for their character to tackle the challenge.
4. **Scene Generation**: The OpenAI API generates a script depicting the characters attempting the challenge based on their strategies.
5. **Critique**: The OpenAI API provides a critique of the characters' performances, complete with insults, backhanded compliments, and a final score.

Steps 2-5 repeat three times per episode.

The LLM responses can be iffy about sticking to the required format for the JS side of the game to properly function.  I haven't put retry logic in, but that's an option.

## Running

Set up your OpenAI API key as an environment variable:

```bash
export KEY=your_openai_api_key

node main.js
```

## License

This project is licensed under the [MIT License](LICENSE).
