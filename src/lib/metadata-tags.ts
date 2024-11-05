import { type MetaTagsProps } from 'svelte-meta-tags';
export type MetadataInput = {
	title: string;
	description: string;
	canonical: string;
	images: {
		url: string;
		alt?: string;
		width?: number;
		height?: number;
	}[];
};

export const generateFields = (i: MetadataInput): MetaTagsProps => {
	return {
		title: i.title,
		description: i.description,
		canonical: i.canonical,
		openGraph: {
			title: i.title,
			description: i.description,
			images: i.images.map((img) => {
				return {
					url: img.url,
					alt: img.alt,
					width: img.width,
					height: img.height
				};
			})
		},
		twitter: {
			title: i.title,
			description: i.description,
			cardType: 'summary_large_image',
			image: i.images[0].url,
			imageAlt: i.images[0].alt
		}
	};
};
