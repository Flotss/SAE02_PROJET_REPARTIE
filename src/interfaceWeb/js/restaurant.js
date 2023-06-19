class Resto {
    constructor(id, nom, adresse, gps) {
        this.id = id;
        this.nom = nom;
        this.adresse = adresse;
        this.gps = gps;
    }

    reserver(nom, prenom, nbConviv, telephone) {
        const xhr2 = new XMLHttpRequest();
        xhr2.open("POST", "http://localhost:8000/api/reservation", true);
        xhr2.send(this.id + "," + nom + "," + prenom + "," + nbConviv + "," + telephone);
        xhr2.onreadystatechange = () => {
            if (xhr2.readyState === 4 && xhr2.status === 200) {
                let JsonObject = JSON.parse(xhr2.response);
                let formulaire = document.getElementsByClassName("formReservation");
                formulaire[0].innerHTML = JsonObject.message;
                setTimeout(() => {
                    formulaire[0].remove();
                }, "3000");
            }
        }

    }
}

export default {
    Resto: Resto,
}