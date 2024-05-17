const get_codice_artist = new URLSearchParams(location.search);
console.log(get_codice_artist);
const artistId = get_codice_artist.get("artistId");
const musiclinkarr = []
const get_artist = () => {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`)
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
    .then((artista) => {
      console.log("funziona", artista);
      let url_img = artista.picture_big;
      document.getElementById(
        "sfondo_immagine"
      ).style.backgroundImage = `url(${url_img})`;
      document.getElementById("nome_artista").innerText = artista.name;
      document.getElementById("numero_ascoltatori").innerText =
        artista.nb_fan + " ascoltatori mensili";
      document.getElementById("artista_nome").innerText = artista.name;
    });
};

get_artist();

const generateSongListCards = function (songsArray) {
  const artistrow = document.getElementById("songs-list");
  let canzone = songsArray.data;
  let num = 0;
  canzone.forEach((song) => {
    num++;

    const minutes = Math.floor(song.duration / 60);
    const seconds = song.duration % 60;
    const formatDur = ` ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    const rankForm = song.rank.toLocaleString();
    const artistCol = document.createElement("tr");

    artistCol.innerHTML = `
         <th class="bg-transparent text-white-50 align-middle" scope="row">${num}</th>
         <td class="bg-transparent text-white-50 align-middle w-25"><img src="${song.album.cover}" alt="" class="w-50"></td>
         <td class="bg-transparent  align-middle"> <a href="#" class="text-decoration-none text-white"> ${song.title}</a></td>
         <td class="bg-transparent text-white-50 align-middle"> Ascolti ${rankForm}</td>
         <td class="bg-transparent text-white-50 align-middle"> Durata ${formatDur}</td>`;

    let musica = {
      title: song.title,
      artist: song.artist.name,
      cover: song.album.cover_small,
      preview: song.preview
    }

    musiclinkarr.push(musica)

    artistrow.appendChild(artistCol);
  });
};

const getArtistList = function () {
  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/top?limit=12`
  )
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
getArtistList();


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
  if(screen.availWidth>576){

    document.getElementById("musician").classList.remove("d-none");
  }
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
  if(playlistposition<musiclinkarr.length){
    playlistposition++;
    autoStart(musiclinkarr[playlistposition]);
  }
});
backward.addEventListener('click', () => {
  if(playlistposition>0){
    playlistposition--;
    autoStart(musiclinkarr[playlistposition]);

  }
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
