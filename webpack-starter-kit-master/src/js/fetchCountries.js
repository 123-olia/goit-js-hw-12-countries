const baseUrl = 'https://restcountries.eu/rest/v2/name/';

export default function fetchCountries(searchQuery, callback) {
  fetch(baseUrl + searchQuery)
    .then(response => response.json())
    .then(data => {
      // console.dir(data);
      callback(data);
    })
    .catch(error => {
      console.warn('Some error in fetch');
    });
}
