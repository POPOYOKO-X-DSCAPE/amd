import { Stack, Button as UiButton } from "@packages/ui";
import { css } from "@styles";

const styles = {
  primary: css({
    width: "100%",
    padding: "s.m",
    gap: "s.m",
    alignSelf: "stretch",
    border: "1px solid",
    backgroundColor: "s.bg.actionHigh.initial",
    borderColor: "s.fg.actionHigh.initial",
    color: "s.fg.actionHigh.initial",
    _hover: {
      backgroundColor: "s.bg.actionHigh.hover",
    },
  }),
  secondary: css({
    gap: "s.s",
    _hover: {
      backgroundColor: "s.bg.actionHigh.hover",
    },
  }),
  text: css({
    textStyle: "emphasis",
    color: "s.fg.default.initial",
    display: "flex",
    alignItems: "center",
  }),
};

interface ButtonProps {
  level?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  label: string;
  position?: "left" | "right";
  onClick?: () => void;
  children?: React.ReactNode;
}

export const Button = ({
  level = "primary",
  type = "button",
  label,
  position = "right",
  onClick,
  children,
}: ButtonProps) => {
  return (
    <UiButton level={level} type={type} onClick={onClick}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        className={level === "primary" ? styles.primary : styles.secondary}
      >
        {position === "left" ? (
          <>
            {children}
            <span className={styles.text}>{label}</span>
          </>
        ) : (
          <>
            <span className={styles.text}>{label}</span>
            {children}
          </>
        )}
      </Stack>
    </UiButton>
  );
};
