import { store } from '@wordpress/interactivity';

const { state } = store('interactivityAPIExamples', {
	state: {
		get answered() {
			return Object.values(state.quizzes).filter(
				(v) => v.current !== null
			).length;
		},
	},
});
