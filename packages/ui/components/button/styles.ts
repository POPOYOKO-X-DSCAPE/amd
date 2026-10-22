import { css } from "@styles";

const common = css({
	alignItems: "center",
	// A button is content-sized: never stretch to the parent row's height
	// (a flex parent's default align-items: stretch used to turn buttons
	// into full-height blocks, e.g. in the ermewa app header).
	alignSelf: "center",
	cursor: "pointer",
	_focusVisible: {
		outlineWidth: "2px",
		outlineStyle: "solid",
		outlineColor: "s.fg.elevated.active",
		outlineOffset: "2px",
	},
});

const primary = css({
	gap: "c.buttonPrimary.gap",
	padding: "c.buttonPrimary.padding",
	rounded: "c.buttonPrimary.radius",
	bg: "c.buttonPrimary.bg.initial",
	color: "c.buttonPrimary.fg.initial",
	textStyle: "actionL",
	_hover: {
		bg: "c.buttonPrimary.bg.hover",
		color: "c.buttonPrimary.fg.hover",
	},
});

const secondary = css({
	gap: "c.buttonSecondary.gap",
	padding: "c.buttonSecondary.padding",
	rounded: "c.buttonSecondary.radius",
	bg: "c.buttonSecondary.bg.initial",
	color: "c.buttonSecondary.fg.initial",
	textStyle: "actionL",
	_hover: {
		bg: "c.buttonSecondary.bg.hover",
		color: "c.buttonSecondary.fg.hover",
	},
});

const ghost = css({
	gap: "c.buttonGhost.gap",
	padding: "c.buttonGhost.padding",
	rounded: "c.buttonGhost.radius",
	bg: "c.buttonGhost.bg.initial",
	color: "c.buttonGhost.fg.initial",
	textStyle: "actionL",
	_hover: {
		bg: "c.buttonGhost.bg.hover",
		color: "c.buttonGhost.fg.hover",
	},
});

const danger = css({
	gap: "c.buttonDanger.gap",
	padding: "c.buttonDanger.padding",
	rounded: "c.buttonDanger.radius",
	bg: "c.buttonDanger.bg.initial",
	color: "c.buttonDanger.fg.initial",
	textStyle: "actionL",
	_hover: {
		bg: "c.buttonDanger.bg.hover",
		color: "c.buttonDanger.fg.hover",
	},
});

const disabled = css({
	opacity: 0.2,
});

const menu = css({
	bg: "c.buttonMenu.bg.initial",
	color: "c.buttonMenu.fg.initial",
	minWidth: "100%",
	zIndex: 100,
	_hover: {
		bg: "c.buttonMenu.bg.hover",
		color: "c.buttonMenu.fg.hover",
	},
});

const menuItem = css({
	display: "flex",
	alignItems: "center",
	gap: "c.buttonSecondary.gap",
	padding: "c.buttonMenuItem.padding",
	rounded: "c.buttonMenuItem.radius",
	bg: "c.buttonMenuItem.bg.initial",
	cursor: "pointer",
	_hover: {
		bg: "c.buttonMenuItem.bg.hover",
		color: "c.buttonMenuItem.fg.hover",
	},
});

export const Styles = {
	common,
	primary,
	secondary,
	ghost,
	danger,
	menu,
	menuItem,
	disabled,
};
