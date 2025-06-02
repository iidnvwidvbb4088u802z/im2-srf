const API_URL = "https://il.srgssr.ch/integrationlayer/2.0/srf/songList/radio/byChannel/69e8ac16-4327-4af4-b873-fd5cd6e895a7";

// DOM-Elemente für Historie
const historyContainer = document.getElementById("historyContainer");
const loader = document.getElementById("loader");

let apiLoadPage = 0;

// Song-Box erstellen
function createSongBox(song) {
  const div = document.createElement("div");
  div.className = "currentsong_metadata";

  let formattedLength = "";
  if (typeof song.duration !== 'undefined') {
    const durationSec = Math.floor(song.duration / 1000);
    const minutes = Math.floor(durationSec / 60);
    const seconds = durationSec % 60;
    formattedLength = `${minutes}:${seconds.toString().padStart(2, "0")} min`;
  }
  const formattedDate = new Date(song.date).toLocaleString();

  div.innerHTML = `
  <h3>Titel</h3>
  <p>${song.title}</p>
  <h3>Künstler*in</h3>
  <p>${song.artist.name}</p>
  <h3>Länge des Songs</h3>
  <p>${formattedLength !== '' ? formattedLength : '–'}</p>
  <h3>Datum</h3>
  <p>${formattedDate}</p>
`;
  return div;
}

// Infinite Scroll
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 200
  ) {
    if (apiLoadPage !== null && loader.style.display === "none") {      
      loader.style.display = "block";
      fetchSongs()
    }
  }
});

// Daten von API holen
async function fetchSongs() {
  try {
    const res = await fetch(API_URL + `?next=${apiLoadPage}`);
    const data = await res.json();

    loader.style.display = "none";

    songList = data.songList;
    if (typeof data.next === 'undefined') {
      apiLoadPage = null;
    } else {
      apiLoadPage++;
    }

    data.songList.forEach(song => {
      const box = createSongBox(song);
      historyContainer.appendChild(box);
    });
    
  } catch (err) {
    console.error("Fehler beim Laden der Songs:", err);
    historyContainer.innerHTML = "<p>Fehler beim Laden der Historie.</p>";
  }
}

// Start
fetchSongs();