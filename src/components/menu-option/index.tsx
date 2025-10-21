import { Button, Stack } from "@packages/ui";
import { css } from "@styles";

interface MenuOptionProps {
  type?: "mode" | "language";
  selectedValue: string;
  onSelect: (value: string) => void;
  options: {
    label: string;
    value: string;
    icon?: string;
  }[];
}

const styles = {
  container: css({
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: "s.bg.default.initial",
    gap: "16px",
  }),
};

export const MenuOption = ({
  type = "mode",
  selectedValue,
  onSelect,
  options,
}: MenuOptionProps) => {
  if (type === "mode") {
    const current = options.find((o) => o.value === selectedValue);
    const next = options.find((o) => o.value !== selectedValue);
    if (!current || !next) return null;

    return (
      <Stack direction="row" className={styles.container}>
        <Button level="secondary" onClick={() => onSelect(next.value)}>
          {current.label}
          {current.icon && <img src={current.icon} alt={current.label} />}
        </Button>
      </Stack>
    );
  }

  return (
    <Stack direction="row" className={styles.container}>
      {options.map((option) => {
        const isActive = option.value === selectedValue;
        return (
          <Button
            key={option.value}
            level={isActive ? "primary" : "secondary"}
            onClick={() => onSelect(option.value)}
          >
            {option.label}
            {option.icon && <img src={option.icon} alt={option.label} />}
          </Button>
        );
      })}
    </Stack>
  );
};

export default MenuOption;
