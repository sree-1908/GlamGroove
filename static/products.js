const skincareProducts = [
  {
    id: "cleanser",
    name: "Gentle Facial Cleanser",
    step: "cleanser",
    image: "static/images/cleanser.png",
    price: 960,
    ingredients: ["Chamomile", "Aloe Vera", "Glycerin"],
    usage: "AM/PM",
    skinTypes: ["oily", "dry", "combination", "sensitive"],
    tags: ["vegan", "fragrance-free"]
  },
  {
    id: "serum",
    name: "Rejuvenating Face Serum",
    step: "serum",
    image: "static/images/serum.png",
    price: 1450,
    ingredients: ["Vitamin C", "Niacinamide", "Hyaluronic Acid"],
    usage: "AM",
    skinTypes: ["dry", "dull", "sensitive"],
    tags: ["vegan"]
  },
  {
    id: "moisturizer",
    name: "Hydrating Moisturizer",
    step: "moisturizer",
    image: "static/images/moisturizer.png",
    price: 1100,
    ingredients: ["Shea Butter", "Glycerin", "Ceramides"],
    usage: "AM/PM",
    skinTypes: ["dry", "sensitive"],
    tags: ["best-seller"]
  },
  {
    id: "facemask",
    name: "Glow Face Mask",
    step: "mask",
    image: "static/images/facemask.png",
    price: 850,
    ingredients: ["Clay", "Vitamin E", "Charcoal"],
    usage: "PM",
    skinTypes: ["oily", "dull"],
    tags: ["weekly"]
  },
  {
    id: "lipbalm",
    name: "Organic Lip Balm",
    step: "lip-care",
    image: "static/images/lipbalm.png",
    price: 350,
    ingredients: ["Beeswax", "Coconut Oil", "Vitamin E"],
    usage: "AM/PM",
    skinTypes: ["all"],
    tags: []
  },
  {
    id: "eyecream",
    name: "Revitalizing Eye Cream",
    step: "eye-cream",
    image: "static/images/eyecream.png",
    price: 700,
    ingredients: ["Caffeine", "Peptides", "Green Tea"],
    usage: "AM/PM",
    skinTypes: ["all"],
    tags: []
  },
  {
    id: "glow-cream",
    name: "Glow Cream",
    step: "sunscreen",
    image: "static/images/suness.png",
    price: 2500,
    ingredients: ["Zinc Oxide", "Essence Base"],
    usage: "AM",
    skinTypes: ["oily", "sensitive"],
    tags: ["spf50"]
  },
  {
    id: "snail-cream",
    name: "Super Aqua Snail Cream",
    step: "moisturizer",
    image: "static/images/snailcream.png",
    price: 2500,
    ingredients: ["Snail Mucin", "Adenosine"],
    usage: "PM",
    skinTypes: ["dry", "aging"],
    tags: ["spf50"]
  },
  {
    id: "clarifying-emulsion",
    name: "Clarifying Emulsion",
    step: "emulsion",
    image: "static/images/clarify.png",
    price: 2500,
    ingredients: ["Bija Seed Oil", "Salicylic Acid"],
    usage: "PM",
    skinTypes: ["acne-prone", "oily"],
    tags: ["exfoliating"]
  },
  {
    id: "dewy-jelly",
    name: "Dewy Glow Jelly Cream",
    step: "moisturizer",
    image: "static/images/dewy.png",
    price: 2500,
    ingredients: ["Jeju Cherry Blossom", "Niacinamide"],
    usage: "AM",
    skinTypes: ["normal", "dull"],
    tags: []
  },
  {
    id: "refresh-toner",
    name: "Refreshing Toner",
    step: "toner",
    image: "static/images/toner.png",
    price: 2000,
    ingredients: ["Witch Hazel", "Rose Water"],
    usage: "AM/PM",
    skinTypes: ["combination", "oily"],
    tags: []
  },
  {
    id: "seed-oil",
    name: "COCO & EYE - Seed Oil SPF50+/PA+++",
    step: "sunscreen",
    image: "static/images/seedoil.png",
    price: 2656,
    ingredients: ["Coconut Oil", "Seed Extract"],
    usage: "AM",
    skinTypes: ["dry", "sensitive"],
    tags: ["spf50"]
  },
  {
    id: "butter-smooth",
    name: "Butter Smooth Cream SPF50+/PA+++",
    step: "moisturizer",
    image: "static/images/buttersmooth.png",
    price: 2656,
    ingredients: ["Shea Butter", "SPF Agents"],
    usage: "AM",
    skinTypes: ["normal", "dry"],
    tags: ["spf50"]
  },
  {
    id: "micellar",
    name: "Micellar Facial Cleanser",
    step: "cleanser",
    image: "static/images/facial.png",
    price: 2656,
    ingredients: ["Micellar Water", "Cleansing Agents"],
    usage: "AM/PM",
    skinTypes: ["sensitive", "oily"],
    tags: []
  },
  {
    id: "prem-suncream",
    name: "P:rem Sun Cream SPF50+/PA+++",
    step: "sunscreen",
    image: "static/images/suncream.png",
    price: 2656,
    ingredients: ["Titanium Dioxide", "Zinc Oxide"],
    usage: "AM",
    skinTypes: ["combination", "sensitive"],
    tags: ["spf50"]
  },
  {
    id: "hydration-booster",
    name: "Hydration Booster Cream",
    step: "moisturizer",
    image: "static/images/pillow.png",
    price: 3735,
    ingredients: ["Hyaluronic Acid", "Ceramides"],
    usage: "AM/PM",
    skinTypes: ["dry", "aging"],
    tags: []
  },
  {
    id: "glow-serum",
    name: "Glow Serum (Vitamin C Brightening Serum)",
    step: "serum",
    image: "static/images/serum1.png",
    price: 2324,
    ingredients: ["Vitamin C", "Alpha Arbutin"],
    usage: "AM",
    skinTypes: ["dull", "pigmented"],
    tags: []
  },
  {
    id: "deep-clean-balm",
    name: "Deep Clean Balm",
    step: "cleansing-balm",
    image: "static/images/cleansebalm.png",
    price: 2905,
    ingredients: ["Cleansing Oils", "Botanicals"],
    usage: "PM",
    skinTypes: ["oily", "combo"],
    tags: []
  },
  {
    id: "oil-cleanser",
    name: "Pure Oil Cleanser",
    step: "oil-cleanser",
    image: "static/images/oilcleanse.png",
    price: 2490,
    ingredients: ["Jojoba Oil", "Sunflower Oil"],
    usage: "PM",
    skinTypes: ["oily", "combo"],
    tags: []
  },
  {
    id: "hydration-boost",
    name: "Hydration Boost Cream",
    step: "moisturizer",
    image: "static/images/hydraboost.png",
    price: 3735,
    ingredients: ["Aloe Vera", "Panthenol"],
    usage: "AM/PM",
    skinTypes: ["dry", "sensitive"],
    tags: []
  },
  {
    id: "sun-shield",
    name: "SPF50+ Sun Shield",
    step: "sunscreen",
    image: "static/images/sunsheild.png",
    price: 2075,
    ingredients: ["SPF Complex", "Matte Finish Base"],
    usage: "AM",
    skinTypes: ["oily", "normal"],
    tags: ["spf50"]
  },
  {
    id: "brightening-eye",
    name: "Brightening Eye Cream",
    step: "eye-cream",
    image: "static/images/eyecream1.png",
    price: 3154,
    ingredients: ["Niacinamide", "Vitamin K"],
    usage: "AM/PM",
    skinTypes: ["all"],
    tags: []
  },
  {
    id: "glow-mask",
    name: "Glow Face Mask (Mask version)",
    step: "mask",
    image: "static/images/mask1.png",
    price: 1826,
    ingredients: ["Charcoal", "Kaolin Clay", "Niacinamide"],
    usage: "PM",
    skinTypes: ["oily", "dull"],
    tags: ["weekly"]
  }
];

window.skincareProducts = skincareProducts;
