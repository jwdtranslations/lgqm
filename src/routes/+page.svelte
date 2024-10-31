<script lang="ts">
	import markdownit from 'markdown-it';
	import descriptionMarkdown from '../../content/description.md?raw';

	const md = markdownit({ linkify: true });
	md.linkify.set({ fuzzyEmail: false });

	const description = md.render(descriptionMarkdown);

	let { data } = $props();
	console.log(data);
</script>

<div class="mx-auto mb-32 max-w-prose p-1">
	<div class="prose dark:prose-invert">
		{@html description}
		<h1>Table of Contents</h1>
		{#each data.volumes as volume}
			<h2>{volume.volumeName}</h2>
			{#each volume.chapters as chapter}
				<p>
					<a href={`/${chapter.slug}`}
						>{chapter.metadata.chapter >= 0 ? `${chapter.metadata.chapter} - ` : ''}{chapter
							.metadata.title}</a
					>
				</p>
			{/each}
		{/each}
	</div>
</div>
