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
    textStyle: "section.title",
  }),
  number: css({
    paddingRight: { _desktop: "7px", _mobile: "4px" },
    textStyle: "section.number",
  }),
};

export const SectionTitle = ({ title, number }: SectionTitleProps) => {
  const formattedNumber = String(number).padStart(2, "0");

  return (
    <Stack direction="row" className={styles.container}>
      <span className={styles.title}>{title}</span>
      <span className={styles.number}>_{formattedNumber}</span>
    </Stack>
  );
};

export default SectionTitle;
