<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import { appConfig } from '$lib/config.svelte.js';
	import Remark42 from '$lib/remark42.svelte';
	import markdownit from 'markdown-it';
	import footnote from 'markdown-it-footnote';
	import { mode } from 'mode-watcher';

	let { data } = $props();

	const md = markdownit({ linkify: true }).use(footnote);
	md.linkify.set({ fuzzyEmail: false });

	const rendered = $derived(md.render(data.body));
</script>

<div class="mx-auto mb-24 max-w-prose p-1">
	<div class="prose dark:prose-invert">
		<h1>{data.attrs.title}</h1>
		{#if data.attrs.chapter >= 0}
			<h2>Chapter {data.attrs.chapter}</h2>
		{/if}
		<div class="mb-16">
			{@html rendered}
		</div>
	</div>
	<!-- nav -->
	<div class="mb-16 flex justify-between">
		<div>
			{#if data.prevChapter}
				<Button href={`/${data.prevChapter.slug}`} variant="outline">Previous</Button>
			{/if}
		</div>
		<div>
			{#if data.nextChapter}
				<Button href={`/${data.nextChapter.slug}`} variant="outline">Next</Button>
			{/if}
		</div>
	</div>
	<!-- comments -->
	{#if !data.attrs.hideComments}
		{#key [$page.url.pathname, $mode]}
			<Remark42 />
		{/key}
	{/if}
</div>

<style lang="postcss">
	:global(a.footnote-backref) {
		@apply no-underline;
	}
</style>
