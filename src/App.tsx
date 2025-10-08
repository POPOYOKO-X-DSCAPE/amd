import { App as AbstractApp } from "@packages/ui";
import { useState } from "react";
import ArrowRight from "./presentation/assets/ArrowRight.svg";
import Dark from "./presentation/assets/Dark.svg";
import English from "./presentation/assets/English.svg";
import French from "./presentation/assets/French.svg";
import Light from "./presentation/assets/Light.svg";
import { Button } from "./presentation/components/button";
import Header from "./presentation/components/header";
import Menu from "./presentation/components/menu";
import MenuOption, { Option } from "./presentation/components/menu-option";
import "./index.scss";

const App = () => {
  const [mode, setMode] = useState("dark");
  const [language, setLanguage] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={mode}>
      <AbstractApp>
        <Header isOpen={menuOpen} onToggle={() => setMenuOpen(!menuOpen)} />
        <Menu
          mode={mode}
          setMode={setMode}
          language={language}
          setLanguage={setLanguage}
          isOpen={menuOpen}
          setIsOpen={setMenuOpen}
        />
      </AbstractApp>
    </div>
  );
};

export default App;
