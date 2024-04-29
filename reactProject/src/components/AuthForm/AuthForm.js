import React, { useState } from 'react';
import { useAuth } from '../AuthContext/AuthContext';
import './AuthForm.css'; // Проверьте правильность пути к файлу стилей

const AuthForm = () => {
  const [formType, setFormType] = useState('login');
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    email: '',
    newPassword: ''
  });
  const { login, register, isLoading, error } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prevCredentials => ({ ...prevCredentials, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLoading) return;

    try {
      switch (formType) {
        case 'login':
          await login(credentials.username, credentials.password);
          break;
        case 'register':
          await register(credentials.username, credentials.password, credentials.email);
          alert('Вы успешно зарегистрированы на сайте!');
          break;
        case 'reset':
          // Реализация логики сброса пароля
          break;
        default:
          break;
      }
    } catch (error) {
      alert(`Произошла ошибка: ${error.message}`);
    }
  };

  return (
      <div className="auth-form-wrapper">
        <div className="auth-form-container">
          <h2 className="auth-form-title">
            {formType === 'login' ? 'Вход в систему' : formType === 'register' ? 'Регистрация' : 'Сброс пароля'}
          </h2>
          <form onSubmit={handleSubmit}>
            {formType === 'register' && (
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                      type="email"
                      id="email"
                      name="email"
                      value={credentials.email}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                  />
                </div>
            )}
            <div className="form-group">
              <label htmlFor="username">Имя пользователя</label>
              <input
                  type="text"
                  id="username"
                  name="username"
                  value={credentials.username}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Пароль</label>
              <input
                  type="password"
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
              />
            </div>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            <button type="submit" className="auth-form-button">
              {isLoading ? 'Загрузка...' : formType === 'login' ? 'Войти' : 'Зарегистрироваться'}
            </button>
            <div className="auth-form-options">
              <button type="button" onClick={() => setFormType('register')} disabled={formType === 'register'}>
                Зарегистрироваться
              </button>

            </div>
          </form>
        </div>
      </div>
  );
};

export default AuthForm;
