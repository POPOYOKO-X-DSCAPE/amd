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
import { useLang } from "../../contexts/language-context";
import usePageTransition from "../../hooks/usePageTransition";

const styles = {
  links: css({
    gap: "6px",
    marginBottom: "s.m",
  }),
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
      width: "50%",
      paddingX: "s.xl",
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
    marginBottom: "s.xl",
  }),
  officeCta: css({
    gap: "s.xl",
    _desktop: {
      gap: "s.m",
    },
  }),
  projectsCta: css({
    _desktop: {
      gap: "s.x2l",
    },
  }),
};

export const Home = () => {
  const isMobile = useMobile(1100);
  const { transitionTo } = usePageTransition();
  const { language } = useLang();

  const images = [
    assets.chaletCine,
    assets.chaletExterieur,
    assets.chaletPiscine,
  ];

  const texts = {
    fr: {
      section1: {
        title: "l'approche Amd",
        description:
          "Créative et ancrée dans l'excellence, AMD interior designer est une agence de conseil en architecture et design d'intérieur. Fidèle à ses collaborateurs depuis l'origine, elle incarne une véritable synergie d'équipe, menée avec maitrise, et renforcée par une relation de confiance avec ses clients. Une dynamique portée par l'intégrité, l'engagement et la passion de François Damidot.",
        project:
          "Analyse immobilière, étude de faisabilité avant investissement, conseil d’architecture et design d’intérieur, conception, exécution et maîtrise d’œuvre, nous vous accompagnons du premier coup de pelle au dernier détail.",
        beforeCTA: "Un projet en tête?",
        buttonContact: "Parlons-en",
      },
      section2: {
        title: "Projets",
        buttonProjects: "Tous les projets",
        adn: " L'ADN de AMD Interior designer s'exprime à travers quatre pôles complémentaires, où l'exigence du détail et la quête d'excellence transforme chaque projet en une signature unique.",
        story:
          "L'histoire d'AMD Interior Designer a été initié par une rencontre fondatrice : celle d'un premier client visionnaire, à l'origine de projets de luxe et d'exception. Depuis, chaque projet est façonné par l'exigence de son fondateur, qui a su s'entourer de partenaires choisis pour leur savoir-faire, leur rigueur et leur sens du détail.",
      },
      section3: {
        title: "Office",
        officeButton: "L’Agence",
        altImg: "Francois Damidot réunion de chantier équipes",
      },
    },
    en: {
      section1: {
        title: "Home",
        description:
          "Anchored in creativity and excellence, AMD Interior Designer is a distinguished consultancy in architecture and interior design. Since its inception, the agency has fostered enduring collaborations, embodying a genuine synergy of talents, guided with mastery and reinforced by a trusted dialogue with its clients. A dynamic inspired by the integrity, commitment, and passion of François Damidot.",
        project:
          "From real estate analysis and feasibility studies to architectural and interior design consulting, conception, execution and project management. AMD Interior Designer accompanies you every step of the way, from groundbreaking to the finest detail.",
        beforeCTA: "Any Project in Mind?",
        buttonContact: "Chat with us",
      },
      section2: {
        title: "All Projects",
        buttonProjects: "All the projects",
        adn: "AMD Interior Designer is expressed through four complementary areas, where the attention to detail and the quest for excellence transform each project into a unique signature.",
        story:
          "The story of AMD Interior Designer began with a pivotal encounter: that of a visionary first client, at the origin of exceptional and luxurious projects. Since then, the agency’s identity has been expressed in every creation, guided by the high standards of its founder, François Damidot, who carefully selects partners for their expertise, precision, and attention to detail.",
      },
      section3: {
        title: "Office",
        officeButton: "Office",
        altImg: "Francois Damidot site meeting teams",
      },
    },
  };

  const trads = () => {
    if (language === "fr") {
      return texts.fr;
    }
    return texts.en;
  };

  return (
    <Stack>
      <Caroussel>
        {images.map((image) => (
          <img key={image} src={image} alt={image} />
        ))}
      </Caroussel>
      <Ticker />
      <Separator />
      <Section title={trads().section1.title} number={0}>
        <Stack className={styles.contentApproche}>
          <Stack className={styles.textDescription}>
            {trads().section1.description}
          </Stack>
          <Stack
            direction={isMobile ? "column" : "row"}
            className={styles.officeCta}
          >
            <Stack className={styles.textProject} justifyContent="center">
              {trads().section1.project}
            </Stack>
            <Stack className={styles.cta} alignItems="center" grow>
              <Stack alignItems="center" className={styles.textProject}>
                {trads().section1.beforeCTA}
              </Stack>
              <Button
                label={trads().section1.buttonContact}
                onClick={() => transitionTo(`/${language}/contact`)}
              >
                <SpeechBalloon />
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Section>
      <Separator />
      <Section title={trads().section2.title} number={1}>
        <Stack className={styles.contentSection}>
          <Stack
            className={styles.projectsCta}
            direction={isMobile ? "column" : "row"}
          >
            <Stack className={styles.contentSectionDescription}>
              {trads().section2.adn}
            </Stack>
            <Stack grow className={styles.links}>
              <ListElement
                label="Chalet, Verbier"
                onClick={() =>
                  transitionTo(
                    `/${language}/all-projects/exceptional-and-Luxury/chalet,-verbier`
                  )
                }
              />
              <ListElement
                label="Cologny, Genève"
                onClick={() =>
                  transitionTo(
                    `/${language}/all-projects/exceptional-and-Luxury/cologny,-geneve`
                  )
                }
              />
              <ListElement
                label="La Côte d’Or, Bernard Loiseau"
                onClick={() =>
                  transitionTo(
                    `/${language}/all-projects/hospitality-and-art-de-vivre/loiseau-des-vignes,-beaune`
                  )
                }
              />
              <ListElement
                label="Dagaz, Ibiza"
                onClick={() =>
                  transitionTo(
                    `/${language}/all-projects/exceptional-and-Luxury/dagaz,-ibiza`
                  )
                }
              />
            </Stack>
          </Stack>
          <Button
            level="secondary"
            label={trads().section2.buttonProjects}
            position="left"
            onClick={() => transitionTo(`/${language}/all-projects`)}
          >
            <ArrowRight />
          </Button>
        </Stack>
      </Section>
      <Separator />
      <Section title={trads().section3.title} number={2}>
        <Stack className={styles.contentSection}>
          <Stack className={styles.contentSectionDescription}>
            {trads().section2.story}
          </Stack>
          <img src={officeImage} alt={trads().section3.altImg} />
          <Button
            level="secondary"
            label={trads().section3.officeButton}
            position="left"
            onClick={() => transitionTo(`/${language}/office`)}
          >
            <ArrowRight />
          </Button>
        </Stack>
      </Section>
    </Stack>
  );
};
