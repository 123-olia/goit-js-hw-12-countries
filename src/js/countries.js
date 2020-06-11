import fetchCountries from '../js/fetchCountries';

import countryInfo from '../templates/countryInfo.hbs';
import countriesList from '../templates/countriesList.hbs';

import errorMessage from '../js/pnotify';

import debounce from 'lodash.debounce';

const refs = {
  input: document.querySelector('#input'),
  countriesList: document.querySelector('#countries-list'),
};

refs.input.value = '';

refs.input.addEventListener('input', debounce(searchCountry, 500));

function searchCountry(event) {
  clearListItems();
  const searchQuery = refs.input.value;

  if (!searchQuery) {
    return;
  }
  fetchCountries(searchQuery, typeOfMarkup);
}

function typeOfMarkup(arr) {
  if (arr.length > 10) {
    errorMessage();
    return;
  }

  if (arr.length === 1) {
    showCountryInfo(arr[0]);
    return;
  }
  showListOfCountries(arr);
}

function showCountryInfo(country) {
  const template = countryInfo(country);
  refs.countriesList.insertAdjacentHTML('beforeend', template);
}

function showListOfCountries(countries) {
  const template = countries.map(country => countriesList(country)).join('');
  refs.countriesList.insertAdjacentHTML('beforeend', template);
}

function clearListItems() {
  refs.countriesList.innerHTML = '';
}
