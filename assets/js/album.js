const addressBarContent = new URLSearchParams(location.search);
console.log(addressBarContent);
const albumId = addressBarContent.get("albumId");
const musiclinkarr = []
const generateSongListCards = function (songArray) {
  const songrow = document.getElementById("songs-list");
  const french = songArray.tracks.data;
  console.log(french);
  let num = 0;
  french.forEach((song) => {
    num++;
    const songCol = document.createElement("tr");
    songCol.innerHTML = `
        <th class="align-middle bg-transparent text-white-50" scope="row">${num}</th>
        <td class="d-flex flex-column bg-transparent">
        <p class="my-2 p-0 font-weight-bold text-white">${song.title}</p><p class="m-0 p-0 text-white-50">${song.title}<p></td>
        <td class="align-middle bg-transparent text-white-50 text-center">${song.rank}</td>
        <td class="align-middle bg-transparent text-white-50 text-end">${song.duration}</td>
        `;

    let musica = {
      title: song.title,
      artist: song.artist.name,
      cover: song.album.cover_small,
      preview: song.preview
    }

    musiclinkarr.push(musica)
    songrow.appendChild(songCol);



  });

  const row4 = document.getElementById("title_album");
  const newCol4 = document.createElement("div");
  newCol4.classList.add("row");
  newCol4.innerHTML = `
           <div class="col-md-12 bg-transparent">
            <div class="card mb-3 bg-transparent border-0">
                <div class="row no-gutters bg-transparent">
                    <div class="col-md-4">
                        <img src="${songArray.cover_xl}" class="card-img" alt="...">
                    </div>
                    <div class="col-md-8 bg-transparent">
                        <div class="card-body bg-transparent">
                            <h5 class="card-title fa-3x text-white">${songArray.title}</h5>
                            <p class="card-text fs-6 text-white">
                                <img src="${songArray.artist.picture_small}" class="card-img" style="width: 20px" alt="...">
                                ${songArray.artist.name} ${songArray.release_date} ${num} ${songArray.duration}
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



let volume = 0.1;
function autoStart(albumsong) {
  audioElement.volume = volume
  if (audioElement) {
    audioElement.pause(); // Pause the current audio
    audioElement.remove(); // Remove the audio element from the DOM
  }
  console.log(albumsong);
  audioElement = new Audio(albumsong.preview);
  titol.innerHTML = albumsong.title;
  artis.innerHTML = albumsong.artist;
  img.src = albumsong.cover;
  playPauseButton.click();
  document.getElementById("musician").classList.remove("d-none");

  audioElement.ontimeupdate = function () {
    timeupdate();
  };
}





let audioElement = new Audio("");
let titol = document.getElementById("titolo");
let artis = document.getElementById("artista");
let img = document.getElementById("musicImglink");
const playPauseButton = document.querySelector(".play-pause");
const progressBar = document.querySelector("#progress-bar");
const progress = document.querySelector("#progress");
const volumeBar = document.querySelector("#volume-progress-bar");
const volumeProgress = document.querySelector("#volume-progress");
const playalbum = document.getElementById("playalbum");
const forward = document.getElementById("forward")
const backward = document.getElementById("backward")


let playlistposition = 0;
playalbum.addEventListener('click', () => {
  playlistposition = 0;
  audioElement.volume = volume;
  autoStart(musiclinkarr[0]);

});
forward.addEventListener('click', () => {
  playlistposition++;
  autoStart(musiclinkarr[playlistposition]);
});
backward.addEventListener('click', () => {
  playlistposition--;
  autoStart(musiclinkarr[playlistposition]);
});



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
  // console.log(audioElement.currentTime)
});

// Aggiorna il volume quando l'utente interagisce con la barra del volume
// volumeBar.addEventListener('click', (e) => {
//     const clickX = e.clientX - volumeBar.getBoundingClientRect().left;
//     const volumeWidth = volumeBar.offsetWidth;
//     const volume = clickX / volumeWidth;
//     audioElement.volume = volume;
// });

volumeBar.addEventListener("click", (e) => {
  console.log("Volume bar clicked");
  const clickX = e.clientX - volumeBar.getBoundingClientRect().left;
  const volumeWidth = volumeBar.offsetWidth;
  console.log("clickX:", clickX);
  console.log("volumeWidth:", volumeWidth);
  volume = clickX / volumeWidth;
  console.log("Volume:", volume);
  audioElement.volume = volume;
  console.log("Audio volume set to:", volume);

  const volumeWi = audioElement.volume * 100;
  volumeProgress.style.width = `${volumeWi}%`;
});

// Aggiorna la barra di avanzamento della canzone e del volume
// audioElement.ontimeupdate = function() {timeupdate()};

function timeupdate() {
  const currentTime = formatTime(audioElement.currentTime);
  const duration = formatTime(audioElement.duration);
  audioElement.volume = volume
  const progressWidth =
    (audioElement.currentTime / audioElement.duration) * 100;
  volumeWidth = audioElement.volume * 100;

  const timecurrent = document.getElementById("current-time");
  timecurrent.textContent = currentTime;
  const durat = document.getElementById("duration");
  durat.textContent = duration;
  progress.style.width = `${progressWidth}%`;
  volumeProgress.style.width = `${volumeWidth}%`;
}
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

    sourceImage.onload = function () {
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
    sourceImage.onerror = function () {
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
