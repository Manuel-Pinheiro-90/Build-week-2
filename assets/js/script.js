






const albumArray = ["423368", "513551092", "547520122", "119606", "508204251", "11428966"];
const generateAlbumCards = function (album) {
    const row = document.getElementById('album-sera')
    
        const newCol = document.createElement('div')
        newCol.classList.add('col-3', 'bg-card-personal', 'm-1','flex-grow-1', 'd-flex', "p-0", "size_img")
        
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
    
    fetch('https://striveschool-api.herokuapp.com/api/deezer/album/'+id)
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




const artistArray = ["2059","1342","1125","900","226","1154"];
const generateArtistCards = function (artist) {
    const row2 = document.getElementById('ads-artist')
    
        const newCol2 = document.createElement('div')
        newCol2.classList.add('col' ,'p-1', 'd-flex')
        newCol2.innerHTML = `
        <div class="card " onclick="window.location.href=('album.html?albumId=${artist.data[0].album.id}')" style="width: 18rem;">
          <img src="${artist.data[0].album.cover_medium}" class="card-img-top" alt="...">
          <div class="card-body">
            <a href="artist.html?artistId=${artist.data[0].artist.id}" class="card-text" id="cardText">${artist.data[0].artist.name}</a>
            <p class="card-text">${artist.data[0].album.title}</p>
          </div>
        </div>
        `
        row2.appendChild(newCol2)
    
}

function getArtistS(artist) {
    artist.forEach(artist => {
        
        getArtist(artist);
    });
}


const getArtist = function (id) {
    
    fetch('https://striveschool-api.herokuapp.com/api/deezer/artist/'+ id + '/top?limit=1')
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