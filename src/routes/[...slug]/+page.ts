import { building, dev } from '$app/environment';
import type { ChapterMetadata } from '$lib/metadata';
import type { EntryGenerator, PageLoad } from './$types';
import fm from 'front-matter';

export const entries: EntryGenerator = async () => {
	if (building) {
		const { glob } = await import('glob');
		const mdFiles = await glob('static/content/**/*.md');
		const paths = mdFiles.map((file) => file.replace('static/content/', '').replace('.md', ''));
		console.log(paths);

		return paths.map((p) => ({ slug: p }));
	}
	return [];
};

export const load: PageLoad = async ({ params, parent, fetch }) => {
	const { slug } = params;
	const parentData = await parent();
	const index = parentData.allChapters.findIndex((c) => c.slug === slug);
	const markdown = await fetch(parentData.allChapters[index].path).then((res) => res.text());
	const content = fm(markdown);
	const prevChapter = parentData.allChapters[index - 1];
	const nextChapter = parentData.allChapters[index + 1];

	return {
		attrs: content.attributes as ChapterMetadata,
		body: content.body,
		prevChapter,
		nextChapter
	};
};
