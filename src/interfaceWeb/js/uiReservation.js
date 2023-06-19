let resto


let markers = [];
let markerCourant = null;

function submitForm() {
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const nbConvives = document.getElementById('nbConvives').value;
    const telephone = document.getElementById('telephone').value;

    resto.reserver(nom, prenom, nbConvives, telephone);
}

function uiForm(restaurantt, marker){
    markerCourant = marker;
    resto = restaurantt;
    let node = document.createElement("div");
    document.querySelector("#affichageMap").appendChild(node);
    //node.setAttribute("id", "formReservation");
    node.classList.add("formReservation");

    let html = `
        <div id="informationRestoForm">
          <h2>${restaurantt.nom}</h2>
           <p>${restaurantt.adresse}</p>
        </div>
                  
        <form id="reservationForm" >
            
            <h3>Réserver une table : </h3>
            <div id="formulaireNom">
                <label for="nom">Nom</label>
                <input type="text" id="nom" required><br>
            </div>
            <div id="formulairePrenom">
                 <label for="prenom">Prénom</label>
                 <input type="text" id="prenom" required><br>
            </div>
            <div id="formulaireNbConv">
                 <label for="nbConvives">Nombre de convives</label>
                 <input type="number" id="nbConvives" required><br>
            </div>
            <div id="formulaireTelephone">
                 <label for="telephone">Téléphone</label>
                 <input type="tel" id="telephone" required><br>
            </div>
                <button type="button" id="submit">Réserver</button>
        </form>`;

node.innerHTML = html;
    setTimeout(function() {
        node.classList.add("show");
    }, 10);

    document.addEventListener("click", function(event) {
        const isClickedInsideNode = node.contains(event.target);
        const isClickedOnMarker = markers.includes(markerCourant);
        if (!isClickedInsideNode && !isClickedOnMarker) {
            markerCourant = null;
            node.classList.remove("show");
            markers.pop(markerCourant);
            setTimeout(function() {
                node.remove();
            }, 500); // Supprime la division après 500 millisecondes (0,5 seconde)
            if(isClickedOnMarker){
               uiForm(restaurantt, marker);
            }

        }
    });

    node.getElementsByTagName("button")[0].addEventListener("click", submitForm);

}

export default {
    uiForm: uiForm,
    markers: markers,
}