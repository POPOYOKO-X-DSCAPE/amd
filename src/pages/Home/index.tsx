import { useNavigate } from "react-router-dom";

import { Stack } from "@packages/ui";
import { css } from "@styles";
import ArrowRight from "../../assets/svgs/ArrowRight.svg?react";
import SpeechBalloon from "../../assets/svgs/SpeechBalloon.svg?react";

import officeImage from "../../assets/images/francois-damidot-reunion-chantier-equipes.jpg";

import useMobile from "@packages/ui/hooks/use-mobile";
import { assets } from "../../assets/assets";
import { Button } from "../../components/button";
import Caroussel from "../../components/caroussel";
import ListElement from "../../components/list-element";
import Section from "../../components/section";
import Separator from "../../components/separator";
import Ticker from "../../components/ticker";

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
    gap: "s.s",
    _desktop: {
      width: "30%",
    },
  }),
  textDescription: css({
    color: "s.fg.default.initial",
    textStyle: "body.m",
  }),
  textProject: css({
    color: "s.fg.gentle.initial",
    textStyle: "body.s",
    letterSpacing: "0.8px",
    _desktop: {
      width: "70%",
    },
  }),
  contentSectionDescription: css({
    color: "s.fg.default.initial",
    textStyle: "body.s",
    letterSpacing: "0.8px",
    maxWidth: "70ch",
  }),
  officeCta: css({
    _desktop: {
      gap: "s.x2l",
    },
  }),
  projectsCta: css({
    _desktop: {
      gap: "s.x2l",
    },
  }),
};

export const Home = () => {
  const navigate = useNavigate();
  const isMobile = useMobile(700);

  const goToRoute = (path: string) => {
    navigate(path); // Change le chemin
    window.scrollTo(0, 0); // Réinitialise le défilement
  };

  const images = [
    assets.chaletCine,
    assets.chaletExterieur,
    assets.chaletPiscine,
  ];

  return (
    <Stack>
      <Caroussel>
        {images.map((image) => (
          <img key={image} src={image} alt={image} />
        ))}
      </Caroussel>
      <Ticker />
      <Separator />
      <Section title="L'approche Amd" number={0}>
        <Stack className={styles.contentApproche}>
          <Stack className={styles.textDescription}>
            Créative et ancrée dans l'excellence, AMD interior designer est une
            agence de conseil en architecture et design d'intérieur. Fidèle à
            ses collaborateurs depuis l'origine, elle incarne une véritable
            synergie d'équipe, menée avec maitrise, et renforcée par une
            relation de confiance avec ses clients. Une dynamique portée par
            l'intégrité, l'engagement et la passion de François Damidot.
          </Stack>
          <Stack
            direction={isMobile ? "column" : "row"}
            className={styles.officeCta}
          >
            <Stack className={styles.textProject}>
              Analyse immobilière, étude de faisabilité avant investissent,
              conseil d’architecture et design d’intérieur, conception,
              exécution et maîtrise d’œuvre, nous vous accompagnons du premier
              coup de pelle au dernier détail.
            </Stack>
            <Stack className={styles.cta}>
              <Stack alignItems="center" className={styles.textProject}>
                Un projet en tête?
              </Stack>
              <Button label="Parlons-en">
                <SpeechBalloon />
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Section>
      <Separator />
      <Section title="Projets" number={1}>
        <Stack className={styles.contentSection}>
          <Stack
            className={styles.projectsCta}
            direction={isMobile ? "column" : "row"}
          >
            <Stack className={styles.contentSectionDescription}>
              L'ADN de AMD Interior designer s'exprime à travers quatre pôles
              complémentaires, où l'exigence du détail et la quête d'excellence
              transforme chaque projet en une signature unique.
            </Stack>
            <Stack grow>
              <ListElement
                label="Chalet, Verbier"
                onClick={() =>
                  goToRoute(
                    "/all-projects/prestige-et-exception/chalet,-verbier"
                  )
                }
              />
              <ListElement
                label="Cologny, Genève"
                onClick={() =>
                  goToRoute(
                    "/all-projects/prestige-et-exception/cologny,-geneve"
                  )
                }
              />
              <ListElement
                label="La Côte d’Or, Bernard Loiseau"
                onClick={() =>
                  goToRoute(
                    "/all-projects/hospitalite-&-art-de-vivre/loiseau-des-vignes,-beaune"
                  )
                }
              />
              <ListElement
                label="Dagaz, Ibiza"
                onClick={() =>
                  goToRoute("all-projects/prestige-et-exception/dagaz,-ibiza")
                }
              />
            </Stack>
          </Stack>
          <Button
            level="secondary"
            label="Tous les projets"
            position="left"
            onClick={() => navigate("/all-projects")}
          >
            <ArrowRight />
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
          <img
            src={officeImage}
            alt="Francois Damidot réunion de chantier équipes"
          />
          <Button
            level="secondary"
            label="L’Agence"
            position="left"
            onClick={() => navigate("/office")}
          >
            <ArrowRight />
          </Button>
        </Stack>
      </Section>
    </Stack>
  );
};
