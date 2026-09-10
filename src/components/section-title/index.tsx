import { Heading, HeadingLevel } from "@ariakit/react";
import { Stack } from "@packages/ui";
import { css } from "@styles";

interface SectionTitleProps {
  title: string;
  number: string | number;
}

const styles = {
  container: css({
    width: "100%",
    gap: "s.l",
    marginBottom: "s.xl",
  }),
  title: css({
    flexGrow: 1,
    textStyle: "section.title",
  }),
  number: css({
    lineHeight: "40px",
    _desktop: {
      lineHeight: "104px",
    },

    paddingRight: { _desktop: "7px", _mobile: "s.xs" },
    textStyle: "section.number",
  }),
};

export const SectionTitle = ({ title, number }: SectionTitleProps) => {
  const formattedNumber = String(number).padStart(2, "0");

  return (
    <Stack direction="row" className={styles.container}>
      <HeadingLevel>
        <Heading className={styles.title}>{title}</Heading>
        <span className={styles.number}>_{formattedNumber}</span>
      </HeadingLevel>
    </Stack>
  );
};

export default SectionTitle;
