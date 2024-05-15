

const generateSongListCards = function (songArray) {
    const songrow = document.getElementById('songs-list')
    const french = songArray.tracks.data
    console.log(french)
    let num = 0
    french.forEach((song) => {
        num++
        const songCol = document.createElement('tr')
        songCol.innerHTML =`
        <th scope="row">${num}</th>
        <td>${song.title}</td>
        <td>${song.rank}</td>
        <td>${song.duration}</td>
        ` 
        songrow.appendChild(songCol)
      })
    }

const getSongList = function () {
    
    fetch('https://striveschool-api.herokuapp.com/api/deezer/album/75621062')
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
getSongList();