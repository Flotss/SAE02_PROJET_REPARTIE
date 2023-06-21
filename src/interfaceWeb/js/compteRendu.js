import {init} from "./carte.js";
import rapportContenu from "./RapportContenu.js";

let content = document.getElementById("content");

const title = (title) => {
    let h1 = document.createElement("h1");
    h1.id = "title";
    h1.innerHTML = title;
    content.appendChild(h1);
    return h1;
}

const container = (id) => {
    let div = document.createElement("div");
    div.setAttribute("class", "container");
    content.appendChild(div);
    return div;
}

const section = (id, container) => {
    let section = document.createElement("section");
    section.setAttribute("id", id);
    section.setAttribute("class", "section");
    container.appendChild(section);
    return section;
}

const paragraph = (id, section, text) => {
    let p = document.createElement("p");
    p.setAttribute("id", id);
    p.setAttribute("class", "paragraph")
    p.innerHTML = text;
    section.appendChild(p);
    return p;
}

const titleParagraph = (id, section, title) => {
    let h2 = document.createElement("h2");
    h2.setAttribute("id", id);
    h2.setAttribute("class", "titleparagraph")
    h2.innerHTML = title;
    section.appendChild(h2);
    return h2;
}

const image = (id, section, src) => {
    let div = document.createElement("div");
    div.setAttribute("id", id);
    let img = document.createElement("img");
    img.setAttribute("class", "image");
    img.src = src;
    div.appendChild(img);
    section.appendChild(div);
    return img;
}

const link = (id, section, href) => {
    let a = document.createElement("a");
    a.setAttribute("id", id);
    a.setAttribute("class", "link");
    a.innerHTML = href;
    a.href = href;
    section.appendChild(a);
    return a;
}


const displayRapport = () => {
    let rapCarte = document.getElementById("rapCarte");
    rapCarte.classList.remove("rapportNav");
    rapCarte.classList.add("carteNav");

    // Changement de l'image
    let img = rapCarte.getElementsByTagName("img")[0];
    img.src = "stylesheet/image/map-pin.svg";

    content.innerHTML = "";
    title("Compte rendu");
    let containerD = container("container");
    let section1 = section("section1", containerD);
    let section2 = section("section2", containerD);

    titleParagraph("title", section1, "Schéma de l'architecture");
    image("img-architecture", section1, "stylesheet/image/schemaArchitecture.png");
    paragraph("p1", section1, rapportContenu.explicationSchema);

    titleParagraph("title", section1, "Ce qui a été fait");
    paragraph("p1", section1, rapportContenu.fait);

    titleParagraph("title", section1, "Météo");
    paragraph("p1", section1, rapportContenu.explicationMeteo);

    titleParagraph("title", section1, "Vélib");
    paragraph("p1", section1, rapportContenu.explicationVelib);

    titleParagraph("title", section1, "Incidents de circulation");
    paragraph("p1", section1, rapportContenu.explicationIncidents);

    titleParagraph("title", section2, "Serveur HTTPS");
    paragraph("p1", section2, rapportContenu.explicationProxyServeur);

    titleParagraph("title", section2, "Service proxy bloquant");
    paragraph("p1", section2, rapportContenu.explicationProxyBlocage);

    titleParagraph("title", section2, "Comment lancer le projet");
    paragraph("p1", section2, rapportContenu.explicationPourlancer);


    titleParagraph("title", section2, "LIEN GIT");
    link("link", section2, "https://github.com/Flotss/SAE02_PROJET_REPARTIE.git");
}

const displayCarte = () => {
    let rapCarte = document.getElementById("rapCarte");
    rapCarte.classList.remove("carteNav");
    rapCarte.classList.add("rapportNav");

    // Changement de l'image
    let img = rapCarte.getElementsByTagName("img")[0];
    img.src = "stylesheet/image/file-text.svg";

    content.innerHTML = `
            <div id="affichageMap">
                <div id="map"></div>
                <div id="formReservation"></div>
            </div>`
    init();
}

const RapportOrCarte = () => {
    let value = document.getElementById("rapCarte").classList.value;

    if (value === "rapportNav") {
        displayRapport();
    } else if (value === "carteNav") {
        displayCarte();
    }
}


document.getElementById("rapCarte").addEventListener("click", () => {
    RapportOrCarte();
});






