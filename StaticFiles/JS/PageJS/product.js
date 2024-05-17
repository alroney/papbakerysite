let flavorList = []; //Declare flavorList outside the fetchCSV block
let ingredientList = []; //Declare ingredientList outside the fetchCSV block
let nutritionalFactsByFlavor = []; //Declare biscuit flavor nutritional facts list outside the fetchCSV block
let productCategories = ['biscuit', 'trainingTreat']; //Declare the array of product categories for global usage
let productDescription = []; //Decare the array which will hold the description of each individual product. This will be a 2-dimensional array. Ex. ['applesauce biscuit': 'Its description'] , ['applesauce trainingTreat' : 'Its description']

//#region - FLAVOR & INGREDIENT CSV - read csv files and coordinate the data from them.
    //#region - GRAB AND READ - Get the csv file and read it
        //Function to parse CSV data into an object
        function parseCSV(csv, numLinesToHdr, productColumn = null, descriptionColumn = null) {
            const endMarker = 'endOfSheet'; //This is used to prevent the attempt to continue on to another sheet in the same .csv file. This is the string value I manually set that would be compared with later on
            const rows = csv.replace(/\r/g, '').split('\n'); //Remove \r characters and split into rows
            const headers = rows[numLinesToHdr].split(','); //Create an array of headers
            const dataByHeader = {}; //Create an array to later store objects
            const productToDescriptionMap = {}; //Create object to map products to descriptions
            let endReached = false; //Flag to indicate if endMarker has been reached

            //Initialize empty arrays for each header
            headers.forEach(header => {
                dataByHeader[header.trim()] = [];
            });

            //Check if the productColumn/descriptionColumn parameter is provided
            const productIndex = productColumn ? headers.indexOf(productColumn) : null; //If it is, find the index of the productColumn in the headers array, else set productIndex to null
            const descriptionIndex = descriptionColumn ? headers.indexOf(descriptionColumn) : null;

            //Iterate over each line of the CSV (starting from numLinesToHdr)
            for (let i = numLinesToHdr + 1; i < rows.length; i++) {
                //Stop processing completely if the endMarker was previously reached
                if (endReached) { 
                    break;
                }

                //Skip empty rows
                if (rows[i].trim === '') {
                    continue;
                }

                const currentRow = rows[i].split(',');
                if (currentRow.length !== headers.length) {
                    continue; //Skip rows that do not match header length
                }
                //Add each value to the corresponding header array
                headers.forEach((header, index) => {

                    if (currentRow[index] === endMarker) { //Stop further processing for this row
                        endReached = true;
                        return;
                    }
                    if (!currentRow[index]) { //Skip if currentRow[index] is undefined or empty OR if currentRow[index] is equal to 'endOfSheet'
                        return;
                    }

                    const value = currentRow[index].trim();
                    dataByHeader[header.trim()].push(value);

                    //Map products to description if columns are provided
                    if (productIndex !== null && descriptionIndex !== null && index === productIndex) {  
                        const descriptionValue = currentRow[descriptionIndex] ? currentRow[descriptionIndex].trim() : ''; //Check if the current row has a value at the dscriptionIndex
                        productToDescriptionMap[value] = descriptionValue;
                    }
                });
            }

            return {
                dataByHeader, productToDescriptionMap
            };
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
    //#endregion

    //Function: fetch and process the flavors and ingredients used from the .csv file
    function fetch_FlavorsIngredients_Data() {
        const data = fetchCSV('StaticFiles/CSV/flavor&ingredients.csv');
        const numLinesToHdr = 0; //Manually set the line at which the headers start on 0 = 1 on the spreadsheet
        const {dataByHeader} = parseCSV(data, numLinesToHdr); //Create an Array of Objects of the headers
        const ingredients = dataByHeader['Ingredients']; //Create an array of the ingredients
        const flavors = dataByHeader['Flavors']; //Create an array of hte flavors
        
        //Update the global arrays with the parsed data
        flavorList = flavors.filter(f=> f !== '');
        ingredientList = ingredients.filter(f => f !== '');
    }
    fetch_FlavorsIngredients_Data();

    //Function: fetch the nutritional facts from the .csv file and assign to values for later use
    function fetch_BFNF_Data() {
        const data = fetchCSV('StaticFiles/CSV/nutritional_facts.csv');
        const numLinesToHdr = 0; //Manually set the line at which the headers start on 0 = 1 on the spreadsheet
        const {dataByHeader} = parseCSV(data, numLinesToHdr);

        //Filter out header to only include flavors in flavorList
        const filteredData = {}; 
        
        Object.keys(dataByHeader).forEach(header => {
            if (flavorList.includes(header)) {
                filteredData[header] = dataByHeader[header];
            }
        });

        Object.keys(filteredData).forEach(flavor => {
            const facts = filteredData[flavor]; //Get the nutritional facts for the current flavor
            const nutritionalFacts = {
                servingSize: parseInt(facts[0]),
                servingPerContainer: 'Varies',
                calories: parseFloat(facts[1]),
                totalFat: parseFloat(facts[2]),
                satFat: parseFloat(facts[3]),
                polyUnSatFat: parseFloat(facts[4]),
                monoUnSatFat: parseFloat(facts[5]),
                transFat: parseFloat(facts[6]),
                cholesterol: parseFloat(facts[7]),
                sodium: parseFloat(facts[8]),
                totalCarbs: parseFloat(facts[9]),
                dietartyFiber: parseFloat(facts[10]),
                totalSugar: parseFloat(facts[11]),
                addedSugar: parseFloat(facts[12]),
                protein: parseFloat(facts[13]),
                vA: parseFloat(facts[14]),
                vB: parseFloat(facts[15]),
                vC: parseFloat(facts[16]),
                vD: parseFloat(facts[17]),
                vE: parseFloat(facts[18]),
                vK: parseFloat(facts[19]),
                calcium: parseFloat(facts[20]),
                potassium: parseFloat(facts[21]),
                iron: parseFloat(facts[22])
            }

            //Filter out empty values
            for (let key in nutritionalFacts) {
                if (nutritionalFacts[key] === '') { //If the value is empty
                    delete nutritionalFacts[key]; //Remove the empty value
                }
            }
            nutritionalFactsByFlavor[flavor] = nutritionalFacts;
        });
    }
    fetch_BFNF_Data();

    //Function: fetch the product description .csv file and assign it
    function fetch_pDesc_Data() {
        const data = fetchCSV('StaticFiles/CSV/product_desc.csv');
        const numLinesToHdr = 0; //Set the header line index
        const productColumn = 'Product'; //Define the product column header
        const descriptionColumn = 'Short Description'; //Define the description column header
        //Parse the CSV data with the specified header line and column headers for product and description
        const {productToDescriptionMap} = parseCSV(data, numLinesToHdr, productColumn, descriptionColumn);
        
        //Update the global productDescription array with the parsed data
        productDescription = Object.entries(productToDescriptionMap).map(([product, description]) => {
            // console.log(`${product}: ${description}`);
            return {product: product.trim(), description: description.trim()};
        });
    }
    fetch_pDesc_Data();

//#endregion

//#region - OFFCANVAS - Create the offcanvases for the products
    //Function: This will create the offcanvas section for the type of product (productCat) and its flavor (flvr) that is given
    function generateOffCanvas(flvr, productCat) {
        return `
            <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvas_${flvr}_${productCat}" aria-labelledby="offcanvas_${flvr}_${productCat}_label">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvas_${flvr}_${productCat}_label">${cleanStr(flvr)} ${cleanStr(productCat)}</h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <div class="container-fluid">
                        <!-- Nutritional Facts -->
                        <div id="${flvr}_${productCat}_nfacts"></div>
                        <!-- End Nutritional Facts-->
                        <section class="ingredients">
                            <h2>Ingredients</h2>
                        </section>
                    </div>
                </div>
            </div>
        `
    }

    //Assign values to the OffCanvas function for each flavor, and product category
    for (let i = 0; i < productCategories.length; i++) {
        const cProductCat = productCategories[i]; //Set the current product category to the value of productCat at the location of i
        if (cProductCat == 'trainingTreat') { //Training treat does not have flvrs right now, so just continue on
            continue;
        }
        for (let j = 0; j < flavorList.length; j++) {
            const cFlav = flavorList[j]; //Set the current flavor for the product category to the name value of flavorList at location j
            const cOffCanvas = generateOffCanvas(cFlav, cProductCat);

            const element = document.getElementById('pet_offCanvas');
            
            if(element) {
                element.innerHTML += cOffCanvas;
            } 
            else {
                console.error(`Element with ID 'pet_offCanvas' not found!`);
            }
        }
    }
    
//#endregion

//#region - NUTRITIONAL FACTS - Create the NF table and fill in the values based on each item.
    //Function: This will generate the nutrition facts table and the values that are based on the product assigned.
    function generateNutritionFacts(servingSize, servingPerContainer, calories, totalFat, satFat, polyUnSatFat, monoUnSatFat, transFat, cholesterol, sodium, totalCarbs, dietaryFiber, totalSugar, addedSugar, protein, vA, vB, vC, vD, vE, vK, calcium, potassium, iron) {
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
        
        const cFlavBiscuitFacts = generateNutritionFacts( //Assign the current flavor's nutritional facts to the function generateNutritionalFacts' parameters to then be properly handled
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
            facts.vA,
            facts.vB,
            facts.vC,
            facts.vD,
            facts.vE,
            facts.vK,
            facts.calcium,
            facts.potassium,
            facts.iron
        );



        const element = document.getElementById(`${cFlav}_biscuit_nfacts`);
        if (element) {
            element.innerHTML = cFlavBiscuitFacts;
        }
        else {
            console.error(`Element with ID ${cFlav}_biscuit_nfacts not found!`);
        }
    }
//#endregion

//#region - PRODUCT CARDS - Creat the cards where for the products
    //Function: Create the layout of the card
    function generateProductCards(flvr, pCat, desc) {
        return `
        <div class="col mb-3">
            <div class="card h-100">
                <div class="card-header"><h5>${cleanStr(flvr)} ${cleanStr(pCat)}</h5></div>
                <div class="card-body">
                    <p>${desc}</p>
                </div>
                <div class="card-footer">
                    
                    <a class="btn btn-primary card-button" href=""  data-bs-toggle="offcanvas" data-bs-target="#offcanvas_${flvr}_${pCat}"  aria-controls="offcanvas_${flvr}_${pCat}">More Info</a>
                </div>
            </div>
        </div>
        `
    }

    //Function: get the description for a specific product
    function getProductDescription(pName) {
        const pDesc = productDescription.find(item => item.product === pName); //Match the product name to given pName then assign its corresponding description
        return pDesc ? pDesc.description : console.warn(`pDesc is ${pDesc} for the product ${pName}! Check spelling of product name OR description may not be there.`); //If pDesc is not undefined then return its value's description, else warn issue in console
    }

    //Assign values to the generateProductCards function for each flavor, and product category
    for (let i = 0; i < productCategories.length; i++) {
        const cProductCat = productCategories[i]; //Set the current product category to the value of productCat at the location of i
        for (let j = 0; j < flavorList.length; j++) {
            const cFlav = flavorList[j]; //Set the current flavor for the product category to the name value of flavorList at location j
            const cPDesc = getProductDescription(`${cFlav} ${cProductCat}`);
            // console.log(cPDesc)
            const cPCard = generateProductCards(cFlav, cProductCat, cPDesc);

            const element = document.getElementById(`${cProductCat}_cards`);
            if(element) {
                element.innerHTML += cPCard;
            } 
            else {
                console.error(`Element with ID '${cProductCat}_cards' not found!`);
            }
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
                <img class="" src="${imagePath}${item.src}" alt="${item.alt}">
                <div class="carousel-caption">
                    <h5>${item.name}</h5>
                    <p class="text-dark">Only ${item.price}!</p>
                </div>
            </div>`;
    });
//#endregion

//#region - HELPER FUNCTIONS - Functions made to help with general stuff
    //Function: This will replace underscores with a space
    function replaceUnderscores(string) {
        return string.replace(/_/g, ' ');
    }

    //Function: This will capitalize individual words in a given string (phrase)
    function capEachWord(phrase) {
        return phrase
            .split(' ') //Split the phrase into an array of words
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) //Capitalize each word
            .join(' '); //Join the words back into a single string
    }

    //Function: This will separate words from camel case string
    function separateCamelCase(string) {
        return string.replace(/([a-z])([A-Z])/g, '$1 $2');
    }

    //Function: Combine all the string cleaning functions into one.
    function cleanStr(string) {
        let str = '';
        str = separateCamelCase(string);
        str = replaceUnderscores(str);
        return capEachWord(str);
    }
//#endregion

