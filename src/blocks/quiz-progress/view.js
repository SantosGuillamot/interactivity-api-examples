import { store } from '@wordpress/interactivity';

const { state } = store('interactivityAPIExamples', {
	state: {
		get answered() {
			return Object.values(state.quizzes).filter(
				(v) => v.current !== null
			).length;
		},
		get allAnswered() {
			return state.answered === Object.keys(state.quizzes).length;
		},
		get correct() {
			return state.showAnswers
				? Object.values(state.quizzes).filter(
						(v) => v.current === v.correct
				  ).length
				: '?';
		},
	},
	actions: {
		checkAnswers: () => {
			state.showAnswers = true;
			state.selected = null;
		},
	},
});
