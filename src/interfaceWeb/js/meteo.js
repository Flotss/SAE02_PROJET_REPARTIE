//récupérations et traitement des données météos
let url = 'https://www.infoclimat.fr/public-api/gfs/json?_ll=48.67103,6.15083&_auth=ARsDFFIsBCZRfFtsD3lSe1Q8ADUPeVRzBHgFZgtuAH1UMQNgUTNcPlU5VClSfVZkUn8AYVxmVW0Eb1I2WylSLgFgA25SNwRuUT1bPw83UnlUeAB9DzFUcwR4BWMLYwBhVCkDb1EzXCBVOFQoUmNWZlJnAH9cfFVsBGRSPVs1UjEBZwNkUjIEYVE6WyYPIFJjVGUAZg9mVD4EbwVhCzMAMFQzA2JRMlw5VThUKFJiVmtSZQBpXGtVbwRlUjVbKVIuARsDFFIsBCZRfFtsD3lSe1QyAD4PZA%3D%3D&_c=19f3aa7d766b6ba91191c8be71dd1ab2';
let listMeteo = [];
let dateCourante = {
};


//8 prochaines données données
async function getDataTemp(){
    const date = new Date();
    dateCourante.year = date.getFullYear();
    dateCourante.month = date.getMonth();
    dateCourante.month++;
    dateCourante.month = dateCourante.month < 10 ? '0'+dateCourante.month : dateCourante.month;
    dateCourante.day = date.getDate();
    dateCourante.day = dateCourante.day < 10 ? '0'+dateCourante.day : dateCourante.day;
    dateCourante.hour = date.getHours(); // Récupère l'heure (de 0 à 23)
    dateCourante.hour = dateCourante.hour < 10 ? '0'+dateCourante.hour : dateCourante.hour;
    dateCourante.minute = date.getMinutes(); // Récupère les minutes (de 0 à 59)
    dateCourante.minute = dateCourante.minute < 10 ? '0'+dateCourante.minute : dateCourante.minute;
    dateCourante.second = date.getSeconds();
    dateCourante.second = dateCourante.second < 10 ? '0'+dateCourante.second : dateCourante.second;


    dateCourante.totalCurrentDate = dateCourante.year + '-' + dateCourante.month + '-' + dateCourante.day + ' ' +
        dateCourante.hour + ':' + dateCourante.minute  + ':' + dateCourante.second;
    console.log('totalCurrentDate : ' + dateCourante.totalCurrentDate) ;
    let response = await fetch(url)
        .then( data => {
            getListTemp( data.json());
            }
        )
        .catch(error =>{
            console.log('erreur de récupération des données de api meteo');
        });


}

async function getListTemp(data){
    let meteo = await data;
    console.log(meteo);
    let currentDate = new Date(dateCourante.totalCurrentDate);
    console.log(currentDate);
    for(let elem in meteo){
        let elemDate = new Date(elem);
        if(!isNaN(elemDate)){
            let comparaison = elemDate.getTime()<currentDate.getTime();

            if(!comparaison){
                if(listMeteo.length<8){
                    console.log(elem);
                    let objetElem = {};
                    //temperature
                    objetElem.temperature = meteo[elem].temperature["2m"]-272.15;
                    console.log(objetElem.temperature);
                    // pluie
                    objetElem.pluie = meteo[elem].pluie;
                    // vent moyen
                    objetElem.vent = meteo[elem].vent_moyen;
                    // nébulosité totale
                    objetElem.nebulosite = meteo[elem].nebulosite.totale;
                    listMeteo.push(objetElem);
                }

            }
        }
    }
}


getDataTemp();