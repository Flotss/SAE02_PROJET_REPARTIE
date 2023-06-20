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


export default {
    fait : fait,
}