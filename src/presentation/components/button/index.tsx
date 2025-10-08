import React from "react";
import "./index.scss";

interface Props {
  label: string;
  icon?: string;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<Props & { variant?: "primary" | "secondary" }> & {
  Primary: React.FC<Props>;
  Secondary: React.FC<Props>;
} = ({ variant = "primary", icon, iconPosition = "left", label, ...props }) => (
  <button className={`btn btn-${variant}`} {...props}>
    {icon && iconPosition === "left" && (
      <img src={icon} alt="" className="btn-icon" />
    )}
    <span className="btn-label">{label}</span>
    {icon && iconPosition === "right" && (
      <img src={icon} alt="" className="btn-icon" />
    )}
  </button>
);

Button.Primary = (props) => <Button variant="primary" {...props} />;
Button.Secondary = (props) => <Button variant="secondary" {...props} />;

export { Button };
