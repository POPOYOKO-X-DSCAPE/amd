import React from "react";
import MenuOption, { Option } from "../menu-option";
import { Button } from "../button";
import Dark from "../../assets/Dark.svg";
import Light from "../../assets/Light.svg";
import French from "../../assets/French.svg";
import English from "../../assets/English.svg";
import SpeechBallon from "../../assets/SpeechBalloon.svg";
import "./index.scss";

interface MenuProps {
  mode: string;
  setMode: (value: string) => void;
  language: string;
  setLanguage: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const Menu: React.FC<MenuProps> = ({
  mode,
  setMode,
  language,
  setLanguage,
  isOpen,
  setIsOpen,
}) => {
  return (
    <div className={`menu ${isOpen ? "slideDown" : "slideUp"}`}>
      <MenuOption
        selectedValue={language}
        onSelect={setLanguage}
        type="language"
      >
        <Option label="En" value="en" icon={English} />
        <Option label="Fr" value="fr" icon={French} />
      </MenuOption>

      <MenuOption selectedValue={mode} onSelect={setMode} type="mode">
        <Option label="Dark" value="dark" icon={Dark} />
        <Option label="Light" value="light" icon={Light} />
      </MenuOption>

      <div className="menu-navigation">
        <hr />
        <div className="menu-button-container">
          <Button.Secondary label="Home" />
        </div>
        <div className="menu-button-container">
          <Button.Secondary label="Projects" />
        </div>
        <hr />
        <div className="menu-button-container">
          <Button.Secondary
            label="Contact"
            icon={SpeechBallon}
            iconPosition="left"
          />
        </div>
      </div>
    </div>
  );
};

export default Menu;
