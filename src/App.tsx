import { App } from "@packages/ui";
import { useState } from "react";

import { AMDHeader } from "./components/header";
import { Ticker } from "./components/ticker";
import ListElement from "./components/list-element";
import SectionTitle from "./components/section-title";
import InputText from "./components/input-text";

import { assets } from "./assets/assets";

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
    </App>
  );
};

export default AMD;
