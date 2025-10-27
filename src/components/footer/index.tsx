import { Stack } from "@packages/ui";
import { css } from "@styles";
import { useNavigate } from "react-router-dom";
import { Button } from "../button";
import FooterAdress from "../footer-adress";
import Separator from "../separator";

import AMD from "../../assets/AMD.svg?react";
import ArrowRight from "../../assets/ArrowRight.svg?react";
import ArrowTopRight from "../../assets/ArrowTopRight.svg?react";

const styles = {
  footer: css({
    padding: "0px 16px 16px 16px",
    gap: "24px",
  }),
  navigation: css({
    alignItems: "flex-end",
    gap: "8px",
    alignSelf: "stretch",
  }),
  addresses: css({
    gap: "16px",
    alignSelf: "stretch",
  }),
  logo: css({
    "&img": {
      color: "s.fg.default.initial",
    },
  }),
  button: css({
    gap: "8px",
  }),
  buttonText: css({
    textStyle: "emphasis",
  }),
};

export const Footer = () => {
  const navigate = useNavigate();

  return (
    <Stack className={styles.footer}>
      <Stack direction="column" className={styles.navigation}>
        <Separator />

        <Button
          level="secondary"
          label="Contact"
          onClick={() => navigate("/contact")}
        >
          <ArrowRight />
        </Button>
        <Separator />
        <Button
          level="secondary"
          label="Instagram"
          onClick={() => navigate("/")}
        >
          <ArrowTopRight />
        </Button>
      </Stack>

      <Stack direction="column" className={styles.addresses}>
        <FooterAdress
          title="Swizerland"
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

      <Stack className={styles.logo}>
        <AMD />
      </Stack>
    </Stack>
  );
};

export default Footer;
