export function generateForm(e){
    return "<form id='formNewRestaurant' method='post'>"
        + "<div class='form-group'>"
        + "<label for='nom'>Nom du restaurant</label>"
        + "<input type='text' class='form-control' id='nom' name='nom' placeholder='Nom du restaurant'>"
        + "</div>"
        + "<div class='form-group'>"
        + "<label for='adresse'>Adresse du restaurant</label>"
        + "<input type='text' class='form-control' id='adresse' name='adresse' placeholder='Adresse du restaurant'>"
        + "</div>"
        + "<div class='form-group'>"
        + "<label for='lat'>Latitude</label>"
        + "<input type='text' class='form-control' value=" + e.latlng.lat + " id='lat' name='lat' placeholder='Latitude' disabled>"
        + "</div>"
        + "<div class='form-group'>"
        + "<label for='lon'>Longitude</label>"
        + "<input type='text' class='form-control' value=" + e.latlng.lng + " id='lon' name='lon' placeholder='Longitude' disabled>"
        + "</div>"
        + "<button type='submit' class='btn btn-primary'>Ajouter</button>"
        + "</form>";
}

export function enregisterNouveauRestaurant(){

    const nom = document.getElementById('nom').value;
    const adr = document.getElementById('adresse').value;
    const lat = document.getElementById('lat').value;
    const long = document.getElementById('lon').value;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8000/api/enregistreur", true);
    xhr.send(nom + "," + adr + "," + lat + "," + long);
}