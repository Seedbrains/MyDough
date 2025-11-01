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
