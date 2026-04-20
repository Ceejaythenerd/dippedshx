// Initialization
document.addEventListener("DOMContentLoaded", () => {
    console.log("Dipped Shx Landing Page Loaded.");

    const ageModal = document.getElementById('age-modal');
    const ageContent = document.getElementById('age-modal-content');
    const cookieBanner = document.getElementById('cookie-banner');

    // 18+ Modal Logic
    if (!localStorage.getItem('ageVerified')) {
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
    if (!localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookieBanner.classList.remove('translate-y-full');
        }, 1500);
    }

    document.getElementById('accept-cookies').addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieBanner.classList.add('translate-y-full');
    });

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
        const productData = {
            cookies: {
                title: "COOKIES & BROWNIES",
                body: `
                    <div class="space-y-4 mb-4">
                        <div class="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm border-2 border-[#1c3a63]/10">
                            <span class="font-bold text-xs tracking-widest leading-snug w-1/2">SIGNATURE COOKIES</span>
                            <button class="add-to-cart-btn bg-[#1c3a63] text-white px-4 py-2 rounded-xl text-xs hover:bg-[#e891b6] font-bold tracking-widest transition-colors" data-name="Signature Cookies">ADD TO CART</button>
                        </div>
                        <div class="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm border-2 border-[#1c3a63]/10">
                            <span class="font-bold text-xs tracking-widest leading-snug w-1/2">DOUBLE CHOC BROWNIES</span>
                            <button class="add-to-cart-btn bg-[#1c3a63] text-white px-4 py-2 rounded-xl text-xs hover:bg-[#e891b6] font-bold tracking-widest transition-colors" data-name="Double Choc Brownies">ADD TO CART</button>
                        </div>
                    </div>`
            },
            icecreams: {
                title: "ICE-CREAMS",
                body: `
                    <div class="space-y-4 mb-4">
                        <div class="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm border-2 border-[#1c3a63]/10">
                            <span class="font-bold text-xs tracking-widest leading-snug w-1/2">ICE-CREAM SANDWICHES</span>
                            <button class="add-to-cart-btn bg-[#1c3a63] text-white px-4 py-2 rounded-xl text-xs hover:bg-[#5ac1b0] font-bold tracking-widest transition-colors" data-name="Ice-Cream Sandwiches">ADD TO CART</button>
                        </div>
                        <div class="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm border-2 border-[#1c3a63]/10">
                            <span class="font-bold text-xs tracking-widest leading-snug w-1/2">ICE-CREAM TUBS</span>
                            <button class="add-to-cart-btn bg-[#1c3a63] text-white px-4 py-2 rounded-xl text-xs hover:bg-[#5ac1b0] font-bold tracking-widest transition-colors" data-name="Ice-Cream Tubs">ADD TO CART</button>
                        </div>
                        <div class="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm border-2 border-[#1c3a63]/10">
                            <span class="font-bold text-xs tracking-widest leading-snug w-1/2">ICE-CREAM POPSICLES</span>
                            <button class="add-to-cart-btn bg-[#1c3a63] text-white px-4 py-2 rounded-xl text-xs hover:bg-[#5ac1b0] font-bold tracking-widest transition-colors" data-name="Ice-Cream Popsicles">ADD TO CART</button>
                        </div>
                    </div>`
            },
            sauces: {
                title: "SAUCES",
                body: `
                    <div class="space-y-4 mb-4">
                        <div class="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm border-2 border-[#1c3a63]/10">
                            <span class="font-bold text-xs tracking-widest leading-snug w-1/2">HOT SAUCE</span>
                            <button class="add-to-cart-btn bg-[#1c3a63] text-white px-4 py-2 rounded-xl text-xs hover:bg-[#facc15] hover:text-[#1c3a63] font-bold tracking-widest transition-colors" data-name="Hot Sauce">ADD TO CART</button>
                        </div>
                        <div class="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm border-2 border-[#1c3a63]/10">
                            <span class="font-bold text-xs tracking-widest leading-snug w-1/2">CARAMEL & CHOCOLATE</span>
                            <button class="add-to-cart-btn bg-[#1c3a63] text-white px-4 py-2 rounded-xl text-xs hover:bg-[#facc15] hover:text-[#1c3a63] font-bold tracking-widest transition-colors" data-name="Caramel & Chocolate Sauce">ADD TO CART</button>
                        </div>
                    </div>`
            }
        };

        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.addEventListener('click', () => {
                const type = card.dataset.product;
                if(productData[type]) {
                    modalTitle.textContent = productData[type].title;
                    modalBody.innerHTML = productData[type].body;
                    
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
            let message = "Hi Dipped Shx! I would like to order:%0A%0A";
            for (const [item, qty] of Object.entries(cart)) {
                message += `- ${qty}x ${item}%0A`;
            }
            message += "%0APlease let me know the total and delivery details.";
            
            window.open(`https://wa.me/27621201496?text=${message}`, '_blank');
        });
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

});
