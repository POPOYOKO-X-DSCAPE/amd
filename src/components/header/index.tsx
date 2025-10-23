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
import { useEffect, useState } from "react";
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
};

export const AMDHeader = () => {
  const disclosure = useDisclosureStore();
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    console.log(disclosure);
  }, [disclosure]);

  return (
    <Header>
      <Stack className={styles.header}>
        <Stack direction="row" alignItems="center" className={styles.content}>
          <Stack grow>
            <Stack className={styles.logo}>
              <img src={assets.ArchitectureInteriorDesigner} alt="" />
            </Stack>
          </Stack>
          <Disclosure
            store={disclosure}
            onClick={() => disclosure.setOpen(!open)}
          >
            <img
              src={disclosure.getState().open ? assets.Close : assets.Burger}
              alt=""
            />
          </Disclosure>
        </Stack>
        <DisclosureContent store={disclosure}>
          <HeaderMenu
            language={language}
            theme={theme}
            onLanguageChange={setLanguage}
            onThemeChange={setTheme}
          />
        </DisclosureContent>
      </Stack>
    </Header>
  );
};

export default Header;
