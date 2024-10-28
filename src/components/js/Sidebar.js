import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { onLogout } from '../../App';
import { handleChangeMenu, handleMonoMenuClick } from './Dashboard';
import { ThemeContext, themes } from '../../ThemeContext';
import '../css/index.scss';

const Sidebar = ({ onLogout }) => {
  const { theme, setTheme } = React.useContext(ThemeContext);
  const { i18n } = useTranslation(); // инициализация i18n для смены языка
  const [language, setLanguage] = useState('ru');

  // Функция для смены языка
  const toggleLanguage = () => {
    const newLanguage = language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
  };


  return (
    <div className="sidebar">
      <div className='navbar-wrapper'>
        <div className="navbar">
          <button id="home-ico" className="sidebar-icon" onClick={() => handleChangeMenu(null)}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.75 13.25H10.75V0.75H0.75V13.25ZM0.75 23.25H10.75V15.75H0.75V23.25ZM13.25 23.25H23.25V10.75H13.25V23.25ZM13.25 0.75V8.25H23.25V0.75H13.25Z"/></svg></button>
          <button id="net-ico" className="sidebar-icon"><svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 25C10.0277 25 7.61099 24.2669 5.55538 22.8934C3.49976 21.5199 1.89761 19.5676 0.951511 17.2835C0.0054161 14.9995 -0.242126 12.4861 0.24019 10.0614C0.722505 7.63661 1.91301 5.40932 3.66117 3.66116C5.40933 1.91301 7.63661 0.722497 10.0614 0.240182C12.4861 -0.242133 14.9995 0.00540841 17.2835 0.951504C19.5676 1.8976 21.5199 3.49975 22.8934 5.55537C24.2669 7.61098 25 10.0277 25 12.5C24.9964 15.8141 23.6783 18.9914 21.3349 21.3349C18.9915 23.6783 15.8141 24.9964 12.5 25ZM15.8563 17.7083H9.14376C10.0279 19.4539 11.1582 21.0634 12.5 22.4875C13.8423 21.0638 14.9727 19.4542 15.8563 17.7083ZM16.6896 15.625C17.0097 14.6139 17.1769 13.5606 17.1854 12.5C17.1769 11.4394 17.0097 10.3861 16.6896 9.375H8.30834C7.98818 10.3861 7.82106 11.4394 7.81251 12.5C7.82106 13.5606 7.98818 14.6139 8.30834 15.625H16.6896ZM9.79167 22.5458C8.59132 21.0773 7.60061 19.4493 6.84792 17.7083H3.49271C4.87381 20.087 7.13715 21.8253 9.79167 22.5458ZM2.08334 12.5C2.08324 13.56 2.24518 14.6139 2.56355 15.625H6.14584C5.87579 14.6051 5.7358 13.5551 5.72917 12.5C5.7358 11.4449 5.87579 10.3949 6.14584 9.375H2.56355C2.24518 10.3861 2.08324 11.4399 2.08334 12.5ZM3.49271 7.29166H6.84792C7.60061 5.55072 8.59132 3.92269 9.79167 2.45416C7.13715 3.17474 4.87381 4.91295 3.49271 7.29166ZM9.14376 7.29166H15.8563C14.9721 5.54611 13.8418 3.93662 12.5 2.5125C11.1577 3.93622 10.0273 5.54579 9.14376 7.29166ZM15.2135 2.45416C16.4121 3.923 17.401 5.55102 18.1521 7.29166H21.5073C20.1274 4.91403 17.8661 3.17596 15.2135 2.45416ZM22.9167 12.5C22.9168 11.4399 22.7548 10.3861 22.4365 9.375H18.8542C19.1242 10.3949 19.2642 11.4449 19.2708 12.5C19.2642 13.5551 19.1242 14.6051 18.8542 15.625H22.4344C22.7535 14.614 22.9161 13.5602 22.9167 12.5ZM18.1521 17.7083C17.401 19.449 16.4121 21.077 15.2135 22.5458C17.8661 21.824 20.1274 20.086 21.5073 17.7083H18.1521Z"/></svg></button>
          <button id="serv-ico" className="sidebar-icon" onClick={handleMonoMenuClick}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-database-fill" viewBox="0 0 16 16"><path d="M3.904 1.777C4.978 1.289 6.427 1 8 1s3.022.289 4.096.777C13.125 2.245 14 2.993 14 4s-.875 1.755-1.904 2.223C11.022 6.711 9.573 7 8 7s-3.022-.289-4.096-.777C2.875 5.755 2 5.007 2 4s.875-1.755 1.904-2.223"/><path d="M2 6.161V7c0 1.007.875 1.755 1.904 2.223C4.978 9.71 6.427 10 8 10s3.022-.289 4.096-.777C13.125 8.755 14 8.007 14 7v-.839c-.457.432-1.004.751-1.49.972C11.278 7.693 9.682 8 8 8s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972"/><path d="M2 9.161V10c0 1.007.875 1.755 1.904 2.223C4.978 12.711 6.427 13 8 13s3.022-.289 4.096-.777C13.125 11.755 14 11.007 14 10v-.839c-.457.432-1.004.751-1.49.972-1.232.56-2.828.867-4.51.867s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972"/><path d="M2 12.161V13c0 1.007.875 1.755 1.904 2.223C4.978 15.711 6.427 16 8 16s3.022-.289 4.096-.777C13.125 14.755 14 14.007 14 13v-.839c-.457.432-1.004.751-1.49.972-1.232.56-2.828.867-4.51.867s-3.278-.307-4.51-.867c-.486-.22-1.033-.54-1.49-.972"/></svg></button>
          <button id="stat-ico" className="sidebar-icon"><svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 25.5C6.09625 25.5 0.5 19.9037 0.5 13C0.5 7.4025 4.17875 2.665 9.25 1.0725V3.7275C7.10116 4.60006 5.32225 6.19213 4.21757 8.23139C3.1129 10.2707 2.7511 12.6304 3.19407 14.9069C3.63703 17.1835 4.85724 19.2354 6.64596 20.7117C8.43467 22.1879 10.6808 22.9968 13 23C14.9922 22.9999 16.9391 22.4051 18.5911 21.2915C20.243 20.178 21.5249 18.5967 22.2725 16.75H24.9275C23.335 21.8213 18.5975 25.5 13 25.5ZM25.4375 14.25H11.75V0.5625C12.1613 0.52125 12.5787 0.5 13 0.5C19.9037 0.5 25.5 6.09625 25.5 13C25.5 13.4213 25.4788 13.8387 25.4375 14.25ZM14.25 3.0775V11.75H22.9225C22.6443 9.54701 21.6411 7.49917 20.071 5.92904C18.5008 4.35892 16.453 3.35573 14.25 3.0775Z"/></svg></button>
        </div>
        <div className="container-for-btn">
          <button id="switch-language" className='sidebar-icon' onClick={toggleLanguage}>{language === 'ru' ? 'EN' : 'RU'}</button>
          <button id="settings-ico" className="sidebar-icon" onClick={() => setTheme(theme === themes.dark ? themes.light : themes.dark)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sun-fill" viewBox="0 0 16 16"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-moon-fill" viewBox="0 0 24 24"><path class="cls-2" d="M12.3,22h-.1a10.31,10.31,0,0,1-7.34-3.15,10.46,10.46,0,0,1-.26-14,10.13,10.13,0,0,1,4-2.74,1,1,0,0,1,1.06.22,1,1,0,0,1,.24,1,8.4,8.4,0,0,0,1.94,8.81,8.47,8.47,0,0,0,8.83,1.94,1,1,0,0,1,1.27,1.29A10.16,10.16,0,0,1,19.6,19,10.28,10.28,0,0,1,12.3,22Z"/></svg>
          </button>
          <button id="exit-ico" className="sidebar-icon" onClick={onLogout} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/><path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/></svg></button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;