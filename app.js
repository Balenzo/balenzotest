// ===============================
// FAVORIETEN
// ===============================

// Favorieten laden
let favorites = JSON.parse(localStorage.getItem('favorites'));

// Standaard enkel Mijn profiel
if (!favorites || !Array.isArray(favorites) || favorites.length === 0) {
  favorites = ['myProfile'];
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Beschikbare favorieten
const favoriteOptions = {
  // Profiel
  myProfile: {
    icon: '👤',
    title: 'Mijn profiel'
  },

  // Club
  'club-live': {
    icon: '📺',
    title: 'Live Scores'
  },
  'club-reservation': {
    icon: '🪑',
    title: 'Tafel reserveren'
  },
  'club-page': {
    icon: '🎱',
    title: 'Clubpagina'
  },

  // Competities België
  'competition-be1': {
    icon: '🏆',
    title: 'Eerste Klasse'
  },
  'competition-be2': {
    icon: '🏆',
    title: 'Tweede Klasse'
  },
  'competition-be3': {
    icon: '🏆',
    title: 'Derde Klasse'
  },
  'competition-be-beker': {
    icon: '🏆',
    title: 'Belgische Beker'
  },

  // Nederland
  'tournament-netherlands': {
    icon: '🇳🇱',
    title: 'Tornooien Nederland'
  }
};

// Favorieten tonen
function renderFavorites() {
  const favoritesRow = document.querySelector('.favorites-row');
  if (!favoritesRow) return;

  favoritesRow.innerHTML = '';

  favorites.forEach(id => {
    const item = favoriteOptions[id];
    if (!item) return;

    const card = document.createElement('div');
    card.className = 'favorite-card';

    card.innerHTML = `
      <div class="favorite-icon">${item.icon}</div>
      <div class="favorite-title">${item.title}</div>
    `;

    favoritesRow.appendChild(card);
  });
}

// Sterretjes initialiseren
function setupFavoriteStars() {
  const stars = document.querySelectorAll('.favorite-star');

  stars.forEach(star => {
    const id = star.getAttribute('data-favorite-id');
    if (!id) return;

    // Toon juiste ster
    star.textContent = favorites.includes(id) ? '⭐' : '☆';

    // Klikgedrag
    star.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (favorites.includes(id)) {
        favorites = favorites.filter(f => f !== id);
      } else {
        favorites.push(id);
      }

      // Zorg dat er altijd minstens één favoriet is
      if (favorites.length === 0) {
        favorites = ['myProfile'];
      }

      // Opslaan
      localStorage.setItem('favorites', JSON.stringify(favorites));

      // Opnieuw renderen
      renderFavorites();
      setupFavoriteStars();
    });
  });
}

// Uitleg bij knop "Wijzig"
function openFavoritesEditor() {
  alert(
    "Tik op de sterretjes (☆) bij de verschillende onderdelen " +
    "om favorieten toe te voegen of te verwijderen."
  );
}

// ===============================
// APP INITIALISATIE
// ===============================

document.addEventListener('DOMContentLoaded', function () {

  // Schermen en navigatie
  const screens = document.querySelectorAll('.screen');
  const navButtons = document.querySelectorAll('.nav-item');

  // Functie om scherm te tonen
  function showScreen(screenId) {
    screens.forEach(screen => {
      screen.classList.remove('active');
    });

    const selectedScreen = document.getElementById(screenId);

    if (selectedScreen) {
      selectedScreen.classList.add('active');

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  // Bottom navigation
  navButtons.forEach(button => {
    button.addEventListener('click', function () {

      navButtons.forEach(btn => {
        btn.classList.remove('active');
      });

      this.classList.add('active');

      // Favorieten-knop
      if (this.querySelector('.nav-label')?.textContent === 'Favorieten') {
        showScreen('homeScreen');

        setTimeout(() => {
          const favoritesSection = document.querySelector('.favorites-row');
          if (favoritesSection) {
            favoritesSection.scrollIntoView({
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

  // Competitie-tabs
  const tabs = document.querySelectorAll('.tab');

tabs.forEach(tab => {
  tab.addEventListener('click', function () {
    // Actieve tabknop
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
  
  // Favorieten tonen
  renderFavorites();

  // Sterretjes activeren
  setupFavoriteStars();

  // Service Worker registreren
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(() => console.log('Service Worker geregistreerd'))
      .catch(err => console.log('Service Worker fout:', err));
  }

});
