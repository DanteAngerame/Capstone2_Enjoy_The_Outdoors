'use strict'

const dropdown = document.getElementById('mountainDropdown');
const viewAllBtn = document.getElementById('viewAllBtn');
const cardContainer = document.getElementById('cardContainer');

// Populate dropdown
mountainsArray.forEach((mountain, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = mountain.name;
    dropdown.appendChild(option);
});

// Handle dropdown change event
dropdown.addEventListener('change', function() {
    const selectedIndex = this.value;
    cardContainer.innerHTML = ''; // Clear previous cards

    if (selectedIndex !== '') {
        const mountain = mountainsArray[selectedIndex];
        createCard(mountain);
    }
});

// Function to create a card
function createCard(mountain) {
    const card = document.createElement('div');
    card.className = 'card';

    const name = document.createElement('h2');
    name.textContent = mountain.name;
    card.appendChild(name);

    const elevation = document.createElement('p');
    elevation.textContent = `Elevation: ${mountain.elevation} feet`;
    card.appendChild(elevation);

    const effort = document.createElement('p');
    effort.textContent = `Effort: ${mountain.effort}`;
    card.appendChild(effort);

    const img = document.createElement('img');
    img.src = mountain.img;
    img.alt = mountain.name;
    card.appendChild(img);

    const desc = document.createElement('p');
    desc.textContent = mountain.desc;
    card.appendChild(desc);

    const coords = document.createElement('p');
    coords.textContent = `Coordinates: (${mountain.coords.lat}, ${mountain.coords.lng})`;
    card.appendChild(coords);

    cardContainer.appendChild(card);

    card.style.display = 'block'; // Show the card
}

// Function to display all cards
function displayAllCards() {
    cardContainer.innerHTML = ''; // Clear previous cards
    mountainsArray.forEach(mountain => {
        createCard(mountain);
    });
}

// Attach event listener to View All button
viewAllBtn.addEventListener('click', displayAllCards);