import { Stack, Button as UiButton } from "@packages/ui";
import { css } from "@styles";

const styles = {
  primary: css({
    width: "100%",
    padding: "16px",
    gap: "16px",
    alignSelf: "stretch",
    border: "1px solid",
    borderColor: "s.fg.default.initial",
    color: "s.fg.default.initial",
  }),
  secondary: css({
    gap: "8px",
  }),
  text: css({
    textStyle: "emphasis",
    color: "s.fg.default.initial",
    display: "flex",
    alignItems: "center",
  }),
  icon: css({
    color: "s.fg.default.initial",
    width: "32px",
    height: "32px",
  }),
};

interface ButtonProps {
  level?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  label: string;
  icon?: string;
  iconPosition?: "left" | "right";
  onClick?: () => void;
}

export const Button = ({
  level = "primary",
  type = "button",
  label,
  icon,
  iconPosition = "right",
  onClick,
}: ButtonProps) => {
  return (
    <UiButton level={level} type={type} onClick={onClick}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        className={level === "primary" ? styles.primary : styles.secondary}
      >
        {icon && iconPosition === "left" && (
          <img src={icon} alt={icon} className={styles.icon} />
        )}
        <span className={styles.text}>{label}</span>
        {icon && iconPosition === "right" && (
          <img src={icon} alt={icon} className={styles.icon} />
        )}
      </Stack>
    </UiButton>
  );
};
