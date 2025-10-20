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
    fontFamily: "Helvetica LT Pro",
    fontWeight: 700,
    fontSize: "12px",
  }),
  number: css({
    paddingRight: "4px",

    fontFamily: "Helvetica LT Pro",
    fontWeight: 700,
    fontSize: "38px",
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
