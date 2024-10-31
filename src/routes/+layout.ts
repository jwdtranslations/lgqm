import type { ChapterMetadata } from '$lib/metadata';
import fm from 'front-matter';
import type { LayoutLoad } from './$types';

export const ssr = false;
export const prerender = true;

type Chapter = { slug: string; metadata: ChapterMetadata };

type Metadata = {
	title: string;
	volumeNameOverrides: Record<string, string>;
};

export const load: LayoutLoad = async () => {
	const metadataJson = await import('../../content/metadata.json?raw');
	const metadata = JSON.parse(metadataJson.default) as Metadata;
	const prefix = '/content/';
	const modules = import.meta.glob('/content/*/*.md');

	// get all paths
	const paths = Object.keys(modules).map((path) => {
		return path.replace(prefix, '').replace('.md', '');
	});

	// group paths
	const groupedPaths: Record<string, Chapter[]> = {};
	for (const m of Object.keys(modules)) {
		const content = (await import(m + '?raw')).default;
		const data = fm(content);
		const metadata = data.attributes as ChapterMetadata;
		const slug = m.replace(prefix, '').replace('.md', '');
		if (!groupedPaths[metadata.volume]) groupedPaths[metadata.volume] = [];
		groupedPaths[metadata.volume].push({ slug, metadata });
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

	const data = { metadata: metadata, volumes: sortedVolumes, allChapters };

	console.log(data);

	return data;
};
