import { Stack } from "@packages/ui";
import { css } from "@styles";
import { useNavigate } from "react-router-dom";
import { Button } from "../button";
import FooterAdress from "../footer-adress";
import Separator from "../separator";

import AMD from "../../assets/svgs/AMD.svg?react";
import ArrowRight from "../../assets/svgs/ArrowRight.svg?react";
import ArrowTopRight from "../../assets/svgs/ArrowTopRight.svg?react";
import { useLang } from "../../contexts/language-context";
import usePageTransition from "../../hooks/usePageTransition";

const styles = {
  footer: css({
    padding: 0,
    paddingTop: "s.m",
    gap: "s.l",
    _desktop: {
      paddingBottom: "s.m",
    },
  }),
  navigation: css({
    alignItems: "flex-end",
    gap: "s.s",
    alignSelf: "stretch",
  }),
  addresses: css({
    gap: "s.m",
    alignSelf: "stretch",
  }),
  button: css({
    gap: "s.s",
  }),
  buttonText: css({
    textStyle: "emphasis",
  }),
};

export const Footer = () => {
  const navigate = useNavigate();
  const { language } = useLang();
  const { transitionTo } = usePageTransition();

  return (
    <Stack className={styles.footer}>
      <Stack direction="column" className={styles.navigation}>
        <Separator />

        <Button
          level="secondary"
          label="Contact"
          onClick={() => transitionTo(`${language}/contact`)}
        >
          <ArrowRight />
        </Button>
        <Separator />
        <Button
          level="secondary"
          label="Instagram"
          onClick={() =>
            window.open(
              "https://www.instagram.com/",
              "_blank",
              "noopener,noreferrer"
            )
          }
        >
          <ArrowTopRight />
        </Button>
      </Stack>

      <Stack direction="column" className={styles.addresses}>
        <FooterAdress
          title="Switzerland"
          content="AMD Swiss Interior designer
          Route de L’aéroport, 7
          1950 Sion"
        />
        <FooterAdress
          title="Spain"
          content="AMD Swiss Interior designer
          Route de L’aéroport, 7
          1950 Sion"
        />
      </Stack>

      <AMD style={{ maxWidth: "100%", bottom: 0 }} />
    </Stack>
  );
};

export default Footer;
