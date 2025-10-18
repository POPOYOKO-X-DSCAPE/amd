import { App } from "@packages/ui";

import { AMDHeader } from "./components/header";
import { Ticker } from "./components/ticker";
import ListElement from "./components/list-element";
import SectionTitle from "./components/section-title";

const AMD = () => {
  return (
    <App>
      <AMDHeader />
      <Ticker />
      <ListElement label="ListElement" SpeechBalloon={true} />
      <SectionTitle title="Title" number="01" />
    </App>
  );
};

export default AMD;
