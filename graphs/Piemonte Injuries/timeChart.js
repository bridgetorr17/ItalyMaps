async function drawTimeChart(){
    let data2024 = await loadData(2024);
    let data2025 = await loadData(2025);

    console.log(data2025);

    const calendar2024 = new CalHeatmap();
    const calendar2025 = new CalHeatmap();

    calendar2024.paint({
        range: 3,
        domain: { type: 'month' },
        subDomain: {
            type: 'day',
        },
        date:{
            start: new Date('2024-01-01')
        },
        data: {
            source: data2024,
            x: 'date',
            y: 'value'
        },
        scale: {
            color: {
                scheme: 'BuPu',
                type: 'linear',
                domain: [0, 200]
            }
        }
    }, [
        [
            Legend, 
            {
                label: 'Injury Count',
                itemSelector: '#legend-container'
            }
        ],
        [
            Tooltip,
            {
                text: (timestamp, value) => {
                    const date = new Date(timestamp);
                    const formatted = date.toLocaleDateString('en-US');
                    return `${formatted}: ${value ?? 0} injuries`;
                }
            }
        ]
    ]
);

    calendar2025.paint({
        range: 3,
        domain: { type: 'month' },
        subDomain: {
            type: 'day',
        },
        date:{
            start: new Date('2025-01-01')
        },
        data: {
            source: data2025,
            x: 'date',
            y: 'value'
        },
        scale: {
          color: {
                scheme: 'BuPu',
                type: 'linear',
                domain: [0, 200]
            }
        }
    },
    [
        [
            Tooltip,
            {
                text: (timestamp, value) => {
                    const date = new Date(timestamp);
                    const formatted = date.toLocaleDateString('en-US');
                    return `${formatted}: ${value ?? 0} injuries`;
                }
            }
        ]
    ]
    );
}

//load data 
async function loadData(year){
    let dateData;
    try{
        const res = await fetch(`../Preprocessing/Piemonte/dateData${year}.json`);
        dateData = await res.json();
    }
    catch(err){
        console.error(`failed to load ${year} data: `, err)
    }
    return dateData;
}

export { drawTimeChart }