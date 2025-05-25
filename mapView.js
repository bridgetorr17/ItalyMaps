let userResize = 1;
let long = 42.5;
let lat = 7.4;
let height = 600*0.75;
let width = 800*0.75;
let scale = 1450;

function svgMovement(svg, path, projection){
    function updateViewBox(){
        console.log(`scale: ${scale}`);

        projection.scale(scale);
        svg.selectAll('path').attr('d', path);
    }

    function moveCardinal(){
        console.log(`long: ${long}, lat: ${lat}`)
        projection.center([lat, long]);
        svg.selectAll('path').attr('d', path);
    }

    document.getElementById('zoomIn').addEventListener('click', _ => {
        scale *= 1.1;
        updateViewBox();
    });

    document.getElementById('zoomOut').addEventListener('click', _ => {
        scale *= 0.9;
        updateViewBox();
    });

    document.getElementById('west').addEventListener('click', _ => {
        lat -= 0.1;
        moveCardinal();
    });

    document.getElementById('east').addEventListener('click', _ => {
        lat += 0.1;
        moveCardinal();
    });

    document.getElementById('north').addEventListener('click', _ => {
        long += 0.1;
        moveCardinal();
    });

    document.getElementById('south').addEventListener('click', _ => {
        long -= 0.1;
        moveCardinal();
    });
}

export { svgMovement, scale, width, height, long, lat};