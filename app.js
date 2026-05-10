// Favorieten laden
let favorites = JSON.parse(localStorage.getItem('favorites'));

if (!favorites || !Array.isArray(favorites) || favorites.length === 0) {
  favorites = ['myProfile']; // standaard enkel Mijn profiel
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Toon melding bij klikken op "Wijzig"
function openFavoritesEditor() {
  alert("Klik op de sterretjes in de app om favorieten toe te voegen of te verwijderen.");
}

// Wacht tot de pagina volledig geladen is
document.addEventListener('DOMContentLoaded', function () {

  // Alle schermen en navigatieknoppen ophalen
  const screens = document.querySelectorAll('.screen');
  const navButtons = document.querySelectorAll('.nav-item');

  // Functie om een scherm te tonen
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

      const target = this.getAttribute('data-target');

      if (target) {
        showScreen(target);
      }

      // Favorieten-knop scrollt naar favorieten
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
      }
    });
  });

  // Tab-buttons in Competities
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // FAVORIETEN TONEN
  const favoritesRow = document.querySelector('.favorites-row');

  if (favoritesRow) {
    favoritesRow.innerHTML = '';

    // Standaard kaart: Mijn profiel
    if (favorites.includes('myProfile')) {
      favoritesRow.innerHTML = `
        <div class="favorite-card">
          <div class="favorite-icon">👤</div>
          <div class="favorite-title">Mijn profiel</div>
        </div>
      `;
    }
  }

  // Service Worker registreren
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(() => console.log('Service Worker geregistreerd'))
      .catch(err => console.log('Service Worker fout:', err));
  }

});
