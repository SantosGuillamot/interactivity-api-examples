<?php
	$currentDateTime = new DateTime();
	$targetDateTime = new DateTime($attributes['date']);
	$timeDifference = $currentDateTime->diff($targetDateTime);
	// Extract the days, hours, minutes, and seconds
	$context   = array(
		'days' => $timeDifference->d,
		'hours'  => $timeDifference->h,
		'minutes'  => $timeDifference->i,
		'seconds'  => $timeDifference->s,
	);
?>

<div
	<?php echo get_block_wrapper_attributes(); ?>
	data-wp-interactive='{"namespace": "interactivityAPIExamples"}'
	data-wp-context='<?php echo wp_json_encode( $context ); ?>'
	data-wp-init="callbacks.startCountdown"
>
	<span data-wp-text="context.days"></span><span>D</span>
	<span data-wp-text="context.hours"></span><span>H</span>
	<span data-wp-text="context.minutes"></span><span>M</span>
	<span data-wp-text="context.seconds"></span><span>S</span>
</div>