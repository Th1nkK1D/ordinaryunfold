import preprocess from 'svelte-preprocess';
import WindiCSS from 'vite-plugin-windicss';
import adapter from '@sveltejs/adapter-static';
import dsv from '@rollup/plugin-dsv';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(),
	kit: {
		prerender: {
			default: true
		},
		adapter: adapter(),
		vite: {
			plugins: [WindiCSS(), dsv()]
		}
	}
};

export default config;
