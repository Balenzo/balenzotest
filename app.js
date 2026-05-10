// Favorieten laden
let favorites = JSON.parse(localStorage.getItem('favorites'));

if (!favorites || !Array.isArray(favorites) || favorites.length === 0) {
  favorites = ['myProfile']; // standaard enkel Mijn profiel
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Toon melding bij klikken op "Wijzig"
function openFavoritesEditor() {
  const options = [
    { id: 'myProfile', label: '👤 Mijn profiel' },
    { id: 'club-live', label: '📺 Live Scores' },
    { id: 'club-reservation', label: '🪑 Tafel reserveren' },
    { id: 'club-page', label: '🎱 Clubpagina' },
    { id: 'competition-be1', label: '🏆 Eerste Klasse' },
    { id: 'competition-be2', label: '🏆 Tweede Klasse' },
    { id: 'competition-be3', label: '🏆 Derde Klasse' },
    { id: 'competition-be-beker', label: '🏆 Belgische Beker' },
    { id: 'bepoule1', label: '🎱 Break & Play Poule 1' }
  ];

  const current = new Set(favorites);

  const selected = prompt(
    "Kies je favorieten door nummers in te geven, gescheiden door komma's:\\n\\n" +
    options.map((opt, index) => {
      const checked = current.has(opt.id) ? '✓' : ' ';
      return `${index + 1}. [${checked}] ${opt.label}`;
    }).join('\\n') +
    "\\n\\nVoorbeeld: 1,2,5"
  );

  if (selected === null) return; // gebruiker annuleert

  const numbers = selected
    .split(',')
    .map(n => parseInt(n.trim(), 10))
    .filter(n => !isNaN(n) && n >= 1 && n <= options.length);

  if (numbers.length === 0) {
    alert("Geen geldige selectie.");
    return;
  }

  favorites = numbers.map(n => options[n - 1].id);

  // Zorg dat Mijn profiel altijd beschikbaar blijft als niets gekozen is
  if (favorites.length === 0) {
    favorites = ['myProfile'];
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));

  // Pagina herladen zodat de favorieten onmiddellijk zichtbaar zijn
  location.reload();
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
