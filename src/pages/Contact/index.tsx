import { Stack } from "@packages/ui";
import SpeechBalloon from "../../assets/svgs/SpeechBalloon.svg?react";
import { Button } from "../../components/button";
import { ContactField } from "../../components/contact-field";
import { ContactForm } from "../../components/contact-form";

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

        <Button label="Send" type="submit">
          <SpeechBalloon />
        </Button>
      </ContactForm>
    </Stack>
  );
};
