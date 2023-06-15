import restaurant from "./restaurant.js";
import uiReservation from "./uiReservation.js";

console.log('Hi map ! ');

const nancy = {
    lat: 48.6921,
    lng: 6.1844,
}
const zoomLevel = 12;

const GroupeMarkerResto = L.layerGroup([]);
const GroupeMarkerVlib = L.layerGroup([]);


export function init() {
    const map = L.map('map', {
        center: [nancy.lat, nancy.lng],
        zoom: zoomLevel,
        layers: [GroupeMarkerResto]
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const SelecteurAffichage = {
        "Restaurants": GroupeMarkerResto,
        "Stations Vlib": GroupeMarkerVlib
    };
    L.control.layers(null, SelecteurAffichage).addTo(map);


    //A supprimé par la suite
    let lat = 48.7;
    let lng = 6.2;
    let nom = "La rivière";
    let adresse = "Dans Nancy";
    var markerResto1 = L.marker([lat, lng]);
    markerResto1.bindPopup(`<b>${nom}</b><br>${adresse}`);
    var markerResto2 = L.marker([48.71, lng] );
    markerResto2.on("click",() => console.log("test"));
    var markerVlib1 = L.marker([48.71, 6.21]);
    var markerVlib2 = L.marker([48.7, 6.21]);
    GroupeMarkerResto.addLayer(markerResto1);
    GroupeMarkerResto.addLayer(markerResto2);
    GroupeMarkerVlib.addLayer(markerVlib1);
    GroupeMarkerVlib.addLayer(markerVlib2);
}

function addMarkerResto(gps, id, nom, adresse){
    console.log(gps);
    let coordonnes = gps.split(',');
    var marker = L.marker([coordonnes[0], coordonnes[1]]);
    marker.bindPopup(`<b>${nom}</b><br>${adresse}`).openPopup();
    GroupeMarkerResto.addLayer(marker);
    marker.on("click", () => {
        let restoCourant = restaurant.resto(id, nom, adresse, gpos);
        console.log(restoCourant);
        uiReservation.uiForm(restoCourant);
    });
}

function addMarkerVlib(lat, lng, nom, nbVeloDispo,nbPlaceParkingDispo , adresse){
    var marker = L.marker([lat,lng]);
    marker.bindPopup(`<b>${nom}</b><br>${adresse}<br>Nombre vélo dispo: ${nbVeloDispo}<br>Nombre places parking dispo: ${nbPlaceParkingDispo}`).openPopup();
    GroupeMarkerVlib.addLayer(marker);
}

// var JsonObject
// var xhr = new XMLHttpRequest();
// xhr.open("GET", "http://localhost:8000/votre-route", true);
// xhr.onreadystatechange = function() {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//         JsonObject = JSON.parse(xhr.response);
//         console.log(JsonObject);
//         for(let i = 0; i < JsonObject.restaurants.length; i++) {
//             addMarkerResto(JsonObject.restaurants[i].GPS, JsonObject.restaurants[i].ID, JsonObject.restaurants[i].NOM, JsonObject.restaurants[i].ADRESSE);
//         }
//     } else {
//         if (xhr.status !== 200)
//             console.log("La requête a échoué. Code de réponse : " + xhr.status);
//     }
// };
// xhr.send();
init();


