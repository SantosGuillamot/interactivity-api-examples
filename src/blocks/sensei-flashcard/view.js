import { store } from '@wordpress/interactivity';

const { state } = store('interactivityAPIExamples', {
	state: {
		get flipTransition() {
			return state.isFrontside ? 'rotateY(0deg)' : 'rotateY(180deg)';
		},
	},
	actions: {
		flip: () => {
			state.isFrontside = !state.isFrontside;
		},
	},
});
