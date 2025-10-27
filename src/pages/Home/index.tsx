import { useNavigate } from "react-router-dom";

import { Stack } from "@packages/ui";
import { css } from "@styles";
import { assets } from "../../assets/assets";

import { Button } from "../../components/button";
import ListElement from "../../components/list-element";
import Section from "../../components/section";
import Separator from "../../components/separator";

const styles = {
  contentApproche: css({
    gap: "32px",
    paddingBottom: "32px",
    alignSelf: "stretch",
  }),
  contentSection: css({
    gap: "32px",
    alignSelf: "stretch",
  }),
  texts: css({
    justifyContent: "space-between",
    gap: "64px",
  }),
  cta: css({
    justifyContent: "space-between",
    gap: "8px",
  }),
  textDescription: css({
    color: "s.fg.default.initial",
    textStyle: "body.m",
  }),
  textProject: css({
    color: "s.fg.gentle.initial",
    textStyle: "body.s",
    letterSpacing: "0.8px",
  }),
  contentSectionDescription: css({
    color: "s.fg.default.initial",
    textStyle: "body.s",
    letterSpacing: "0.8px",
  }),
};

export const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Section title="L'approche Amd" number={0}>
        <Stack className={styles.contentApproche}>
          <Stack direction="column" className={styles.texts}>
            <Stack className={styles.textDescription}>
              Créative et ancrée dans l'excellence, AMD interior designer est
              une agence de conseil en architecture et design d'intérieur.
              Fidèle à ses collaborateurs depuis l'origine, elle incarne une
              véritable synergie d'équipe, menée avec maitrise, et renforcée par
              une relation de confiance avec ses clients. Une dynamique portée
              par l'intégrité, l'engagement et la passion de François Damidot.
            </Stack>
            <Stack className={styles.textProject}>
              Analyse immobilière, étude de faisabilité avant investissent,
              conseil d’architecture et design d’intérieur, conception,
              exécution et maîtrise d’œuvre, nous vous accompagnons du premier
              coup de pelle au dernier détail.
            </Stack>
          </Stack>
          <Stack direction="column" className={styles.cta}>
            <Stack alignItems="center" className={styles.textProject}>
              Un projet en tête?
            </Stack>
            <Button label="Parlons-en">
              <img src={assets.SpeechBalloon} alt="Parlons-en" />
            </Button>
          </Stack>
        </Stack>
      </Section>

      <Separator />

      <Section title="Projets" number={1}>
        <Stack className={styles.contentSection}>
          <Stack className={styles.contentSectionDescription}>
            L'ADN de AMD Interior designer s'exprime à travers quatre pôles
            complémentaires, où l'exigence du détail et la quête d'excellence
            transforme chaque projet en une signature unique.
          </Stack>
          <Stack>
            <ListElement label="Chalet, Verbier" />
            <ListElement label="Cologny, Genève" />
            <ListElement label="La Côte d’Or, Bernard Loiseau" />
            <ListElement label="Dagaz, Ibiza" />
          </Stack>
          <Button
            level="secondary"
            label="Tous les projets"
            position="left"
            onClick={() => navigate("/projects")}
          >
            <img src={assets.ArrowRight} alt="Tous les projets" />
          </Button>
        </Stack>
      </Section>

      <Separator />

      <Section title="Office" number={2}>
        <Stack className={styles.contentSection}>
          <Stack className={styles.contentSectionDescription}>
            L'histoire d'AMD Interior Designer a été initié par une rencontre
            fondatrice : celle d'un premier client visionnaire, à l'origine de
            projets de luxe et d'exception. Depuis, chaque projet est façonné
            par l'exigence de son fondateur, qui a su s'entourer de partenaires
            choisis pour leur savoir-faire, leur rigueur et leur sens du détail.
          </Stack>
          <img src={assets.chaletExterieur} alt="AMD" />
          <Button level="secondary" label="L’Agence" position="left">
            {" "}
            <img src={assets.ArrowRight} alt="L’Agence" />
          </Button>
        </Stack>
      </Section>
    </>
  );
};
