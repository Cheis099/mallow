import { validateForm } from './validation.js';
import { loginUser, registerUser, getCurrentUser, logoutUser } from './auth.js';
import { renderProductList } from './products.js';

const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const { isValid, emailError, passwordError } = validateForm(emailInput.value, passwordInput.value);
        if (!isValid) {
            alert(`${emailError || ''} ${passwordError || ''}`);
            return;
        }
        const result = await loginUser(emailInput.value, passwordInput.value);
        if (result.success) {
            localStorage.setItem('currentUser', JSON.stringify(result.user));
            window.location.href = 'index.html';
        } else {
            alert(result.error);
        }
    });
}

const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const { isValid, emailError, passwordError } = validateForm(emailInput.value, passwordInput.value);
        if (!isValid) {
            alert(`${emailError || ''} ${passwordError || ''}`);
            return;
        }
        const result = await registerUser(emailInput.value, passwordInput.value, nameInput.value); 
        if (result.success) {
            localStorage.setItem('currentUser', JSON.stringify(result.user));
            window.location.href = 'index.html';
        } else {
            alert(result.error);
        }
    });
}

  if (document.querySelector('.cards')) {
    const container = document.querySelector('.cards');
    renderProductList(container);
  }

  if (document.querySelector('.details')) {
    (async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get('id');
      if (productId) {
        const url = "/api/data";
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Ошибка от сервера: ${response.status}`);
          }
          const data = await response.json();
          const products = data.products;
          const product = products.find(p => p.id == productId);  
          if (product) {
            document.title = `${product.name} | Mallow`;
            document.querySelector('.main-img img').src = product.image;
            document.querySelector('.details h1').textContent = product.name;
            document.querySelector('.details .desc').textContent = product.description;
            document.querySelector('.details .price').textContent = `${product.price} р.`;
            const detailsList = document.querySelector('.details-list');
            detailsList.innerHTML = 
            `<li><strong>Материал:</strong> ${product.details.material}</li>
            <li><strong>Объем:</strong> ${product.details.volume}</li>
            <li><strong>Уход:</strong> ${product.details.care}</li>`;
          } else {
            console.error("Товар не найден");
            document.querySelector('.details h1').textContent = "Товар не найден :(";
          }
        } catch (error) {
          console.error("Ошибка при загрузке данных о товаре:", error);
        }
      }
    })();
  }

document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('menu-icon');
    const dropdownMenu = document.getElementById('dropdown-menu');
    if (!menuIcon) return;
    const currentUser = getCurrentUser();
    if (currentUser) {
        if (currentUser.role === 'admin') {
            dropdownMenu.innerHTML = `
                <li><a href="/admin.html">Админка</a></li>
                <li><a href="#" id="logout-btn">Выйти</a></li>
            `;
        } else {
            dropdownMenu.innerHTML = `
                <li><a href="#" id="logout-btn">Выйти</a></li>
            `;
        }
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (event) => {
                event.preventDefault();
                logoutUser();
                window.location.href = '/login.html';
            });
        }
    } else {
        dropdownMenu.innerHTML = `
            <li><a href="/login.html" id="login-btn">Войти</a></li>
        `;
    }
    menuIcon.addEventListener('click', (event) => {
        event.preventDefault();
        dropdownMenu.classList.toggle('show');
    });
});

window.onclick = function(event) {
    if (!event.target.closest('.menu-container')) {
        const dropdowns = document.getElementsByClassName("dropdown-menu");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}