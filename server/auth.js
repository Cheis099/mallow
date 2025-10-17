export async function loginUser(email, password) {
  const url = "/api/data";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Ошибка от сервера: ${response.status}`);
    }
    const data = await response.json();
    const users = data.users;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      return { success: true, user };
    } else {
      return { success: false, error: 'Неверный email или пароль' };
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Произошла ошибка, попробуйте снова' };
  }
}

export function logoutUser() {
  localStorage.removeItem('currentUser');
}

export function getCurrentUser() {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
}