import {
  Button as AriaButton,
  Disclosure,
  DisclosureContent,
  DisclosureProvider,
  useDisclosureContext,
  useDisclosureStore,
} from "@ariakit/react";
import { Header, Stack } from "@packages/ui";
import { css } from "@styles";
import { useState } from "react";
import { assets } from "../../assets/assets";
import HeaderMenu from "../header-menu";

const styles = {
  header: css({
    padding: "16px",
  }),
  logo: css({
    maxWidth: "242px",
  }),
  content: css({
    marginTop: "8px",
  }),
  disclosureContent: css({
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

  const handleCloseMenu = () => {
    disclosure.hide();
  };

  return (
    <Header>
      <Stack className={styles.header}>
        <Stack direction="row" alignItems="center" className={styles.content}>
          <Stack grow>
            <Stack className={styles.logo}>
              <img
                src={assets.ArchitectureInteriorDesigner}
                alt="ArchitectureInteriorDesigner"
              />
            </Stack>
          </Stack>
          <Disclosure store={disclosure}>
            <img
              src={disclosure.getState().open ? assets.Close : assets.Burger}
              alt="Burger"
            />
          </Disclosure>
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
    </Header>
  );
};
