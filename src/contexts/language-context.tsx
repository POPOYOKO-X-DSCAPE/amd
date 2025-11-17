import { createContext, useContext, useEffect, useState } from "react";
import usePageTransition from "../hooks/usePageTransition";

type Language = "fr" | "en";

const getDefaultLanguage = (): Language => {
  const browserLanguage = navigator.language || navigator.languages[0];
  return browserLanguage.startsWith("fr") ? "fr" : "en";
};
interface LanguageContextType {
  language: Language;
  setLanguage: (mode: Language | ((prevMode: Language) => Language)) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { transitionTo } = usePageTransition();

  const [language, setLanguage] = useState<Language>(getDefaultLanguage());

  // biome-ignore lint/correctness/useExhaustiveDependencies: we dont want to follow transitionTo
  useEffect(() => {
    const currentPath = location.pathname;
    let newPath = "";
    if (language === "fr") {
      newPath = currentPath.replace("/en/", "/fr/");
    } else if (language === "en") {
      newPath = currentPath.replace("/fr/", "/en/");
    }
    transitionTo(newPath, () =>
      document.documentElement.setAttribute("lang", language)
    );
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLang must be used within a LanguageProvider");
  }
  return context;
};
