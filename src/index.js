import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
const DEBOUNCE_DELAY = 300;


const getInput = document.querySelector('#search-box');
console.log(getInput);
const countryList = document.querySelector('.country-list');
console.log(countryList);
const countryInfo = document.querySelector('.country-info');
console.log(countryInfo);


const InputCountries = debounce(event => {
    const inputValue = getInput.value.trim();
    console.log(inputValue);
    cleanHtml(); 
    if (inputValue !== '') {
        fetchCountries(inputValue).then(foundData => {      

        if (foundData.length > 10) {
            Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
        );
    } else if (foundData.length === 0) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        } else if (foundData.length >= 2 && foundData.length <= 10) {
        
        renderCountryList(foundData);
        } else if (foundData.length === 1) {
    
        renderOneCountry(foundData);
        }
    });
    }    
    }, DEBOUNCE_DELAY);
///////
    function renderCountryList(countries) {
        const markup = countries
        .map(country => {
        return `<li>
        <img src="${country.flags.svg}" alt="Flag of ${
            country.name.official
        }" width="30" hight="20">
            <b>${country.name.official}</p>
                    </li>`;
        })
        .join('');
    countryList.innerHTML = markup;
    }
      ////
    function renderOneCountry(countries) {
        const markup = countries
            .map(country => {
            return `<li>
        <img src="${country.flags.svg}" alt="Flag of ${
                country.name.official
            }" width="30" hight="20">
            <b>${country.name.official}</b></p>
                <p><b>Capital</b>: ${country.capital}</p>
                <p><b>Population</b>: ${country.population}</p>
                <p><b>Languages</b>: ${Object.values(country.languages)} </p>
                    </li>`;
            })
            .join('');
        countryList.innerHTML = markup;
    }
/////
getInput.addEventListener("input", InputCountries); 

///////
function cleanHtml() {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  }



