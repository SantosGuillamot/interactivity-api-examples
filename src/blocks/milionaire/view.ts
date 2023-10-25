import {
	store,
	getContext,
	getElement,
	createElement,
} from '@wordpress/interactivity';

// This is the Markdown parser
// It's imported asynchronously, so it's not available immediately
let parseMarkdown: any;

function htmlToPreact(content: string) {
	// Create a Preact element from the Markdown content
	return createElement('div', {
		dangerouslySetInnerHTML: { __html: content },
	});
}

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
		get isEmptyPrompt() {
			return state.prompt === '';
		},
		isLoading: false,
		messages: [],
		get frontendMessages() {
			return state.messages.slice(2).map(({ role, content }, index) =>
				role === 'assistant'
					? {
							role,
							content: htmlToPreact(content),
							id: index + 1,
					  }
					: { role, content, id: index + 1 }
			);
		},
		get startGameText() {
			return state.frontendMessages.length === 0 && !state.isLoading
				? 'Start Game!'
				: 'Restart';
		},
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
					model: 'gpt-3.5-turbo',
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
		getResponse: function* () {
			state.isLoading = true;
			// Import the Markdown parser if it hasn't been imported yet
			parseMarkdown = yield import('snarkdown').then(
				(module) => module.default
			);

			// Call the API
			const completion = yield actions.getCompletion();

			// The response is in Markdown, so convert it to HTML
			const content = parseMarkdown(completion);

			// Update the messages with the response
			state.messages.push({
				role: 'assistant',
				content,
			});
			state.isLoading = false;
		},
		startGame: function* () {
			// Restart game.
			state.messages = [];

			const initialMessages = [
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
			state.messages.push(...initialMessages);

			yield actions.getResponse();
		},
		send: function* () {
			// Update the messages with the prompt
			state.messages.push({
				role: 'user',
				content: state.prompt,
			});

			// Clear the prompt
			state.prompt = '';

			yield actions.getResponse();
		},
	},
	callbacks: {
		scrollToBottom: () => {
			const { ref } = getElement('messages');
			state.frontendMessages &&
				ref.scrollTo({
					top: ref.scrollHeight,
					behavior: 'smooth',
				});
		},
	},
});
