import { svgMovement, scale, width, height, long, lat} from './mapView.js';

let svg = d3.select('svg')
    .attr('viewBox', `0 0 ${width} ${height}`);

const projection = d3.geoMercator()
    .center([lat, long])
    .scale(scale)
    .translate([width/2, height/2]);

const path = d3.geoPath().projection(projection);

d3.json('/limits_IT_regions.geojson')
    .then(geojson => {
        svg.selectAll("path")
            .data(geojson.features)
            .enter()
            .append("path")
            .attr("d", path);
    });

svgMovement(svg, path, projection);