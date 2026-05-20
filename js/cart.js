window.dippedCart = JSON.parse(localStorage.getItem('dippedCart')) || {};

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
                <div class="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border-2 border-[#1c3a63]/10">
                    <span class="font-bold text-[#1c3a63] tracking-widest text-sm flex-grow">${item}</span>
                    <div class="flex items-center gap-3">
                        <button class="cart-minus text-[#e891b6] font-bold text-lg hover:scale-110 transition-transform px-2" data-name="${item}">-</button>
                        <span class="font-bold text-[#1c3a63]">${qty}</span>
                        <button class="cart-plus text-[#5ac1b0] font-bold text-lg hover:scale-110 transition-transform px-2" data-name="${item}">+</button>
                    </div>
                </div>
            `;
        }
        if (cartCountEl) cartCountEl.textContent = totalItems;
        if (totalItems === 0) {
            if(emptyCartMsg) emptyCartMsg.style.display = 'block';
            if(checkoutBtn) { checkoutBtn.style.opacity = '0.5'; checkoutBtn.style.pointerEvents = 'none'; }
            if(cartItemsContainer && emptyCartMsg) { cartItemsContainer.innerHTML = ''; cartItemsContainer.appendChild(emptyCartMsg); }
        } else {
            if(emptyCartMsg) emptyCartMsg.style.display = 'none';
            if(checkoutBtn) { checkoutBtn.style.opacity = '1'; checkoutBtn.style.pointerEvents = 'auto'; }
            if(cartItemsContainer) cartItemsContainer.innerHTML = html;
        }

        document.querySelectorAll('.cart-plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                window.dippedCart[e.target.dataset.name]++;
                window.saveAndRenderCart();
            });
        });
        document.querySelectorAll('.cart-minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const name = e.target.dataset.name;
                window.dippedCart[name]--;
                if (window.dippedCart[name] <= 0) delete window.dippedCart[name];
                window.saveAndRenderCart();
            });
        });
    }

    window.saveAndRenderCart = function() {
        localStorage.setItem('dippedCart', JSON.stringify(window.dippedCart));
        window.updateCartUI();
    }

    if (cartSidebar) {
        openCartBtns.forEach(btn => btn?.addEventListener('click', () => {
            cartSidebar.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden';
            window.updateCartUI();
        }));
        closeCartBtn?.addEventListener('click', () => {
            cartSidebar.classList.add('translate-x-full');
            if(!document.getElementById('mobile-menu')?.classList.contains('translate-x-full')) {
                document.body.style.overflow = '';
            }
        });
    }

    document.body.addEventListener('click', (e) => {
        const btn = e.target.closest('.add-to-cart-btn');
        if (btn) {
            const name = btn.dataset.name;
            window.dippedCart[name] = (window.dippedCart[name] || 0) + 1;
            window.saveAndRenderCart();
            
            const originalText = btn.textContent;
            btn.textContent = "ADDED!";
            btn.classList.add('bg-[#5ac1b0]', 'text-white');
            btn.classList.remove('bg-[#1c3a63]', 'hover:text-[#1c3a63]', 'hover:bg-[#e891b6]', 'hover:bg-[#5ac1b0]', 'hover:bg-[#facc15]');
            setTimeout(() => {
                btn.textContent = originalText;
                btn.classList.remove('bg-[#5ac1b0]', 'text-white');
                btn.classList.add('bg-[#1c3a63]');
            }, 1000);

            const icon = document.getElementById('open-cart');
            if (icon) {
                icon.style.transform = 'scale(1.3)';
                icon.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                setTimeout(() => { icon.style.transform = 'scale(1)'; }, 300);
            }
            if (cartSidebar) {
                cartSidebar.classList.remove('translate-x-full');
                document.body.style.overflow = 'hidden';
            }
        }
        
        const card = e.target.closest('.shop-card');
        if (card && !btn) {
            window.location.href = `product.html?id=${card.dataset.id}`;
        }
    });

    const clearCartBtn = document.getElementById('clear-cart-btn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            window.dippedCart = {};
            window.saveAndRenderCart();
        });
    }

    window.addEventListener('storage', (e) => {
        if (e.key === 'dippedCart') {
            window.dippedCart = JSON.parse(e.newValue) || {};
            window.updateCartUI();
        }
    });

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (Object.keys(window.dippedCart).length === 0) return;
            window.location.href = 'checkout.html';
        });
    }

    window.updateCartUI();
});
