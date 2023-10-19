import { store, getContext } from '@wordpress/interactivity';
import snarkdown from 'snarkdown';

const { state, actions } = store('interactivityAPIExamples', {
	state: {
		get apiKey() {
			return localStorage.getItem('OpenAI-APIkey');
		},
		get isUserMessage() {
			const context = getContext();
			return context.messages.role === 'user';
		},
		get isAssistantMessage() {
			const context = getContext();
			return context.messages.role === 'assistant';
		},
		prompt: '',
		botMessages: [],
		frontendMessages: [],
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
					messages: state.botMessages,
				}),
			})
				.then((response) => response.json())
				.then((json) => json.choices[0].message.content)
				.catch((error) => console.error('Error:', error));
		},
		updatePrompt: (event) => {
			state.prompt = event.target.value;
		},
		getResponse: function* () {
			// Call the API
			const completion = yield actions.getCompletion();

			// The response is in Markdown, so convert it to HTML
			const content = snarkdown(completion);

			// Update the messages with the response
			state.botMessages.push({
				role: 'assistant',
				content,
			});
			state.frontendMessages.push({
				role: 'assistant',
				content,
				id: state.frontendMessages.length + 1,
			});
		},
		startGame: function* () {
			const botStartupMessages = [
				{
					role: 'system',
					content: `You are WordPressBOT, a host of Who Wants to Be a (Wordpress) Millionaire? game show.
			Your job is to ask me (the participant) progressively more difficult questions about Wordpress. 
			Start with basic and simple ones. For each question, state the amount I am playing for and give me 4 possible answers to choose from.
			You can allow me to "phone a friend", "ask the audience" or do a 50/50, just like in the real game show.
			When I get to 1 million dollars, I win the game. If I get a question wrong, I lose the game. 
			When I say "I am ready to play!", start the game by asking questions related to WordPress. From time to time, remember me that I can ask for help like in the real game show.`,
				},
				{
					role: 'user',
					content: 'I am ready to play!',
				},
			];
			state.botMessages.push(...botStartupMessages);

			yield actions.getResponse();
		},
		send: function* () {
			// Update the messages with the prompt
			state.botMessages.push({
				role: 'user',
				content: state.prompt,
			});
			state.frontendMessages.push({
				role: 'user',
				content: state.prompt,
				id: state.frontendMessages.length + 1,
			});

			// Clear the prompt
			state.prompt = '';

			yield actions.getResponse();
		},
	},
	callbacks: {
		test: () => {
			setInterval(() => {
				console.log(state.frontendMessages);
			}, 3000);
		},
	},
});
