import { Stack } from "@packages/ui";
import { css } from "@styles";
import { useNavigate } from "react-router-dom";
import { Button } from "../button";
import MenuOption from "../menu-option";
import Separator from "../separator";

import { useEffect, useState } from "react";
import Dark from "../../assets/svgs/Dark.svg?react";
import English from "../../assets/svgs/English.svg?react";
import French from "../../assets/svgs/French.svg?react";
import Light from "../../assets/svgs/Light.svg?react";
import SpeechBalloon from "../../assets/svgs/SpeechBalloon.svg?react";

const styles = {
  menu: css({
    padding: "s.l",
    height: "100%",
    borderBottom: "solid 1px",
    borderColor: "s.fg.default.initial",
    color: "s.fg.default.initial",
  }),
  menuitems: css({
    flex: "1 0 0",

    alignItems: "center",
    alignSelf: "stretch",
  }),
  menuseparator: css({
    width: "100%",
    paddingX: "s.m",
  }),
  button: css({
    paddingTop: "s.xs",
    alignSelf: "stretch",
  }),
};

interface HeaderMenuProps {
  language: string;
  theme: string;
  onLanguageChange: (language: string) => void;
  onThemeChange: (theme: string) => void;
  onCloseMenu?: () => void;
}

export const HeaderMenu = ({
  language,
  theme,
  onLanguageChange,
  onThemeChange,
  onCloseMenu,
}: HeaderMenuProps) => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    if (onCloseMenu) {
      onCloseMenu();
    }
  };

  const [colorMode, setColorMode] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", colorMode);
  }, [colorMode]);

  const toggleColorMode = () => {
    setColorMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const languageOptions = [
    {
      value: "en",
      children: (
        <>
          <English /> En
        </>
      ),
    },
    {
      value: "fr",
      children: (
        <>
          <French /> Fr
        </>
      ),
    },
  ];

  const modeOptions = [
    {
      value: "dark",
      children: (
        <>
          <Dark /> Dark
        </>
      ),
    },
    {
      value: "light",
      children: (
        <>
          <Light /> Light
        </>
      ),
    },
  ];
  return (
    <Stack grow className={styles.menu}>
      <MenuOption
        type="language"
        selectedValue={language}
        onSelect={onLanguageChange}
        options={languageOptions}
      />

      <MenuOption
        type="mode"
        selectedValue={theme}
        onSelect={toggleColorMode}
        options={modeOptions}
      />

      <Stack className={styles.menuitems}>
        <Stack className={styles.menuseparator}>
          <Separator />
        </Stack>

        <Stack alignItems="center" className={styles.button}>
          <Button
            level="secondary"
            label="Home"
            onClick={() => handleNavigation("/")}
          />
        </Stack>
        <Stack alignItems="center" className={styles.button}>
          <Button
            level="secondary"
            label="Projects"
            onClick={() => handleNavigation("/projects")}
          />
        </Stack>

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
