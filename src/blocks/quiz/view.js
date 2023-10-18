import { store, getContext } from '@wordpress/interactivity';

store('interactivityAPIExamples', {
	actions: {
		toggle: () => {
			const context = getContext();
			context.isOpen = !context.isOpen;
		},
	},
});
