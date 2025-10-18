import { defineTokens } from "@pandacss/dev";
import { brand } from "../../brand";
import { bg, fg } from "../../semantic/colors";

export const sidebar = defineTokens({
	colors: {
		bg: { initial: bg.elevated.initial, hover: bg.elevated.hover },
		fg: { initial: fg.elevated.initial },
		element: {
			bg: {
				initial: bg.elevated.initial,
				hover: bg.elevated.hover,
			},
			fg: {
				initial: fg.elevated.initial,
				hover: fg.elevated.hover,
			},
		},
	},
	spacing: {
		element: {
			padding: { initial: brand.spacings.m },
			paddingX: { intial: brand.spacings.m },
		},
		groupChildren: {
			paddingLeft: { initial: brand.spacings.l },
		},
	},
});
