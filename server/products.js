import { products } from './mockDB.js';

export function loadProducts() {
  return products;
}

export function renderProductCard(product) {
    return `
      <div class="card" data-id="${product.id}">
          <div class="wrapper">
              <img src="${product.image}" alt="${product.name}">
              <div class="card-txt">
                   <h3>${product.name}</h3>
                   <p class="price">${product.price} р.</p>
                   <button class="btn btn-cocoa">Посмотреть поближе</button>
              </div>
          </div>
      </div>
    `;
  }

export function renderProductList(container) {
  const products = loadProducts();
  container.innerHTML = products.map(renderProductCard).join('');
  container.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      const productId = card.dataset.id;
      window.location.href = `product.html?id=${productId}`;
    });
  });
}