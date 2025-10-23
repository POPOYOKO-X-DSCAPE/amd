import { App, Button, Stack } from "@packages/ui";
import { css } from "@styles";

import { AMDHeader } from "./components/header";
import ListElement from "./components/list-element";
import SectionTitle from "./components/section-title";
import { Ticker } from "./components/ticker";

import { assets } from "./assets/assets";
import Caroussel from "./components/caroussel";
import { ContactField } from "./components/contact-field";
import { ContactForm } from "./components/contact-form";
import Footer from "./components/footer";
import Section from "./components/section";
import Separator from "./components/separator";

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

const AMD = () => {
  const images = [
    assets.chaletCine,
    assets.chaletExterieur,
    assets.chaletPiscine,
  ];

  return (
    <App>
      <AMDHeader />
      <Caroussel>
        {images.map((image) => (
          <img key={image} src={image} alt={image} />
        ))}
      </Caroussel>
      <Ticker />
      <Separator />
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
      <Separator />
      <Section title="Projets" number={1}>
        <span>
          L’ADN de AMD Interior designer s’exprime à travers quatre pôles
          complémentaires, où l’exigence du détail et la quête d’excellence
          transforme chaque projet en une signature unique.
        </span>
      </Section>
      <Separator />
      <Section title="Office" number={2}>
        <span>
          L’histoire d’AMD Interior Designer a été initié par une rencontre
          fondatrice : celle d’un premier client visionnaire, à l’origine de
          projets de luxe et d’exception. Depuis, chaque projet est façonné par
          l’exigence de son fondateur, qui a su s’entourer de partenaires
          choisis pour leur savoir-faire, leur rigueur et leur sens du détail.
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
      <Footer />
    </App>
  );
};

export default AMD;
