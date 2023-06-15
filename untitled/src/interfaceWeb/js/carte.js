console.log('Hi map ! ');
const nancy = {
    lat : 48.6921,
    lng : 6.1844,
}
const zoomLevel = 12;


const map = L.map('map').setView([nancy.lat, nancy.lng], zoomLevel);


export function init(){
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    let lat = 48.7;
    let lng = 6.2;
    let nom = "La rivière";
    let adresse = "Dans Nancy";

    var markerResto1 = L.marker([lat, lng]).addTo(map);
    markerResto1.bindPopup(`<b>${nom}</b><br>${adresse}`);
    markerResto1.addEventListener("bubblingMouseEvents", () => console.log("test"));
    var markerResto2 = L.marker([48.71, lng] ).addTo(map);

    var markerVlib1 = L.marker([48.71, 6.21]).addTo(map);
    var markerVlib2 = L.marker([48.7, 6.21]).addTo(map);

    var Resto = L.layerGroup([markerResto1,markerResto2])
    var Vlib = L.layerGroup([markerVlib1,markerVlib2])


    // var xhr = new XMLHttpRequest();
    // xhr.open("GET", "http://localhost:8000/votre-route", true);
    // xhr.onreadystatechange = function() {
    //     if (xhr.readyState === 4 && xhr.status === 200) {
    //         var response = xhr.responseText;
    //         console.log("Réponse du serveur : " + response);
    //     } else {
    //         console.log("La requête a échoué. Code de réponse : " + xhr.status);
    //     }
    // };
    // xhr.send();

}

function addMarker(lat, lng, nom, adresse){
    var marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(`<b>${nom}</b><br>${adresse}`).openPopup();
}
init();
