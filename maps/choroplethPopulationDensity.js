import { svgMovement, scale, width, height, long, lat} from './mapView.js';

async function choropleth(){
    let svg = d3.select('#italyPopulationMap')
        .attr('viewBox', `0 0 ${width} ${height}`);

    const projection = d3.geoMercator()
        .center([lat, long])
        .scale(scale)
        .translate([width/2, height/2]);

    const path = d3.geoPath().projection(projection);

    const geojson = await d3.json('/datasets/limits_IT_regions.geojson');
    const csvData = await d3.csv('/datasets/ita_reg_ann_data.csv');

    const densityMap = new Map();
    csvData.forEach(region => {
        densityMap.set(region.den_reg, region.dens_ab);
    });

    geojson.features.forEach(feature => {
        feature.properties.density = densityMap.get(feature.properties.reg_name) || 0;
    });

    const densities = geojson.features.map(f => f.properties.density);
    const colorScale = d3.scaleLinear()
        .domain([d3.min(densities), d3.max(densities)])
        .range(["#205fc7","#346dc9"])


    svg.selectAll("path")
        .data(geojson.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("stroke", "#000000")
        .attr("fill", d => colorScale(d.properties.density));

    svgMovement(svg, path, projection);
}

choropleth();