/* ========================================
   MINCONE & MINCONE, P.C. - MAIN JAVASCRIPT
   Premium Law Firm Website
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initFAQ();
  initForms();
  initSmoothScroll();
});

/* ===== NAVBAR ===== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  // Add scrolled class on scroll
  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initial state
}

/* ===== MOBILE MENU ===== */
function initMobileMenu() {
  const toggle = document.querySelector('.navbar-toggle');
  const menu = document.querySelector('.navbar-menu');
  const dropdowns = document.querySelectorAll('.navbar-dropdown');
  
  if (!toggle || !menu) return;
  
  // Toggle mobile menu
  toggle.addEventListener('click', function() {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
  });
  
  // Handle dropdown toggles on mobile
  dropdowns.forEach(dropdown => {
    const dropdownToggle = dropdown.querySelector('.navbar-dropdown-toggle');
    
    dropdownToggle.addEventListener('click', function(e) {
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        dropdown.classList.toggle('active');
      }
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Close menu on resize to desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth > 1024) {
      toggle.classList.remove('active');
      menu.classList.remove('active');
      document.body.style.overflow = '';
      dropdowns.forEach(d => d.classList.remove('active'));
    }
  });
}

/* ===== SCROLL ANIMATIONS ===== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');
  
  if (!animatedElements.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add delay if specified
        const delay = entry.target.dataset.animateDelay || 0;
        setTimeout(() => {
          entry.target.classList.add('animated');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  animatedElements.forEach(el => observer.observe(el));
}

/* ===== FAQ ACCORDION ===== */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  if (!faqItems.length) return;
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', function() {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active', !isActive);
    });
  });
}

/* ===== FORMS ===== */
function initForms() {
  const forms = document.querySelectorAll('form[data-validate]');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (validateForm(form)) {
        handleFormSubmit(form);
      }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateField(input);
      });
      
      input.addEventListener('input', function() {
        if (input.closest('.form-group').classList.contains('error')) {
          validateField(input);
        }
      });
    });
  });
}

function validateForm(form) {
  const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
  let isValid = true;
  
  inputs.forEach(input => {
    if (!validateField(input)) {
      isValid = false;
    }
  });
  
  // Validate checkbox if required
  const consentCheckbox = form.querySelector('input[name="consent"]');
  if (consentCheckbox && !consentCheckbox.checked) {
    const formGroup = consentCheckbox.closest('.form-group');
    if (formGroup) {
      formGroup.classList.add('error');
      const errorEl = formGroup.querySelector('.form-error');
      if (errorEl) errorEl.textContent = 'You must agree to continue';
    }
    isValid = false;
  }
  
  return isValid;
}

function validateField(input) {
  const formGroup = input.closest('.form-group');
  if (!formGroup) return true;
  
  const errorEl = formGroup.querySelector('.form-error');
  let isValid = true;
  let errorMessage = '';
  
  // Check required
  if (input.required && !input.value.trim()) {
    isValid = false;
    errorMessage = 'This field is required';
  }
  
  // Check email format
  if (input.type === 'email' && input.value.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    }
  }
  
  // Check phone format
  if (input.type === 'tel' && input.value.trim()) {
    const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
    if (!phoneRegex.test(input.value)) {
      isValid = false;
      errorMessage = 'Please enter a valid phone number';
    }
  }
  
  // Update UI
  if (isValid) {
    formGroup.classList.remove('error');
  } else {
    formGroup.classList.add('error');
    if (errorEl) errorEl.textContent = errorMessage;
  }
  
  return isValid;
}

function handleFormSubmit(form) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  // Log form data (replace with actual submission logic)
  console.log('Form submitted:', data);
  
  // Show success state
  const formContainer = form.closest('.form-container') || form.parentElement;
  const successMessage = formContainer.querySelector('.form-success');
  
  if (successMessage) {
    form.style.display = 'none';
    successMessage.classList.add('active');
  } else {
    // Create inline success message
    form.innerHTML = `
      <div class="form-success active">
        <div class="form-success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3>Thank You!</h3>
        <p>Your message has been received. We'll get back to you within 24 hours.</p>
      </div>
    `;
  }
}

/* ===== SMOOTH SCROLL ===== */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        const menu = document.querySelector('.navbar-menu');
        const toggle = document.querySelector('.navbar-toggle');
        if (menu?.classList.contains('active')) {
          menu.classList.remove('active');
          toggle?.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
  });
}

/* ===== PHONE NUMBER FORMATTING ===== */
function formatPhoneNumber(input) {
  let value = input.value.replace(/\D/g, '');
  
  if (value.length >= 10) {
    value = `(${value.slice(0,3)}) ${value.slice(3,6)}-${value.slice(6,10)}`;
  } else if (value.length >= 6) {
    value = `(${value.slice(0,3)}) ${value.slice(3,6)}-${value.slice(6)}`;
  } else if (value.length >= 3) {
    value = `(${value.slice(0,3)}) ${value.slice(3)}`;
  }
  
  input.value = value;
}

// Auto-format phone inputs
document.addEventListener('input', function(e) {
  if (e.target.type === 'tel') {
    formatPhoneNumber(e.target);
  }
});

/* ===== LAZY LOADING IMAGES ===== */
if ('loading' in HTMLImageElement.prototype) {
  // Browser supports native lazy loading
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    if (img.dataset.src) {
      img.src = img.dataset.src;
    }
  });
} else {
  // Fallback for browsers without native lazy loading
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
        }
        imageObserver.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => imageObserver.observe(img));
}

/* ===== CURRENT YEAR FOR FOOTER ===== */
document.addEventListener('DOMContentLoaded', function() {
  const yearElements = document.querySelectorAll('[data-current-year]');
  const currentYear = new Date().getFullYear();
  yearElements.forEach(el => {
    el.textContent = currentYear;
  });
});

/* ===== VIDEO PLAY/PAUSE ON VISIBILITY ===== */
function initHeroVideo() {
  const video = document.querySelector('.hero-video');
  if (!video) return;

  // Ensure mobile autoplay by explicitly setting inline playback and muted flags
  video.muted = true;
  video.playsInline = true;
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  video.setAttribute('x5-playsinline', '');
  video.setAttribute('muted', '');
  video.setAttribute('autoplay', '');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.play().catch(() => {
          // Autoplay was prevented, that's okay
        });
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.25 });
  
  observer.observe(video);
}

document.addEventListener('DOMContentLoaded', initHeroVideo);

/* ===== TESTIMONIALS SLIDER (Optional) ===== */
function initTestimonialSlider() {
  const slider = document.querySelector('.testimonials-slider');
  if (!slider) return;
  
  const slides = slider.querySelectorAll('.testimonial-slide');
  const prevBtn = slider.querySelector('.slider-prev');
  const nextBtn = slider.querySelector('.slider-next');
  const dotsContainer = slider.querySelector('.slider-dots');
  
  let currentIndex = 0;
  const totalSlides = slides.length;
  
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
      showSlide(currentIndex);
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % totalSlides;
      showSlide(currentIndex);
    });
  }
  
  // Create dots
  if (dotsContainer) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        currentIndex = i;
        showSlide(currentIndex);
      });
      dotsContainer.appendChild(dot);
    });
  }
  
  // Auto-advance
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
  }, 5000);
}

document.addEventListener('DOMContentLoaded', initTestimonialSlider);

/* ===== SCROLL TO TOP ===== */
function initScrollToTop() {
  const scrollBtn = document.querySelector('.scroll-to-top');
  if (!scrollBtn) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });
  
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

document.addEventListener('DOMContentLoaded', initScrollToTop);
