import { css } from "@styles";
import classNames from "classnames";
import type React from "react";
import { forwardRef } from "react";

type Position = "center" | "top" | "right" | "left" | "bottom";
export type PositionCombo = [Position, Position];
export interface AbstractProps {
	children?: React.ReactNode;
	className?: string;
	id?: string;
	grow?: boolean;
	role?: string;
	ariaLabel?: string;
	ariaLive?: "polite" | "assertive";
	/**
	 * Inline styles, merged AFTER the class-based ones (inline wins the
	 * cascade). Needed where the generated stylesheet order cannot be
	 * relied on — e.g. the scrollable Stack's inner box, which must stay
	 * `position: absolute` even though the default position class
	 * (`.pos_relative`) sorts after `.pos_absolute` in the Panda output.
	 */
	style?: React.CSSProperties;
	position?:
		| { type: "relative" }
		| { type: "relativeToApp"; position: PositionCombo }
		| { type: "relativeToParent"; position: PositionCombo };
}

export const Abstract = forwardRef<HTMLDivElement, AbstractProps>(
	(
		{
			children,
			className,
			id,
			grow,
			role,
			ariaLabel,
			ariaLive,
			style,
			position = { type: "relative" },
		},
		ref,
	) => {
		const styleGrow = grow ? 1 : undefined;

		const positionClass = () => {
			if (position.type === "relative") {
				return css({
					position: "relative",
				});
			}

			const shouldCenterHeight = () => {
				let shouldCenter = false;
				if (
					position.position[0] === "center" &&
					position.position[1] === "center"
				) {
					shouldCenter = true;
				}
				if (
					(position.position.includes("left") ||
						position.position.includes("right")) &&
					new Set(position.position).size <= 1
				) {
					shouldCenter = true;
				}
				if (
					(position.position.includes("top") &&
						position.position.includes("bottom")) ||
					(position.position.includes("right") &&
						position.position.includes("left"))
				) {
					shouldCenter = true;
				}
				if (position.position.includes("center")) {
					if (
						position.position.includes("left") ||
						position.position.includes("right")
					) {
						shouldCenter = true;
					}
				}

				return shouldCenter;
			};

			const shouldCenterWidth = () => {
				let shouldCenter = false;
				if (
					position.position[0] === "center" &&
					position.position[1] === "center"
				) {
					shouldCenter = true;
				}
				if (
					(position.position.includes("top") ||
						position.position.includes("bottom")) &&
					new Set(position.position).size <= 1
				) {
					shouldCenter = true;
				}
				if (
					(position.position.includes("top") &&
						position.position.includes("bottom")) ||
					(position.position.includes("right") &&
						position.position.includes("left"))
				) {
					shouldCenter = true;
				}
				if (position.position.includes("center")) {
					if (
						position.position.includes("top") ||
						position.position.includes("bottom")
					) {
						shouldCenter = true;
					}
				}
				return shouldCenter;
			};

			return css({
				position:
					position.type === "relativeToApp"
						? "fixed"
						: position.type === "relativeToParent"
							? "absolute"
							: "inherit",
				top: position.position.includes("top") ? 0 : "inherit",
				bottom: position.position.includes("bottom") ? 0 : "inherit",
				right: position.position.includes("right") ? 0 : "inherit",
				left: position.position.includes("left") ? 0 : "inherit",
				marginLeft: shouldCenterWidth() ? "50vw" : "",
				marginRight: shouldCenterWidth() ? "50vw" : "",
				marginTop: shouldCenterHeight() ? "50vh" : "",
				marginBottom: shouldCenterHeight() ? "50vh" : "",
				width: "unset",
				height: "unset",
			});
		};

		return (
			<div
				ref={ref}
				className={classNames(className, positionClass())}
				style={
					style || styleGrow
						? { flexGrow: styleGrow, ...style }
						: undefined
				}
				id={id}
				role={role}
				aria-label={ariaLabel}
				aria-live={ariaLive}
			>
				{children}
			</div>
		);
	},
);

Abstract.displayName = "Abstract";
