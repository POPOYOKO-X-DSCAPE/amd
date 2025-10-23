import { App } from "@packages/ui";

import { AMDHeader } from "./components/header";
import { Ticker } from "./components/ticker";
import ListElement from "./components/list-element";
import SectionTitle from "./components/section-title";

import { assets } from "./assets/assets";

const AMD = () => {
  return (
    <App>
      <AMDHeader />
      <Ticker />
      <ListElement label="Hello world">
        <img src={assets.SpeechBalloon} alt="Speech Balloon" />
      </ListElement>
      <SectionTitle title="Title" number="01" />
    </App>
  );
};

export default AMD;
