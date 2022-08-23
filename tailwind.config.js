/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			gridTemplateColumns: {
				layout: '1fr 1px 1fr'
			},
			gridTemplateRows: {
				split: '1fr 10px 1fr'
			}
		}
	},
	plugins: [require('daisyui')]
};
