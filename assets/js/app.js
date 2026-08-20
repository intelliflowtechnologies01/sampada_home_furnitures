/* ============================================================
   SAMPADA FURNITURE — App Logic (Alpine.js + Vanilla)
   Cart & wishlist persist via localStorage.
   ============================================================ */

const SF = {
  money(n) {
    return "₹" + Number(n).toLocaleString("en-IN");
  },
  stars(n) {
    return "★".repeat(Math.round(n));
  },
  productById(id) {
    return SF_DATA.products.find(p => p.id === Number(id));
  },
  catName(slug) {
    const c = SF_DATA.categories.find(c => c.slug === slug);
    return c ? c.name : slug;
  }
};

/* ---------- Alpine global store ---------- */
document.addEventListener("alpine:init", () => {
  Alpine.store("shop", {
    cart: JSON.parse(localStorage.getItem("sf_cart") || "[]"),
    wishlist: JSON.parse(localStorage.getItem("sf_wishlist") || "[]"),
    cartOpen: false,
    wishlistOpen: false,
    mobileMenu: false,
    toast: null,

    get cartCount() { return this.cart.reduce((s, i) => s + i.qty, 0); },
    get cartTotal() {
      return this.cart.reduce((s, i) => {
        const p = SF.productById(i.id);
        return p ? s + p.price * i.qty : s;
      }, 0);
    },
    get cartItems() {
      return this.cart.map(i => ({ ...i, product: SF.productById(i.id) })).filter(i => i.product);
    },
    get wishlistItems() {
      return this.wishlist.map(id => SF.productById(id)).filter(Boolean);
    },

    persist() {
      localStorage.setItem("sf_cart", JSON.stringify(this.cart));
      localStorage.setItem("sf_wishlist", JSON.stringify(this.wishlist));
    },

    addToCart(id, qty = 1) {
      const line = this.cart.find(i => i.id === id);
      if (line) line.qty += qty; else this.cart.push({ id, qty });
      this.persist();
      const p = SF.productById(id);
      this.showToast((p ? p.name : "Item") + " added to cart");
    },
    setQty(id, qty) {
      const line = this.cart.find(i => i.id === id);
      if (!line) return;
      line.qty = Math.max(1, qty);
      this.persist();
    },
    removeFromCart(id) {
      this.cart = this.cart.filter(i => i.id !== id);
      this.persist();
    },
    toggleWishlist(id) {
      if (this.wishlist.includes(id)) {
        this.wishlist = this.wishlist.filter(w => w !== id);
        this.showToast("Removed from wishlist");
      } else {
        this.wishlist.push(id);
        const p = SF.productById(id);
        this.showToast((p ? p.name : "Item") + " saved to wishlist");
      }
      this.persist();
    },
    inWishlist(id) { return this.wishlist.includes(id); },

    showToast(msg) {
      this.toast = msg;
      clearTimeout(this._toastT);
      this._toastT = setTimeout(() => (this.toast = null), 2600);
    }
  });

  // Lock body scroll while any overlay is open
  Alpine.effect(() => {
    const s = Alpine.store("shop");
    document.body.style.overflow =
      s.cartOpen || s.wishlistOpen || s.mobileMenu ? "hidden" : "";
  });

  // Escape closes any open overlay
  document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    const s = Alpine.store("shop");
    s.cartOpen = s.wishlistOpen = s.mobileMenu = false;
  });
});

/* ---------- Shared behaviours ---------- */
document.addEventListener("DOMContentLoaded", () => {
  // Navbar shadow on scroll
  const island = document.querySelector(".nav-island");
  if (island) {
    const onScroll = () => island.classList.toggle("scrolled", window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Reveal on scroll
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));

  // Reel slider controls (buttons may live in the section header, outside the track wrap)
  document.querySelectorAll("[data-reel-track]").forEach(track => {
    const scope = track.closest("section") || track.parentElement;
    if (!scope) return;
    const step = () => Math.min(track.clientWidth * 0.8, 520);
    scope.querySelectorAll("[data-reel-prev]").forEach(b =>
      b.addEventListener("click", () => track.scrollBy({ left: -step(), behavior: "smooth" })));
    scope.querySelectorAll("[data-reel-next]").forEach(b =>
      b.addEventListener("click", () => track.scrollBy({ left: step(), behavior: "smooth" })));
  });

  // Demo form handler — prevent real submission, show toast via Alpine store
  document.querySelectorAll("form[data-demo-form]").forEach(f => {
    f.addEventListener("submit", e => {
      e.preventDefault();
      const store = Alpine.store("shop");
      if (store) store.showToast(f.dataset.demoForm || "Thank you! We'll be in touch shortly.");
      f.reset();
    });
  });
});
