/* ---------- Basic entrance animations with anime.js ---------- */
/* NOTE: anime.js is loaded in index.html before this script.
   We also trigger reveal animations when elements enter viewport. */

document.addEventListener('DOMContentLoaded', () => {
  // page load timeline
  const tl = anime.timeline({ easing: 'easeOutCubic', duration: 700 });

  tl
  .add({
    targets: '.hero-title',
    translateX: [40, 0],
    opacity: [0, 1]
  }, '-=400')
  .add({
    targets: '.hero-sub',
    translateY: [-10, 0],
    opacity: [0, 1]
  }, '-=350')
  .add({
    targets: '#cake',
    translateY: [80, 0],
    opacity: [0, 1],
    duration: 900,
    easing: 'easeOutElastic(1, .7)'
  }, '-=450')
  .add({
    targets: '.go-btn',
    scale: [0.8, 1],
    opacity: [0, 1],
    duration: 900,
    easing: 'easeOutElastic(1, .75)'
  }, '-=550');


  // Go button hover pulse
  const goBtn = document.getElementById('goBtn');
  if (goBtn) {
    goBtn.addEventListener('mouseenter', () => {
      anime.remove(goBtn);
      anime({
        targets: goBtn,
        scale: 1.04,
        duration: 220,
        easing: 'easeOutQuad'
      });
    });
    goBtn.addEventListener('mouseleave', () => {
      anime.remove(goBtn);
      anime({
        targets: goBtn,
        scale: 1,
        duration: 220,
        easing: 'easeOutQuad'
      });
    });
  }

  // Smooth scroll for internal links only (those starting with #)
  document.querySelectorAll('.main-nav a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const id = a.getAttribute('href').substring(1);
      const el = document.getElementById(id);
      if (!el) return;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 12,
        behavior: 'smooth'
      });
    });
  });

  // Smooth scroll for internal links only (those starting with #)
  document.querySelectorAll('.main-nav a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const id = a.getAttribute('href').substring(1);
      const el = document.getElementById(id);
      if (!el) return;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 12,
        behavior: 'smooth'
      });
    });
  });

  // Intersection-based reveal: animate elements as they scroll into view
  const revealTargets = document.querySelectorAll('.product, .about-inner, .section-title, .top-cards, .product-grid .product');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        anime({
          targets: entry.target,
          translateY: [18, 0],
          opacity: [0, 1],
          duration: 700,
          easing: 'easeOutCubic'
        });
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach(t => io.observe(t));

  /* ---------- Page transition animation ---------- */
  // Fade in on load
  anime({
    targets: 'body',
    opacity: [0, 1],
    duration: 600,
    easing: 'easeOutQuad'
  });
});


/* ---------- Product rendering ---------- */
const products = [
  [
    { name: "Buttercream Dream", price: "₱250", img: "assets/product1.jpg" },
    { name: "Strawberry Swirl", price: "₱280", img: "assets/product2.jpg" },
    { name: "Choco Layers", price: "₱300", img: "assets/product3.jpg" },
    { name: "Lemon Drizzle", price: "₱240", img: "assets/product4.jpg" },
    { name: "Matcha Joy", price: "₱270", img: "assets/product5.jpg" },
    { name: "Classic Vanilla", price: "₱220", img: "assets/product6.jpg" },
  ],
  [
    { name: "Red Velvet Bliss", price: "₱290", img: "assets/product7.jpg" },
    { name: "Caramel Crunch", price: "₱260", img: "assets/product8.jpg" },
    { name: "Mint Chip Magic", price: "₱250", img: "assets/product9.jpg" },
    { name: "Cookies n' Cream", price: "₱280", img: "assets/product10.jpg" },
    { name: "Dark Fudge", price: "₱310", img: "assets/product11.jpg" },
    { name: "Hazelnut Heaven", price: "₱320", img: "assets/product12.jpg" },
  ],
  [
    { name: "Mocha Mood", price: "₱250", img: "assets/product13.jpg" },
    { name: "Blueberry Burst", price: "₱280", img: "assets/product14.jpg" },
    { name: "Peanut Butter Pie", price: "₱270", img: "assets/product15.jpg" },
    { name: "Raspberry Ripple", price: "₱290", img: "assets/product16.jpg" },
    { name: "Honey Crunch", price: "₱260", img: "assets/product17.jpg" },
    { name: "Velvet Choco Chip", price: "₱300", img: "assets/product18.jpg" },
  ],
  [
    { name: "Tiramisu Touch", price: "₱340", img: "assets/product19.jpg" },
    { name: "Banoffee Bliss", price: "₱300", img: "assets/product20.jpg" },
    { name: "Berry Cheesecake", price: "₱330", img: "assets/product21.jpg" },
    { name: "Salted Caramel Slice", price: "₱310", img: "assets/product22.jpg" },
    { name: "Orange Cream Delight", price: "₱280", img: "assets/product23.jpg" },
    { name: "Pistachio Paradise", price: "₱350", img: "assets/product24.jpg" },
  ]
];

const grid = document.getElementById('productGrid');
const buttons = document.querySelectorAll('.page-btn');

function renderProducts(pageIndex) {
  const items = products[pageIndex];
  grid.innerHTML = items.map((p, index) => `
    <article class="product">
      <a href="product.html?id=${pageIndex * 6 + index + 1}" class="product-link">
        <div class="product-media">
          <img src="${p.img}" alt="${p.name}" onerror="this.style.backgroundColor='#ddd'; this.src='';">
        </div>
        <div class="product-meta">
          <h3>${p.name}</h3>
          <p class="price">${p.price}</p>
        </div>
      </a>
      <div class="product-buttons">
        <button class="btn buy-now">Buy Now</button>
        <button class="btn add-cart">Add to Cart</button>
      </div>
    </article>
  `).join('');
}

renderProducts(0);

buttons.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderProducts(i);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Render Top Picks (first 3 products from your first page)
  const topCards = document.getElementById("topCards");
  if (topCards && Array.isArray(products) && products.length > 0) {
    const topPicks = products[0].slice(0, 3);
    topCards.innerHTML = topPicks.map((p, index) => `
      <article class="product">
        <a href="product.html?id=${index + 1}">
          <div class="product-media">
            <img src="${p.img}" alt="${p.name}" onerror="this.style.backgroundColor='#ddd'; this.src='';">
          </div>
          <div class="product-meta">
            <h3>${p.name}</h3>
            <p class="price">${p.price}</p>
          </div>
        </a>
      </article>
    `).join('');
  }
});

/* ---------- CART FUNCTIONALITY ---------- */
function addToCart(product) {
  // Get existing cart or create a new one
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Check if item already exists
  const existing = cart.find(item => item.name === product.name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  // Save updated cart
  localStorage.setItem('cart', JSON.stringify(cart));

  // Small visual feedback
  alert(`${product.name} added to cart!`);
}

// Attach Add to Cart button events
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.add-cart').forEach((btn, index) => {
    btn.addEventListener('click', () => {
      // Determine which product was clicked based on current page products
      const pageBtn = document.querySelector('.page-btn.active');
      const pageIndex = pageBtn ? parseInt(pageBtn.dataset.page) - 1 : 0;
      const items = products[pageIndex];
      const product = items[index];
      addToCart(product);
    });
  });
});

  document.addEventListener('DOMContentLoaded', () => {
      // Page fade in animation
      anime({
        targets: 'body',
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutQuad'
      });

      // Animate curve
      anime({
        targets: '.curve',
        opacity: [0, 1],
        translateY: [-50, 0],
        duration: 1000,
        easing: 'easeOutCubic'
      });

      // Animate account sections
      anime({
        targets: '.account-sidebar, .account-main',
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        delay: anime.stagger(150, {start: 200}),
        easing: 'easeOutCubic'
      });

      // Load user data
      const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
      
      document.getElementById('username').value = currentUser.username || '';
      document.getElementById('name').value = currentUser.name || '';
      document.getElementById('email').value = currentUser.email || '';
      document.getElementById('phone').value = currentUser.phone || '';
      document.getElementById('gender').value = currentUser.gender || '';
      document.getElementById('dob').value = currentUser.dob || '';
      document.getElementById('sidebarUsername').textContent = currentUser.username || 'USERNAME';

      // Load profile picture if exists
      if (currentUser.profilePic) {
        const sidebarPic = document.getElementById('sidebarProfilePic');
        const previewPic = document.getElementById('profilePicPreview');
        sidebarPic.innerHTML = `<img src="${currentUser.profilePic}" alt="Profile">`;
        previewPic.innerHTML = `<img src="${currentUser.profilePic}" alt="Profile">`;
      }

      // Profile picture upload
      const uploadBtn = document.getElementById('uploadBtn');
      const profilePicInput = document.getElementById('profilePicInput');

      uploadBtn.addEventListener('click', () => {
        profilePicInput.click();
      });

      profilePicInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const imageUrl = e.target.result;
            document.getElementById('profilePicPreview').innerHTML = `<img src="${imageUrl}" alt="Profile">`;
            document.getElementById('sidebarProfilePic').innerHTML = `<img src="${imageUrl}" alt="Profile">`;
            currentUser.profilePic = imageUrl;
          };
          reader.readAsDataURL(file);
        }
      });

      // Save profile
      document.getElementById('profileForm').addEventListener('submit', (e) => {
        e.preventDefault();

        currentUser.name = document.getElementById('name').value;
        currentUser.email = document.getElementById('email').value;
        currentUser.phone = document.getElementById('phone').value;
        currentUser.gender = document.getElementById('gender').value;
        currentUser.dob = document.getElementById('dob').value;
        currentUser.address = currentUser.address || 'Not set';

        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        // Update users array too
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.username === currentUser.username);
        if (userIndex !== -1) {
          users[userIndex] = { ...users[userIndex], ...currentUser };
          localStorage.setItem('users', JSON.stringify(users));
        }

        alert('Profile updated successfully!');
      });

      // Logout
      document.getElementById('logoutBtn').addEventListener('click', () => {
        if (confirm('Are you sure you want to logout?')) {
          localStorage.removeItem('currentUser');
          window.location.href = 'login.html';
        }
      });
    });
