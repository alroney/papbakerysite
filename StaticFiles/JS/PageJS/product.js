let flavorList = []; //Declare flavorList outside the fetchCSV block
let ingredientList = []; //Declare ingredientList outside the fetchCSV block
let nutritionalFactsByFlavor = []; //Declare biscuit flavor nutritional facts list outside the fetchCSV block

//#region - Flavor & Ingredient CSV - read csv files and coordinate the data from them.
    //Function to parse CSV data into an object
    function parseCSV(csv, numLinesToHdr) {
        const endMarker = 'endOfSheet'; //This is used to prevent the attempt to continue on to another sheet in the same .csv file. This is the string value I manually set that would be compared with later on
        const rows = csv.split('\n'); //Create an array of rows from the spreadsheet
        const headers = rows[numLinesToHdr].split(','); //Create an array of headers
        const dataByHeader = {}; //Create an array to later store objects

        //Initialize empty arrays for each header
        headers.forEach(header => {
            dataByHeader[header.trim()] = [];
        });

        //Iterate over each line of the CSV (starting from numLinesToHdr)
        for (let i = numLinesToHdr + 1; i < rows.length; i++) {
            if (rows[i].trim() === endMarker) { //If the string 'endOfSheet' is reached in the current sheet for the .csv file, then stop looking
                break;
            }

            const currentRow = rows[i].split(',');
            if (currentRow.length !== headers.length) {
                continue;
            }

            //Add each value to the corresponding header array
            headers.forEach((header, index) => {
                const obj = { [header.trim()]: currentRow[index].trim() };
                dataByHeader[header.trim()].push(obj);
            });
        }

        return dataByHeader;
    }

    //Function to fetch CSV data synchronously using XMLHttpRequest
    function fetchCSV(path) {
        const request = new XMLHttpRequest();
        request.open('GET', path, false); //Make the request synchronous
        request.send();

        if (request.status !== 200) {
            console.error('Error fetching CSV: ', request.status);
            return '';
        }

        return request.responseText;
    }

    //Function to fetch and process CSV data
    function fetch_FlavorsIngredients_Data() {
        const data = fetchCSV('StaticFiles/CSV/flavor&ingredients.csv');
        const numLinesToHdr = 0; //Manually set the line at which the headers start on 0 = 1 on the spreadsheet
        const dataByHeader = parseCSV(data, numLinesToHdr); //Create an Array of Objects of the headers
        const ingredients = dataByHeader['Ingredients']; //Create an array of the ingredients
        const flavors = dataByHeader['Flavors']; //Create an array of hte flavors

        //Update the global arrays with the parsed data
        flavorList = flavors.map(flavorObj => flavorObj['Flavors']).filter(f=> f !== '');
        ingredientList = ingredients.map(ingObj => ingObj['Ingredients']).filter(f => f !== '');
    }

    //Call fetchData to fetch and process the data
    fetch_FlavorsIngredients_Data();

    function fetch_BFNF_Data() {
        const data = fetchCSV('StaticFiles/CSV/nutritional_facts.csv');
        const numLinesToHdr = 4; //Manually set the line at which the headers start on 4 = 5 on the spreadsheet
        const dataByHeader = parseCSV(data, numLinesToHdr);

        //Filter out header to only include flavors in flavorList
        const filteredData = {}; 
        
        Object.keys(dataByHeader).forEach(header => {
            if (flavorList.includes(header)) {
                filteredData[header] = dataByHeader[header];
            }
        });

        Object.keys(filteredData).forEach(flavor => {
            const facts = dataByHeader[flavor]; //Get the nutritional facts for the current flavor
            const nutritionalFacts = {
                servingSize: parseInt(facts[0][flavor]),
                servingPerContainer: 'Varies',
                calories: parseFloat(facts[1][flavor]),
                totalFat: parseFloat(facts[2][flavor]),
                satFat: parseFloat(facts[3][flavor]),
                polyUnSatFat: parseFloat(facts[4][flavor]),
                monoUnSatFat: parseFloat(facts[5][flavor]),
                transFat: parseFloat(facts[6][flavor]),
                cholesterol: parseFloat(facts[7][flavor]),
                sodium: parseFloat(facts[8][flavor]),
                totalCarbs: parseFloat(facts[9][flavor]),
                dietartyFiber: parseFloat(facts[10][flavor]),
                totalSugar: parseFloat(facts[11][flavor]),
                addedSugar: parseFloat(facts[12][flavor]),
                protein: parseFloat(facts[13][flavor]),
                calcium: parseFloat(facts[14][flavor]),
                potassium: parseFloat(facts[15][flavor]),
                iron: parseFloat(facts[16][flavor])
            }

            //Filter out empty values
            for (let key in nutritionalFacts) {
                if (nutritionalFacts[key] === '') {
                    delete nutritionalFacts[key];
                }
            }

            nutritionalFactsByFlavor[flavor] = nutritionalFacts;
        });
    }

    fetch_BFNF_Data();

    // console.log(nutritionalFactsByFlavor['applesauce']); //Debugging for values


//#endregion



//#region - NUTRITIONAL FACTS - Create the NF table and fill in the values based on each item.
    //Function: This will generate the nutrional facts table and the values that are based on the product assigned.
    function generateNutritionalFacts(servingSize, servingPerContainer, calories, totalFat, satFat, polyUnSatFat, monoUnSatFat, transFat, cholesterol, sodium, totalCarbs, dietaryFiber, totalSugar, addedSugar, protein, calcium, potassium, iron) {
        return `
            <section class="performance-facts">
                <header class="performance-facts__header">
                    <h1 class="performance-facts__title">Nutrition Facts</h1>
                    <p>Serving Size ${servingSize}g</p>
                    <p>Serving Per Container: ${servingPerContainer}</p>
                </header>
                <table class="performance-facts__table">
                    <thead>
                        <tr>
                        <th colspan="2" class="small-info">
                            Amount Per Serving
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>
                                <b>Calories</b>
                            </th>
                            <td>${calories}</td>
                        </tr>
                        <tr class="thick-row">
                            <td colspan="3" class="small-info">
                                <b></b>
                            </td>
                        </tr>
                        <tr>
                            <th colspan="2">
                                <b>Total Fat</b>
                                ${totalFat}g
                            </th>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <th>
                                Saturated Fat
                                ${satFat}g
                            </th>
                            <td>
                                <b></b>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <th>
                                Poly-unsaturated Fat
                                ${polyUnSatFat}g
                            </th>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <th>
                                Mono-unstaturated Fat
                                ${monoUnSatFat}g
                            </th>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td class="blank-cell">
                            </td>
                            <th>
                                Trans Fat
                                ${transFat}g
                            </th>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <th colspan="2">
                                <b>Cholesterol</b>
                                ${cholesterol}mg
                            </th>
                            <td></td>
                        </tr>
                        <tr>
                            <th colspan="2">
                                <b>Sodium</b>
                                ${sodium}g
                            </th>
                            <td></td>
                        </tr>
                        <tr>
                            <th colspan="3">
                                <b>Total Carbohydrates</b>
                                ${totalCarbs}g
                            </th>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td class="blank-cell">
                            </td>
                            <th colspan="2">
                                Dietary Fiber
                                ${dietaryFiber}g
                            </th>
                            <td></td>
                        </tr>
                        <tr>
                            <td class="blank-cell"></td>
                            <th colspan="2">
                                Total Sugars
                                ${totalSugar}g
                            </th>
                            <td></td>
                        </tr>
                        <tr>
                            <td class="blank-cell"></td>
                            <th colspan="2">
                                Includes ${addedSugar}g Added Sugars
                            </th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr class="thick-end">
                            <th colspan="2">
                                <b>Protein</b>
                                ${protein}g
                            </th>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

                <table class="performance-facts__table--grid">
                    <tbody>
                        <tr class="thin-end">
                        <td colspan="2">
                            Calcium
                            ${calcium}mg
                        </td>
                        <td>
                            Potassium
                            ${potassium}mg
                        </td>
                        <td>
                            Iron
                            ${iron}mg
                        </td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <!-- End Nutritional Facts-->
        `
    }

    for (let i = 0; i < flavorList.length; i++){
        const cFlav = flavorList[i]; //Set the current flavor
        const facts = nutritionalFactsByFlavor[cFlav] //Get all the nutritional facts for the current flavor 

        const cFlavBiscuitFacts = generateNutritionalFacts( //Assign the current flavor's nutritional facts to the function generateNutritionalFacts' parameters to then be properly handled
            facts.servingSize,
            facts.servingPerContainer,
            facts.calories,
            facts.totalFat,
            facts.satFat,
            facts.polyUnSatFat,
            facts.monoUnSatFat,
            facts.transFat,
            facts.cholesterol,
            facts.sodium,
            facts.totalCarbs,
            facts.dietartyFiber,
            facts.totalSugar,
            facts.addedSugar,
            facts.protein,
            facts.calcium,
            facts.potassium,
            facts.iron
        );



        const element = document.getElementById(`${cFlav}_biscuit_nfacts`);
        if (element) {
            element.innerHTML = cFlavBiscuitFacts;
        }
        else {
            console.error(`Element with ID ${cFlav}_biscuit_nfacts not found.`);
        }
    }
//#endregion

//#region - INNER BISCUIT CAROUSEL - Create the images and the captions for each item in the carousel
    const imagePath = "StaticFiles/img/product/dog/biscuits/";
    const carouselItems = [
        { src: "biscuit_sm.png", alt: "Small Biscuit", name: "Small Biscuit", price: "$0.35 Each" },
        { src: "biscuit_sm_long.png", alt: "Small Long Biscuit", name: "Small Long Biscuit", price: "$0.37 Each" },
        { src: "biscuit_lg.png", alt: "Large Biscuit", name: "Large Biscuit", price: "$0.45 Each" },
        { src: "biscuit_lg_long.png", alt: "Large Long Biscuit", name: "Large Long Biscuit", price: "$0.50 Each" }
    ];

    const carouselInner = document.getElementById('carouselInner');
    carouselItems.forEach((item, index) => {
        const active = index === 0 ? 'active' : '';
        carouselInner.innerHTML += `
            <div class="carousel-item ${active}">
                <img class="d-block mx-auto mb-5" src="${imagePath}${item.src}" alt="${item.alt}">
                <div class="carousel-caption d-block">
                    <h5>${item.name}</h5>
                    <p class="text-dark">Only ${item.price}!</p>
                </div>
            </div>`;
    });
//#endregion



