document.addEventListener("DOMContentLoaded", () => {
    // Age Verification
    const ageModal = document.getElementById('age-modal');
    const ageContent = document.getElementById('age-modal-content');
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

    // Cookie Consent
    const cookieBanner = document.getElementById('cookie-banner');
    if (!localStorage.getItem('cookiesAccepted') && cookieBanner) {
        setTimeout(() => { cookieBanner.classList.remove('translate-y-full'); }, 1500);
    }
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    if (acceptCookiesBtn && cookieBanner) {
        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.classList.add('translate-y-full');
        });
    }

    // Mobile Menu
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

    // Product Modal
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

    // Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('section h1, section h2, section p, .group').forEach((el, index) => {
        if(el.closest('nav')) return;
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${(index % 4) * 0.1}s`;
        observer.observe(el);
    });

    // Scroll Up Button
    const scrollUpBtn = document.getElementById('scroll-up');
    if (scrollUpBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) scrollUpBtn.classList.remove('translate-y-20', 'opacity-0');
            else scrollUpBtn.classList.add('translate-y-20', 'opacity-0');
        });
        scrollUpBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
});
