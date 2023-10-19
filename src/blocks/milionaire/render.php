<?php

wp_initial_state(
	'interactivityAPIExamples',
	array(
		'prompt'    => '',
		'messages'    => array(),
		'isLoading' => false,
	)
);
?>


<div
	<?php echo get_block_wrapper_attributes(); ?>
	data-wp-interactive='{"namespace": "interactivityAPIExamples"}'
>
	<button data-wp-on--click="actions.startGame">Start Game!</button>
	<!-- Chat window -->
	<div class="chat-container">
		<div
			data-wp-each--messages="state.frontendMessages"
			data-wp-each-key="id"
		>
			<div
				data-wp-class--assistant-message="state.isAssistantMessage"
				data-wp-class--user-message="state.isUserMessage"
				data-wp-bind--children="context.messages.content"
			> </div>

	</div>

	<div class="send-area">

		<!-- Send button -->
		<button class="send-button" data-wp-on--click="actions.send">Send</button>

		<!-- Text input field -->
		<input 
			type="text" 
			class="text-input" 
			placeholder="Type your message..." 
			data-wp-on--input="actions.updatePrompt" 
			data-wp-bind--value="state.prompt"
		>
	</div>
</div>