(() => {
  'use strict';

  const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80';
  const image = (id, width = 700) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;
  const pictures = {
    cheese: image('photo-1513104890138-7c749659a591'),
    pepperoni: image('photo-1571407970349-bc81e7e96d47'),
    white: image('photo-1689793606720-be22e34c9322'),
    square: image('photo-1700760934249-93efbb574d23'),
    supreme: image('photo-1604382354936-07c5d9983bd3'),
    vodka: image('photo-1692737580547-b45bb4a02356'),
    margherita: image('photo-1579751626657-72bc17010498'),
    mushroom: image('photo-1732827097511-4fb032f7bac4'),
    sausage: image('photo-1651978595426-47215f753697'),
    buffalo: 'https://131230587.cdn6.editmysite.com/uploads/1/3/1/2/131230587/MNXBSVVCKLVI2FRLQ4TLOPHG.jpeg?optimize=medium&width=1200',
    mediterranean: image('photo-1751368647711-2e2ee6d0b7c6'),
    vegan: 'https://images.happycow.net/venues/1024/14/74/hcmp147437_1742181.jpeg',
    salad: image('photo-1512621776951-a57141f2eefd'),
    caesar: image('photo-1546793665-c74683f339c1'),
    knots: image('photo-1743075222567-4f0f2bd75f86'),
    roll: image('photo-1509440159596-0249088772ff'),
    chicken: image('photo-1604503468506-a8da13d82791'),
    marinara: image('photo-1547595628-c61a29f496f0'),
    pesto: image('photo-1547595628-c61a29f496f0'),
    honey: image('photo-1587049352846-4a222e784d38'),
    soda: image('photo-1554866585-cd94860890b7'),
    sparkling: image('photo-1544145945-f90425340c7e'),
    tea: image('photo-1556679343-c7306c1976bc'),
    water: image('photo-1523362628745-0c100150b504'),
    juice: image('photo-1600271886742-f049cd451bba'),
    cookie: image('photo-1499636136210-6f4ee915583e')
  };

  const categories = {
    all: { label: 'All Menu Items', note: 'Browse the full menu. Select a plus to build your demo cart.' },
    featured: { label: 'Featured Items', note: 'A few favorites to get you started.' },
    large: { label: 'Large Pizzas', note: '18 inch. Available in 16 inch square crust for an extra charge. Gluten free crust substitution only available for 14 inch medium pies.' },
    medium: { label: 'Medium Pizzas', note: '14 inch. Available in Gluten-free crust for an extra charge.' },
    salads: { label: 'Salads', note: 'Small and large salads for the table.' },
    appetizers: { label: 'Appetizers & Dippers', note: 'Served with side of marinara where specified.' },
    beverages: { label: 'Beverages', note: 'Coke products, soda, tea, and more.' },
    desserts: { label: 'Desserts', note: 'A sweet bite to finish.' },
    utensils: { label: 'Utensils', note: 'Listed for reference only. Pricing and availability have not been confirmed.' }
  };

  const products = [];
  const addProduct = (id, name, description, price, category, photo, groups = []) => {
    products.push({ id, name, description, price, category, image: pictures[photo], groups: [category, ...groups] });
  };
  const addPizza = (size, slug, name, description, price, photo, featured = false) => {
    const category = size === 'Large' ? 'large' : 'medium';
    const id = `${size.toLowerCase()}-${slug}`;
    addProduct(id, `${size} ${name}`, description, price, category, photo, featured ? ['featured'] : []);
  };

  // Featured entries point to the same product IDs used in the size categories.
  addPizza('Large', 'cheese', 'Cheese', 'Grande Mozzarella & Tomato Sauce', 26, 'cheese', true);
  addPizza('Medium', 'cheese', 'Cheese', 'Grande Mozzarella & Tomato Sauce', 19, 'cheese', true);
  addPizza('Large', 'cup-char-pepperoni', 'Cup & Char Pepperoni', 'Grande Mozzarella, Cup and Char Pepperoni & Tomato Sauce', 29.5, 'pepperoni', true);

  const largePizzas = [
    ['large-white', 'Large White', 'Grande Mozzarella, Fresh Mozzarella, Parsley Ricotta, Grana Padano & Garlic', 30.5, 'white'],
    ['large-square', 'Large Square', 'Fresh Mozzarella, Grana Padano, Basil, Olive Oil & Tomato Sauce on a Grandma Crust', 30, 'square'],
    ['large-supreme', 'Large Supreme', 'Fresh Mozzarella, Grana Padano, Soppressata, Paisanos Italian Sausage, Capicola, Basil, Olive Oil & Tomato Sauce on a Grandma Crust', 34, 'supreme'],
    ['large-vodka-roni-square', 'Large Vodka Roni Square', 'Vodka Sauce, Fresh Mozzarella, Grana Padano, Cup & Char Pepperoni and Hot Honey', 34, 'vodka'],
    ['large-margherita', 'Large Margherita', 'Fresh Mozzarella, Pecorino, Basil, Olive Oil & Tomato Sauce', 30.5, 'margherita'],
    ['large-mushroom', 'Large Mushroom', 'Grande Mozzarella, Porcini Ricotta, Cremini and Shiitake Mushrooms on a White Pie', 32.25, 'mushroom'],
    ['large-san-gennaro', 'Large San Gennaro', 'Grande Mozzarella, Paisanos Italian Sausage, Cherry Peppers & Tomato Sauce', 32.25, 'sausage'],
    ['large-buffalo', 'Large Buffalo', 'Grande Mozzarella, Blue Cheese, Homemade Buffalo Chicken & Scallions', 32.25, 'buffalo'],
    ['large-mediterranean', 'Large Mediterranean', 'Grande Mozzarella, Feta, Spinach, Red Onion, Marinated Eggplant & Tomato Pesto', 32.25, 'mediterranean'],
    ['large-french-onion', 'Large French Onion', 'Grande Mozzarella, Grana Padano, Gruyere & Caramelized Onion on a White Pie', 32.25, 'white'],
    ['large-vegan-roni', 'Large Vegan Roni', 'Vegan Mozzarella, Be-Hive Vegan Pepperoni & Tomato Sauce', 33.25, 'vegan'],
    ['large-vegan', 'Large Vegan', 'Vegan Mozzarella, Spinach, Cremini Mushrooms, Yellow Peppers, Red Onion, Garlic & Tomato Pesto', 33.25, 'vegan'],
    ['large-vegan-san-gennaro', 'Large Vegan San Gennaro', 'Vegan Mozzarella, Vegan Sausage, Cherry Peppers & Tomato Sauce', 33.25, 'vegan']
  ];
  largePizzas.forEach(([id, name, description, price, photo]) => addProduct(id, name, description, price, 'large', photo));

  const mediumPizzas = [
    ['medium-cup-char-pepperoni', 'Medium Cup & Char Pepperoni', 'Grande Mozzarella, Cup and Char Pepperoni & Tomato Sauce', 21, 'pepperoni'],
    ['medium-white', 'Medium White', 'Grande Mozzarella, Fresh Mozzarella, Parsley Ricotta, Grana Padano & Garlic', 21.5, 'white'],
    ['medium-margherita', 'Medium Margherita', 'Fresh Mozzarella, Pecorino, Basil, Olive Oil & Tomato Sauce', 21.5, 'margherita'],
    ['medium-mushroom', 'Medium Mushroom', 'Grande Mozzarella, Porcini Ricotta, Cremini, Shiitake Mushrooms, on a White Pie', 21, 'mushroom'],
    ['medium-san-gennaro', 'Medium San Gennaro', 'Grande Mozzarella, Paisanos Italian Sausage, Cherry Peppers & Tomato Sauce', 21, 'sausage'],
    ['medium-buffalo', 'Medium Buffalo', 'Grande Mozzarella, Blue Cheese, Homemade Buffalo Chicken & Scallions', 21, 'buffalo'],
    ['medium-mediterranean', 'Medium Mediterranean', 'Grande Mozzarella, Feta, Spinach, Red Onion, Marinated Eggplant & Tomato Pesto', 21, 'mediterranean'],
    ['medium-french-onion', 'Medium French Onion', 'Grande Mozzarella, Grana Padano, Gruyere & Caramelized Onion on a White Pie', 21, 'white'],
    ['medium-vegan-roni', 'Medium Vegan Roni', 'Vegan Mozzarella, Be-Hive Vegan Pepperoni & Tomato Sauce', 22, 'vegan'],
    ['medium-vegan', 'Medium Vegan', 'Vegan Mozzarella, Spinach, Cremini Mushrooms, Green Peppers, Red Onion, Garlic & Tomato Pesto', 22, 'vegan'],
    ['medium-vegan-san-gennaro', 'Medium Vegan San Gennaro', 'Vegan Mozzarella, Vegan Sausage, Cherry Peppers & Tomato Sauce', 22, 'vegan']
  ];
  mediumPizzas.forEach(([id, name, description, price, photo]) => addProduct(id, name, description, price, 'medium', photo));

  [
    ['small-house-salad', 'Small- House Salad', 'Romaine, Cherry Tomato, Red Onion, Chic Peas & Our Classic Italian Dressing', 8, 'salad'],
    ['small-caesar', 'Small- Caesar', 'Romaine, Pecorino, Croutons & Our House-Made Dressing', 9, 'caesar'],
    ['large-house-salad', 'Large- House Salad', 'Romaine, Cherry Tomato, Red Onion, Chic Peas & Our Classic Italian Dressing (Feeds 6 to 8 People)', 32, 'salad'],
    ['large-caesar', 'Large- Caesar', 'Romaine, Pecorino, Croutons & Our House-Made Dressing (Feeds 6 to 8 People)', 36, 'caesar']
  ].forEach(([id, name, description, price, photo]) => addProduct(id, name, description, price, 'salads', photo));

  [
    ['garlic-knot-1', 'Garlic Knot (1)', 'Served with a side of marinara', 1.5, 'knots'],
    ['parlor-roll', 'The Parlor Roll', 'Sausage, pepperoni, Grande Mozzarella, pecorino, garlic and parsley. Served with a side of marinara', 7.5, 'roll'],
    ['chicken-parm-roll', 'The Chicken Parm Roll', 'Breaded chicken, tomato sauce, Grande Mozzarella, garlic and parsley. Served with a side of marinara.', 7.5, 'chicken'],
    ['marinara-dipper-3oz', 'Marinara Dipper (3 Oz.)', '', 2, 'marinara'],
    ['blue-cheese-dipper-3oz', 'Blue Cheese Dipper (3 Oz.)', '', 3, 'caesar'],
    ['tomato-pesto-dipper-3oz', 'Tomato Pesto Dipper (3 Oz.)', '', 3, 'pesto'],
    ['mikes-hot-honey-dipper-3oz', "Mike's Hot Honey Dipper (3 Oz.)", '', 5, 'honey']
  ].forEach(([id, name, description, price, photo]) => addProduct(id, name, description, price, 'appetizers', photo));

  [
    ['coke-products', 'Coke Products', 'Coke, Diet Coke, Sprite', 2, 'soda'],
    ['boylans-soda', "Boylan's Soda", 'Root Beer, Diet Root Beer, Black Cherry, Grape, Cream soda, Orange, Ginger Ale', 3, 'sparkling'],
    ['brooklyn-best', 'Brooklyn Best', 'Peach Tea, Lemon Tea, Lemonade, Half and Half.', 5, 'tea'],
    ['poland-spring-water', 'Poland Spring Water', '', 1.75, 'water'],
    ['a-siciliana-italian-sodas', "A' Siciliana Italian Sodas", 'Orange, Blood Orange, Grapefruit, Lemon.', 4, 'sparkling'],
    ['motts-apple-juice', "Mott's Apple Juice", '', 1.5, 'juice']
  ].forEach(([id, name, description, price, photo]) => addProduct(id, name, description, price, 'beverages', photo));

  addProduct('chocolate-chip-cookie', 'Chocolate Chip Cookie', 'House-Made Chocolate Chip Cookies', 1, 'desserts', 'cookie');

  const featuredIds = new Set(['large-cheese', 'medium-cheese', 'large-cup-char-pepperoni']);
  const categoryFilters = [...document.querySelectorAll('.filter')];
  const productGrid = document.querySelector('#menu-products');
  const categoryNote = document.querySelector('#category-note');
  const utensilNote = document.querySelector('#utensil-note');
  const searchInput = document.querySelector('#menu-search');
  const cart = new Map();
  let activeCategory = 'all';
  let toastTimer;

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
  const money = (value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  const pictureAlt = (product) => `Representative menu photo for ${product.name}; not an official restaurant image`;
  const renderMenu = () => {
    const search = searchInput.value.trim().toLocaleLowerCase();
    const definition = categories[activeCategory];
    categoryNote.textContent = definition.note;
    utensilNote.hidden = activeCategory !== 'utensils' || Boolean(search);
    let visible = products.filter((product) => {
      const categoryMatch = activeCategory === 'all' || product.groups.includes(activeCategory) || (activeCategory === 'featured' && featuredIds.has(product.id));
      const textMatch = !search || `${product.name} ${product.description} ${categories[product.category].label}`.toLocaleLowerCase().includes(search);
      return categoryMatch && textMatch;
    });
    if (activeCategory === 'featured') visible = visible.filter((product) => featuredIds.has(product.id));
    if (activeCategory === 'utensils') visible = [];
    if (!visible.length) {
      productGrid.innerHTML = `<div class="empty-results"><h3>No menu items found.</h3><p>Try another search or browse a different category.</p></div>`;
      return;
    }
    productGrid.innerHTML = visible.map((product) => `
      <article class="dish-card" data-product-id="${product.id}">
        <div class="dish-photo"><img src="${product.image}" alt="${escapeHtml(pictureAlt(product))}" loading="lazy"><span class="dish-type">${escapeHtml(categories[product.category].label.replace(' Pizzas', '').replace('Appetizers & Dippers', 'APPETIZER'))}</span></div>
        <div class="dish-info"><div class="dish-title"><h3>${escapeHtml(product.name)}</h3><span>${money(product.price)}</span></div>
          <p class="dish-description">${escapeHtml(product.description || 'Description not provided.')}</p>
          <div class="dish-meta"><small>${product.category === 'large' || product.category === 'medium' ? (product.category === 'large' ? '18 inch' : '14 inch') : 'Little Pizza Parlor'}</small><button class="add-to-cart" type="button" data-add="${product.id}" aria-label="Add ${escapeHtml(product.name)} to cart"><span aria-hidden="true">+</span></button></div>
        </div>
      </article>`).join('');
    productGrid.querySelectorAll('.dish-card img').forEach(setImageFallback);
  };

  function setImageFallback(img) {
    img.addEventListener('error', () => {
      if (img.dataset.fallback === 'used') return;
      img.dataset.fallback = 'used';
      img.src = FALLBACK_IMAGE;
    });
  }

  categoryFilters.forEach((button) => button.addEventListener('click', () => {
    activeCategory = button.dataset.filter;
    categoryFilters.forEach((filter) => {
      const selected = filter === button;
      filter.classList.toggle('active', selected);
      filter.setAttribute('aria-pressed', String(selected));
    });
    renderMenu();
  }));
  searchInput.addEventListener('input', renderMenu);

  const drawer = document.querySelector('.cart-drawer');
  const backdrop = document.querySelector('.cart-backdrop');
  const cartTrigger = document.querySelector('.cart-trigger');
  const cartContent = document.querySelector('.cart-content');
  const toast = document.querySelector('.cart-toast');
  const quantityTotal = () => [...cart.values()].reduce((total, item) => total + item.quantity, 0);
  const subtotal = () => [...cart.values()].reduce((total, item) => total + item.price * item.quantity, 0);

  const renderCart = () => {
    const count = quantityTotal();
    document.querySelectorAll('.cart-count').forEach((badge) => { badge.textContent = String(count); });
    drawer.querySelector('.cart-subtotal b').textContent = money(subtotal());
    drawer.querySelector('.cart-checkout').disabled = cart.size === 0;
    if (!cart.size) {
      cartContent.innerHTML = '<div class="cart-empty"><span aria-hidden="true">✳</span><h3>Your bag is taking a little break.</h3><p>Add a favorite from the menu and it will show up here.</p><button class="button button-outline cart-browse" type="button">Browse the menu</button></div>';
      cartContent.querySelector('.cart-browse').addEventListener('click', () => { closeCart(); document.querySelector('#menu').scrollIntoView({ behavior: 'smooth' }); });
      return;
    }
    cartContent.innerHTML = [...cart.values()].map((item) => `
      <article class="cart-item" data-cart-item="${item.id}"><img src="${item.image}" alt="" loading="lazy">
        <div class="cart-item-info"><h3>${escapeHtml(item.name)}</h3><span>${money(item.price)} each</span>
          <div class="quantity-control" aria-label="Quantity for ${escapeHtml(item.name)}"><button type="button" data-quantity="-1" aria-label="Decrease ${escapeHtml(item.name)} quantity">−</button><span>${item.quantity}</span><button type="button" data-quantity="1" aria-label="Increase ${escapeHtml(item.name)} quantity">+</button></div>
        </div><button class="remove-item" type="button" data-remove aria-label="Remove ${escapeHtml(item.name)}">Remove</button>
      </article>`).join('');
    cartContent.querySelectorAll('.cart-item img').forEach(setImageFallback);
  };

  const announce = (message) => {
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2300);
  };
  const closeNav = () => {
    const toggle = document.querySelector('.menu-toggle');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    document.querySelector('.nav-links').classList.remove('open');
    document.body.classList.remove('menu-open');
  };
  const openCart = () => {
    closeNav();
    drawer.classList.add('is-open');
    backdrop.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    cartTrigger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('cart-open');
    drawer.querySelector('.cart-close').focus();
  };
  const closeCart = () => {
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    cartTrigger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('cart-open');
    cartTrigger.focus();
  };
  cartTrigger.addEventListener('click', openCart);
  document.querySelectorAll('[data-open-cart]').forEach((button) => button.addEventListener('click', openCart));
  drawer.querySelector('.cart-close').addEventListener('click', closeCart);
  backdrop.addEventListener('click', closeCart);

  productGrid.addEventListener('click', (event) => {
    const button = event.target.closest('[data-add]');
    if (!button) return;
    const product = products.find((entry) => entry.id === button.dataset.add);
    if (!product) return;
    const existing = cart.get(product.id);
    if (existing) existing.quantity += 1;
    else cart.set(product.id, { ...product, quantity: 1 });
    renderCart();
    button.classList.add('added');
    window.setTimeout(() => button.classList.remove('added'), 500);
    announce(`${product.name} added to your bag`);
  });
  cartContent.addEventListener('click', (event) => {
    const row = event.target.closest('[data-cart-item]');
    if (!row) return;
    const item = cart.get(row.dataset.cartItem);
    if (!item) return;
    if (event.target.closest('[data-remove]')) cart.delete(item.id);
    else {
      const change = Number(event.target.closest('[data-quantity]')?.dataset.quantity);
      if (!change) return;
      item.quantity += change;
      if (item.quantity <= 0) cart.delete(item.id);
    }
    renderCart();
  });

  const checkout = document.querySelector('.checkout-modal');
  const checkoutFormView = document.querySelector('.checkout-form-view');
  const checkoutSuccess = document.querySelector('.checkout-success');
  const checkoutSummary = document.querySelector('.checkout-summary');
  const renderSummary = (target) => {
    target.innerHTML = [...cart.values()].map((item) => `<div class="summary-line"><span>${item.quantity} × ${escapeHtml(item.name)}</span><span>${money(item.price * item.quantity)}</span></div>`).join('') + `<div class="summary-line summary-total"><span>Demo total</span><span>${money(subtotal())}</span></div>`;
  };
  const startCheckout = () => {
    if (!cart.size) return;
    renderSummary(checkoutSummary);
    checkoutFormView.hidden = false;
    checkoutSuccess.hidden = true;
    document.querySelector('.form-error').hidden = true;
    checkout.showModal();
    checkout.querySelector('[name="firstName"]').focus();
  };
  drawer.querySelector('.cart-checkout').addEventListener('click', startCheckout);
  document.querySelector('.checkout-close').addEventListener('click', () => checkout.close());
  checkout.addEventListener('click', (event) => { if (event.target === checkout) checkout.close(); });
  checkout.addEventListener('close', () => { if (drawer.classList.contains('is-open')) drawer.querySelector('.cart-close').focus(); });
  document.querySelector('#checkout-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const digits = String(values.get('phone') || '').replace(/\D/g, '');
    const error = document.querySelector('.form-error');
    if (digits.length < 10) {
      error.textContent = 'Enter a phone number with at least 10 digits.';
      error.hidden = false;
      form.querySelector('[name="phone"]').focus();
      return;
    }
    const fullName = `${values.get('firstName')} ${values.get('lastName')}`.trim();
    checkoutSuccess.querySelector('.success-copy').textContent = `Thanks, ${fullName}. This frontend demo did not send your order to Little Pizza Parlor, and no payment was processed.`;
    renderSummary(checkoutSuccess.querySelector('.success-summary'));
    checkoutFormView.hidden = true;
    checkoutSuccess.hidden = false;
    checkoutSuccess.querySelector('.checkout-done').focus();
    cart.clear();
    renderCart();
    form.reset();
  });
  document.querySelector('.checkout-done').addEventListener('click', () => {
    checkout.close();
    closeCart();
    document.querySelector('#menu').scrollIntoView({ behavior: 'smooth' });
  });

  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));

  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = lightbox.querySelector('img');
  document.querySelectorAll('.gallery-item').forEach((item) => item.addEventListener('click', () => {
    lightboxImage.src = item.dataset.full;
    lightboxImage.alt = item.querySelector('img').alt;
    lightbox.showModal();
  }));
  lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });

  const backTop = document.querySelector('.back-top');
  const updateBackTop = () => backTop.classList.toggle('visible', window.scrollY > 500);
  window.addEventListener('scroll', updateBackTop, { passive: true });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); currentObserver.unobserve(entry.target); }
    }), { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else revealItems.forEach((item) => item.classList.add('in-view'));

  setImageFallback(document.querySelector('.hero-image'));
  document.querySelectorAll('.intro-image img,.feature-photo img,.gallery-item img').forEach(setImageFallback);
  document.querySelector('#year').textContent = String(new Date().getFullYear());
  renderMenu();
  renderCart();
})();
