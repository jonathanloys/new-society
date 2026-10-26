/**
 * NEW SOCIETY — Script Fonctionnel
 * Gestion de la navigation, des modales accessibles, des interactions
 * et de la gestion transparente des manifestations d'intérêt.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileNav();
  initModals();
  initInterdependenceNodes();
  initFormHandling();
  updateCurrentYear();
});

/**
 * 1. En-tête collant & effet visuel au défilement
 */
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * 2. Menu mobile accessible
 */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle-btn');
  const mobileNav = document.getElementById('mobile-nav');
  if (!toggleBtn || !mobileNav) return;

  const toggle = () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    mobileNav.classList.toggle('open', !isExpanded);
    mobileNav.setAttribute('aria-hidden', isExpanded);
    if (!isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMenu = () => {
    toggleBtn.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', toggle);

  // Fermeture lors du clic sur un lien mobile
  const links = mobileNav.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Fermeture lors de l'appui sur Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      closeMenu();
      toggleBtn.focus();
    }
  });
}

/**
 * 3. Modales accessibles (Dialog HTML5)
 */
function initModals() {
  const triggers = document.querySelectorAll('[data-modal]');
  const closeButtons = document.querySelectorAll('[data-close-modal]');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modalId = trigger.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal && typeof modal.showModal === 'function') {
        modal.showModal();
        // Ferme le menu mobile si ouvert
        const mobileNav = document.getElementById('mobile-nav');
        if (mobileNav && mobileNav.classList.contains('open')) {
          const toggleBtn = document.getElementById('mobile-toggle-btn');
          if (toggleBtn) toggleBtn.click();
        }
      }
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('dialog');
      if (modal && typeof modal.close === 'function') {
        modal.close();
      }
    });
  });

  // Fermeture lors d'un clic en dehors de la boîte modale
  const dialogs = document.querySelectorAll('dialog');
  dialogs.forEach(dialog => {
    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        dialog.close();
      }
    });
  });
}

/**
 * 4. Interdépendance interactive des trois piliers
 */
function initInterdependenceNodes() {
  const nodes = document.querySelectorAll('.diagram-node');
  nodes.forEach(node => {
    node.addEventListener('click', () => {
      nodes.forEach(n => n.classList.remove('active'));
      node.classList.add('active');

      const pillarIndex = node.getAttribute('data-pillar');
      const targetCard = document.getElementById(`pillar-card-${pillarIndex}`);
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetCard.style.outline = '2px solid var(--accent-copper)';
        targetCard.style.boxShadow = '0 0 25px rgba(200, 138, 88, 0.4)';
        setTimeout(() => {
          targetCard.style.outline = '';
          targetCard.style.boxShadow = '';
        }, 1800);
      }
    });
  });
}

/**
 * 5. Gestion honnête et transparente du formulaire de participation
 */
function initFormHandling() {
  const form = document.getElementById('join-form');
  const feedbackCard = document.getElementById('form-feedback-card');
  const feedbackName = document.getElementById('feedback-name');
  const resetBtn = document.getElementById('reset-form-btn');
  const exportBtn = document.getElementById('export-data-btn');

  if (!form) return;

  const firstnameInput = document.getElementById('user-firstname');
  const emailInput = document.getElementById('user-email');
  const consentInput = document.getElementById('user-consent');
  const typeSelect = document.getElementById('user-participation-type');

  const firstnameError = document.getElementById('firstname-error');
  const emailError = document.getElementById('email-error');
  const consentError = document.getElementById('consent-error');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Validation Prénom
    if (!firstnameInput.value.trim()) {
      firstnameError.textContent = 'Veuillez renseigner votre prénom.';
      firstnameInput.classList.add('invalid');
      isValid = false;
    } else {
      firstnameError.textContent = '';
      firstnameInput.classList.remove('invalid');
    }

    // Validation E-mail
    if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
      emailError.textContent = 'Veuillez saisir une adresse e-mail valide.';
      emailInput.classList.add('invalid');
      isValid = false;
    } else {
      emailError.textContent = '';
      emailInput.classList.remove('invalid');
    }

    // Validation Consentement
    if (!consentInput.checked) {
      consentError.textContent = 'Votre consentement explicite est requis pour recevoir nos communications.';
      isValid = false;
    } else {
      consentError.textContent = '';
    }

    if (!isValid) return;

    // Enregistrement local des données (Stockage session/local pour consultation en phase de test)
    const newEntry = {
      id: Date.now(),
      firstname: firstnameInput.value.trim(),
      email: emailInput.value.trim(),
      participation_type: typeSelect ? typeSelect.value : 'suivre',
      consent: true,
      timestamp: new Date().toISOString()
    };

    try {
      const existing = JSON.parse(localStorage.getItem('newsociety_interest_list') || '[]');
      existing.push(newEntry);
      localStorage.setItem('newsociety_interest_list', JSON.stringify(existing));
    } catch (err) {
      console.warn('Impossible de sauvegarder localement :', err);
    }

    // Affichage honnête du résultat
    feedbackName.textContent = newEntry.firstname;
    form.classList.add('hidden');
    feedbackCard.classList.remove('hidden');

    showToast(`Merci ${newEntry.firstname}, votre intérêt a bien été pris en compte !`);
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      form.classList.remove('hidden');
      feedbackCard.classList.add('hidden');
    });
  }

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const saved = JSON.parse(localStorage.getItem('newsociety_interest_list') || '[]');
      if (saved.length === 0) {
        alert('Aucune inscription locale enregistrée pour le moment.');
        return;
      }
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(saved, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `newsociety_inscriptions_${new Date().toISOString().slice(0,10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    });
  }
}

/**
 * 6. Système de toasts légers
 */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  toast.innerHTML = `
    <svg viewBox="0 0 20 20" fill="#C88A58" width="16" height="16" aria-hidden="true">
      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'opacity 0.3s, transform 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/**
 * 7. Année courante dynamique
 */
function updateCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
