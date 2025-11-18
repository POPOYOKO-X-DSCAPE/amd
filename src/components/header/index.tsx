import {
  Button as AriaButton,
  Disclosure,
  DisclosureContent,
  Select,
  SelectItem,
  SelectPopover,
  SelectProvider,
  useDisclosureStore,
} from "@ariakit/react";
import { Stack } from "@packages/ui";
import useMobile from "@packages/ui/hooks/use-mobile";
import { css } from "@styles";
import { useEffect } from "react";
import Logo from "../../assets/svgs/Architecture Interior Designer.svg?react";
import Burger from "../../assets/svgs/Burger.svg?react";
import Close from "../../assets/svgs/Close.svg?react";
import Dark from "../../assets/svgs/Dark.svg?react";
import Light from "../../assets/svgs/Light.svg?react";

import { useColorMode } from "../../contexts/color-mode-context";
import { useLang } from "../../contexts/language-context";
import { editorials } from "../../editorials";
import usePageTransition from "../../hooks/usePageTransition";
import HeaderMenu from "../header-menu";

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
  languageSelector: css({
    backgroundColor: "s.bg.default.initial",
    display: "flex",
    flexDirection: "column",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "s.fg.elevated.initial",
  }),
  languageOption: css({
    backgroundColor: "s.bg.elevated.initial",
    paddingX: "s.s",
    cursor: "pointer",
    _hover: {
      backgroundColor: "s.bg.elevated.hover",
    },
  }),
  content: css({
    maxWidth: "s.FluxMaxWidth",
    marginTop: "s.s",
  }),
  links: css({
    textStyle: "section.title",
    gap: "s.xl",
  }),
  languageAndMode: css({
    gap: "s.s",
  }),
  headerButton: css({
    padding: "s.s",
  }),
  select: css({
    display: "flex",
    alignItems: "center !important",
    gap: "s.xs",
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
  const isOpen = disclosure.useState("open");
  const isMobile = useMobile(1100);
  const { language } = useLang();

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

  const { colorMode, setColorMode } = useColorMode();

  const toggleColorMode = () => {
    setColorMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const headerRoutes = editorials.FR.routes.map((route) => {
    let routeName = "";

    switch (route.slug) {
      case "all-projects":
        if (language === "en") {
          routeName = "Projects";
        } else {
          routeName = "Projets";
        }
        break;

      case "office":
        if (language === "en") {
          routeName = "Office";
        } else {
          routeName = "L'approche AMD";
        }
        break;

      default:
        routeName = route.slug.charAt(0).toUpperCase() + route.slug.slice(1);
        break;
    }

    return {
      name: routeName,
      slug: `${language}/${route.slug}`,
    };
  });

  const { setLanguage } = useLang();
  const { transitionTo } = usePageTransition();

  const switchLanguage = (lang: "fr" | "en") => {
    setLanguage(lang);
  };

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
            <AriaButton
              className={styles.logo}
              onClick={() => transitionTo(`${language}/`)}
            >
              <Logo />
            </AriaButton>
          </Stack>
          {isMobile && (
            <Disclosure store={disclosure}>
              {isOpen ? <Close /> : <Burger />}
            </Disclosure>
          )}
          {!isMobile && (
            <Stack className={styles.links} direction="row" alignItems="center">
              {headerRoutes.map((route) => (
                <AriaButton
                  onClick={() => transitionTo(`${route.slug}`)}
                  key={route.slug}
                >
                  {route.name}
                </AriaButton>
              ))}
              <Stack
                className={styles.languageAndMode}
                direction="row"
                alignItems="center"
              >
                <Stack alignItems="center">
                  <SelectProvider>
                    <Select className={styles.select} />
                    <SelectPopover className={styles.languageSelector}>
                      <SelectItem
                        value="FR"
                        onClick={() => switchLanguage("fr")}
                        className={styles.languageOption}
                      >
                        Fr
                      </SelectItem>
                      <SelectItem
                        value="EN"
                        onClick={() => switchLanguage("en")}
                        className={styles.languageOption}
                      >
                        En
                      </SelectItem>
                    </SelectPopover>
                  </SelectProvider>
                </Stack>
                <AriaButton
                  onClick={toggleColorMode}
                  className={styles.headerButton}
                >
                  <Stack direction="row" alignItems="center">
                    {colorMode === "light" ? <Light /> : <Dark />}
                  </Stack>
                </AriaButton>
              </Stack>
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
            onCloseMenu={handleCloseMenu}
            routes={headerRoutes}
            switchLanguage={switchLanguage}
          />
        </DisclosureContent>
      )}
    </Stack>
  );
};
