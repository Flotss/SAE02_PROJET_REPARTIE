console.log('Hi map ! ');


function init(){
    const nancy = {
        lat : 48.6921,
        lng : 6.1844,
    }
    const zoomLevel = 12;
    console.log(zoomLevel);

    const map = L.map('map').setView([nancy.lat, nancy.lng], zoomLevel);

    const mainLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.marker([51.5, -0.09]).addTo(map);

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8000/votre-route", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = xhr.responseText;
            console.log("Réponse du serveur : " + response);
        } else {
            console.log("La requête a échoué. Code de réponse : " + xhr.status);
        }
    };
    xhr.send();

}
init();
