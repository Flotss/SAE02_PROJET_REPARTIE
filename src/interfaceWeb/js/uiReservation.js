import restaurant from "./restaurant.js";

function submitForm(event, restaurant) {
    event.preventDefault();

    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    const nbConvives = document.getElementById('nbConvives').value;
    const telephone = document.getElementById('telephone').value;

    console.log('newRes : ' + nom);
    console.log('newRes : ' + prenom);
    console.log('newRes : ' + nbConvives);
    console.log('newRes : ' + telephone);

    restaurant.reserver(nom, prenom, nbConvives, telephone);
}

function uiForm(restaurantt){

    console.log('restaurant name : ' + restaurantt.nom)

    let html = `
<div id="informationRestoForm">
  <h2>${restaurantt.nom}</h2>
   <p>${restaurantt.adresse}</p>
</div>
          
<form id="reservationForm" onsubmit="submitForm(event, restaurantt)">
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
        <button type="submit">Réserver</button>
</form>`
;

document.querySelector('#formReservation').innerHTML = html;

}

export default {
    uiForm: uiForm,
}