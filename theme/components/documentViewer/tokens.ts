import { defineSemanticTokens } from "@pandacss/dev";
import { brand } from "../../brand";
import { bg, fg } from "../../semantic/colors";

export const colors = defineSemanticTokens.colors({
	bg: { value: "#000" },
	fg: { value: "#fff" },
});

export const spacing = defineSemanticTokens.spacing({
	padding: brand.spacings.m,
});

export const documentViewer = defineSemanticTokens({
	colors,
	spacing,
});
