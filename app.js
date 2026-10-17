const PRODUCTS = [
  {id:1,name:"PlayStation 5 Slim",category:"Console",price:44990,oldPrice:49990,rating:"4.9",tag:"BEST SELLER",tint:"#a8b5ff55",image:"https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=700&q=85",description:"A sleek next-gen console concept for smooth gameplay, immersive worlds and your next big adventure."},
  {id:2,name:"Pro Wireless Controller",category:"Accessories",price:6499,oldPrice:7999,rating:"4.8",tag:"HOT DROP",tint:"#a8ff3540",image:"https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=700&q=85",description:"Precision controls, an ergonomic grip and responsive inputs for long gaming sessions."},
  {id:3,name:"RGB Gaming Headset",category:"Audio",price:4299,oldPrice:5499,rating:"4.7",tag:"PLAYER PICK",tint:"#9c78ff55",image:"https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=700&q=85",description:"A comfortable over-ear headset concept with immersive audio and a bold gaming silhouette."},
  {id:4,name:"Mechanical RGB Keyboard",category:"Accessories",price:5999,oldPrice:7499,rating:"4.8",tag:"-20%",tint:"#ff4db844",image:"https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=700&q=85",description:"Tactile mechanical-style keys, a compact desk footprint and colourful RGB-inspired styling."},
  {id:5,name:"Gaming Mouse Pro",category:"Accessories",price:2499,oldPrice:3299,rating:"4.6",tag:"LIGHTNING FAST",tint:"#52dcff45",image:"https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=700&q=85",description:"A lightweight mouse concept for quick flicks, precise tracking and a clean desktop setup."},
  {id:6,name:"Next-Gen Console",category:"Console",price:52990,oldPrice:57990,rating:"4.9",tag:"NEW ARRIVAL",tint:"#a8ff3540",image:"https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?auto=format&fit=crop&w=700&q=85",description:"A console-inspired centerpiece for a modern gaming station with room for your favourite titles."},
  {id:7,name:"Studio Gaming Headphones",category:"Audio",price:7999,oldPrice:9999,rating:"4.8",tag:"FAN FAVOURITE",tint:"#9c78ff4a",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85",description:"A premium audio accessory concept for music, voice chat and immersive late-night sessions."},
  {id:8,name:"RGB Desk Setup Light",category:"Accessories",price:1899,oldPrice:2499,rating:"4.5",tag:"SETUP UPGRADE",tint:"#ff4db844",image:"https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=700&q=85",description:"Add atmosphere to your battle station with a futuristic lighting accent and neon-inspired glow."}
];
const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
const money = value => "₹" + value.toLocaleString("en-IN");
const safeLoad = (key, fallback) => { try { const value = JSON.parse(localStorage.getItem(key)); return value ?? fallback; } catch { return fallback; } };
let cart = safeLoad("shreyverse-cart", []);
let wishlist = new Set(safeLoad("shreyverse-wishlist", []));
let activeCategory = "All";
let toastTimer;

function persist() {
  localStorage.setItem("shreyverse-cart", JSON.stringify(cart));
  localStorage.setItem("shreyverse-wishlist", JSON.stringify([...wishlist]));
}
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2300);
}
function productImage(product, className="") {
  return `<img class="${className}" src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.onerror=null;this.style.display='none';this.parentElement.classList.add('image-fallback');this.parentElement.insertAdjacentHTML('beforeend','<span aria-hidden=\"true\" style=\"font-size:46px\">🎮</span>')">`;
}
function filteredProducts() {
  const term = $("#searchInput").value.trim().toLowerCase();
  let list = PRODUCTS.filter(p => (activeCategory === "All" || p.category === activeCategory) &&
    `${p.name} ${p.category} ${p.description}`.toLowerCase().includes(term));
  const sort = $("#sortSelect").value;
  if (sort === "low") list.sort((a,b) => a.price-b.price);
  if (sort === "high") list.sort((a,b) => b.price-a.price);
  if (sort === "name") list.sort((a,b) => a.name.localeCompare(b.name));
  return list;
}
function renderProducts() {
  const list = filteredProducts();
  $("#productGrid").innerHTML = list.map(p => `
    <article class="product-card">
      <div class="product-image" data-details="${p.id}" style="--tint:${p.tint}" tabindex="0" role="button" aria-label="View ${p.name} details">
        <span class="product-tag">${p.tag}</span>
        <button class="heart-button ${wishlist.has(p.id)?"saved":""}" data-wish="${p.id}" aria-label="${wishlist.has(p.id)?"Remove":"Add"} ${p.name} ${wishlist.has(p.id)?"from":"to"} wishlist">${wishlist.has(p.id)?"♥":"♡"}</button>
        ${productImage(p)}
      </div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <h3 class="product-title" title="${p.name}">${p.name}</h3>
        <div class="product-rating">★★★★★ <span>${p.rating} · demo rating</span></div>
        <div class="product-bottom"><div><span class="product-price">${money(p.price)}</span><span class="product-old">${money(p.oldPrice)}</span></div><button class="add-button" data-add="${p.id}" aria-label="Add ${p.name} to cart">＋</button></div>
      </div>
    </article>`).join("");
  $("#noResults").classList.toggle("hidden", list.length > 0);
  $("#productGrid").classList.toggle("hidden", list.length === 0);
}
function updateCounts() {
  $("#cartCount").textContent = cart.reduce((sum,item) => sum+item.quantity, 0);
  $("#wishlistCount").textContent = wishlist.size;
  $("#cartPanelCount").textContent = `(${cart.reduce((sum,item)=>sum+item.quantity,0)})`;
  $("#wishlistPanelCount").textContent = `(${wishlist.size})`;
}
function renderCart() {
  const container = $("#cartItems");
  if (!cart.length) {
    container.innerHTML = `<div class="empty-panel"><span>▣</span><h3>Your loot bag is empty</h3><p>Find a piece of gear that belongs in your setup.</p><button class="button button-primary" data-close>Explore the drop ↗</button></div>`;
  } else {
    container.innerHTML = cart.map(item => {
      const p = PRODUCTS.find(product => product.id === item.id);
      if (!p) return "";
      return `<div class="cart-row"><div class="mini-image">${productImage(p)}</div><div><div class="mini-category">${p.category}</div><div class="mini-title">${p.name}</div><div class="mini-price">${money(p.price)}</div><div class="quantity-controls"><button data-qty="${p.id}" data-change="-1" aria-label="Decrease quantity">−</button><span>${item.quantity}</span><button data-qty="${p.id}" data-change="1" aria-label="Increase quantity">+</button></div></div><button class="remove-button" data-remove="${p.id}" aria-label="Remove ${p.name}">×</button></div>`;
    }).join("");
  }
  const total = cart.reduce((sum,item) => sum + (PRODUCTS.find(p=>p.id===item.id)?.price || 0)*item.quantity, 0);
  $("#cartSubtotal").textContent = money(total);
  $("#checkoutTotal").textContent = money(total);
  updateCounts();
}
function renderWishlist() {
  const container = $("#wishlistItems");
  if (!wishlist.size) {
    container.innerHTML = `<div class="empty-panel"><span>♡</span><h3>No saved gear yet</h3><p>Tap the heart on any product to save it for later.</p><button class="button button-primary" data-close>Browse products ↗</button></div>`;
  } else {
    container.innerHTML = [...wishlist].map(id => {
      const p = PRODUCTS.find(product => product.id === id);
      if (!p) return "";
      return `<div class="wishlist-row"><div class="mini-image">${productImage(p)}</div><div><div class="mini-category">${p.category}</div><div class="mini-title">${p.name}</div><div class="mini-price">${money(p.price)}</div><button class="text-button" data-wishlist-add="${p.id}">Add to cart +</button></div><button class="remove-button" data-wish="${p.id}" aria-label="Remove from wishlist">♥</button></div>`;
    }).join("");
  }
  updateCounts();
}
function showPanel(id) {
  closeOverlays();
  $("#overlay").classList.remove("hidden");
  $(id).classList.remove("hidden");
  document.body.classList.add("modal-open");
}
function showModal(id) {
  closeOverlays();
  $("#overlay").classList.remove("hidden");
  $(id).classList.remove("hidden");
  document.body.classList.add("modal-open");
}
function closeOverlays() {
  $("#overlay").classList.add("hidden");
  $$(".side-panel,.modal-wrap").forEach(el => el.classList.add("hidden"));
  document.body.classList.remove("modal-open");
}
function openProduct(id) {
  const p = PRODUCTS.find(item => item.id === Number(id));
  if (!p) return;
  $("#productModalContent").innerHTML = `<div class="product-modal-layout"><div class="product-modal-image" style="--tint:${p.tint}">${productImage(p)}</div><div class="product-modal-info"><div class="section-kicker">${p.category.toUpperCase()} / ${p.tag}</div><h2>${p.name}</h2><div class="product-rating">★★★★★ <span>${p.rating} · demo rating</span></div><p>${p.description}</p><div class="modal-price">${money(p.price)} <del>${money(p.oldPrice)}</del></div><div class="modal-actions"><button class="button button-primary" data-add="${p.id}">Add to cart <span>＋</span></button><button class="button button-ghost" data-wish="${p.id}">${wishlist.has(p.id)?"♥ Saved":"♡ Wishlist"}</button></div><p class="demo-note">Demo listing for portfolio purposes. Product availability and pricing are illustrative.</p></div></div>`;
  showModal("#productModal");
}
function addToCart(id) {
  const existing = cart.find(item => item.id === Number(id));
  if (existing) existing.quantity += 1;
  else cart.push({id:Number(id),quantity:1});
  persist(); renderCart(); showToast(`${PRODUCTS.find(p=>p.id===Number(id)).name} added to your loot bag.`);
}
function toggleWishlist(id) {
  id = Number(id);
  if (wishlist.has(id)) { wishlist.delete(id); showToast("Removed from your wishlist."); }
  else { wishlist.add(id); showToast("Saved to your wishlist ♥"); }
  persist(); renderProducts(); renderWishlist();
}
function changeQuantity(id, delta) {
  const item = cart.find(entry => entry.id === Number(id));
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) cart = cart.filter(entry => entry.id !== Number(id));
  persist(); renderCart();
}
function totalCart() {
  return cart.reduce((sum,item) => sum + (PRODUCTS.find(p=>p.id===item.id)?.price || 0)*item.quantity, 0);
}

$("#productGrid").addEventListener("click", event => {
  const add = event.target.closest("[data-add]");
  const wish = event.target.closest("[data-wish]");
  const details = event.target.closest("[data-details]");
  if (add) { event.stopPropagation(); addToCart(add.dataset.add); }
  else if (wish) { event.stopPropagation(); toggleWishlist(wish.dataset.wish); }
  else if (details) openProduct(details.dataset.details);
});
$("#productGrid").addEventListener("keydown", event => {
  if ((event.key === "Enter" || event.key === " ") && event.target.matches("[data-details]")) {
    event.preventDefault(); openProduct(event.target.dataset.details);
  }
});
$("#cartItems").addEventListener("click", event => {
  const qty = event.target.closest("[data-qty]");
  const remove = event.target.closest("[data-remove]");
  if (qty) changeQuantity(qty.dataset.qty, Number(qty.dataset.change));
  if (remove) { cart = cart.filter(item=>item.id!==Number(remove.dataset.remove)); persist(); renderCart(); showToast("Item removed from your loot bag."); }
});
$("#wishlistItems").addEventListener("click", event => {
  const wish = event.target.closest("[data-wish]");
  const add = event.target.closest("[data-wishlist-add]");
  if (wish) toggleWishlist(wish.dataset.wish);
  if (add) addToCart(add.dataset.wishlistAdd);
});
$$("[data-category]").forEach(button => button.addEventListener("click", () => {
  activeCategory = button.dataset.category;
  $$(".category-tab").forEach(tab => tab.classList.toggle("active", tab === button));
  renderProducts();
}));
$("#searchInput").addEventListener("input", renderProducts);
$("#sortSelect").addEventListener("change", renderProducts);
$("#resetFilters").addEventListener("click", () => {
  activeCategory = "All"; $("#searchInput").value = ""; $("#sortSelect").value = "featured";
  $$(".category-tab").forEach(tab => tab.classList.toggle("active", tab.dataset.category === "All"));
  renderProducts();
});
$("#searchFocus").addEventListener("click", () => { $("#shop").scrollIntoView({behavior:"smooth"}); setTimeout(()=>$("#searchInput").focus(),250); });
$("#cartOpen").addEventListener("click", () => { renderCart(); showPanel("#cartPanel"); });
$("#wishlistOpen").addEventListener("click", () => { renderWishlist(); showPanel("#wishlistPanel"); });
$("#wishlistShop").addEventListener("click", closeOverlays);
$("#continueShopping").addEventListener("click", closeOverlays);
$("#checkoutOpen").addEventListener("click", () => {
  if (!cart.length) { showToast("Add some gear before checkout."); return; }
  $("#checkoutTotal").textContent = money(totalCart());
  showModal("#checkoutModal");
});
$("#checkoutForm").addEventListener("submit", event => {
  event.preventDefault();
  if (!cart.length) { closeOverlays(); showToast("Your cart is empty."); return; }
  const form = new FormData(event.currentTarget);
  const firstName = String(form.get("name")).trim().split(/\s+/)[0] || "Player";
  const orderId = "SV-" + Math.random().toString(36).slice(2,8).toUpperCase();
  const total = totalCart();
  cart = []; persist(); renderCart(); renderProducts(); renderWishlist(); closeOverlays();
  event.currentTarget.reset();
  showToast(`Demo order ${orderId} confirmed. GG, ${firstName}!`);
  window.setTimeout(() => alert(`SHREYVERSE — DEMO ORDER\n\nOrder: ${orderId}\nPlayer: ${firstName}\nDemo total: ${money(total)}\n\nThis is a frontend simulation only. No payment was taken and no order was sent to a server.`), 250);
});
$$("[data-close]").forEach(button => button.addEventListener("click", closeOverlays));
$("#overlay").addEventListener("click", closeOverlays);
$$(".modal-wrap").forEach(modal => modal.addEventListener("click", event => { if (event.target === modal) closeOverlays(); }));
document.addEventListener("keydown", event => { if (event.key === "Escape") closeOverlays(); if (event.key === "/" && !["INPUT","TEXTAREA"].includes(document.activeElement.tagName)) { event.preventDefault(); $("#searchFocus").click(); } });
document.addEventListener("click", event => {
  const add = event.target.closest("#productModalContent [data-add]");
  const wish = event.target.closest("#productModalContent [data-wish]");
  if (add) { addToCart(add.dataset.add); closeOverlays(); }
  if (wish) { toggleWishlist(wish.dataset.wish); openProduct(wish.dataset.wish); }
});

renderProducts(); renderCart(); renderWishlist();
