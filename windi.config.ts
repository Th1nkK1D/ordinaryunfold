import { defineConfig } from 'windicss/helpers';

export default defineConfig({
	theme: {
		fontFamily: {
			head: ['Prompt', 'sans-serif'],
			body: ['Bai Jamjuree', 'serif']
		},
		extend: {
			transitionProperty: {
				'transform-shadow': 'transform box-shadow',
				height: 'min-height'
			}
		}
	}
});
