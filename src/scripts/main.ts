// src/scripts/Main.ts

// Smooth scrolling for navigation links
document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e: Event) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href')!);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Scroll indicator
function updateScrollIndicator() {
  const scrollTop = window.pageYOffset;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  const scrollIndicator = document.getElementById('scrollIndicator');
  if (scrollIndicator) {
    scrollIndicator.style.width = `${scrollPercent}%`;
  }
}

window.addEventListener('scroll', updateScrollIndicator);

// Intersection Observer for animations
const observerOptions: IntersectionObserverInit = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target as HTMLElement;
      target.style.opacity = '1';
      target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Función segura para crear íconos
const safeCreateIcons = () => {
  if (typeof window !== 'undefined' && window.lucide) {
    try {
      window.lucide.createIcons();
    } catch (error) {
      console.warn('Error initializing Lucide icons:', error);
    }
  }
};

// Observe all animated elements
document.querySelectorAll<HTMLElement>('.animate-fade-in-up, .animate-slide-in-left, .animate-slide-in-right').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.8s ease-out';
  observer.observe(el);
});

// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.createElement('div');
mobileMenu.className = 'mobile-menu fixed inset-0 bg-slate-900/95 backdrop-blur-sm z-40 md:hidden transform translate-x-full transition-transform duration-300';
mobileMenu.innerHTML = `
  <div class="flex flex-col items-center justify-center h-full space-y-8">
    <a href="#inicio" class="text-2xl text-white hover:text-blue-400 transition-colors">Inicio</a>
    <a href="#about" class="text-2xl text-white hover:text-blue-400 transition-colors">Sobre mí</a>
    <a href="#skills" class="text-2xl text-white hover:text-blue-400 transition-colors">Habilidades</a>
    <a href="#projects" class="text-2xl text-white hover:text-blue-400 transition-colors">Proyectos</a>
    <a href="#contact" class="text-2xl text-white hover:text-blue-400 transition-colors">Contacto</a>
    <button id="closeMenu" class="absolute top-8 right-8">
      <i data-lucide="x" class="w-8 h-8 text-white"></i>
    </button>
  </div>
`;
document.body.appendChild(mobileMenu);

let isMenuOpen = false;

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    mobileMenu.style.transform = isMenuOpen ? 'translateX(0)' : 'translateX(100%)';
    if (window.lucide) {
      safeCreateIcons();
    }
  });
}

mobileMenu.addEventListener('click', (e: Event) => {
  const target = e.target as HTMLElement;
  if (target.tagName === 'A' || target.closest('#closeMenu')) {
    isMenuOpen = false;
    mobileMenu.style.transform = 'translateX(100%)';
  }
});

// Parallax effect for hero particles
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  document.querySelectorAll<HTMLElement>('.hero-particle').forEach((particle, index) => {
    const speed = (index + 1) * 0.5;
    particle.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Form submission
const contactForm = document.querySelector<HTMLFormElement>('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    
    const button = contactForm.querySelector('button');
    if (button) {
      const originalText = button.innerHTML;
      button.innerHTML = '<i data-lucide="check" class="w-5 h-5"></i> ¡Enviado!';
      button.style.background = 'linear-gradient(45deg, #10b981, #059669)';
      
      setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = 'linear-gradient(45deg, #3b82f6, #8b5cf6)';
        contactForm.reset();
      }, 3000);
      
      if (window.lucide) {
        safeCreateIcons();
      }
    }
  });
}

// Add hover effect to project cards
document.querySelectorAll<HTMLElement>('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0) scale(1)';
  });
});

// Add typing effect to hero title
function typeWriter(element: HTMLElement, text: string, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize typing effect after page load
window.addEventListener('load', () => {
  setTimeout(() => {
    const heroTitle = document.querySelector<HTMLElement>('#inicio h1');
    if (heroTitle) {
      typeWriter(heroTitle, 'Analista\nde Datos', 150);
    }
  }, 1000);
});

// Add gradient animation to text
document.querySelectorAll<HTMLElement>('.gradient-text').forEach(text => {
  text.style.backgroundSize = '200% 200%';
  text.style.animation = 'gradient 3s ease infinite';
});

// Add CSS for gradient animation
const style = document.createElement('style');
style.textContent = `
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;
document.head.appendChild(style);