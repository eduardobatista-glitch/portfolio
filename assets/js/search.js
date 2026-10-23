/**
 * EDUARDO DA COSTA BATISTA — COMMAND PALETTE (Ctrl+K / ⌘K)
 * Minimalist Keyboard Spotlight (inspired by vdeborto.github.io / ninja-keys)
 */

document.addEventListener('DOMContentLoaded', () => {
  initCommandPalette();
});

function initCommandPalette() {
  const backdrop = document.getElementById('cmd-backdrop');
  const searchBtn = document.getElementById('search-toggle-btn');
  const cmdInput = document.getElementById('cmd-search-input');
  const cmdList = document.getElementById('cmd-results-list');
  const closeBtn = document.getElementById('cmd-close-btn');
  
  if (!backdrop || !cmdInput || !cmdList) return;
  
  const commandItems = [
    // Seções
    { id: 'nav-about', title: 'Sobre / Biografia', category: 'Navegação', icon: 'fa-user', action: () => scrollToSection('about') },
    { id: 'nav-cv', title: 'Trajetória & Formação', category: 'Navegação', icon: 'fa-timeline', action: () => scrollToSection('cv') },
    { id: 'nav-awards', title: 'Prêmios & Reconhecimentos Acadêmicos', category: 'Navegação', icon: 'fa-award', action: () => scrollToSection('awards') },
    { id: 'nav-news', title: 'Notícias & Destaques', category: 'Navegação', icon: 'fa-newspaper', action: () => scrollToSection('news') },
    { id: 'nav-projects', title: 'Pesquisa & Projetos', category: 'Navegação', icon: 'fa-flask', action: () => scrollToSection('projects') },
    { id: 'nav-pubs', title: 'Publicações Selecionadas', category: 'Navegação', icon: 'fa-book-open', action: () => scrollToSection('publications') },
    { id: 'nav-skills', title: 'Habilidades & Idiomas', category: 'Navegação', icon: 'fa-code', action: () => scrollToSection('skills') },
    
    // Prêmios
    { id: 'award-conic', title: 'Menção Honrosa no XX CONIC (IEAA/UFAM - 2026)', category: 'Prêmios', icon: 'fa-award', action: () => scrollToSection('awards') },
    { id: 'award-conbraf', title: 'Melhor Trabalho (Menção Honrosa) no 54º CONBRAF', category: 'Prêmios', icon: 'fa-award', action: () => scrollToSection('awards') },
    { id: 'award-workshop', title: 'Prêmio de Destaque no 2º Workshop de Agronomia (AgroConecta)', category: 'Prêmios', icon: 'fa-award', action: () => scrollToSection('awards') },
    
    // Projetos
    { id: 'proj-pesca', title: 'Monitoramento da Pesca no Médio Rio Madeira (TSBCAMP)', category: 'Pesquisa', icon: 'fa-fish', action: () => scrollToSection('projects') },
    { id: 'proj-solos', title: 'Sistematização de Dados Pedológicos da Amazônia', category: 'Pesquisa', icon: 'fa-mountain-sun', action: () => scrollToSection('projects') },
    { id: 'proj-cafe', title: 'Algoritmo Python: Diagnose de Phoma sp. em Café Robusta', category: 'Pesquisa', icon: 'fa-microchip', action: () => scrollToSection('projects') },
    { id: 'proj-adubacao', title: 'Recomendação de Adubação em Nuvem via Google Colab', category: 'Pesquisa', icon: 'fa-cloud', action: () => scrollToSection('projects') },
    
    // Artigos
    { id: 'pub-purus', title: 'Artigo: Focos de Calor no Interflúvio Purus-Madeira (Medicina)', category: 'Publicações', icon: 'fa-fire', action: () => scrollToSection('publications') },
    { id: 'pub-soja', title: 'Artigo: Sensoriamento Remoto em Soja na Amazônia (SELPER)', category: 'Publicações', icon: 'fa-satellite', action: () => scrollToSection('publications') },
    { id: 'pub-foodtec', title: 'Paper: Freshwater Fish Species Distribution (FoodTec Portugal)', category: 'Publicações', icon: 'fa-globe', action: () => scrollToSection('publications') },
    { id: 'pub-conbraf', title: 'Paper: Algoritmo Python em Fitopatologia (54º CONBRAF)', category: 'Publicações', icon: 'fa-leaf', action: () => scrollToSection('publications') },

    // Ações & Links
    { id: 'soc-lattes', title: 'Abrir Currículo Lattes CNPq', category: 'Perfis', icon: 'fa-graduation-cap', action: () => window.open('http://lattes.cnpq.br/7737132952831886', '_blank') },
    { id: 'soc-orcid', title: 'Abrir Perfil ORCID', category: 'Perfis', icon: 'fa-id-badge', action: () => window.open('https://orcid.org/0009-0006-4989-0894', '_blank') },
    { id: 'soc-github', title: 'Abrir GitHub (eduardobatista-glitch)', category: 'Perfis', icon: 'fa-brands fa-github', action: () => window.open('https://github.com/eduardobatista-glitch', '_blank') },
    { id: 'soc-scholar', title: 'Abrir Perfil Google Acadêmico (Scholar)', category: 'Perfis', icon: 'fa-book', action: () => window.open('https://scholar.google.com.br/citations?user=D_aGM8UAAAAJ&hl=pt-BR&oi=ao', '_blank') },
    { id: 'action-theme', title: 'Alternar Tema Claro / Escuro', category: 'Preferências', icon: 'fa-circle-half-stroke', action: () => document.getElementById('theme-toggle-btn')?.click() }
  ];
  
  let selectedIndex = 0;
  let filteredItems = [...commandItems];
  
  function openPalette() {
    backdrop.classList.add('active');
    cmdInput.value = '';
    filterAndRender('');
    setTimeout(() => cmdInput.focus(), 40);
  }
  
  function closePalette() {
    backdrop.classList.remove('active');
  }
  
  function filterAndRender(query) {
    const q = query.trim().toLowerCase();
    filteredItems = commandItems.filter(item => {
      return !q || item.title.toLowerCase().includes(q) || item.category.toLowerCase().includes(q);
    });
    
    selectedIndex = 0;
    renderList();
  }
  
  function renderList() {
    cmdList.innerHTML = '';
    
    if (filteredItems.length === 0) {
      cmdList.innerHTML = `
        <li style="padding: 1rem; text-align: center; color: var(--text-muted); font-size: 0.825rem;">
          Nenhum resultado correspondente.
        </li>
      `;
      return;
    }
    
    let currentCategory = '';
    
    filteredItems.forEach((item, index) => {
      if (item.category !== currentCategory) {
        currentCategory = item.category;
        const groupHeader = document.createElement('li');
        groupHeader.className = 'cmd-group-label';
        groupHeader.textContent = currentCategory;
        cmdList.appendChild(groupHeader);
      }
      
      const li = document.createElement('li');
      li.className = `cmd-row ${index === selectedIndex ? 'selected' : ''}`;
      li.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <i class="fa-solid ${item.icon}" style="font-size: 0.8rem; opacity: 0.7;"></i>
          <span>${item.title}</span>
        </div>
        <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted);">↵</span>
      `;
      
      li.addEventListener('click', () => {
        executeItem(item);
      });
      
      li.addEventListener('mouseenter', () => {
        selectedIndex = index;
        updateSelectionHighlight();
      });
      
      cmdList.appendChild(li);
    });
  }
  
  function updateSelectionHighlight() {
    const items = cmdList.querySelectorAll('.cmd-row');
    items.forEach((item, idx) => {
      item.classList.toggle('selected', idx === selectedIndex);
    });
  }
  
  function executeItem(item) {
    closePalette();
    if (item && typeof item.action === 'function') {
      item.action();
    }
  }
  
  function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
  // Keyboard triggers (Ctrl+K or ⌘K)
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (backdrop.classList.contains('active')) {
        closePalette();
      } else {
        openPalette();
      }
    } else if (e.key === 'Escape' && backdrop.classList.contains('active')) {
      closePalette();
    }
  });
  
  cmdInput.addEventListener('input', (e) => {
    filterAndRender(e.target.value);
  });
  
  cmdInput.addEventListener('keydown', (e) => {
    if (filteredItems.length === 0) return;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % filteredItems.length;
      updateSelectionHighlight();
      scrollSelectedIntoView();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + filteredItems.length) % filteredItems.length;
      updateSelectionHighlight();
      scrollSelectedIntoView();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        executeItem(filteredItems[selectedIndex]);
      }
    }
  });
  
  function scrollSelectedIntoView() {
    const selectedEl = cmdList.querySelector('.cmd-row.selected');
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: 'nearest' });
    }
  }
  
  if (searchBtn) {
    searchBtn.addEventListener('click', openPalette);
  }
  
  if (closeBtn) {
    closeBtn.addEventListener('click', closePalette);
  }
  
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) {
      closePalette();
    }
  });
}
