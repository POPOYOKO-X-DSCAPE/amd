import { Stack } from "@packages/ui";
import { css } from "@styles";

interface SectionTitleProps {
  title: string;
  number: string | number;
}

const styles = {
  container: css({
    width: "100%",
    gap: "24px",
  }),
  title: css({
    flexGrow: 1,
  }),
  number: css({}),
};

export const SectionTitle = ({ title, number }: SectionTitleProps) => {
  return (
    <Stack direction="row" className={styles.container}>
      <span className={styles.title}>{title}</span>
      <span className={styles.number}>_{number}</span>
    </Stack>
  );
};

export default SectionTitle;
