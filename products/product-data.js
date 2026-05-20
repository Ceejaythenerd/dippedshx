const productData = [
    {
        id: "biscoff-ice-cream",
        name: "Biscoff Ice Cream",
        category: "icecreams",
        shortDescription: "Creamy Biscoff infused ice cream.",
        longDescription: "Our premium Biscoff ice cream features a perfectly balanced infusion and the classic caramelized biscuit flavor you love.",
        price: 10.00,
        imageUrl: "products/1.png",
        details: ["Rich and creamy texture", "Classic Biscoff flavor", "Perfectly infused", "Keep frozen until ready to consume"],
        themeColor: "#5ac1b0"
    },
    {
        id: "mango-tango-ice-cream",
        name: "Mango Tango Ice Cream",
        category: "icecreams",
        shortDescription: "Tropical mango infused ice cream.",
        longDescription: "Experience a tropical getaway with our Mango Tango infused ice cream. Sweet, refreshing, and perfectly chill.",
        price: 10.00,
        imageUrl: "products/2.png",
        details: ["Tropical mango flavor", "Refreshing and sweet", "Perfectly infused", "Keep frozen until ready to consume"],
        themeColor: "#5ac1b0"
    },
    {
        id: "smores-ice-cream",
        name: "Smores Ice Cream",
        category: "icecreams",
        shortDescription: "Campfire classic in a scoop.",
        longDescription: "Rich chocolate, marshmallow swirls, and graham cracker crunch, all infused for maximum relaxation.",
        price: 10.00,
        imageUrl: "products/3.png",
        details: ["Campfire classic flavor", "Rich chocolate and marshmallow", "Perfectly infused", "Keep frozen until ready to consume"],
        themeColor: "#5ac1b0"
    },
    {
        id: "strawberry-wave-ice-cream",
        name: "Strawberry Wave Ice Cream",
        category: "icecreams",
        shortDescription: "Sweet strawberry infused ice cream.",
        longDescription: "Ride the wave of relaxation with this sweet and creamy strawberry infused ice cream.",
        price: 10.00,
        imageUrl: "products/4.png",
        details: ["Real strawberry flavor", "Rich and creamy texture", "Perfectly infused", "Keep frozen until ready to consume"],
        themeColor: "#5ac1b0"
    },
    {
        id: "oreo-chunk-ice-cream",
        name: "Oreo Chunk Ice Cream",
        category: "icecreams",
        shortDescription: "Cookies and cream perfection.",
        longDescription: "Large chunks of Oreo cookies folded into our rich, infused vanilla ice cream base.",
        price: 10.00,
        imageUrl: "products/5.png",
        details: ["Large Oreo chunks", "Rich and creamy texture", "Perfectly infused", "Keep frozen until ready to consume"],
        themeColor: "#5ac1b0"
    },
    {
        id: "choconado-ice-cream",
        name: "Choconado Ice Cream",
        category: "icecreams",
        shortDescription: "A whirlwind of chocolate.",
        longDescription: "For the true chocolate lover, a rich and fudgy chocolate ice cream perfectly infused for your enjoyment.",
        price: 10.00,
        imageUrl: "products/6.png",
        details: ["Deep chocolate flavor", "Rich and creamy texture", "Perfectly infused", "Keep frozen until ready to consume"],
        themeColor: "#5ac1b0"
    },
    {
        id: "vanilla-nilla-ice-cream",
        name: "Vanilla Nilla Ice Cream",
        category: "icecreams",
        shortDescription: "Classic vanilla bean infused.",
        longDescription: "Smooth, classic vanilla bean ice cream infused to help you unwind and relax.",
        price: 10.00,
        imageUrl: "products/7.png",
        details: ["Classic vanilla bean", "Smooth and creamy", "Perfectly infused", "Keep frozen until ready to consume"],
        themeColor: "#5ac1b0"
    },
    {
        id: "salted-caramel-cuppaccino-ice-cream",
        name: "Salted Caramel Cuppaccino",
        category: "icecreams",
        shortDescription: "Coffee and caramel infused delight.",
        longDescription: "The perfect blend of coffee flavor and salty-sweet caramel, infused for a uniquely relaxing experience.",
        price: 10.00,
        imageUrl: "products/8.png",
        details: ["Coffee and caramel blend", "Sweet and salty", "Perfectly infused", "Keep frozen until ready to consume"],
        themeColor: "#5ac1b0"
    },
    {
        id: "brownie-chunk-ice-cream",
        name: "Brownie Chunk Ice Cream",
        category: "icecreams",
        shortDescription: "Fudgy brownie bites in ice cream.",
        longDescription: "Rich vanilla ice cream loaded with dense, fudgy brownie chunks and perfectly infused.",
        price: 10.00,
        imageUrl: "products/9.png",
        details: ["Fudgy brownie chunks", "Rich and creamy texture", "Perfectly infused", "Keep frozen until ready to consume"],
        themeColor: "#5ac1b0"
    },
    {
        id: "the-unicorn-ice-cream",
        name: "The Unicorn Ice Cream",
        category: "icecreams",
        shortDescription: "Magical and colorful infused treat.",
        longDescription: "A magical swirl of colorful ice cream with a sweet, fruity flavor, perfectly infused for relaxation.",
        price: 10.00,
        imageUrl: "products/10.png",
        details: ["Colorful and fun", "Sweet fruity flavor", "Perfectly infused", "Keep frozen until ready to consume"],
        themeColor: "#5ac1b0"
    },
    {
        id: "barone-ice-cream",
        name: "Barone Ice Cream",
        category: "icecreams",
        shortDescription: "Premium chocolate and caramel infused.",
        longDescription: "Decadent chocolate ice cream with ribbons of rich caramel, perfectly infused.",
        price: 10.00,
        imageUrl: "products/11.png",
        details: ["Premium chocolate", "Rich caramel ribbons", "Perfectly infused", "Keep frozen until ready to consume"],
        themeColor: "#5ac1b0"
    },
    {
        id: "funfetti-ice-cream-sandwich",
        name: "Funfetti Ice Cream Sandwich",
        category: "icecreams",
        shortDescription: "Sprinkle-covered ice cream sandwich.",
        longDescription: "Our infused ice cream wedged between two soft cookies and rolled in colorful sprinkles.",
        price: 12.00,
        imageUrl: "products/12.png",
        details: ["Colorful sprinkles", "Soft cookies", "Perfectly infused", "Keep frozen until ready to consume"],
        themeColor: "#5ac1b0"
    },
    {
        id: "choco-dipped-ice-cream-sandwich",
        name: "Choco Dipped Ice Cream Sandwich",
        category: "icecreams",
        shortDescription: "Half-dipped in rich chocolate.",
        longDescription: "A classic infused ice cream sandwich, half-dipped in a hard chocolate shell.",
        price: 12.00,
        imageUrl: "products/13.png",
        details: ["Hard chocolate shell", "Classic vanilla and cookie", "Perfectly infused", "Keep frozen until ready to consume"],
        themeColor: "#5ac1b0"
    },
    {
        id: "cookie-monster-ice-cream-sandwich",
        name: "Cookie Monster Ice Cream Sandwich",
        category: "icecreams",
        shortDescription: "Blue cookie dough ice cream sandwich.",
        longDescription: "Blue infused ice cream loaded with cookie dough, sandwiched between two chocolate chip cookies.",
        price: 12.00,
        imageUrl: "products/14.png",
        details: ["Blue cookie dough ice cream", "Chocolate chip cookies", "Perfectly infused", "Keep frozen until ready to consume"],
        themeColor: "#5ac1b0"
    },
    {
        id: "cookies-cream-ice-cream-sandwich",
        name: "Cookies & Cream Ice Cream Sandwich",
        category: "icecreams",
        shortDescription: "Oreo lover's dream sandwich.",
        longDescription: "Infused cookies and cream ice cream sandwiched between two soft chocolate chip cookies.",
        price: 12.00,
        imageUrl: "products/15.png",
        details: ["Cookies and cream ice cream", "Soft chocolate chip cookies", "Perfectly infused", "Keep frozen until ready to consume"],
        themeColor: "#5ac1b0"
    },
    {
        id: "death-by-chocolate-cake-tub",
        name: "Death By Chocolate Cake In Tub",
        category: "cookies",
        shortDescription: "Decadent chocolate cake layers.",
        longDescription: "Layers of incredibly moist chocolate cake and rich frosting, perfectly infused in a convenient tub.",
        price: 15.00,
        imageUrl: "products/16.png",
        details: ["Moist chocolate cake", "Rich frosting layers", "Perfectly infused", "Decadent dessert treat"],
        themeColor: "#e891b6"
    },
    {
        id: "smartie-pants-cookie",
        name: "Smartie Pants Cookie",
        category: "cookies",
        shortDescription: "Infused candy-coated chocolate cookie.",
        longDescription: "A soft, chewy cookie loaded with candy-coated chocolates and our signature infusion.",
        price: 8.00,
        imageUrl: "products/17.png",
        details: ["Candy-coated chocolates", "Soft and chewy", "Perfectly infused", "Handcrafted in small batches"],
        themeColor: "#e891b6"
    },
    {
        id: "strawberry-cookie",
        name: "Strawberry Cookie",
        category: "cookies",
        shortDescription: "Sweet strawberry infused cookie.",
        longDescription: "A vibrant, soft-baked strawberry cookie that delivers a perfectly measured dose of relaxation.",
        price: 8.00,
        imageUrl: "products/18.png",
        details: ["Sweet strawberry flavor", "Soft-baked texture", "Perfectly infused", "Handcrafted in small batches"],
        themeColor: "#e891b6"
    },
    {
        id: "kinder-beuno-cookie",
        name: "Kinder Bueno Cookie",
        category: "cookies",
        shortDescription: "Hazelnut chocolate perfection.",
        longDescription: "An infused cookie topped with creamy hazelnut chocolate for an indulgent, relaxing treat.",
        price: 8.00,
        imageUrl: "products/19.png",
        details: ["Hazelnut chocolate topping", "Rich and indulgent", "Perfectly infused", "Handcrafted in small batches"],
        themeColor: "#e891b6"
    },
    {
        id: "birthday-cookie",
        name: "Birthday Cookie",
        category: "cookies",
        shortDescription: "Celebrate with sprinkles.",
        longDescription: "A fun, sprinkle-filled infused cookie that tastes like cake batter and relaxation.",
        price: 8.00,
        imageUrl: "products/20.png",
        details: ["Cake batter flavor", "Colorful sprinkles", "Perfectly infused", "Handcrafted in small batches"],
        themeColor: "#e891b6"
    },
    {
        id: "classic-choc-chip-cookie",
        name: "Classic Choc Chip Cookie",
        category: "cookies",
        shortDescription: "The timeless infused favorite.",
        longDescription: "Our signature infused chocolate chip cookie. Soft, chewy, and loaded with premium chocolate chips.",
        price: 8.00,
        imageUrl: "products/21.png",
        details: ["Premium chocolate chips", "Classic chewy texture", "Perfectly infused", "Handcrafted in small batches"],
        themeColor: "#e891b6"
    },
    {
        id: "smore-cookie",
        name: "Smore Cookie",
        category: "cookies",
        shortDescription: "Toasted marshmallow and chocolate.",
        longDescription: "An infused cookie packed with chocolate chips and topped with a perfectly toasted marshmallow.",
        price: 8.00,
        imageUrl: "products/22.png",
        details: ["Toasted marshmallow", "Chocolate chunks", "Perfectly infused", "Handcrafted in small batches"],
        themeColor: "#e891b6"
    },
    {
        id: "blueberry-lemon-cookie",
        name: "Blueberry Lemon Cookie",
        category: "cookies",
        shortDescription: "Zesty and sweet infused cookie.",
        longDescription: "A refreshing blend of zesty lemon and sweet blueberries in a soft-baked, infused cookie.",
        price: 8.00,
        imageUrl: "products/23.png",
        details: ["Zesty lemon", "Sweet blueberries", "Perfectly infused", "Handcrafted in small batches"],
        themeColor: "#e891b6"
    },
    {
        id: "caramel-drizzle-sauce",
        name: "Caramel Drizzle",
        category: "sauces",
        shortDescription: "Infused caramel perfection.",
        longDescription: "Rich, buttery caramel infused for a relaxing addition to any dessert.",
        price: 15.00,
        imageUrl: "products/24.png",
        details: ["Rich buttery flavor", "Perfect for ice cream", "Perfectly infused", "Store in a cool place"],
        themeColor: "#1c3a63"
    },
    {
        id: "chocolate-fudge-sauce",
        name: "Chocolate Fudge",
        category: "sauces",
        shortDescription: "Decadent chocolate sauce.",
        longDescription: "Thick, rich chocolate fudge sauce, perfectly infused for the ultimate treat.",
        price: 15.00,
        imageUrl: "products/24.png",
        details: ["Deep chocolate flavor", "Thick and fudgy", "Perfectly infused", "Store in a cool place"],
        themeColor: "#1c3a63"
    }
];

// If using in a Node/CommonJS environment later:
if (typeof module !== 'undefined' && module.exports) {
    module.exports = productData;
}
