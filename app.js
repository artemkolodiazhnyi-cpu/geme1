// ─── DATA ────────────────────────────────────────────────────────────────────

const PRODUCTS = [
  { id: 'hoodie',        name: 'Oversized Hoodie',    price: 45,  sizes: ['S','M','L','XL'],        category: 'tops' },
  { id: 'cargo',         name: 'Cargo Pants',          price: 89,  sizes: ['XS','S','M','L'],        category: 'bottoms' },
  { id: 'sneakers',      name: 'Chunky Sneakers',      price: 120, sizes: ['36','37','38','39','40'], category: 'shoes' },
  { id: 'blazer',        name: 'Blazer',               price: 135, sizes: ['S','M','L'],             category: 'tops' },
  { id: 'trousers',      name: 'Wide-leg Trousers',    price: 79,  sizes: ['XS','S','M','L'],        category: 'bottoms' },
  { id: 'loafers',       name: 'Loafers',              price: 95,  sizes: ['36','37','38','39'],      category: 'shoes' },
  { id: 'shirt',         name: 'Linen Shirt',          price: 55,  sizes: ['S','M','L'],             category: 'tops' },
  { id: 'jeans',         name: 'Straight Jeans',       price: 70,  sizes: ['XS','S','M','L'],        category: 'bottoms' },
  { id: 'whitesneakers', name: 'White Sneakers',       price: 85,  sizes: ['36','37','38','39','40'], category: 'shoes' },
  { id: 'dress',         name: 'Slip Dress',           price: 99,  sizes: ['XS','S','M'],            category: 'dresses' },
  { id: 'heels',         name: 'Strappy Heels',        price: 110, sizes: ['36','37','38','39'],      category: 'shoes' },
  { id: 'bag',           name: 'Mini Bag',             price: 75,  sizes: ['One Size'],              category: 'accessories' },
  { id: 'tee',           name: 'Baby Tee',             price: 30,  sizes: ['XS','S','M'],            category: 'tops' },
  { id: 'skirt',         name: 'Mini Skirt',           price: 60,  sizes: ['XS','S','M'],            category: 'bottoms' },
  { id: 'boots',         name: 'Platform Boots',       price: 140, sizes: ['36','37','38','39'],      category: 'shoes' },
  { id: 'turtleneck',    name: 'Cashmere Turtleneck',  price: 180, sizes: ['S','M','L'],             category: 'tops' },
  { id: 'tailored',      name: 'Tailored Trousers',   price: 120, sizes: ['XS','S','M','L'],        category: 'bottoms' },
  { id: 'flats',         name: 'Ballet Flats',         price: 90,  sizes: ['36','37','38','39'],      category: 'shoes' },
  {
    id: 'rick-owens-ramones',
    name: 'Ramones High Transparent',
    price: 1290,
    sizes: ['36','37','38','39','40','41','42','43','44','45'],
    category: 'shoes',
    brand: 'Rick Owens',
    image: './RO RMNS Transparent.jpeg',
    description: `
      <div class="prod-desc-section">
        <h5 class="prod-desc-heading">Details</h5>
        <dl class="prod-desc-list">
          <div><dt>Season</dt><dd>Spring / Summer 2019 ("Babel")</dd></div>
          <div><dt>Model</dt><dd>Ramones High</dd></div>
          <div><dt>Color</dt><dd>Transparent / Clear</dd></div>
          <div><dt>Made in</dt><dd>Italy</dd></div>
        </dl>
      </div>
      <div class="prod-desc-section">
        <h5 class="prod-desc-heading">Materials</h5>
        <dl class="prod-desc-list">
          <div><dt>Upper</dt><dd>Transparent (translucent) calf leather — lightweight, soft, and semi-see-through. Naturally develops unique creasing and patina over time.</dd></div>
          <div><dt>Sole</dt><dd>Rubber outsole with signature Rick Owens toothed tread</dd></div>
          <div><dt>Lining</dt><dd>Leather</dd></div>
        </dl>
      </div>`
  }
];

const OUTFITS = [
  { id: 'street',  name: 'Street Chic',    items: ['hoodie','cargo','sneakers'],      recs: ['blazer','trousers','loafers'] },
  { id: 'office',  name: 'Office Ready',   items: ['blazer','trousers','loafers'],    recs: ['shirt','jeans','whitesneakers'] },
  { id: 'weekend', name: 'Weekend Casual', items: ['shirt','jeans','whitesneakers'],  recs: ['tee','skirt','boots'] },
  { id: 'evening', name: 'Evening Edit',   items: ['dress','heels','bag'],            recs: ['turtleneck','tailored','flats'] },
  { id: 'y2k',     name: 'Y2K Vibes',      items: ['tee','skirt','boots'],           recs: ['hoodie','cargo','sneakers'] },
  { id: 'minimal', name: 'Minimal Luxe',   items: ['turtleneck','tailored','flats'], recs: ['blazer','trousers','loafers'] }
];

// ─── STATE ───────────────────────────────────────────────────────────────────

let cart = [];
let currentUser = null;
let currentProductId = null;
let selectedSize = null;

// ─── INIT ────────────────────────────────────────────────────────────────────

function init() {
  cart = JSON.parse(localStorage.getItem('geme-cart') || '[]');
  currentUser = JSON.parse(localStorage.getItem('geme-user') || 'null');

  renderOutfits();
  renderRecommendations();
  renderProducts();
  attachEvents();
  initTheme();
  observeReveal();
  updateCartCount();
  updateAuthUI();
}

// ─── RENDER ──────────────────────────────────────────────────────────────────

function renderOutfits() {
  const grid = document.getElementById('outfitGrid');
  grid.innerHTML = OUTFITS.map(outfit => {
    const tags = outfit.items.map(pid => {
      const p = PRODUCTS.find(pr => pr.id === pid);
      return `<div class="tag-item" data-product="${pid}">
        <strong>${p.name}</strong><span>€${p.price}</span>
      </div>`;
    }).join('');
    return `
      <article class="outfit-card">
        <div class="outfit-visual"></div>
        <div class="outfit-copy">
          <h3 class="outfit-title">${outfit.name}</h3>
          <div class="outfit-tags">${tags}</div>
          <button class="shop-button" data-outfit="${outfit.id}">Shop the Look</button>
        </div>
      </article>`;
  }).join('');
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  grid.innerHTML = PRODUCTS.map(p => {
    const imgStyle = p.image
      ? ` style="background-image:url('${p.image}');background-size:contain;background-repeat:no-repeat;background-position:center;background-color:#f5f0eb;"`
      : '';
    const imgClass = p.image ? ' product-visual-img' : '';
    const brandLine = p.brand ? `<p class="product-card-brand">${p.brand}</p>` : '';
    return `
    <article class="product-card" data-product="${p.id}">
      <div class="product-visual${imgClass}"${imgStyle}></div>
      <div class="product-copy">
        ${brandLine}
        <h4 class="product-title">${p.name}</h4>
        <p class="product-price">€${p.price}</p>
        <button class="add-btn">View Details</button>
      </div>
    </article>`;
  }).join('');
}

function renderRecommendations() {
  const strip = document.getElementById('recsStrip');
  const pids = [...new Set(OUTFITS.flatMap(o => o.recs))].slice(0, 6);
  strip.innerHTML = pids.map(pid => {
    const p = PRODUCTS.find(pr => pr.id === pid);
    return `<article class="rec-card" data-product="${pid}">
      <h4 class="rec-title">${p.name}</h4>
      <p class="rec-price">€${p.price}</p>
    </article>`;
  }).join('');
}

// ─── PRODUCT MODAL ───────────────────────────────────────────────────────────

function openProductModal(pid) {
  const p = PRODUCTS.find(pr => pr.id === pid);
  if (!p) return;

  currentProductId = pid;
  selectedSize = (p.sizes.length === 1) ? p.sizes[0] : null;

  document.getElementById('productName').textContent = p.name;
  document.getElementById('productPrice').textContent = `€${p.price}`;
  document.getElementById('productCategory').textContent = p.category;

  const brandEl = document.getElementById('productBrand');
  brandEl.textContent = p.brand || '';
  brandEl.style.display = p.brand ? '' : 'none';

  const visual = document.getElementById('productVisual');
  if (p.image) {
    visual.classList.add('has-product-image');
    visual.style.backgroundImage = `url('${p.image}')`;
  } else {
    visual.classList.remove('has-product-image');
    visual.style.backgroundImage = '';
  }

  const descBlock = document.getElementById('productDescBlock');
  descBlock.innerHTML = p.description || '';
  descBlock.style.display = p.description ? '' : 'none';

  const sizesEl = document.getElementById('productSizes');
  sizesEl.innerHTML = p.sizes.map(s => {
    const active = (s === selectedSize) ? ' active' : '';
    return `<button class="size-btn${active}" data-size="${s}">${s}</button>`;
  }).join('');

  document.getElementById('productQty').value = 1;
  updateAddBtn();

  const modal = document.getElementById('productModal');
  modal.classList.add('open');
  modal.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  const modal = document.getElementById('productModal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  currentProductId = null;
  selectedSize = null;
}

function updateAddBtn() {
  const btn = document.getElementById('addToCartBtn');
  if (!selectedSize) {
    btn.textContent = 'Select a size first';
    btn.disabled = true;
  } else {
    btn.textContent = 'Add to Cart';
    btn.disabled = false;
  }
}

function handleSizeClick(e) {
  const btn = e.target.closest('.size-btn');
  if (!btn) return;
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedSize = btn.dataset.size;
  updateAddBtn();
}

function addToCartFromModal() {
  if (!currentProductId || !selectedSize) return;
  const qty = Math.max(1, parseInt(document.getElementById('productQty').value) || 1);
  addItemToCart(currentProductId, selectedSize, qty);
  closeProductModal();
  showToast('Added to cart! 🛍️');
}

// ─── OUTFIT → CART ───────────────────────────────────────────────────────────

function openCartForOutfit(outfitId) {
  const outfit = OUTFITS.find(o => o.id === outfitId);
  if (!outfit) return;
  outfit.items.forEach(pid => {
    const p = PRODUCTS.find(pr => pr.id === pid);
    addItemToCart(pid, p.sizes[0], 1);
  });
  openCart();
  showToast(`${outfit.name} added to cart!`);
}

// ─── CART ────────────────────────────────────────────────────────────────────

function addItemToCart(pid, size, qty) {
  const existing = cart.find(i => i.id === pid && i.size === size);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: pid, size, qty });
  }
  saveCart();
  updateCartCount();
}

function saveCart() {
  localStorage.setItem('geme-cart', JSON.stringify(cart));
}

function updateCartCount() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById('cartCount').textContent = count;
}

function openCart() {
  renderCart();
  document.getElementById('cartOverlay').classList.add('open');
  document.getElementById('cartDrawer').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartOverlay').classList.remove('open');
  document.getElementById('cartDrawer').classList.remove('open');
  document.body.style.overflow = '';
}

function renderCart() {
  const list = document.getElementById('cartList');
  if (cart.length === 0) {
    list.innerHTML = `<p class="cart-empty">Your cart is empty</p>`;
    document.getElementById('cartTotal').textContent = '€0';
    return;
  }
  const total = cart.reduce((s, item) => {
    const p = PRODUCTS.find(pr => pr.id === item.id);
    return s + p.price * item.qty;
  }, 0);

  list.innerHTML = cart.map((item, idx) => {
    const p = PRODUCTS.find(pr => pr.id === item.id);
    return `
      <div class="cart-item">
        <div class="cart-item-info">
          <strong>${p.name}</strong>
          <span class="cart-item-meta">Size: ${item.size}</span>
        </div>
        <div class="cart-item-right">
          <div class="qty-controls">
            <button class="qty-btn" data-action="dec" data-index="${idx}">−</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" data-action="inc" data-index="${idx}">+</button>
          </div>
          <span class="cart-item-price">€${p.price * item.qty}</span>
          <button class="remove-item" data-index="${idx}" aria-label="Remove">×</button>
        </div>
      </div>`;
  }).join('');

  document.getElementById('cartTotal').textContent = `€${total}`;
}

function handleCartClick(e) {
  const removeBtn = e.target.closest('.remove-item');
  if (removeBtn) {
    cart.splice(parseInt(removeBtn.dataset.index), 1);
    saveCart(); updateCartCount(); renderCart();
    return;
  }
  const qtyBtn = e.target.closest('.qty-btn');
  if (qtyBtn) {
    const idx = parseInt(qtyBtn.dataset.index);
    if (qtyBtn.dataset.action === 'inc') {
      cart[idx].qty++;
    } else {
      cart[idx].qty--;
      if (cart[idx].qty <= 0) cart.splice(idx, 1);
    }
    saveCart(); updateCartCount(); renderCart();
  }
}

function handleCheckout() {
  if (cart.length === 0) { showToast('Your cart is empty!'); return; }
  if (!currentUser) {
    closeCart();
    openAuthModal('signup');
    showToast('Create an account to checkout!');
    return;
  }
  showToast('Checkout coming soon! 🛒');
}

// ─── AUTH ────────────────────────────────────────────────────────────────────

function updateAuthUI() {
  const authBtn = document.getElementById('authBtn');
  const joinBtn = document.getElementById('joinBtn');
  if (currentUser) {
    authBtn.textContent = currentUser.name.split(' ')[0] + ' ▾';
    authBtn.classList.add('logged-in');
    if (joinBtn) joinBtn.textContent = 'My Account';
  } else {
    authBtn.textContent = 'Join géme';
    authBtn.classList.remove('logged-in');
    if (joinBtn) joinBtn.textContent = 'Join géme';
  }
}

function openAuthModal(tab) {
  switchAuthTab(tab || 'signup');
  ['su-name','su-email','su-pass','li-email','li-pass'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  clearAuthErrors();
  const modal = document.getElementById('authModal');
  modal.classList.add('open');
  modal.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';
  setTimeout(() => {
    const first = modal.querySelector('input');
    if (first) first.focus();
  }, 50);
}

function closeAuthModal() {
  const modal = document.getElementById('authModal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  document.getElementById('authBtn').focus();
}

function switchAuthTab(tab) {
  document.querySelectorAll('.tab-button').forEach(btn =>
    btn.classList.toggle('active', btn.dataset.tab === tab)
  );
  document.getElementById('signupPanel').classList.toggle('hidden', tab !== 'signup');
  document.getElementById('loginPanel').classList.toggle('hidden', tab !== 'login');
}

function clearAuthErrors() {
  document.querySelectorAll('.auth-error').forEach(el => el.textContent = '');
}

function setAuthError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function doSignup() {
  clearAuthErrors();
  const name  = document.getElementById('su-name').value.trim();
  const email = document.getElementById('su-email').value.trim();
  const pass  = document.getElementById('su-pass').value;

  let ok = true;
  if (!name)               { setAuthError('su-name-err',  'Enter your name'); ok = false; }
  if (!isValidEmail(email)) { setAuthError('su-email-err', 'Enter a valid email'); ok = false; }
  if (pass.length < 6)     { setAuthError('su-pass-err',  'Password must be at least 6 characters'); ok = false; }
  if (!ok) return;

  const existing = JSON.parse(localStorage.getItem('geme-user') || 'null');
  if (existing && existing.email === email) {
    setAuthError('su-email-err', 'An account with this email already exists');
    return;
  }

  currentUser = { name, email, pass };
  localStorage.setItem('geme-user', JSON.stringify(currentUser));
  closeAuthModal();
  updateAuthUI();
  showToast(`Welcome to géme, ${name}! 🎉`);
}

function doLogin() {
  clearAuthErrors();
  const email = document.getElementById('li-email').value.trim();
  const pass  = document.getElementById('li-pass').value;

  let ok = true;
  if (!isValidEmail(email)) { setAuthError('li-email-err', 'Enter a valid email'); ok = false; }
  if (!pass)                 { setAuthError('li-pass-err', 'Enter your password'); ok = false; }
  if (!ok) return;

  const stored = JSON.parse(localStorage.getItem('geme-user') || 'null');
  if (!stored || stored.email !== email || stored.pass !== pass) {
    setAuthError('li-pass-err', 'Invalid email or password');
    return;
  }

  currentUser = stored;
  closeAuthModal();
  updateAuthUI();
  showToast(`Welcome back, ${currentUser.name}!`);
}

function openUserMenu() {
  const existing = document.getElementById('userMenu');
  if (existing) { existing.remove(); return; }

  const btn = document.getElementById('authBtn');
  const rect = btn.getBoundingClientRect();
  const menu = document.createElement('div');
  menu.id = 'userMenu';
  menu.className = 'user-menu';
  menu.style.top  = (rect.bottom + 8) + 'px';
  menu.style.right = (window.innerWidth - rect.right) + 'px';
  menu.innerHTML = `
    <div class="user-menu-name">${currentUser.name}</div>
    <div class="user-menu-email">${currentUser.email}</div>
    <hr class="user-menu-divider">
    <button id="logoutBtn">Log out</button>`;
  document.body.appendChild(menu);

  document.getElementById('logoutBtn').addEventListener('click', () => {
    currentUser = null;
    localStorage.removeItem('geme-user');
    menu.remove();
    updateAuthUI();
    showToast('Logged out. See you soon!');
  });

  setTimeout(() => {
    document.addEventListener('click', function handler(e) {
      if (!menu.contains(e.target) && e.target !== btn) {
        menu.remove();
        document.removeEventListener('click', handler);
      }
    });
  }, 0);
}

// ─── THEME ───────────────────────────────────────────────────────────────────

function initTheme() {
  const t = localStorage.getItem('geme-theme') || 'dark';
  document.body.classList.toggle('theme-light', t === 'light');
  updateThemeLabel();
}

function toggleTheme() {
  const isLight = document.body.classList.toggle('theme-light');
  localStorage.setItem('geme-theme', isLight ? 'light' : 'dark');
  updateThemeLabel();
}

function updateThemeLabel() {
  document.getElementById('themeToggle').textContent =
    document.body.classList.contains('theme-light') ? '🌙 Dark' : '☀️ Light';
}

// ─── EVENTS ──────────────────────────────────────────────────────────────────

function attachEvents() {
  // Editorial banner → scroll to Rick Owens product
  document.getElementById('bannerShopBtn')?.addEventListener('click', () => {
    const card = document.querySelector('[data-product="rick-owens-ramones"]');
    if (!card) return;
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card.classList.add('product-highlight');
    card.addEventListener('animationend', () => card.classList.remove('product-highlight'), { once: true });
  });

  // Nav
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  document.getElementById('cartBtn').addEventListener('click', openCart);
  document.getElementById('authBtn').addEventListener('click', () => {
    currentUser ? openUserMenu() : openAuthModal('signup');
  });
  document.getElementById('joinBtn')?.addEventListener('click', () => {
    currentUser ? openUserMenu() : openAuthModal('signup');
  });

  // Auth modal
  document.getElementById('modalClose').addEventListener('click', closeAuthModal);
  document.getElementById('authModal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeAuthModal();
  });
  document.querySelectorAll('.tab-button').forEach(btn =>
    btn.addEventListener('click', () => switchAuthTab(btn.dataset.tab))
  );
  document.getElementById('signupSubmit').addEventListener('click', doSignup);
  document.getElementById('loginSubmit').addEventListener('click', doLogin);
  document.getElementById('signupPanel').addEventListener('keydown', e => { if (e.key === 'Enter') doSignup(); });
  document.getElementById('loginPanel').addEventListener('keydown',  e => { if (e.key === 'Enter') doLogin(); });

  // Cart
  document.getElementById('cartClose').addEventListener('click', closeCart);
  document.getElementById('cartOverlay').addEventListener('click', closeCart);
  document.getElementById('checkoutBtn').addEventListener('click', handleCheckout);
  document.getElementById('cartDrawer').addEventListener('click', handleCartClick);

  // Outfit grid
  document.getElementById('outfitGrid').addEventListener('click', e => {
    const shopBtn = e.target.closest('.shop-button');
    if (shopBtn) { openCartForOutfit(shopBtn.dataset.outfit); return; }
    const tag = e.target.closest('.tag-item');
    if (tag) openProductModal(tag.dataset.product);
  });

  // Products grid
  document.getElementById('productsGrid')?.addEventListener('click', e => {
    const card = e.target.closest('.product-card');
    if (card) openProductModal(card.dataset.product);
  });

  // Recs strip
  document.getElementById('recsStrip')?.addEventListener('click', e => {
    const card = e.target.closest('.rec-card');
    if (card && card.dataset.product) openProductModal(card.dataset.product);
  });

  // Product modal
  document.getElementById('productModal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeProductModal();
  });
  document.getElementById('productClose').addEventListener('click', closeProductModal);
  document.getElementById('productSizes').addEventListener('click', handleSizeClick);
  document.getElementById('addToCartBtn').addEventListener('click', addToCartFromModal);

  // Escape key closes any open modal / menu
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (document.getElementById('authModal').classList.contains('open'))    { closeAuthModal(); return; }
    if (document.getElementById('productModal').classList.contains('open')) { closeProductModal(); return; }
    if (document.getElementById('cartDrawer').classList.contains('open'))   { closeCart(); return; }
    const m = document.getElementById('userMenu');
    if (m) m.remove();
  });

  // Qty stepper
  document.getElementById('qtyDec').addEventListener('click', () => {
    const el = document.getElementById('productQty');
    el.value = Math.max(1, parseInt(el.value) - 1);
  });
  document.getElementById('qtyInc').addEventListener('click', () => {
    const el = document.getElementById('productQty');
    el.value = Math.min(10, parseInt(el.value) + 1);
  });
}

// ─── REVEAL ──────────────────────────────────────────────────────────────────

function observeReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ─── UTILS ───────────────────────────────────────────────────────────────────

let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('visible'), 3000);
}

window.addEventListener('DOMContentLoaded', init);
