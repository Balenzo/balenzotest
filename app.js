// FAVORIETEN DATA
const favorites = [
  {
    title: "Live Scores",
    subtitle: "Bekijk live wedstrijden",
    icon: "📺",
    url: "https://cuescore.com/venue/table/jumbotron/?venueId=1280972&branchId=1"
  },
  {
    title: "Belgische Beker",
    subtitle: "Schema & uitslagen",
    icon: "🏆",
    url: "https://cuescore.com/tournament/%2A%2A%2ABEKER%252FCOUPE+BPBF+VLAANDEREN+2026%2A%2A%2A/74130139"
  },
  {
    title: "Mijn Profiel",
    subtitle: "Open jouw Cuescore",
    icon: "👤",
    url: localStorage.getItem("cuescoreProfile") || "#"
  }
];

// FAVORIETEN TONEN
function loadFavorites(){

  const container = document.getElementById("favoritesList");

  container.innerHTML = "";

  favorites.forEach(item => {

    const card = document.createElement("a");

    card.className = "favoriteCard";

    card.href = item.url;

    card.target = "_blank";

    card.innerHTML = `
      <h3>${item.icon} ${item.title}</h3>
      <p>${item.subtitle}</p>
    `;

    container.appendChild(card);

  });

}

// PROFIEL INSTELLEN
function setProfile(){

  let link = prompt("Plak je Cuescore profiel link");

  if(link){

    localStorage.setItem("cuescoreProfile", link);

    alert("Profiel opgeslagen 👍");

    location.reload();

  }

}

// NAVIGATIE
document.querySelectorAll(".navBtn").forEach(btn => {

  btn.addEventListener("click", () => {

    document.querySelectorAll(".navBtn")
      .forEach(b => b.classList.remove("active"));

    btn.classList.add("active");

  });

});

// SWIPE EFFECT
document.querySelectorAll(".card, .quickCard").forEach(card => {

  card.addEventListener("touchstart", () => {
    card.style.transform = "scale(0.97)";
  });

  card.addEventListener("touchend", () => {
    card.style.transform = "scale(1)";
  });

});

// INIT
loadFavorites();

// SERVICE WORKER
if ("serviceWorker" in navigator) {

  navigator.serviceWorker.register("sw.js")
    .then(() => console.log("SW geregistreerd"));

}
