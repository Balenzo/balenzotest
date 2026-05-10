// Wacht tot de pagina volledig geladen is
document.addEventListener('DOMContentLoaded', function () {

  // Alle schermen en navigatieknoppen ophalen
  const screens = document.querySelectorAll('.screen');
  const navButtons = document.querySelectorAll('.nav-item');

  // Functie om een scherm te tonen
  function showScreen(screenId) {
    // Verberg alle schermen
    screens.forEach(screen => {
      screen.classList.remove('active');
    });

    // Toon het geselecteerde scherm
    const selectedScreen = document.getElementById(screenId);
    if (selectedScreen) {
      selectedScreen.classList.add('active');
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  // Klikgedrag voor bottom navigation
  navButtons.forEach(button => {
    button.addEventListener('click', function () {

      // Actieve knop aanpassen
      navButtons.forEach(btn => {
        btn.classList.remove('active');
      });
      this.classList.add('active');

      // Doelscherm ophalen
      const target = this.getAttribute('data-target');

      // Scherm tonen
      if (target) {
        showScreen(target);
      }

      // Favorieten-knop scrollt naar boven op het home screen
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

  // Service Worker registreren (optioneel)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(() => console.log('Service Worker geregistreerd'))
      .catch(err => console.log('Service Worker fout:', err));
  }

});
