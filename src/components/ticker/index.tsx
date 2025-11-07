import { Stack } from "@packages/ui";
import { css } from "@styles";

const styles = {
  container: css({
    minHeight: "80px",
    overflow: "hidden",
    _desktop: {
      overflow: "visible",
    },
  }),
  tickerContent: css({
    whiteSpace: "nowrap",
    animationStyle: "ticker-scroll",
    gap: "12px",
  }),
  architecture: css({
    fontFamily: "Helvetica LT Pro, sans-serif",
    fontWeight: 700,
    fontStyle: "normal",
    fontSize: "53px",
    lineHeight: "100%",
    letterSpacing: "0%",
  }),
  interior: css({
    fontFamily: "Didot LT Pro, serif",
    fontWeight: 400,
    fontStyle: "italic",
    fontSize: "53px",
    lineHeight: "100%",
    letterSpacing: "0%",
  }),
  designer: css({
    fontFamily: "Helvetica LT Pro, sans-serif",
    fontWeight: 700,
    fontStyle: "normal",
    fontSize: "53px",
    lineHeight: "100%",
    letterSpacing: "0%",
  }),
  prototypes: css({
    fontFamily: "Helvetica LT Pro, sans-serif",
    fontWeight: 300,
    fontStyle: "italic",
    fontSize: "53px",
    lineHeight: "100%",
    letterSpacing: "0%",
  }),
  engineering: css({
    fontFamily: "Helvetica LT Pro, sans-serif",
    fontWeight: 700,
    fontStyle: "normal",
    fontSize: "53px",
    lineHeight: "100%",
    letterSpacing: "0%",
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
