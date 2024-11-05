<script lang="ts">
	import { browser } from '$app/environment';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import Remark42 from '$lib/remark42.svelte';
	import moment from 'moment';
	import markdownit from 'markdown-it';
	import footnote from 'markdown-it-footnote';
	import { mode } from 'mode-watcher';

	let { data } = $props();

	const md = markdownit({ linkify: true }).use(footnote);
	md.linkify.set({ fuzzyEmail: false });

	const rendered = $derived(md.render(data.body));

	const volumeName = $derived(
		data.volumes.find((v) => v.volumeValue === data.attrs.volume)?.volumeName ?? ''
	);
	const volumeOverriden = $derived(Boolean(data.volumeOverrides[data.attrs.volume]));
	const dateString = $derived(moment(data.attrs.date).format('MMMM Do, YYYY'));
</script>

<main class="mx-auto mb-24 max-w-prose p-1">
	<article class="prose dark:prose-invert">
		{#if volumeOverriden}
			<h2>{volumeName}</h2>
		{/if}
		<h1>{data.attrs.title}</h1>
		{#if !volumeOverriden}
			<h2>{volumeName}</h2>
		{/if}
		{#if data.attrs.chapter >= 0}
			<h2>Chapter {data.attrs.chapter}</h2>
		{/if}
		<span class="text-sm text-muted-foreground">Published {dateString}</span>
		<div class="mb-16">
			{@html rendered}
		</div>
	</article>
	<!-- nav -->
	<nav class="mb-16 flex justify-between">
		<div>
			{#if data.prevChapter}
				<Button href={`${base}/${data.prevChapter.slug}`} variant="outline">Previous</Button>
			{/if}
		</div>
		<div>
			{#if data.nextChapter}
				<Button href={`${base}/${data.nextChapter.slug}`} variant="outline">Next</Button>
			{/if}
		</div>
	</nav>
	<!-- comments -->
	{#if !data.attrs.hideComments && browser}
		<aside>
			{#key [$page.url.pathname, $mode]}
				<Remark42 />
			{/key}
		</aside>
	{/if}
</main>

<style lang="postcss">
	:global(a.footnote-backref) {
		@apply no-underline;
	}
</style>
