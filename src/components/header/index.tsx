import {
  Disclosure,
  DisclosureContent,
  useDisclosureStore,
} from "@ariakit/react";
import { Header, Stack } from "@packages/ui";
import { css } from "@styles";
import { useEffect, useState } from "react";
import Logo from "../../assets/Architecture Interior Designer.svg?react";
import Burger from "../../assets/Burger.svg?react";
import Close from "../../assets/Close.svg?react";
import { assets } from "../../assets/assets";
import HeaderMenu from "../header-menu";

const styles = {
  header: css({
    display: "flex",
    padding: "16px",
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
  }),
  content: css({
    marginTop: "8px",
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

  return (
    <Stack>
      <Stack className={styles.header}>
        <Stack>
          <Stack direction="row" alignItems="center" className={styles.content}>
            <Stack grow>
              <Stack className={styles.logo}>
                <Logo />
              </Stack>
            </Stack>
            <Disclosure store={disclosure}>
              {isOpen ? <Close /> : <Burger />}
            </Disclosure>
          </Stack>
        </Stack>
      </Stack>

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
    </Stack>
  );
};
