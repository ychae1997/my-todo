import { createContext, useContext, useEffect, useState } from 'react';

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
    updateDarkMode(!darkMode);
  };

  useEffect(() => {
    const isDark =
      localStorage.theme === 'dark' || // storage dark 모드 판단
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-sheme: dark)').matches); // 사용자 브라우저 세팅값
    setDarkMode(isDark); // 내부 state업데이트
    updateDarkMode(isDark); // class dark 여부
  }, []);
  // dark모드 기억하기

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function updateDarkMode(darkMode) {
  if (darkMode) {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  }
}
export const useDarkMode = () => useContext(DarkModeContext);
