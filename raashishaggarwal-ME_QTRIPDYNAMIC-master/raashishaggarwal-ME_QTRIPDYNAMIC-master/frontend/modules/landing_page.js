import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  console.log("From init()")
 //console.log("http://3.109.253.57:8082/cities");
 let cities = await fetchCities();
 console.log(cities)
 //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}
//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
 try{
  let apiPromise = await fetch(config.backendEndpoint + "/cities");
  let data = await apiPromise.json();
  return data;
}catch(err){
  return null;
}
  }


//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let divElement = document.getElementById("data");
  let childDiv = document.createElement("div");
  //col-12 col-sm-6 col-lg-3 mb-4
  childDiv.className = "col-12 col-sm-6 col-lg-3 mb-4";
  childDiv.innerHTML = `<a href="pages/adventures/?city=${id}" id=${id}>
  <div class="tile">
  <img src="${image}"/>
  <div class="tile-text tile-center">
  <h5>${city}</h5>
  <p>${description}</p>
  </div>
  </div>
  </a>
  `;
  console.log(divElement);
  console.log(childDiv);
  divElement.appendChild(childDiv);
  return divElement;
  

}

export { init, fetchCities, addCityToDOM };
