<script lang="ts">
	import { dev } from '$app/environment';
	import ConfigPopover from '$lib/config-popover.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';

	let { children, data } = $props();

	if (!dev) {
		console.log = () => {};
		console.info = () => {};
		console.warn = () => {};
		console.debug = () => {};
		console.trace = () => {};
	}
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<ModeWatcher />

<div class="mt-2">
	<div class="mx-auto mb-8 max-w-prose">
		<div class="flex items-center justify-between">
			<a class="text-4xl font-extrabold tracking-tight lg:text-5xl" href="/">
				{data.metadata.title}
			</a>
			<div class="float-right">
				<ConfigPopover />
			</div>
		</div>
	</div>
	{@render children()}
</div>
