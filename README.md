# Preposterous Gauntlet

Preposterous Gauntlet is a comedic game show simulation project where characters compete in wacky challenges. It's a Node.js application that uses the OpenAI API to generate content for the game show.

## How it Works

The game follows a series of steps for each episode:

1. **Character Creation**: The user creates a character by providing a name and description.
2. **Challenge Generation**: The OpenAI API generates an original challenge with rules and requirements.
3. **Strategy Formation**: The user comes up with a strategy for their character to tackle the challenge.
4. **Scene Generation**: The OpenAI API generates a script depicting the characters attempting the challenge based on their strategies.
5. **Critique**: The OpenAI API provides a critique of the characters' performances, complete with insults, backhanded compliments, and a final score.

Steps 2-5 repeat three times per episode.

## Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/preposterous-gauntlet.git
```

2. Install dependencies:

```bash
cd preposterous-gauntlet
npm install
```

3. Set up your OpenAI API key as an environment variable:

```bash
export KEY=your_openai_api_key
```

4. Run the application:

```bash
node main.js
```

## How to Contribute

1. Fork the repository
2. Create a new branch for your feature or bug fix
3. Make your changes and commit them
4. Push your changes to your forked repository
5. Open a pull request

## License

This project is licensed under the [MIT License](LICENSE).
