async function drawAgeChart() {
    let ageData;
    try{
        const res = await fetch('../Preprocessing/Piemonte/ageData.json');
        ageData = await res.json();
        console.log(ageData)
    }
    catch(err){
        console.error('failed to load gender data: ', err)
    }

    const width = 600,
          height = 200;

    const svg = d3.select('#ageChart')
        .attr("viewBox", `0 0 ${width} ${height}`)

    //x axis - age ranges
    const x = d3.scaleBand()
                .domain(Object.keys(ageData))
                .range([10, width-20])

    let x_axis = d3.axisBottom(x);

    svg.append("g")
        .attr("transform", `translate(${30},${height-45})`)
        .call(x_axis)
        .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end")

    //y axis - number of accidents
    const y = d3.scaleLinear()
                .domain([0, Math.max(...Object.values(ageData))])
                .range([height-25, 25]);

    let y_axis = d3.axisLeft(y);

    svg.append("g")
        .attr("transform", `translate(${40}, ${-20})`)
        .call(y_axis);

    //bars
    Object.values(ageData).forEach( (element, index) => {
        let g = svg.append("g")
        let barWidth = 10;
        let ageRange = Object.keys(ageData)[index];
        let barx = x(ageRange)

        g.append("rect")
            .attr("x", barx)
            .attr("y", (y(element)))
            .attr("height", y(0) - y(element))
            .attr("width", barWidth)
            .attr("fill", "#60945a")
            .attr("x", barx + 45)
            .attr("transform", `translate(${0}, ${-20})`)

    })
}

export {drawAgeChart}