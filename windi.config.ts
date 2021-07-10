import { defineConfig } from 'windicss/helpers';

export default defineConfig({
	theme: {
		fontFamily: {
			head: ['Prompt', 'sans-serif'],
			body: ['Bai Jamjuree', 'serif']
		},
		extend: {
			backgroundImage: {
				'geometries-top': 'url(/images/bg-geometries-top.png)',
				'geometries-bottom': 'url(/images/bg-geometries-bottom.png)'
			},
			transitionProperty: {
				'transform-shadow': 'transform box-shadow'
			}
		}
	}
});
