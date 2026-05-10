// ===============================
// FAVORIETEN
// ===============================

// Beschikbare favorieten
const favoriteOptions = {
  myProfile: {
    icon: '👤',
    title: 'Mijn profiel',
    url: null
  },
  'club-live': {
    icon: '📺',
    title: 'Live Scores',
    url: 'https://cuescore.com/venue/table/jumbotron/?venueId=1280972&branchId=1'
  },
  'club-reservation': {
    icon: '🪑',
    title: 'Tafel reserveren',
    url: 'https://www.bal-enzo.be/reservaties/'
  },
  'club-page': {
    icon: '🎱',
    title: 'Clubpagina',
    url: 'https://cuescore.com/bal-enzobilliardsdarts'
  },
  'competition-be1': {
    icon: '🏆',
    title: 'Eerste Klasse',
    url: 'https://cuescore.com/tournament/%2A%2A%2ACOMPETITIE+EERSTE+PROVINCIALE+BPBF+VLAANDEREN+SEIZOEN+2026%2A%2A%2A/74130085'
  },
  'competition-be2': {
    icon: '🏆',
    title: 'Tweede Klasse',
    url: 'https://cuescore.com/tournament/%2A%2A%2ACOMPETITIE+TWEEDE+PROVINCIALE+BPBF+VLAANDEREN+SEIZOEN+2026%2A%2A%2A/74130109'
  },
  'competition-be3': {
    icon: '🏆',
    title: 'Derde Klasse',
    url: 'https://cuescore.com/tournament/%2A%2A%2ACOMPETITIE+DERDE+PROVINCIALE+BPBF+VLAANDEREN+SEIZOEN+2026%2A%2A%2A/74130127'
  },
  'competition-be-beker': {
    icon: '🏆',
    title: 'Belgische Beker',
    url: 'https://cuescore.com/tournament/%2A%2A%2ABEKER%252FCOUPE+BPBF+VLAANDEREN+2026%2A%2A%2A/74130139'
  },
  'tournament-netherlands': {
    icon: '🇳🇱',
    title: 'Tornooien Nederland',
    url: 'https://cuescore.com/tournaments/?c=1000231'
  }
};

// Favorieten laden
let favorites = JSON.parse(localStorage.getItem('favorites'));

// Standaard enkel Mijn profiel
if (!favorites || !Array.isArray(favorites) || favorites.length === 0) {
  favorites = ['myProfile'];
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Favorieten renderen
function renderFavorites() {
  const container = document.querySelector('.favorites-row');
  if (!container) return;

  container.innerHTML = '';

  favorites.forEach(id => {
    const item = favoriteOptions[id];
    if (!item) return;

    const card = document.createElement(item.url ? 'a' : 'div');

    card.className = 'favorite-card';

    if (item.url) {
      card.href = item.url;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
    }

    card.innerHTML = `
      <div class="favorite-icon">${item.icon}</div>
      <div class="favorite-title">${item.title}</div>
    `;

    container.appendChild(card);
  });
}

// Popup openen
function openFavoritesEditor() {
  const modal = document.getElementById('favoritesModal');
  const container = document.getElementById('favoritesOptions');

  if (!modal || !container) return;

  container.innerHTML = '';

  Object.entries(favoriteOptions).forEach(([id, item]) => {
    const row = document.createElement('label');
    row.className = 'favorite-option';

    row.innerHTML = `
      <input type="checkbox"
             value="${id}"
             ${favorites.includes(id) ? 'checked' : ''}>
      <span>${item.icon} ${item.title}</span>
    `;

    container.appendChild(row);
  });

  modal.classList.add('show');
}

// Popup sluiten
function closeFavoritesEditor() {
  const modal = document.getElementById('favoritesModal');
  if (modal) {
    modal.classList.remove('show');
  }
}

// Favorieten opslaan
function saveFavoritesSelection() {
  const checked = document.querySelectorAll(
    '#favoritesOptions input[type="checkbox"]:checked'
  );

  favorites = Array.from(checked).map(input => input.value);

  // Altijd minstens één favoriet
  if (favorites.length === 0) {
    favorites = ['myProfile'];
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));

  renderFavorites();
  closeFavoritesEditor();
}

// ===============================
// APP INITIALISATIE
// ===============================

document.addEventListener('DOMContentLoaded', function () {

  // Favorieten tonen
  renderFavorites();

  // Bottom navigation
  const screens = document.querySelectorAll('.screen');
  const navButtons = document.querySelectorAll('.nav-item');

  function showScreen(screenId) {
    screens.forEach(screen => {
      screen.classList.remove('active');
    });

    const selected = document.getElementById(screenId);

    if (selected) {
      selected.classList.add('active');
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  navButtons.forEach(button => {
    button.addEventListener('click', function () {

      navButtons.forEach(btn => {
        btn.classList.remove('active');
      });

      this.classList.add('active');

      const label = this.querySelector('.nav-label')?.textContent;

      // Favorieten-knop scrollt naar Mijn Favorieten
      if (label === 'Favorieten') {
        showScreen('homeScreen');

        setTimeout(() => {
          const section = document.querySelector('.favorites-row');
          if (section) {
            section.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 200);

        return;
      }

      // Normale schermwissel
      const target = this.getAttribute('data-target');
      if (target) {
        showScreen(target);
      }
    });
  });

  // Tabs Competities
  const tabs = document.querySelectorAll('.tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', function () {

      // Tabknoppen
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      // Inhoud verbergen
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });

      // Juiste inhoud tonen
      const tabName = this.dataset.tab;
      const target = document.getElementById('tab-' + tabName);

      if (target) {
        target.classList.add('active');
      }
    });
  });

  // Service Worker registreren
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(() => console.log('Service Worker geregistreerd'))
      .catch(err => console.log('Service Worker fout:', err));
  }

});
