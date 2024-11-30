import { base } from '$app/paths';
import { PUBLIC_BASE_URL } from '$env/static/public';
import type { ChapterMetadata } from '$lib/metadata';
import type { MetadataInput } from '$lib/metadata-tags';
import fm from 'front-matter';
import type { LayoutServerLoad } from './$types';

export const ssr = true;
export const prerender = true;

type Chapter = { slug: string; path: string; metadata: ChapterMetadata };

type Metadata = {
	title: string;
	shortDescription: string;
	description: string;
	volumeOverrides?: { volume: string; replacement: string }[];
	icon: string;
	cover: string;
};

const imageToUrl = (image: string) =>
	image.startsWith('/') ? `${PUBLIC_BASE_URL}${base}${image.replace('/static', '')}` : image;

export const load: LayoutServerLoad = async (e) => {
	const metadata: Metadata = await e
		.fetch(`${base}/content/metadata.json`)
		.then((res) => res.json());
	const modules = import.meta.glob('/static/content/chapters/**/*.md');

	const descriptionMarkdown = metadata.description;

	// group paths
	const groupedPaths: Record<string, Chapter[]> = {};
	for (const m of Object.keys(modules)) {
		const filePath = m.replace('/static', base);
		const content = await e.fetch(filePath).then((res) => res.text());
		const data = fm(content);
		const chapterMetadata = data.attributes as ChapterMetadata;
		const path = m.match(/\/content\/chapters\/(.*)\.md/)?.[1];
		if (!path) continue;
		const slug = chapterMetadata.slug.trim() || path;
		const key = chapterMetadata.volume;
		if (!groupedPaths[key]) groupedPaths[key] = [];
		groupedPaths[key].push({ slug, metadata: chapterMetadata, path: filePath });
	}

	// sort paths
	const sortedVolumeValues = Object.keys(groupedPaths).sort((a, b) => parseInt(a) - parseInt(b));
	const volumeOverrides = (metadata.volumeOverrides ?? []).reduce(
		(acc, { volume, replacement }) => {
			acc[volume] = replacement;
			return acc;
		},
		{} as Record<string, string>
	);

	const sortedVolumes = sortedVolumeValues.map((volume) => {
		groupedPaths[volume].sort((a, b) => a.metadata.chapter - b.metadata.chapter);
		const volumeValue = groupedPaths[volume][0].metadata.volume;
		const volumeName = volumeOverrides[volumeValue] || `Volume ${volumeValue}`;
		return { volumeName, volumeValue, chapters: groupedPaths[volume] };
	});

	const allChapters = sortedVolumes.flatMap((volume) => volume.chapters);

	const baseMetaTags: MetadataInput = {
		title: metadata.title,
		description: metadata.shortDescription,
		canonical: base,
		images: [
			{
				url: imageToUrl(metadata.cover),
				alt: 'Cover image'
			}
		]
	};
	metadata.icon = imageToUrl(metadata.icon);

	const data = {
		metadata: metadata,
		volumeOverrides,
		volumes: sortedVolumes,
		allChapters,
		descriptionMarkdown,
		baseMetaTags
	};
	console.log(data);

	return data;
};
