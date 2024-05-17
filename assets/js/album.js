const addressBarContent = new URLSearchParams(location.search);
console.log(addressBarContent);
const albumId = addressBarContent.get("albumId");

const generateSongListCards = function (songArray) {
  const songrow = document.getElementById("songs-list");
  const french = songArray.tracks.data;
  console.log(french);
  let num = 0;
  french.forEach((song) => {
    num++;
    const minutes = Math.floor(song.duration / 60);
    const seconds = song.duration % 60;
    const durationFormatted = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    const rankFormatted = song.rank.toLocaleString();
    const songCol = document.createElement("tr");
    songCol.innerHTML = `
        <th class="align-middle bg-transparent text-white-50" scope="row">${num}</th>
        <td class="d-flex flex-column bg-transparent">
        <p class="my-2 p-0 font-weight-bold text-white">${song.title}</p><p class="m-0 p-0 text-white-50">${songArray.artist.name}<p></td>
        <td class="align-middle bg-transparent text-white-50 text-center">${rankFormatted}</td>
        <td class="align-middle bg-transparent text-white-50 text-end">${durationFormatted}</td>
        `;
    songrow.appendChild(songCol);
  });

  const row4 = document.getElementById("title_album");
  const newCol4 = document.createElement("div");
  newCol4.classList.add("row");
  const releaseYear = new Date(songArray.release_date).getFullYear();
  const totalDurationMinutes = Math.floor(songArray.duration / 60);
  const totalDurationSeconds = songArray.duration % 60;
  const totalDurationFormatted = `${totalDurationMinutes} min ${totalDurationSeconds} sec.`;
  newCol4.innerHTML = `
           <div class="col-md-12 bg-transparent">
            <div class="card mb-3 bg-transparent border-0">
                <div class="row no-gutters bg-transparent">
                    <div class="col-md-4">
                        <img src="${songArray.cover_xl}" class="card-img shadow-lg" alt="...">
                    </div>
                    <div class="col-md-8 bg-transparent d-flex flex-column">
                        <div class="card-body bg-transparent align-content-end">
                            <h5 class="card-title fa-4x text-white text-nowrap text-truncate">${songArray.title}</h5>
                            <p class="card-text fs-6 text-white">
                                <img src="${songArray.artist.picture_small}" class="card-img rounded-circle" style="width: 30px" alt="...">
                                ${songArray.artist.name} • ${releaseYear} • ${num} brani, <span class="text-white-50"> ${totalDurationFormatted}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
  row4.appendChild(newCol4);
  
  // Chiamata alla funzione per ottenere il colore dominante dall'immagine
  getDominantImageColor(songArray.cover_xl);
};

const getSongList = function () {
  fetch("https://striveschool-api.herokuapp.com/api/deezer/album/" + albumId)
    .then((response) => {
      if (response.ok) {
        console.log(response);
        return response.json();
      } else {
        if (response.status === 404) {
          throw new Error(
            "Errore nella risposta del server: Resource not found " +
              response.status
          );
        } else if (response.status === 500) {
          throw new Error(
            "Errore nella risposta del server: Internal server error " +
              response.status
          );
        } else {
          throw new Error(
            "Errore nella risposta del server: Unknown error " + response.status
          );
        }
      }
    })
    .then((array) => {
      console.log("ARRAY!Artisti", array);

      generateSongListCards(array);
    })
    .catch((err) => {
      console.log("ERRORE!", err);
    });
};
getSongList();

const audioElement = new Audio("./assets/js/VideoGames.mp3");
const playPauseButton = document.querySelector(".play-pause");
const progressBar = document.querySelector("#progress-bar");
const progress = document.querySelector("#progress");
const volumeBar = document.querySelector("#volume-progress-bar");
const volumeProgress = document.querySelector("#volume-progress");

// Avvia o metti in pausa la riproduzione audio al clic del pulsante Play/Pausa
playPauseButton.addEventListener("click", () => {
  if (audioElement.paused) {
    audioElement.play();
    playPauseButton.classList.remove("fa-play");
    playPauseButton.classList.add("fa-pause");
  } else {
    audioElement.pause();
    playPauseButton.classList.remove("fa-pause");
    playPauseButton.classList.add("fa-play");
  }
});

// Aggiorna la posizione della canzone quando l'utente interagisce con la barra di avanzamento
progressBar.addEventListener("click", (e) => {
  const clickX = e.clientX - progressBar.getBoundingClientRect().left;
  const progressWidth = progressBar.offsetWidth;
  const songPosition = clickX / progressWidth;
  audioElement.currentTime = songPosition * audioElement.duration;
});

// Aggiorna il volume quando l'utente interagisce con la barra del volume
volumeBar.addEventListener("click", (e) => {
  const clickX = e.clientX - volumeBar.getBoundingClientRect().left;
  const volumeWidth = volumeBar.offsetWidth;
  const volume = clickX / volumeWidth;
  audioElement.volume = volume;
});

// Aggiorna la barra di avanzamento della canzone e del volume
audioElement.addEventListener("timeupdate", () => {
  const currentTime = formatTime(audioElement.currentTime);
  const duration = formatTime(audioElement.duration);
  const progressWidth =
    (audioElement.currentTime / audioElement.duration) * 100;
  const volumeWidth = audioElement.volume * 100;

  document.getElementById("current-time").textContent = currentTime;
  document.getElementById("duration").textContent = duration;
  progress.style.width = `${progressWidth}%`;
  volumeProgress.style.width = `${volumeWidth}%`;
});

// Aggiorna la barra del volume quando cambia il volume
audioElement.addEventListener("volumechange", () => {
  const volumeWidth = audioElement.volume * 100;
  volumeProgress.style.width = `${volumeWidth}%`;
});

// Funzione per formattare il tempo in formato mm:ss
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

window.onload = () => {
  getDominantImageColor = (imageUrl) => {

      let sourceImage = new Image();
      sourceImage.crossOrigin = "Anonymous"; // Consentire il recupero dei dati dall'immagine
      sourceImage.src = imageUrl;

      let colorThief = new ColorThief();

      sourceImage.onload = function() {
          console.log("Immagine caricata correttamente:", sourceImage.src);

          let color = colorThief.getColor(sourceImage);
          console.log("Colore dominante:", color);

          let gradientColors = generateGradientColors(color);

          let background = document.querySelector(".background_color_gradient");
          background.style.background = `linear-gradient(to bottom, ${gradientColors.join(", ")})`;
          background.style.position = "relative";
          background.style.overflow = "visible";
          console.log("Gradiente di colore impostato:", background.style.background);
      };

      // Gestione degli errori di caricamento dell'immagine
      sourceImage.onerror = function() {
          console.error("Errore durante il caricamento dell'immagine:", sourceImage.src);
      };
  }
}

// Funzione per generare il gradiente di colore
function generateGradientColors(baseColor) {
  let gradientColors = [];

  gradientColors.push(`rgb(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]})`);

  let darkerColor = baseColor.map(c => Math.max(0, c - 50));
  gradientColors.push(`rgb(${darkerColor[0]}, ${darkerColor[1]}, ${darkerColor[2]})`);

  gradientColors.push('rgb(24, 24, 24)');

  return gradientColors;
}
