// Utility functions
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// Product cache for quick lookups
let productCache = {
    byName: {},
    byCategory: {},
    initialized: false
};

function initializeProductCache() {
    if (productCache.initialized || typeof productData === 'undefined') return;
    
    productData.forEach(product => {
        productCache.byName[product.name] = product;
        if (!productCache.byCategory[product.category]) {
            productCache.byCategory[product.category] = [];
        }
        productCache.byCategory[product.category].push(product);
    });
    productCache.initialized = true;
}

document.addEventListener("DOMContentLoaded", () => {
    initializeProductCache();

    // Shop page product grid rendering
    const grids = {
        cookies: document.getElementById('grid-cookies'),
        icecreams: document.getElementById('grid-icecreams'),
        sauces: document.getElementById('grid-sauces')
    };

    if (grids.cookies || grids.icecreams || grids.sauces) {

        if (typeof productData !== 'undefined') {
            // Build HTML for each category in memory first, then insert once
            const htmlByCategory = {
                cookies: '',
                icecreams: '',
                sauces: ''
            };

            productData.forEach(product => {
                const cardHtml = `
                    <div class="bg-white rounded-3xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all border-4 border-transparent hover:border-[#1c3a63] group flex flex-col h-full cursor-pointer shop-card" data-id="${product.id}" data-name="${product.name}">
                        <div style="background-color: ${product.themeColor}" class="rounded-2xl aspect-square mb-6 flex items-center justify-center overflow-hidden">
                            <img src="${product.imageUrl}" alt="${product.name}" loading="lazy" class="w-2/3 h-2/3 object-cover rounded-full shadow-md group-hover:scale-110 transition-transform" />
                        </div>
                        <h3 class="font-black text-xl text-[#1c3a63] mb-2 tracking-wider uppercase">${product.name}</h3>
                        <p class="text-base text-[#1c3a63]/70 font-bold tracking-widest mb-4 flex-grow">${product.shortDescription}</p>
                        <button class="add-to-cart-btn block w-full text-center bg-[#1c3a63] text-white py-3 rounded-xl font-bold tracking-widest hover:-translate-y-1 transition-all mt-auto" data-name="${product.name}">
                            ADD TO CART
                        </button>
                    </div>
                `;
                if (htmlByCategory[product.category] !== undefined) {
                    htmlByCategory[product.category] += cardHtml;
                }
            });

            // Single DOM update per category
            if (grids.cookies) grids.cookies.innerHTML = htmlByCategory.cookies;
            if (grids.icecreams) grids.icecreams.innerHTML = htmlByCategory.icecreams;
            if (grids.sauces) grids.sauces.innerHTML = htmlByCategory.sauces;
        }
    }

    // Optimized search with debouncing and caching
    const searchInput = document.getElementById('product-search');
    if (searchInput) {
        let lastQuery = '';

        const performSearch = (query) => {
            if (query === lastQuery) return; // Skip if same query
            lastQuery = query;

            const sections = document.querySelectorAll('section[id^="shop-"]');
            sections.forEach(section => {
                let hasVisibleCard = false;
                const cards = section.querySelectorAll('.shop-card');
                
                cards.forEach(card => {
                    const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
                    const desc = card.querySelector('p')?.textContent.toLowerCase() || '';
                    const matches = title.includes(query) || desc.includes(query);
                    
                    if (matches) {
                        card.style.display = '';
                        hasVisibleCard = true;
                    } else {
                        card.style.display = 'none';
                    }
                });
                section.style.display = hasVisibleCard ? 'block' : 'none';
            });
        };

        // Debounce search to 300ms
        const debouncedSearch = debounce((e) => {
            performSearch(e.target.value.toLowerCase().trim());
        }, 300);

        searchInput.addEventListener('input', debouncedSearch);
    }

    // Product detail page
    const container = document.getElementById('product-detail-container');
    if (container) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        if (typeof productData !== 'undefined') {
            const product = productData.find(p => p.id === productId);

            if (product) {
                document.title = `${product.name} | Dipped Shx`;
                
                // Build details list HTML
                let detailsHtml = product.details
                    .map(d => `<li class="mb-2 flex items-center gap-2"><svg style="color: ${product.themeColor}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg><span>${d}</span></li>`)
                    .join('');

                container.innerHTML = `
                    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div style="background-color: ${product.themeColor}" class="rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 aspect-square flex items-center justify-center shadow-2xl relative overflow-hidden">
                            <div class="absolute inset-4 border-4 border-white/20 rounded-[1.5rem] md:rounded-[2rem] pointer-events-none"></div>
                            <img src="${product.imageUrl}" alt="${product.name}" loading="lazy" class="w-3/4 h-3/4 object-cover rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div class="space-y-6">
                            <a href="shop.html" class="inline-block text-[#1c3a63]/60 font-bold tracking-widest hover:text-[#e891b6] transition-colors mb-2 uppercase text-sm md:text-base py-2">&larr; BACK TO SHOP</a>
                            <h1 class="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#1c3a63] leading-tight">${product.name}</h1>
                            <p style="color: ${product.themeColor}" class="font-bold text-2xl tracking-widest">R${product.price.toFixed(2)}</p>
                            <p class="text-lg text-[#1c3a63]/80 font-bold tracking-widest leading-relaxed">${product.longDescription}</p>
                            <div class="pt-6 border-t-4 border-[#1c3a63]/10">
                                <h3 class="font-black text-xl text-[#1c3a63] mb-4 tracking-wider uppercase">What's Inside:</h3>
                                <ul class="text-[#1c3a63]/70 font-bold tracking-widest">${detailsHtml}</ul>
                            </div>
                            <div class="pt-8 flex flex-col sm:flex-row gap-4">
                                <button class="add-to-cart-btn flex-grow bg-[#1c3a63] text-white px-8 py-5 rounded-2xl font-bold tracking-widest text-lg shadow-xl hover:-translate-y-1 transition-all" data-name="${product.name}">
                                    ADD TO CART
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                
                // Fade in after short delay
                setTimeout(() => { container.classList.remove('opacity-0'); }, 100);
            } else {
                // Product not found
                container.innerHTML = `
                    <div class="text-center max-w-2xl mx-auto py-20 flex flex-col items-center">
                        <img src="img/hero-bud.png" class="w-48 h-48 object-contain mb-8 opacity-70 grayscale" alt="Sad Bud">
                        <h1 class="font-display text-4xl sm:text-5xl text-[#1c3a63] mb-6">TREAT NOT FOUND</h1>
                        <p class="font-bold text-xl tracking-widest text-[#1c3a63]/70 mb-8">It seems this treat has already been eaten or just floated away. Let's get you back to the shop.</p>
                        <a href="shop.html" class="inline-block bg-[#e891b6] text-white px-8 py-4 rounded-xl font-bold tracking-widest hover:scale-105 transition-transform shadow-lg">BACK TO SHOP</a>
                    </div>
                `;
                setTimeout(() => { container.classList.remove('opacity-0'); }, 100);
            }
        }
    }
});