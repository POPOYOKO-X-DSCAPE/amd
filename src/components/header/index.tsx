import {
  Button as AriaButton,
  Disclosure,
  DisclosureContent,
  DisclosureProvider,
  useDisclosureContext,
  useDisclosureStore,
} from "@ariakit/react";
import { Header } from "@packages/ui";
import { Stack } from "@packages/ui/abstract/stack";
import { Button } from "@packages/ui/components/button";
import { css } from "@styles";
import { useEffect, useRef, useState } from "react";
import ArchitectureInteriorDesigner from "../../assets/Architecture Interior Designer.svg";
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

  useEffect(() => {
    console.log(disclosure);
  }, [disclosure]);

  return (
    <Header>
      <Stack direction="row">
        <Stack grow>
          <Stack className={styles.logo}>
            <img src={ArchitectureInteriorDesigner} alt="" />
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
          <Stack direction="row">
            <AriaButton>
              En <img src={assets.English} alt="" />
            </AriaButton>
            <AriaButton>
              Fr <img src={assets.French} alt="" />
            </AriaButton>
          </Stack>
          <Stack direction="row">
            <AriaButton>
              Dark <img src={assets.Dark} alt="" />
            </AriaButton>
            <AriaButton>
              Light <img src={assets.Light} alt="" />
            </AriaButton>
          </Stack>
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
