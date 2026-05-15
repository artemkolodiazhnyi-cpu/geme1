// ─── PRODUCTS (shared data) ───────────────────────────────────────────────────
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
  { id: 'tailored',      name: 'Tailored Trousers',    price: 120, sizes: ['XS','S','M','L'],        category: 'bottoms' },
  { id: 'flats',         name: 'Ballet Flats',         price: 90,  sizes: ['36','37','38','39'],      category: 'shoes' }
];

// ─── SWIPE OUTFITS ────────────────────────────────────────────────────────────
const SWIPE_OUTFITS = [
  { id: 1,  name: 'Street Chic',     brand: 'Urban Collective',  price: 254, tag: 'Streetwear',     description: 'Bold urban energy. Oversized fit with cargo attitude.',       gradient: 'linear-gradient(135deg,#1a1a2e,#16213e)',   emoji: '🔥', items: ['hoodie','cargo','sneakers'] },
  { id: 2,  name: 'Office Ready',    brand: 'Refined Studio',    price: 309, tag: 'Business Casual',description: 'Sharp tailoring. Effortless authority.',                       gradient: 'linear-gradient(135deg,#2d2d2d,#1a1a1a)',   emoji: '💼', items: ['blazer','trousers','loafers'] },
  { id: 3,  name: 'Weekend Casual',  brand: 'Lazy Sunday Co',    price: 210, tag: 'Casual',         description: 'Weekend done right. Laid-back but intentional.',               gradient: 'linear-gradient(135deg,#2c3e50,#3498db)',   emoji: '☕', items: ['shirt','jeans','whitesneakers'] },
  { id: 4,  name: 'Evening Edit',    brand: 'Soirée',            price: 284, tag: 'Evening',        description: 'For nights that deserve to be remembered.',                    gradient: 'linear-gradient(135deg,#2c2c54,#474787)',   emoji: '✨', items: ['dress','heels','bag'] },
  { id: 5,  name: 'Y2K Vibes',       brand: 'Retro Future',      price: 230, tag: 'Y2K',           description: 'Early 2000s energy, fully reloaded.',                          gradient: 'linear-gradient(135deg,#e91e63,#9c27b0)',   emoji: '💿', items: ['tee','skirt','boots'] },
  { id: 6,  name: 'Minimal Luxe',    brand: 'Studio Blanc',      price: 390, tag: 'Minimalist',    description: 'Less is more. Quality speaks louder.',                         gradient: 'linear-gradient(135deg,#424242,#212121)',   emoji: '🤍', items: ['turtleneck','tailored','flats'] },
  { id: 7,  name: 'Parisian Edit',   brand: 'Rive Gauche',       price: 300, tag: 'Classic',       description: 'Effortless. Timeless. Always right.',                          gradient: 'linear-gradient(135deg,#37474f,#546e7a)',   emoji: '🥐', items: ['blazer','jeans','loafers'] },
  { id: 8,  name: 'Dark Academia',   brand: 'The Library',       price: 370, tag: 'Academia',      description: 'Books, coffee, and impeccable taste.',                         gradient: 'linear-gradient(135deg,#3e2723,#5d4037)',   emoji: '📚', items: ['turtleneck','trousers','flats'] },
  { id: 9,  name: 'Summer Dream',    brand: 'Tropicana Co',      price: 195, tag: 'Summer',        description: 'Warm days, easy breezy confidence.',                           gradient: 'linear-gradient(135deg,#f57f17,#ff8f00)',   emoji: '🌊', items: ['shirt','skirt','whitesneakers'] },
  { id: 10, name: 'Luxe Sport',      brand: 'Kinetic',           price: 345, tag: 'Athleisure',    description: 'Performance meets style. Gym to street.',                      gradient: 'linear-gradient(135deg,#1b5e20,#43a047)',   emoji: '⚡', items: ['hoodie','tailored','sneakers'] },
  { id: 11, name: 'Garden Party',    brand: 'Bloom',             price: 264, tag: 'Feminine',      description: 'Soft, romantic, unapologetically pretty.',                     gradient: 'linear-gradient(135deg,#880e4f,#e91e63)',   emoji: '🌸', items: ['dress','flats','bag'] },
  { id: 12, name: 'Nordic Frost',    brand: 'Scandinavian Co',   price: 340, tag: 'Nordic',        description: 'Clean lines. Cold clarity. Warm soul.',                        gradient: 'linear-gradient(135deg,#546e7a,#78909c)',   emoji: '❄️', items: ['turtleneck','jeans','boots'] },
  { id: 13, name: 'Tech Noir',       brand: 'Cyber Studio',      price: 265, tag: 'Avant-Garde',   description: 'The future is already wearing this.',                          gradient: 'linear-gradient(135deg,#000000,#212121)',   emoji: '🤖', items: ['hoodie','trousers','boots'] },
  { id: 14, name: 'Power Blazer',    brand: 'Prestige',          price: 325, tag: 'Power Dressing', description: 'Walk in. Own the room.',                                      gradient: 'linear-gradient(135deg,#1a237e,#283593)',   emoji: '🏆', items: ['blazer','tailored','heels'] },
  { id: 15, name: 'Grunge Revival',  brand: 'Static',            price: 259, tag: 'Grunge',        description: '90s distortion. Modern precision.',                            gradient: 'linear-gradient(135deg,#212121,#424242)',   emoji: '🎸', items: ['tee','cargo','boots'] },
  { id: 16, name: 'Romantic Lead',   brand: 'Dusk Label',        price: 209, tag: 'Date Night',    description: 'Dressed for the best chapter.',                                gradient: 'linear-gradient(135deg,#b71c1c,#e53935)',   emoji: '🌹', items: ['dress','heels','bag'] },
  { id: 17, name: 'Street Scholar',  brand: 'Urban Academic',    price: 195, tag: 'Smart Casual',  description: 'Where the campus meets the corner store.',                     gradient: 'linear-gradient(135deg,#4a148c,#7b1fa2)',   emoji: '🎒', items: ['hoodie','jeans','sneakers'] },
  { id: 18, name: 'Resort Mode',     brand: 'Palm House',        price: 220, tag: 'Resort',        description: 'Vacation mood. No return date needed.',                        gradient: 'linear-gradient(135deg,#006064,#00838f)',   emoji: '🌴', items: ['shirt','trousers','whitesneakers'] },
];

// ─── STATE ────────────────────────────────────────────────────────────────────
const ALL_OUTFITS = [...SWIPE_OUTFITS];
let queue   = [...ALL_OUTFITS];
let history = [];
let liked   = JSON.parse(localStorage.getItem('geme-liked')  || '[]');
let cart    = JSON.parse(localStorage.getItem('geme-cart')   || '[]');

const THRESHOLD = 75;

// ─── INIT ─────────────────────────────────────────────────────────────────────
function init() {
  loadTheme();
  renderStack();
  updateCartBadge();
  updateAuthBtn();
  attachPageEvents();
}

// ─── STACK RENDER ─────────────────────────────────────────────────────────────
function renderStack() {
  const deck = document.getElementById('swipeDeck');
  deck.innerHTML = '';

  if (queue.length === 0) { showEmpty(); return; }

  const visible = queue.slice(0, 3);
  visible.forEach((outfit, i) => {
    const card = buildCard(outfit, i);
    deck.appendChild(card);
  });
  attachDrag(deck.firstElementChild, queue[0]);

  document.getElementById('swipeEmpty').hidden = true;
  document.getElementById('swipeDeck').style.display = '';
  document.getElementById('swipeActions').style.display = '';
  document.getElementById('swipeCounter').style.display = '';
  updateCounter();
}

function buildCard(outfit, stackPos) {
  const card = document.createElement('div');
  card.className = 'swipe-card';
  card.style.setProperty('--stack-pos', stackPos);
  card.dataset.id = outfit.id;

  card.innerHTML = `
    <div class="like-indicator swipe-indicator" aria-hidden="true">LIKE</div>
    <div class="nope-indicator swipe-indicator" aria-hidden="true">NOPE</div>
    <div class="swipe-card-visual" style="background:${outfit.gradient}">
      <span class="swipe-card-emoji">${outfit.emoji}</span>
    </div>
    <div class="swipe-card-info">
      <span class="swipe-tag">${outfit.tag}</span>
      <h2 class="swipe-name">${outfit.name}</h2>
      <p class="swipe-brand">${outfit.brand}</p>
      <p class="swipe-desc">${outfit.description}</p>
      <p class="swipe-price">€${outfit.price}</p>
    </div>`;

  return card;
}

// ─── DRAG ─────────────────────────────────────────────────────────────────────
function attachDrag(card, outfit) {
  if (!card || !outfit) return;
  let startX = 0, isDragging = false;

  card.addEventListener('pointerdown', e => {
    isDragging = true;
    startX = e.clientX;
    card.setPointerCapture(e.pointerId);
    card.style.transition = 'none';
  });

  card.addEventListener('pointermove', e => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    card.style.transform = `translateY(0) scale(1) translateX(${dx}px) rotate(${dx * 0.07}deg)`;

    const likeEl = card.querySelector('.like-indicator');
    const nopeEl = card.querySelector('.nope-indicator');
    const ratio  = Math.min(Math.abs(dx) / THRESHOLD, 1);

    likeEl.style.opacity = dx > 8  ? ratio : 0;
    nopeEl.style.opacity = dx < -8 ? ratio : 0;
  });

  card.addEventListener('pointerup', e => {
    if (!isDragging) return;
    isDragging = false;
    const dx = e.clientX - startX;

    if (dx > THRESHOLD)  { executeSwipe(card, outfit, 'like');    return; }
    if (dx < -THRESHOLD) { executeSwipe(card, outfit, 'dislike'); return; }

    // Snap back to CSS-controlled position
    card.style.transition = 'transform 0.45s cubic-bezier(0.175,0.885,0.32,1.275)';
    card.style.transform  = '';
    card.querySelector('.like-indicator').style.opacity = 0;
    card.querySelector('.nope-indicator').style.opacity = 0;
  });

  card.addEventListener('pointercancel', () => {
    if (!isDragging) return;
    isDragging = false;
    card.style.transition = 'transform 0.4s ease';
    card.style.transform  = '';
    card.querySelector('.like-indicator').style.opacity = 0;
    card.querySelector('.nope-indicator').style.opacity = 0;
  });
}

// ─── SWIPE EXECUTION ──────────────────────────────────────────────────────────
function executeSwipe(card, outfit, action) {
  const dir   = action === 'like' ? 1 : -1;
  const flyX  = dir * (window.innerWidth + 260);
  const flyRot = dir * 28;

  card.style.transition    = 'transform 0.42s ease, opacity 0.42s ease';
  card.style.transform     = `translateX(${flyX}px) rotate(${flyRot}deg)`;
  card.style.opacity       = '0';
  card.style.pointerEvents = 'none';

  history.push({ outfit, action });
  if (history.length > 20) history.shift();

  if (action === 'like') {
    if (!liked.includes(outfit.id)) {
      liked.push(outfit.id);
      localStorage.setItem('geme-liked', JSON.stringify(liked));
    }
    showToast('❤️ Liked!');
  }

  queue.shift();

  setTimeout(() => {
    card.remove();
    promoteStack();
    updateCounter();
    if (queue.length === 0) showEmpty();
  }, 430);
}

function promoteStack() {
  const deck = document.getElementById('swipeDeck');
  const cards = [...deck.querySelectorAll('.swipe-card')];

  cards.forEach((c, i) => {
    c.style.transition = 'transform 0.3s ease';
    c.style.setProperty('--stack-pos', i);
    if (i === 0) attachDrag(c, queue[0]);
  });

  // Add new back card if there are more outfits beyond what's rendered
  if (queue.length >= 3 && cards.length < 3) {
    const newCard = buildCard(queue[2], 2);
    deck.insertBefore(newCard, deck.firstChild);
  }
}

// ─── BUTTON SWIPE ────────────────────────────────────────────────────────────
function swipeButton(action) {
  const deck = document.getElementById('swipeDeck');
  const top  = deck.querySelector('.swipe-card:first-child');
  if (!top || queue.length === 0) return;
  executeSwipe(top, queue[0], action);
}

function undoLast() {
  if (history.length === 0) { showToast('Nothing to undo'); return; }
  const last = history.pop();
  queue.unshift(last.outfit);
  if (last.action === 'like') {
    liked = liked.filter(id => id !== last.outfit.id);
    localStorage.setItem('geme-liked', JSON.stringify(liked));
  }
  renderStack();
  showToast('↶ Undone');
}

function addCurrentToCart() {
  if (queue.length === 0) return;
  const outfit = queue[0];
  outfit.items.forEach(pid => {
    const p = PRODUCTS.find(pr => pr.id === pid);
    if (!p) return;
    const existing = cart.find(i => i.id === pid && i.size === p.sizes[0]);
    if (existing) existing.qty++;
    else cart.push({ id: pid, size: p.sizes[0], qty: 1 });
  });
  localStorage.setItem('geme-cart', JSON.stringify(cart));
  updateCartBadge();
  showToast(`🛒 ${outfit.name} added to cart!`);
}

// ─── EMPTY STATE ─────────────────────────────────────────────────────────────
function showEmpty() {
  document.getElementById('swipeDeck').style.display    = 'none';
  document.getElementById('swipeActions').style.display = 'none';
  document.getElementById('swipeCounter').style.display = 'none';
  document.getElementById('swipeEmpty').hidden = false;
  document.getElementById('likedCountEmpty').textContent = liked.length;
}

function restart() {
  queue   = [...ALL_OUTFITS];
  history = [];
  renderStack();
}

// ─── LIKED MODAL ─────────────────────────────────────────────────────────────
function openLikedModal() {
  const list = document.getElementById('likedList');
  const likedOutfits = ALL_OUTFITS.filter(o => liked.includes(o.id));

  if (likedOutfits.length === 0) {
    list.innerHTML = '<p class="liked-empty">No liked outfits yet. Start swiping!</p>';
  } else {
    list.innerHTML = likedOutfits.map(o => `
      <div class="liked-card">
        <div class="liked-visual" style="background:${o.gradient}">
          <span>${o.emoji}</span>
        </div>
        <div class="liked-info">
          <h4>${o.name}</h4>
          <p class="liked-brand">${o.brand}</p>
          <p class="liked-price">€${o.price}</p>
        </div>
        <button class="button button-primary liked-shop-btn" data-id="${o.id}">Shop</button>
      </div>`).join('');

    list.querySelectorAll('.liked-shop-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const o = ALL_OUTFITS.find(x => x.id === Number(btn.dataset.id));
        if (o) { addOutfitToCart(o); }
      });
    });
  }

  const modal = document.getElementById('likedModal');
  modal.classList.add('open');
  modal.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';
}

function closeLikedModal() {
  const modal = document.getElementById('likedModal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function addOutfitToCart(outfit) {
  outfit.items.forEach(pid => {
    const p = PRODUCTS.find(pr => pr.id === pid);
    if (!p) return;
    const existing = cart.find(i => i.id === pid && i.size === p.sizes[0]);
    if (existing) existing.qty++;
    else cart.push({ id: pid, size: p.sizes[0], qty: 1 });
  });
  localStorage.setItem('geme-cart', JSON.stringify(cart));
  updateCartBadge();
  showToast(`🛒 ${outfit.name} added!`);
}

// ─── THEME ────────────────────────────────────────────────────────────────────
function loadTheme() {
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
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = document.body.classList.contains('theme-light') ? '🌙 Dark' : '☀️ Light';
}

// ─── AUTH UI ─────────────────────────────────────────────────────────────────
function updateAuthBtn() {
  const user = JSON.parse(localStorage.getItem('geme-user') || 'null');
  const btn  = document.getElementById('authBtn');
  if (!btn) return;
  if (user) {
    btn.textContent = user.name.split(' ')[0] + ' ▾';
    btn.classList.add('logged-in');
  } else {
    btn.textContent = 'Join géme';
    btn.classList.remove('logged-in');
  }
}

// ─── UTILS ────────────────────────────────────────────────────────────────────
function updateCartBadge() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  const badge = document.getElementById('cartCount');
  if (badge) badge.textContent = total;
}

function updateCounter() {
  const el = document.getElementById('swipeCounter');
  if (el) el.textContent = `${queue.length} outfit${queue.length !== 1 ? 's' : ''} remaining`;
}

let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('visible'), 3000);
}

// ─── EVENTS ──────────────────────────────────────────────────────────────────
function attachPageEvents() {
  document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
  document.getElementById('btnDislike')?.addEventListener('click', () => swipeButton('dislike'));
  document.getElementById('btnLike')?.addEventListener('click',    () => swipeButton('like'));
  document.getElementById('btnUndo')?.addEventListener('click',    undoLast);
  document.getElementById('btnCart')?.addEventListener('click',    addCurrentToCart);
  document.getElementById('btnRestart')?.addEventListener('click', restart);
  document.getElementById('btnViewLiked')?.addEventListener('click', openLikedModal);
  document.getElementById('navLikedBtn')?.addEventListener('click', openLikedModal);
  document.getElementById('likedModalClose')?.addEventListener('click', closeLikedModal);
  document.getElementById('likedModal')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeLikedModal();
  });
  document.getElementById('authBtn')?.addEventListener('click', () => {
    window.location.href = './index.html';
  });
  document.getElementById('cartNavBtn')?.addEventListener('click', () => {
    showToast('Cart is managed on the main page 🛒');
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeLikedModal(); return; }
    if (document.getElementById('likedModal')?.classList.contains('open')) return;
    if (e.key === 'ArrowRight') swipeButton('like');
    if (e.key === 'ArrowLeft')  swipeButton('dislike');
    if (e.key === 'ArrowUp' || e.key === 'z' || e.key === 'Z') undoLast();
  });
}

window.addEventListener('DOMContentLoaded', init);
