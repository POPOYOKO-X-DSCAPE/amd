import { Stack } from "@packages/ui";
import { css } from "@styles";

interface ListElementProps {
  label: string;
  children?: React.ReactNode;
}

const styles = {
  container: css({
    justifyContent: "end",
    paddingTop: "4px",
  }),
};

export const ListElement = ({ label, children }: ListElementProps) => {
  return (
    <Stack direction="row" className={styles.container}>
      {children && <span>{children}</span>}
      <Stack>{label}</Stack>
    </Stack>
  );
};

export default ListElement;
