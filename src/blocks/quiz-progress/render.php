<?php
	$initial_state = wp_initial_state(
		'interactivityAPIExamples',
		array(
			'answered'    => 0,
			'allAnswered' => false,
			'showAnswers' => false,
			'correct'     => "?",
			'allCorrect'  => false,
		)
	);
?>

<div
	<?php echo get_block_wrapper_attributes(); ?>
	data-wp-interactive='{"namespace": "interactivityAPIExamples"}'
>
	<div>
		<strong><?php echo __( 'Answered' ); ?></strong>: 
		<span data-wp-text="state.answered"></span>/<?php echo count( $initial_state['quizzes'] ); ?>
	</div>

	<div>
		<strong><?php echo __( 'Correct' ); ?></strong>: 
		<span data-wp-text="state.correct"></span>
		<span data-wp-bind--hidden="!state.allCorrect">
			<?php echo __( 'All correct, congratulations! 🎉' ); ?>
		</span>
	</div>
	
	<div>
		<button
			data-wp-bind--hidden="state.showAnswers"
			data-wp-bind--disabled="!state.allAnswered"
			data-wp-on--click="actions.checkAnswers"
		>
			<?php echo __( 'Check your answers' ); ?>
		</button>
		<button
			data-wp-bind--hidden="!state.showAnswers"
			data-wp-on--click="actions.reset"
		>
			<?php echo __( 'Reset' ); ?>
		</button>
	</div>

	<hr>

	<div>
		<?php echo $content; ?>
	</div>
</div>