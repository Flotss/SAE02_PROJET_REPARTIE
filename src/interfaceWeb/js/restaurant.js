
class resto {
    constructor(id, nom, adresse, gps) {
        this.id = id;
        this.nom = nom;
        this.adresse = adresse;
        this.gps = gps; 
    }
}

function reserver(restaurant, nom, prenom, nbConviv, telephone){

}

export default{
    reserver: reserver,
    resto: resto,
}