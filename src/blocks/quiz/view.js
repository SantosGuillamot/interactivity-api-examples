import { store, getContext } from '@wordpress/interactivity';

const { state } = store('interactivityAPIExamples', {
	state: {
		get isOpen() {
			const context = getContext();
			return state.selected === context.id;
		},
		get toggleText() {
			return state.isOpen ? state.closeText : state.openText;
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
