const productData = [
    {
        id: "signature-cookies",
        name: "Signature Cookies",
        category: "cookies",
        shortDescription: "Premium infused chocolate chip cookies.",
        longDescription: "Our Signature Cookies are baked to perfection with premium ingredients and our special infusion. Expect a soft, chewy center with crispy edges, packed with rich chocolate chips. Perfect for satisfying your sweet tooth while enjoying a relaxing experience.",
        price: 15.00,
        imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        details: [
            "Handcrafted in small batches",
            "Premium chocolate chips",
            "Perfectly balanced infusion",
            "Contains dairy and gluten"
        ],
        themeColor: "#e891b6"
    },
    {
        id: "double-choc-brownies",
        name: "Double Choc Brownies",
        category: "cookies",
        shortDescription: "Rich, fudgy, and intensely satisfying.",
        longDescription: "These Double Choc Brownies are incredibly dense and fudgy, made with high-quality cocoa and dark chocolate chunks. Each bite delivers a deeply satisfying chocolate experience coupled with our signature infusion.",
        price: 18.00,
        imageUrl: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        details: [
            "Rich and fudgy texture",
            "Double chocolate goodness",
            "Premium quality infusion",
            "Contains dairy and gluten"
        ],
        themeColor: "#e891b6"
    },
    {
        id: "ice-cream-sandwiches",
        name: "Ice-Cream Sandwiches",
        category: "icecreams",
        shortDescription: "The perfect combo of cookie and cream.",
        longDescription: "Experience the ultimate treat with our infused Ice-Cream Sandwiches. We wedge a generous scoop of rich, creamy vanilla bean ice cream between two of our signature chewy cookies. The perfect way to cool down and unwind.",
        price: 12.00,
        imageUrl: "https://images.unsplash.com/photo-1563805042-7684c8e9e533?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        details: [
            "Vanilla bean ice cream",
            "Signature chewy cookies",
            "Refreshing infused treat",
            "Keep frozen until ready to consume"
        ],
        themeColor: "#5ac1b0"
    },
    {
        id: "ice-cream-tubs",
        name: "Ice-Cream Tubs",
        category: "icecreams",
        shortDescription: "Grab a spoon and elevate your chill.",
        longDescription: "Our premium infused Ice-Cream Tubs are packed with flavor and crafted for maximum relaxation. Made with real cream and available in select mouth-watering flavors. Grab a spoon and sink into absolute bliss.",
        price: 25.00,
        imageUrl: "https://images.unsplash.com/photo-1570197571499-166b36435e9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        details: [
            "Rich and creamy texture",
            "Made with real cream",
            "Perfect for sharing (or not)",
            "Keep frozen until ready to consume"
        ],
        themeColor: "#5ac1b0"
    },
    {
        id: "ice-cream-popsicles",
        name: "Ice-Cream Popsicles",
        category: "icecreams",
        shortDescription: "Refreshing treats on a stick.",
        longDescription: "Cool off with our vibrant and refreshing infused Ice-Cream Popsicles. Whether you're lounging by the pool or just beating the heat, these popsicles deliver a perfectly measured dose of relaxation in every bite.",
        price: 10.00,
        imageUrl: "https://images.unsplash.com/photo-1522856339183-5a7bb57767da?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        details: [
            "Refreshing and sweet",
            "Convenient on-the-go treat",
            "Perfectly infused",
            "Keep frozen until ready to consume"
        ],
        themeColor: "#5ac1b0"
    },
    {
        id: "hot-sauce",
        name: "Hot Sauce",
        category: "sauces",
        shortDescription: "Bring the heat to any meal.",
        longDescription: "Spice up your life with our signature infused Hot Sauce. Crafted with a blend of fiery peppers and savory spices, it delivers a flavorful kick followed by a wave of relaxation. Perfect for tacos, eggs, or anything that needs a little extra fire.",
        price: 14.00,
        imageUrl: "https://images.unsplash.com/photo-1607532941433-304659e8198a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        details: [
            "Medium-high heat level",
            "Savory and spicy flavor profile",
            "Infused for relaxation",
            "Shake well before use"
        ],
        themeColor: "#facc15"
    },
    {
        id: "caramel-chocolate-sauce",
        name: "Caramel & Chocolate",
        category: "sauces",
        shortDescription: "Sweet drizzles for your sweet tooth.",
        longDescription: "Decadence in a bottle. Our infused Caramel & Chocolate sauce is the ultimate topping for ice cream, brownies, or fresh fruit. Rich, velvety, and perfectly infused to make your dessert time truly magical.",
        price: 16.00,
        imageUrl: "https://images.unsplash.com/photo-1558231221-a18ac49bfe38?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        details: [
            "Rich caramel and chocolate blend",
            "Velvety smooth texture",
            "Perfect dessert topping",
            "Refrigerate after opening"
        ],
        themeColor: "#facc15"
    }
];

// If using in a Node/CommonJS environment later:
if (typeof module !== 'undefined' && module.exports) {
    module.exports = productData;
}
