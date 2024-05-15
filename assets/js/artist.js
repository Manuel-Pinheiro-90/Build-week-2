
const get_codice_artist = new URLSearchParams(location.search);
console.log(get_codice_artist);
const artistId = get_codice_artist.get("artistId");

const get_artist = () => {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`)
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
        .then((artista) => {
            console.log("funziona", artista)
            let url_img = artista.picture_big
            document.getElementById("sfondo_immagine").style.backgroundImage =`url(${url_img})`
            document.getElementById("nome_artista").innerText = artista.name
            document.getElementById("numero_ascoltatori").innerText = artista.nb_fan
        })
}

get_artist()



















 const generateSongListCards = function (artistArray) {
     const artistrow = document.getElementById('songs-list')
     const french = artistArray.tracks.data
     console.log(french)
     let num = 0
     french.forEach((artist) => {
         num++
         const artistCol = document.createElement('tr')
         artistCol.innerHTML = `
         <th scope="row">${num}</th>
         <td>${artist.title}</td>
         <td>${artist.rank}</td>
         <td>${artist.duration}</td>`

         artistrow.appendChild(artistCol)
     })
 }

 const getArtistList = function () {

     fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/top?limit=50`)
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
 getArtistList();