
const addressBarContent = new URLSearchParams(location.search) 
console.log(addressBarContent)
const albumId = addressBarContent.get('albumId')

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

      const row4 = document.getElementById('title_album')
        const newCol4 = document.createElement('div')
        newCol4.classList.add('col-md-4')
        newCol4.innerHTML = `
                <img src="${songArray.cover_xl}" class="card-img" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${songArray.title}</h5>
                  <p class="card-text"><img src="${songArray.artist.picture_small}" class="card-img" alt="..."> ${songArray.artist.name} ${songArray.release_date} ${num} ${songArray.duration}</p>
                </div>
        `
        row4.appendChild(newCol4)
    }

const getSongList = function () {
    
    fetch('https://striveschool-api.herokuapp.com/api/deezer/album/'+ albumId)
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