<script lang="ts">
	import { dev } from '$app/environment';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import ConfigPopover from '$lib/config-popover.svelte';
	import { appConfig, fontMap } from '$lib/config.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import { deepMerge, MetaTags } from 'svelte-meta-tags';
	import '../app.css';
	import { generateFields } from '$lib/metadata-tags';

	let { children, data } = $props();

	if (!dev) {
		console.log = () => {};
		console.info = () => {};
		console.warn = () => {};
		console.debug = () => {};
		console.trace = () => {};
	}

	let metaTags = $derived(generateFields(deepMerge(data.baseMetaTags, $page.data.pageMetaTags)));
</script>

<svelte:head>
	<link rel="icon" href={data.metadata.icon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<MetaTags {...metaTags} />

<ModeWatcher />

<div class={`mt-8`} style={`font-family: ${fontMap[appConfig.value.font]};`}>
	<div class="mx-auto mb-8 max-w-prose">
		<div class="flex items-center justify-between">
			<a class="text-4xl font-extrabold tracking-tight lg:text-5xl" href={base || '/'}>
				{data.metadata.title}
			</a>
			<div class="float-right">
				<ConfigPopover />
			</div>
		</div>
	</div>
	{@render children()}
</div>
