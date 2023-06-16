import Restaurant from "./restaurant.js";

function submitForm(resto) {
    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const nbConvives = document.getElementById('nbConvives').value;
    const telephone = document.getElementById('telephone').value;

    resto.reserver(nom, prenom, nbConvives, telephone);
}

function uiForm(restaurantt){

    let node = document.createElement("div");
    document.querySelector("#affichageMap").appendChild(node);
    //node.setAttribute("id", "formReservation");
    node.classList.add("formReservation");

    console.log('restaurant name : ' + restaurantt.nom)

    let html = `
<div id="informationRestoForm">
  <h2>${restaurantt.nom}</h2>
   <p>${restaurantt.adresse}</p>
</div>
          
<form id="reservationForm">
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
        <button type="submit" onclick="${submitForm(restaurantt)}">Réserver</button>
</form>`
;

node.innerHTML = html;
    setTimeout(function() {
        node.classList.add("show");
    }, 10);

}

export default {
    uiForm: uiForm,
}