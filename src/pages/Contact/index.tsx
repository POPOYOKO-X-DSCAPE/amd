import { Stack } from "@packages/ui";
import SpeechBalloon from "../../assets/svgs/SpeechBalloon.svg?react";
import { Button } from "../../components/button";
import { ContactField } from "../../components/contact-field";
import { ContactForm } from "../../components/contact-form";
import { useLang } from "../../contexts/language-context";

const texts = {
  fr: {
    field1: {
      label: "Votre adresse email",
    },
    field2: {
      label: "Votre message",
      placeholder: "J'ai besoin de votre aide pour mon prochain projet...",
    },
    button: {
      label: "Envoyer",
    },
  },
  en: {
    field1: {
      label: "Your email adress",
    },
    field2: {
      label: "Your message",
      placeholder: "I need your help for my next project...",
    },
    button: {
      label: "Send",
    },
  },
};

export const Contact = () => {
  const { language } = useLang();

  const trads = () => {
    if (language === "fr") {
      return texts.fr;
    }
    return texts.en;
  };

  return (
    <Stack>
      <ContactForm>
        <ContactField
          name="email"
          label={trads().field1.label}
          placeholder="satochi@nakamoto.com"
        />

        <ContactField
          name="message"
          label={trads().field2.label}
          type="textarea"
          placeholder={trads().field2.placeholder}
        />

        <Button label={trads().button.label} type="submit">
          <SpeechBalloon />
        </Button>
      </ContactForm>
    </Stack>
  );
};
