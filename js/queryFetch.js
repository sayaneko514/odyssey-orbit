document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput').value.toLowerCase();

    if (!searchInput) {
        displayEmptySearchMessage();
        return;
    }

    fetch('assets/files/data.json')
        .then(response => response.json())
        .then(data => {
            let results = [];
            if (searchInput === 'country' || searchInput === ('countries') || searchInput === ('city') || searchInput === ('cities')) {
                data.countries.forEach(country => {
                    results = results.concat(country.cities);
                });
            } else if (searchInput === ('beach') || searchInput === ('beaches')) {
                results = data.beaches;
            } else if (searchInput === ('temple') || searchInput === ('temples')) {
                results = data.temples;
            }
            if (results.length > 0) {
                displayResults(results);
            } else {
                data.countries.forEach(country => {
                    if (country.name.toLowerCase().includes(searchInput)) {
                        results.push(country);
                    }
                    country.cities.forEach(city => {
                        if (city.name.toLowerCase().replace(',', '').includes(searchInput)) {
                            results.push(city);
                        }
                    });
                });

                data.temples.concat(data.beaches).forEach(place => {
                    if (place.name.toLowerCase().replace(',', '').includes(searchInput)) {
                        results.push(place);
                    }
                });
            }

            if (results.length > 0) {
                displayResults(results);
            } else {
                displayNoResultsMessage();
            }
        })
        .catch(error => {
            console.error('Error fetching the data:', error);
            displayNoResultsMessage();
        });
});

function displayResults(results) {
    const modalContent = document.getElementById('searchResults');
    modalContent.innerHTML = '';

    const isCountryResult = results.length > 0 && results[0].cities;

    if (isCountryResult) {
        const country = results[0];
        const headingContainer = document.createElement('div');
        headingContainer.classList.add('heading_container');
        headingContainer.innerHTML = `<h2>${country.name}</h2>`;
        modalContent.appendChild(headingContainer);

        country.cities.forEach(city => {
            const cityElement = document.createElement('div');
            cityElement.innerHTML = `
                <div class="card" style="border-radius: 20px;">
                <img src="${city.imageUrl}">
                <div class ="card-content">
                <h1><span class="highlight">${city.name}</span></h1>
                <h2>${city.description}</h2>
            `;
            modalContent.appendChild(cityElement);
        });
    } else {
        results.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.innerHTML = `
            <div class="card" style="border-radius: 20px;">
            <img src="${item.imageUrl}">
            <div class ="card-content">    
            <h1><span class="highlight">${item.name}</span></h1>
            <h2>${item.description}</h2>
            `;
            modalContent.appendChild(itemElement);
        });
    }

    openModal();
}

function displayEmptySearchMessage() {
    const modalContent = document.getElementById('searchResults');
    modalContent.innerHTML = '<h2>Please enter a keyword to search.</h2>';
    openModal();
}

function displayNoResultsMessage() {
    const modalContent = document.getElementById('searchResults');
    modalContent.innerHTML = '<h2>No results found. Please try different keywords.</h2>';
    openModal();
}

function openModal() {
    document.querySelector('.search-modal').style.display = 'block';
}

document.querySelector('.close-modal').addEventListener('click', function () {
    document.querySelector('.search-modal').style.display = 'none';
});

window.addEventListener('click', function (event) {
    const modal = document.querySelector('.search-modal');
    if (event.target === modal) {
        closeModal();
    }
});

function closeModal() {
    document.querySelector('.search-modal').style.display = 'none';
}