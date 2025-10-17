let allUsers = [];
let allProducts = [];
let currentlyEditingProductId = null;
let currentlyEditingUserId = null;
const usersTableContainer = document.getElementById('users-table-container');
const productsTableContainer = document.getElementById('products-table-container');
const addUserForm = document.getElementById('add-user-form');
const addProductForm = document.getElementById('add-product-form');
const productFormTitle = addProductForm.querySelector('h3');
const productFormButton = addProductForm.querySelector('button[type="submit"]');
const userFormTitle = document.getElementById('user-form-title');
const userFormButton = addUserForm.querySelector('button[type="submit"]');
const passwordFieldContainer = document.getElementById('password-field-container');

function renderUsersTable() {
    let html = `
        <table border="1" cellpadding="5" cellspacing="0">
            <thead>
                <tr><th>ID</th><th>Имя</th><th>Email</th><th>Действия</th></tr>
            </thead>
            <tbody>`;
    allUsers.forEach(user => {
        html += `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td><button class="delete-user-btn" data-id="${user.id}">Удалить</button></td>
            </tr>`;
    });
    html += `</tbody></table>`;
    usersTableContainer.innerHTML = html;
}

function renderProductsTable() {
    let html = `
        <table border="1" cellpadding="5" cellspacing="0">
            <thead>
                <tr><th>ID</th><th>Название</th><th>Цена</th><th>Действия</th></tr>
            </thead>
            <tbody>`;
    allProducts.forEach(product => {
        html += `
            <tr>
                <td>${product.id}</td>
                <td>${product.name}</td>
                <td>${product.price} ₽</td>
                <td>
                    <button class="edit-product-btn" data-id="${product.id}">Редактировать</button>
                    <button class="delete-product-btn" data-id="${product.id}">Удалить</button>
                </td>
            </tr> `;
    });
    html += `</tbody></table>`;
    productsTableContainer.innerHTML = html;
}

async function loadData() {
    try {
        const response = await fetch('/api/data');
        if (!response.ok) {
            throw new Error(`Ошибка от сервера: ${response.status}`); }
        const data = await response.json();
        allUsers = data.users;
        allProducts = data.products;
        renderUsersTable();
        renderProductsTable();
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
        usersTableContainer.innerHTML = "<p>Не удалось загрузить данные.</p>";
        productsTableContainer.innerHTML = "<p>Не удалось загрузить данные.</p>";
    }
}

addUserForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
        let response;
        if (currentlyEditingUserId !== null) {
            const userData = {
                name: document.getElementById('user-name').value,
                email: document.getElementById('user-email').value,
                role: document.getElementById('user-role').value,
            };
            response = await fetch(`/api/users/${currentlyEditingUserId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
        } else {
            const newUser = {
                name: document.getElementById('user-name').value,
                email: document.getElementById('user-email').value,
                password: document.getElementById('user-password').value,
                role: document.getElementById('user-role').value || 'user'
            };
            response = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser)
            });
        }
        if (!response.ok) {
            throw new Error('Ошибка при сохранении пользователя');
        }
        await loadData();
        resetUserForm();
    } catch (error) {
        console.error('Не удалось сохранить пользователя:', error);
    }
});

addProductForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const productData = {
        name: document.getElementById('product-name').value,
        price: parseInt(document.getElementById('product-price').value),
        image: document.getElementById('product-image').value,
        description: document.getElementById('product-description').value,
        details: {
            material: document.getElementById('product-material').value,
            volume: document.getElementById('product-volume').value,
            care: document.getElementById('product-care').value
        }
    };
    try {
        let response;
        if (currentlyEditingProductId !== null) {
            response = await fetch(`/api/products/${currentlyEditingProductId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });
        } else {
            response = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });
        }
        if (!response.ok) {
            throw new Error('Ошибка при сохранении товара');
        }
        await loadData();
        resetProductForm();
    } catch (error) {
        console.error('Не удалось сохранить товар:', error);
    }
});

document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-user-btn')) {
        const userIdToDelete = parseInt(event.target.dataset.id);
        if (confirm('Вы уверены?')) {
            try {
                const response = await fetch(`/api/users/${userIdToDelete}`, {
                    method: 'DELETE'
                });
                if (!response.ok) {
                    throw new Error('Ошибка при удалении пользователя');
                }
                console.log('Пользователь удален успешно');
                await loadData();
            } catch (error) {
                console.error('Не удалось удалить пользователя:', error);
            }
        }
    }
        if (event.target.classList.contains('edit-user-btn')) {
        const userIdToEdit = parseInt(event.target.dataset.id);
        const user = allUsers.find(u => u.id === userIdToEdit);
        if (user) {
            document.getElementById('user-name').value = user.name;
            document.getElementById('user-email').value = user.email;
            document.getElementById('user-role').value = user.role;
            currentlyEditingUserId = user.id;
            userFormTitle.innerText = `Редактирование: ${user.name}`;
            userFormButton.innerText = 'Сохранить изменения';
            passwordFieldContainer.style.display = 'none';
            document.getElementById('user-password').required = false;
        }
    }
    if (event.target.classList.contains('delete-product-btn')) {
        const productIdToDelete = parseInt(event.target.dataset.id);
        if (confirm('Вы уверены?')) {
            try {
                const response = await fetch(`/api/products/${productIdToDelete}`, {
                    method: 'DELETE'
                });
                if (!response.ok) {
                    throw new Error('Ошибка при удалении товара');
                }
                await loadData();
            } catch (error) {
                console.error('Не удалось удалить товар:', error);
            }
        }
    }
    if (event.target.classList.contains('edit-product-btn')) {
        const productIdToEdit = parseInt(event.target.dataset.id);
        const product = allProducts.find(p => p.id === productIdToEdit);
        if (product) {
            document.getElementById('product-name').value = product.name;
            document.getElementById('product-price').value = product.price;
            document.getElementById('product-image').value = product.image;
            document.getElementById('product-description').value = product.description;
            document.getElementById('product-material').value = product.details.material;
            document.getElementById('product-volume').value = product.details.volume;
            document.getElementById('product-care').value = product.details.care;
            currentlyEditingProductId = product.id;
            productFormTitle.innerText = `Редактирование: ${product.name}`;
            productFormButton.innerText = 'Сохранить изменения';
        }
    }
});

function resetProductForm() {
    addProductForm.reset();
    currentlyEditingProductId = null;
    productFormTitle.innerText = 'Добавить новый товар';
    productFormButton.innerText = 'Добавить товар';
}

function resetUserForm() {
    addUserForm.reset();
    currentlyEditingUserId = null;
    userFormTitle.innerText = 'Добавить нового пользователя';
    userFormButton.innerText = 'Добавить пользователя';
    passwordFieldContainer.style.display = 'block';
    document.getElementById('user-password').required = true;
}

loadData();