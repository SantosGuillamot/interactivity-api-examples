import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';

export default function Edit() {
	// Initialize state
	const [apiKey, setApiKey] = useState('');

	// Load API key from localStorage if it exists
	useEffect(() => {
		const storedApiKey = localStorage.getItem('OpenAI-APIkey');
		if (storedApiKey) {
			setApiKey(storedApiKey);
		}
	}, []);

	// Handle input change
	const handleChange = (e) => {
		const newApiKey = e.target.value;
		setApiKey(newApiKey);
		localStorage.setItem('OpenAI-APIkey', newApiKey);
	};

	return (
		<div {...useBlockProps()} style={{ padding: '20px' }}>
			<label
				htmlFor="apiKey"
				style={{
					fontFamily: 'Arial, sans-serif',
					fontSize: '16px',
					fontWeight: 'bold',
					marginRight: '10px',
				}}
			>
				Enter your API Key:
			</label>
			<input
				type="password" // Obscure the API key
				id="apiKey"
				name="apiKey"
				placeholder="Paste your API Key here"
				value={apiKey}
				onChange={handleChange}
				style={{
					fontFamily: 'Arial, sans-serif',
					fontSize: '16px',
					padding: '10px',
					border: '2px solid #ccc',
					borderRadius: '4px',
				}}
			/>
		</div>
	);
}
