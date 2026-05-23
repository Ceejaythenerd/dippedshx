document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes('checkout.html')) {
        const checkoutItemsContainer = document.getElementById('checkout-items');
        const checkoutSubtotalEl = document.getElementById('checkout-subtotal');
        const checkoutDeliveryFeeEl = document.getElementById('checkout-delivery-fee');
        const checkoutTotalEl = document.getElementById('checkout-total');
        const deliveryRadios = document.querySelectorAll('input[name="delivery-method"]');
        const addressContainer = document.getElementById('address-container');
        const finalizeBtn = document.getElementById('finalize-order-btn');

        let subtotal = 0;
        let deliveryFee = 0;

        // Create product lookup cache
        const productLookup = {};
        if (typeof productData !== 'undefined') {
            productData.forEach(product => {
                productLookup[product.name] = product;
            });
        }

        const formatPrice = (price) => `R${price.toFixed(2)}`;

        function renderCheckoutItems() {
            let html = '';
            subtotal = 0;

            // Build all HTML in memory first
            for (const [item, qty] of Object.entries(window.dippedCart)) {
                const product = productLookup[item];
                const price = product ? product.price : 0;
                const itemTotal = price * qty;
                subtotal += itemTotal;

                html += `
                    <div class="flex justify-between items-center border-b border-white/10 pb-3 mb-3 last:border-0 last:mb-0 last:pb-0">
                        <div>
                            <div class="font-bold text-sm tracking-widest">${item}</div>
                            <div class="text-xs text-white/70">QTY: ${qty}</div>
                        </div>
                        <div class="font-bold">${formatPrice(itemTotal)}</div>
                    </div>
                `;
            }

            if (Object.keys(window.dippedCart).length === 0) {
                html = '<div class="text-center text-white/70 font-bold py-4">YOUR CART IS EMPTY.</div>';
            }

            // Single DOM update
            if (checkoutItemsContainer) {
                checkoutItemsContainer.innerHTML = html;
            }

            updateTotals();
        }

        function updateTotals() {
            const total = subtotal + deliveryFee;
            const isEmpty = Object.keys(window.dippedCart).length === 0;

            // Batch DOM updates
            if (checkoutSubtotalEl) checkoutSubtotalEl.textContent = formatPrice(subtotal);
            if (checkoutDeliveryFeeEl) checkoutDeliveryFeeEl.textContent = formatPrice(deliveryFee);
            if (checkoutTotalEl) checkoutTotalEl.textContent = formatPrice(total);

            if (finalizeBtn) {
                if (isEmpty) {
                    finalizeBtn.style.opacity = '0.5';
                    finalizeBtn.style.pointerEvents = 'none';
                    finalizeBtn.innerHTML = 'CART IS EMPTY';
                } else {
                    finalizeBtn.style.opacity = '1';
                    finalizeBtn.style.pointerEvents = 'auto';
                    finalizeBtn.innerHTML = 'FINALIZE ON WHATSAPP';
                }
            }
        }

        // Delivery method radio buttons
        deliveryRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.value === 'delivery') {
                    deliveryFee = 50;
                    if (addressContainer) addressContainer.classList.remove('hidden');
                } else {
                    deliveryFee = 0;
                    if (addressContainer) addressContainer.classList.add('hidden');
                }
                updateTotals();
            });
        });

        // Recommendation section
        const recContainer = document.getElementById('recommendation-container');
        const recContent = document.getElementById('recommendation-content');
        
        if (recContainer && typeof productData !== 'undefined') {
            const availableProducts = productData.filter(p => !window.dippedCart[p.name]);
            if (availableProducts.length > 0) {
                const randomProduct = availableProducts[Math.floor(Math.random() * availableProducts.length)];
                recContainer.classList.remove('hidden');
                recContent.innerHTML = `
                    <div class="w-24 h-24 rounded-2xl flex items-center justify-center flex-shrink-0" style="background-color: ${randomProduct.themeColor}">
                        <img src="${randomProduct.imageUrl}" alt="${randomProduct.name}" loading="lazy" class="w-2/3 h-2/3 object-cover rounded-full shadow-md" />
                    </div>
                    <div class="flex-grow">
                        <h3 class="font-black text-[#1c3a63] text-lg tracking-wider uppercase mb-1">${randomProduct.name}</h3>
                        <p class="font-bold text-sm text-[#1c3a63]/70 mb-2">${formatPrice(randomProduct.price)}</p>
                        <button class="add-to-cart-btn text-white px-4 py-2 rounded-xl text-xs font-bold tracking-widest hover:scale-105 transition-transform bg-[#1c3a63]" data-name="${randomProduct.name}">
                            ADD TO CART
                        </button>
                    </div>
                `;
            }
        }

        // Error modal helper
        let errorModalListener = false;
        const showError = (msg) => {
            const modal = document.getElementById('error-modal');
            const content = document.getElementById('error-modal-content');
            const msgEl = document.getElementById('error-modal-msg');
            
            if (modal && msgEl && content) {
                msgEl.textContent = msg;
                modal.classList.remove('opacity-0', 'pointer-events-none');
                setTimeout(() => content.classList.remove('scale-95'), 10);
                document.body.style.overflow = 'hidden';

                // Attach listener only once
                if (!errorModalListener) {
                    const closeBtn = document.getElementById('close-error-modal');
                    if (closeBtn) {
                        closeBtn.addEventListener('click', () => {
                            content.classList.add('scale-95');
                            modal.classList.add('opacity-0', 'pointer-events-none');
                            document.body.style.overflow = '';
                        });
                        errorModalListener = true;
                    }
                }
            } else {
                alert(msg);
            }
        };

        // Finalize order button
        if (finalizeBtn) {
            finalizeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                
                if (Object.keys(window.dippedCart).length === 0) {
                    showError("YOUR CART IS EMPTY!");
                    return;
                }

                const name = document.getElementById('checkout-name').value.trim();
                const phone = document.getElementById('checkout-phone').value.trim();
                const deliveryMethod = document.querySelector('input[name="delivery-method"]:checked')?.value;
                const address = document.getElementById('checkout-address').value.trim();

                // Validation
                if (!name || !phone) {
                    showError("PLEASE PROVIDE YOUR NAME AND WHATSAPP NUMBER.");
                    return;
                }
                
                if (deliveryMethod === 'delivery' && !address) {
                    showError("WE NEED TO KNOW WHERE TO GO! PLEASE PROVIDE A DELIVERY ADDRESS.");
                    return;
                }

                // Build WhatsApp message
                let message = `*NEW ORDER - DIPPED SHX*%0A%0A*Customer:* ${name}%0A*Phone:* ${phone}%0A*Method:* ${deliveryMethod.toUpperCase()}%0A`;
                
                if (deliveryMethod === 'delivery') {
                    message += `*Address:* ${address}%0A`;
                }
                
                message += `%0A*--- ORDER ITEMS ---*%0A`;

                // Add items to message
                for (const [item, qty] of Object.entries(window.dippedCart)) {
                    const product = productLookup[item];
                    const price = product ? product.price : 0;
                    message += `- ${qty}x ${item} (R${(price * qty).toFixed(2)})%0A`;
                }

                message += `%0A*Subtotal:* R${subtotal.toFixed(2)}%0A*Delivery Fee:* R${deliveryFee.toFixed(2)}%0A*TOTAL:* R${(subtotal + deliveryFee).toFixed(2)}%0A%0APlease confirm my order!`;
                
                window.open(`https://wa.me/27621201496?text=${message}`, '_blank');
            });
        }

        // Export render function for external updates
        window.renderCheckoutItems = renderCheckoutItems;

        // Listen for cart updates with requestAnimationFrame for better performance
        document.body.addEventListener('click', (e) => {
            if (e.target.closest('.add-to-cart-btn') || 
                e.target.closest('.cart-plus') || 
                e.target.closest('.cart-minus')) {
                requestAnimationFrame(window.renderCheckoutItems);
            }
        });

        // Initial render
        renderCheckoutItems();
    }
});