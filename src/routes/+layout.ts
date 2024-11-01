import type { ChapterMetadata } from '$lib/metadata';
import fm from 'front-matter';
import type { LayoutLoad } from './$types';
import { building, dev } from '$app/environment';
import { base } from '$app/paths';
import type { MetadataInput } from '$lib/metadata-tags';
import { PUBLIC_BASE_URL } from '$env/static/public';

export const ssr = true;
export const prerender = true;

type Chapter = { slug: string; path: string; metadata: ChapterMetadata };

type Metadata = {
	title: string;
	shortDescription: string;
	iconName: string;
	volumeNameOverrides: Record<string, string>;
	cover: {
		alt: string;
		width: number;
		height: number;
	};
};

export const load: LayoutLoad = async (e) => {
	const metadata: Metadata = await e
		.fetch(`${base}/content/metadata.json`)
		.then((res) => res.json());
	const modules = import.meta.glob('/static/content/*/*.md');

	const descriptionMarkdown = await e
		.fetch(`${base}/content/description.md`)
		.then((res) => res.text());

	// group paths
	const groupedPaths: Record<string, Chapter[]> = {};
	for (const m of Object.keys(modules)) {
		const filePath = m.replace('/static', base);
		const content = await e.fetch(filePath).then((res) => res.text());
		const data = fm(content);
		const metadata = data.attributes as ChapterMetadata;
		const path = m.match(/\/content\/(.*)\.md/)?.[1];
		if (!path) continue;
		const segs = path.split('/', 2);
		const slug = segs.map(encodeURIComponent).join('/');
		if (!groupedPaths[metadata.volume]) groupedPaths[metadata.volume] = [];
		groupedPaths[metadata.volume].push({ slug, metadata, path: filePath });
	}

	// sort paths
	const sortedVolumeValues = Object.keys(groupedPaths).sort((a, b) => parseInt(a) - parseInt(b));
	const sortedVolumes = sortedVolumeValues.map((volume) => {
		groupedPaths[volume].sort((a, b) => a.metadata.chapter - b.metadata.chapter);
		const volumeValue = groupedPaths[volume][0].metadata.volume;
		const volumeName = metadata.volumeNameOverrides[volumeValue] || `Volume ${volumeValue}`;
		return { volumeName, chapters: groupedPaths[volume] };
	});

	const allChapters = sortedVolumes.flatMap((volume) => volume.chapters);

	const baseMetaTags: MetadataInput = {
		title: metadata.title,
		description: metadata.shortDescription,
		canonical: base,
		images: [
			{
				url: `${PUBLIC_BASE_URL}${base}/content/cover.jpg`,
				alt: metadata.cover.alt,
				width: metadata.cover.width,
				height: metadata.cover.height
			}
		]
	};

	const data = {
		metadata: metadata,
		volumes: sortedVolumes,
		allChapters,
		descriptionMarkdown,
		baseMetaTags
	};
	console.log(data);

	return data;
};
