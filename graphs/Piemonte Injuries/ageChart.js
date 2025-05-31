async function drawAgeChart() {
    let ageData;
    try{
        const res = await fetch('../Preprocessing/Piemonte/ageData.json');
        ageData = await res.json();
        console.log(Object.keys(ageData))
    }
    catch(err){
        console.error('failed to load gender data: ', err)
    }
}

export {drawAgeChart}