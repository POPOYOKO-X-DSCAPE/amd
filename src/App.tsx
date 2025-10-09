import { App as AbstractApp } from "@packages/ui";

import { AMDHeader } from "./components/header";

const App = () => {
  return (
    <AbstractApp>
      <AMDHeader />
    </AbstractApp>
  );
};

export default App;
