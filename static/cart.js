let cart = {};

function addToCart(product) {
  const id = product.id;
  if (cart[id]) {
    cart[id].qty += 1;
  } else {
    cart[id] = { ...product, qty: 1 };
  }
  updateCartUI();
  document.getElementById("cartContainer").classList.remove("hidden"); // Show cart on add
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

// === Unified DOM Ready and Page Load Handler ===
window.addEventListener('DOMContentLoaded', () => {
  const swirlBtn = document.getElementById('swirlBtn');
  const shopAllLink = document.getElementById('shopAllLink');
  const goBackBtn = document.getElementById('goBackBtn');

  if (swirlBtn) swirlBtn.addEventListener('click', swirl);

  if (shopAllLink) {
    shopAllLink.addEventListener('click', function (e) {
      e.preventDefault();
      scrollEnabled = false;
      swirl();
      setTimeout(() => {
        window.location.href = this.href;
      }, 1000);
    });
  }

  if (goBackBtn) {
    goBackBtn.addEventListener('click', () => window.history.back());
  }
});

window.addEventListener('load', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const fromGoBack = urlParams.get('goback') === '1';

  swirl();
  setTimeout(() => {
    scrollEnabled = true;
  }, 1200);

  if (fromGoBack) window.scrollTo(0, 0);
});

// === Expose cart functions globally ===
window.addToCart = addToCart;
window.toggleCart = toggleCart;
window.changeQty = changeQty;
window.updateCartUI = updateCartUI;

document.addEventListener('DOMContentLoaded', () => {
  const closeCartBtn = document.getElementById('closeCartBtn');
  if (closeCartBtn) {
    closeCartBtn.addEventListener('click', () => {
      document.getElementById('cartContainer').classList.add('hidden');
    });
  }

  const cartIcon = document.querySelector('.icon-block.cart'); // or use your actual cart icon class
  if (cartIcon) {
    cartIcon.addEventListener('click', () => {
      toggleCart();
    });
  }
});
