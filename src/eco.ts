interface Product {
    id?: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
}

async function fetchProducts(): Promise<Product[]> {
    const response = await fetch("http://localhost:3000/products");
    return await response.json();
}

async function fetchProductById(productId: string): Promise<Product> {
    const response = await fetch(`http://localhost:3000/products/${productId}`);
    return await response.json();
}

function displayProducts(products: Product[]): void {
    const activities = document.querySelector('.activities') as HTMLElement;
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

async function handleAction(event: Event): Promise<void> {
    const button = event.target as HTMLButtonElement;
    const productId = button.getAttribute('data-id') as string;
    const action = button.getAttribute('data-action');

    if (action === 'update') {
        showUpdateForm(productId);
    } else if (action === 'delete') {
        await deleteProduct(productId);
        const products = await fetchProducts();
        displayProducts(products);
    }
}

function showUpdateForm(productId: string): void {
    const form = document.getElementById('update-form') as HTMLFormElement;
    form.style.display = 'block';

    form.onsubmit = async (event) => {
        event.preventDefault();
        await updateProduct(productId);
        form.style.display = 'none';
        const products = await fetchProducts();
        displayProducts(products);
    };
}

async function updateProduct(productId: string): Promise<void> {
    const productInput = document.getElementById('update-text') as HTMLInputElement;
    const priceInput = document.getElementById('update-price') as HTMLInputElement;
    const descriptionInput = document.getElementById('update-description') as HTMLTextAreaElement;
    const imageInput = document.getElementById('update-image') as HTMLInputElement;

    const updatedProduct: Product = {
        name: productInput.value,
        price: parseFloat(priceInput.value),
        description: descriptionInput.value,
        imageUrl: imageInput.value
    };

    await fetch(`http://localhost:3000/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
    });
}

async function deleteProduct(productId: string): Promise<void> {
    await fetch(`http://localhost:3000/products/${productId}`, {
        method: 'DELETE',
    });
}

async function handleSubmit(event: Event): Promise<void> {
    event.preventDefault();

    const productInput = document.getElementById('text1') as HTMLInputElement;
    const priceInput = document.getElementById('price') as HTMLInputElement;
    const descriptionInput = document.getElementById('description') as HTMLTextAreaElement;
    const imageInput = document.getElementById('image-url') as HTMLInputElement;

    const newProduct: Product = {
        name: productInput.value,
        price: parseFloat(priceInput.value),
        description: descriptionInput.value,
        imageUrl: imageInput.value,
    };

    await fetch("http://localhost:3000/products", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
    });

    const products = await fetchProducts();
    displayProducts(products);
}

document.getElementById('mySubmit')?.addEventListener('click', handleSubmit);
document.getElementById('viewOne')?.addEventListener('click', async () => {
    const criteria = prompt("Enter the product name:") as string;
    const products = await fetchProducts();
    const filteredProducts = products.filter(product => product.name.includes(criteria));
    if (filteredProducts.length > 0) {
        displayProducts([filteredProducts[0]]);
    } else {
        alert('No product found with the given criteria.');
    }
});
document.getElementById('viewAll')?.addEventListener('click', async () => {
    const products = await fetchProducts();
    displayProducts(products);
});

fetchProducts().then(displayProducts);









  
  
  