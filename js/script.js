const searchBtn = document.getElementById('search-btn');
const searchBar = document.getElementById('search-bar');
const resultsSection = document.getElementById('results');

searchBtn.addEventListener('click', () => {
    const query = searchBar.value.trim();
    if (query) {
        fetchCountryData(query);
    }
});

function fetchCountryData(countryName) {
    const url = `https://restcountries.com/v3.1/name/${countryName}`;
    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Country not found');
            return response.json();
        })
        .then(data => {
            displayCountryData(data);
        })
        .catch(error => {
            resultsSection.innerHTML = `<p>${error.message}</p>`;
        });
}

function displayCountryData(countries) {
    resultsSection.innerHTML = ''; 
    countries.forEach(country => {
        const countryCard = `
            <div class="country-card">
                <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
                <div class="card-body">
                    <h3>${country.name.common}</h3>
                    <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                    <p><strong>Region:</strong> ${country.region}</p>
                    <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
                    <a href="https://www.google.com/maps?q=${country.name.common}" target="_blank">View on Maps</a>
                </div>
            </div>
        `;
        resultsSection.innerHTML += countryCard;
    });
}
