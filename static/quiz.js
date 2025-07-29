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
  document.getElementById("cartContainer").classList.toggle("hidden");
}

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

  // ✅ QUIZ LOGIC — STEP-BY-STEP GUIDE
  const form = document.getElementById('skinQuizForm');
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    data.concerns = formData.getAll('concerns');

    try {
      const response = await fetch("/predict", {
          method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      console.log('🧠 ML Prediction:', result);

      const routineOutput = document.getElementById('routineOutput');
      const routineCards = document.getElementById('routineCards');
      routineOutput.style.display = 'block';
      routineCards.innerHTML = '';

      const routineSteps = [
        { step: 'Cleanser', productName: result.cleanser },
        { step: 'Toner', productName: result.toner },
        { step: 'Moisturizer', productName: result.moisturizer }
      ];

      // ✅ Model → Product mapping
      const modelProductMap = {
        "Gentle Facial Cleanser": "micellar",
        "Refreshing Toner": "refresh-toner",
        "Hydrating Moisturizer": "hydration-boost"
        // Add more if needed
      };

      routineSteps.forEach((item, index) => {
        const mappedId = modelProductMap[item.productName];
        if (!mappedId) {
          console.warn(`⚠️ No mapping found for: ${item.productName}`);
          return;
        }

        const product = window.skincareProducts.find(p => p.id === mappedId);
        if (!product) {
          console.warn(`⚠️ Product ID "${mappedId}" not found.`);
          return;
        }

        // 🧴 Add a helpful tip for each step
        let tip = '';
        if (item.step === 'Cleanser') {
          tip = "Cleansers remove dirt and oil. Use a gentle cleanser suited to your skin type.";
        } else if (item.step === 'Toner') {
          tip = "Toners balance your skin's pH and prepare it for better product absorption.";
        } else if (item.step === 'Moisturizer') {
          tip = "Moisturizers lock in hydration and strengthen your skin barrier.";
        }

        const card = document.createElement('div');
        card.className = 'routine-card guide-card';
        card.innerHTML = `
          <h3>Step ${index + 1}: ${item.step}</h3>
          <p class="step-tip">${tip}</p>
          <div class="product-block">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
              <h4>${product.name}</h4>
              <p><strong>Ingredients:</strong> ${product.ingredients.join(', ')}</p>
              <p><strong>How to use:</strong> ${product.usage}</p>
              <p><strong>Price:</strong> ₹${product.price}</p>
              <button class="routine-btn" onclick='addToCart(${JSON.stringify(product)})'>
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

// ✅ EXPORT GLOBALLY
window.addToCart = addToCart;
window.changeQty = changeQty;
window.toggleCart = toggleCart;
window.updateCartUI = updateCartUI;
