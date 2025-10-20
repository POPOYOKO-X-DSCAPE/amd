import { css } from "@styles";
import { Stack } from "@packages/ui";
import { Button } from "@packages/ui";
import FooterAdress from "../footer-adress";
import Separator from "../separator";

import { assets } from "../../assets/assets";

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
  logo: css({}),
};

export const Footer = () => {
  return (
    <Stack className={styles.footer}>
      <Stack direction="column" className={styles.navigation}>
        <Separator />
        <Button level="secondary">
          Contact
          <img src={assets.ArrowRight} alt="ArrowRight" />
        </Button>
        <Separator />
        <Button level="secondary">
          Instagram
          <img src={assets.ArrowTopRight} alt="ArrowTopRight" />
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
        <img src={assets.AMD} alt="AMD" />
      </Stack>
    </Stack>
  );
};

export default Footer;
