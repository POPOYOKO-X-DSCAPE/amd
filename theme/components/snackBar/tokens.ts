import { defineTokens } from "@pandacss/dev";
import { brand } from "../../brand";
import { bg, fg } from "../../semantic/colors";
import { radius } from "../../semantic/radii";

export const colors = defineTokens.colors({
	bg: bg.elevated.initial,
	fg: fg.elevated.initial,
});

export const spacing = defineTokens.spacing({
	padding: brand.spacings.l,
	margin: brand.spacings.x2l,
});

export const radii = defineTokens.radii({
	radius: radius.l,
});

export const snackbar = defineTokens({
	radii,
	colors,
	spacing,
});
