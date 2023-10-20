<?php
$unique_id = substr(uniqid(), -5);

wp_initial_state(
	'interactivityAPIExamples',
	array(
		'isFrontside'    => true,
	)
);

$processor = new WP_HTML_Tag_Processor( $content );
$processor->next_tag('FIGURE');
$processor->add_class('flashcard-front');

$processor->next_tag('P');
$processor->add_class('flashcard-back');

$flashcard_content = $processor->get_updated_html();

?>

<div
	<?php echo get_block_wrapper_attributes(); ?>
	data-wp-interactive='{"namespace": "interactivityAPIExamples"}'
>
	<div 
    class="flashcard" 
    data-wp-on--click="actions.flip" 
    aria-controls="flashcard-<?php echo $unique_id; ?>"
  >
    <div class="flashcard-inner" data-wp-style--transform="state.flipTransition">
      <?php echo $flashcard_content; ?>
    </div>
  </div>
</div>