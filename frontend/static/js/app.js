document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('input[name="q"]');
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebarToggles = document.querySelectorAll('.sidebar-toggle');
  const themeButtons = document.querySelectorAll('.theme-switch__option');
  const overlay = document.createElement('div');

  overlay.className = 'sidebar-overlay';
  document.body.appendChild(overlay);

  const applyTheme = (theme) => {
    document.body.classList.toggle('theme-dark', theme === 'dark');
    document.body.classList.toggle('theme-light', theme === 'light');
    localStorage.setItem('theme', theme);

    themeButtons.forEach((button) => {
      const active = button.dataset.theme === theme;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  };

  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  if (searchInput) {
    searchInput.addEventListener('input', async (event) => {
      const query = event.target.value.trim();
      if (query.length < 2) return;
      try {
        const response = await fetch(`/api/produtos?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        console.log('Produtos encontrados:', data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    });
  }

  const closeSidebar = () => {
    sidebar.classList.remove('is-open');
    overlay.classList.remove('is-visible');
  };

  sidebarToggles.forEach((button) => {
    button.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('is-open');
      overlay.classList.toggle('is-visible', isOpen);
    });
  });

  overlay.addEventListener('click', closeSidebar);
  document.addEventListener('click', (event) => {
    // guard against missing elements
    if (sidebar && sidebarToggle) {
      if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
        closeSidebar();
      }
    }
  });

  const convertActionLinksToButtons = () => {
    const selectors = [
      'a.btn',
      '.sidebar-nav a',
      '.topbar-actions a',
      'a.floating-add-btn',
    ].join(', ');
    document.querySelectorAll(selectors).forEach((anchor) => {
      if (!anchor.href) return;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = anchor.className;
      button.id = anchor.id || '';
      button.setAttribute('aria-label', anchor.getAttribute('aria-label') || '');
      button.innerHTML = anchor.innerHTML;
      button.addEventListener('click', () => {
        window.location.href = anchor.href;
      });
      anchor.replaceWith(button);
    });
  };

  convertActionLinksToButtons();

  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      applyTheme(button.dataset.theme);
    });
  });

  // Auto-dismiss flash messages placed in the flash container faster
  const flashAlerts = document.querySelectorAll('#flash-container .alert, .flash-card .alert');
  flashAlerts.forEach((alert) => {
    const card = alert.closest('.flash-card');
    const removeAlert = () => {
      alert.classList.add('fade-out');
      setTimeout(() => {
        alert.remove();
        if (card && card.querySelectorAll('.alert').length === 0) {
          card.classList.add('fade-out');
          setTimeout(() => card.remove(), 300);
        }
      }, 300);
    };

    setTimeout(removeAlert, 1200);
    alert.addEventListener('click', removeAlert);
  });
});
