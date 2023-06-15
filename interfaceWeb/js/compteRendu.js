import { init } from "./carte.js";

let content = document.getElementById("content");

const title = (title) => {
    let h1 = document.createElement("h1");
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
    let p = document.createElement("p");
    p.setAttribute("id", id);
    p.setAttribute("class", "titleparagraph")
    p.innerHTML = title;
    section.appendChild(p);
    return p;
}



const displayRapport = () => {
    document.getElementById("commentRapcarte").value = "rapport";

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
    document.getElementById("commentRapcarte").value = "carte";

    content.innerHTML = "<div id='map'></div>";
    init();
}

const RapportOrCarte = () => {
    let value = document.getElementById("commentRapcarte").innerHTML;

    console.log(value);


    if (value === "rapport") {
        displayCarte();
    }else if (value === "carte") {
        displayRapport();
    }
}


document.getElementById("rapCarte").addEventListener("click", () => {
    RapportOrCarte();
});







