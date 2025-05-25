let userResize = 1;
let long = 45.5;
let lat = 12.5;
document.getElementById('zoomIn').addEventListener('click', _ => {
    userResize -= 0.1;
    updateViewBox();
});

document.getElementById('zoomOut').addEventListener('click', _ => {
    userResize += 0.1;
    updateViewBox();
});

const width = 300;
const height = 400;

let svg = d3.select('svg')
    .attr('viewBox', `0 0 ${width*userResize} ${height*userResize}`);

const projection = d3.geoMercator()
    .center([lat, long])
    .scale(2500)
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

function updateViewBox() {
    svg.attr('viewBox', `0 0 ${userResize*width} ${userResize*height}`)
}