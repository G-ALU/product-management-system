"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c;
function fetchProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:3000/products");
        return yield response.json();
    });
}
function fetchProductById(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:3000/products/${productId}`);
        return yield response.json();
    });
}
function displayProducts(products) {
    const activities = document.querySelector('.activities');
    activities.innerHTML = '';
    products.forEach((product) => {
        const productItem = document.createElement('div');
        productItem.classList.add('activities1');
        productItem.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <p><strong>Name:</strong> ${product.name}</p>
            <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
            <p><strong>Description:</strong> ${product.description}</p><br>
            <button class="update1" id="update111" data-id="${product.id}" data-action="update">Update</button><br>
            <button class="update1" id="delete111" data-id="${product.id}" data-action="delete">Delete</button>
        `;
        activities.appendChild(productItem);
    });
    document.querySelectorAll('.update1').forEach(button => {
        button.addEventListener('click', handleAction);
    });
}
function handleAction(event) {
    return __awaiter(this, void 0, void 0, function* () {
        const button = event.target;
        const productId = button.getAttribute('data-id');
        const action = button.getAttribute('data-action');
        if (action === 'update') {
            showUpdateForm(productId);
        }
        else if (action === 'delete') {
            yield deleteProduct(productId);
            const products = yield fetchProducts();
            displayProducts(products);
        }
    });
}
function showUpdateForm(productId) {
    const form = document.getElementById('update-form');
    form.style.display = 'block';
    form.onsubmit = (event) => __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        yield updateProduct(productId);
        form.style.display = 'none';
        const products = yield fetchProducts();
        displayProducts(products);
    });
}
function updateProduct(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        const productInput = document.getElementById('update-text');
        const priceInput = document.getElementById('update-price');
        const descriptionInput = document.getElementById('update-description');
        const imageInput = document.getElementById('update-image');
        const updatedProduct = {
            name: productInput.value,
            price: parseFloat(priceInput.value),
            description: descriptionInput.value,
            imageUrl: imageInput.value
        };
        yield fetch(`http://localhost:3000/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        });
    });
}
function deleteProduct(productId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetch(`http://localhost:3000/products/${productId}`, {
            method: 'DELETE',
        });
    });
}
function handleSubmit(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const productInput = document.getElementById('text1');
        const priceInput = document.getElementById('price');
        const descriptionInput = document.getElementById('description');
        const imageInput = document.getElementById('image-url');
        const newProduct = {
            name: productInput.value,
            price: parseFloat(priceInput.value),
            description: descriptionInput.value,
            imageUrl: imageInput.value,
        };
        yield fetch("http://localhost:3000/products", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });
        const products = yield fetchProducts();
        displayProducts(products);
    });
}
(_a = document.getElementById('mySubmit')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', handleSubmit);
(_b = document.getElementById('viewOne')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    const criteria = prompt("Enter the product name:");
    const products = yield fetchProducts();
    const filteredProducts = products.filter(product => product.name.includes(criteria));
    if (filteredProducts.length > 0) {
        displayProducts([filteredProducts[0]]);
    }
    else {
        alert('No product found with the given criteria.');
    }
}));
(_c = document.getElementById('viewAll')) === null || _c === void 0 ? void 0 : _c.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield fetchProducts();
    displayProducts(products);
}));
fetchProducts().then(displayProducts);
