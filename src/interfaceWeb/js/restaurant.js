import connection from "./connectionbd.js";
class resto {
    constructor(id, nom, adresse, gps) {
        this.id = id;
        this.nom = nom;
        this.adresse = adresse;
        this.gps = gps; 
    }
}

function reserver(restaurant, nom, prenom, nbConviv, telephone){
    connection.connect((error) => {
        if (error) {
            console.error('Erreur de connexion à la base de données :', error);
            return;
        }
        console.log('Connecté à la base de données !');
    });
    const newRes = { idrestaurant: id, age: 30 };

    connection.query(
        'INSERT INTO RESERVATION SET ?',
        newRecord,
        (error, results) => {
        if (error) {
            console.error('Erreur lors de l\'insertion des données :', error);
            return;
        }
        console.log('Données insérées avec succès !');
    });
}

export default{
    reserver: reserver,
    resto: resto,
}