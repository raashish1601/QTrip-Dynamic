import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
try{
let reservationApi = await fetch(config.backendEndpoint + "/reservations")
.then(res => res.json());
return reservationApi;
}
  catch(err){
    return null;
  }
  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  console.log(reservations);
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
 
  //Conditionally render the no-reservation-banner and reservation-table-parent
  if (reservations.length == 0){
    document.getElementById("no-reservation-banner").style.display = "block"
    document.getElementById("reservation-table-parent").style.display = "none";
  }else{
    document.getElementById("no-reservation-banner").style.display = "none"
    document.getElementById("reservation-table-parent").style.display = "block";
  
    let tableData = document.getElementById("reservation-table");
  reservations.forEach(element =>{
    //date formate ex:27/03/1998
    let reservationDate= new Date(element.date).toLocaleDateString("en-IN");
    //time formate ex:12:04:47 am 
    let time = new Date(element.time);
    let timeString = time.toLocaleTimeString('en-IN');
    //date formate in numeric and string ex: 27 march 2022;
      let options = {year:"numeric",month:'long',day:'numeric'};
    let bookingDate = new Date(element.time).toLocaleDateString("en-IN",options); 
     let bookingTime = bookingDate +', '+ timeString;
    tableData.innerHTML += `
    <tr>
    <td><b>${element.id}</b></td>
    <td>${element.name}</td>
    <td>${element.adventureName}</td>
    <td>${element.person}</td>
    <td>${reservationDate}</td>
    <td>${element.price}</td>
    <td>${bookingTime}</td>
    <td><button class="reservation-visit-button" id="${element.id}"><a href = "../detail/?adventure=${element.adventure}">Visit Adventure</a></td>
    </tr>
    `
  })
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page
   
    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  }
}

export { fetchReservations, addReservationToTable };
