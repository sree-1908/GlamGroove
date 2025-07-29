// ✅ CART LOGIC
let cart = {};

function addToCart(product) {
  const id = product.id;
  if (cart[id]) {
    cart[id].qty += 1;
  } else {
    cart[id] = { ...product, qty: 1 };
  }
  updateCartUI();
  document.getElementById("cartContainer").classList.remove("hidden");
}

function updateCartUI() {
  const cartItems = document.getElementById("cartItems");
  const subtotal = document.getElementById("cartSubtotal");
  if (!cartItems || !subtotal) return;

  cartItems.innerHTML = '';
  let total = 0;

  Object.values(cart).forEach(item => {
    total += item.price * item.qty;
    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" />
        <div class="cart-item-details">
          <p>${item.name}</p>
          <p>₹${item.price}</p>
          <div class="cart-item-qty">
            <button onclick="changeQty('${item.id}', -1)">-</button>
            <span>${item.qty}</span>
            <button onclick="changeQty('${item.id}', 1)">+</button>
          </div>
        </div>
      </div>`;
  });

  subtotal.textContent = `₹${total.toFixed(2)}`;
}

function changeQty(id, delta) {
  if (cart[id]) {
    cart[id].qty += delta;
    if (cart[id].qty <= 0) delete cart[id];
    updateCartUI();
  }
}

function toggleCart() {
  const cartContainer = document.getElementById("cartContainer");
  if (cartContainer) {
    cartContainer.classList.toggle("hidden");
  }
}

// ✅ QUIZ + CART INIT
document.addEventListener('DOMContentLoaded', () => {
  const closeCartBtn = document.getElementById('closeCartBtn');
  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', () => {
      document.getElementById('cartContainer').classList.add('hidden');
    });
  }

  const cartIcon = document.querySelector('.icon-block.cart');
  if (cartIcon) {
    cartIcon.addEventListener('click', () => {
      toggleCart();
    });
  }

  const form = document.getElementById('skinQuizForm');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const skinType = formData.get('skinType');
if (!skinType) {
  alert("Please select your skin type.");
  return;
}

const data = {
  skinType,
  concerns: formData.getAll('concerns'),
  sensitivity: formData.get('sensitivity'),
  conditions: formData.get('conditions'),
  outdoors: formData.get('outdoors'),
  makeup: formData.get('makeup'),
};


    // ✅ Sanitize concerns to match model-trained features
    const validConcerns = [
      "Acne", "Brightening", "Hydration", "Redness", "Pores",
      "Dark Spots", "Anti-Aging", "Uneven Tone", "Oil Control",
      "Dullness", "Texture", "Sun Damage"
    ];
    data.concerns = data.concerns.filter(c => validConcerns.includes(c));

    try {
      const response = await fetch('/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log('🧠 ML Prediction:', result);

      const routineOutput = document.getElementById('routineOutput');
      const routineCards = document.getElementById('routineCards');
      if (!routineOutput || !routineCards) return;

      routineOutput.style.display = 'block';
      routineCards.innerHTML = '';

      const routineSteps = [
        { step: 'Cleanser', productName: result.cleanser },
        { step: 'Toner', productName: result.toner },
        { step: 'Moisturizer', productName: result.moisturizer }
      ];

      const modelProductMap = {
  "Gentle Facial Cleanser": "cleanser",
  "Micellar Facial Cleanser": "micellar",
  "Cream Cleanser": "cleanser",
  "Deep Clean Balm": "deep-clean-balm",
  "Pure Oil Cleanser": "oil-cleanser",

  "Refreshing Toner": "refresh-toner",
  "Hydrating Toner": "refresh-toner",
  "Soothing Toner": "refresh-toner",            // ✅ added

  "Hydrating Moisturizer": "moisturizer",
  "Hydration Boost Cream": "hydration-boost",
  "Hydration Booster Cream": "hydration-booster",
  "Anti-Aging Cream": "hydration-booster",
  "Deep Repair Moisturizer": "hydration-booster",  // ✅ added

  "Glow Cream": "glow-cream",
  "Super Aqua Snail Cream": "snail-cream",
  "Butter Smooth Cream SPF50+/PA+++": "butter-smooth",

  "Clarifying Emulsion": "clarifying-emulsion",
  "Salicylic Cleanser": "clarifying-emulsion",      // ✅ added

  "Dewy Glow Jelly Cream": "dewy-jelly",
  "Glow Serum": "glow-serum",
  "Rejuvenating Face Serum": "serum",

  "Glow Face Mask": "facemask",
  "Glow Face Mask (Mask version)": "glow-mask",

  "Revitalizing Eye Cream": "eyecream",
  "Brightening Eye Cream": "brightening-eye",

  "COCO & EYE - Seed Oil SPF50+/PA+++": "seed-oil",
  "P:rem Sun Cream SPF50+/PA+++": "prem-suncream",
  "SPF50+ Sun Shield": "sun-shield"
};


      if (!window.skincareProducts) {
        console.error("❌ 'skincareProducts' not defined on window");
        return;
      }

      routineSteps.forEach((item, index) => {
        const mappedId = modelProductMap[item.productName];
        if (!mappedId) {
          console.warn(`⚠️ No mapping for: ${item.productName}`);
          return;
        }

        const product = window.skincareProducts.find(p => p.id === mappedId);
        if (!product) {
          console.warn(`⚠️ Product not found for ID: ${mappedId}`);
          return;
        }

        const tips = {
          "Cleanser": "Cleansers remove dirt and oil. Use a gentle cleanser suited to your skin type.",
          "Toner": "Toners balance your skin's pH and prepare it for better product absorption.",
          "Moisturizer": "Moisturizers lock in hydration and strengthen your skin barrier."
        };

        const card = document.createElement('div');
        card.className = 'routine-card guide-card';
        card.innerHTML = `
          <h3>Step ${index + 1}: ${item.step}</h3>
          <p class="step-tip">${tips[item.step]}</p>
          <div class="product-block">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
              <h4>${product.name}</h4>
              <p><strong>Ingredients:</strong> ${product.ingredients.join(', ')}</p>
              <p><strong>How to use:</strong> ${product.usage}</p>
              <p><strong>Price:</strong> ₹${product.price}</p>
              <button class="routine-btn" onclick='window.addToCart(${JSON.stringify(product).replace(/'/g, "&apos;")})'>
                Add to Cart
              </button>
            </div>
          </div>
        `;
        routineCards.appendChild(card);
      });

    } catch (err) {
      console.error('❌ Error fetching prediction:', err);
      alert('Oops! Something went wrong. Try again later.');
    }
  });
});

// ✅ EXPORT CART METHODS
window.addToCart = addToCart;
window.changeQty = changeQty;
window.toggleCart = toggleCart;
window.updateCartUI = updateCartUI;
