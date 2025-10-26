import { defineTokens } from "@pandacss/dev";
import { brand } from "../../brand";
import { bg, fg } from "../../semantic/colors";

export const colors = defineTokens.colors({
	bg: { value: "#000" },
	fg: { value: "#fff" },
});

export const spacing = defineTokens.spacing({
	padding: brand.spacings.m,
});

export const documentViewer = defineTokens({
	colors,
	spacing,
});
