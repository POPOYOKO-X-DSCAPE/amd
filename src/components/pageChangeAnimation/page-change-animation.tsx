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
    transitionDuration: "250ms",
    transitionProperty: "all",
    transitionTimingFunction: "ease-in-out",
    overflow: "hidden",
    borderTop: "2px solid black",
    borderColor: "s.fg.default.initial",
  }),
  end: css({
    width: "100%",
    height: "100%",
    position: "fixed",
    bottom: 0,
    left: 0,
    zIndex: 10000,
    backgroundColor: "s.bg.elevated.initial",
    transitionDuration: "250ms",
    transitionProperty: "all",
    transitionTimingFunction: "ease-in-out",
    overflow: "hidden",
    borderTop: "2px solid black",
    borderColor: "s.fg.default.initial",
  }),
};

export const PageChangeAnimation = () => {
  const { animating } = useAnimation();

  return <div className={animating ? styles.end : styles.initial} />;
};
