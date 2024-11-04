import type { ChapterMetadata } from '$lib/metadata';
import fm from 'front-matter';
import type { MetadataInput } from '$lib/metadata-tags';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, parent, fetch }) => {
	const { slug } = params;

	const parentData = await parent();
	const index = parentData.allChapters.findIndex((c) => c.slug === slug);
	const chapter = parentData.allChapters[index];
	if (!chapter) {
		console.log('Chapter not found:', slug);
		throw new Error(`Chapter not found: ${slug}`);
	}
	const markdown = await fetch(parentData.allChapters[index].path).then((res) => res.text());
	const content = fm(markdown);
	const prevChapter = parentData.allChapters[index - 1];
	const nextChapter = parentData.allChapters[index + 1];

	const attrs = content.attributes as ChapterMetadata;

	let title = parentData.baseMetaTags.title;
	if (!parentData.metadata.volumeOverrides?.[attrs.volume]) {
		title += ` | Volume ${attrs.volume}`;
	}
	if (attrs.chapter >= 0) title += ` | Chapter ${attrs.chapter}`;
	title += ` | ${attrs.title}`;
	const pageMetaTags: Partial<MetadataInput> = {
		title
	};

	return {
		attrs,
		body: content.body,
		prevChapter,
		nextChapter,
		pageMetaTags
	};
};
