import { Stack } from "@packages/ui";
import { css } from "@styles";
import SectionTitle from "../section-title";

interface SectionProps {
  title: string;
  number: string | number;
  children: React.ReactNode;
}

const styles = {
  container: css({
    padding: "16px 0",
    gap: "24px",
  }),
  content: css({
    gap: "24px",
    alignSelf: "stretch",
  }),
  title: css({
    fontFamily: "Didot LT Pro",
    fontWeight: 400,
    fontSize: "60px",
    lineHeight: "52px",
  }),
  children: css({
    alignSelf: "stretch",
  }),
};

export const Section = ({ title, number, children }: SectionProps) => {
  return (
    <Stack className={styles.container}>
      <SectionTitle title={title} number={number}></SectionTitle>
      <Stack className={styles.content}>
        <span className={styles.title}>{title}</span>
        <Stack className={styles.children}>{children}</Stack>
      </Stack>
    </Stack>
  );
};

export default Section;
