function drawGenderChart(csvdata){

    fetch('../Preproccessing/Pieomonte/genderData.json')
        .then(res => res.json())
        .then(data => {
            console.log(data);
        });
}

export {drawGenderChart}