import React from "react";
import "./index.scss";

interface MenuOptionProps {
  children: React.ReactElement<OptionProps> | React.ReactElement<OptionProps>[];
  selectedValue: string;
  onSelect: (value: string) => void;
  type?: "mode" | "language";
}

interface OptionProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export const Option: React.FC<OptionProps> = () => null;

const MenuOption: React.FC<MenuOptionProps> = ({
  children,
  selectedValue,
  onSelect,
  type = "mode",
}) => {
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<OptionProps>[];

  if (type === "mode") {
    const currentOption = childrenArray.find(
      (child) => child.props.value === selectedValue
    );
    const alternativeOption = childrenArray.find(
      (child) => child.props.value !== selectedValue
    );

    if (!currentOption || !alternativeOption) return null;

    return (
      <div className="menu-option">
        <div className="menu-option-container menu-option-container-mode">
          <button
            className="menu-option-button menu-option-button-active"
            onClick={() => onSelect(alternativeOption.props.value)}
          >
            <span className="menu-option-label">
              {currentOption.props.label}
            </span>
            <span className="menu-option-icon">
              {typeof currentOption.props.icon === "string" ? (
                <img
                  src={currentOption.props.icon}
                  alt={currentOption.props.label}
                />
              ) : (
                currentOption.props.icon
              )}
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="menu-option">
      <div className="menu-option-container menu-option-container-language">
        {childrenArray.map((child) => {
          const { label, value, icon } = child.props;

          return (
            <button
              key={value}
              className={`menu-option-button ${
                selectedValue === value
                  ? "menu-option-button-active"
                  : "menu-option-button-inactive"
              }`}
              onClick={() => onSelect(value)}
            >
              <span className="menu-option-label">{label}</span>
              <span className="menu-option-icon">
                {typeof icon === "string" ? (
                  <img src={icon} alt={label} />
                ) : (
                  icon
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MenuOption;
