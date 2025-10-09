import { defineSemanticTokens } from "@pandacss/dev";
import { brand } from "../../brand";

export const colors = defineSemanticTokens.colors({
	bg: {
		default: {
			initial: brand.colors.white,
			hover: brand.colors.white,
		},
		elevated: {
			initial: brand.colors.white,
			hover: brand.colors.white,
		},
		actionLow: {
			initial: brand.colors.white,
			hover: brand.colors.white,
		},
		actionHigh: {
			initial: brand.colors.white,
			hover: brand.colors.white,
		},
	},
	fg: {
		default: {
			initial: brand.colors.black,
			hover: brand.colors.black,
		},
		elevated: {
			initial: brand.colors.black,
			hover: brand.colors.black,
		},
		actionLow: {
			initial: brand.colors.black,
			hover: brand.colors.black,
		},
		actionHigh: {
			initial: brand.colors.black,
			hover: brand.colors.black,
		},
	},
});

export const { bg, fg } = colors;
