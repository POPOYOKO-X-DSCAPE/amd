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
    paddingX: "s.m",
    gap: "s.l",
    maxWidth: "100%",
    overflow: "hidden",
  }),
  content: css({
    gap: "s.l",
    alignSelf: "stretch",
    maxWidth: "100%",
    wordWrap: "break-word",
  }),
  title: css({
    textStyle: "title",
    maxWidth: "100%",
  }),
  children: css({
    alignSelf: "stretch",
    wordWrap: "break-word",
    overflowWrap: "break-word",
  }),
};

export const Section = ({ title, number, children }: SectionProps) => {
  return (
    <Stack className={styles.container}>
      <SectionTitle title={title} number={number} />
      <Stack className={styles.content}>
        <span className={styles.title}>{title}</span>
        <Stack className={styles.children}>{children}</Stack>
      </Stack>
    </Stack>
  );
};

export default Section;
