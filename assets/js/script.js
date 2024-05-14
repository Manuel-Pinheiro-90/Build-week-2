
// const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
// const appendAlert = (message, type) => {
//   const wrapper = document.createElement('div')
//   wrapper.innerHTML = [
//     `<div class="alert alert-${type} alert-dismissible m-0" role="alert">`,
//     `   <div>${message}</div>`,
//     '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
//     '</div>'
//   ].join('')

//   alertPlaceholder.append(wrapper)
// }
  
const albumArray = ["4603396", "513551092", "547520122", "119606", "508204251", "11428966"];




const generateAlbumCards = function (album) {
    const row = document.getElementById('album-sera')
    
        const newCol = document.createElement('div')
        newCol.classList.add('col')
        newCol.innerHTML = `
      <div class="col-3" onclick="redirectToPage('album.html?gundamId=${album.id}')>
      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${album.cover_medium}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <p class="card-text" id="cardText">${album.title}</p>
            </div>
          </div>
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
    console.log('https://striveschool-api.herokuapp.com/api/deezer/album/'+id)
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
                // const spin = document.getElementById('spinner')
                // spin.classList.add('visually-hidden')
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
            // appendAlert('Qualcosa è andato storto!! ' + err, 'warning')
            console.log('ERRORE!', err)

        })
}

generateAlbumCards(albumArray);