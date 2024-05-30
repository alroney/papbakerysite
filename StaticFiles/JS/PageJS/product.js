let flavorList = []; //Declare flavorList outside the fetchCSV block
let nutritionalFactsByFlavor = []; //Declare biscuit flavor nutritional facts list outside the fetchCSV block
let productCategories = ['biscuit', 'training treat']; //Declare the array of product categories for global usage
let productInfo = [];



//#region - CSV - read csv files and coordinate the data from them.
    //#region - GRAB AND READ - Get the csv file and read it
        //Function to parse CSV data into an object
        function parseCSV(csv, hdrRow, productIdColumn, flavorColumn, categoryColumn, descriptionColumn, ingredientColumn, pricePerBatchColumn, subtypeColumn, subtypeValColumn) {
            const endMarker = 'endOfSheet'; //This is used to prevent the attempt to continue on to another sheet in the same .csv file. This is the string value I manually set that would be compared with later on
            const rows = csv.replace(/\r/g, '').split('\n'); //Remove \r characters and split into rows
            const headers = rows[hdrRow].split(','); //Create an array of headers
            const dataByHeader = {}; //Create an object to store arrays for headers
            const productInfoMap = {};
            let endReached = false; //Flag to indicate if endMarker has been reached

            //Initialize empty arrays for each header
            headers.forEach(header => { dataByHeader[header.trim()] = [] });

            const indices = {
                productIdIndex: headers.indexOf(productIdColumn),
                flavorIndex: headers.indexOf(flavorColumn),
                categoryIndex: headers.indexOf(categoryColumn),
                descriptionIndex: headers.indexOf(descriptionColumn),
                ingredientIndex: headers.indexOf(ingredientColumn),
                pricePerBatchIndex: headers.indexOf(pricePerBatchColumn),
                subtypeIndex: headers.indexOf(subtypeColumn),
                subtypeValIndex: headers.indexOf(subtypeValColumn)
            };



            //Iterate over each line of the CSV (starting from hdrRow + 1)
            for (let i = hdrRow + 1; i < rows.length; i++) {
                if (endReached || rows[i].trim() === '') continue;

                const currentRow = rows[i].split(',');
                if (currentRow.length !== headers.length) continue;

                headers.forEach((header, index) => {
                    let value = currentRow[index].trim();

                    if (value === '') return; //Skip empty lines
                    if( value === endMarker) { //Skip an set endMarker signal to true
                        endReached = true;
                        return;
                    }

                    
                    dataByHeader[header].push(value);
                    if (index === indices.productIdIndex) {
                        let productId = value;
                        //Create an object with all relevant data for each product
                        productInfoMap[productId] = {
                            flavor: currentRow[indices.flavorIndex]?.trim() || '',
                            category: currentRow[indices.categoryIndex]?.trim() || '',
                            description: currentRow[indices.descriptionIndex]?.trim() || '',
                            ingredients: currentRow[indices.ingredientIndex]?.trim() || '',
                            pricePerBatch: currentRow[indices.pricePerBatchIndex]?.trim() || '',
                            subtypes: currentRow[indices.subtypeIndex]?.trim() || '',
                            subtypeValues: currentRow[indices.subtypeValIndex]?.trim() || ''
                        };
                    }
                });

            }
            return { dataByHeader, productInfoMap};
        }

        //Function to fetch CSV data synchronously using XMLHttpRequest
        async function fetchCSV(path) {
            try {
                const response = await fetch(path);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                return response.text();
            }
            catch (error) {
                console.error('Error fetching CSV: ', error);
                return '';
            }
        }
    //#endregion

    //Function: fetch and process the flavors and ingredients used from the .csv file
    async function fetch_Flavors_Data() {
        try {
            const data = await fetchCSV('/StaticFiles/CSV/flavors.csv');
            const hdrRow = 0; //Manually set the line at which the headers start on 0 = 1 on the spreadsheet
            const {dataByHeader} = parseCSV(data, hdrRow); //Create an Array of Objects of the headers
            const flavors = dataByHeader['Flavors']; //Create an array of the flavors
            //Update the global arrays with the parsed data
            flavorList = flavors.filter(f => f !== '');
        }
        catch (error) {
            console.error('', error);
        }
    }

    //Function: fetch the nutritional facts from the .csv file and assign to values for later use
    async function fetchNutritionalFactsData() {
        try {
            const data = await fetchCSV('/StaticFiles/CSV/nutritional_facts.csv');
            const hdrRow = 0; //Manually set the line at which the headers start on 0 = 1 on the spreadsheet
            const {dataByHeader} = parseCSV(data, hdrRow);

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
                    dietaryFiber: parseFloat(facts[10]),
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
        catch (error) {
            console.error('Error fetching nutritional facts: ', error);
        }
    }

    //Function: fetch the product description .csv file and assign it
    async function fetchProductInfo() {
        const data = await fetchCSV('/StaticFiles/CSV/product_info.csv');
        const hdrRow = 0; //Set the header line index
        //Parse the CSV data with the specified header line and column headers for product and description
        const {productInfoMap} = parseCSV(data, hdrRow, 'Product Id', 'Flavor', 'Category', 'Short Description', 'Ingredients', 'Price Per Batch', 'Subtypes', 'Subtype Values');

        //Put objects into productInfo and assign each objects values from productInfoMap
        productInfo = Object.entries(productInfoMap).map(([productId, details]) => ({
            //'details' holds the properties of each product mapped by productId
            //structure => productInfo_VariableName: (details.[productInfoMap_VariableName] || '').trim(),
            id: productId.trim(),
            flavor: details.flavor.trim(),
            category: details.category.trim(),
            shortDescription: (details.description || '').trim(),
            ingredients: (details.ingredients || '').trim(),
            pricePerBatch: (details.pricePerBatch || '').trim(),
            subtypes: (details.subtypes || '').trim(),
            subtypeValues: (details.subtypeValues || '').trim()
        }));

    }
//#endregion



//#region - OFFCANVAS - Create the offcanvases for the products
    //Function: this will create the offcanvas section for the type of product (productCat) and its flavor (flvr) that is given
    function generateOffCanvas(pName, ingredients) {
        let pN = toHTMLFormat(pName);
        let ingr = '';
        let ingredientsList = ingredients.split(' + '); //Create an array by spliting the string of the ingredients from the ' + ' 
        let dropdown = displayProductSubtypeDropdown(pName);
        
        //Create a list item(<li>) element for each ingredient in the array
        ingredientsList.forEach(iL => {
            ingr += `<li>${cleanStr(iL)}</li>`; //Put each array item in a separate list item (li) element 
        })

        return `
            <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvas_${pN}" aria-labelledby="offcanvas_${pN}_label">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvas_${pN}_label">${pName}</h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <div class="container-fluid">

                        <div class="productSubtypeDropdown mb-4 mx-auto d-block" id="${pN}_dropdown_container">${dropdown}</div>
                        <!-- Nutritional Facts -->
                        <div id="${pN}_nfacts"></div>
                        <!-- End Nutritional Facts-->
                        <section class="ingredients">
                            <h2>Ingredients</h2>
                            <ul>
                                ${ingr}
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        `
    }


    //Function: assign values to the OffCanvas function for each product 
    function renderOffCanvases() {
        productInfo.forEach(p => {
            const pName = `${p.flavor} ${p.category}`;
            const cPIngr = getProduct(pName).ingredients; //Validate the current product and assign the array of ingredients to ingrForCFlav
            const cOffCanvas = generateOffCanvas(pName, cPIngr); //Give the current offCanvas element the name and ingredients

            const element = document.getElementById('pet_offCanvas');            
            if(element) {
                element.innerHTML += cOffCanvas;
            } 
            else {
                console.error(`Element with ID 'pet_offCanvas' not found!`);
            }
        })
    }



    //#region - PRODUCT DROPDOWN - Create the dropdowns for each product with an offcanvas. It is used to select what size, shape, etc of the product

        function displayProductSubtypeDropdown(pName) {
            const pN = toHTMLFormat(pName);
            let cP = getProduct(pName); //Current product
            
            let subtypes = cP.subtypes.split(' + ');
            let subtypeValues = cP.subtypeValues.split(' + ');
            let label = '';
            
            if(cP.category === 'Training Treat') label = 'Shape';
            if(cP.category === 'Biscuit') label = 'Biscuit Size';

            let options = subtypes.map((subtype, index) => {
                let subtypeValue = subtypeValues[index];
                return `<option value="${subtypeValue}">${subtype}</option>`;
            }).join(''); //Join all options into a single string
            
            return `
                <label for="${pN}_dropdown">${label}</label>
                <select id="${pN}_dropdown" name="${pN}Dropdown" onchange="updateNutritionFactsForProduct('${pName}')">
                    ${options}
                </select>
            ` 
        }
    //#endregion
//#endregion



//#region - NUTRITIONAL FACTS - Create the NF table and fill in the values based on each item.
    
    //Function: this will generate the nutrition facts table and the values that are based on the product assigned
    function generateNutritionFactsHTML(nf) {
        
        return `
            <section class="performance-facts">
                
                <header class="performance-facts__header">
                    <h1 class="performance-facts__title">Nutrition Facts</h1>
                    <p>Serving Size ${nf.servingSize}<small>g</small> <small style="float: right">(about 1 treat)</small></p>
                    <p>Serving Per Container: ${nf.servingPerContainer}</p>
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
                            <td>${nf.calories}</td>
                        </tr>
                        <tr class="thick-row">
                            <td colspan="3" class="small-info">
                                <b></b>
                            </td>
                        </tr>
                        <tr>
                            <th colspan="2">
                                <b>Total Fat</b>
                                ${nf.totalFat}g
                            </th>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <th>
                                Saturated Fat
                                ${nf.satFat}g
                            </th>
                            <td>
                                <b></b>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <th>
                                Poly-unsaturated Fat
                                ${nf.polyUnSatFat}g
                            </th>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <th>
                                Mono-unstaturated Fat
                                ${nf.monoUnSatFat}g
                            </th>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <td class="blank-cell">
                            </td>
                            <th>
                                Trans Fat
                                ${nf.transFat}g
                            </th>
                            <td>
                            </td>
                        </tr>
                        <tr>
                            <th colspan="2">
                                <b>Cholesterol</b>
                                ${nf.cholesterol}mg
                            </th>
                            <td></td>
                        </tr>
                        <tr>
                            <th colspan="2">
                                <b>Sodium</b>
                                ${nf.sodium}g
                            </th>
                            <td></td>
                        </tr>
                        <tr>
                            <th colspan="3">
                                <b>Total Carbohydrates</b>
                                ${nf.totalCarbs}g
                            </th>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td class="blank-cell">
                            </td>
                            <th colspan="2">
                                Dietary Fiber
                                ${nf.dietaryFiber}g
                            </th>
                            <td></td>
                        </tr>
                        <tr>
                            <td class="blank-cell"></td>
                            <th colspan="2">
                                Total Sugars
                                ${nf.totalSugar}g
                            </th>
                            <td></td>
                        </tr>
                        <tr>
                            <td class="blank-cell"></td>
                            <th colspan="2">
                                Includes ${nf.addedSugar}g Added Sugars
                            </th>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr class="thick-end">
                            <th colspan="2">
                                <b>Protein</b>
                                ${nf.protein}g
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
                            ${nf.calcium}mg
                        </td>
                        <td>
                            Potassium
                            ${nf.potassium}mg
                        </td>
                        <td>
                            Iron
                            ${nf.iron}mg
                        </td>
                        </tr>
                    </tbody>
                </table>
            </section>
            <!-- End Nutritional Facts-->
        `
    }

    //Function: initializes the nutrition facts upon load. This gets called after the dropdowns are populated
    function updateInitialNutritionFacts() {
        productInfo.forEach(p => {
            const pName = `${p.flavor} ${p.category}`;
            updateNutritionFactsForProduct(pName);
        })
    }

    //Function: update the nutritional facts from getting the value of the size selector and passing it through the nf rendering function
    function updateNutritionFactsForProduct(pName) {
        try{
            const pN = toHTMLFormat(pName); //Convert product name to be html naming friendly
            const sizeSelector = document.getElementById(`${pN}_dropdown`);
            const rawMultiplier = sizeSelector.value;
            const sizeMultiplier = parseFloat(rawMultiplier);
            if (!isNaN(sizeMultiplier)) {
                renderNutritionFacts(sizeMultiplier, pName);
            } 
            else {
                console.error("Size Multiplier is not a number:", sizeMultiplier);
            }
        }
        catch (error) {
            console.error(`Failed to update Nutrition Facts for product ${pName}: \n ${error}`);
        }
    }

    //Function: get and assign the data for the nutrition facts
    function renderNutritionFacts(sizeMultiplier, pName) {
        if (!pName) {
            console.error("Undefined product provided.");
            return; //Exit if product is not defined
        }

        let flvr = getProduct(pName).flavor;

        const facts = nutritionalFactsByFlavor[flvr];

        if (!facts) {
            console.error(`No nutritional facts found for ${flvr} `);
            return;
        }

        let recalcFacts = {}; //Set up the array of objects for the recalculated nutrition facts

        //Iterate over each nutritional fact and apply the calculation
        Object.keys(facts).forEach(key => {
            let originalValue = facts[key];
            
            if (typeof originalValue === 'number') {
                recalcFacts[key] = parseFloat((originalValue * sizeMultiplier).toFixed(2));
            } else {
                recalcFacts[key] = originalValue; //Keep non-numeric values unchanged
            }
        });

        //Generate the HTML using the recalculated facts
        const pN = toHTMLFormat(pName);
        const elementId = `${pN}_nfacts`;
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = generateNutritionFactsHTML(recalcFacts);
        } else {
            console.error(`Element with ID ${elementId} not found!`);
        }
    }
    
//#endregion






//#region - PRODUCT CARDS - Creat the cards where for the products
    //Function: Create the layout of the card
    function generateProductCards(pName, desc) {
        const pN = toHTMLFormat(pName);
        
        return `
        <div class="col mb-3 mt-3">
            <div class="card h-100">
                <div class="card-header"><h5>${cleanStr(pName)}</h5></div>
                <div class="card-body">
                    <p>${desc}</p>
                </div>
                <div class="card-footer">
                    
                    <a class="btn btn-primary card-button" href=""  data-bs-toggle="offcanvas" data-bs-target="#offcanvas_${pN}"  aria-controls="offcanvas_${pN}">More Info</a>
                </div>
            </div>
        </div>
        `
    }


    //Function: assign values to the generateProductCards function for each product
    function renderProductCards() {
        productInfo.forEach( p => {
            const pName = `${p.flavor} ${p.category}`; //Create the product name by combining the flavor and the category of the current product
            const cPDesc = getProduct(pName).shortDescription;
            const cPCard = generateProductCards(pName, cPDesc);

            const element = document.getElementById(`${toHTMLFormat(p.category)}_cards`);
            if(element) {
                element.innerHTML += cPCard; //Add a product card element each time (+=)
            } 
            else {
                console.error(`Element with ID '${toHTMLFormat(p.category)}_cards' not found!`);
            }
        });
    }
//#endregion






//#region - INNER BISCUIT CAROUSEL - Create the images and the captions for each item in the carousel
    //Function: create the carousel display
    function generateCarousel() {
        const imagePath = "StaticFiles/img/product/dog/biscuits/";
        const carouselItems = [ //This is a multi-dimensional array to call a specific item you would use, carouselItems[#].variableName Ex. carouselItems[1].src will give me 'biscuit_sm_long.png'
            { src: "biscuit_sm.png", alt: "Small Biscuit", name: "Small Biscuit", price: "" },
            { src: "biscuit_sm_long.png", alt: "Small Long Biscuit", name: "Small Long Biscuit", price: "" },
            { src: "biscuit_lg.png", alt: "Large Biscuit", name: "Large Biscuit", price: "" },
            { src: "biscuit_lg_long.png", alt: "Large Long Biscuit", name: "Large Long Biscuit", price: "" }
        ];


        const carInd_btns = document.getElementById('carInd_btns');
        const carouselInner = document.getElementById('carouselInner');
        carouselItems.forEach((item, index) => {
            const active = index === 0 ? 'active' : '';
            let whenActive = 'active'
            let whenTrue = 'aria-current="true"';

            if(index !== 0) whenActive = '';
            if(active !== 'active') whenTrue ='';

            carInd_btns.innerHTML += `
                <button type="button" data-bs-target="#biscuit-size-carousel" data-bs-slide-to="${index}" class="${whenActive}" aria-current="${whenTrue}" aria-label="Slide ${index + 1}"></button>
                `;
                
            carouselInner.innerHTML += `
                <div class="carousel-item ${active}">
                    <img class="" src="${imagePath}${item.src}" alt="${item.alt}">
                    <div class="carousel-caption">
                        <h5>${item.name}</h5>
                        <p class="text-dark">Only ${item.price}!</p>
                    </div>
                </div>
                `;
        });
    }
    
//#endregion






//#region - HELPER FUNCTIONS - Functions made to help with general stuff
    //Separate pName into flavor and category
    function separatePName(pName) {
        let pN = cleanStr(pName);
        let flvr = '';
        let pCat = '';

        productInfo.forEach(p => {
            if (`${p.flavor} ${p.category}` === pN) {
                flvr = p.flavor;
                pCat = p.category;
                
                return {flvr, pCat};
            }
        });

        return {flvr, pCat};
    }

    function putUnderscores(phrase) {
        return phrase.replace(/\s/g, '_');
    }

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

    //Function: This will put the string into a format usable to create id names for HTML elements
    function toHTMLFormat(string) {
        let str = '';
        str = cleanStr(string);
        str = str.toLowerCase();
        str = putUnderscores(str);
        return str;
    }

    //Function: This will turn any phrase into camel case notation
    function toCamelCase(phrase) {
        //Split the phrase into words using space as the delimiter
        const words = phrase.split(' ');
    
        //Transform each word: the first word is all lowercase, and each subsequent word is capitalized at the first letter
        const camelCaseWords = words.map((word, index) => {
            //Lowercase the first word entirely, capitalize the first letter of subsequent words
            if (index === 0) {
                return word.toLowerCase();
            } 
            else {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }
        });
    
        //Join all the transformed words to form the camelCase string
        return camelCaseWords.join('');
    }

    //Function: Combine all the string cleaning functions into one.
    function cleanStr(string) {
        let str = '';
        str = separateCamelCase(string);
        str = replaceUnderscores(str);
        return capEachWord(str);
    }

    function putToArray(string) {
        return string.split(' + ');
    }

    //Function: Return the current product based of the name of the product given in the parameter
    function getProduct(pName) {
        let cProduct= {};
        const {flvr, pCat} = separatePName(pName);
        
        productInfo.forEach(p => {
            if (p.flavor === flvr && p.category === pCat) {
                cProduct = p;
                return cProduct;
            }
        });
        
        return cProduct;
    }

    
//#endregion






//#region - START UP INITIATION - functions that are very necessary to load the page up properly
    //Function: loads data and sets up User Interface
    async function initializeData() {
        await fetch_Flavors_Data();
        await fetchNutritionalFactsData();
        await fetchProductInfo();
        //Call functions after all data fetching functions. The function call order is very important. Go from most outer element to most inner
        renderProductCards();
        renderOffCanvases();
        updateInitialNutritionFacts();
        generateCarousel();
    }

    //This is the line that loads the whole page essentially
    document.addEventListener('DOMContentLoaded', async function () {
        await initializeData(); //Load data and render UI components
        
       
    });
//#endregion


