// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {

        // auth
        "authTitle": "Authentication",
        "pleaseLogin": "Please log in!",
        "loginPlaceholder": "Login",
        "passwordPlaceholder": "Password",
        "noAccount": "Don't have an account?",
        "forgotPassword": "Forgot password?",
        "loginBtn": "Log in",
        "registerTitle": "Registration",
        "createAccount": "Create a new account",
        "usernamePlaceholder": "Username",
        "passwordMismatch": "Passwords do not match!",
        "alreadyHaveAccount": "Already have an account?",
        "registerBtn": "Register",
        "passwordResetTitle": "Password Recovery",
        "enterEmail": "Enter your email for password recovery",
        "submitRequest": "Send request",
        "backToAuth": "Back to Auth",
        "error": "Error",
        "connectionError": "Connection error.",
        "passwordRecoveryTitle": "Password Recovery",
        "enterEmailForRecovery": "Enter your email for password recovery",
        "sendRequest": "Send request",





        // userprofile
        "profileSettings": "Profile Settings",
        "newPassword": "New Password",
        "confirmPassword": "Confirm Password",
        "cancel": "Cancel",
        "saveChanges": "Save Changes",
        "language": "Language",



        //Dashboard
        "siteList": "Site list",
        "subDomain": "Subdomain",
        "domain": "Domain",
        "ip": "IP address",
        "actions": "actions",
        "MonoAddSite": "Site addition",
        "MultiAddSite": "Multiple site addition",
        "unavailable": "Temporarily unavailable",


        //modal
        "addSiteTitle": "Add Site",
        "addAnotherSite": "Add another site",
        "removeSite": "Remove site",
        "site": "Site",
        "close": "Close",
        "save": "Save",
        

        //sidebar
        "home-btn": "Home",
        "net-btn": "",
        "serv-btn": "Site list",
        "stat-btn": "",
        "lang-btn": "Change language",
        "theme-btn": "Change theme",
        "exit-btn": "Exit",
      }
    },
    ru: {
      translation: {

        // auth
        "authTitle": "Авторизация",
        "pleaseLogin": "Пожалуйста, авторизуйтесь!",
        "loginPlaceholder": "Логин",
        "passwordPlaceholder": "Пароль",
        "noAccount": "Если у вас нет аккаунта?",
        "forgotPassword": "Забыли пароль?",
        "loginBtn": "Войти",
        "registerTitle": "Регистрация",
        "createAccount": "Создайте новый аккаунт",
        "usernamePlaceholder": "Логин",
        "passwordMismatch": "Пароли не совпадают!",
        "alreadyHaveAccount": "Уже есть аккаунт?",
        "registerBtn": "Зарегистрироваться",
        "passwordResetTitle": "Восстановление пароля",
        "enterEmail": "Введите ваш email для восстановления пароля",
        "submitRequest": "Отправить запрос",
        "backToAuth": "Назад к авторизации",
        "error": "Ошибка",
        "connectionError": "Ошибка соединения с сервером.",
        "passwordRecoveryTitle": "Восстановление пароля",
        "enterEmailForRecovery": "Введите ваш email для восстановления пароля",
        "sendRequest": "Отправить запрос",



        // userprofile
        "profileSettings": "Настройки профиля",
        "newPassword": "Новый пароль",
        "confirmPassword": "Подтвердите пароль",
        "cancel": "Отмена",
        "saveChanges": "Сохранить изменения",
        "language": "Язык",



        //Dashboard
        "siteList": "Список Сайтов",
        "subDomain": "Поддомен",
        "domain": "Домен",
        "ip": "IP адрес",
        "actions": "Действия",
        "MonoAddSite": "Добавить сайт",
        "MultiAddSite": "Массовое добавление сайтов",
        "unavailable": "Временно недоступно",


        //modal
        "addSiteTitle": "Добавить сайт",
        "addAnotherSite": "Ещё",
        "removeSite": "Удалить сайт",
        "close": "Закрыть",
        "save": "Сохранить",
        "site": "Сайт",


        //sidebar
        "home-btn": "Домой",
        "net-btn": "",
        "serv-btn": "Список сайтов",
        "stat-btn": "",
        "lang-btn": "Сменить язык",
        "theme-btn": "Сменить тему",
        "exit-btn": "Выйти",
      }
    }
  },
  lng: 'ru', // начальный язык
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;
