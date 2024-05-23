"use strict";

// Populate the dropdowns
window.onload = function () {
  const statesDropdown = document.getElementById("states");
  const parkTypeDropdown = document.getElementById("parktype");

  // Populate states dropdown
  locationsArray.forEach((location) => {
    const option = document.createElement("option");
    option.value = location;
    option.textContent = location;
    statesDropdown.appendChild(option);
  });

  // Populate park types dropdown
  parkTypesArray.forEach((parkType) => {
    const option = document.createElement("option");
    option.value = parkType;
    option.textContent = parkType;
    parkTypeDropdown.appendChild(option);
  });

  // Add event listeners for radio buttons
  document
    .getElementById("locationRadio")
    .addEventListener("change", toggleDropdowns);
  document
    .getElementById("parkTypeRadio")
    .addEventListener("change", toggleDropdowns);
  // Add event listeners for dropdowns
  statesDropdown.addEventListener("change", searchLocation);
  parkTypeDropdown.addEventListener("change", searchLocation);

   // Display all parks initially
   displayParks(nationalParksArray);
};

// Function to toggle dropdowns based on selected radio button
function toggleDropdowns() {
  const locationRadio = document.getElementById("locationRadio").checked;
  const parkTypeRadio = document.getElementById("parkTypeRadio").checked;

  document.getElementById("states").classList.toggle("hidden", !locationRadio);
  document
    .getElementById("parktype")
    .classList.toggle("hidden", !parkTypeRadio);
};

// Function to clear selected filters and search input
function clearFilters() {
  document.getElementById('inputLocation').value = ''; // Clear search input
  document.getElementById('states').selectedIndex = 0; // Reset states dropdown
  document.getElementById('parktype').selectedIndex = 0; // Reset park type dropdown

  // Optionally, trigger search after clearing filters
  searchLocation();
}

// Search function
function searchLocation() {
  const selectedState = document.getElementById("states").value;
  const selectedParkType = document.getElementById("parktype").value;
  const searchInput = document
    .getElementById("inputLocation")
    .value.toLowerCase();

  let filteredParks = nationalParksArray;

  if (document.getElementById("locationRadio").checked && selectedState) {
    filteredParks = filteredParks.filter(
      (park) => park.State === selectedState
    );
  }

  if (document.getElementById("parkTypeRadio").checked && selectedParkType) {
    filteredParks = filteredParks.filter((park) =>
      park.LocationName.toLowerCase().includes(selectedParkType.toLowerCase())
    );
  }

  if (searchInput) {
    filteredParks = filteredParks.filter((park) =>
      park.LocationName.toLowerCase().includes(searchInput)
    );
  }

  displayParks(filteredParks);
}

function displayParks(parks) {
  let message = `${parks.length} National Park(s) to visit:`;

  document.getElementById("parkMessage").innerHTML = message;

  let display = parks.map(parkTemplate).join("");

  document.getElementById("myParks").innerHTML = display;
}

// Template function
/* function parkTemplate(park) {
  return `
      <div class="card" style="width: 18rem;">
          <img src="${park.Image}" class="card-img-top" alt="${park.LocationName}">
          <div class="card-body">
              <h5 class="card-title">${park.LocationName}</h5>
              <p class="card-text">${park.City}, ${park.State}</p>
              <p class="card-text">Phone: ${park.Phone}</p>
              ${park.Visit ? `<p class="card-text"><a href="#" onclick="openInNewWindow('${park.Visit}')">Visit Site</a></p>` : ''}
          </div>
      </div>`;
} */

function parkTemplate(park) {
  return `
      <div class="park">
          <div class="overlay"></div>
          <h3>${park.LocationName}</h3>
          <p>${park.Address}, ${park.City}, ${park.State}, ${park.ZipCode}</p>
          <p>Phone: ${park.Phone}</p>
          ${park.Visit ? `<p class="card-text"><a href="#" onclick="openInNewWindow('${park.Visit}')">Visit Site</a></p>` : ''}
          <img src="${park.Image}" alt="${park.LocationName}">
      </div>
  `;
}

// Function to open link in a new window
function openInNewWindow(url) {
  window.open(url, '_blank');
}
