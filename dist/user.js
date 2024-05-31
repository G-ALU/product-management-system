"use strict";
function displayproducts(products) {
    const activities = document.querySelector('.useroutput');
    activities.innerHTML = '';
    products.forEach((product) => {
        const productItem1 = document.createElement('div');
        productItem1.classList.add('useroutput1');
        productItem1.innerHTML = `
            <ion-icon name="${product.category}"></ion-icon>
            <p>${product.name}</p>
        `;
        activities.appendChild(productItem1);
    });
    document.querySelectorAll('.update1').forEach(button => {
        button.addEventListener('click', handleAction);
    });
}
