import fetchCountries from '../js/fetchCountries';

import countryInfo from '../templates/countryInfo.hbs';
import countriesList from '../templates/countriesList.hbs';

import errorMessage from '../js/pnotify';

const debounce = require('lodash.debounce');

const refs = {
  input: document.querySelector('#input'),
  countriesList: document.querySelector('#countries-list'),
};

refs.input.value = '';

refs.input.addEventListener(
  'input',
  debounce(() => searchCountry()),
  500,
);

function searchCountry(event) {
  clearListItems();
  const searchQuery = refs.input.value;
  fetchCountries(searchQuery, typeOfMarkup);
}

function typeOfMarkup(arr) {
  if (arr.length > 10) {
    errorMessage();
    return;
  } else {
    arr.map(countries => {
      if (arr.length === 1) {
        showCountryInfo(countries);
      } else {
        showListOfCountries(countries);
      }
    });
  }
}

function showCountryInfo(country) {
  const template = countryInfo(country);
  refs.countriesList.insertAdjacentHTML('beforeend', template);
}

function showListOfCountries(countries) {
  const template = countriesList(countries);

  refs.countriesList.insertAdjacentHTML('beforeend', template);
}

function clearListItems() {
  refs.countriesList.innerHTML = '';
}
