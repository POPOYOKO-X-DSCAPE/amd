import { Stack } from "@packages/ui";
import { css } from "@styles";

const LinotypeDidotProItalic = "LinotypeDidotProItalic, serif";

const styles = {
  container: css({
    minHeight: "80px",
    overflowX: "visible",
    maxWidth: "100%",
    _desktop: {
      height: "166px",
    },
  }),
  tickerContent: css({
    whiteSpace: "nowrap",
    animationStyle: "ticker-scroll",
    gap: "12px",
    _desktop: {
      gap: "37px",
    },
  }),
  architecture: css({
    fontFamily: "Helvetica LT Pro, sans-serif",
    fontWeight: 700,
    fontStyle: "normal",
    fontSize: "53px",
    lineHeight: "100%",
    letterSpacing: "0%",
    _desktop: {
      fontSize: "124px",
    },
  }),
  interior: css({
    fontFamily: LinotypeDidotProItalic,
    fontWeight: 400,
    fontStyle: "italic",
    fontSize: "53px",
    marginTop: "7px",
    lineHeight: "100%",
    letterSpacing: "0%",
    _desktop: {
      fontSize: "124px",
      marginTop: "12px",
    },
  }),
  designer: css({
    fontFamily: "Helvetica LT Pro, sans-serif",
    fontWeight: 700,
    fontStyle: "normal",
    fontSize: "53px",
    lineHeight: "100%",
    letterSpacing: "0%",
    _desktop: {
      fontSize: "118px",
    },
  }),
  prototypes: css({
    fontFamily: "Helvetica LT Pro, sans-serif",
    fontWeight: 300,
    fontStyle: "italic",
    fontSize: "53px",
    lineHeight: "100%",
    letterSpacing: "0%",
    _desktop: {
      fontSize: "118px",
    },
  }),
  engineering: css({
    fontFamily: "Helvetica LT Pro, sans-serif",
    fontWeight: 700,
    fontStyle: "normal",
    fontSize: "53px",
    lineHeight: "100%",
    letterSpacing: "0%",
    _desktop: {
      fontSize: "118px",
    },
  }),
};

export const Ticker = () => {
  const words = [
    { label: "Architecture", style: styles.architecture },
    { label: "Interior", style: styles.interior },
    { label: "Designer", style: styles.designer },
    { label: "Prototypes", style: styles.prototypes },
    { label: "Engineering", style: styles.engineering },
  ];

  const repeatCount = 100;
  const repeatedWords = Array.from({ length: repeatCount }, () => words).flat();

  return (
    <Stack justifyContent="center" className={styles.container}>
      <Stack direction="row" className={styles.tickerContent}>
        {repeatedWords.map((w, i) => (
          <Stack key={`${w.label}-${i}`} className={w.style}>
            {w.label}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default Ticker;
