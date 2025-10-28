import { defineSemanticTokens } from "@pandacss/dev";
import { brand } from "../../brand";
import { bg, fg } from "../../semantic/colors";
import { radius } from "../../semantic/radii";

const spacing = defineSemanticTokens.spacing({
	padding: brand.spacings.xs,
});

export const radii = defineSemanticTokens.radii({
	radius: radius.m,
});

const primaryColors = defineSemanticTokens.colors({
	bg: { initial: { value: "#000" }, hover: { value: "#000" } },
	fg: { initial: { value: "#fff" }, hover: { value: "#fff" } },
});

const secondaryColors = defineSemanticTokens.colors({
	bg: { initial: { value: "#000" }, hover: { value: "#000" } },
	fg: { initial: { value: "#fff" }, hover: { value: "#fff" } },
});

export const buttonPrimary = defineSemanticTokens({
	radii,
	spacing,
	colors: primaryColors,
});

export const buttonSecondary = defineSemanticTokens({
	radii,
	spacing,
	colors: secondaryColors,
});
