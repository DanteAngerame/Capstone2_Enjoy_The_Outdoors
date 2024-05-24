'use strict'

// Wait until the DOM content is fully loaded before executing the script
document.addEventListener("DOMContentLoaded", init);

        function init() {
            populateDropdowns();
            setupEventListeners();
        }

        function populateDropdowns() {
            const stateFilter = document.getElementById("statefilter");
            const parkTypesFilter = document.getElementById("parktypes");

            const parkTypesArray = [
                "National Park", "National Monument", "Recreation Area", "Scenic Trail", "Battlefield", 
                "Historic", "Memorial", "Preserve", "Island", "River", "Seashore", "Trail", "Parkway"
            ];

            for (let i = 0; i < locationsArray.length; i++) {
                let addoption = document.createElement("option");
                addoption.value = locationsArray[i];
                addoption.textContent = locationsArray[i];
                stateFilter.appendChild(addoption);
            }

            for (let i = 0; i < parkTypesArray.length; i++) {
                let addoption = document.createElement("option");
                addoption.value = parkTypesArray[i];
                addoption.textContent = parkTypesArray[i];
                parkTypesFilter.appendChild(addoption);
            }
        }


        const searchBar = document.getElementById('searchBar');
        const resultsContainer = document.getElementById('results');
        const viewAllButton = document.getElementById('viewAllButton');
        const stateFilter = document.getElementById("statefilter");
        const parkTypesFilter = document.getElementById("parktypes");
        const parkTypeKeywords = {
            "National Park": ["Yellowstone", "Yosemite", "Grand Canyon", "Statue of Liberty"],
            "National Monument": ["Statue of Liberty"],
            "Recreation Area": ["Recreation"],
            "Scenic Trail": ["Scenic"],
            "Battlefield": ["Battlefield"],
            "Historic": ["Historic"],
            "Memorial": ["Memorial"],
            "Preserve": ["Preserve"],
            "Island": ["Island"],
            "River": ["River"],
            "Seashore": ["Seashore"],
            "Trail": ["Trail"],
            "Parkway": ["Parkway"]
        };

        //Function to make cards
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
            resultsContainer.innerHTML = ''; 
            nationalParksArray.forEach(park => {
                const card = createCard(park);
                resultsContainer.appendChild(card);
            });
            resultsContainer.style.display = 'flex';
        }
            //searchbar
        function filterResults(query) {
            const filteredData = nationalParksArray.filter(park => 
                park.LocationName.toLowerCase().includes(query.toLowerCase())
            );
            resultsContainer.innerHTML = ''; 
            filteredData.forEach(park => {
                const card = createCard(park);
                resultsContainer.appendChild(card);
            });
            resultsContainer.style.display = filteredData.length > 0 ? 'flex' : 'none';
        }
            //search by state
        function filterResultsByState(state) {
            const filteredData = nationalParksArray.filter(park => 
                park.State.toLowerCase() === state.toLowerCase()
            );
            resultsContainer.innerHTML = ''; 
            filteredData.forEach(park => {
                const card = createCard(park);
                resultsContainer.appendChild(card);
            });
            resultsContainer.style.display = filteredData.length > 0 ? 'flex' : 'none';
        }
            //search by type of park 
        function filterResultsByParkType(keyword) {
            const filteredData = nationalParksArray.filter(park => 
                park.LocationName.toLowerCase().includes(keyword.toLowerCase())
            );
            resultsContainer.innerHTML = ''; 
            filteredData.forEach(park => {
                const card = createCard(park);
                resultsContainer.appendChild(card);
            });
            resultsContainer.style.display = filteredData.length > 0 ? 'flex' : 'none';
        }

        function setupEventListeners() {
            stateFilter.addEventListener('change', (e) => {
                const selectedState = e.target.value;
                if (selectedState) {
                    filterResultsByState(selectedState);
                } else {
                    displayAllResults();
                }
            });

            parkTypesFilter.addEventListener('change', (e) => {
                const selectedParkType = e.target.value;
                if (selectedParkType) {
                    filterResultsByParkType(selectedParkType);
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
                //click off to clear results
            document.addEventListener('click', (e) => {
                if (!searchBar.contains(e.target) && !resultsContainer.contains(e.target) && !stateFilter.contains(e.target) && !parkTypesFilter.contains(e.target)) {
                    resultsContainer.style.display = 'none';
                }
            });

            viewAllButton.addEventListener('click', (e) => {
                e.stopPropagation(); 
                displayAllResults();
            });
        }

        parkTypesFilter.addEventListener('change', (e) => {
            const selectedKeyword = e.target.value;
            if (selectedKeyword) {
                filterResultsByParkType(selectedKeyword);
            } else {
                displayAllResults();
            }
        });