import { dataSeries } from './dataSeries.js';
var seriesTbody = document.getElementById('series');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var totalseasonsElm = document.getElementById("seasons-average");
btnfilterByName.onclick = function () { return applyFilterByName(); };
renderSeriesInTable(dataSeries);
totalseasonsElm.innerHTML = "".concat(getAverageSeasons(dataSeries));
function renderSeriesInTable(series) {
    console.log('Desplegando series');
    series.forEach(function (serie) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>".concat(serie.id, "</td>\n                           <td>").concat(serie.name, "</td>\n                           <td>").concat(serie.channel, "</td>\n                           <td>").concat(serie.seasons, "</td>");
        seriesTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearSeriesInTable();
    var seriesFiltered = searchSerieByName(text, dataSeries);
    renderSeriesInTable(seriesFiltered);
}
function searchSerieByName(nameKey, series) {
    return nameKey === '' ? dataSeries : series.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function getAverageSeasons(series) {
    var totalSeasons = 0;
    var averageSeasons = 0;
    series.forEach(function (serie) { return totalSeasons = totalSeasons + serie.seasons; });
    averageSeasons = (totalSeasons / series.length);
    return averageSeasons;
}
function clearSeriesInTable() {
    while (seriesTbody.hasChildNodes()) {
        if (seriesTbody.firstChild != null) {
            seriesTbody.removeChild(seriesTbody.firstChild);
        }
    }
}
