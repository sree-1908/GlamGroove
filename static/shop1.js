document.querySelector('.apply-btn').addEventListener('click', function() {
  const selectedTypes = Array.from(document.querySelectorAll('input[name="product-type"]:checked')).map(cb => cb.value);
  const selectedIngredients = Array.from(document.querySelectorAll('input[name="ingredient"]:checked')).map(cb => cb.value);
  const selectedSkinTypes = Array.from(document.querySelectorAll('input[name="skin-type"]:checked')).map(cb => cb.value);
  const maxPrice = parseInt(document.getElementById('priceRange').value);

  let visibleCount = 0;

  document.querySelectorAll('.shop-card').forEach(card => {
    const type = card.dataset.type;
    const ingredient = card.dataset.ingredient;
    const skin = card.dataset.skin;
    const price = parseInt(card.dataset.price);

    const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(type);
    const ingredientMatch = selectedIngredients.length === 0 || selectedIngredients.includes(ingredient);
    const skinMatch = selectedSkinTypes.length === 0 || selectedSkinTypes.includes(skin);
    const priceMatch = price <= maxPrice;

    if (typeMatch && ingredientMatch && skinMatch && priceMatch) {
      card.style.display = 'block';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  // ✅ Show or hide the message
  if (visibleCount === 0) {
    document.getElementById('no-results').style.display = 'block';
  } else {
    document.getElementById('no-results').style.display = 'none';
  }
});
