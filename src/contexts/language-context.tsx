import { createContext, useContext, useEffect, useState } from "react";

type Language = "fr" | "en";

const getDefaultLanguage = (): Language => {
	const browserLanguage = navigator.language || navigator.languages[0]; // Prend la langue par défaut
	return browserLanguage.startsWith("fr") ? "fr" : "en"; // Définit la langue sur "fr" si elle commence par "fr", sinon "en"
};

interface LanguageContextType {
	language: Language;
	setLanguage: (
		mode: Language | ((prevMode: Language) => Language),
	) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
	undefined,
);

export const LanguageProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [language, setLanguage] = useState<Language>(
		getDefaultLanguage(),
	);

	useEffect(() => {
		document.documentElement.setAttribute("lang", language);
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
