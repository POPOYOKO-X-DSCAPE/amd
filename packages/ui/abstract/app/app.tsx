import { css } from "@styles";
import classNames from "classnames";
import type React from "react";
import { forwardRef } from "react";
import "../../../../styled-system/styles.css";
import { Stack } from "../stack/stack";

interface AppProps {
	children: React.ReactNode;
	className?: string;
}

const panda = css({
	bg: "c.app.bg",
	color: "c.app.fg",
	width: "100vw",
	height: "100vh",
	maxWidth: "100vw",
	maxHeight: "100vh",
	"& button": {
		// Flex only: a forced align-items here (0-1-1) would outrank any
		// align-items atomic a button sets on itself (0-1-0) — e.g. a
		// centered row button would silently stretch its children. The
		// kit Button owns its own alignment (alignItems + alignSelf).
		display: "flex",
	},
});

export const App = forwardRef<HTMLDivElement, AppProps>(
	({ children, className }, ref) => {
		return (
			<Stack
				ref={ref}
				direction="column"
				className={classNames("app", panda, className)}
			>
				{children}
			</Stack>
		);
	},
);

App.displayName = "App";