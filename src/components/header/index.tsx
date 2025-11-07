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
import { useEffect, useState } from "react";
import Logo from "../../assets/svgs/Architecture Interior Designer.svg?react";
import Burger from "../../assets/svgs/Burger.svg?react";
import Close from "../../assets/svgs/Close.svg?react";
import Dark from "../../assets/svgs/Dark.svg?react";
import English from "../../assets/svgs/English.svg?react";
import French from "../../assets/svgs/French.svg?react";
import Light from "../../assets/svgs/Light.svg?react";

import { Route, useNavigate } from "react-router-dom";
import { useColorMode } from "../../contexts/color-mode-context";
import { editorials } from "../../editorials";
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

  const isMobile = useMobile(740);
  const navigate = useNavigate();

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
        routeName = "Projets";
        break;

      default:
        routeName = route.slug.charAt(0).toUpperCase() + route.slug.slice(1);
        break;
    }

    return {
      name: routeName,
      slug: route.slug,
    };
  });

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
            <AriaButton className={styles.logo} onClick={() => navigate("./")}>
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
                  onClick={() => navigate(route.slug)}
                  key={route.slug}
                >
                  {route.name}
                </AriaButton>
              ))}
              <Stack className={styles.languageAndMode} direction="row">
                <Stack className={styles.headerButton}>
                  <SelectProvider>
                    <Select />
                    <SelectPopover>
                      <SelectItem value={"FR"}>Fr</SelectItem>
                      <SelectItem value="EN">En</SelectItem>
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
          <HeaderMenu onCloseMenu={handleCloseMenu} routes={headerRoutes} />
        </DisclosureContent>
      )}
    </Stack>
  );
};
