
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
const params=new URLSearchParams(search);
let cityName = params.get("city");
console.log(cityName);
return cityName;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
try{
  //let apiPromise = getCityFromURL(search);
 //console.log(apiPromise);
 let adventuresPromise = await fetch(config.backendEndpoint + `/adventures?city=${city}`);
 let data = await adventuresPromise.json();
 return data;
}catch(err){
  return null;
}
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  adventures.forEach(ele => {
    //console.log(ele.id);
    createCard(ele.id, ele.category, ele.image, ele.name, ele.costPerHead, ele.duration);
     });
  //console.log(createCard);
}
function createCard(id, category, image,name, costPerHead, duration){
 let cardDiv = document.getElementById("data");
 //console.log(cardDiv)
 //col-sm-6 col-md-3 mb-4
 //col-6 col-md-4 col-lg-3 mb-4
 //col-12 col-sm-6 col-lg-3 mb-4
 let childDiv = document.createElement("div");
 childDiv.className = "col-6 col-lg-3 mb-3";
 childDiv.setAttribute("style","position:relative");
 childDiv.innerHTML = `<a href="detail/?adventure=${id}" id="${id}"> 
 <div class="category-banner">
 <b>${category}</b>
 </div>  
 <div class ="activity-card">
 <div class="activity-card-image"> <img src="${image}" class="img-responsive"/> </div>
 <div class="adventure-card-text">
 <div class="combine-1">
   <div><p>${name}</p></div>
  <div> <p>₹${costPerHead}</p></div>
    </div>
    <div class = "combine-2">
    <div><p>Duration</p></div>
   <div> <p>${duration}Hours </p></div>
    </div>
    </div>
  </a> `;
cardDiv.append(childDiv);
//console.log("from card div", cardDiv);
return cardDiv
}
//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredDurationList = [];
  for (let i=0 ; i<list.length; i++){
    if (list[i].duration >= low && list[i].duration <= high){
      filteredDurationList.push(list[i]);
    }
  }
  console.log(filteredDurationList);
  return filteredDurationList;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
let filterdCategoryList = [];
for (let i=0 ; i<list.length ; i++){
  if (categoryList.includes(list[i].category)){
    filterdCategoryList.push(list[i]);
  }
}
console.log(filterdCategoryList);
return filterdCategoryList
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let categoryList = filters.category;
let duration = filters.duration;
console.log(categoryList,duration)
let durationArray = duration.split("-");
let low = parseInt(durationArray[0]);
let high = parseInt(durationArray[1]);
console.log(low,high);
let filteredList = [];
if (duration.length == 0 && categoryList.length > 0){
  filteredList = filterByCategory(list,categoryList);
}
else if(duration.length > 0 && categoryList.length == 0){
  filteredList = filterByDuration(list,low,high);
}
else if(duration.length > 0 && categoryList.length > 0){
  let filteredCatList = filterByCategory(list,categoryList);
   filteredList = filterByDuration(filteredCatList,low,high);
  }
else{
  filteredList = list;
}
  // Place holder for functionality to work in the Stubs
  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  console.log(filters);
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
window.localStorage.setItem('filters',JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
 function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filter = JSON.parse(window.localStorage.getItem('filters'));
  if (filter){
    return filter
  }else{
// Place holder for functionality to work in the Stubs
 return null;
 }
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
if (filters.category.length != 0){
  let categoryList = filters.category;
  //console.log(categoryList);
  let parentElement = document.getElementById("category-list")
  categoryList.map((item) =>{
    let childElement = document.createElement("div");
    childElement.classList.add("category-filter");
    childElement.innerHTML = `<span>${item}</span>`

    parentElement.appendChild(childElement);
  })
}
if (filters.duration != "")
document.getElementById("duration-select").value = filters.duration
}
  
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
