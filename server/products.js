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

export async function renderProductList(container) {
  const url = "/api/data";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Ошибка от сервера: ${response.status}`);
    }
    const data = await response.json();
    const products = data.products;
    container.innerHTML = products.map(renderProductCard).join('');
    container.querySelectorAll('.card').forEach(card => {
      card.addEventListener('click', () => {
          const productId = card.dataset.id;
          window.location.href = `product.html?id=${productId}`;
      });
  });
  } catch (error) {
    console.error(error);
  }
}