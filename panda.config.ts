import { defineConfig } from "@pandacss/dev";

import { theme } from "./theme";
import { animationStyles } from "./theme/animation/animation-styles";
import { keyframes } from "./theme/animation/keyframes";
import { textStyles } from "./theme/semantic/textStyles";

export default defineConfig({
	globalCss: {
		"#root": {
			height: "100vh",
		},
		"html, body": {
			height: "100vh",
			margin: 0,
			padding: 0,
		},
		div: {
			display: "flex",
		},
		button: {
			cursor: "pointer",
		},
	},
	globalFontface: {
		HelveticaProBold: {
			src: "url(../projects/amd/src/assets/fonts/HelveticaProBold/font.woff2)",
		},
		HelveticaProBoldOblique: {
			src: "url(../projects/amd/src/assets/fonts/HelveticaProBoldOblique/font.woff2)",
		},
		HelveticaProLight: {
			src: "url(../projects/amd/src/assets/fonts/HelveticaProLight/font.woff2)",
		},
		HelveticaProLightOblique: {
			src: "url(../projects/amd/src/assets/fonts/HelveticaProLightOblique/font.woff2)",
		},
		LinotypeDidotProItalic: {
			src: "url(../projects/amd/src/assets/fonts/LinotypeDidotProItalic/font.woff2)",
		},
		LinotypeDidotProRoman: {
			src: "url(../projects/amd/src/assets/fonts/LinotypeDidotProRoman/font.woff2)",
		},
	},
	// emitTokensOnly: true,
	conditions: {
		light: "[data-color-mode=light] &",
		dark: "[data-color-mode=dark] &",
		pinkTheme: "[data-theme=pink] &",
		blueTheme: "[data-theme=blue] &",
	},

	// Whether to use css reset
	preflight: true,
	outExtension: "js",
	// watch: true,

	// Where to look for your css declarations
	include: [
		"./packages/**/*.{js,jsx,ts,tsx}",
		"./projects/**/*.{js,jsx,ts,tsx}",
	],

	presets: [],

	// Useful for theme customization
	theme: {
		extend: {
			textStyles,
			keyframes,
			animationStyles,
			...theme,
		},
	},
	// The output directory for your css system
	outdir: "styled-system",
});
