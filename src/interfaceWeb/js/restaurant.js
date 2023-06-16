
class Resto {
    constructor(id, nom, adresse, gps) {
        this.id = id;
        this.nom = nom;
        this.adresse = adresse;
        this.gps = gps;
    }

    reserver(nom, prenom, nbConviv, telephone) {
        const xhr2 = new XMLHttpRequest();
        xhr2.open("POST", "http://localhost/api/reservation", true);
        xhr2.send(this.id + "," + nom + "," + prenom + "," + nbConviv + "," + telephone);
    }
}

export default{
    Resto: Resto,
}