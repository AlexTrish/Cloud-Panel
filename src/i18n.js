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
        "loginPlaceholder": "LOGIN",
        "passwordPlaceholder": "PASSWORD",
        "noAccount": "Don't have an account? Register",
        "forgotPassword": "Forgot password? Reset",
        "loginBtn": "Log in",
        "registerTitle": "Registration",
        "createAccount": "Create a new account",
        "usernamePlaceholder": "Username",
        "passwordMismatch": "Passwords do not match!",
        "alreadyHaveAccount": "Already have an account? Log in",
        "registerBtn": "Register",
        "passwordResetTitle": "Password Recovery",
        "enterEmail": "Enter your email for password recovery",
        "submitRequest": "Send request",
        "backToAuth": "Back to Auth",
        "error": "Error",
        "connectionError": "Connection error.",





        // userprofile
        "profileSettings": "Profile Settings",
        "newPassword": "New Password",
        "confirmPassword": "Confirm Password",
        "cancel": "Cancel",
        "saveChanges": "Save Changes",
        "language": "Language",



        //Dashboard
      }
    },
    ru: {
      translation: {

        // auth
        "authTitle": "Авторизация",
        "pleaseLogin": "Пожалуйста, авторизуйтесь!",
        "loginPlaceholder": "LOGIN",
        "passwordPlaceholder": "PASSWORD",
        "noAccount": "Если у вас нет аккаунта. Зарегистрироваться?",
        "forgotPassword": "Забыли пароль? Восстановить пароль",
        "loginBtn": "Войти",
        "registerTitle": "Регистрация",
        "createAccount": "Создайте новый аккаунт",
        "usernamePlaceholder": "Username",
        "passwordMismatch": "Пароли не совпадают!",
        "alreadyHaveAccount": "Уже есть аккаунт? Войти",
        "registerBtn": "Зарегистрироваться",
        "passwordResetTitle": "Восстановление пароля",
        "enterEmail": "Введите ваш email для восстановления пароля",
        "submitRequest": "Отправить запрос",
        "backToAuth": "Назад к авторизации",
        "error": "Ошибка",
        "connectionError": "Ошибка соединения с сервером.",



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
        "MonoAddSite": "Одиночное добавление сайта",
        "MultiAddSite": "Массовр=ое добавление сайтов",
        
      }
    }
  },
  lng: 'ru', // начальный язык
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;
