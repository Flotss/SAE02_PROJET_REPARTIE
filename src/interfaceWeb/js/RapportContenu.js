let explicationSchema = "" +
    "Notre site web est composé de deux parties : une partie front-end et une partie back-end. " +
    "La partie de gauche est en Javascript (Page web et appel vers les api des vélibs et des incidents de circulation). " +
    "La partie de droite est en Java (Base de données, appel vers l'api des établissements d'enseignement supérieur, gestion des réservations et ajout d'un nouveau restaurant). " +
    "<br>Il y a un serveur RMI dédié aux restaurants et aux réservations, et un autre servant de Proxy qui va aller chercher les données bloquées. ";

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

let explicationIncidents = "" +
    "Les markers oranges correspondent à des informations de circulation. <br>" +
    "Ces données sont récupérées à l'aide d'une API de la Région Est<br>" +
    "On a pour cela plusieurs fonctions : <br>" +
    "La première fonction permet de récupérer les données de tous les incidents de circulation de Nancy. <br>" +
    "Une autre permet le formatage des données récupérées pour l'affichage sur la carte. <br>" +
    "On retrouve les informations suivantes : <br>" +
    " - Le type d'incident <br>" +
    " - La date de l'incident <br>" +
    " - La localisation de l'incident <br>" +
    " - La description de l'incident <br>";


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

let explicationPourlancer = "" +
    "Pour lancer le service RMI Restaurant : <br>" +
    " - Se placer dans le dossier 'Restaurant' <br>" +
    " - Lancer la commande 'java -jar Proxy.jar port' <br>" +
    "<br>" +
    "Pour lancer le service RMI ProxyBlocage  : <br>" +
    " - Se placer dans le dossier 'ProxyBlocage' <br>" +
    " - Lancer la commande 'java -jar Proxy.jar port' <br>" +
    "<br>" +
    "Pour lancer le Service Central qui gère les autres services : <br>" +
    " - Se placer dans le dossier 'Serveur' <br>" +
    " - Lancer la commande 'java -jar Serveur.jar hostRestaurant portRestaurant hostProxy portProxy' <br>" +
    "<br>";


let lienGIT = "https://github.com/Flotss/SAE02_PROJET_REPARTIE"


export default {
    explicationSchema: explicationSchema,
    fait: fait,
    explicationVelib: explicationVelib,
    explicationMeteo: explicationMeteo,
    explicationIncidents: explicationIncidents,
    explicationProxyBlocage: explicationProxyBlocage,
    explicationProxyServeur: explicationProxyServeur,
    explicationPourlancer: explicationPourlancer,
    lienGIT: lienGIT
}