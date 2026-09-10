import { defineKeyframes } from "@pandacss/dev";

export const keyframes = defineKeyframes({
  "ticker-scroll": {
    from: { transform: "translateX(0%)" },
    to: { transform: "translateX(-10000%)" },
  },
  "slide-down": {
    from: { transform: "translateY(-100%)" },
    to: { transform: "translateY(0)" },
  },
  "slide-up": {
    from: { transform: "translateY(0)" },
    to: { transform: "translateY(-120%)" },
  },
});
