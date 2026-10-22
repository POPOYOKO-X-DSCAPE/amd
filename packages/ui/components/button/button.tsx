import {
	Button as AriaButton,
	MenuButton,
	MenuProvider,
} from "@ariakit/react";
import { Menu, MenuItem } from "@ariakit/react";

import classNames from "classnames";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import type { Action } from "../../types";
import { Styles } from "./styles";

export type ButtonLevel = "primary" | "secondary" | "ghost" | "danger";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	level?: ButtonLevel;
}

export const Button = ({
	children,
	level = "primary",
	type = "button",
	onClick,
	disabled,
	className,
	...rest
}: IButtonProps) => {
	const levelStyle =
		level === "secondary"
			? Styles.secondary
			: level === "ghost"
				? Styles.ghost
				: level === "danger"
					? Styles.danger
					: Styles.primary;

	return (
		<AriaButton
			type={type}
			onClick={onClick}
			className={classNames(
				Styles.common,
				levelStyle,
				disabled && Styles.disabled,
				className,
			)}
			disabled={disabled}
			{...rest}
		>
			{children}
		</AriaButton>
	);
};

interface IButtonMenuProps {
	children: ReactNode;
	level?: ButtonLevel;
	items: Action[];
	placement?: "bottom-end" | "bottom-start" | "top-end" | "top-start";
	className?: string;
	"aria-label"?: string;
	title?: string;
}

Button.Menu = ({
	children,
	level = "secondary",
	items,
	placement = "bottom-start",
	className,
	"aria-label": ariaLabel,
	title,
}: IButtonMenuProps) => {
	const levelStyle =
		level === "primary"
			? Styles.primary
			: level === "ghost"
				? Styles.ghost
				: level === "danger"
					? Styles.danger
					: Styles.secondary;

	return (
		<MenuProvider placement={placement}>
			<MenuButton
				className={classNames(Styles.common, levelStyle, className)}
				aria-label={ariaLabel}
				title={title}
			>
				{children}
			</MenuButton>
			<Menu className={Styles.menu}>
				{items.map((child, index) => (
					<MenuItem
						// biome-ignore lint/suspicious/noArrayIndexKey: menu items are static per usage
						key={index}
						onClick={() => child.callback()}
						className={Styles.menuItem}
					>
						{child.icon}
						{child.label}
					</MenuItem>
				))}
			</Menu>
		</MenuProvider>
	);
};
