console.log("🎧 SRF Song Tracker läuft");

// ID-Zuweisungen für die Anzeige
const titleEl = document.getElementById("song-title");
const artistEl = document.getElementById("song-artist");
const lengthEl = document.getElementById("song-length");

// API-URL
const API_URL = "https://il.srgssr.ch/integrationlayer/2.0/srf/songList/radio/byChannel/69e8ac16-4327-4af4-b873-fd5cd6e895a7";

// Daten sicher abrufen
async function fetchData(url) {
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (error) {
    console.error("❌ Fehler beim Abrufen der Daten:", error);
    return { songList: [] };
  }
}

// Anzeige aktualisieren
function updateNowPlaying(song) {
    const title = song.title || "Unbekannter Titel";
    const artist = song.artist?.name || song.artist || song.interpreten?.[0] || "Unbekannt";
  
    // Songlänge robust ermitteln
    let durationText = "-";
    const durationMs = song.duration || song.durationMs || null;
  
    if (durationMs && !isNaN(durationMs)) {
      const durationSec = Math.floor(durationMs / 1000);
      const minutes = Math.floor(durationSec / 60);
      const seconds = durationSec % 60;
      durationText = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }
  
    titleEl.innerText = title;
    artistEl.innerText = artist;
    lengthEl.innerText = durationText;
  }
  

// Fehleranzeige
function showError() {
  titleEl.innerText = "⚠️ Keine aktuellen Daten verfügbar";
  artistEl.innerText = "-";
  lengthEl.innerText = "-";
}

// App starten
async function startApp() {
  const data = await fetchData(API_URL);
  const list = data.songList || [];
console.log(list);

  if (list.length > 0) {
    updateNowPlaying(list[0]); // aktueller Song = erstes Element
  } else {
    showError();
  }
}

// Beim Laden der Seite starten
document.addEventListener("DOMContentLoaded", () => {
  startApp();
});
