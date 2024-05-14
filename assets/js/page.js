


const artistArray = ["2059","1342","1125","900","226","1154"];
const generateArtistCards = function (artist) {
    const row2 = document.getElementById('ads-artist')
    
        const newCol2 = document.createElement('div')
        newCol2.classList.add('col-3', 'bg-primary', 'm-1','flex-grow-1', 'd-flex', "p-0", "size_img")
        newCol2.innerHTML = `
        <div class="card" style="width: 18rem;">
       <img src="${artist.album.cover_medium}" class="card-img-top" alt="...">
        <div class="card-body">
        <p class="card-text text-white" id="cardText">${artist.artist.name}</p>
       <p class="card-text">${artist.album.title}</p>
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
            console.log('ARRAY!', array)

            generateArtistCards(array)
        })
        .catch((err) => {
            console.log('ERRORE!', err)

        })
}

getArtistS(artistArray);