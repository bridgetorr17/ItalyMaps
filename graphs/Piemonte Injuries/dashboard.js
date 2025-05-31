import { drawGenderChart } from './genderChart.js';
import { drawAgeChart } from './ageChart.js';

async function injuriesDashboard(){
    await drawGenderChart();
    await drawAgeChart();
}

injuriesDashboard();