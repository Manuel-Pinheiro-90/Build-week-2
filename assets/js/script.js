
const albumArray = ["423368", "513551092", "547520122", "119606", "508204251", "11428966"];




const generateAlbumCards = function (album) {
    const row = document.getElementById('album-sera')
    
        const newCol = document.createElement('div')
        newCol.classList.add('col-3', 'bg-primary', 'm-1', 'flex-grow-1', 'h-25', 'd-flex', "p-0")
        
        newCol.innerHTML = `
      <div class="container d-flex  w-75" onclick="redirectToPage('album.html?gundamId=${album.id}')>
        <div class="row align-items-center">
          <div class="col-4">
            <img src="${album.cover_medium}" class="img-fluid" alt="...">
          </div>
          <div class="col-8">
              <p class="card-text text-white" id="cardText">${album.title}</p>
          </div>
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
    
    fetch('https://striveschool-api.herokuapp.com/api/deezer/album/'+id
        // ,
        // {
        //     headers: {
        //         Authorization: API_KEY,
        //     },
        // }
    )
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

getAlbumS(albumArray);