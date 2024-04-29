import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundpage.css'; // Убедитесь, что путь к CSS файлу корректен

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <p>Извините, запрашиваемая вами страница не существует.</p>
      <Link to="/" className="not-found-link">Вернуться на главную страницу</Link>
    </div>
  );
};

export default NotFoundPage;
