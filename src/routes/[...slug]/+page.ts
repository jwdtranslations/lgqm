import type { ChapterMetadata } from '$lib/metadata';
import type { PageLoad } from './$types';
import fm from 'front-matter';

export const load: PageLoad = async ({ params, parent }) => {
	const { slug } = params;
	const pathSegs = slug.split('/').map(decodeURIComponent);
	const markdown = (await import(`../../../content/${pathSegs[0]}/${pathSegs[1]}.md?raw`)).default;
	var content = fm(markdown);

	const parentData = await parent();
	const index = parentData.allChapters.findIndex((c) => c.slug === slug);
	const prevChapter = parentData.allChapters[index - 1];
	const nextChapter = parentData.allChapters[index + 1];

	return {
		attrs: content.attributes as ChapterMetadata,
		body: content.body,
		prevChapter,
		nextChapter
	};
};
