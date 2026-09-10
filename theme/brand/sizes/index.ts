import { defineTokens } from "@pandacss/dev";

export const sizes = defineTokens.sizes({
	screenHeight: { value: "dvh" },
	full: { value: "100%" },
	sizingBase: { value: "20" },

	sizeXtraSmall: { value: "4" },
	sizeSmall: { value: "8" },
	sizeMedium: { value: "16" },
	sizeLarge: { value: "24" },
	sizeXtraLarge: { value: "32" },
	sizeXtraXtraLarge: { value: "64" },
	sizeXtraXtraXtraLarge: { value: "92" },
	sizeXtraXtraXtraXtraLarge: { value: "128" },
});
