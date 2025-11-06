import {
  Disclosure,
  DisclosureContent,
  useDisclosureStore,
} from "@ariakit/react";
import { Stack } from "@packages/ui";
import useMobile from "@packages/ui/hooks/use-mobile";
import { css } from "@styles";
import { useEffect, useState } from "react";
import { semantic } from "../../../theme/semantic";
import { sizes } from "../../../theme/semantic/sizes";
import Logo from "../../assets/svgs/Architecture Interior Designer.svg?react";
import Burger from "../../assets/svgs/Burger.svg?react";
import Close from "../../assets/svgs/Close.svg?react";
import Dark from "../../assets/svgs/Dark.svg?react";
import English from "../../assets/svgs/English.svg?react";
import French from "../../assets/svgs/French.svg?react";
import Light from "../../assets/svgs/Light.svg?react";

import { Button } from "../button";
import HeaderMenu from "../header-menu";
import ListElement from "../list-element";
import MenuOption from "../menu-option";

const styles = {
  header: css({
    display: "flex",
    padding: "s.m",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1002,
    backgroundColor: "s.bg.default.initial",
    width: "100%",
    boxSizing: "border-box",
    color: "s.fg.default.initial",
  }),
  logo: css({
    maxWidth: "242px",
    _desktop: {
      maxWidth: "424px",
    },
  }),
  content: css({
    maxWidth: "s.FluxMaxWidth",
    marginTop: "s.s",
  }),
  links: css({
    textStyle: "section.title",
  }),
  disclosureContent: css({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1001,
    backgroundColor: "s.bg.default.initial",
    paddingTop: "64px",
    "&:not([data-enter]):not([data-leave])": {
      display: "none",
    },
    "&[data-enter]": {
      animationStyle: "slide-down",
    },
    "&[data-leave]": {
      animationStyle: "slide-up",
    },
  }),
};

export const AMDHeader = () => {
  const disclosure = useDisclosureStore();
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("light");

  const isOpen = disclosure.useState("open");
  console.log(semantic.sizes.s.FluxMaxWidth.value);

  const isMobile = useMobile(740);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handleCloseMenu = () => {
    disclosure.hide();
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
    <Stack>
      <Stack
        className={styles.header}
        justifyContent="center"
        grow
        direction="row"
      >
        <Stack
          direction="row"
          alignItems="center"
          grow
          className={styles.content}
        >
          <Stack grow>
            <Stack className={styles.logo}>
              <Logo />
            </Stack>
          </Stack>
          {isMobile && (
            <Disclosure store={disclosure}>
              {isOpen ? <Close /> : <Burger />}
            </Disclosure>
          )}
          {!isMobile && (
            <Stack className={styles.links} direction="row" alignItems="center">
              <a href="./projects">Projects</a>
              <MenuOption
                type="language"
                selectedValue={language}
                onSelect={() =>
                  language === "fr" ? setLanguage("en") : setLanguage("fr")
                }
                options={languageOptions}
              />

              <MenuOption
                type="mode"
                selectedValue={theme}
                onSelect={toggleColorMode}
                options={modeOptions}
              />
            </Stack>
          )}
        </Stack>
      </Stack>
      {isMobile && (
        <DisclosureContent
          store={disclosure}
          className={styles.disclosureContent}
        >
          <HeaderMenu
            language={language}
            theme={theme}
            onLanguageChange={setLanguage}
            onThemeChange={setTheme}
            onCloseMenu={handleCloseMenu}
          />
        </DisclosureContent>
      )}
    </Stack>
  );
};
