let explicationSchema = "" +
    "L'élément de gauche est la page sur laquelle tous l'affichage est fait. On a également toute une partie codée en Javascript chargée de controller les éléments ajoutés sur la carte (les markers, les fenêtres pop-up, etc...). <br>" +
    "Afin de communiquer avec la base de données, nous avons créé un service RMI. Ce service est chargé de récupérer les données de la base de données et de les renvoyer à l'interface. <br>" +
    "Pour finir, nous avons un proxy qui s'occupe de récupérer les données des établissements d'enseignement supérieur et toutes les autres données bloquées<br>";

let fait = "" +
    "Dans cette SAE nous avons créé une base de données. Cette base a deux tables : l'une répertoriant les restaurants " +
    "de nancy, l'autre enregistrant des réservations pour chaque restaurant. " +
    "<br> Les données de cette base sont récupérées via un service RMI. Celui-ci renvoie à notre interface les données" +
    " afin qu'elle les affiches sur la carte. <br>" +
    " Ainsi, lorsqu'un clique sur un marker noir de la carte, le site nous affiche des informations concernant le restaurant " +
    "en question ainsi qu'un formulaire pour réserver une table chez eux." +
    "<br><br> Nous avons également implantés des markers oranges, sur la carte correspondant à des informations de circulation, " +
    "des markers rouges, pour situer les stations Vélib. Lorsqu'on clique dessus, on a dans une fenêtre pop-up les " +
    "informations relatives à cette station (comme le nombre de vélos disponibles, le nombre de place disponibles). " +
    "Pour finir, les markers bleus correspondent à des établissement d'enseignement suppérieur. <br>" +
    "Ces données sur les établissements sont récupérées à l'aide d'un proxy. Ce même proxy s'occupe de valider une" +
    "réservation et l'insère dans la base de données. " +
    "<br> Notre interface propose également d'ajouter un nouveau restaurant lorsqu'on clique sur un endroit non occupé " +
    "de la carte. Ce restaurant est ajouté dans la base de données. " +
    "<br> Pour finir, sous la carte se trouve la météo des huit prochaines heures à Nancy. Ces données sont récupérées " +
    "via l'api infoclimat."
;

let explicationVelib = "" +
    "Les markers rouges correspondent à des stations Vélib. Lorsqu'on clique dessus, on a dans une fenêtre pop-up les " +
    "informations relatives à cette station (comme le nombre de vélos disponibles, le nombre de places disponibles). " +
    "Ces données sont récupérées à l'aide d'une API provenant du gouvernement. <br>" +
    "On a pour cela plusieurs fonctions : <br>" +
    "La première fonction permet de récupérer les données de toutes les stations Vélib de Nancy. <br>" +
    "Une autre permet le formatage des données récupérées pour l'affichage sur la carte. <br>";

let explicationMeteo = "" +
    "Sous la carte se trouve la météo des huit prochaines heures à Nancy. Ces données sont récupérées " +
    "via l'api infoclimat. <br>" +
    "On a pour cela plusieurs fonctions : <br>" +
    "La première fonction permet de récupérer les données de la météo de Nancy (en selectionnant les données utiles) et de les formatter. <br>" +
    "Une autre va, à partir des données de la météo, sélectionner l'icone correspondant (Nuage, soleil, pluie, vent)." +
    "Bien que la selection de l'icone se fasse en fonction de ces données, il peut arriver que l'icone ne correponde pas parfaitement au temps dehors (Comme un icone de soleil en pleine nuit)<br>";

let explicationProxyBlocage = "" +
    "Le service proxy (blocage) est un service qui permet de faire des requêtes à des serveurs externes. <br>" +
    "Ce service permet de pouvoir contourner le problème de CORS (Cross-Origin Resource Sharing) qui empêche les requêtes " +
    "depuis un serveur vers un autre serveur. <br>" +
    "Le service de proxy est donc le moyen de contourner ce problème en faisant une requête directement sur le serveur qui a le protocole " +
    "CORS activé. <br>" +
    "Donc pour utiliser le proxy, il faut faire une requête sur le serveur mis en place, de façon assez simple : <br>" +
    "https://[HOST]/api/proxy?url=URL_DE_LA_REQUETE <br>" +
    "Le service proxy va donc faire la requête sur l'URL_DE_LA_REQUETE et renvoyer le résultat de la requête. <br>" +
    "Le service proxy est donc utilisé pour récupérer les établissements d'enseignement supérieur. <br>" +
    "Le retour de la requete est un fichier de format JSON. Qui est ensuite traité pour afficher les markers sur la carte. <br>";

let explicationProxyServeur = "" +
    "Le serveur HTTPS que l'on a mis en place est un serveur qui permet l'utilisation d'API que l'on a mis en place. <br>" +
    "Les API sont gérer par le serveur HTTPS et les services RMI pour les résultats. <br>" +
    " - Le service RMI des restaurants :" +
    "<ul>" +
        "<li> Permet de récupérer les restaurants de la base de données. </li>" +
        "<li> Permet d'ajouter un restaurant. </li>" +
        "<li> Permet de faire une réservation. </li>" +
    "</ul>" +
    " - Le service RMI de proxy :" +
    "<ul>" +
        "<li> Permet de faire une requête sur un serveur externe sans blocage CORS. </li>" +
        "<li> Permet de récupérer les établissements d'enseignement supérieur. </li>" +
    "</ul>" +
    "Ces services sont utils pour récupérer certaines données qui ne sont pas accessible depuis le client. <br>" +
    "Comme la base de données, ou les établissements d'enseignement supérieur. <br>";




export default {
    explicationSchema: explicationSchema,
    fait : fait,
    explicationVelib : explicationVelib,
    explicationMeteo : explicationMeteo,
    explicationProxyBlocage : explicationProxyBlocage,
    explicationProxyServeur : explicationProxyServeur
}