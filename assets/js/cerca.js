
const inputSerch = document.getElementById('inputSearch')
const buttonSend = document.getElementById('buttonSend')

const functionInput = function () {
    let input_name = inputSerch.value
    funzione_cerca(input_name)
    inputSerch.value = ''
}



const funzione_cerca = (input) => {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${input}`)
        .then((response) => {
            if (response.ok) {
                console.log(response);
                return response.json();
            } else {
                if (response.status === 404) {
                    throw new Error(
                        "Errore nella risposta del server: Resource not found " +
                        response.status
                    );
                } else if (response.status === 500) {
                    throw new Error(
                        "Errore nella risposta del server: Internal server error " +
                        response.status
                    );
                } else {
                    throw new Error(
                        "Errore nella risposta del server: Unknown error " + response.status
                    );
                }
            }
        })
        .then((data) => {
            if (data.data && data.data.length > 0) {
                let artistName = data.data[0].artist.id;
                // console.log("INPUT! INPUT", artistName);
                
                window.open('artist.html?artistId='+artistName);
                // Chiama una funzione con i dati, se necessario
                // funzione(data);
            } else {
                console.log("Nessun risultato trovato.");
            }
        })
        .catch((err) => {
            console.log("ERRORE!", err);
        });
};


