const API_URL = "https://il.srgssr.ch/integrationlayer/2.0/srf/songList/radio/byChannel/69e8ac16-4327-4af4-b873-fd5cd6e895a7";

let songs = [];
let apiLoadPage = 0;

const optionsDiv = document.getElementById("quiz-options");

async function loadQuiz() {
  
    const res = await fetch(API_URL + `?next=${apiLoadPage}`);
    const data = await res.json();

    if (typeof data.next === 'undefined') {
      return false
    } else {
      apiLoadPage++;
    }
  
    songs = data.songList.map(e => {return {title: e.title, artist: e.artist.name}});
    console.log("🎵 Gefilterte Songs:", songs);
  
    // Falls immer noch keine Songs verfügbar sind (unwahrscheinlich), beenden
    if (!songs.length) {
      document.getElementById("quiz-question").innerText = "⚠️ Leider konnten keine Songs geladen werden.";
      return false;
    }
    return true;
  }

  function getRandomSong(exclude) {
    const elegibleSongs = songs.filter(song => !exclude.includes(song.artist));
    return elegibleSongs[Math.floor(Math.random() * elegibleSongs.length)];
  }

  async function generateQuiz() {
    if (songs.length < 3) {
      const quizStatus = await loadQuiz();
      if (!quizStatus) {
        document.getElementById("quiz-question").innerText = "Quiz ist beendet, ade merci.";
        optionsDiv.innerHTML = "";
      }
    }
    const correctSong = getRandomSong([]);
    const wrong1 = getRandomSong([correctSong.artist]);
    const wrong2 = getRandomSong([correctSong.artist,wrong1.artist]);

    const options = [correctSong.artist, wrong1.artist, wrong2.artist];
    const shuffled = options.sort(() => Math.random() - 0.5);

    document.getElementById("quiz-question").innerText = `"${correctSong.title}" wurde von ...?`;

    optionsDiv.innerHTML = "";

    shuffled.forEach((artist) => {
      const btn = document.createElement("button");
      btn.textContent = artist;
      btn.className = "quiz-button";
      btn.onclick = () => {
        document.querySelectorAll(".quiz-button").forEach(button => {
          button.disabled = true; // Alle Buttons deaktivieren
        });
        const feedback = document.getElementById("quiz-feedback");
        if (artist === correctSong.artist) {
          feedback.textContent = "✅ Richtig!";
          feedback.style.color = "green";
        } else {
          feedback.textContent = `❌ Falsch. Richtig wäre: ${correctSong.artist}`;
          feedback.style.color = "red";
        }
        songs = songs.filter(song => song.title !== correctSong.title);
        setTimeout(() => {
          feedback.textContent = "";
          generateQuiz();
        }, 2000);
      };
      optionsDiv.appendChild(btn);
    });
  }
  
  generateQuiz();

