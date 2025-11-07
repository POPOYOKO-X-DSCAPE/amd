import { css } from "@styles";
import classNames from "classnames";
import { useEffect } from "react";
import { useAnimation } from "../../contexts/animation-context";

const styles = {
  initial: css({
    width: "100%",
    height: "0%",
    position: "fixed",
    bottom: 0,
    left: 0,
    zIndex: 10000,
    backgroundColor: "s.bg.elevated.initial",
    transitionDuration: "750ms",
    transitionProperty: "all",
    transitionTimingFunction: "ease-in-out",
    overflow: "hidden",
  }),
  end: css({
    width: "100%",
    height: "100%",
    position: "fixed",
    bottom: 0,
    left: 0,
    zIndex: 10000,
    backgroundColor: "s.bg.elevated.initial",
    transitionDuration: "750ms",
    transitionProperty: "all",
    transitionTimingFunction: "ease-in-out",
    overflow: "hidden",
  }),
};

export const PageChangeAnimation = () => {
  const { animating } = useAnimation();

  useEffect(() => {
    if (animating) {
      console.log(animating);
    } else {
      console.log(animating);
    }
  }, [animating]);

  return <div className={animating ? styles.end : styles.initial} />;
};
