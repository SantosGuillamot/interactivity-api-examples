import { store, getElement } from '@wordpress/interactivity';
import snarkdown from 'snarkdown';

const initialMessages = [
	{
		role: 'system',
		content: `You are WordPressBOT, a host of Who Wants to Be a (Wordpress) Millionaire? game show.
Your job is to ask me (the participant) progressively more difficult questions about Wordpress. 
Start with basic and simple ones. For each question, state the amount I am playing for and give me 4 possible answers to choose from.
You can allow me to "phone a friend", "ask the audience" or do a 50/50, just like in the real game show.
When I get to 1 million dollars, I win the game. If I get a question wrong, I lose the game. 
When I say "I am ready to play!", start the game.`,
	},
	{
		role: 'user',
		content: 'I am ready to play!',
	},
	{
		role: 'assistant',
		content: `Welcome to Who Wants to be a (WordPress) milionaire?
You have three lifelines available: "Phone a Friend," "Ask the Audience," and "50/50."

**For $100: What is WordPress primarily used for?**

A) Cooking recipes
B) Blogging and website creation
C) Video games
D) Car manufacturing

What's your final answer?`,
	},
];

const { state, actions } = store('interactivityAPIExamples', {
	state: {
		get apiKey() {
			return localStorage.getItem('OpenAI-APIkey');
		},
		prompt: '',
		messages: initialMessages,
	},
	actions: {
		getCompletion: async () => {
			return fetch('https://api.openai.com/v1/chat/completions', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${state.apiKey}`,
				},
				body: JSON.stringify({
					model: 'gpt-4',
					messages: state.messages,
				}),
			})
				.then((response) => response.json())
				.then((json) => json.choices[0].message.content)
				.catch((error) => console.error('Error:', error));
		},
		updatePrompt: (event) => {
			state.prompt = event.target.value;
		},
		updateMessages: (message) => {
			state.messages = [...state.messages, message];
			const ref = document.querySelector('.chat-container');

			const userMessage = document.createElement('p');
			userMessage.classList.add(
				message.role === 'assistant'
					? 'assistant-message'
					: 'user-message'
			);
			userMessage.innerHTML = message.content;
			ref.appendChild(userMessage);

			// scroll to the bottom	of the chat
			ref.scrollTop = ref.scrollHeight;
		},
		send: function* () {
			// Update the messages with the prompt
			actions.updateMessages({ role: 'user', content: state.prompt });

			// Clear the prompt
			state.prompt = '';

			// Call the API
			const completion = yield actions.getCompletion();

			// The response is in Markdown, so convert it to HTML
			const content = snarkdown(completion);

			// Update the messages with the response
			actions.updateMessages({ role: 'assistant', content });
		},
	},
});
