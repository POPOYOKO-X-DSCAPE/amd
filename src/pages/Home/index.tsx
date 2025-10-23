import { Stack } from "@packages/ui";
import { Ticker } from "../../components/ticker";

import { assets } from "../../assets/assets";
import Caroussel from "../../components/caroussel";
import Section from "../../components/section";
import Separator from "../../components/separator";

export const Home = () => {
  const images = [
    assets.chaletCine,
    assets.chaletExterieur,
    assets.chaletPiscine,
  ];

  return (
    <>
      <Stack>
        <Caroussel>
          {images.map((image) => (
            <img key={image} src={image} alt={image} />
          ))}
        </Caroussel>
      </Stack>

      <Ticker />

      <Separator />

      <Section title="L'approche Amd" number={0}>
        <span>
          Créative et ancrée dans l'excellence, AMD interior designer est une
          agence de conseil en architecture et design d'intérieur. Fidèle à ses
          collaborateurs depuis l'origine, elle incarne une véritable synergie
          d'équipe, menée avec maitrise, et renforcée par une relation de
          confiance avec ses clients. Une dynamique portée par l'intégrité,
          l'engagement et la passion de François Damidot.
        </span>
      </Section>

      <Separator />

      <Section title="Projets" number={1}>
        <span>
          L'ADN de AMD Interior designer s'exprime à travers quatre pôles
          complémentaires, où l'exigence du détail et la quête d'excellence
          transforme chaque projet en une signature unique.
        </span>
      </Section>

      <Separator />

      <Section title="Office" number={2}>
        <span>
          L'histoire d'AMD Interior Designer a été initié par une rencontre
          fondatrice : celle d'un premier client visionnaire, à l'origine de
          projets de luxe et d'exception. Depuis, chaque projet est façonné par
          l'exigence de son fondateur, qui a su s'entourer de partenaires
          choisis pour leur savoir-faire, leur rigueur et leur sens du détail.
        </span>
      </Section>
    </>
  );
};
