/* ORDER FORM */

const form = document.getElementById("contactForm");
const requiredInputs = form.querySelectorAll('[required]');

// Function: handleSubmit - Handles the form submission event
async function handleSubmit(event) {
    event .preventDefault();// Prevent the default form submit
    var status = document.getElementById("status");
    var data = new FormData(event.target);

    // Check if all required inputs are filled
    let isFormValid = true;
    requiredInputs.forEach(input => {
        if(!input.value.trim) {
            isFormValid = false;
            input.classList.add('is-invalid');
        }
        else {
            input.classList.remove('is-invalid');
        }
    });

    if(!isFormValid) {
        status.classList.add('error');
        status.innerHTML = "Please fill in all required fields";
        return;
    }

    // Send the form data
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {// Handle the response
        if(response.ok) {
            status.style.color = "green";
            status.style.fontSize = "1.5rem";
            status.innerHTML = "Thanks for your order! We'll get back to you soon.";
            form.reset();
        } 
        else {// Handle errors
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


/*=======================================*/


/* FORM VALIDATION */
    /* VALIDATE NAME */
        //Function: validateName - Validates a name
        function validateName(value) {
            const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
            return nameRegex.test(value);
        }

        const nameInputs = document.querySelectorAll(".nameInput");//Get the name input elements

        nameInputs.forEach(input => {
            input.addEventListener("input", function() {
                setTimeout(() => {
                    if(this.value.length == 0) {//Format the name when the input loses focus
                        this.classList.remove("is-invalid");
                        this.style.backgroundColor = "rgba(255, 255, 255, 1)";
                        input.setCustomValidity("");
                    }
                    else{//Check if the name is valid
                        if(!validateName(this.value)) {
                            this.classList.add("is-invalid");
                            this.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
                            input.setCustomValidity("Please enter a valid name");
                        }
                        else {
                            this.classList.remove("is-invalid");
                            this.style.backgroundColor = "rgba(0, 255, 0, 0.2)";
                            input.setCustomValidity("");
                        }
                    }
                }, 50);
            });
        });
    /* END OF VALIDATE NAME */

/*=======================================*/

    /* VALIDATE EMAIL */
        //Function: validateEmail - Validates an email address
        function validateEmail(value) {
            const emailRegex = /\S+@\S+\.\S+/;
            return emailRegex.test(value);
        }

        const emailInput = document.getElementById("emailInput");//Get the email input element

        emailInput.addEventListener("input", function() {
            setTimeout(() => {
                if(this.value.length == 0) {//Format the email when the input loses focus
                    this.classList.remove("is-invalid");
                    this.style.backgroundColor = "rgba(255, 255, 255, 1)";
                    emailInput.setCustomValidity("");
                }
                else{//Check if the email is valid
                    if(!validateEmail(this.value)) {
                        this.classList.add("is-invalid");
                        this.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
                        emailInput.setCustomValidity("Please enter a valid email address");
                    }
                    else {
                        this.classList.remove("is-invalid");
                        this.style.backgroundColor = "rgba(0, 255, 0, 0.2)";
                        emailInput.setCustomValidity("");
                    }
                }
            }, 50);
        });
    /* END OF VALIDATE EMAIL */

/*=======================================*/

    /* VALIDATE PHONE NUMBER */
        //Function: extractDigits - Extracts the digits from a string
        function extractDigits(value) {
            return value.replace(/\D/g, '');
        }

        //Function: validatePhoneNumber - Validates a phone number
        function validatePhoneNumber(value) {
            const digits = extractDigits(value);
            return digits.length === 10;// Check if the number is 10 digits long
        }

        //Function: formatPhoneNumber - Formats a phone number into (xxx) xxx-xxxx
        function formatPhoneNumber(value) {
            const digits = extractDigits(value);
            const formattedNumber = digits.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
            return formattedNumber;
        }
        

        const phoneInput = document.getElementById("phoneInput");//Get the phone input element
        const phoneInputLabel = document.getElementById("phoneInputLabel");//Get the phone input label element
    /* END OF VALIDATE PHONE NUMBER */

/*=======================================*/

    /* SELECT OPTION VALIDATIONS */
        const subjectInput = document.getElementById("subjectInput");//Get the subject input element
        const subjectOptions = document.querySelectorAll("#subjectInput option");//Get the subject options
        const complimentPerms = document.getElementById("postComplimentPermission");//Get the compliment permission input element
        const complimentPermsLabel = document.getElementById("postComplimentPermissionLabel");//Get the compliment permission input label element
        const textPerms = document.getElementById("txtMsgPermission");//Get the text message permission input element
        const textPermsLabel = document.getElementById("txtMsgPermissionLabel");//Get the text message permission input label element

        subjectInput.addEventListener("input", function() {
            setTimeout(() => {
                if(this.value.length == 0) {//Format the subject when the input loses focus
                    this.classList.remove("is-invalid");
                    this.style.backgroundColor = "rgba(255, 255, 255, 1)";
                    subjectInput.setCustomValidity("");
                }
                else{//Check if the subject is valid
                    if(this.value == "") {
                        this.classList.add("is-invalid");
                        this.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
                        subjectInput.setCustomValidity("Please select a subject");
                    }
                    else {
                        this.classList.remove("is-invalid");
                        this.style.backgroundColor = "rgba(0, 255, 0, 0.2)";
                        subjectInput.setCustomValidity("");
                    }
                }

                // Show or hide the phone number input depending on the subject
                if(this.value == "Support" || this.value == "Complaint") {
                    phoneInputLabel.style.display = "block";
                    phoneInput.style.display = "block";
                    phoneInput.required = true;//Make the phone number input required
                    textPermsLabel.style.display = "inline-block";
                    textPerms.style.display = "inline-block";

                    phoneInput.addEventListener("input", function() {
                        setTimeout(() => {
                            this.value = formatPhoneNumber(this.value);//Format the phone number as the user types
                            if(this.value.length == 0) {//Format the phone number when the input loses focus
                                this.classList.remove("is-invalid");
                                this.style.backgroundColor = "rgba(255, 255, 255, 1)";
                                phoneInput.setCustomValidity("");
                            }
                            else{//Check if the phone number is valid
                                if(!validatePhoneNumber(this.value)) {
                                    this.classList.add("is-invalid");
                                    this.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
                                    phoneInput.setCustomValidity("Please enter a valid phone number");
                                }
                                else {
                                    this.classList.remove("is-invalid");
                                    this.style.backgroundColor = "rgba(0, 255, 0, 0.2)";
                                    phoneInput.setCustomValidity("");
                                }
                            }
                        }, 50);
                    });
                }

                else {
                    phoneInputLabel.style.display = "none";
                    phoneInput.style.display = "none";
                    phoneInput.required = false;//Make the phone number input not required
                    phoneInput.value = "";
                    textPermsLabel.style.display = "none";
                    textPerms.style.display = "none";

                }

                if(this.value == "Compliment") {
                    complimentPermsLabel.style.display = "inline-block";
                    complimentPerms.style.display = "inline-block";
                }

                else {
                    complimentPermsLabel.style.display = "none";
                    complimentPerms.style.display = "none";
                }

            }, 50);
        });
    /* END OF SELECT OPTION VALIDATIONS */

/*=======================================*/

    /* VALIDATE MESSAGE */
        const messageInput = document.getElementById("messageInput");//Get the message input element

        messageInput.addEventListener("input", function() {
            setTimeout(() => {
                if(this.value.length == 0) {//Format the message when the input loses focus
                    this.classList.remove("is-invalid");
                    this.style.backgroundColor = "rgba(255, 255, 255, 1)";
                    messageInput.setCustomValidity("");
                }
                else{//Check if the message is valid
                    if(this.value.length < 10) {
                        this.classList.add("is-invalid");
                        this.style.backgroundColor = "rgba(255, 0, 0, 0.2)";
                        messageInput.setCustomValidity("Please enter at least 10 characters");
                    }
                    else {
                        this.classList.remove("is-invalid");
                        this.style.backgroundColor = "rgba(0, 255, 0, 0.2)";
                        messageInput.setCustomValidity("");
                    }
                }
            }, 50);
        });
    /* END OF VALIDATE MESSAGE */

/*=======================================*/