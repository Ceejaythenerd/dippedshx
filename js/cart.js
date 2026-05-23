// Cart state management with optimized rendering
window.dippedCart = JSON.parse(localStorage.getItem('dippedCart')) || {};

// Debounce helper to prevent excessive updates
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

document.addEventListener("DOMContentLoaded", () => {
    const cartSidebar = document.getElementById('cart-sidebar');
    const openCartBtns = document.querySelectorAll('#open-cart, #shop-open-cart-btn');
    const closeCartBtn = document.getElementById('close-cart');
    const cartCountEl = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMsg = document.getElementById('empty-cart-msg');
    const checkoutBtn = document.getElementById('checkout-btn');

    window.updateCartUI = function() {
        let totalItems = 0;
        let html = '';
        
        for (const [item, qty] of Object.entries(window.dippedCart)) {
            totalItems += qty;
            html += `
                <div class="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border-2 border-[#1c3a63]/10" data-item="${item}">
                    <span class="font-bold text-[#1c3a63] tracking-widest text-sm flex-grow">${item}</span>
                    <div class="flex items-center gap-3">
                        <button class="cart-minus text-[#e891b6] font-bold text-lg hover:scale-110 transition-transform px-2" data-name="${item}">−</button>
                        <span class="font-bold text-[#1c3a63]">${qty}</span>
                        <button class="cart-plus text-[#5ac1b0] font-bold text-lg hover:scale-110 transition-transform px-2" data-name="${item}">+</button>
                    </div>
                </div>
            `;
        }
        
        // Update cart count
        if (cartCountEl) cartCountEl.textContent = totalItems;
        
        // Update visibility of empty state
        const isEmpty = totalItems === 0;
        if (emptyCartMsg) {
            emptyCartMsg.style.display = isEmpty ? 'block' : 'none';
        }
        
        // Update checkout button state
        if (checkoutBtn) {
            checkoutBtn.style.opacity = isEmpty ? '0.5' : '1';
            checkoutBtn.style.pointerEvents = isEmpty ? 'none' : 'auto';
        }
        
        // Single DOM update instead of multiple
        if (cartItemsContainer) {
            if (isEmpty) {
                cartItemsContainer.innerHTML = '';
                if (emptyCartMsg) cartItemsContainer.appendChild(emptyCartMsg);
            } else {
                cartItemsContainer.innerHTML = html;
            }
        }
    };

    window.saveAndRenderCart = function() {
        localStorage.setItem('dippedCart', JSON.stringify(window.dippedCart));
        window.updateCartUI();
    };

    // Cart sidebar toggle
    if (cartSidebar) {
        openCartBtns.forEach(btn => btn?.addEventListener('click', () => {
            cartSidebar.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden';
            window.updateCartUI();
        }));
        
        closeCartBtn?.addEventListener('click', () => {
            cartSidebar.classList.add('translate-x-full');
            if (!document.getElementById('mobile-menu')?.classList.contains('translate-x-full')) {
                document.body.style.overflow = '';
            }
        });
    }

    // Event delegation: Single listener for all cart interactions
    document.body.addEventListener('click', (e) => {
        // Handle "Add to Cart" button
        const addBtn = e.target.closest('.add-to-cart-btn');
        if (addBtn) {
            const name = addBtn.dataset.name;
            window.dippedCart[name] = (window.dippedCart[name] || 0) + 1;
            window.saveAndRenderCart();
            
            // Visual feedback
            const originalText = addBtn.textContent;
            const originalClass = addBtn.className;
            addBtn.textContent = "ADDED!";
            addBtn.classList.add('bg-[#5ac1b0]', 'text-white');
            addBtn.classList.remove('bg-[#1c3a63]', 'hover:text-[#1c3a63]', 'hover:bg-[#e891b6]', 'hover:bg-[#5ac1b0]', 'hover:bg-[#facc15]');
            
            setTimeout(() => {
                addBtn.textContent = originalText;
                addBtn.className = originalClass;
            }, 1000);

            // Animate cart icon
            const icon = document.getElementById('open-cart');
            if (icon) {
                icon.style.animation = 'none';
                setTimeout(() => {
                    icon.style.animation = 'cartBounce 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                }, 10);
            }
            
            // Open cart sidebar
            if (cartSidebar && cartSidebar.classList.contains('translate-x-full')) {
                cartSidebar.classList.remove('translate-x-full');
                document.body.style.overflow = 'hidden';
            }
            return;
        }

        // Handle cart plus button
        const plusBtn = e.target.closest('.cart-plus');
        if (plusBtn) {
            const name = plusBtn.dataset.name;
            if (window.dippedCart[name]) {
                window.dippedCart[name]++;
                window.saveAndRenderCart();
            }
            return;
        }

        // Handle cart minus button
        const minusBtn = e.target.closest('.cart-minus');
        if (minusBtn) {
            const name = minusBtn.dataset.name;
            if (window.dippedCart[name]) {
                window.dippedCart[name]--;
                if (window.dippedCart[name] <= 0) {
                    delete window.dippedCart[name];
                }
                window.saveAndRenderCart();
            }
            return;
        }

        // Handle shop card click (navigate to product page)
        const card = e.target.closest('.shop-card');
        if (card) {
            window.location.href = `product.html?id=${card.dataset.id}`;
        }
    });

    // Clear cart functionality
    const clearCartBtn = document.getElementById('clear-cart-btn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            if (confirm('ARE YOU SURE YOU WANT TO CLEAR YOUR CART?')) {
                window.dippedCart = {};
                window.saveAndRenderCart();
            }
        });
    }

    // Listen for storage changes from other tabs
    window.addEventListener('storage', (e) => {
        if (e.key === 'dippedCart') {
            window.dippedCart = JSON.parse(e.newValue) || {};
            window.updateCartUI();
        }
    });

    // Checkout button
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (Object.keys(window.dippedCart).length === 0) return;
            window.location.href = 'checkout.html';
        });
    }

    // Initial render
    window.updateCartUI();
});

// Add CSS animation keyframes
if (!document.getElementById('cart-animations')) {
    const style = document.createElement('style');
    style.id = 'cart-animations';
    style.textContent = `
        @keyframes cartBounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.3); }
        }
    `;
    document.head.appendChild(style);
}