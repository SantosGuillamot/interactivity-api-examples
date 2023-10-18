<?php
	$initial_state = wp_initial_state(
		'interactivityAPIExamples',
		array(
			'answered' => 0
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

	<hr>

	<div>
		<?php echo $content; ?>
	</div>
</div>