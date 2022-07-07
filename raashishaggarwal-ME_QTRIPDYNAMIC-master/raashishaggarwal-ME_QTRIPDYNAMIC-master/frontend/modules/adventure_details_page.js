import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const param = new URLSearchParams(search);
  let idNo = param.get("adventure");
  console.log(idNo);
  return idNo;

  
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
  let AdventureDetailsPromise = await fetch(config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`);
  let idData = await AdventureDetailsPromise.json();
  return idData;
  }catch(err){
    return null;
  }
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  console.log(adventure);
  document.getElementById("adventure-name").innerHTML = `${adventure.name}`;
  document.getElementById("adventure-subtitle").innerHTML = `${adventure.subtitle}`;
  document.getElementById("adventure-content").innerHTML = `${adventure.content}`;

  adventure.images.forEach((image) =>{
    let divElement = document.createElement("div");
    divElement.innerHTML = `<img class = "activity-card-image" src=${image} alt = "adventureImages">`;
    let imageGallery = document.getElementById("photo-gallery");
    imageGallery.appendChild(divElement);
});
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
let bootstrapCarousel = document.getElementById("photo-gallery");
bootstrapCarousel.innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
<div class="carousel-indicators">
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
</div>
<div class="carousel-inner" id = "carousel-inner">

</div>
<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Previous</span>
</button>
<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="visually-hidden">Next</span>
</button>
</div>`

images.map((image,index) =>{
  let divElement = document.createElement("div");
  divElement.className=`carousel-item ${index === 0 ? "active" : ""}`;
  divElement.innerHTML=`<img class ="d-block w-100 activity-card-image" src = "${image}"/>`;
  document.getElementById("carousel-inner").append(divElement);
  });
}


//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  console.log(adventure);
if(adventure.available){
  document.getElementById("reservation-panel-sold-out").style.display = "none";
  document.getElementById("reservation-panel-available").style.display = "block";
  document.getElementById("reservation-person-cost").textContent = adventure.costPerHead;
}else{
  document.getElementById("reservation-panel-available").style.display = "none";
  document.getElementById("reservation-panel-sold-out").style.display = "block";
}
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
let reservationCost = document.getElementById("reservation-cost");
reservationCost.innerHTML = adventure.costPerHead*persons;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
 
  let form = document.getElementById("myForm");
  form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let submitedData = {
      name:form.elements["name"].value,
      date:new Date(form.elements["date"].value),
      person:form.elements["person"].value,
      adventure:adventure.id,
    }
    fetch(config.backendEndpoint + "/reservations/new",{
      method:"POST",
      mode:"cors",
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(submitedData),
    }).then((data) =>{
      if (data.status == 200){
        alert("Success!");
        window.location.reload();
      }
        else{
          alert("Failed!");
        }
        data.json();
    });
  }) 
  }

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
 if (adventure.reserved){
  document.getElementById("reserved-banner").style.display = "block";
}else{
  document.getElementById("reserved-banner").style.display = "none";
}
} 

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
