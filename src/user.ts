interface Product {
    id?: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
}

async function fetchProducts(): Promise<Product[]> {
    try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Product[] = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return [];
    }
}

function displayProducts(products: Product[]) {
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
            <button id="add-to-cart-${product.id}">Add to Cart <ion-icon name="cart" style="color: white;"></ion-icon></button>
        `;
        activities.appendChild(productItem);

       
        const addToCartButton = productItem.querySelector(`#add-to-cart-${product.id}`) as HTMLElement;
        addToCartButton.addEventListener('click', () => addToCart(product));
    });
}

function addToCart(product: Product) {
    const cart = getCartItems();
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} has been added to the cart!`);
}

function getCartItems(): Product[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

async function init() {
    const products = await fetchProducts();
    console.log(products);
    displayProducts(products);
}


init();

