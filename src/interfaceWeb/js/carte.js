import restaurant from "./restaurant.js";
import uiReservation from "./uiReservation.js";
import {getBikeAvailability, getStationAvailability, getStationData} from "../../trafficInformations/VelostanNancy.js";
import {getCirculationIncidents} from "../../trafficInformations/CirculationIncidents.js";

console.log('Hi map ! ');

const nancy = {
    lat: 48.6921,
    lng: 6.1844,
}
const zoomLevel = 12;

const GroupeMarkerResto = L.layerGroup([]);
const GroupeMarkerVlib = L.layerGroup([]);
const GroupeMarkerEtablissementEnsSup = L.layerGroup([]);
const GroupeMarkerIncidents = L.layerGroup([]);

const iconVlib = L.icon({
    iconUrl: 'stylesheet/image/logoVelib.png',
    iconSize: [40, 40], // size of the icon
    iconAnchor: [20, 38], // point of the icon which will correspond to marker's location
    popupAnchor: [1, -30] // point from which the popup should open relative to the iconAnchor
});

const iconEcole = L.icon({
    iconUrl: 'stylesheet/image/logoEcole.png',
    iconSize: [50, 50], // size of the icon
    iconAnchor: [24, 44], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -30] // point from which the popup should open relative to the iconAnchor
});

const iconResto = L.icon({
    iconUrl: 'stylesheet/image/logoResto.png',
    iconSize: [40, 40], // size of the icon
    iconAnchor: [20, 40], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -30] // point from which the popup should open relative to the iconAnchor
});

const iconIncident = L.icon({
    iconUrl: 'stylesheet/image/logoIncident.png',
    iconSize: [30, 30], // size of the icon
    iconAnchor: [14, 26], // point of the icon which will correspond to marker's location
    popupAnchor: [2, -17]
})

const SelecteurAffichage = {
    "Restaurants": GroupeMarkerResto,
    "Stations Vlib": GroupeMarkerVlib,
    "Etablissements enseignement supérieur": GroupeMarkerEtablissementEnsSup,
    "Incidents circulation": GroupeMarkerIncidents
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

    afficherRestaurants();

    await afficherStationsVelib();

    await afficherIncidents()

    afficherEtablissementsSup()
}

function addMarkerResto(gps, id, nom, adresse) {
    let coordonnes = gps.split(',');
    var marker = L.marker([coordonnes[0], coordonnes[1]], {icon: iconResto});
    marker.bindPopup(`<b>${nom}</b><br>${adresse}`);
    GroupeMarkerResto.addLayer(marker);
    let restoCourant = new restaurant.Resto(id, nom, adresse, gps);
    marker.on("click", () => {
        let restoCourant = new restaurant.Resto(id, nom, adresse, gps);
        console.log('resto courant : ' + restoCourant);
        uiReservation.uiForm(restoCourant);
    });
}

function addMarkerVlib(lat, lng, nom, nbVeloDispo, nbPlaceParkingDispo, adresse) {
    const marker = L.marker([lat, lng], {icon: iconVlib});
    marker.bindPopup(`<b>${nom}</b><br>${adresse}<br>Nombre vélo dispo: ${nbVeloDispo}<br>Nombre places parking dispo: ${nbPlaceParkingDispo}`).openPopup();
    GroupeMarkerVlib.addLayer(marker);
}

function addMarkerEtablissementEnsSup(lat, lng, nom, adresse) {
    const marker = L.marker([lat, lng], {icon: iconEcole});
    marker.bindPopup(`<b>${nom}</b><br>${adresse}`).openPopup();
    GroupeMarkerVlib.addLayer(marker);
}

function addMarkerIncidentsCirculation(lat, lng, descr, adresse, start, end, city, postcode) {
    let marker = L.marker([lat, lng], {icon: iconIncident});
    marker.bindPopup(`<b>${descr}</b><br>${adresse} ${postcode} ${city}<br>Début: ${start}<br>Fin: ${end}`).openPopup();
    GroupeMarkerIncidents.addLayer(marker);
}

function afficherRestaurants(){
    GroupeMarkerResto.clearLayers();

    let JsonObject;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost/api/restaurations", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            JsonObject = JSON.parse(xhr.response);
            for (let i = 0; i < JsonObject.restaurants.length; i++) {
                addMarkerResto(JsonObject.restaurants[i].GPS, JsonObject.restaurants[i].ID, JsonObject.restaurants[i].NOM, JsonObject.restaurants[i].ADRESSE);
            }
        } else {
            if (xhr.status !== 200)
                console.log("La requête a échoué. Code de réponse : " + xhr.status);
        }
    };
    xhr.send();
}

async function afficherStationsVelib(){
    GroupeMarkerVlib.clearLayers();

    let stations = await getStationData();

    for (const station of stations) {
        let stationData = station[1];
        let bikeAvailability = await getBikeAvailability(stationData.id);
        let stationAvailability = await getStationAvailability(stationData.id);
        addMarkerVlib(stationData.lat, stationData.lon, stationData.name, bikeAvailability, stationAvailability, stationData.address);
    }
}

async function afficherIncidents(){
    GroupeMarkerIncidents.clearLayers();

    let incidents = await getCirculationIncidents();
    for (const incident of incidents) {
        addMarkerIncidentsCirculation(incident.lat, incident.lon, incident.description, incident.location, incident.start, incident.end, incident.city, incident.postcode);
    }
}

function afficherEtablissementsSup(){
    //TODO
    GroupeMarkerEtablissementEnsSup.clearLayers();

    const markerEtablissementSup = L.marker([48.69, 6.21], {icon: iconEcole});
    markerEtablissementSup.bindPopup(`Test`);

    GroupeMarkerEtablissementEnsSup.addLayer(markerEtablissementSup);
}


await init();




