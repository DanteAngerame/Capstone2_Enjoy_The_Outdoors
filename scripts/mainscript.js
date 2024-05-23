'use strict'

// Wait until the DOM content is fully loaded before executing the script
document.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("Initializing...");
  populateDropdown();
  setupEventListeners();
}

function populateDropdown() {
  const stateFilter = document.getElementById("statefilter");
  const ListofParkTypes = document.getElementById("parktypes");

  const parkTypesArray = [
    "National Park", "National Monument", "Recreation Area", "Scenic Trail", "Battlefield", 
    "Historic", "Memorial", "Preserve", "Island", "River", "Seashore", "Trail", "Parkway"
  ];



  for (let i = 0; i < parkTypesArray.length; i++) {
    let addoption = document.createElement("option");
    addoption.value = parkTypesArray[i];
    addoption.textContent = parkTypesArray[i];
    ListofParkTypes.appendChild(addoption);
  }

  for (let i = 0; i < locationsArray.length; i++) {
    let addoption = document.createElement("option");
    addoption.value = locationsArray[i];
    addoption.textContent = locationsArray[i];
    stateFilter.appendChild(addoption);
  }
}


const searchBar = document.getElementById('searchBar');
const resultsContainer = document.getElementById('results');
const viewAllButton = document.getElementById('viewAllButton');

function createCard(park) {
  const col = document.createElement('div');
  col.className = 'col-md-4 mb-3';

  const card = document.createElement('div');
  card.className = 'card h-100';

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body d-flex flex-column h-100';

  const title = document.createElement('h5');
  title.className = 'card-title';
  title.textContent = park.LocationName;

  const body = document.createElement('div');
  body.className = 'card-text';
  body.innerHTML = `
    <p><strong>Location ID:</strong> ${park.LocationID}</p>
    <p><strong>Address:</strong> ${park.Address}, ${park.City}, ${park.State}, ${park.ZipCode}</p>
    <p><strong>Phone:</strong> ${park.Phone}</p>
    <p><strong>Fax:</strong> ${park.Fax}</p>
    <p><strong>Coordinates:</strong> Latitude ${park.Latitude},<br> Longitude ${park.Longitude}</p>
  `;

  cardBody.appendChild(title);
  cardBody.appendChild(body);
  card.appendChild(cardBody);
  col.appendChild(card);
  return col;
}

function displayAllResults() {
  console.log("Displaying all results");
  resultsContainer.innerHTML = ''; // Clear previous results
  nationalParksArray.forEach(park => {
    const card = createCard(park);
    resultsContainer.appendChild(card);
  });
  resultsContainer.style.display = 'flex';
}

function filterResults(query) {
  const filteredData = nationalParksArray.filter(park => 
    park.LocationName.toLowerCase().includes(query.toLowerCase())
  );
  resultsContainer.innerHTML = ''; // Clear previous results
  filteredData.forEach(park => {
    const card = createCard(park);
    resultsContainer.appendChild(card);
  });
  resultsContainer.style.display = filteredData.length > 0 ? 'flex' : 'none';
}

function filterResultsByState(state) {
  console.log("Filtering results for state:", state);
  const filteredData = nationalParksArray.filter(park => 
    park.State.toLowerCase() === state.toLowerCase()
  );
  resultsContainer.innerHTML = ''; // Clear previous results
  filteredData.forEach(park => {
    const card = createCard(park);
    resultsContainer.appendChild(card);
  });
  resultsContainer.style.display = filteredData.length > 0 ? 'flex' : 'none';
}

function setupEventListeners() {
  const stateFilter = document.getElementById("statefilter");
  stateFilter.addEventListener('change', (e) => {
    e.stopPropagation();
    const selectedState = e.target.value;
    console.log("Selected state:", selectedState);
    if (selectedState) {
      filterResultsByState(selectedState);
    } else {
      displayAllResults();
    }
  });

  searchBar.addEventListener('focus', displayAllResults);

  searchBar.addEventListener('input', (e) => {
    const query = e.target.value;
    if (query) {
      filterResults(query);
    } else {
      displayAllResults();
    }
  });

  document.addEventListener('click', (e) => {
    if (!searchBar.contains(e.target) && !resultsContainer.contains(e.target)) {
      resultsContainer.style.display = 'none';
    }
  });


  viewAllButton.addEventListener('click', (e) => {
    e.stopPropagation(); // Add this line to prevent the event from bubbling up
    console.log("View All button clicked");
    displayAllResults();
  });
}
