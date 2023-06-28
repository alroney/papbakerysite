document.addEventListener("DOMContentLoaded", function() {
    /*
    * Nutritional Facts table script
    */
    function generateNutritionalTable(product, containerId) {
        //Create the table element
        var table = document.createElement("table");

        //Add rows for each nutritional fact
        for(var i = 0; i < product.nutrients.length; i++) {
            var nutrient = product.nutrients[i];

            //Create the row
            var row = document.createElement("tr");

            //Create the cells
            var nameCell = document.createElement("td");
            nameCell.textContent = nutrient.name;
            var valueCell = document.createElement("td");
            valueCell.textContent = nutrient.value + nutrient.unit;

            //Add the cells to the row
            row.appendChild(nameCell);
            row.appendChild(valueCell);

            //Add the row to the table
            table.appendChild(row);
        }

        //Get the container element
        var container = document.getElementById('containerId');

        //Clear the container before appending the table
        container.innerHTML = '';

        //Append the table to the container
        container.appendChild(table);
    }

    /*
    * Products
    */

    var products = [
        {
            name: "Applesauce Dog Treats",
            nutrients: [
                { name: "Calories", value: 100, unit: "kcal" },
                { name: "Protein", value: 5, unit: "g" },
                { name: "Fat", value: 2, unit: "g" },
            ],
            containerId: "dtp1_container"
        },
        {
            name: "Peanut Butter Dog Treats",
            nutrients: [
                { name: "Calories", value: 230, unit: "kcal" },
                { name: "Protein", value: 15, unit: "g" },
                { name: "Fat", value: 32, unit: "g" },
            ],
            containerId: "dtp2_container"
        }
    ]

    /*
    * Generate tables
    */
    for(var i = 0; i < products.length; i++) {
        var product = products[i];
        generateNutritionalTable(product, product.containerId);
    }
});