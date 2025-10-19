import { Stack } from "@packages/ui";
import { css } from "@styles";

interface ListElementProps {
  label: string;
  children?: React.ReactNode;
}

const styles = {
  container: css({}),
};

export const ListElement = ({ label, children }: ListElementProps) => {
  return (
    <Stack direction="row" className={styles.container}>
      {children && <span>{children}</span>}
      <span>{label}</span>
    </Stack>
  );
};

export default ListElement;
