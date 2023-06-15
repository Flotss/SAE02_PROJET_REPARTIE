let id;
let nomResto;
let adresse;
let gps;

const connection = mysql.createConnection({
    host: 'charlemagne.iutnc.univ-lorraine.fr',
    user: 'amirbeky1u',
    password: 'Nardos2002@',
    database: 'jdbc:oracle:thin:@charlemagne.iutnc.univ-lorraine.fr:1521:infodb'
});




function reserver(nomRes, prenomPres, nbConviv, telephone){
    connection.connect((error) => {
        if (error) {
            console.error('Erreur de connexion à la base de données :', error);
            return;
        }
        console.log('Connecté à la base de données !');
    });
    let newRes = { idrestaurant: id, nom: nomRes, prenom: prenomRes, nbconvives: nbConviv, telephone: telephone };

    connection.query(
        'INSERT INTO RESERVATION SET ?',
        newRes,
        (error, results) => {
        if (error) {
            console.error('Erreur lors de l\'insertion des données :', error);
            return;
        }
        console.log('Données insérées avec succès !');

    });
}

export default {
    id: id,
    nomResto: nomResto,
    adresse: adresse,
    gps: gps,
    reserver: reserver,
}