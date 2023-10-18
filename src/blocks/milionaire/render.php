<?php

wp_initial_state(
	'interactivityAPIExamples',
	array(
		'prompt'    => '',
		'messages'    => array(),
	)
);
?>


<div
	<?php echo get_block_wrapper_attributes(); ?>
	data-wp-interactive='{"namespace": "interactivityAPIExamples"}'
>
	<!-- Chat window -->
	<div class="chat-container" data-wp-effect="effects.newMessage">
		<div class="assistant-message">
			
			<p><b>For $100: What is WordPress primarily used for?</b></p>

			<p>
			<p>A) Cooking recipes</p>
			<p>B) Blogging and website creation</p>
			<p>C) Video games</p>
			<p>D) Car manufacturing</p>

			</p>

			<p> What's your final answer? </p>
		</div>

		<!-- TODO: Add a loading indicator here -->
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