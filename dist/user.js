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
function fetchProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://localhost:3000/products");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            return data;
        }
        catch (error) {
            console.error("Failed to fetch products:", error);
            return [];
        }
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
            <button id="add-to-cart-${product.id}">Add to Cart <ion-icon name="cart" style="color: white;"></ion-icon></button>
        `;
        activities.appendChild(productItem);
        const addToCartButton = productItem.querySelector(`#add-to-cart-${product.id}`);
        addToCartButton.addEventListener('click', () => addToCart(product));
    });
}
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push({
        name: product.name,
        price: product.price,
        description: product.description,
        imageUrl: product.imageUrl
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} has been added to the cart!`);
}
function getCartItems() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield fetchProducts();
        console.log(products);
        displayProducts(products);
    });
}
init();
