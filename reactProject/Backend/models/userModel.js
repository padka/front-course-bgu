const { Pool } = require('pg');
const bcrypt = require('bcrypt');
require('dotenv').config();
const dbConfig = require('../conf/dbConfig');
const pool = new Pool(dbConfig);

// Валидация данных пользователя
const validateUserData = (username, password, email) => {
  const errors = [];
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("Электронная почта должна быть действительной.");
  if (!(username.length > 4 && username.length < 21)) errors.push("Имя пользователя должно быть от 5 до 20 символов.");
  if (!(password.length >= 8)) errors.push("Пароль должен содержать не менее 8 символов.");
  return errors.length ? errors : null;
};

// Функция для выполнения SQL-запросов
async function executeQuery(query, params = []) {
  const client = await pool.connect();
  try {
    const { rows } = await client.query(query, params);
    return rows;
  } catch (error) {
    console.error(`Ошибка при выполнении запроса к базе данных: ${error.message}`);
    throw error;
  } finally {
    client.release();
  }
}

/// Для функции регистрации пользователя:
async function registerUser(username, password, email) {
  const errors = validateUserData(username, password, email);
  if (errors) {
    // Собираем ошибки в одну строку, разделяя точкой с новой строки.
    throw new Error(errors.join(". "));
  }

  // Проверка существования пользователя
  const existingUser = await executeQuery('SELECT id FROM users WHERE username = $1 OR email = $2', [username, email]);
  if (existingUser.length > 0) {
    throw new Error('Пользователь с таким именем или электронной почтой уже существует. Пожалуйста, выберите другое имя или используйте другой email.');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const defaultRole = 'user';
  const newUser = await executeQuery(
      'INSERT INTO users (username, password_hash, email, role) VALUES ($1, $2, $3, $4) RETURNING id, username, email, role',
      [username, passwordHash, email, defaultRole]
  );

  if (!newUser) {
    throw new Error('Не удалось зарегистрировать пользователя. Попробуйте еще раз.');
  }

  return newUser[0];
}

// Для функции аутентификации пользователя:
async function authenticateUser(username, password) {
  const users = await executeQuery('SELECT * FROM users WHERE username = $1', [username]);
  const user = users[0];

  if (!user) {
    throw new Error('Пользователь не найден. Проверьте имя пользователя и попробуйте снова.');
  }

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) {
    throw new Error('Неправильный пароль. Попробуйте снова или воспользуйтесь функцией сброса пароля.');
  }

  const { password_hash, ...userInfo } = user;
  return userInfo;
}


module.exports = {
  registerUser,
  authenticateUser,
};
