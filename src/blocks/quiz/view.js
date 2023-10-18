import { store, getContext } from '@wordpress/interactivity';

const { state } = store('interactivityAPIExamples', {
	state: {
		selected: null,
		get isOpen() {
			const context = getContext();
			return state.selected === context.id;
		},
		get toggleText() {
			return state.isOpen ? 'Close' : 'Open';
		},
	},
	actions: {
		toggle: () => {
			const context = getContext();
			if (state.selected === context.id) {
				state.selected = null;
			} else {
				state.selected = context.id;
			}
		},
	},
});
