# Dynamic Product Rendering Architecture

Our goal is to build a highly scalable, dynamic frontend router for the Dipped Shx store. By storing data centrally and using a unified template, we will drastically reduce code duplication and make it effortless to scale to hundreds of products.

## User Review Required

> [!IMPORTANT]  
> Please review the exact properties included in the product database schema (e.g. Price, Descriptions, Ingredients, Image). If there are specific data points you will need displayed on detailed product pages later (e.g. Size/Weight, THC/CBD content, specific warnings), let me know so I can structure the JSON logic properly now!

## Proposed Changes

---

### Phase 1: Data Architecture & Centralization
#### [NEW] [product-data.js](file:///c:/Users/kabic/Music/dippedshx/products/product-data.js)
We will create a global Javascript database file. It will contain an exported array of objects (or an associative dictionary) detailing every item.
Schema layout: 
- `id`: URL-safe slug (e.g. `signature-cookie`)
- `name`: Full display name
- `category`: Used for filtering
- `shortDescription`: For shop cards
- `longDescription`: For the main product page
- `price`: Placeholder numeric formats for when pricing is finalized
- `imageUrl`: Target paths to images in `/products/img`
- `details`: Array of bullet points or ingredients.

#### [MODIFY] [index.html](file:///c:/Users/kabic/Music/dippedshx/index.html) & [shop.html](file:///c:/Users/kabic/Music/dippedshx/shop.html)
- Inject `<script src="products/product-data.js"></script>` into the `<head>` of all root layouts so that the `productData` array is accessible instantaneously everywhere.

---

### Phase 2: Building the Detail Template
#### [NEW] [product.html](file:///c:/Users/kabic/Music/dippedshx/product.html)
- Create a new core unified template HTML file. 
- It will include standard components (Navigation Navbar, Cart Sidebar, Global Footer).
- It will house an empty injection container `<main id="product-detail-container" class="opacity-0 transition-opacity">`. We will animate this into visibility once javascript safely populates the DOM.

#### [MODIFY] [script.js](file:///c:/Users/kabic/Music/dippedshx/script.js)
- Build a router function triggered when `window.location.pathname.includes('product.html')`.
- It will parse `URLSearchParams` to extract `?id=`. 
- Map `id` to the database payload, then dynamically inject an advanced, beautifully styled "Product Detail" view into `product-detail-container`.
- It will automatically attach the "Add to Cart" listener so users can buy from the detail layout.

---

### Phase 3: Traffic & Inter-linking
#### [MODIFY] [shop.html](file:///c:/Users/kabic/Music/dippedshx/shop.html)
- Actually strip the hardcoded HTML cards. We will refactor `shop.html` to generate ALL store listings dynamically using the `product-data` array. This ensures `/products` is the exact single source of truth for both detailed routes and the storefront!
- Ensure product cards have a large click-target pointing to `product.html?id=[id]`.

#### [MODIFY] [index.html](file:///c:/Users/kabic/Music/dippedshx/index.html) (Modals)
- The JS fueling the existing "Featured" Modals will be rewritten to tap into `product-data.js`. 
- We will insert "View Details" text links leading off towards `product.html?id=[id]` next to the newly implemented Add to Cart buttons.

## Verification Plan

### Automated/Local Tests
1. Verify the `shop.html` successfully maps iteration across all JSON items and generates layout cards efficiently.
2. Clicking a generated card safely redirects user to `product.html?id=[foo]`.
3. Verify adding from detailed templates correctly triggers multi-tab synced Cart Storage.
4. If a user manually manually navigates to a broken ID (e.g. `product.html?id=fake-item`), they should be presented with a beautiful Error UI and safety link back to the store.
