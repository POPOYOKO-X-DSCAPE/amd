import React from "react";
import ArchitectureInteriorDesigner from "../../assets/Architecture Interior Designer.svg";
import Open from "../../assets/Open=True.svg";
import Close from "../../assets/Open=False.svg";
import "./index.scss";

interface HeaderProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ isOpen, onToggle }) => (
  <header>
    <div className="header-content">
      <img
        src={ArchitectureInteriorDesigner}
        alt="Architecture Interior Designer"
      />
      <button className="header-button" onClick={onToggle}>
        <img
          src={isOpen ? Open : Close}
          alt={isOpen ? "Close menu" : "Open menu"}
        />
      </button>
    </div>
  </header>
);

export default Header;
