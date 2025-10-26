import { defineTokens } from "@pandacss/dev";
import { brand } from "../../brand";
import { bg, fg } from "../../semantic/colors";

export const sidebar = defineTokens({
	colors: {
		bg: { initial: { value: "#000" }, hover: { value: "#000" } },
		fg: { initial: { value: "#fff" } },
		element: {
			bg: {
				initial: { value: "#000" },
				hover: { value: "#000" },
			},
			fg: {
				initial: { value: "#fff" },
				hover: { value: "#fff" },
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
