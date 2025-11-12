import { Stack } from "@packages/ui";
import { css } from "@styles";
import { useNavigate } from "react-router-dom";

import Separator from "../separator";

import { Button as AriaButton } from "@ariakit/react";
import { useEffect } from "react";
import Dark from "../../assets/svgs/Dark.svg?react";
import English from "../../assets/svgs/English.svg?react";
import French from "../../assets/svgs/French.svg?react";
import Light from "../../assets/svgs/Light.svg?react";
import SpeechBalloon from "../../assets/svgs/SpeechBalloon.svg?react";
import { useColorMode } from "../../contexts/color-mode-context";
import { useLang } from "../../contexts/language-context";
import { Button } from "../button";

const styles = {
	menu: css({
		padding: "s.l",
		height: "100%",
		borderBottom: "solid 1px",
		borderColor: "s.fg.default.initial",
		color: "s.fg.default.initial",
	}),
	menuitems: css({}),
	menuseparator: css({
		width: "100%",
		paddingY: "s.m",
	}),
	button: css({
		textStyle: "emphasis",
		flexDir: "column",
	}),
	menuOptionContainer: css({
		paddingX: "s.xs",
		paddingY: "s.s",
		gap: "s.m",
	}),
	menuOption: css({
		gap: "s.xs",
	}),
};

interface HeaderMenuProps {
	routes: { slug: string; name: string }[];
	onCloseMenu?: () => void;
}

export const HeaderMenu = ({
	onCloseMenu,
	routes,
}: HeaderMenuProps) => {
	const navigate = useNavigate();

	const handleNavigation = (path: string) => {
		navigate(path);
		if (onCloseMenu) {
			onCloseMenu();
		}
	};

	const { colorMode, setColorMode } = useColorMode();

	useEffect(() => {
		document.documentElement.setAttribute("data-color-mode", colorMode);
	}, [colorMode]);

	const toggleColorMode = () => {
		setColorMode((prevMode) =>
			prevMode === "light" ? "dark" : "light",
		);
	};

	const { setLanguage } = useLang();

	const switchLanguage = (lang: "fr" | "en") => {
		setLanguage(lang);
		navigate(`/${lang}/`);
	};

	return (
		<Stack grow className={styles.menu}>
			<Stack
				direction="row"
				justifyContent="end"
				className={styles.menuOptionContainer}
			>
				<AriaButton onClick={() => switchLanguage("en")}>
					<Stack direction="row">
						<English />
						En
					</Stack>
				</AriaButton>
				<AriaButton onClick={() => switchLanguage("fr")}>
					<Stack direction="row">
						<French />
						fr
					</Stack>
				</AriaButton>
			</Stack>
			<Stack
				direction="row"
				justifyContent="end"
				className={styles.menuOptionContainer}
			>
				{colorMode === "light" ? (
					<AriaButton onClick={toggleColorMode}>
						<Stack
							direction="row"
							alignItems="center"
							className={styles.menuOption}
						>
							<Light />
							Light
						</Stack>
					</AriaButton>
				) : (
					<AriaButton onClick={toggleColorMode}>
						<Stack
							direction="row"
							alignItems="center"
							className={styles.menuOption}
						>
							<Dark />
							Dark
						</Stack>
					</AriaButton>
				)}
			</Stack>
			<Stack className={styles.menuitems}>
				<Stack className={styles.menuseparator}>
					<Separator />
				</Stack>
				<AriaButton
					onClick={() => handleNavigation("/")}
					className={styles.button}
				>
					Home
				</AriaButton>
				{routes.map((route) => {
					return (
						<AriaButton
							onClick={() => handleNavigation(route.slug)}
							key={route.slug}
							className={styles.button}
						>
							{route.name}
						</AriaButton>
					);
				})}
				<Stack className={styles.menuseparator}>
					<Separator />
				</Stack>
				<Stack alignItems="center" className={styles.button}>
					<Button
						level="secondary"
						label="Contact"
						position="left"
						onClick={() => handleNavigation("/contact")}
					>
						<SpeechBalloon />
					</Button>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default HeaderMenu;
