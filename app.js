// ===============================
// FAVORIETEN
// ===============================

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
  'competition-first': {
    icon: '🏆',
    title: 'Eerste Klasse',
    url: '#'
  },
  'competition-second': {
    icon: '🏆',
    title: 'Tweede Klasse',
    url: '#'
  },
  'competition-third': {
    icon: '🏆',
    title: 'Derde Klasse',
    url: '#'
  },
  'competition-cup': {
    icon: '🏆',
    title: 'Beker',
    url: '#'
  },
  'breakplay-1': {
    icon: '🎱',
    title: 'Break & Play Reeks 1',
    url: '#'
  },
  'breakplay-2': {
    icon: '🎱',
    title: 'Break & Play Reeks 2',
    url: '#'
  },
  'breakplay-3': {
    icon: '🎱',
    title: 'Break & Play Reeks 3',
    url: '#'
  },
  'breakplay-4': {
    icon: '🎱',
    title: 'Break & Play Reeks 4',
    url: '#'
  },
  'breakplay-5': {
    icon: '🎱',
    title: 'Break & Play Reeks 5',
    url: '#'
  },
  facebook: {
    icon: '📘',
    title: 'Facebook',
    url: 'https://www.facebook.com/'
  },
  instagram: {
    icon: '📸',
    title: 'Instagram',
    url: 'https://www.instagram.com/'
  },
  start2pool: {
    icon: '🎱',
    title: 'Start2Pool',
    url: '#'
  }
};

// Favorieten laden
let favorites = JSON.parse(localStorage.getItem('favorites'));

if (!favorites || !Array.isArray(favorites) || favorites.length === 0) {
  favorites = ['myProfile'];
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// ===============================
// FAVORIETEN RENDEREN
// ===============================

function renderFavorites() {
  const container = document.querySelector('.favorites-row');
  if (!container) return;

  container.innerHTML = '';

  favorites.forEach(id => {
    const item = favoriteOptions[id];
    if (!item) return;

    const card = document.createElement(item.url ? 'a' : 'div');
    card.className = 'favorite-card';

    if (item.url && item.url !== '#') {
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

// ===============================
// FAVORIETEN MODAL
// ===============================

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

function closeFavoritesEditor() {
  document.getElementById('favoritesModal')
    ?.classList.remove('show');
}

function saveFavoritesSelection() {
  const checked = document.querySelectorAll(
    '#favoritesOptions input[type="checkbox"]:checked'
  );

  favorites = Array.from(checked).map(input => input.value);

  if (favorites.length === 0) {
    favorites = ['myProfile'];
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));

  renderFavorites();
  closeFavoritesEditor();
}

// ===============================
// PROFIEL
// ===============================

function setProfile() {
  const url = prompt('Voer de link van je CueScore-profiel in:');
  if (!url) return;

  localStorage.setItem('myProfileUrl', url);
  alert('Profiel opgeslagen.');
}

function openProfile() {
  const url = localStorage.getItem('myProfileUrl');

  if (!url) {
    alert('Je hebt nog geen profiel ingesteld.');
    return;
  }

  window.open(url, '_blank');
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
      navButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      const target = this.getAttribute('data-target');

      if (target) {
        showScreen(target);
      }
    });
  });

  // Competitie tabs
  const tabs = document.querySelectorAll('.tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', function () {

      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });

      const target = document.getElementById(
        'tab-' + this.dataset.tab
      );

      if (target) {
        target.classList.add('active');
      }
    });
  });

  // Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(() => console.log('Service Worker geregistreerd'))
      .catch(err => console.log('Service Worker fout:', err));
  }

});
