let id;
let nom;
let adresse;
let gps;

const connection = mysql.createConnection({
    host: 'charlemagne.iutnc.univ-lorraine.fr',
    user: 'amirbeky1u',
    password: 'Nardos2002@',
    database: 'jdbc:oracle:thin:@charlemagne.iutnc.univ-lorraine.fr:1521:infodb'
});

function reserver(nom, prenom, nbConviv, telephone){
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