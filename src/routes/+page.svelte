<script lang="ts">
	import markdownit from 'markdown-it';
	import { Button } from '$lib/components/ui/button';
	import { base } from '$app/paths';

	let { data } = $props();

	const md = markdownit({ linkify: true });
	md.linkify.set({ fuzzyEmail: false });

	const description = md.render(data.descriptionMarkdown);
</script>

<div class="mx-auto mb-32 max-w-prose p-1">
	<div class="prose dark:prose-invert">
		<main>
			<article>
				{@html description}
			</article>
		</main>
		<nav>
			<h1>Table of Contents</h1>
			{#each data.volumes as volume}
				<h2>{volume.volumeName}</h2>
				{#each volume.chapters as chapter}
					<p>
						<Button href={`${base}/${chapter.slug}`} variant="link"
							>{chapter.metadata.chapter >= 0 ? `${chapter.metadata.chapter} - ` : ''}{chapter
								.metadata.title}</Button
						>
					</p>
				{/each}
			{/each}
		</nav>
	</div>
</div>
