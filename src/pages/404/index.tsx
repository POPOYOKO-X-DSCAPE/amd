import { Stack } from "@packages/ui";
import { css } from "@styles";
import { Button } from "../../components/button";
import usePageTransition from "../../hooks/usePageTransition";

const styles = {
  container: css({
    padding: "s.x3l",
    gap: "s.xl",
  }),
  title: css({
    textStyle: "title",
    height: "140px",
    _mobile: {
      height: "60px",
    },
  }),
  subTitle: css({
    textStyle: "body.s",
  }),
};

export const PageNotFound = () => {
  const { transitionTo } = usePageTransition();
  return (
    <Stack className={styles.container} alignItems="center">
      <Stack alignItems="center">
        <Stack className={styles.title}>404</Stack>
        <Stack className={styles.subTitle}>Page not found</Stack>
      </Stack>
      <Button label="Back to home" onClick={() => transitionTo("/")} />
    </Stack>
  );
};
