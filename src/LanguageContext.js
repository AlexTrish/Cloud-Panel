import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
    return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('ru'); // Установите язык по умолчанию

    const toggleLanguage = () => {
        setLanguage((prevLanguage) => (prevLanguage === 'ru' ? 'en' : 'ru'));
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
