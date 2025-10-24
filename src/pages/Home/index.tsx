import { useNavigate } from "react-router-dom";

import { Button, Stack } from "@packages/ui";
import { css } from "@styles";
import { assets } from "../../assets/assets";

import ListElement from "../../components/list-element";
import Section from "../../components/section";
import Separator from "../../components/separator";

const styles = {
  texts: css({
    justifyContent: "space-between",
    gap: "64px",
  }),
  contentApproche: css({
    gap: "32px",
    paddingBottom: "32px",
    alignSelf: "stretch",
  }),
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

export const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Section title="L'approche Amd" number={0}>
        <Stack className={styles.contentApproche}>
          <Stack direction="column" className={styles.texts}>
            <Stack>
              Créative et ancrée dans l'excellence, AMD interior designer est
              une agence de conseil en architecture et design d'intérieur.
              Fidèle à ses collaborateurs depuis l'origine, elle incarne une
              véritable synergie d'équipe, menée avec maitrise, et renforcée par
              une relation de confiance avec ses clients. Une dynamique portée
              par l'intégrité, l'engagement et la passion de François Damidot.
            </Stack>
            <Stack>
              Analyse immobilière, étude de faisabilité avant investissent,
              conseil d’architecture et design d’intérieur, conception,
              exécution et maîtrise d’œuvre, nous vous accompagnons du premier
              coup de pelle au dernier détail.
            </Stack>
          </Stack>
          <Stack direction="column" className={styles.texts}>
            <Stack alignItems="center">Un projet en tête?</Stack>
            <Button level="primary" type="submit">
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                className={styles.button}
              >
                <span className={styles.buttonText}>Parlons-en</span>
                <img src={assets.SpeechBalloon} alt="SpeechBalloon" />
              </Stack>
            </Button>
          </Stack>
        </Stack>
      </Section>

      <Separator />

      <Section title="Projets" number={1}>
        <Stack>
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
        <Button level="secondary" onClick={() => navigate("/projects")}>
          <Stack direction="row" alignItems="center" justifyContent="center">
            <img src={assets.ArrowRight} alt="ArrowRight" />
            Tous les projets
          </Stack>
        </Button>
      </Section>

      <Separator />

      <Section title="Office" number={2}>
        <Stack>
          L'histoire d'AMD Interior Designer a été initié par une rencontre
          fondatrice : celle d'un premier client visionnaire, à l'origine de
          projets de luxe et d'exception. Depuis, chaque projet est façonné par
          l'exigence de son fondateur, qui a su s'entourer de partenaires
          choisis pour leur savoir-faire, leur rigueur et leur sens du détail.
        </Stack>

        <img src={assets.chaletExterieur} alt="AMD" />

        <Button level="secondary">
          <Stack direction="row" alignItems="center" justifyContent="center">
            <img src={assets.ArrowRight} alt="ArrowRight" />
            L’Agence
          </Stack>
        </Button>
      </Section>
    </>
  );
};
