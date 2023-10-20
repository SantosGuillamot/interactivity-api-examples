import { store, getContext } from '@wordpress/interactivity';

const { state } = store('interactivityAPIExamples', {
	state: {
		get flipTransition() {
			return state.isFrontside ? 'rotateY(0deg)' : 'rotateY(180deg)';
		},
	},
	actions: {
		flip: () => {
			console.log(state.isFrontside);
			state.isFrontside = !state.isFrontside;
		},
	},
});
