import { App } from "@packages/ui";

import { AMDHeader } from "./components/header";
import { Ticker } from "./components/ticker";

const AMD = () => {
  return (
    <App>
      <AMDHeader />
      <Ticker />
    </App>
  );
};

export default AMD;
