import { css } from "@styles";
import { Stack } from "@packages/ui";

const styles = {
  container: css({ overflow: "hidden" }),
  tickerContent: css({
    whiteSpace: "nowrap",
    animationStyle: "ticker-scroll",
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

  return (
    <Stack className={styles.container}>
      <Stack direction="row" className={styles.tickerContent}>
        {words.map((w) => (
          <Stack key={w.label} className={w.style}>
            {w.label}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default Ticker;
