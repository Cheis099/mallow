import { validateForm } from './validation.js';
import { loginUser, registerUser, getCurrentUser, logoutUser } from './auth.js';
import { renderProductList } from './products.js';

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