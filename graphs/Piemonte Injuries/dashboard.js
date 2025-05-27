import { drawGenderChart } from './genderChart.js';

async function injuriesDashboard(){
    const csvdata = await d3.csv('/datasets/DatiConCadenzaMensileInfortuniPiemonte.csv');

    drawGenderChart(csvdata);
}

injuriesDashboard();