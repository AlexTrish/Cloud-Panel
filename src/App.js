import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import UserProfile from './components/js/UserProfile';
import Sidebar from './components/js/Sidebar';
import Dashboard from './components/js/Dashboard';
import './components/css/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import passwordIco from './components/img/password.svg';
import loginIco from './components/img/login.svg';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:3000/ws');

    websocket.onopen = () => {
      console.log('WebSocket соединение установлено');
    };

    websocket.onmessage = (event) => {
      const newMessage = event.data;
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    websocket.onclose = () => {
      console.log('WebSocket соединение закрыто');
    };

    websocket.onerror = (error) => {
      console.error('Ошибка WebSocket:', error);
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, []);

  // Функция для отправки сообщения через WebSocket
  const sendMessage = (message) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(message);
    } else {
      console.error('WebSocket не подключен');
    }
  };


  useEffect(() => {
    const token = Cookies.get('jwtToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Функция для входа
  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const loginData = {
      username: formData.get('login'),
      password: formData.get('password'),
    };

    try {
      const response = await fetch('http://46.8.64.99:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
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

  // Функция для регистрации
  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const registrationData = {
      username: formData.get('username'),
      password: formData.get('password'),
    };

    try {
      const response = await fetch('http://46.8.64.99:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
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

  // Функция для выхода
  const handleLogout = () => {
    Cookies.remove('jwtToken');
    setIsAuthenticated(false);
  };

  const toggleRegistration = () => {
    setIsRegistering(!isRegistering);
  };

  const togglePasswordReset = () => {
    setIsResettingPassword(!isResettingPassword);
  };

  const handleBackToAuth = () => {
    setIsResettingPassword(false);
  };

  return (
    <div>
      {isAuthenticated ? (
        <MainWindow onLogout={handleLogout} />
      ) : isResettingPassword ? (
        <PasswordResetWindow onBackToAuth={handleBackToAuth} />
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
            {error && <p style={{ color: 'red' }}>{error}</p>}
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
const PasswordResetWindow = ({ onBackToAuth }) => {
  return (
    <div className="body-container">
      <div className="container-wrapper">
        <div className="auth-container">
          <h1>Восстановление пароля</h1>
          <form>
            <span>Введите ваш email для восстановления пароля</span>
            <div className="form-group">
              <input type="email" className="form-control" id="email" name="email" placeholder="Email" required />
            </div>
            <button type="submit" className="btn btn-primary">Отправить запрос</button>
          </form>
          <button id='go-auth-btn' className="btn btn-secondary" onClick={onBackToAuth}><svg width="15" height="15" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M3.05724 17.8189C-1.01908 13.7426 -1.01908 7.13357 3.05724 3.05725C7.13355 -1.01906 13.7426 -1.01906 17.8189 3.05725L96.3076 81.5459C100.384 85.6222 100.384 92.2313 96.3076 96.3076C92.2312 100.384 85.6222 100.384 81.5459 96.3076L3.05724 17.8189Z"/><path d="M17.8189 96.3076C13.7426 100.384 7.13357 100.384 3.05725 96.3076C-1.01906 92.2312 -1.01906 85.6222 3.05725 81.5459L81.5459 3.05724C85.6222 -1.01908 92.2313 -1.01908 96.3076 3.05724C100.384 7.13355 100.384 13.7426 96.3076 17.8189L17.8189 96.3076Z"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Компонент главного окна с Dashboard и Sidebar
const MainWindow = ({ onLogout }) => {
  return (
    <div className="background-container">
      <div className="app-container">
        <div className="header">
          <div className='logo'></div>
          <div className='logo-title'>&#x3C;Cloud Panel/&#x3E;</div>
        </div>
        <div className='profile-container'>
         <UserProfile />
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