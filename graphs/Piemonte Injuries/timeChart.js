async function drawTimeChart(){
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
        }
    });

    calendar2025.paint({
        range: 3,
        domain: { type: 'month' },
        subDomain: {
            type: 'day',
        },
        date:{
            start: new Date('2025-01-01')
        }
    });
}

export { drawTimeChart }