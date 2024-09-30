import { z } from "zod";

export const SpotifyPlayableItem = z.object({
	album: z.object({
		album_type: z.string(),
		artists: z.array(
			z.object({
				name: z.string(),
				href: z.string(),
				uri: z.string(),
				external_urls: z.object({
					spotify: z.string(),
				}),
			}),
		),
		href: z.string(),
		id: z.string(),
		images: z.array(
			z.object({
				height: z.number(),
				width: z.number(),
				url: z.string(),
			}),
		),
		name: z.string(),
		uri: z.string(),
		external_urls: z.object({
			spotify: z.string(),
		}),
	}),
	artists: z.array(
		z.object({
			name: z.string(),
			href: z.string(),
			uri: z.string(),
			external_urls: z.object({
				spotify: z.string(),
			}),
		}),
	),
	name: z.string(),
	href: z.string(),
	uri: z.string(),
	type: z.string(),
});

export type SpotifyPlayableItem = z.infer<typeof SpotifyPlayableItem>;
