// Initialization
document.addEventListener("DOMContentLoaded", () => {
    console.log("Dipped Shx Landing Page Loaded.");

    const ageModal = document.getElementById('age-modal');
    const ageContent = document.getElementById('age-modal-content');
    const cookieBanner = document.getElementById('cookie-banner');

    // 18+ Modal Logic
    if (!localStorage.getItem('ageVerified') && ageModal) {
        ageModal.classList.remove('opacity-0', 'pointer-events-none');
        setTimeout(() => ageContent.classList.remove('scale-95'), 10);
        document.body.style.overflow = 'hidden';
    }

    const ageStep1 = document.getElementById('age-step-1');
    const ageStep2 = document.getElementById('age-step-2');
    const ageYesBtn = document.getElementById('age-yes');
    const ageNoBtn = document.getElementById('age-no');
    
    const verifyAgeBtn = document.getElementById('verify-age-btn');
    const dobInput = document.getElementById('dob-input');
    const ageError = document.getElementById('age-error');

    if (ageYesBtn && ageNoBtn) {
        ageYesBtn.addEventListener('click', () => {
            ageStep1.classList.add('hidden');
            ageStep2.classList.remove('hidden'); 
            ageStep2.classList.add('flex');
            ageError.classList.add('hidden');
        });

        ageNoBtn.addEventListener('click', () => {
            ageStep1.classList.add('hidden');
            ageError.textContent = "YOU MUST BE 18+ TO VIEW THIS SITE.";
            ageError.classList.remove('hidden');
        });
    }

    if (verifyAgeBtn && dobInput) {
        verifyAgeBtn.addEventListener('click', () => {
            const dobValue = dobInput.value;
            ageError.classList.add('hidden');
            
            if (!dobValue) {
                ageError.textContent = "PLEASE ENTER A VALID DATE.";
                ageError.classList.remove('hidden');
                return;
            }

            const dob = new Date(dobValue);
            const today = new Date();
            let age = today.getFullYear() - dob.getFullYear();
            const m = today.getMonth() - dob.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
                age--;
            }

            if (age >= 18) {
                localStorage.setItem('ageVerified', 'true');
                document.body.style.overflow = '';
                ageContent.classList.add('scale-95');
                ageModal.classList.add('opacity-0', 'pointer-events-none');
            } else {
                ageError.textContent = "YOU MUST BE 18+ TO VIEW THIS SITE.";
                ageError.classList.remove('hidden');
            }
        });
    }

    // Cookie Consent Logic
    if (!localStorage.getItem('cookiesAccepted') && cookieBanner) {
        setTimeout(() => {
            cookieBanner.classList.remove('translate-y-full');
        }, 1500);
    }

    const acceptCookiesBtn = document.getElementById('accept-cookies');
    if (acceptCookiesBtn && cookieBanner) {
        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.classList.add('translate-y-full');
        });
    }

    // Mobile Menu Logic
    const mobileMenu = document.getElementById('mobile-menu');
    const openMenuBtn = document.getElementById('open-menu');
    const closeMenuBtn = document.getElementById('close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (openMenuBtn && closeMenuBtn && mobileMenu) {
        openMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden';
        });

        const closeMenu = () => {
            mobileMenu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        };

        closeMenuBtn.addEventListener('click', closeMenu);
        mobileLinks.forEach(link => link.addEventListener('click', closeMenu));
    }

    // Product Modal Logic
    const productModal = document.getElementById('product-modal');
    const productContent = document.getElementById('product-modal-content');
    const closeProductModalBtn = document.getElementById('close-product-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    if (productModal) {
        const modalCategories = {
            cookies: { title: "COOKIES & BROWNIES" },
            icecreams: { title: "ICE-CREAMS" },
            sauces: { title: "SAUCES" }
        };

        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.addEventListener('click', () => {
                const type = card.dataset.product;
                if(modalCategories[type]) {
                    modalTitle.textContent = modalCategories[type].title;
                    
                    const categoryProducts = typeof productData !== 'undefined' ? productData.filter(p => p.category === type) : [];
                    
                    let bodyHtml = '<div class="space-y-4 mb-4">';
                    categoryProducts.forEach(p => {
                        bodyHtml += `
                            <div class="flex flex-col gap-2 bg-white p-3 rounded-xl shadow-sm border-2 border-[#1c3a63]/10">
                                <div class="flex justify-between items-center">
                                    <span class="font-bold text-xs tracking-widest leading-snug w-1/3 uppercase">${p.name}</span>
                                    <div class="flex gap-2">
                                        <a href="product.html?id=${p.id}" class="text-[#1c3a63] border-2 border-[#1c3a63] px-3 py-2 rounded-xl text-[10px] hover:bg-[#1c3a63] hover:text-white font-bold tracking-widest transition-colors flex items-center justify-center whitespace-nowrap">DETAILS</a>
                                        <button class="add-to-cart-btn bg-[#1c3a63] text-white px-3 py-2 rounded-xl text-[10px] font-bold tracking-widest transition-colors flex items-center justify-center whitespace-nowrap hover:scale-105" data-name="${p.name}" style="--hover-bg: ${p.themeColor}" onmouseover="this.style.backgroundColor='${p.themeColor}'" onmouseout="this.style.backgroundColor='#1c3a63'">ADD</button>
                                    </div>
                                </div>
                            </div>
                        `;
                    });
                    bodyHtml += '</div>';
                    
                    modalBody.innerHTML = bodyHtml;
                    
                    productModal.classList.remove('opacity-0', 'pointer-events-none');
                    setTimeout(() => productContent.classList.remove('scale-95'), 10);
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        closeProductModalBtn.addEventListener('click', () => {
            productContent.classList.add('scale-95');
            productModal.classList.add('opacity-0', 'pointer-events-none');
            document.body.style.overflow = '';
        });
    }

    // Scroll Animations using IntersectionObserver
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply initial animation state to elements
    const animatedElements = document.querySelectorAll('section h1, section h2, section p, .group');
    animatedElements.forEach((el, index) => {
        if(el.closest('nav')) return; // Skip nav items
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${(index % 4) * 0.1}s`;
        observer.observe(el);
    });

    // Scroll Up Button Logic
    const scrollUpBtn = document.getElementById('scroll-up');
    if (scrollUpBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollUpBtn.classList.remove('translate-y-20', 'opacity-0');
            } else {
                scrollUpBtn.classList.add('translate-y-20', 'opacity-0');
            }
        });
        scrollUpBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Cart System Logic ---
    let cart = JSON.parse(localStorage.getItem('dippedCart')) || {};

    const cartSidebar = document.getElementById('cart-sidebar');
    const openCartBtns = document.querySelectorAll('#open-cart, #shop-open-cart-btn');
    const closeCartBtn = document.getElementById('close-cart');
    const cartCountEl = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMsg = document.getElementById('empty-cart-msg');
    const checkoutBtn = document.getElementById('checkout-btn');

    function updateCartUI() {
        let totalItems = 0;
        let html = '';
        
        for (const [item, qty] of Object.entries(cart)) {
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
            if(checkoutBtn) {
                checkoutBtn.style.opacity = '0.5';
                checkoutBtn.style.pointerEvents = 'none';
            }
            if(cartItemsContainer && emptyCartMsg) {
                cartItemsContainer.innerHTML = '';
                cartItemsContainer.appendChild(emptyCartMsg);
            }
        } else {
            if(emptyCartMsg) emptyCartMsg.style.display = 'none';
            if(checkoutBtn) {
                checkoutBtn.style.opacity = '1';
                checkoutBtn.style.pointerEvents = 'auto';
            }
            if(cartItemsContainer) cartItemsContainer.innerHTML = html;
        }

        // Re-bind plus/minus events
        document.querySelectorAll('.cart-plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const name = e.target.dataset.name;
                cart[name]++;
                saveAndRender();
            });
        });
        document.querySelectorAll('.cart-minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const name = e.target.dataset.name;
                cart[name]--;
                if (cart[name] <= 0) delete cart[name];
                saveAndRender();
            });
        });
    }

    function saveAndRender() {
        localStorage.setItem('dippedCart', JSON.stringify(cart));
        updateCartUI();
    }

    // Toggle Cart
    if (cartSidebar) {
        openCartBtns.forEach(btn => btn?.addEventListener('click', () => {
            cartSidebar.classList.remove('translate-x-full');
            document.body.style.overflow = 'hidden';
            updateCartUI();
        }));
        
        closeCartBtn?.addEventListener('click', () => {
            cartSidebar.classList.add('translate-x-full');
            document.body.style.overflow = '';
            
            // Only unhide scroll if also menu modal is closed and product modal is closed
            if(!document.getElementById('mobile-menu').classList.contains('translate-x-full')) {
                document.body.style.overflow = 'hidden';
            }
        });
    }

    // Add To Cart Buttons (Event delegation for dynamic elements)
    document.body.addEventListener('click', (e) => {
        const btn = e.target.closest('.add-to-cart-btn');
        if (btn) {
            const name = btn.dataset.name;
            if (cart[name]) {
                cart[name]++;
            } else {
                cart[name] = 1;
            }
            saveAndRender();
            
            // Visual feedback on button
            const originalText = btn.textContent;
            btn.textContent = "ADDED!";
            btn.classList.add('bg-[#5ac1b0]', 'text-white');
            btn.classList.remove('bg-[#1c3a63]', 'hover:text-[#1c3a63]', 'hover:bg-[#e891b6]', 'hover:bg-[#5ac1b0]', 'hover:bg-[#facc15]');
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.classList.remove('bg-[#5ac1b0]', 'text-white');
                btn.classList.add('bg-[#1c3a63]');
            }, 1000);

            // Animate Cart Icon
            const icon = document.getElementById('open-cart');
            if (icon) {
                icon.style.transform = 'scale(1.3)';
                icon.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1)';
                }, 300);
            }

            // Open Cart Sidebar
            const cartSidebar = document.getElementById('cart-sidebar');
            if (cartSidebar) {
                cartSidebar.classList.remove('translate-x-full');
                document.body.style.overflow = 'hidden';
            }
        }
        
        // Handle product card click logic cleanly without inline onclick
        const card = e.target.closest('.shop-card');
        if (card && !btn) {
            window.location.href = `product.html?id=${card.dataset.id}`;
        }
    });

    // Clear Cart Logic
    const clearCartBtn = document.getElementById('clear-cart-btn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            cart = {};
            saveAndRender();
        });
    }

    // Multi-Tab Cart Syncing
    window.addEventListener('storage', (e) => {
        if (e.key === 'dippedCart') {
            cart = JSON.parse(e.newValue) || {};
            updateCartUI();
        }
    });

    // Checkout Logic
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            // Check if cart is empty
            if (Object.keys(cart).length === 0) return;
            window.location.href = 'checkout.html';
        });
    }

    // --- Shop Rendering Logic ---
    if (window.location.pathname.includes('shop.html')) {
        const cookiesGrid = document.getElementById('grid-cookies');
        const icecreamsGrid = document.getElementById('grid-icecreams');
        const saucesGrid = document.getElementById('grid-sauces');
        
        if (typeof productData !== 'undefined') {
            productData.forEach(product => {
                const cardHtml = `
                    <div class="bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all border-4 border-transparent hover:border-[#1c3a63] group flex flex-col h-full cursor-pointer shop-card" data-id="${product.id}">
                        <div style="background-color: ${product.themeColor}" class="rounded-2xl aspect-square mb-6 flex items-center justify-center overflow-hidden">
                            <img src="${product.imageUrl}" alt="${product.name}" loading="lazy" class="w-2/3 h-2/3 object-cover rounded-full shadow-md group-hover:scale-110 transition-transform">
                        </div>
                        <h3 class="font-black text-xl text-[#1c3a63] mb-2 tracking-wider uppercase">${product.name}</h3>
                        <p class="text-base text-[#1c3a63]/70 font-bold tracking-widest mb-4 flex-grow">${product.shortDescription}</p>
                        <button class="add-to-cart-btn block w-full text-center bg-[#1c3a63] text-white py-3 rounded-xl font-bold tracking-widest hover:-translate-y-1 transition-all mt-auto" data-name="${product.name}" onmouseover="this.style.backgroundColor='${product.themeColor}'" onmouseout="this.style.backgroundColor='#1c3a63'">
                            ADD TO CART
                        </button>
                    </div>
                `;
                if (product.category === 'cookies' && cookiesGrid) cookiesGrid.innerHTML += cardHtml;
                else if (product.category === 'icecreams' && icecreamsGrid) icecreamsGrid.innerHTML += cardHtml;
                else if (product.category === 'sauces' && saucesGrid) saucesGrid.innerHTML += cardHtml;
            });
        }
    }

    // Initialize UI on load
    updateCartUI();

    // --- Search System Logic ---
    const searchInput = document.getElementById('product-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            
            // Get all Shop Sections (Cookies, Icecreams, Sauces)
            const sections = document.querySelectorAll('section[id^="shop-"]');
            
            sections.forEach(section => {
                let hasVisibleCard = false;
                // Query all item cards in this section
                const cards = section.querySelectorAll('.grid > div');
                
                cards.forEach(card => {
                    const title = card.querySelector('h3').textContent.toLowerCase();
                    const desc = card.querySelector('p').textContent.toLowerCase();
                    
                    if (title.includes(query) || desc.includes(query)) {
                        card.style.display = 'block';
                        hasVisibleCard = true;
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                // Hide section header if no cards match
                if (hasVisibleCard) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    }

    // --- Product Detail Rendering ---
    if (window.location.pathname.includes('product.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        const product = typeof productData !== 'undefined' ? productData.find(p => p.id === productId) : null;
        
        const container = document.getElementById('product-detail-container');
        
        if (product && container) {
            let detailsHtml = product.details.map(d => `<li class="mb-2 flex items-center gap-2"><svg style="color: ${product.themeColor}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> ${d}</li>`).join('');
            
            container.innerHTML = `
                <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div style="background-color: ${product.themeColor}" class="rounded-[3rem] p-8 md:p-12 aspect-square flex items-center justify-center shadow-2xl relative overflow-hidden group">
                        <div class="absolute inset-4 border-4 border-white/20 rounded-[2rem] pointer-events-none"></div>
                        <img src="${product.imageUrl}" alt="${product.name}" class="w-3/4 h-3/4 object-cover rounded-2xl shadow-xl transform group-hover:scale-105 transition-transform duration-500">
                    </div>
                    <div class="space-y-6">
                        <a href="shop.html" class="inline-block text-[#1c3a63]/60 font-bold tracking-widest hover:text-[#e891b6] transition-colors mb-2 uppercase text-sm">&larr; BACK TO SHOP</a>
                        <h1 class="font-display text-5xl md:text-7xl text-[#1c3a63] leading-tight">${product.name}</h1>
                        <p style="color: ${product.themeColor}" class="font-bold text-2xl tracking-widest">R${product.price.toFixed(2)}</p>
                        <p class="text-lg text-[#1c3a63]/80 font-bold tracking-widest leading-relaxed">${product.longDescription}</p>
                        
                        <div class="pt-6 border-t-4 border-[#1c3a63]/10">
                            <h3 class="font-black text-xl text-[#1c3a63] mb-4 tracking-wider uppercase">What's Inside:</h3>
                            <ul class="text-[#1c3a63]/70 font-bold tracking-widest">
                                ${detailsHtml}
                            </ul>
                        </div>
                        
                        <div class="pt-8 flex flex-col sm:flex-row gap-4">
                            <button class="add-to-cart-btn flex-grow bg-[#1c3a63] text-white px-8 py-5 rounded-2xl font-bold tracking-widest text-lg shadow-xl hover:-translate-y-1 transition-all" data-name="${product.name}" onmouseover="this.style.backgroundColor='${product.themeColor}'" onmouseout="this.style.backgroundColor='#1c3a63'">
                                ADD TO CART
                            </button>
                        </div>
                    </div>
                </div>
            `;
            setTimeout(() => { container.classList.remove('opacity-0'); }, 100);
        } else if (container) {
            // Not found
            container.innerHTML = `
                <div class="text-center max-w-2xl mx-auto py-20">
                    <h1 class="font-display text-5xl text-[#1c3a63] mb-6">TREAT NOT FOUND</h1>
                    <p class="font-bold text-xl tracking-widest text-[#1c3a63]/70 mb-8">It seems this treat has already been eaten. Let's get you back to the shop.</p>
                    <a href="shop.html" class="inline-block bg-[#e891b6] text-white px-8 py-4 rounded-xl font-bold tracking-widest hover:scale-105 transition-transform shadow-lg">BACK TO SHOP</a>
                </div>
            `;
            setTimeout(() => { container.classList.remove('opacity-0'); }, 100);
        }
    }

    // --- Checkout Page Logic ---
    if (window.location.pathname.includes('checkout.html')) {
        const checkoutItemsContainer = document.getElementById('checkout-items');
        const checkoutSubtotalEl = document.getElementById('checkout-subtotal');
        const checkoutDeliveryFeeEl = document.getElementById('checkout-delivery-fee');
        const checkoutTotalEl = document.getElementById('checkout-total');
        const deliveryRadios = document.querySelectorAll('input[name="delivery-method"]');
        const addressContainer = document.getElementById('address-container');
        const finalizeBtn = document.getElementById('finalize-order-btn');
        
        let subtotal = 0;
        let deliveryFee = 0; // Default pickup

        const formatPrice = (price) => `R${price.toFixed(2)}`;

        function renderCheckoutItems() {
            let html = '';
            subtotal = 0;
            
            for (const [item, qty] of Object.entries(cart)) {
                const product = typeof productData !== 'undefined' ? productData.find(p => p.name === item) : null;
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

            if (Object.keys(cart).length === 0) {
                html = '<div class="text-center text-white/70 font-bold py-4">YOUR CART IS EMPTY.</div>';
            }

            if (checkoutItemsContainer) checkoutItemsContainer.innerHTML = html;
            updateTotals();
        }

        function updateTotals() {
            const total = subtotal + deliveryFee;
            if (checkoutSubtotalEl) checkoutSubtotalEl.textContent = formatPrice(subtotal);
            if (checkoutDeliveryFeeEl) checkoutDeliveryFeeEl.textContent = formatPrice(deliveryFee);
            if (checkoutTotalEl) checkoutTotalEl.textContent = formatPrice(total);
        }

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

        const recContainer = document.getElementById('recommendation-container');
        const recContent = document.getElementById('recommendation-content');
        if (recContainer && typeof productData !== 'undefined') {
            const availableProducts = productData.filter(p => !cart[p.name]);
            if (availableProducts.length > 0) {
                const randomProduct = availableProducts[Math.floor(Math.random() * availableProducts.length)];
                recContainer.classList.remove('hidden');
                
                recContent.innerHTML = `
                    <div class="w-24 h-24 rounded-2xl flex items-center justify-center flex-shrink-0" style="background-color: ${randomProduct.themeColor}">
                        <img src="${randomProduct.imageUrl}" class="w-2/3 h-2/3 object-cover rounded-full shadow-md">
                    </div>
                    <div class="flex-grow">
                        <h3 class="font-black text-[#1c3a63] text-lg tracking-wider uppercase mb-1">${randomProduct.name}</h3>
                        <p class="font-bold text-sm text-[#1c3a63]/70 mb-2">${formatPrice(randomProduct.price)}</p>
                        <button class="add-to-cart-btn text-white px-4 py-2 rounded-xl text-xs font-bold tracking-widest hover:scale-105 transition-transform" data-name="${randomProduct.name}" style="background-color: #1c3a63;">
                            ADD TO CART
                        </button>
                    </div>
                `;
            }
        }

        if (finalizeBtn) {
            finalizeBtn.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent form submission if inside a form
                if (Object.keys(cart).length === 0) {
                    alert("Your cart is empty!");
                    return;
                }

                const name = document.getElementById('checkout-name').value.trim();
                const phone = document.getElementById('checkout-phone').value.trim();
                const deliveryMethod = document.querySelector('input[name="delivery-method"]:checked').value;
                const address = document.getElementById('checkout-address').value.trim();

                if (!name || !phone) {
                    alert("Please provide your Name and WhatsApp Number.");
                    return;
                }

                if (deliveryMethod === 'delivery' && !address) {
                    alert("Please provide a Delivery Address.");
                    return;
                }

                let message = `*NEW ORDER - DIPPED SHX*%0A%0A`;
                message += `*Customer:* ${name}%0A`;
                message += `*Phone:* ${phone}%0A`;
                message += `*Method:* ${deliveryMethod.toUpperCase()}%0A`;
                if (deliveryMethod === 'delivery') {
                    message += `*Address:* ${address}%0A`;
                }
                message += `%0A*--- ORDER ITEMS ---*%0A`;
                
                for (const [item, qty] of Object.entries(cart)) {
                    const product = typeof productData !== 'undefined' ? productData.find(p => p.name === item) : null;
                    const price = product ? product.price : 0;
                    message += `- ${qty}x ${item} (R${(price * qty).toFixed(2)})%0A`;
                }
                
                message += `%0A*Subtotal:* R${subtotal.toFixed(2)}%0A`;
                message += `*Delivery Fee:* R${deliveryFee.toFixed(2)}%0A`;
                message += `*TOTAL:* R${(subtotal + deliveryFee).toFixed(2)}%0A`;
                
                message += `%0APlease confirm my order!`;

                window.open(`https://wa.me/27621201496?text=${message}`, '_blank');
            });
        }

        renderCheckoutItems();
        
        document.body.addEventListener('click', (e) => {
            if (e.target.closest('.add-to-cart-btn') || e.target.closest('.cart-plus') || e.target.closest('.cart-minus')) {
                setTimeout(renderCheckoutItems, 50);
            }
        });
    }

});
