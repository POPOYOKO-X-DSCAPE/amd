import { App } from "@packages/ui";

import { AMDHeader } from "./components/header";
import { Ticker } from "./components/ticker";
import ListElement from "./components/list-element";

const AMD = () => {
  return (
    <App>
      <AMDHeader />
      <Ticker />
      <ListElement label="ListElement" SpeechBalloon={true} />
    </App>
  );
};

export default AMD;
