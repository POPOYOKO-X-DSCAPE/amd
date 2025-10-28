import { defineSemanticTokens } from "@pandacss/dev";
import { brand } from "../../brand";
import { bg, fg } from "../../semantic/colors";
import { radius } from "../../semantic/radii";

export const colors = defineSemanticTokens.colors({
	bg: { value: "#000" },
	fg: { value: "#fff" },
});

export const spacing = defineSemanticTokens.spacing({
	padding: brand.spacings.l,
	margin: brand.spacings.x2l,
});

export const radii = defineSemanticTokens.radii({
	radius: radius.l,
});

export const snackbar = defineSemanticTokens({
	radii,
	colors,
	spacing,
});
