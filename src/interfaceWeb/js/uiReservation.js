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

    let html = `
            <h2>${restaurantt.nomResto}</h2>
    <p>${restaurantt.adresse}</p>

    <form id="reservationForm" onsubmit="submitForm(event, restaurantt)">
        <label for="nom">Nom :</label>
        <input type="text" id="nom" required><br>

            <label for="prenom">Prénom :</label>
            <input type="text" id="prenom" required><br>

                <label for="nbConvives">Nombre de convives :</label>
                <input type="number" id="nbConvives" required><br>

                    <label for="telephone">Téléphone :</label>
                    <input type="tel" id="telephone" required><br>

                        <button type="submit">Réserver</button>
    </form>`
;

document.querySelector('#formReservation').innerHTML = html;

}

export default {
    uiForm: uiForm,
}