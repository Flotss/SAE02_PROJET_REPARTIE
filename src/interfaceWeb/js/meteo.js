//récupérations et traitement des données météos
let url = 'https://www.infoclimat.fr/public-api/gfs/json?_ll=48.67103,6.15083&_auth=ARsDFFIsBCZRfFtsD3lSe1Q8ADUPeVRzBHgFZgtuAH1UMQNgUTNcPlU5VClSfVZkUn8AYVxmVW0Eb1I2WylSLgFgA25SNwRuUT1bPw83UnlUeAB9DzFUcwR4BWMLYwBhVCkDb1EzXCBVOFQoUmNWZlJnAH9cfFVsBGRSPVs1UjEBZwNkUjIEYVE6WyYPIFJjVGUAZg9mVD4EbwVhCzMAMFQzA2JRMlw5VThUKFJiVmtSZQBpXGtVbwRlUjVbKVIuARsDFFIsBCZRfFtsD3lSe1QyAD4PZA%3D%3D&_c=19f3aa7d766b6ba91191c8be71dd1ab2';
let listMeteo = [];



//8 prochaines données données
async function getDataTemp(){
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth();
    month++;
    month = month < 10 ? '0'+month : month;
    let day = date.getDay()
    day = day < 10 ? '0'+day : day;
    let currentHour = date.getHours(); // Récupère l'heure (de 0 à 23)
    currentHour = currentHour < 10 ? '0'+currentHour : currentHour;
    let currentMinute = date.getMinutes(); // Récupère les minutes (de 0 à 59)
    currentMinute = currentMinute < 10 ? '0'+currentMinute : currentMinute;
    let currentSecond = date.getSeconds();
    currentSecond = currentSecond < 10 ? '0'+currentSecond : currentSecond;


    let totalCurrentDate = year + '-' + month + '-' + day + ' ' + currentHour + ':' + currentMinute  + ':' + currentSecond;
    console.log('totalCurrentDate : ' + totalCurrentDate) ;
    let response = await fetch(url)
        .then( data => {
            getListTemp(data);
            }
        )
        .catch(error =>{
            console.log('erreur de récupération des données de api meteo');
        });


}

async function getListTemp(meteo){
    console.log(meteo);
    //console.log('meteo.temp.2m : ' + meteo.temperature.2m);


}


getDataTemp();