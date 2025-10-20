import {
  Button as AriaButton,
  Disclosure,
  DisclosureContent,
  DisclosureProvider,
  useDisclosureContext,
  useDisclosureStore,
} from "@ariakit/react";
import { Button, Header, Stack } from "@packages/ui";
import MenuOption from "../menu-option";
import { css } from "@styles";
import { useEffect, useRef, useState } from "react";
import { assets } from "../../assets/assets";

const styles = {
  menu: css({
    padding: "s.padding.m",
  }),
  logo: css({
    maxWidth: "242px",
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
      <Stack direction="row">
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
        <Stack grow className={styles.menu}>
          <MenuOption
            type="language"
            selectedValue={language}
            onSelect={setLanguage}
            options={[
              { label: "En", value: "en", icon: assets.English },
              { label: "Fr", value: "fr", icon: assets.French },
            ]}
          />
          <MenuOption
            type="mode"
            selectedValue={theme}
            onSelect={setTheme}
            options={[
              { label: "Dark", value: "dark", icon: assets.Dark },
              { label: "Light", value: "light", icon: assets.Light },
            ]}
          />
          <Stack>
            <Button>Home</Button>
            <Button>Projects</Button>
            <Button>
              Contact <img src={assets.SpeechBalloon} alt="" />
            </Button>
          </Stack>
        </Stack>
      </DisclosureContent>
    </Header>
  );
};

export default Header;
