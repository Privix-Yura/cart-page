document.addEventListener("DOMContentLoaded", () => {
    const productsContainer = document.getElementById("products-container");
    const cartModal = document.getElementById("cart-modal");
    const cartItemsList = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");
    const closeCartBtn = document.getElementById("close-cart");
    const checkoutBtn = document.getElementById("checkout");
    const clearCartBtn = document.getElementById("clear-cart"); // New Button for Clearing Cart

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Load Products
    function loadProducts() {
        if (!productsContainer) return;
        productsContainer.innerHTML = "";
        products.forEach((product) => {
            const productElement = document.createElement("div");
            productElement.classList.add("product");
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productsContainer.appendChild(productElement);
        });
    }

    // Add to Cart
    window.addToCart = (id) => {
        const product = products.find((p) => p.id === id);
        const itemIndex = cart.findIndex((item) => item.id === id);

        if (itemIndex > -1) {
            cart[itemIndex].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        saveCart();
        updateCart();
        showCartPopup(product.name);
    };

    // Remove from Cart
    window.removeFromCart = (id) => {
        cart = cart.filter((item) => item.id !== id);
        saveCart();
        updateCart();
    };

    // Update Cart UI
    function updateCart() {
        if (!cartItemsList || !cartTotal || !cartCount) return;

        cartItemsList.innerHTML = "";
        let total = 0;

        cart.forEach((item) => {
            total += item.price * item.quantity;
            const li = document.createElement("li");
            li.innerHTML = `
                ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
                <button onclick="decreaseQuantity(${item.id})">➖</button>
                <button onclick="increaseQuantity(${item.id})">➕</button>
                <button onclick="removeFromCart(${item.id})">❌</button>
            `;
            cartItemsList.appendChild(li);
        });

        cartTotal.innerText = `$${total.toFixed(2)}`;
        cartCount.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartModal.style.display = cart.length > 0 ? "block" : "none";
    }

    // Increase Quantity
    window.increaseQuantity = (id) => {
        const item = cart.find((item) => item.id === id);
        if (item) {
            item.quantity += 1;
            saveCart();
            updateCart();
        }
    };

    // Decrease Quantity
    window.decreaseQuantity = (id) => {
        const item = cart.find((item) => item.id === id);
        if (item && item.quantity > 1) {
            item.quantity -= 1;
        } else {
            cart = cart.filter((item) => item.id !== id);
        }
        saveCart();
        updateCart();
    };

    // Save Cart to Local Storage
    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Clear Cart
    clearCartBtn?.addEventListener("click", () => {
        cart = [];
        saveCart();
        updateCart();
    });

    // Checkout
    checkoutBtn?.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        alert("Checkout successful! Thank you for your purchase.");
        cart = [];
        saveCart();
        updateCart();
    });

    // Close Cart Modal
    closeCartBtn?.addEventListener("click", () => {
        cartModal.style.display = "none";
    });

    // Show Popup on Adding Item
    function showCartPopup(itemName) {
        const popup = document.createElement("div");
        popup.classList.add("cart-popup");
        popup.innerText = `${itemName} added to cart!`;
        document.body.appendChild(popup);

        setTimeout(() => {
            popup.remove();
        }, 2000);
    }

    // Initialize
    loadProducts();
    updateCart();
});
