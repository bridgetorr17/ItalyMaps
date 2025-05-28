async function drawGenderChart(){
    let genderData;
    try{
        const res = await fetch('../Preprocessing/Pieomonte/genderData.json');
        genderData = await res.json();
        //console.log(genderData);
    }
    catch(err){
        console.error('failed to load gender data: ', err)
    }

    const width = 200;
    const height = 200;
    const margin = 30;

    const radius = Math.min(width, height) / 2 - margin;

    const svg = d3.select("#genderChart")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const color = d3.scaleOrdinal()
        .domain([genderData.males, genderData.females])
        .range(["#46acfa","#cf67d6"]);

    const pie = d3.pie()
        .value(d => d.value)

    const pieData = Object.entries(genderData).map(([key, value]) => ({
        key,
        value
    }));

    const data_ready = pie(pieData);

    const labelArc = d3.arc()
        .innerRadius(40)
        .outerRadius(radius);

    svg.selectAll("path")
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', d3.arc()
            .innerRadius(40)
            .outerRadius(radius))
        .attr('fill', function(d){ return(color(d.data.key)) })

    svg.selectAll("text")
        .data(data_ready)
        .enter()
        .append("text")
        .text(d => d.data.key.toUpperCase())
        .attr("transform", d => `translate(${labelArc.centroid(d)})`)
        .style("text-anchor", "inherit")
        .style("font-size", "10px")
}

export {drawGenderChart}