import { init } from "./carte.js";

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
    let h3 = document.createElement("h3");
    h3.setAttribute("id", id);
    h3.setAttribute("class", "titleparagraph")
    h3.innerHTML = title;
    section.appendChild(h3);
    return h3;
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

    titleParagraph("title1-1", section1, "Lorem ipsum dolor sit amet con");
    paragraph("p1", section1, "Lorem ipsum dolor sit amet con");

    titleParagraph("title1-2", section1, "Lorem ipsum dolor sit amet con");
    paragraph("p2", section2, "Lorem ipsum dolor sit amet con");

    titleParagraph("P", section1, "Lorem ipsum dolor sit amet con");
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

    console.log(value);

    if (value === "rapportNav") {
        displayRapport();
    }else if (value === "carteNav") {
        displayCarte();
    }
}


document.getElementById("rapCarte").addEventListener("click", () => {
    RapportOrCarte();
});







