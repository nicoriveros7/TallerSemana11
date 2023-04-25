import { Serie } from './serie.js';

import { dataSeries } from './dataSeries.js';

let seriesTbody: HTMLElement = document.getElementById('series')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalseasonsElm: HTMLElement = document.getElementById("seasons-average")!;


btnfilterByName.onclick = () => applyFilterByName();

renderSeriesInTable(dataSeries);

totalseasonsElm.innerHTML = `${getAverageSeasons(dataSeries)}`


function renderSeriesInTable(series: Serie[]): void {
  console.log('Desplegando series');
  series.forEach((serie) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${serie.id}</td>
                           <td>${serie.name}</td>
                           <td>${serie.channel}</td>
                           <td>${serie.seasons}</td>`;
    seriesTbody.appendChild(trElement);
  });
}
 

 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearSeriesInTable();
  let seriesFiltered: Serie[] = searchSerieByName(text, dataSeries);
  renderSeriesInTable(seriesFiltered);
}

function searchSerieByName(nameKey: string, series: Serie[]) {
  return nameKey === '' ? dataSeries : series.filter( c => 
    c.name.match(nameKey));
}


function getAverageSeasons(series: Serie[]): number {
  let totalSeasons: number = 0;
  let averageSeasons: number = 0;
  series.forEach((serie) => totalSeasons = totalSeasons + serie.seasons);
  averageSeasons = (totalSeasons/series.length);
  return averageSeasons;
}

function clearSeriesInTable() {
  while (seriesTbody.hasChildNodes()) {
    if (seriesTbody.firstChild != null) {
      seriesTbody.removeChild(seriesTbody.firstChild);
     
    }
  }
}