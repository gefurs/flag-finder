const endPoint = "https://restcountries.com/v2";

const resultsContainer = document.querySelector("#resultsContainer");

const getURL = new URLSearchParams(window.location.search);
let flagName = getURL.get("name");

console.log(flagName);

fetch(`${endPoint}/name/${flagName}`)
.then(response => response.json())
.then(data => {

    showFlag(data);
    createPDF(data);

})
.catch(error => console.log(error));


const showFlag = (data) => {

    resultsContainer.innerHTML = `
        <div class="flag-container">
            <div class="flag-title">
                <h1>${data[0].name}</h1>
            </div>
            <div class="flag-info-container">
                <div>
                    <img class="image" src="${data[0].flags.png}">
                </div> 
                <div class="flag-info-details">
                    <div>
                        <h2 class="info-details-title">Demographic data:</h2>
                    </div>               
                    <div>
                        <div class="flag-info-item">
                            <i class="fa-solid fa-location-dot"></i>
                            <h3>Capital: ${data[0].capital}</h3>
                        </div>
                        <div class="flag-info-item">
                            <i class="fa-solid fa-earth-americas"></i>
                            <h3>Region: ${data[0].subregion}</h3>
                        </div>
                        <div class="flag-info-item">
                            <i class="fa-solid fa-comments"></i>
                            <h3>Language: ${data[0].languages[0].name}</h3>
                        </div>
                        <div class="flag-info-item">
                            <i class="fa-solid fa-user-group"></i>
                            <h3>Population: ${data[0].population}</h3>
                        </div>
                        <div class="flag-info-item">
                            <i class="fa-solid fa-money-bill-1-wave"></i>
                            <h3>Currency: ${data[0].currencies[0].name}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="links">
            <div>
                <a class="download-link">Download data sheet</a>
                <a id="back" href="javascript:history.back();">Find more flags  </a>
            </div>
        </div>
    `;
};


const createPDF = (data) => {

    const downloadLink = document.querySelector(".download-link");

    downloadLink.addEventListener("click", () => {
        const elementToConvert = document.querySelector(".flag-container");
        html2pdf()
        .set({
            margin: 1,
            filename: `${data[0].alpha3Code}_demographic_data.pdf`,
            image: {
                type: "png",
                quality: 0.98
            },
            html2canvas: {
                dpi: 300,
                scale: 3,
                letterRendering: true,
                useCORS: true
            },
            jsPDF: {
                unit: "in",
                format: "a4",
                orientation: "portrait"
            }
        })
        .from(elementToConvert)
        .save()
        .catch(error => console.log(error))
        .then(() => {
            console.log("Ready");
        });
    }); 
}