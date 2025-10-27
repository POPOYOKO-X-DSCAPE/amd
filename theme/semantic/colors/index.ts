import { defineSemanticTokens } from "@pandacss/dev";
import { brand } from "../../brand";

export const colors = defineSemanticTokens.colors({
	bg: {
		default: {
			initial: {
				value: {
					base: brand.colors.white.value,
					_dark: brand.colors.black.value,
				},
			},
			hover: {
				value: {
					base: brand.colors.lighterGrey.value,
					_dark: brand.colors.darkGrey.value,
				},
			},
		},
		elevated: {
			initial: {
				value: {
					base: brand.colors.white.value,
					_dark: brand.colors.black.value,
				},
			},
			hover: {
				value: {
					base: brand.colors.white.value,
					_dark: brand.colors.black.value,
				},
			},
		},
		actionLow: {
			initial: {
				value: {
					base: brand.colors.white.value,
					_dark: brand.colors.black.value,
				},
			},
			hover: {
				value: {
					base: brand.colors.lighterGrey.value,
					_dark: brand.colors.darkGrey.value,
				},
			},
		},
		actionHigh: {
			initial: {
				value: {
					base: brand.colors.white.value,
					_dark: brand.colors.black.value,
				},
			},
			hover: {
				value: {
					base: brand.colors.lighterGrey.value,
					_dark: brand.colors.darkGrey.value,
				},
			},
		},
		gentle: {
			initial: {
				value: {
					base: brand.colors.lightGrey.value,
					_dark: brand.colors.darkGrey.value,
				},
			},
		},
	},
	fg: {
		default: {
			initial: {
				value: {
					base: brand.colors.black.value,
					_dark: brand.colors.white.value,
				},
			},
			hover: {
				value: {
					base: brand.colors.black.value,
					_dark: brand.colors.white.value,
				},
			},
		},
		elevated: {
			initial: {
				value: {
					base: brand.colors.black.value,
					_dark: brand.colors.white.value,
				},
			},
			hover: {
				value: {
					base: brand.colors.black.value,
					_dark: brand.colors.white.value,
				},
			},
		},
		actionLow: {
			initial: {
				value: {
					base: brand.colors.black.value,
					_dark: brand.colors.white.value,
				},
			},
			hover: {
				value: {
					base: brand.colors.black.value,
					_dark: brand.colors.white.value,
				},
			},
		},
		actionHigh: {
			initial: {
				value: {
					base: brand.colors.black.value,
					_dark: brand.colors.white.value,
				},
			},
			hover: {
				value: {
					base: brand.colors.black.value,
					_dark: brand.colors.white.value,
				},
			},
		},
		gentle: {
			initial: {
				value: {
					base: brand.colors.darkGrey.value,
					_dark: brand.colors.lightGrey.value,
				},
			},
		},
	},
});

export const { bg, fg } = colors;
