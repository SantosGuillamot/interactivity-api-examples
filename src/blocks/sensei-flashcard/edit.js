import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { InnerBlocks } from '@wordpress/block-editor';

export default function Edit() {
	return (
		<div {...useBlockProps()}>
			<p>Add an image as the first block (front face).</p>

			<p>Add a paragraph as the second block (back face).</p>
			<InnerBlocks />
		</div>
	);
}
