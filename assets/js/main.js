/**
 * EDUARDO DA COSTA BATISTA — ACADEMIC PORTFOLIO
 * Minimalist UI & Motion Controller (inspired by vdeborto.github.io / al-folio)
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initProgressBar();
  initNavbarScroll();
  initMobileMenu();
  initPublicationFilters();
  initDrawers();
  initCopyActions();
  initBackToTop();
});

/* --------------------------------------------------------------------------
   THEME TOGGLE SYSTEM (Light / Dark)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  
  const savedTheme = localStorage.getItem('theme-preference');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  
  applyTheme(initialTheme);
  
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('theme-preference', newTheme);
      showToast(`Tema ${newTheme === 'dark' ? 'escuro' : 'claro'} ativado`);
    });
  }
  
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme-preference')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeIcon = document.getElementById('theme-icon');
  if (themeIcon) {
    themeIcon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
}

/* --------------------------------------------------------------------------
   READING PROGRESS BAR
   -------------------------------------------------------------------------- */
function initProgressBar() {
  const progressBar = document.getElementById('reading-progress');
  if (!progressBar) return;
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   NAVBAR ACTIVE SECTION HIGHLIGHT
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    let currentId = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   MOBILE MENU TOGGLE
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (!toggleBtn || !navMenu) return;
  
  toggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('mobile-open');
  });
  
  navMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('mobile-open');
    });
  });
}

/* --------------------------------------------------------------------------
   PUBLICATIONS FILTERING & SEARCH
   -------------------------------------------------------------------------- */
function initPublicationFilters() {
  const filterBtns = document.querySelectorAll('.pub-filter-btn');
  const searchInput = document.getElementById('pub-search');
  const papers = document.querySelectorAll('.paper-item');
  
  let currentFilter = 'all';
  let searchQuery = '';
  
  function filterPapers() {
    papers.forEach(paper => {
      const category = paper.getAttribute('data-category') || '';
      const tags = paper.getAttribute('data-tags') || '';
      const text = paper.textContent.toLowerCase();
      
      const matchesFilter = currentFilter === 'all' || 
                            category.includes(currentFilter) || 
                            tags.includes(currentFilter);
                            
      const matchesSearch = !searchQuery || text.includes(searchQuery);
      
      paper.style.display = (matchesFilter && matchesSearch) ? 'block' : 'none';
    });
  }
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter') || 'all';
      filterPapers();
    });
  });
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      filterPapers();
    });
  }
}

/* --------------------------------------------------------------------------
   EXPANDABLE ABSTRACT & BIBTEX DRAWERS
   -------------------------------------------------------------------------- */
function initDrawers() {
  document.querySelectorAll('[data-toggle-drawer]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-toggle-drawer');
      const drawer = document.getElementById(targetId);
      if (!drawer) return;
      
      const isCurrentlyOpen = drawer.classList.contains('open');
      
      // Close sibling drawers in the same paper
      const parentPaper = btn.closest('.paper-item');
      if (parentPaper) {
        parentPaper.querySelectorAll('.paper-drawer').forEach(d => {
          if (d !== drawer) d.classList.remove('open');
        });
      }
      
      drawer.classList.toggle('open', !isCurrentlyOpen);
    });
  });
}

/* --------------------------------------------------------------------------
   COPY TO CLIPBOARD & TOAST NOTIFICATION
   -------------------------------------------------------------------------- */
function initCopyActions() {
  document.querySelectorAll('[data-copy-target]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-copy-target');
      const el = document.getElementById(targetId);
      if (!el) return;
      
      const text = el.innerText || el.textContent;
      navigator.clipboard.writeText(text).then(() => {
        showToast('BibTeX copiado');
      });
    });
  });
}

function showToast(message) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  
  toast.textContent = message;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

/* --------------------------------------------------------------------------
   BACK TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });
  
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

window.showToast = showToast;
