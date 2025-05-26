// Función para inicializar el tema
function initializeTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const html = document.documentElement;
  
  // Verificar tema guardado o preferencia del sistema
  const savedTheme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  // Aplicar tema guardado
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme, themeIcon);
  
  // Configurar el toggle del tema
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme, themeIcon);
    });
  }
}

// Actualizar ícono del tema - ACTUALIZADO CON SKULL
function updateThemeIcon(theme: string, iconElement: HTMLElement | null): void {
  if (!iconElement) return;
  
  if (theme === 'dark') {
    iconElement.setAttribute('data-lucide', 'moon');
  } else {
    iconElement.setAttribute('data-lucide', 'skull'); // Cambiado de 'sun' a 'skull'
  }
  safeCreateIcons();
}

// Función segura para crear íconos Lucide
function safeCreateIcons() {
  if (typeof window !== 'undefined' && window.lucide) {
    try {
      window.lucide.createIcons();
    } catch (error) {
      console.warn('Error initializing Lucide icons:', error);
    }
  }
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', initializeAll);

// Smooth scrolling for navigation links
function setupSmoothScrolling(): void {
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
}

// Scroll indicator
function setupScrollIndicator(): void {
    function updateScrollIndicator(): void {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        const scrollIndicator = document.getElementById('scrollIndicator');
        if (scrollIndicator) {
            scrollIndicator.style.width = `${scrollPercent}%`;
        }
    }

    window.addEventListener('scroll', updateScrollIndicator);
}

// Intersection Observer for animations
function setupAnimations(): void {
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

    // Observar elementos animados
    document.querySelectorAll<HTMLElement>('.animate-fade-in-up, .animate-slide-in-left, .animate-slide-in-right').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });
}

// Mobile menu toggle
function setupMobileMenu(): void {
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
            safeCreateIcons();
        });
    }

    mobileMenu.addEventListener('click', (e: Event) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'A' || target.closest('#closeMenu')) {
            isMenuOpen = false;
            mobileMenu.style.transform = 'translateX(100%)';
        }
    });
}

// Form submission
function setupContactForm(): void {
    const contactForm = document.querySelector<HTMLFormElement>('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            
            const button = contactForm.querySelector('button');
            if (button) {
                const originalText = button.innerHTML;
                button.innerHTML = '<i data-lucide="check" class="w-5 h-5"></i> ¡Enviado!';
                button.style.background = 'linear-gradient(45deg, var(--accent-primary), var(--accent-secondary))';
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.style.background = 'var(--accent-primary)';
                    contactForm.reset();
                }, 3000);
                
                safeCreateIcons();
            }
        });
    }
}

// Efecto hover para las tarjetas de proyecto
function setupProjectCardsHover(): void {
    document.querySelectorAll<HTMLElement>('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Efecto de escritura para el título principal
function setupTypeWriterEffect(): void {
    function typeWriter(element: HTMLElement, text: string, speed = 100): void {
        let i = 0;
        element.innerHTML = '';
        
        function type(): void {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Inicializar efecto después de cargar la página
    window.addEventListener('load', () => {
        setTimeout(() => {
            const heroTitle = document.querySelector<HTMLElement>('#inicio h1');
            if (heroTitle) {
                typeWriter(heroTitle, 'Analista\nde Datos', 150);
            }
        }, 1000);
    });
}

// Animación para los íconos flotantes
function setupFloatingIcons(): void {
    document.querySelectorAll<HTMLElement>('.floating-icon').forEach((icon, index) => {
        icon.style.animation = `float 3s ease-in-out ${index * 0.5}s infinite`;
    });

    // Añadir CSS para la animación si no existe
    if (!document.getElementById('float-animation-style')) {
        const style = document.createElement('style');
        style.id = 'float-animation-style';
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Inicializar todas las funcionalidades
function initializeAll(): void {
    initializeTheme();
    setupSmoothScrolling();
    setupScrollIndicator();
    setupAnimations();
    setupMobileMenu();
    setupContactForm();
    setupProjectCardsHover();
    setupTypeWriterEffect();
    setupFloatingIcons();
    safeCreateIcons();
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', initializeAll);