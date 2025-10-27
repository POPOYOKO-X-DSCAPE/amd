import { Stack } from "@packages/ui";
import { css } from "@styles";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { Button } from "../button";
import MenuOption from "../menu-option";
import Separator from "../separator";

import Dark from "../../assets/Dark.svg?react";
import English from "../../assets/English.svg?react";
import French from "../../assets/French.svg?react";
import Light from "../../assets/Light.svg?react";
import SpeechBalloon from "../../assets/SpeechBalloon.svg?react";

const styles = {
  menu: css({
    padding: "24px",
    height: "100%",
    borderBottom: "solid 1px",
    borderColor: "s.fg.default.initial",
  }),
  menuitems: css({
    flex: "1 0 0",

    alignItems: "center",
    alignSelf: "stretch",
  }),
  menuseparator: css({
    width: "100%",
    padding: "16px 0",
  }),
  button: css({
    paddingTop: "4px",
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
        onSelect={onThemeChange}
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
