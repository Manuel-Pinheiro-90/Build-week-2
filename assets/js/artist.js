
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



















 const generateSongListCards = function (songsArray) {
     const artistrow = document.getElementById('songs-list')
     let canzone = songsArray.data
     let num = 0
     canzone.forEach((song) => {
         num++
         const artistCol = document.createElement('tr')
         artistCol.innerHTML = `
         <th scope="row">${num}</th>
         <td><img src="${song.album.cover}" alt=""></td>
         <td>${song.title}</td>
         <td>${song.rank}</td>
         <td class="bg-transparent">${song.duration}</td>`

         artistrow.appendChild(artistCol)
     })
 }

 const getArtistList = function () {

     fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}/top?limit=8`)
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