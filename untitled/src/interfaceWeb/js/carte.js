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

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const SelecteurAffichage = {
        "restaurants": Resto,
        "Vlib": Vlib
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

    Resto.addLayer(markerResto1);
    Resto.addLayer(markerResto2);
    Vlib.addLayer(markerVlib1);
    Vlib.addLayer(markerVlib2);
}

function addMarker(gps, id, nom, adresse){
    let coordonnes = gps.splice(",");
    var marker = L.marker([coordonnes[0], coordonnes[1]]);
    marker.bindPopup(`<b>${nom}</b><br>${adresse}`).openPopup();
    Resto.addLayer(marker);
    marker.on("click", () => /*{let resto = restaurant(gps,id,nom,adresse);}*/)
}

init();


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
