import { App } from "@packages/ui";
import { useState } from "react";

import { AMDHeader } from "./components/header";
import { Ticker } from "./components/ticker";
import ListElement from "./components/list-element";
import SectionTitle from "./components/section-title";
import InputText from "./components/input-text";

import { assets } from "./assets/assets";
import Footer from "./components/footer";
import Section from "./components/section";

const AMD = () => {
  const [name, setName] = useState("");

  return (
    <App>
      <AMDHeader />
      <Ticker />
      <ListElement label="Hello world">
        <img src={assets.SpeechBalloon} alt="Speech Balloon" />
      </ListElement>
      <SectionTitle title="Title" number="01" />
      <InputText
        label="Nom"
        placeholder="Entrez votre nom"
        value={name}
        onChange={setName}
      />
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
      <Footer />
    </App>
  );
};

export default AMD;
