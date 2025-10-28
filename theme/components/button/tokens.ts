import { defineTokens } from "@pandacss/dev";
import { brand } from "../../brand";
import { bg, fg } from "../../semantic/colors";
import { radius } from "../../semantic/radii";

const spacing = defineTokens.spacing({
	padding: brand.spacings.xs,
});

export const radii = defineTokens.radii({
	radius: radius.m,
});

const primaryColors = defineTokens.colors({
	bg: { initial: { value: "#000" }, hover: { value: "#000" } },
	fg: { initial: { value: "#fff" }, hover: { value: "#fff" } },
});

const secondaryColors = defineTokens.colors({
	bg: { initial: { value: "#000" }, hover: { value: "#000" } },
	fg: { initial: { value: "#fff" }, hover: { value: "#fff" } },
});

export const buttonPrimary = defineTokens({
	radii,
	spacing,
	colors: primaryColors,
});

export const buttonSecondary = defineTokens({
	radii,
	spacing,
	colors: secondaryColors,
});
