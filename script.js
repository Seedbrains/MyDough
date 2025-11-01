/* ---------- Basic entrance animations with anime.js ---------- */
/* NOTE: anime.js is loaded in index.html before this script.
   We also trigger reveal animations when elements enter viewport. */

document.addEventListener('DOMContentLoaded', () => {
  // page load timeline
  const tl = anime.timeline({ easing: 'easeOutCubic', duration: 700 });

  tl
  .add({
    targets: '.brand',
    translateY: [-18, 0],
    opacity: [0, 1]
  })
  .add({
    targets: '.main-nav a',
    translateY: [-10, 0],
    opacity: [0, 1],
    delay: anime.stagger(100)
  }, '-=500')
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

  // Smooth scroll for nav links
  document.querySelectorAll('.main-nav a').forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const id = a.getAttribute('href').replace('#','');
      const el = document.getElementById(id);
      if(!el) return;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 12, behavior: 'smooth' });
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
});


const products = [
        [
          { name: "Buttercream Dream", price: "₱250", img: "assets/product1.jpg" },
          { name: "Strawberry Swirl", price: "₱280", img: "assets/product2.jpg" },
          { name: "Choco Layers", price: "₱300", img: "assets/product3.jpg" },
          { name: "Lemon Zest", price: "₱240", img: "assets/product4.jpg" },
          { name: "Matcha Joy", price: "₱270", img: "assets/product5.jpg" },
          { name: "Classic Vanilla", price: "₱220", img: "assets/product6.jpg" },
        ],
        [
          { name: "Red Velvet Bliss", price: "₱290", img: "assets/product7.jpg" },
          { name: "Caramel Crunch", price: "₱260", img: "assets/product8.jpg" },
          { name: "Mint Chip Magic", price: "₱250", img: "assets/product9.jpg" },
          { name: "Cookies n’ Cream", price: "₱280", img: "assets/product10.jpg" },
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
        grid.innerHTML = items.map(p => `
          <article class="product">
            <div class="product-media">
              <img src="${p.img}" alt="${p.name}" onerror="this.style.backgroundColor='#ddd'; this.src='';">
            </div>
            <div class="product-meta">
              <h3>${p.name}</h3>
              <p class="price">${p.price}</p>
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

