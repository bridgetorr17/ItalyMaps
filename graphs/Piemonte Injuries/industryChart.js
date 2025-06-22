async function drawIndustryChart(){
    let industryData;
    
    const industriesNames = {
        'A': 'Agriculture',
        'B': 'Mining',
        'C': 'Manufacturing',
        'D': 'Energy',
        'E': 'Water and Sewage',
        'F': 'Construction',
        'G': 'Automotive Mechanic',
        'H': 'Transporation',
        'I': 'Food Services',
        'J': 'Communications',
        'K': 'Financial Services',
        'L': 'Real Estate',
        'M': 'Technology',
        'N': 'Administrative Support',
        'O': 'Public Administration',
        'P': 'Education',
        'Q': 'Public Health and Social Work',
        'R': 'Arts and Entertainment',
        'S': 'Other',
        'T': 'Household',
        'U': 'Extraterritorial Orginizations',
    }
    
    try{
        const res = await fetch('../Preprocessing/Piemonte/industryData.json');
        industryData = await res.json();
    }
    catch(err){
        console.error('failed to load industry data: ', err)
    }

    //pie chart params
    const width = 200;
    const height = 200;
    const margin = 50;

    //legend params
    const legendRectSize = 5;
    const legendSpacing = 2;

    const radius = Math.min(width/2, height/2) / 2 - margin;

    const svg = d3.select("#industryChart")
        .attr("viewBox", `0 0 ${width} ${height/2}`)
        .append("g")
        .attr("transform", "translate(" + width / 4 + "," + height / 4 + ")");

    const pie = d3.pie()
        .value(d => d.value)

    const pieData = Object.entries(industryData["sortedIndustryNumsConsolidated"]).map(([key, value]) => ({
        key,
        value
    }));

    const values = pieData.map(d => d.value)

    const color = d3.scaleLinear()
        .domain([d3.min(values), d3.max(values)])
        .range(["#a6c6ff","#10439F"]);

    const data_ready = pie(pieData);

    svg.selectAll("path")
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', d3.arc()
            .innerRadius(40)
            .outerRadius(radius))
        .attr('fill', d => color(d.data.value))

    const legend = svg.append('g')
        .attr('transform', `translate(${-(width / 2)}, ${-(height / 2)})`);

    const sortedPieData = [...pieData].sort((a,b) => b.value - a.value);

    const legendItems = legend.selectAll('.legend-item')
        .data(sortedPieData)
        .enter()
        .append("g")
        .attr("class", "legend-item")
        .attr("transform", (d, i) => {
            console.log(i * (legendRectSize + legendSpacing));
            return `translate(${width/1.25}, ${ 50 + (i * (legendRectSize + legendSpacing))})`
        });

    // Color boxes
    legendItems.append("rect")
        .attr("width", legendRectSize)
        .attr("height", legendRectSize)
        .style("fill", d => {
            return color(d.value)
        })
        .style("stroke", "#fff");

    // Text labels
    legendItems.append("text")
        .attr("x", legendRectSize + 5)
        .attr("y", legendRectSize - 1)
        .text(d => {
            return industriesNames[d.key]
        })
        .style("font-size", "5px");
}

export {drawIndustryChart}