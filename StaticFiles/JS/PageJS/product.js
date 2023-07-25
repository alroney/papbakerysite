/* ORDER FORM */
var form = document.getElementById("orderForm");
async function handleSubmit(event) {
    event .preventDefault();
    var status = document.getElementById("status");
    var data = new FormData(event.target);

    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if(response.ok) {
            status.innerHTML = "Thanks for your order! We'll get back to you soon.";
            form.reset()
        } 
        else {
            response.json().then(data => {
                if(Object.hasOwn(data, "error")) {
                    status.innerHTML = data.error.map(error => error["message"]).join(", ");
                }
                else {
                    status.innerHTML = "Oops! There was a problem submitting your order"
                }
            })
        }
    }).catch(error => {
        status.classList.add('error');
        status.innerHTML = "Oops! There was a problem submitting your order"
    });
}
form.addEventListener("submit", handleSubmit)
/* END OF ORDER FORM */



/* SELECT MENU */

/* END OF SELECT MENU */