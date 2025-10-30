import { defineTokens } from "@pandacss/dev";
import type {
	Recursive,
	SemanticToken,
	Token,
	TokenDataTypes,
} from "@pandacss/types";
import { app } from "./components/app/tokens";
import {
	buttonPrimary,
	buttonSecondary,
} from "./components/button/tokens";
import { documentViewer } from "./components/documentViewer/tokens";
import { header } from "./components/header/tokens";
import { sidebar } from "./components/sidebar/tokens";
import { snackbar } from "./components/snackBar/tokens";

const getTokensFromTokenDataTypes = <T extends keyof TokenDataTypes>(
	tokenType: T,
	tokens: Recursive<SemanticToken<string>>,
	prefix: string,
) => {
	return Object.values(
		Object.entries(tokens).map(([key, value]) => {
			return { [key]: value[tokenType as keyof typeof value] };
		}),
	)
		.filter((subElement) => {
			return Object.entries(subElement)[0][1] !== undefined;
		})
		.reduce(
			(acc, item) => {
				const [componentName] = Object.keys(item);

				Object.assign(acc, {
					[`${prefix}.${componentName}`]: item[componentName],
				});
				return acc;
			},
			{} as Record<string, TokenDataTypes[T]>,
		) as Recursive<SemanticToken<string>>;
};

const components = {
	app,
	header,
	sidebar,
	documentViewer,
	buttonPrimary,
	buttonSecondary,
	snackbar,
};

const getAllComponentTokens = () => {
	const tokenTypes = [
		"colors",
		"sizes",
		"spacing",
		"fonts",
		"fontSizes",
		"fontWeights",
		"radii",
	] as const;

	return tokenTypes.reduce(
		(acc, tokenType) => {
			console.log(acc);

			const tokens = getTokensFromTokenDataTypes(
				tokenType,
				components,
				"c",
			);
			if (Object.keys(tokens).length > 0) {
				acc[tokenType] = tokens;
			}
			return acc;
		},
		{} as Record<string, Recursive<SemanticToken<string>>>,
	);
};

export const componentsTokens = defineTokens(getAllComponentTokens());

console.log(componentsTokens);
