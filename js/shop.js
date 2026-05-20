document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes('shop.html')) {
        const cookiesGrid = document.getElementById('grid-cookies');
        const icecreamsGrid = document.getElementById('grid-icecreams');
        const saucesGrid = document.getElementById('grid-sauces');
        
        if (typeof productData !== 'undefined') {
            productData.forEach(product => {
                const cardHtml = `
                    <div class="bg-white rounded-3xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all border-4 border-transparent hover:border-[#1c3a63] group flex flex-col h-full cursor-pointer shop-card" data-id="${product.id}">
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

    const searchInput = document.getElementById('product-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const sections = document.querySelectorAll('section[id^="shop-"]');
            sections.forEach(section => {
                let hasVisibleCard = false;
                const cards = section.querySelectorAll('.grid > div');
                cards.forEach(card => {
                    const title = card.querySelector('h3').textContent.toLowerCase();
                    const desc = card.querySelector('p').textContent.toLowerCase();
                    if (title.includes(query) || desc.includes(query)) {
                        card.classList.remove('hidden');
                        card.classList.add('flex');
                        hasVisibleCard = true;
                    } else {
                        card.classList.remove('flex');
                        card.classList.add('hidden');
                    }
                });
                section.style.display = hasVisibleCard ? 'block' : 'none';
            });
        });
    }

    if (window.location.pathname.includes('product.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        const product = typeof productData !== 'undefined' ? productData.find(p => p.id === productId) : null;
        const container = document.getElementById('product-detail-container');
        
        if (product && container) {
            document.title = `${product.name} | Dipped Shx`;
            let detailsHtml = product.details.map(d => `<li class="mb-2 flex items-center gap-2"><svg style="color: ${product.themeColor}" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> ${d}</li>`).join('');
            container.innerHTML = `
                <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div style="background-color: ${product.themeColor}" class="rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 aspect-square flex items-center justify-center shadow-2xl relative overflow-hidden group">
                        <div class="absolute inset-4 border-4 border-white/20 rounded-[1.5rem] md:rounded-[2rem] pointer-events-none"></div>
                        <img src="${product.imageUrl}" alt="${product.name}" class="w-3/4 h-3/4 object-cover rounded-2xl shadow-xl transform group-hover:scale-105 transition-transform duration-500">
                    </div>
                    <div class="space-y-6">
                        <a href="shop.html" class="inline-block text-[#1c3a63]/60 font-bold tracking-widest hover:text-[#e891b6] transition-colors mb-2 uppercase text-sm">&larr; BACK TO SHOP</a>
                        <h1 class="font-display text-4xl sm:text-5xl md:text-7xl text-[#1c3a63] leading-tight">${product.name}</h1>
                        <p style="color: ${product.themeColor}" class="font-bold text-2xl tracking-widest">R${product.price.toFixed(2)}</p>
                        <p class="text-lg text-[#1c3a63]/80 font-bold tracking-widest leading-relaxed">${product.longDescription}</p>
                        <div class="pt-6 border-t-4 border-[#1c3a63]/10">
                            <h3 class="font-black text-xl text-[#1c3a63] mb-4 tracking-wider uppercase">What's Inside:</h3>
                            <ul class="text-[#1c3a63]/70 font-bold tracking-widest">${detailsHtml}</ul>
                        </div>
                        <div class="pt-8 flex flex-col sm:flex-row gap-4">
                            <button class="add-to-cart-btn flex-grow bg-[#1c3a63] text-white px-8 py-5 rounded-2xl font-bold tracking-widest text-lg shadow-xl hover:-translate-y-1 transition-all" data-name="${product.name}" onmouseover="this.style.backgroundColor='${product.themeColor}'" onmouseout="this.style.backgroundColor='#1c3a63'">ADD TO CART</button>
                        </div>
                    </div>
                </div>
            `;
            setTimeout(() => { container.classList.remove('opacity-0'); }, 100);
        } else if (container) {
            container.innerHTML = `
                <div class="text-center max-w-2xl mx-auto py-20">
                    <h1 class="font-display text-4xl sm:text-5xl text-[#1c3a63] mb-6">TREAT NOT FOUND</h1>
                    <p class="font-bold text-xl tracking-widest text-[#1c3a63]/70 mb-8">It seems this treat has already been eaten. Let's get you back to the shop.</p>
                    <a href="shop.html" class="inline-block bg-[#e891b6] text-white px-8 py-4 rounded-xl font-bold tracking-widest hover:scale-105 transition-transform shadow-lg">BACK TO SHOP</a>
                </div>
            `;
            setTimeout(() => { container.classList.remove('opacity-0'); }, 100);
        }
    }
});
