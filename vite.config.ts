import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import mdLoad from './src/lib/rollup/md-load';

export default defineConfig({
	plugins: [
		sveltekit(),
		// @ts-ignore
		mdLoad()
	],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
