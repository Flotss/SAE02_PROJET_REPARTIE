
function uiMeteo(listeMeteo){
    let node = document.createElement("div");
    document.querySelector("#content").appendChild(node);
    node.setAttribute("id", "meteo");

    const toStringMap = element => `
<div id="${element.date}">
        <p>${element.date}</p>
        <div class="flexRow">
            <img src="${element.icon}"/>
            <div id="temperature">${element.temperature}</div>
        </div>
</div>
    `;
    let tabString = listeMeteo.map(toStringMap);
    console.log(tabString);
    const concatReduce = (acc, element) => acc + element;
    let result = tabString.reduce(concatReduce, "");
    console.log(result);

    node.innerHTML = result;

}

export default {
    uiMeteo: uiMeteo,
}