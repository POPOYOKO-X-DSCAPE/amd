import { createContext, useContext, useState } from "react";

interface AnimationContextType {
  animating: boolean;
  setIsAnimating: (mode: boolean) => void;
  startAnimation: () => void;
  endAnimation: () => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined
);

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [animating, setIsAnimating] = useState<boolean>(false);

  const startAnimation = () => {
    setIsAnimating(true);
  };

  const endAnimation = () => {
    setIsAnimating(false);
  };

  return (
    <AnimationContext.Provider
      value={{ animating, setIsAnimating, startAnimation, endAnimation }}
    >
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
};
