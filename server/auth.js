import { users } from './mockDB.js';

export function loginUser(email, password) {
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    return { success: true, user };
  }
  return { success: false, error: 'Неверный email или пароль' };
}

export function registerUser(email, password, name) {
  if (users.find(u => u.email === email)) {
    return { success: false, error: 'Пользователь с таким email уже существует' };
  }
  const newUser = { id: users.length + 1, email, password, name };
  users.push(newUser);
  return { success: true, user: newUser };
}

export function logoutUser() {
  localStorage.removeItem('currentUser');
}

export function getCurrentUser() {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
}