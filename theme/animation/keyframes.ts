import { defineKeyframes } from "@pandacss/dev";

export const keyframes = defineKeyframes({
  "ticker-scroll": {
    from: { transform: "translateX(0%)" },
    to: { transform: "translateX(-10000%)" },
  },
});
