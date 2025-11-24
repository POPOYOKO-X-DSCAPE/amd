import { defineTextStyles } from "@pandacss/dev";

const LinotypeDidotProRoman =
	"LinotypeLinotypeDidotProRomanProRoman, serif";
const HelveticaProBold = "HelveticaProBold, sans-serif";
const HelveticaProLight = "HelveticaProBoldProLight, sans-serif";
const HelveticaProBoldOblique = "HelveticaProBoldOblique, sans-serif";
const HelveticaProLightOblique = "HelveticaProLightOblique, sans-serif";
const LinotypeDidotProItalic = "LinotypeLinotypeDidotProItalic, serif";

export const textStyles = defineTextStyles({
	title: {
		value: {
			_mobile: {
				fontFamily: LinotypeDidotProRoman,
				fontSize: "60px",
				lineHeight: "52px",
			},
			_desktop: {
				fontFamily: LinotypeDidotProRoman,
				fontSize: "122px",
			},
		},
	},
	menuItem: {
		value: {
			_mobile: {
				fontFamily: HelveticaProBold,
				fontSize: "20px",
			},
			_desktop: {
				fontFamily: HelveticaProBold,
				fontSize: "20px",
			},
		},
	},
	emphasis: {
		value: {
			_mobile: {
				fontFamily: HelveticaProBold,
				fontSize: "24px",
			},
			_desktop: {
				fontFamily: HelveticaProBold,
				fontSize: "40px",
			},
		},
	},
	body: {
		m: {
			value: {
				_mobile: {
					fontFamily: HelveticaProBold,
					fontSize: "24px",
					lineHeight: "24px",
				},
				_desktop: {
					fontFamily: HelveticaProBold,
					fontSize: "47px",
					lineHeight: "52px",
				},
			},
		},
		s: {
			value: {
				_mobile: {
					fontFamily: HelveticaProBold,
					fontSize: "16px",
					letterSpacing: "1px",
				},
				_desktop: {
					fontFamily: HelveticaProBold,
					fontSize: "22px",
					lineHeight: "29px",
				},
			},
		},
		xs: {
			value: {
				_mobile: {
					fontFamily: HelveticaProLight,
					fontSize: "16px",
				},
				_desktop: {
					fontFamily: HelveticaProLight,
					fontSize: "16px",
				},
			},
		},
	},
	section: {
		title: {
			value: {
				_mobile: {
					fontFamily: HelveticaProBold,
					fontSize: "12px",
				},
				_desktop: {
					fontFamily: HelveticaProBold,
					fontSize: "24px",
				},
			},
		},
		number: {
			value: {
				_mobile: {
					fontFamily: HelveticaProBoldOblique,
					fontSize: "38px",
				},
				_desktop: {
					fontFamily: HelveticaProBoldOblique,
					fontSize: "100px",
				},
			},
		},
	},
	footer: {
		section: {
			title: {
				value: {
					_mobile: {
						fontFamily: HelveticaProBold,
						fontSize: "22px",
					},
					_desktop: {
						fontFamily: HelveticaProBold,
						fontSize: "22px",
					},
				},
			},
		},
	},
});
