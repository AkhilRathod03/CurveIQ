import React, { createContext, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const darkMode = false;

    useEffect(() => {
        document.documentElement.setAttribute('data-bs-theme', 'light');
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }, []);

    const toggleDarkMode = () => {};

    return (
        <ThemeContext.Provider value={{ darkMode: false, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

