import { filterData, sortData, sortDataByPrice, computeStats} from "./dataFunctions.js";
import { renderItems } from "./view.js";
import data from "./data/dataset.js";

/* root container rendering*/
const contenedor = document.querySelector("#root");
contenedor.appendChild(renderItems(data));

/* calling attributes through constant declaration */
const selectFilter = document.querySelector('select[data-testid="select-filter"]');
const selectSort = document.querySelector('select[data-testid="select-sort"]');
const selectSortByPrice = document.querySelector('select[data-testid="select-sort-price"]');
const buttonStats = document.querySelector('button[data-testid="statistics"]');
const button = document.querySelector('button[data-testid="button-clear"]');
const textStats = document.getElementById('text');


/* adding event listeners to show on screen*/
/* filtering and ordering by ship name and cruise price*/

selectFilter.addEventListener("change", function (e) {
  const filteredData = filterData(data, "cruisePrice", e.target.value);
  contenedor.innerHTML = "";
  contenedor.appendChild(renderItems(filteredData));
  selectSort.addEventListener("change", function (e) {
    const orderFilterName = sortData(filteredData, "name", e.target.value);
    contenedor.innerHTML = "";
    contenedor.appendChild(renderItems(orderFilterName));
  });
  selectSortByPrice.addEventListener("change", function (e) {
    const orderPriceFilter = sortDataByPrice(filteredData, "cruisePrice", e.target.value);
    contenedor.innerHTML = "";
    contenedor.appendChild(renderItems(orderPriceFilter));
  });
  textStats.textContent= "";
});

/* ordering by ship name only*/
selectSort.addEventListener("change", function (e) {
  const orderData = sortData(data, "name", e.target.value);
  contenedor.innerHTML = "";
  contenedor.appendChild(renderItems(orderData));
});

/* ordering by cruise price only*/
selectSortByPrice.addEventListener("change", function (e) {
  const orderDataByPrice = sortDataByPrice(data, "cruisePrice", e.target.value);
  contenedor.innerHTML = "";
  contenedor.appendChild(renderItems(orderDataByPrice));
});

/* resetting all*/

button.addEventListener("click", function () {
  selectSortByPrice.selectedIndex = 0;
  selectSort.selectedIndex = 0;
  selectFilter.selectedIndex = 0;
  contenedor.innerHTML = "";
  contenedor.appendChild(renderItems(data));
  textStats.textContent = "";
});

/* updating statistics (average price) all and filtered*/
buttonStats.addEventListener('click', function(){
  if (selectFilter.value === 'Price') {
    textStats.textContent= computeStats(data);
  } else {
    const filteredData = filterData(data, "cruisePrice", selectFilter.value);
    textStats.textContent= computeStats(filteredData);
  }
});
