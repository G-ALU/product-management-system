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
function fetchItems() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:3000/products");
        return yield response.json();
    });
}
function displayItems(products, containerSelector) {
    const container = document.querySelector(containerSelector);
    container.innerHTML = '';
    products.forEach((product) => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <p><strong>Name:</strong> ${product.name}</p>
            <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
            <p><strong>Description:</strong> ${product.description}</p><br>
        `;
        container.appendChild(productItem);
    });
}
