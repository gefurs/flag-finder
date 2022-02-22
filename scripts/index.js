const endPoint = "https://restcountries.com/v2";

const input = document.querySelector(".input");
const form = document.querySelector(".form");
const resultsContainer = document.querySelector("#resultsContainer");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearContainer();
    getFlags(input.value);

});

const clearContainer = () => {
    resultsContainer.innerHTML = "";
}

const getFlags = (name) => {
    fetch(`${endPoint}/all/`)
    .then(response => response.json())
    .then(data => {

        const results = [];
        data.filter(item => {
            const itemValue = item.name.toLowerCase();
            if (itemValue.includes(name)) {
                results.push(item);
            }
        });
        
        if (results == "") {
            window.location.reload();
            alert("Please, type the name of a country in English");
        } else {
            showResults(results);
        }    
        
    })
    .catch(error => console.log(error));
};


const showResults = (flags) => {
    
    flags.forEach(flag => {
    
        const image = document.createElement("img");
        image.setAttribute("class", "image");
        image.src = flag.flags.png;

        const name = document.createElement("h2");
        name.setAttribute("class", "name");
        name.textContent = flag.name;

        const seeMore = document.createElement("a");
        seeMore.textContent = "more demographic data...";
        seeMore.setAttribute("class", "seeMore");
        seeMore.setAttribute("name", flag.name);
        seeMore.addEventListener("click", () => {
            window.location.href = `./flag.html?name=${flag.name}`;
        });

        const itemInfo = document.createElement("div");
        itemInfo.setAttribute("class", "itemInfo");
        itemInfo.appendChild(image);
        itemInfo.appendChild(name);

        const itemLink = document.createElement("div");
        itemLink.setAttribute("class", "itemLink");
        itemLink.appendChild(seeMore);

        const itemContainer = document.createElement("div");
        itemContainer.setAttribute("class", "item-container");
        itemContainer.appendChild(itemInfo);
        itemContainer.appendChild(itemLink);

        const container = document.createElement("div");
        container.setAttribute("class", "container");
        container.appendChild(itemContainer);
        
        resultsContainer.appendChild(container);
    });
};

