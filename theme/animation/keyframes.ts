import { defineKeyframes } from "@pandacss/dev";

export const keyframes = defineKeyframes({
  "ticker-scroll": {
    from: { transform: "translateX(100%)" },
    to: { transform: "translateX(-100%)" },
  },
});
