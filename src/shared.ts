
interface Product {
    id?: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
}

async function fetchItems(): Promise<Product[]> {
    const response = await fetch("http://localhost:3000/products");
    return await response.json();
}

function displayItems(products: Product[], containerSelector: string): void {
    const container = document.querySelector(containerSelector) as HTMLElement;
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

