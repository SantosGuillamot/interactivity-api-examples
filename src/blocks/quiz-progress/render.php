<?php
	$initial_state = wp_initial_state('interactivityAPIExamples', array());
?>

<div <?php echo get_block_wrapper_attributes(); ?>>
	<div>
		<strong>
			<?php echo __( 'Exercises' ); ?>:
		</strong>
		<?php echo count( $initial_state['quizzes'] ); ?>
	</div>

	<hr>

	<div>
		<?php echo $content; ?>
	</div>
</div>