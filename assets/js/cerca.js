
const inputSerch = document.getElementById('inputSearch')
const buttonSend = document.getElementById('buttonSend')

let input_name = inputSerch.value
const functionInput = function () {
    console.log(inputSerch.value)
    funzione_cerca()
    inputSerch.value = ''
}





const funzione_cerca = () => {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${input_name}`)
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
                let artistName = data.data[0].artist.name;
                console.log("INPUT! INPUT", artistName);
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


