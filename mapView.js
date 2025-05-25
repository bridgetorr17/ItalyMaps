let userResize = 1;
let long = 45.5;
let lat = 12.5;
let width = 300;
let height = 400;

document.getElementById('zoomIn').addEventListener('click', _ => {
    userResize -= 0.1;
    updateViewBox();
});

document.getElementById('zoomOut').addEventListener('click', _ => {
    userResize += 0.1;
    updateViewBox();
});



export { svgMovement, width, height, long, lat};