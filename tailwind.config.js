/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			gridTemplateColumns: {
				header: '100px 1fr 100px'
			},
			gridTemplateRows: {
				split: '1fr 10px 1fr'
			}
		}
	},
	plugins: [require('daisyui')]
};
