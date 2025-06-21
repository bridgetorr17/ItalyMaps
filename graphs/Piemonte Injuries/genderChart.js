async function drawGenderChart(){
    let genderData;
    try{
        const res = await fetch('../Preprocessing/Piemonte/genderData.json');
        genderData = await res.json();
        //console.log(genderData);
    }
    catch(err){
        console.error('failed to load gender data: ', err)
    }

    const width = 200;
    const height = 50;
    let xOffset = 0;
    let currentOffset = 0;

    const svg = d3.select("#genderChart")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .append("g")

    const color = d3.scaleOrdinal()
        .domain([genderData.males, genderData.females])
        .range(['#10439F', "#874CCC"]);

    const pieData = Object.entries(genderData).map(([key, value]) => ({
        key,
        value
    }));

    const total = d3.sum(pieData, d => d.value);

    svg.selectAll("rect")
        .data(pieData)
        .enter()
        .append('rect')
        .attr('x', d => {
            currentOffset = xOffset;
            xOffset += (d.value / total) * width;
            return currentOffset;
        })
        .attr("y", 0)
        .attr("width", d => (d.value / total) * width)
        .attr("height", height)
        .attr('fill', d => color(d.key))

    svg.selectAll("text")
        .data(pieData)
        .enter()
        .append("text")
        .text(d => {
            return d.key.toUpperCase()
        })
        .attr("x", d => {
            if(d.key === 'males') return 50;
            else return 150;
        })
        .attr("y", height / 2)  // vertically centered in the bar    
        .style("text-anchor", "middle")
        .style("font-size", "7.5px")
}

export {drawGenderChart}