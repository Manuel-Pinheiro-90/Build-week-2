



const generateGundamCards = function (gundamsArray) {
    const row = document.getElementById('events-row')
    gundamsArray.forEach((gundam) => {
      const newCol = document.createElement('div')
      newCol.classList.add('col')
      newCol.innerHTML = 
        <div class="card h-100 d-flex flex-column" onclick="redirectToPage('details.html?gundamId=${gundam._id}')" >
          <img src="${gundam.imageUrl}" class="card-img-top" alt="...">
          <div class="card-body d-flex flex-column justify-content-around">
            <h5 class="card-title">${gundam.name}</h5>
            <p class="card-text">${gundam.description}</p>
            <p class="card-text">${gundam.brand}</p>
            <div class="d-flex justify-content-between">
              <p>${gundam.price}€</p>
              <a href="backoffice.html?gundamId=${gundam._id}" class="btn btn-info">MODIFICA</a>
            </div>
          </div>
        </div>
        
      row.appendChild(newCol)
    })
  }
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