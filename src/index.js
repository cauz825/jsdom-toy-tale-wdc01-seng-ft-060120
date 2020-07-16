let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
  let toyCollection = document.getElementById(`toy-collection`)
  let url = "http://localhost:3000/toys"


  let renderToys = function (toyArray){
    toyArray.forEach(toyObj => {
      let cards = document.createElement(`div`)
        cards.className = `card`
        cards.innerHTML = `<h2>${toyObj.name}</h2>
        <img src=${toyObj.image} class="toy-avatar">
        <p>Number of Likes: ${toyObj.likes}</p>
        <button class="like-btn">Like <3</button>`
        toyCollection.append(cards)
    });
  };

  let toyForm = document.querySelector(`.add-toy-form`)
    toyForm.addEventListener(`submit`, function (e){
      e.preventDefault()
      let imageInput = toyForm.querySelector(`input[name="image"]`)
      let nameInput = toyForm.querySelector(`input[name="name"]`)
      let newToy = {
        "name": `${nameInput.value}`,
        "image": `${imageInput.value}`,
        "likes": 0
      }
      fetch(`${url}`, {
        method: "POST",
        headers: 
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },

        body: JSON.stringify(newToy)
      })
      .then(response => response.json())
      .then(data => console.log(data))
      
    });

  fetch(url)
  .then(response => response.json())
  .then(results => renderToys(results))
})