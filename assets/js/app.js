// Theme handling
function initTheme() {
  const savedTheme = localStorage.getItem('policy_portal_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeText(savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const newTheme = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('policy_portal_theme', newTheme);
  updateThemeText(newTheme);
}

function updateThemeText(theme) {
  const btn = document.getElementById('theme-toggle-btn');
  const lang = localStorage.getItem('policy_portal_lang') || 'es';
  if (btn) {
    if (theme === 'dark') {
      btn.textContent = lang === 'ca' ? 'Mode Clar' : (lang === 'en' ? 'Light Mode' : 'Modo Claro');
    } else {
      btn.textContent = lang === 'ca' ? 'Mode Fosc' : (lang === 'en' ? 'Dark Mode' : 'Modo Oscuro');
    }
  }
}

// Language Switcher (ES / CA / EN)
function setLanguage(lang) {
  const targetAttr = `data-lang-${lang}`;
  document.querySelectorAll('[data-lang-es]').forEach(el => {
    const val = el.getAttribute(targetAttr) || el.getAttribute('data-lang-es');
    if (val !== null) {
      if (el.tagName === 'INPUT') {
        el.placeholder = val;
      } else {
        el.innerHTML = val;
      }
    }
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  localStorage.setItem('policy_portal_lang', lang);
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  updateThemeText(currentTheme);
}

// Copy URL for Google Play Console
function copyCurrentUrl() {
  const url = window.location.href;
  const lang = localStorage.getItem('policy_portal_lang') || 'es';
  const msg = lang === 'ca' ? 'Enllaç copiat al porta-retalls' : (lang === 'en' ? 'Link copied to clipboard' : 'Enlace copiado al portapapeles');
  navigator.clipboard.writeText(url).then(() => {
    showToast(msg);
  }).catch(() => {
    const input = document.createElement('input');
    input.value = url;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    showToast(msg);
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
  }, 2500);
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
      const title = card.querySelector('.app-title')?.textContent.toLowerCase() || '';
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
    const scrollPos = window.scrollY + 80;

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

  const currentUrlCode = document.getElementById('current-page-url');
  if (currentUrlCode) {
    currentUrlCode.textContent = window.location.href;
  }

  const savedLang = localStorage.getItem('policy_portal_lang') || 'es';
  setLanguage(savedLang);
});
