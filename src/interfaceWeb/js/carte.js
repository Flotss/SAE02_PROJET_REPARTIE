import restaurant from "./restaurant.js";
import uiReservation from "./uiReservation.js";
import {getBikeAvailability, getStationAvailability, getStationData} from "../../trafficInformations/VelostanNancy.js";

console.log('Hi map ! ');

const nancy = {
    lat: 48.6921,
    lng: 6.1844,
}
const zoomLevel = 12;

const GroupeMarkerResto = L.layerGroup([]);
const GroupeMarkerVlib = L.layerGroup([]);
const GroupeMarkerEtablissementEnsSup = L.layerGroup([]);

const iconVlib = L.icon({
    iconUrl: 'stylesheet/image/logoVelib.png',
    iconSize:     [40, 40], // size of the icon
    iconAnchor:   [20, 38], // point of the icon which will correspond to marker's location
    popupAnchor:  [1, -30] // point from which the popup should open relative to the iconAnchor
});

const iconResto = L.icon({
    iconUrl: 'stylesheet/image/logoResto.png',
    iconSize:     [40, 40], // size of the icon
    iconAnchor:   [20, 40], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -30] // point from which the popup should open relative to the iconAnchor

});

const SelecteurAffichage = {
    "Restaurants": GroupeMarkerResto,
    "Stations Vlib": GroupeMarkerVlib,
    "Etablissements enseignement supérieurs": GroupeMarkerEtablissementEnsSup
};


export async function init() {
    const map = L.map('map', {
        center: [nancy.lat, nancy.lng],
        zoom: zoomLevel,
        layers: [GroupeMarkerResto]
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);


    L.control.layers(null, SelecteurAffichage).addTo(map);

    let stations = await getStationData();

    for (const station of stations) {
        let stationData = station[1];
        let bikeAvailability = await getBikeAvailability(stationData.id);
        let stationAvailability = await getStationAvailability(stationData.id);
        addMarkerVlib(stationData.lat, stationData.lon, stationData.name, bikeAvailability, stationAvailability, stationData.address);
    }

    //A supprimé par la suite
    let lat = 48.7;
    let lng = 6.2;
    let nom = "La rivière";
    let adresse = "Dans Nancy";
    addMarkerResto("48.71, 6.2",1,"best Resto ever", "pas important");
    var markerResto1 = L.marker([lat, lng],{icon: iconResto});
    markerResto1.bindPopup(`<b>${nom}</b><br>${adresse}`);
    var markerVlib1 = L.marker([48.71, 6.21],{icon: iconVlib});
    var markerVlib2 = L.marker([48.7, 6.21],{icon: iconVlib});
    markerVlib2.bindPopup(`Test`);

    var markerEtablissementSup = L.marker([48.69, 6.21]);
    markerEtablissementSup.bindPopup(`Test`);

    GroupeMarkerResto.addLayer(markerResto1);
    GroupeMarkerVlib.addLayer(markerVlib1);
    GroupeMarkerVlib.addLayer(markerVlib2);
    GroupeMarkerEtablissementEnsSup.addLayer(markerEtablissementSup)
}

function addMarkerResto(gps, id, nom, adresse){
    console.log(gps);
    let coordonnes = gps.split(',');
    var marker = L.marker([coordonnes[0], coordonnes[1]],{icon: iconResto});
    marker.bindPopup(`<b>${nom}</b><br>${adresse}`);
    GroupeMarkerResto.addLayer(marker);
    marker.on("click", () => {
        let restoCourant = restaurant.resto(id, nom, adresse, gps);
        console.log(restoCourant);
        uiReservation.uiForm(restoCourant);
    });
}

function addMarkerVlib(lat, lng, nom, nbVeloDispo,nbPlaceParkingDispo , adresse){
    var marker = L.marker([lat,lng],{icon: iconVlib});
    marker.bindPopup(`<b>${nom}</b><br>${adresse}<br>Nombre vélo dispo: ${nbVeloDispo}<br>Nombre places parking dispo: ${nbPlaceParkingDispo}`).openPopup();
    GroupeMarkerVlib.addLayer(marker);
}

function addMarkerEtablissementEnsSup(lat, lng, nom, adresse){
    var marker = L.marker([lat,lng],{icon: iconVlib});
    marker.bindPopup(`<b>${nom}</b><br>${adresse}`).openPopup();
    GroupeMarkerVlib.addLayer(marker);
}

var JsonObject
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:8000/api/resto", true);
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        JsonObject = JSON.parse(xhr.response);
        console.log(JsonObject);
        for(let i = 0; i < JsonObject.restaurants.length; i++) {
            addMarkerResto(JsonObject.restaurants[i].GPS, JsonObject.restaurants[i].ID, JsonObject.restaurants[i].NOM, JsonObject.restaurants[i].ADRESSE);
        }
    } else {
        if (xhr.status !== 200)
            console.log("La requête a échoué. Code de réponse : " + xhr.status);
    }
};
xhr.send();
await init();


