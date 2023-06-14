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

}
init();
