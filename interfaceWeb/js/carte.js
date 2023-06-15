console.log('Hi map ! ');
const nancy = {
    lat : 48.6921,
    lng : 6.1844,
}
const zoomLevel = 12;


const map = L.map('map').setView([nancy.lat, nancy.lng], zoomLevel);

function init(){
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    let lat = 48.7;
    let lng = 6.2;
    let nom = "La rivière";
    let adresse = "Dans Nancy";

    var marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(`<b>${nom}</b><br>${adresse}`);

}

function addMarker(lat, lng, nom, adresse){
    var marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(`<b>${nom}</b><br>${adresse}`).openPopup();
}
init();


export { init };
