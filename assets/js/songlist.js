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
    const songCol = document.createElement("tr");
    songCol.innerHTML = `
        <th scope="row">${num}</th>
        <td>${song.title}</td>
        <td>${song.rank}</td>
        <td>${song.duration}</td>
        `;
    songrow.appendChild(songCol);
  });

  const row4 = document.getElementById("title_album");
  const newCol4 = document.createElement("div");
  newCol4.classList.add("col-md-4");
  newCol4.innerHTML = `
                <img src="${songArray.cover_xl}" class="card-img" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${songArray.title}</h5>
                  <p class="card-text"><img src="${songArray.artist.picture_small}" class="card-img" alt="..."> ${songArray.artist.name} ${songArray.release_date} ${num} ${songArray.duration}</p>
                </div>
        `;
  row4.appendChild(newCol4);
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
