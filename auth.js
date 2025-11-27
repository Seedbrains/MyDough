document.addEventListener('DOMContentLoaded', () => {
  // Page fade in animation on load
  anime({
    targets: 'body',
    opacity: [0, 1],
    duration: 600,
    easing: 'easeOutQuad'
  });

  // Animate curve coming down
  anime({
    targets: '.curve',
    opacity: [0, 1],
    translateY: [-50, 0],
    duration: 1000,
    easing: 'easeOutCubic'
  });

  // Page entrance animation for form
  anime({
    targets: '.auth-form-wrapper',
    translateY: [30, 0],
    opacity: [0, 1],
    duration: 800,
    delay: 200,
    easing: 'easeOutCubic'
  });

  // Get form elements
  const loginFormWrapper = document.getElementById('loginForm');
  const signupFormWrapper = document.getElementById('signupForm');
  const loginFormElement = document.getElementById('loginFormElement');
  const signupFormElement = document.getElementById('signupFormElement');
  const showSignupLink = document.getElementById('showSignup');
  const showLoginLink = document.getElementById('showLogin');

  // Toggle between login and signup
  showSignupLink.addEventListener('click', (e) => {
    e.preventDefault();
    
    anime({
      targets: loginFormWrapper,
      opacity: [1, 0],
      translateX: [-20, 0],
      duration: 300,
      easing: 'easeInQuad',
      complete: () => {
        loginFormWrapper.classList.add('hidden');
        signupFormWrapper.classList.remove('hidden');
        anime({
          targets: signupFormWrapper,
          opacity: [0, 1],
          translateX: [20, 0],
          duration: 300,
          easing: 'easeOutQuad'
        });
      }
    });
  });

  showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    
    anime({
      targets: signupFormWrapper,
      opacity: [1, 0],
      translateX: [20, 0],
      duration: 300,
      easing: 'easeInQuad',
      complete: () => {
        signupFormWrapper.classList.add('hidden');
        loginFormWrapper.classList.remove('hidden');
        anime({
          targets: loginFormWrapper,
          opacity: [0, 1],
          translateX: [-20, 0],
          duration: 300,
          easing: 'easeOutQuad'
        });
      }
    });
  });

  // Handle Signup
  signupFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('signupUsername').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    const email = document.getElementById('signupEmail').value.trim();

    // Remove any existing messages
    const existingMsg = signupFormWrapper.querySelector('.error-message, .success-message');
    if (existingMsg) existingMsg.remove();

    // Validation
    if (password !== confirmPassword) {
      showMessage(signupFormWrapper, 'Passwords do not match!', 'error');
      return;
    }

    if (password.length < 6) {
      showMessage(signupFormWrapper, 'Password must be at least 6 characters long!', 'error');
      return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.find(u => u.username === username);

    if (userExists) {
      showMessage(signupFormWrapper, 'Username already exists!', 'error');
      return;
    }

    // Create new user
    const newUser = {
      username,
      password,
      email,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    // Show success message
    showMessage(signupFormWrapper, 'Account created successfully! Redirecting...', 'success');

    // Log user in and redirect
    setTimeout(() => {
      localStorage.setItem('currentUser', JSON.stringify({ username, email }));
      window.location.href = 'index.html';
    }, 1500);
  });

  // Handle Login
  loginFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;

    // Remove any existing messages
    const existingMsg = loginFormWrapper.querySelector('.error-message, .success-message');
    if (existingMsg) existingMsg.remove();

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
      showMessage(loginFormWrapper, 'Invalid username or password!', 'error');
      return;
    }

    // Show success message
    showMessage(loginFormWrapper, 'Login successful! Redirecting...', 'success');

    // Store current user and redirect
    setTimeout(() => {
      localStorage.setItem('currentUser', JSON.stringify({ username: user.username, email: user.email }));
      window.location.href = 'index.html';
    }, 1000);
  });

  // Helper function to show messages
  function showMessage(wrapper, text, type) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `${type}-message show`;
    msgDiv.textContent = text;
    wrapper.querySelector('.auth-form').insertAdjacentElement('beforebegin', msgDiv);
    
    anime({
      targets: msgDiv,
      translateY: [-10, 0],
      opacity: [0, 1],
      duration: 300,
      easing: 'easeOutQuad'
    });
  }
});