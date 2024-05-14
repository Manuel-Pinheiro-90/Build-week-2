


`<div class="col-3">
<div class="card mb-3">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="./Assets_esercizio/imgs/main/image-1.jpg" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <p class="card-text" id="cardText"></p>
      </div>
    </div>
  </div>
</div>
</div>`


const getGundamData = function () {

    fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/75621062`, {
      headers: {
        Authorization: API_KEY,
      },
    })
  
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          if (response.status === 404) {
            throw new Error("Errore nel recupero dei dettagli del prodotto: Resource not found " + response.status)
          } else if (response.status === 500) {
            throw new Error("Errore nel recupero dei dettagli del prodotto: Internal server error " + response.status)
          } else {
            throw new Error("Errore nel recupero dei dettagli del prodotto: Unknown error " + response.status)
          }
  
        }
      })
      .then((event) => {
        console.log('DETTAGLI RECUPERATI', event)
  
        document.getElementById('name').value = event.title
        document.getElementById('description').value = event.description
        document.getElementById('brand').value = event.brand
        document.getElementById('price').value = event.price
        document.getElementById('imge').value = event.imageUrl
  
        eventToModify = event
      })
      .catch((err) => {
        appendAlert('Qualcosa è andato storto!! ' + err, 'warning')
        console.log('ERRORE', err)
  
      })
  }
  