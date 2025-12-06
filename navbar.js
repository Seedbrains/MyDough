/* Universal Navbar Handler - Load this on every page */

document.addEventListener('DOMContentLoaded', () => {
  // Check if user is logged in and update navbar
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const authLink = document.getElementById('authLink');

  if (currentUser && authLink) {
    authLink.textContent = 'Account';
    authLink.setAttribute('aria-label', 'Account');
    authLink.href = 'account.html';
    
    // Create hover popup
    createAccountPopup(authLink);
  }

  // Animate navbar on load
  anime({
    targets: '.brand',
    translateY: [-18, 0],
    opacity: [0, 1],
    duration: 700,
    easing: 'easeOutCubic'
  });

  anime({
    targets: '.main-nav a',
    translateY: [-10, 0],
    opacity: [0, 1],
    delay: anime.stagger(100),
    duration: 700,
    easing: 'easeOutCubic'
  });

  // Smooth scroll for internal links (anchors starting with #)
  document.querySelectorAll('.main-nav a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const id = a.getAttribute('href').substring(1);
      const el = document.getElementById(id);
      if (!el) return;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 80,
        behavior: 'smooth'
      });
    });
  });

  // Page transition fade out for navigation (excluding popup links)
  document.querySelectorAll('a[href]').forEach(link => {
    const url = link.getAttribute('href');
    // Skip popup links - they handle their own navigation
    if (link.classList.contains('account-popup-link')) {
      return;
    }
    // Only apply to internal pages (not anchors, not external links)
    if (url && !url.startsWith('#') && !url.startsWith('http') && !url.startsWith('mailto')) {
      link.addEventListener('click', e => {
        if (!link.classList.contains('no-transition')) {
          e.preventDefault();
          anime({
            targets: 'body',
            opacity: [1, 0],
            duration: 500,
            easing: 'easeInQuad',
            complete: () => {
              window.location.href = url;
            }
          });
        }
      });
    }
  });
});

function createAccountPopup(authLink) {
  // Create popup HTML
  const popup = document.createElement('div');
  popup.className = 'account-popup';
  popup.innerHTML = `
    <a href="account.html" class="account-popup-link">MY ACCOUNT</a>
    <a href="purchases.html" class="account-popup-link">MY PURCHASES</a>
    <a href="#" class="account-popup-link" id="popupLogout">LOGOUT</a>
  `;
  
  // Insert popup after auth link
  authLink.style.position = 'relative';
const wrapper = authLink.parentElement; // .auth-link-wrapper
wrapper.appendChild(popup);


  // Show/hide popup on hover
  let hoverTimeout;
  
  authLink.addEventListener('mouseenter', () => {
    clearTimeout(hoverTimeout);
    popup.style.display = 'flex';
    anime({
      targets: popup,
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 300,
      easing: 'easeOutQuad'
    });
  });
  
  authLink.addEventListener('mouseleave', () => {
    hoverTimeout = setTimeout(() => {
      anime({
        targets: popup,
        opacity: [1, 0],
        translateY: [0, 10],
        duration: 300,
        easing: 'easeInQuad',
        complete: () => {
          popup.style.display = 'none';
        }
      });
    }, 200);
  });
  
  // Keep popup visible when hovering over it
  popup.addEventListener('mouseenter', () => {
    clearTimeout(hoverTimeout);
  });
  
  popup.addEventListener('mouseleave', () => {
    hoverTimeout = setTimeout(() => {
      anime({
        targets: popup,
        opacity: [1, 0],
        translateY: [0, 10],
        duration: 300,
        easing: 'easeInQuad',
        complete: () => {
          popup.style.display = 'none';
        }
      });
    }, 200);
  });
  
  // Handle popup link clicks with page transition
  popup.querySelectorAll('.account-popup-link:not(#popupLogout)').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const url = link.getAttribute('href');
      anime({
        targets: 'body',
        opacity: [1, 0],
        duration: 500,
        easing: 'easeInQuad',
        complete: () => {
          window.location.href = url;
        }
      });
    });
  });
  
  // Logout functionality
  document.getElementById('popupLogout').addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('currentUser');
      window.location.href = 'login.html';
    }
  });
}
