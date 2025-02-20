document.addEventListener("DOMContentLoaded", () => {
    const cartItemsList = document.getElementById("cart-items-list");
    const cartTotal = document.getElementById("cart-total");
    const clearCartBtn = document.getElementById("clear-cart");
    const checkoutBtn = document.getElementById("checkout");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartPage() {
        cartItemsList.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartItemsList.innerHTML = `<p id="empty-cart-msg">Your cart is empty 🛒</p>`;
            cartTotal.innerText = "0.00";
            return;
        }

        cart.forEach(item => {
            total += item.price * item.quantity;

            const li = document.createElement("li");
            li.classList.add("cart-item");

            li.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-img">
                <div class="cart-details">
                    <span>${item.name} x${item.quantity}</span>
                    <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                </div>
                <button class="remove-btn" onclick="removeItem(${item.id})">❌</button>
            `;

            cartItemsList.appendChild(li);
        });

        cartTotal.innerText = total.toFixed(2);
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    window.removeItem = (id) => {
        cart = cart.filter(item => item.id !== id);
        updateCartPage();
    };

    clearCartBtn.addEventListener("click", () => {
        cart = [];
        updateCartPage();
    });

    checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty! Please add items before checking out.");
            return;
        }

        alert("✅ Order Placed Successfully! 🎉");
        cart = [];
        updateCartPage();
    });

    updateCartPage();
});
