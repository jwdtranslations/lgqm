import type { ChapterMetadata } from '$lib/metadata';
import fm from 'front-matter';
import type { PageLoad } from './$types';

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
