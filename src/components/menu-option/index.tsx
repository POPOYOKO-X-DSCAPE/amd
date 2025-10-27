import { Button, Stack } from "@packages/ui";
import { css } from "@styles";
import type { ReactNode } from "react";

interface MenuOptionProps {
  type?: "mode" | "language";
  selectedValue: string;
  onSelect: (value: string) => void;
  options: {
    value: string;
    children: ReactNode;
  }[];
}

const styles = {
  container: css({
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: "s.bg.default.initial",
    paddingX: "s.s",
    paddingY: "s.xs",
    gap: "s.m",
  }),
  buttonOption: css({
    gap: "s.xs",
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
          <Stack
            direction="row"
            alignItems="center"
            className={styles.buttonOption}
          >
            {current.children}
          </Stack>
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
            <Stack
              direction="row"
              alignItems="center"
              className={styles.buttonOption}
            >
              {option.children}
            </Stack>
          </Button>
        );
      })}
    </Stack>
  );
};

export default MenuOption;
