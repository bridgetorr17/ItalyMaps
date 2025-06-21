async function drawAgeChart() {
    let ageData;
    try{
        const res = await fetch('../Preprocessing/Piemonte/ageData.json');
        ageData = await res.json();
    }
    catch(err){
        console.error('failed to load gender data: ', err)
    }

    const width = 150,
          height = 150;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };

    const svg = d3.select('#ageChart')
        .attr("viewBox", `0 0 ${width} ${height}`);

    const ageRanges = Object.keys(ageData);
    const values = Object.values(ageData);

    //y axis - age ranges
    const y = d3.scaleBand()
                .domain(ageRanges)
                .range([margin.top, height - margin.bottom])
                .padding(0.1);

    let yAxis = d3.axisLeft(y);

    const yAxisGroup = svg.append("g")
        .attr("transform", `translate(${margin.left},${0})`)
        .call(yAxis);

    yAxisGroup.selectAll("text")
        .style("text-anchor", "end")
        .style("font-size", "3.5px")

    yAxisGroup.selectAll("path, line")
        .style("stroke-width", "0.5px")


    //x axis - number of accidents
    const x = d3.scaleLinear()
                .domain([0, d3.max(values)])
                .range([margin.left, width - margin.right]);

    let xAxis = d3.axisBottom(x);

    const xAxisGroup = svg.append("g")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(xAxis);

    xAxisGroup.selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-65)")
        .style("font-size", "3.5px")
        .attr('dx', '-1.75em')
        .attr('dy', '1.75em')

    xAxisGroup.selectAll("path, line")
        .style("stroke-width", "0.5px")

    //bars
    svg.selectAll('rect')
        .data(ageRanges)
        .enter()
        .append('rect')
        .attr('y', d => y(d))
        .attr('x', margin.left)
        .attr('height', 4)
        .attr('width', d => x(ageData[d]) - margin.left)
        .attr('fill', '#874CCC');
}

export {drawAgeChart}

