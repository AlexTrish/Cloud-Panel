import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // Для работы с cookies
import Sidebar from './components/js/Sidebar';
import Dashboard from './components/js/Dashboard';
import './components/css/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import passwordIco from './components/img/password.svg';
import loginIco from './components/img/login.svg';

// Основной компонент приложения
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); //для входа поставить 'true', для работы авторизации 'false'
  const [isRegistering, setIsRegistering] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  useEffect(() => {
    const token = Cookies.get('jwtToken');
    if (token) {
      setIsAuthenticated(true); // Если токен есть, пользователь аутентифицирован
    } else {
      setIsRegistering(false); // Если токена нет, переключаем на окно авторизации
    }
  }, []);

  // Функция для входа
  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const loginData = {
      username: formData.get('login'),
      password: formData.get('password')
    };

    try {
      const response = await fetch('https://your-api-url.com/login', { // Укажите ваш API URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
      });

      if (response.ok) {
        const { token } = await response.json();
        Cookies.set('jwtToken', token, { expires: 7 });
        setIsAuthenticated(true);
      } else {
        alert('Ошибка при входе. Проверьте ваши учетные данные.');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка соединения с сервером.');
    }
  };

  // Функция для выхода
  const handleLogout = () => {
    Cookies.remove('jwtToken');
    setIsAuthenticated(false);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const registrationData = {
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password')
    };

    try {
      const response = await fetch('', { // Нужно указать API URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData)
      });

      if (response.ok) {
        const { token } = await response.json();
        Cookies.set('jwtToken', token, { expires: 7 });
        setIsAuthenticated(true);
      } else {
        alert('Ошибка при регистрации.');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка соединения с сервером.');
    }
  };

  const handlePasswordResetRequest = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');

    try {
      const response = await fetch('', { // Нужно указать API URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        alert('Запрос на восстановление пароля отправлен. Проверьте вашу почту.');
        setIsResettingPassword(false);
      } else {
        alert('Ошибка при отправке запроса на восстановление пароля.');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка соединения с сервером.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPassword = formData.get('newPassword');
    const confirmNewPassword = formData.get('confirmNewPassword');

    if (newPassword !== confirmNewPassword) {
      alert('Пароли не совпадают!');
      return;
    }

    try {
      const response = await fetch('', { // Нужно указать API URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword })
      });

      if (response.ok) {
        alert('Пароль успешно изменен!');
        setIsResettingPassword(false);
      } else {
        alert('Ошибка при изменении пароля.');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка соединения с сервером.');
    }
  };

  const toggleRegistration = () => {
    setIsRegistering(!isRegistering);
  };

  const togglePasswordReset = () => {
    setIsResettingPassword(!isResettingPassword);
  };

  return (
    <div>
      {isAuthenticated ? (
        <MainWindow onLogout={handleLogout} />
      ) : isResettingPassword ? (
        <PasswordResetWindow onResetPassword={handlePasswordResetRequest} />
      ) : isRegistering ? (
        <RegistrationWindow onRegister={handleRegister} onToggle={toggleRegistration} />
      ) : (
        <LoginWindow onLogin={handleLogin} onToggle={toggleRegistration} onPasswordReset={togglePasswordReset} />
      )}
    </div>
  );
};

// Компонент окна авторизации
const LoginWindow = ({ onLogin, onToggle, onPasswordReset }) => {
  return (
    <div className="body-container">
      <div className="container-wrapper">
        <div className="auth-container">
          <h1>Авторизация</h1>
          <form onSubmit={onLogin}>
            <span>Пожалуйста, авторизуйтесь!</span>
            <div className="form-group">
              <img src={loginIco} alt="" />
              <input type="text" className="form-control" id="login" name="login" placeholder="LOGIN" required />
            </div>
            <div className="form-group">
              <img src={passwordIco} alt="" />
              <input type="password" className="form-control" id="password" name="password" placeholder="PASSWORD" required />
            </div>
            <span className="sign-in-text">
              Если у вас нет аккаунта. <a className="sign-in-link" href="#" onClick={onToggle}>Зарегистрироваться?</a>
            </span>
            <span className="password-reset-text">
              Забыли пароль? <a className="password-reset-link" href="#" onClick={onPasswordReset}>Восстановить пароль</a>
            </span>
            <button type="submit" className="btn btn-primary">Войти</button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Компонент окна регистрации
const RegistrationWindow = ({ onRegister, onToggle }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Пароли не совпадают!');
    } else {
      setError('');
      onRegister(e);
    }
  };

  return (
    <div className="body-container">
      <div className="container-wrapper reg">
        <div className="auth-container">
          <h1>Регистрация</h1>
          <form onSubmit={handleSubmit}>
            <span>Создайте новый аккаунт</span>
            <div className="form-group">
              <input type="text" className="form-control" id="username" name="username" placeholder="Username" required />
            </div>
            <div className="form-group">
              <input type="email" className="form-control" id="email" name="email" placeholder="Email" required />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>} {}
            <span className="sign-in-text">
              Уже есть аккаунт? <a className="sign-in-link" href="#" onClick={onToggle}>Войти</a>
            </span>
            <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Компонент окна восстановления пароля
const PasswordResetWindow = ({ onResetPassword }) => {
  return (
    <div className="body-container">
      <div className="container-wrapper">
        <div className="auth-container">
          <h1>Восстановление пароля</h1>
          <form onSubmit={onResetPassword}>
            <span>Введите ваш email для восстановления пароля</span>
            <div className="form-group">
              <input type="email" className="form-control" id="email" name="email" placeholder="Email" required />
            </div>
            <button type="submit" className="btn btn-primary">Отправить запрос</button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Компонент главного окна
const MainWindow = ({ onLogout }) => {
  return (
    <div className="background-container">
      <div className="app-container">
        <div className="header">
          <div className='logo'></div>
          <div className='logo-title'>&#x3C;Cloud Panel/&#x3E;</div>
        </div>
        <div className="sidebar-block">
          <Sidebar onLogout={onLogout} />
        </div>
        <div className="content-block">
          <Dashboard />
        </div>
        <div className="view-block">
          <div className='view-block-wrapper'>
            <div className='block-wrapper-cd'>
              <div className='green-card-one'></div>
              <div className='green-card-two'></div>
            </div>
            <div className='green-card-three'></div>
          </div>
          <div className='green-card-four'></div>
        </div>
      </div>
    </div>
  );
};

export default App;