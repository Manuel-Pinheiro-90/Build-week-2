const link = "";
const generateTitleAlbumCards = function (titalbum) {
    const row4 = document.getElementById('title_album')
    
        const newCol4 = document.createElement('div')
        newCol4.classList.add('col' ,'p-1', 'd-flex')
        newCol4.innerHTML = `
        <div class="col-md-4">
                <img src="${titalbum.data[0].album.cover_medium}" class="card-img" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${titalbum.data[0].album.cover_medium}</h5>
                  <p class="card-text">${titalbum.data[0].album.cover_medium}</p>
                  <p class="card-text"><small class="text-muted">${titalbum.data[0].album.cover_medium}</small></p>
                </div>
              </div>
        `
        row4.appendChild(newCol4)
}
function getTitleAlbumS(titalbum) {
    titalbum.forEach(titalbum => {
        
        getTitleAlbum(titalbum);
    });
}


const getSongList = function (id) {
    
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

            generateTitleAlbumCards(array)
        })
        .catch((err) => {
            console.log('ERRORE!', err)

        })
}
getTitleAlbumS(titalbumArray);