import { defineThemeContract } from "@pandacss/dev";
import { componentsTokens as originalsComponentsTokens } from "./defaultTheme";
import { componentsTokens } from "./defaultTheme";
import { semantic } from "./semantic";

const themeContract = defineThemeContract({
	semanticTokens: originalsComponentsTokens,
});

export const theme = themeContract({
	tokens: semantic,
	semanticTokens: { ...componentsTokens },
});
