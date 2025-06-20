import { drawGenderChart } from './genderChart.js';
import { drawAgeChart } from './ageChart.js';
import { drawTimeChart } from './timeChart.js';
import { drawIndustryChart } from './industryChart.js';

async function injuriesDashboard(){
    await drawGenderChart();
    await drawAgeChart();
    await drawTimeChart();
    await drawIndustryChart();
}

injuriesDashboard();