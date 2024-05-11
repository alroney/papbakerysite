
//Function: This will generate the nutrional facts table and the values that are based on the product assigned.
function generateNutritionalFacts(servingSize, servingPerContainer, calories, totalFat, satFat, cholesterol, sodium, totalCarbs, dietaryFiber, totalSugar, addedSugar, protein, calcium, potassium, iron) {
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
                        <td class="blank-cell">
                        </td>
                        <th>
                            Trans Fat
                            0g
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

//Create the objects
const applesauceBiscuitFacts = generateNutritionalFacts(6, "Varies", 3.14, 0.06, 0.01, 0, 0.92, 0.84, 0.12, 0.57, 0, 0.03, 1.15, 2.22, 0.02);
const pbBiscuitFacts = generateNutritionalFacts(6, "Varies", 14.92, 1.09, 0.183, 4.20, 22.24, 1.10, 0.09, 0.01, 0, 0.13, 0.34, 1.34, 0.02);
const pumpkinBiscuitFacts = generateNutritionalFacts(6, "Varies", 4.06, 0.12, 0.01, 0, 0.22, 1.11, 0.16, 0.06, 0, 0.15, 0.54, 4.08, 0.04);

/**
 * const bannanaBiscuitFacts = generateNutritionalFacts();
 * const swpotBiscuitFacts = generateNutritionalFacts();
 * const mangoBiscuitFacts = generatNutritionalFacts();
 */

//Assign the objects
document.getElementById('applesauce_biscuit_nutritional_facts').innerHTML = applesauceBiscuitFacts;
document.getElementById('pb_biscuit_nutritional_facts').innerHTML = applesauceBiscuitFacts;
document.getElementById('pumpkin_biscuit_nutritional_facts').innerHTML = applesauceBiscuitFacts;

/**
 * document.getElementById('bannana_biscuit_nutritional_facts').innerHTML = bannanaBiscuitFacts;
 * document.getElementById('sweet_potato_biscuit_nutritional_facts').innerHTML = swpotBiscuitFacts;
 * document.getElementById('mango_biscuit_nutritional_facts').innerHTML = mangoBiscuitFacts;
 */