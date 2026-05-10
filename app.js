// ===============================
// FAVORIETEN
// ===============================

// Favorieten laden uit localStorage
let favorites = JSON.parse(localStorage.getItem('favorites'));

// Als er nog geen favorieten zijn, standaard "Mijn profiel"
if (!favorites || !Array.isArray(favorites) || favorites.length === 0) {
  favorites = ['myProfile'];
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Beschikbare favorieten
const favoriteOptions = {
  myProfile: {
    icon: '👤',
    title: 'Mijn profiel'
  },
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
  }
};

// Favorieten tonen op het Home-scherm
function renderFavorites() {
  const favoritesRow = document.querySelector('.favorites-row');
  if (!favoritesRow) return;

  // Leegmaken
  favoritesRow.innerHTML = '';

  // Favorieten toevoegen
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

// Popup om favorieten te kiezen
function openFavoritesEditor() {
  const keuze = prompt(
    "Kies je favorieten:\\n\\n" +
    "1 = 👤 Mijn profiel\\n" +
    "2 = 📺 Live Scores\\n" +
    "3 = 🪑 Tafel reserveren\\n" +
    "4 = 🎱 Clubpagina\\n\\n" +
    "Voer nummers in, gescheiden door komma's.\\n" +
    "Voorbeeld: 1,2,4"
  );

  if (keuze === null) return;

  let nieuweFavorieten = [];

  if (keuze.includes('1')) nieuweFavorieten.push('myProfile');
  if (keuze.includes('2')) nieuweFavorieten.push('club-live');
  if (keuze.includes('3')) nieuweFavorieten.push('club-reservation');
  if (keuze.includes('4')) nieuweFavorieten.push('club-page');

  // Als niets geselecteerd werd, standaard Mijn profiel
  if (nieuweFavorieten.length === 0) {
    nieuweFavorieten = ['myProfile'];
  }

  favorites = nieuweFavorieten;

  // Opslaan
  localStorage.setItem('favorites', JSON.stringify(favorites));

  // Onmiddellijk opnieuw tonen
  renderFavorites();
}

// ===============================
// APP INITIALISATIE
// ===============================

document.addEventListener('DOMContentLoaded', function () {

  // -------------------------------
  // Schermen en navigatie
  // -------------------------------
  const screens = document.querySelectorAll('.screen');
  const navButtons = document.querySelectorAll('.nav-item');

  // Scherm tonen
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

      // Actieve knop aanpassen
      navButtons.forEach(btn => {
        btn.classList.remove('active');
      });

      this.classList.add('active');

      // Doelscherm
      const target = this.getAttribute('data-target');

      // Favorieten-knop scrollt naar favorieten op Home
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
      if (target) {
        showScreen(target);
      }
    });
  });

  // -------------------------------
  // Competitie-tabs
  // -------------------------------
  const tabs = document.querySelectorAll('.tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // -------------------------------
  // Favorieten tonen
  // -------------------------------
  renderFavorites();

  // -------------------------------
  // Service Worker
  // -------------------------------
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(() => console.log('Service Worker geregistreerd'))
      .catch(err => console.log('Service Worker fout:', err));
  }

});
