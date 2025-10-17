import { validateForm } from './validation.js';
import { loginUser, registerUser, getCurrentUser, logoutUser } from './auth.js';

if (document.querySelector('.container')) {
    const form = document.querySelector('form');
    const emailInput = document.querySelector('#email');
    const passwordInput = document.querySelector('#password');
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const { isValid, emailError, passwordError } = validateForm(emailInput.value, passwordInput.value);
  
      if (!isValid) {
        alert(`${emailError || ''} ${passwordError || ''}`);
        return;
      }
  
      const result = await loginUser(emailInput.value, passwordInput.value);
      if (result.success) {
        window.location.href = 'index.html';
      } else {
        alert(result.error);
      }
    });
  }