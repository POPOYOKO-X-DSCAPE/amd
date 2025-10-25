import { Stack } from "@packages/ui";
import { css } from "@styles";

interface ListElementProps {
  label: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const styles = {
  container: css({
    paddingTop: "4px",
    cursor: "pointer",
  }),
  label: css({
    color: "s.fg.default.initial",
    textStyle: "emphasis",
  }),
};

export const ListElement = ({ label, children, onClick }: ListElementProps) => {
  const handleKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };
  return (
    <button
      style={{ justifyContent: "flex-end" }}
      className={styles.container}
      onClick={onClick}
      type="button"
    >
      <Stack direction="row">
        {children && <span>{children}</span>}
        <Stack className={styles.label}>{label}</Stack>
      </Stack>
    </button>
  );
};

export default ListElement;
