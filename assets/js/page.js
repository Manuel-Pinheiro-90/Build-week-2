


const artistArray = ["2059","1342","1125","900","226","1154"];
const generateArtistCards = function (artist) {
    const row2 = document.getElementById('ads-artist')
    
        const newCol2 = document.createElement('div')
        newCol2.classList.add('col')
        newCol2.innerHTML = `
        <div class="card" style="width: 18rem;">
       <img src="${artist.data[0].album.cover_medium}" class="card-img-top" alt="...">
        <div class="card-body">
        <p class="card-text" id="cardText">${artist.data[0].artist.name}</p>
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