// Theme handling
function initTheme() {
  const savedTheme = localStorage.getItem('policy_portal_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('policy_portal_theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) {
    btn.innerHTML = theme === 'dark' 
      ? '<span aria-hidden="true">☀️</span> Modo Claro' 
      : '<span aria-hidden="true">🌙</span> Modo Oscuro';
  }
}

// Language Switcher (ES / EN)
function setLanguage(lang) {
  document.querySelectorAll('[data-lang-es]').forEach(el => {
    if (lang === 'es') {
      if (el.tagName === 'INPUT') {
        el.placeholder = el.getAttribute('data-lang-es');
      } else {
        el.innerHTML = el.getAttribute('data-lang-es');
      }
    } else {
      if (el.getAttribute('data-lang-en')) {
        if (el.tagName === 'INPUT') {
          el.placeholder = el.getAttribute('data-lang-en');
        } else {
          el.innerHTML = el.getAttribute('data-lang-en');
        }
      }
    }
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  localStorage.setItem('policy_portal_lang', lang);
}

// Copy URL for Google Play Console
function copyCurrentUrl() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    showToast('¡Enlace copiado al portapapeles! Listo para Google Play Console.');
  }).catch(() => {
    const input = document.createElement('input');
    input.value = url;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    showToast('¡Enlace copiado al portapapeles!');
  });
}

function showToast(message) {
  let toast = document.getElementById('portal-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'portal-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Search Filter on Hub
function initAppSearch() {
  const searchInput = document.getElementById('app-search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const cards = document.querySelectorAll('.app-card');
    let visibleCount = 0;

    cards.forEach(card => {
      const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.app-desc')?.textContent.toLowerCase() || '';
      const tags = card.querySelector('.app-tags')?.textContent.toLowerCase() || '';

      const match = title.includes(query) || desc.includes(query) || tags.includes(query);
      card.style.display = match ? 'flex' : 'none';
      if (match) visibleCount++;
    });

    const noResults = document.getElementById('no-search-results');
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  });
}

// Table of Contents spy
function initTocSpy() {
  const tocLinks = document.querySelectorAll('.toc-link');
  if (tocLinks.length === 0) return;

  const sections = Array.from(tocLinks).map(link => {
    const id = link.getAttribute('href').replace('#', '');
    return document.getElementById(id);
  }).filter(Boolean);

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    });

    tocLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initAppSearch();
  initTocSpy();

  // Populate dynamic current URL if on policy page
  const currentUrlCode = document.getElementById('current-page-url');
  if (currentUrlCode) {
    currentUrlCode.textContent = window.location.href;
  }

  // Restore saved language or default to 'es'
  const savedLang = localStorage.getItem('policy_portal_lang') || 'es';
  setLanguage(savedLang);
});
