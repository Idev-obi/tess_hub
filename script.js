document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount();
    updateCartDisplay();

    // Add to cart functionality
    document.querySelectorAll('.product-card button').forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('p').textContent.replace(/Price: |\$/g, '');

            // Check if item exists in cart
            const existingItem = cart.find(item => item.name === productName);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name: productName, price: parseFloat(productPrice), quantity: 1 });
            }

            // Save to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            updateCartDisplay();

            // Visual feedback
            button.textContent = 'Added!';
            button.style.transform = 'scale(1.1)';
            setTimeout(() => {
                button.textContent = 'Add to Cart';
                button.style.transform = 'scale(1)';
            }, 1000);
        });
    });

    // Update cart count in header
    function updateCartCount() {
        const cartCount = document.getElementById('cart-count');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    // Update cart modal display
    function updateCartDisplay() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartEmptyMessage = document.getElementById('cart-empty');
        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            cartEmptyMessage.style.display = 'block';
        } else {
            cartEmptyMessage.style.display = 'none';
            cart.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                itemElement.innerHTML = `
                    <span>${item.name} (x${item.quantity})</span>
                    <span>$${item.price * item.quantity}</span>
                `;
                cartItemsContainer.appendChild(itemElement);
            });
        }
    }

    // Cart modal functionality
    const cartModal = document.getElementById('cart-modal');
    const cartLink = document.querySelector('.cart-link');
    const closeModal = document.querySelector('.cart-modal-close');
    const clearCartButton = document.getElementById('clear-cart');
    const checkoutButton = document.getElementById('checkout');

    cartLink.addEventListener('click', (e) => {
        e.preventDefault();
        cartModal.classList.add('active');
    });

    closeModal.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });

    // Close modal when clicking outside
    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });

    clearCartButton.addEventListener('click', () => {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCartDisplay();
    });

    checkoutButton.addEventListener('click', () => {
        alert('Checkout functionality not implemented. Proceed to payment gateway here.');
        // Optionally redirect to a checkout page or integrate with a payment API
    });

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});