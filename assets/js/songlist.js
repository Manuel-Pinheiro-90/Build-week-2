const link = "";
const generateSongListCards = function (song) {
    const row3 = document.getElementById('songs-list')
    
        const newCol3 = document.createElement('div')
        newCol3.classList.add('col' ,'p-1', 'd-flex')
        newCol3.innerHTML = `
        <tr>
        <th scope="row">#</th>
        <td>${song.data[0].album.cover_medium}</td>
        <td>${song.data[0].album.cover_medium}</td>
        <td>${song.data[0].album.cover_medium}</td>
        </tr>
        `
        row3.appendChild(newCol3)
    
}

function getSongListS(song) {
    song.forEach(song => {
        
        getSongList(song);
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

            generateSongListCards(array)
        })
        .catch((err) => {
            console.log('ERRORE!', err)

        })
}
getSongListS(songArray);