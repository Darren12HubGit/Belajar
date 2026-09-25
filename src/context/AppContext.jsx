import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { translations } from '../data/translations';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const toggleTheme = (t) => setTheme(t);
  const toggleLang = (l) => setLang(l);

  const t = useMemo(() => translations[lang] || translations.en, [lang]);

  return (
    <AppContext.Provider value={{ theme, lang, toggleTheme, toggleLang, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
