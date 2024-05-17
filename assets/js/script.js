/* CARDS SEZIONE BUONASERA */
const albumArray = [
  "423368",
  "513551092",
  "547520122",
  "119606",
  "508204251",
  "11428966",
];
const generateAlbumCards = function (album) {
  const row = document.getElementById("album-sera");

  const newCol = document.createElement("div");
  newCol.classList.add(
    "col-5",
    "col-lg-3",
    "bg-card-personal",
    "m-1",
    "flex-grow-1",
    "d-flex",
    "p-0",
    "size_img"
  );

  newCol.innerHTML = `
    <div class="d-flex p-0" onclick="window.location.href=('album.html?albumId=${album.id}')">
      <div class="">
        <img src="${album.cover_medium}" class="h-100" alt="...">
      </div>
      <div class=" d-flex align-items-center mx-3">
        <p class="card-text text-white font-personal" id="cardText">${album.title}</p>
      </div>
    </div>
        `;
  row.appendChild(newCol);
};

function getAlbumS(albums) {
  albums.forEach((album) => {
    getAlbum(album);
  });
}

const getAlbum = function (id) {
  fetch("https://striveschool-api.herokuapp.com/api/deezer/album/" + id)
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
      console.log("ARRAY!", array);

      generateAlbumCards(array);
    })
    .catch((err) => {
      console.log("ERRORE!", err);
    });
};

/* CARDS SEZIONE ALTRO CHE TI PIACE */
let carosel_number = 0;

const artistArray = [
  "134790",
  "226",
  "1154",
  "4138",
  "3968561",
  "542",
  "429675",
  "168632",
  "409258",
  "12749837",
];
const generateArtistCards = function (artist) {
  const row2 = document.getElementById("ads-artist");

  const newCol2 = document.createElement("div");
  newCol2.classList.add("p-1", "d-flex", "flex-column", "align-items-center");
  newCol2.innerHTML = `
        <div class="w-100 h-100 card-personal" onclick="window.location.href=('album.html?albumId=${artist.data[0].album.id}')">
        <div class="img-holder">
          <img src="${artist.data[0].album.cover_medium}" class="w-100 h-100 object-fit-cover rounded-2" alt="...">
        </div>
          <div class="text mt-1 d-flex flex-column justify-content-between">
            <a href="artist.html?artistId=${artist.data[0].artist.id}" class="card-text link-personal" id="cardText">${artist.data[0].artist.name}</a>
            <p class="card-text text-light fs-personal">${artist.data[0].album.title}</p>
          </div>
        </div>
        `;
  row2.appendChild(newCol2);
};
/* CAROSELLO DINAMICO */
const generateCarouselCards = function (artist) {
  if (carosel_number < 3) {
    carosel_number++;
    const get_carosel = document.getElementById("carosello_princ");
    const card_carosel = document.createElement("div");

    if (carosel_number === 1) {
      card_carosel.classList.add("carousel-item", "active");
      console.log(carosel_number);
    } else {
      card_carosel.classList.add("carousel-item");
      console.log(carosel_number);
    }
    card_carosel.setAttribute("data-bs-interval", "10000");

    card_carosel.innerHTML = `
    <div class="card mb-3 bg-dark bg-gradient">
    <div class="row g-0">
                  <div class="col-md-4 d-flex-personal">
                    <img src="${artist.data[0].album.cover_medium}" class="img-fluid rounded-start"
                      alt="imgCopertina" />
                      </div>
                      <div class="col-md-8 d-flex">
                      <div class="card-body d-flex flex-column">
                      <h1 class="card-title text-light fs-title">${artist.data[0].title_short}</h1>
                      <p class="card-text text-light">
                      ${artist.data[0].artist.name}
                      </p>
                      <p class="card-text">
                      <small class="text-light">Ascolta ${artist.data[0].title_short} dall'album: ${artist.data[0].album.title}</small>
                      </p>
                      <div>
                      <button class='btn btn-success rounded-5 play${carosel_number}'>Play</button>
                      <button class="btn btn-dark rounded-5">Salva</button>
                      </div>
                      </div>
                      </div>
                      </div>
                      </div>
                      `;
    // onclick = "autoStart(${artist.data[0].album.title},${artist.data[0].artist.name},${artist.data[0].album.cover_small},${artist.data[0].preview})"
    get_carosel.appendChild(card_carosel);

    addplayerlisten(artist, carosel_number);
  }
};

function getArtistS(artist) {
  artist.forEach((artist) => {
    getArtist(artist);
  });
}
function addplayerlisten(artist, number) {
  var playeray = document.getElementsByClassName("play" + number);
  var playe = playeray[0];
  console.log(playe);
  playe.addEventListener("click", function () {
    autoStart(artist);
  });
}

const getArtist = function (id) {
  fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/artist/" +
      id +
      "/top?limit=1"
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
      generateArtistCards(array);
      generateCarouselCards(array);
    })
    .catch((err) => {
      console.log("ERRORE!", err);
    });
};

getArtistS(artistArray);
getAlbumS(albumArray);

function autoStart(array) {
  if (audioElement) {
    audioElement.pause(); // Pause the current audio
    audioElement.remove(); // Remove the audio element from the DOM
  }

  audioElement = new Audio(array.data[0].preview);
  titol.innerHTML = array.data[0].title;
  artis.innerHTML = array.data[0].artist.name;
  img.src = array.data[0].album.cover_small;
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
  const volume = clickX / volumeWidth;
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
  const progressWidth =
    (audioElement.currentTime / audioElement.duration) * 100;
  const volumeWidth = audioElement.volume * 100;

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


/* FUNZIONE PER PRENDERE IL VALORE INPUT */

const inputSerch = document.getElementById('inputSearch')
const buttonSend = document.getElementById('buttonSend')

const functionInput = function () {
  console.log(inputSerch.value)
  inputSerch.value = ''
}
