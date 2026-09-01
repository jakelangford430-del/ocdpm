document.addEventListener('DOMContentLoaded', function() {
  setActiveNavigation();
  setupFormHandling();
  setupScrollAnimations();
});

function setActiveNavigation() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href').split('/').pop() || 'index.html';
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function setupFormHandling() {
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        console.log('Form submitted:', data);

        alert('Thank you for reaching out! We will be in touch soon.');
        this.reset();
      });
    }
  }
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains('fade-in-scroll')) {
          entry.target.classList.add('visible');
        }
        if (entry.target.classList.contains('stagger-item')) {
          entry.target.classList.add('visible');
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in-scroll, .stagger-item').forEach(el => {
    observer.observe(el);
  });

  const staggerLists = document.querySelectorAll('.stagger-list');
  staggerLists.forEach(list => {
    const items = list.querySelectorAll('li, .feature, > div');
    items.forEach((item, index) => {
      item.classList.add('stagger-item');
      item.style.animationDelay = (index * 0.1) + 's';
    });
  });
}
