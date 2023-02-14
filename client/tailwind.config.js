/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			height: {
				112: '28rem',
				128: '32rem',
				144: '36rem',
				160: '40rem'
			}
		}
	},
	plugins: [],
	darkMode: 'class'
};
