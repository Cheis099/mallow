export function validateEmail(email) {
    const re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!email || !re.test(email)) return 'Введите корректный email';
    return null;
  }
  
  export function validatePassword(password) {
    if (!password || password.length < 6) return 'Пароль должен быть не менее 6 символов';
    return null;
  }
  
  export function validateForm(email, password) {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    return { emailError, passwordError, isValid: !emailError && !passwordError };
  }