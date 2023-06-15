console.log('Hi map ! ');

const nancy = {
        lat : 48.6921,
        lng : 6.1844,
    }
const zoomLevel = 12;

const Resto = L.layerGroup([]);
const Vlib = L.layerGroup([]);


export function init() {
    const map = L.map('map', {
        center: [nancy.lat, nancy.lng],
        zoom: zoomLevel,
        layers: [Resto]
    });

    L.tileLayer('https:tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http:www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const SelecteurAffichage = {
        "restaurants": Resto,
        "Vlib": Vlib
    };
    L.control.layers(null, SelecteurAffichage).addTo(map);

}

function addMarker(gps, id, nom, adresse){
    console.log(gps);
    let coordonnes = gps.split(',');
    var marker = L.marker([coordonnes[0], coordonnes[1]]);
    marker.bindPopup(`<b>${nom}</b><br>${adresse}`).openPopup();
    Resto.addLayer(marker);
    console.log("Added marker")
    marker.on("click", () => {
        /*let resto = restaurant(gps,id,nom,adresse);*/

    })
}

init();
var JsonObject
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:8000/votre-route", true);
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        JsonObject = JSON.parse(xhr.response);
        console.log(JsonObject);
        for(let i = 0; i < JsonObject.restaurants.length; i++) {
            addMarker(JsonObject.restaurants[i].GPS, JsonObject.restaurants[i].ID, JsonObject.restaurants[i].NOM, JsonObject.restaurants[i].ADRESSE);
        }
    } else {
        if (xhr.status !== 200)
            console.log("La requête a échoué. Code de réponse : " + xhr.status);
    }
};
xhr.send();

