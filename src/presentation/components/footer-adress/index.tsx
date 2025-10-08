import React from "react";
import "./index.scss";

interface FooterAdressProps {
  title: string;
  content: string;
}

const FooterAdress: React.FC<FooterAdressProps> = ({ title, content }) => (
  <div className="footer-address">
    <p className="footer-address-title">{title}</p>
    <p className="footer-address-content">{content}</p>
  </div>
);

export default FooterAdress;
