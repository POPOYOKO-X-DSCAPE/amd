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
  "slide-down": {
    value: {
      animationName: "slide-down",
      animationDuration: "0.3s",
      animationTimingFunction: "ease-out",
      animationFillMode: "forwards",
    },
  },
  "slide-up": {
    value: {
      animationName: "slide-up",
      animationDuration: "0.3s",
      animationTimingFunction: "ease-in",
      animationFillMode: "forwards",
    },
  },
});
