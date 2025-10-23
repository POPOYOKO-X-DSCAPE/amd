import { Button, Stack } from "@packages/ui";
import { css } from "@styles";

import { assets } from "../../assets/assets";
import { ContactField } from "../../components/contact-field";
import { ContactForm } from "../../components/contact-form";

const styles = {
  button: css({
    width: "100%",
    padding: "16px",
    gap: "16px",
    alignSelf: "stretch",
    border: "1px solid",
    borderColor: "s.fg.default.initial",
  }),
  buttonText: css({
    fontFamily: "Helvetica LT Pro",
    fontWeight: 700,
    fontSize: "24px",
  }),
};

export const Contact = () => {
  return (
    <Stack>
      <ContactForm>
        <ContactField
          name="email"
          label="Your email adress"
          placeholder="satochi@nakamoto.com"
        />

        <ContactField
          name="message"
          label="Your message"
          type="textarea"
          placeholder="I need your help for my next project..."
        />
        <Button level="primary" type="submit">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            className={styles.button}
          >
            <span className={styles.buttonText}>Send</span>
            <img src={assets.SpeechBalloon} alt="SpeechBalloon" />
          </Stack>
        </Button>
      </ContactForm>
    </Stack>
  );
};
