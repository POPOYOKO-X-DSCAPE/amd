import { App, Button } from "@packages/ui";

import { AMDHeader } from "./components/header";
import { Ticker } from "./components/ticker";
import ListElement from "./components/list-element";
import SectionTitle from "./components/section-title";

import { assets } from "./assets/assets";
import Footer from "./components/footer";
import Section from "./components/section";
import { ContactForm } from "./components/contact-form";
import { ContactField } from "./components/contact-field";

const AMD = () => {
  return (
    <App>
      <AMDHeader />
      <Ticker />
      <ListElement label="Hello world">
        <img src={assets.SpeechBalloon} alt="Speech Balloon" />
      </ListElement>
      <SectionTitle title="Title" number="01" />
      <Section title="L’approche Amd" number={0}>
        <span>
          Créative et ancrée dans l’excellence, AMD interior designer est une
          agence de conseil en architecture et design d’intérieur. Fidèle à ses
          collaborateurs depuis l’origine, elle incarne une véritable synergie
          d’équipe, menée avec maitrise, et renforcée par une relation de
          confiance avec ses clients. Une dynamique portée par l’intégrité,
          l’engagement et la passion de François Damidot.
        </span>
      </Section>

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
          Envoyer
        </Button>
      </ContactForm>
      <Footer />
    </App>
  );
};

export default AMD;
