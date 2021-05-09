import preprocess from 'svelte-preprocess';
import WindiCSS from 'vite-plugin-windicss';
import adapter from '@sveltejs/adapter-static';
import dsv from '@rollup/plugin-dsv';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: adapter(),
		vite: {
			plugins: [WindiCSS.default(), dsv()]
		}
	}
};

export default config;
