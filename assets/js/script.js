






/* CARDS SEZIONE BUONASERA */
const albumArray = ["423368", "513551092", "547520122", "119606", "508204251", "11428966"];
const generateAlbumCards = function (album) {
    const row = document.getElementById('album-sera')

    const newCol = document.createElement('div')
    newCol.classList.add('col-3', 'bg-card-personal', 'm-1', 'flex-grow-1', 'd-flex', "p-0", "size_img")

    newCol.innerHTML = `
      <div class="container d-flex p-0" onclick="window.location.href=('album.html?albumId=${album.id}')">
          <div class="col-4">
            <img src="${album.cover_medium}" class="h-100" alt="...">
          </div>
          <div class="col-8 d-flex align-items-center">
              <p class="card-text text-white font-personal" id="cardText">${album.title}</p>
          </div>
       </div>  
        `
    row.appendChild(newCol)

}

function getAlbumS(albums) {
    albums.forEach(album => {

        getAlbum(album);
    });
}


const getAlbum = function (id) {

    fetch('https://striveschool-api.herokuapp.com/api/deezer/album/' + id)
        .then((response) => {
            if (response.ok) {
                console.log(response)
                return response.json()

            } else {
                if (response.status === 404) {
                    throw new Error('Errore nella risposta del server: Resource not found ' + response.status)
                } else if (response.status === 500) {
                    throw new Error('Errore nella risposta del server: Internal server error ' + response.status)
                } else {
                    throw new Error('Errore nella risposta del server: Unknown error ' + response.status)
                }

            }
        })
        .then((array) => {
            console.log('ARRAY!', array)

            generateAlbumCards(array)
        })
        .catch((err) => {
            console.log('ERRORE!', err)

        })
}


/* CARDS SEZIONE ALTRO CHE TI PIACE */
let carosel_number = 0

const artistArray = ["2059", "1342", "1125", "900", "226", "1154", "4138", "3968561", "542", "429675"];
const generateArtistCards = function (artist) {
    const row2 = document.getElementById('ads-artist')

    const newCol2 = document.createElement('div')
    newCol2.classList.add('p-1', 'd-flex', 'flex-column', 'align-items-center')
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
        `
    row2.appendChild(newCol2)

    carosel_number++
    const get_carosel = document.getElementById("carosello_princ")
    const card_carosel = document.createElement("div")
    if (carosel_number === 1) {
        card_carosel.classList.add("carousel-item", "active")
        console.log(carosel_number)
    }
    else {
        card_carosel.classList.add("carousel-item")
        console.log(carosel_number)
    }
    card_carosel.setAttribute("data-bs-interval",'10000')

    card_carosel.innerHTML = `
    <div class="card mb-3 bg-dark bg-gradient">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="${artist.data[0].album.cover_medium}" class="img-fluid rounded-start"
                      alt="imgCopertina" />
                  </div>
                  <div class="col-md-8 d-flex">
                    <div class="card-body d-flex flex-column">
                      <h1 class="card-title text-light fs-tile">${artist.data[0].album.title}</h1>
                      <p class="card-text text-light">
                        ${artist.data[0].artist.name}
                      </p>
                      <p class="card-text">
                        <small class="text-light">Ascolta il nuovo album di ${artist.data[0].artist.name}</small>
                      </p>
                      <div>
                        <button class="btn btn-success rounded-5">Play</button>
                        <button class="btn btn-dark rounded-5">Salva</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    `
    get_carosel.appendChild(card_carosel)
}

function getArtistS(artist) {
    artist.forEach(artist => {

        getArtist(artist);
    });
}


const getArtist = function (id) {

    fetch('https://striveschool-api.herokuapp.com/api/deezer/artist/' + id + '/top?limit=1')
        .then((response) => {
            if (response.ok) {
                console.log(response)
                return response.json()

            } else {
                if (response.status === 404) {
                    throw new Error('Errore nella risposta del server: Resource not found ' + response.status)
                } else if (response.status === 500) {
                    throw new Error('Errore nella risposta del server: Internal server error ' + response.status)
                } else {
                    throw new Error('Errore nella risposta del server: Unknown error ' + response.status)
                }

            }
        })
        .then((array) => {
            console.log('ARRAY!Artisti', array)

            generateArtistCards(array)
        })
        .catch((err) => {
            console.log('ERRORE!', err)

        })
}

getArtistS(artistArray);
getAlbumS(albumArray);

const audioElement = new Audio('./assets/js/VideoGames.mp3');
const playPauseButton = document.querySelector('.play-pause');
const progressBar = document.querySelector('#progress-bar');
const progress = document.querySelector('#progress');
const volumeBar = document.querySelector('#volume-progress-bar');
const volumeProgress = document.querySelector('#volume-progress');

// Avvia o metti in pausa la riproduzione audio al clic del pulsante Play/Pausa
playPauseButton.addEventListener('click', () => {
    if (audioElement.paused) {
        audioElement.play();
        playPauseButton.classList.remove('fa-play');
        playPauseButton.classList.add('fa-pause');
    } else {
        audioElement.pause();
        playPauseButton.classList.remove('fa-pause');
        playPauseButton.classList.add('fa-play');
    }
});

// Aggiorna la posizione della canzone quando l'utente interagisce con la barra di avanzamento
progressBar.addEventListener('click', (e) => {
    const clickX = e.clientX - progressBar.getBoundingClientRect().left;
    const progressWidth = progressBar.offsetWidth;
    const songPosition = clickX / progressWidth;
    audioElement.currentTime = songPosition * audioElement.duration;
});

// Aggiorna il volume quando l'utente interagisce con la barra del volume
volumeBar.addEventListener('click', (e) => {
    const clickX = e.clientX - volumeBar.getBoundingClientRect().left;
    const volumeWidth = volumeBar.offsetWidth;
    const volume = clickX / volumeWidth;
    audioElement.volume = volume;
});

// Aggiorna la barra di avanzamento della canzone e del volume
audioElement.addEventListener('timeupdate', () => {
    const currentTime = formatTime(audioElement.currentTime);
    const duration = formatTime(audioElement.duration);
    const progressWidth = (audioElement.currentTime / audioElement.duration) * 100;
    const volumeWidth = audioElement.volume * 100;

    document.getElementById('current-time').textContent = currentTime;
    document.getElementById('duration').textContent = duration;
    progress.style.width = `${progressWidth}%`;
    volumeProgress.style.width = `${volumeWidth}%`;
});

// Aggiorna la barra del volume quando cambia il volume
audioElement.addEventListener('volumechange', () => {
    const volumeWidth = audioElement.volume * 100;
    volumeProgress.style.width = `${volumeWidth}%`;
});

// Funzione per formattare il tempo in formato mm:ss
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}