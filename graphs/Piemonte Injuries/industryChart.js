async function drawIndustryChart(){
    let industryData;
    const industries = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", 
                    "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "ND"]
    try{
        const res = await fetch('../Preprocessing/Piemonte/industryData.json');
        industryData = await res.json();
    }
    catch(err){
        console.error('failed to load industry data: ', err)
    }

    const width = 200;
    const height = 200;
    const margin = 30;

    const radius = Math.min(width/2, height/2) / 2 - margin;

    const svg = d3.select("#industryChart")
        .attr("viewBox", `0 0 ${width} ${height}`)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const pie = d3.pie()
        .value(d => d.value)

    const pieData = Object.entries(industryData).map(([key, value]) => ({
        key,
        value
    }));

    const values = pieData.map(d => d.value)

    const color = d3.scaleLinear()
        .domain([d3.min(values), d3.max(values)])
        .range(["#2dc0fa","#040ec9"]);

    const data_ready = pie(pieData);

    svg.selectAll("path")
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', d3.arc()
            .innerRadius(40)
            .outerRadius(radius))
        .attr('fill', d => color(d.data.value))
}

export {drawIndustryChart}