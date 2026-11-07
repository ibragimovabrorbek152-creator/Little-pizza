(() => {
  const ORDER_URL = 'https://order.toasttab.com/online/littlepizzaparlor';
  const navToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  const cart = new Map();

  const closeNav = () => {
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
  };
  navToggle.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') !== 'true';
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));

  const cartMarkup = `
    <div class="cart-backdrop" data-cart-close></div>
    <aside class="cart-drawer" id="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title" aria-hidden="true">
      <div class="cart-head"><div><p class="eyebrow">YOUR LITTLE LINEUP</p><h2 id="cart-title">Your bag <span class="cart-count">0</span></h2></div><button class="icon-button cart-close" type="button" aria-label="Close shopping bag">×</button></div>
      <div class="cart-content"></div>
      <div class="cart-foot"><div class="cart-subtotal"><span>Sample subtotal</span><b>$0</b></div><p>Sample menu prices for concept purposes. Orders are placed through the restaurant’s official ordering page.</p><a class="button button-gold cart-order" href="${ORDER_URL}" target="_blank" rel="noopener noreferrer">Order online <span>↗</span></a></div>
    </aside>
    <div class="cart-toast" role="status" aria-live="polite"></div>`;
  document.body.insertAdjacentHTML('beforeend', cartMarkup);

  const cartTrigger = document.createElement('button');
  cartTrigger.className = 'cart-trigger';
  cartTrigger.type = 'button';
  cartTrigger.setAttribute('aria-label', 'Open shopping bag');
  cartTrigger.setAttribute('aria-controls', 'cart-drawer');
  cartTrigger.setAttribute('aria-expanded', 'false');
  cartTrigger.innerHTML = '<svg class="cart-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg><span class="cart-trigger-label">Bag</span><span class="cart-count" aria-live="polite">0</span>';
  nav.append(cartTrigger);

  const drawer = document.querySelector('.cart-drawer');
  const backdrop = document.querySelector('.cart-backdrop');
  const content = document.querySelector('.cart-content');
  const toast = document.querySelector('.cart-toast');
  const money = (value) => `$${value.toFixed(2)}`;
  let toastTimer;

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
  const announce = (message) => {
    toast.textContent = message;
    toast.classList.add('is-visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2400);
  };
  const quantityTotal = () => [...cart.values()].reduce((sum, item) => sum + item.quantity, 0);
  const updateCart = () => {
    const count = quantityTotal();
    document.querySelectorAll('.cart-count').forEach((badge) => { badge.textContent = String(count); });
    const subtotal = [...cart.values()].reduce((sum, item) => sum + item.price * item.quantity, 0);
    drawer.querySelector('.cart-subtotal b').textContent = money(subtotal);
    if (!cart.size) {
      content.innerHTML = '<div class="cart-empty"><span aria-hidden="true">✳</span><h3>Your bag is taking a little break.</h3><p>Add a favorite from the menu and it’ll show up here.</p><button class="button button-outline cart-browse" type="button">Browse the menu</button></div>';
      content.querySelector('.cart-browse').addEventListener('click', () => {
        closeCart();
        document.querySelector('#menu').scrollIntoView({ behavior: 'smooth' });
      });
      return;
    }
    content.innerHTML = [...cart.values()].map((item) => `
      <article class="cart-item" data-cart-item="${item.id}">
        <img src="${item.image}" alt="" loading="lazy">
        <div class="cart-item-info"><h3>${item.name}</h3><span>${money(item.price)}</span>
          <div class="quantity-control" aria-label="Quantity for ${item.name}"><button type="button" data-quantity="-1" aria-label="Decrease ${item.name} quantity">−</button><span>${item.quantity}</span><button type="button" data-quantity="1" aria-label="Increase ${item.name} quantity">+</button></div>
        </div><button class="remove-item" type="button" data-remove aria-label="Remove ${item.name}">Remove</button>
      </article>`).join('');
  };

  cartTrigger.addEventListener('click', openCart);
  drawer.querySelector('.cart-close').addEventListener('click', closeCart);
  backdrop.addEventListener('click', closeCart);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeNav();
      if (drawer.classList.contains('is-open')) closeCart();
      const lightbox = document.querySelector('.lightbox');
      if (lightbox.open) lightbox.close();
    }
  });

  document.querySelectorAll('.dish-card').forEach((card, index) => {
    const priceEl = card.querySelector('[data-price]') || card.querySelector('.dish-title > span');
    const price = Number(priceEl.dataset.price || priceEl.textContent.replace(/[^\d.]/g, ''));
    const name = card.querySelector('h3').textContent.trim();
    const image = card.querySelector('img').src;
    const id = `menu-${index}`;
    card.dataset.productId = id;
    const action = document.createElement('button');
    action.type = 'button';
    action.className = 'add-to-cart';
    action.setAttribute('aria-label', `Add ${name} to bag`);
    action.innerHTML = '<span aria-hidden="true">+</span><span class="add-label">Add</span>';
    card.querySelector('.dish-info').append(action);
    action.addEventListener('click', () => {
      const existing = cart.get(id);
      if (existing) existing.quantity += 1;
      else cart.set(id, { id, name, price, image, quantity: 1 });
      updateCart();
      announce(`${name} added to your bag`);
      action.classList.add('added');
      window.setTimeout(() => action.classList.remove('added'), 550);
    });
  });
  content.addEventListener('click', (event) => {
    const row = event.target.closest('[data-cart-item]');
    if (!row) return;
    const item = cart.get(row.dataset.cartItem);
    if (event.target.closest('[data-remove]')) cart.delete(item.id);
    else {
      const change = Number(event.target.closest('[data-quantity]')?.dataset.quantity);
      if (!change) return;
      item.quantity += change;
      if (item.quantity < 1) cart.delete(item.id);
    }
    updateCart();
  });
  updateCart();

  document.querySelectorAll('.filter').forEach((button) => {
    button.addEventListener('click', () => {
      const category = button.dataset.filter;
      document.querySelectorAll('.filter').forEach((filter) => {
        const selected = filter === button;
        filter.classList.toggle('active', selected);
        filter.setAttribute('aria-pressed', String(selected));
      });
      document.querySelectorAll('.dish-card').forEach((card) => {
        card.hidden = category !== 'all' && card.dataset.category !== category;
      });
    });
  });

  const lightbox = document.querySelector('.lightbox');
  const lightboxImage = lightbox.querySelector('img');
  document.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', () => {
      lightboxImage.src = item.dataset.full;
      lightboxImage.alt = item.querySelector('img').alt;
      lightbox.showModal();
    });
  });
  lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });

  const backTop = document.querySelector('.back-top');
  const updateBackTop = () => backTop.classList.toggle('visible', window.scrollY > 500);
  window.addEventListener('scroll', updateBackTop, { passive: true });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  updateBackTop();

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); currentObserver.unobserve(entry.target); }
    }), { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else revealItems.forEach((item) => item.classList.add('in-view'));
  document.querySelector('#year').textContent = String(new Date().getFullYear());
})();
