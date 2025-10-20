import { defineAnimationStyles } from "@pandacss/dev";

export const animationStyles = defineAnimationStyles({
  "ticker-scroll": {
    value: {
      animationName: "ticker-scroll",
      animationDuration: "300s",
      animationTimingFunction: "linear",
      animationIterationCount: "infinite",
    },
  },
});
