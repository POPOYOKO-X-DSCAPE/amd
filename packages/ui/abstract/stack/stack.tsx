import { css } from "@styles";
import classNames from "classnames";
import type { ReactNode } from "react";
import { forwardRef, useEffect, useRef } from "react";
import { Abstract, type AbstractProps } from "../abstract/abstract";

export interface StackProps extends AbstractProps {
	direction?: "column" | "row";
	alignItems?: "stretch" | "start" | "end" | "center";
	justifyContent?: "stretch" | "start" | "end" | "center";
	children: ReactNode;
	className?: string;
	scrollable?: boolean;
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(
	(
		{
			direction = "column",
			children,
			className,
			scrollable,
			justifyContent = "stretch",
			alignItems = "stretch",
			grow,
			position,
			role,
			ariaLabel,
			ariaLive,
		},
		ref,
	) => {
		// "stretch" is not a valid justify-content value; omitting the
		// declaration lets the container default (normal) apply instead.
		const panda = css({
			display: "flex",
			flexDirection: direction,
			maxHeight: "100%",
			maxWidth: "100%",
			alignItems: alignItems,
			justifyContent:
				justifyContent === "stretch" ? undefined : justifyContent,
		});
		const pandaParentScroll = css({
			position: "relative",
			maxWidth: "100%",
			maxHeight: "100%",
			overflow: "auto",
			// width: "max-content",
			minWidth:
				!grow && direction === "column" ? "min-content" : "initial",
		});

		// The scroll content is absolute so its intrinsic height never
		// propagates through the scroller: the scroller takes its height
		// from the flex layout and scrolls the content instead.
		const pandaScroll = css({
			position: "absolute",
			display: "flex",
			width: direction === "column" ? "100%" : "auto",
			flexDirection: direction,
		});

		const scrollRef = useRef<HTMLDivElement>(null);

		useEffect(() => {
			const inner = scrollRef.current;
			const parent = inner?.parentElement;
			if (!inner || !parent) {
				return;
			}

			// The absolute child escapes the parent's gap, so mirror it onto
			// the child and pad the trailing item to keep the rhythm.
			const gap = window.getComputedStyle(parent).gap;
			inner.style.gap = gap;
			const lastChild = inner.lastElementChild as HTMLElement;
			if (lastChild) {
				lastChild.style.marginBottom = gap;
			}
		}, []);

		if (scrollable) {
			return (
				<Abstract
					ref={ref}
					className={classNames(pandaParentScroll, className)}
					grow={grow}
					position={position}
				>
				<Abstract
					ref={scrollRef}
					className={classNames(pandaScroll)}
					// Inline so it always beats the default position class:
					// in the generated Panda output `.pos_relative` sorts
					// after `.pos_absolute`, which would otherwise put this
					// box in-flow and let its intrinsic height propagate
					// through the scroller (breaking the "absolute scroll
					// content" contract below).
					style={{ position: "absolute" }}
					grow
					role={role}
					ariaLabel={ariaLabel}
					ariaLive={ariaLive}
				>
						{children}
					</Abstract>
				</Abstract>
			);
		}

		return (
			<Abstract
				ref={ref}
				className={classNames(panda, className)}
				grow={grow}
				position={position}
				role={role}
				ariaLabel={ariaLabel}
				ariaLive={ariaLive}
			>
				{children}
			</Abstract>
		);
	},
);

Stack.displayName = "Stack";
