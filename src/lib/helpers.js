import { createClient } from "@sanity/client";
import { createImageBuilder } from "astro-sanity";
import { getImage } from "astro:assets";

const builder = createImageBuilder(
	createClient({
		name: "default",
		title: "",
		projectId: "",
		dataset: "production",
		apiVersion: "2023-08-31",
		useCdn: true,
	}),
);

export function getSanityImageURL(source) {
	return builder.image(source);
}

export async function getAstroOptimizedImage(source) {
	const sanityUrl = builder.image(source);
	const optimizedImage = await getImage({
		src: sanityUrl,
		format: "webp",
	});
	return optimizedImage.src;
}
