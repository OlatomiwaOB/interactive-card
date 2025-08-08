// select all the input elements
const cardHolderInput = document.getElementById("cardholder");
const cardNumberInput = document.getElementById("cardnumber");
const expMonthInput = document.getElementById("exp-month");
const expYearInput = document.getElementById("exp-year");
const cvcInput = document.getElementById("cvc");
const form = document.querySelector(".class_form");
const confirmBtn = document.getElementById("confirm_btn");

// for element on the card to update
const cardNameDisplay = document.querySelector(".card_holder");
const cardNumberDisplay = document.querySelector(".card_number");
const cardExpiryDisplay = document.querySelector(".card_expiry");
const cardCvcDisplay = document.querySelector(".cvc_display");


// help function to format card number
function formatCardNumber(number) {
    return number
    .replace(/\D/g, "")
    .substring(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim()
}

// Event listeners for real-time updates
cardHolderInput.addEventListener("input" , () => {
    cardNameDisplay.textContent = cardHolderInput.value || "JANE APPLESEED";
});
cardNumberInput.addEventListener("input", () => {
    const formatted = formatCardNumber(cardNumberInput.value);
    // cardNumberInput.value = formatted;
    cardNumberDisplay.textContent = formatted || "0000 0000 0000 0000";
});


function updateExpiry() {
   const month = expMonthInput.value || "00";
   const year = expYearInput.value || "00";
   cardExpiryDisplay.textContent = `${month}/${year}`;
 }
 expMonthInput.addEventListener("input", updateExpiry);
 expYearInput.addEventListener("input", updateExpiry);

 cvcInput.addEventListener("input", () => {
    cardCvcDisplay.textContent = cvcInput.value || "000";
 });

 // for error display 
 function showError(input, message) {
    const errorElem = input.nextElementSibling;
    if (errorElem && errorElem.classList.contains("error")) {
        errorElem.textContent = message;
        input.classList.add("input-error");
    }

 }
 function clearError(input) {
    const errorElem = input.nextElementSibling;
    if (errorElem && errorElem.classList.contains("error")) {
        errorElem.textContent = "";
        input.classList.remove("input-error");
    }
 }
 // for Regex and Format chheckers
 function isValidCardNumber(number) {
    return /^[0-9]{16}$/.test(number.replace(/\s/g, ""));
 }
 function isValidMonth(month) {
    const m = parseInt(month);
    return m >= 1 && m <= 12;
 }
 function  isValidYear(year) {
    return /^[0-9]{2}$/.test(year);
 }
 function isValidCVC(cvc) {
    return /^[0-9]{3}$/.test(cvc);
 }

 // for form submission 
function showExpiryError(message) {
    const errorElem = expMonthInput.closest(".exp_date").querySelector(".error");
    if (errorElem) {
        errorElem.textContent = message;
        expMonthInput.classList.add("input-error");
        expYearInput.classList.add("input-error");
    }
}
function clearExpiryError() {
    const errorElem = expMonthInput.closest(".exp_date").querySelector(".error");
    if (errorElem) {
        errorElem.textContent = "";
        expMonthInput.classList.remove("input-error");
        expYearInput.classList.remove("input-error");
    }
}

 confirmBtn.addEventListener("click", () =>{
    let isValid = true;
    // for cardholder name
    if (cardHolderInput.value.trim() === "") {
        showError(cardHolderInput, "Can't be black.");
        isValid = false;
    } else {
       clearError(cardHolderInput);
    } 
    // for card number
    const rawCardNumber = cardNumberInput.value.replace(/\s/g, "");
    if (rawCardNumber === "") {
        showError(cardNumberInput, "Can't be black.");
        isValid = false
    } else if (!isValidCardNumber (rawCardNumber)) {
        showError(cardNumberInput, "Wrong format, must be 16 digits");
        isValid = false;
    } else {
        clearError(cardNumberInput);
    }
    // for expiry month and year (combined)
    const month = expMonthInput.value.trim();
    const year = expYearInput.value.trim();

    if (month === "" || year === "") {
        showExpiryError("Can't be blank.");
        isValid = false;
    } else if (!isValidMonth(month)) {
        showExpiryError("Invalid month");
        isValid = false;
    } else if (!isValidYear(year)) {
        showExpiryError("Invalid year");
        isValid = false;
    } else {
        clearExpiryError();
    }
    // for cvc
    if (cvcInput.value.trim() === "") {
        showError(cvcInput, "Can't be black.");
        isValid = false;
    } else if (!isValidCVC(cvcInput.value)) {
        showError(cvcInput, "Invalid CVC");
        isValid = false;
    } else {
        clearError(cvcInput);
    }
    // for complete state when it is valid
    if (isValid) {
        document.querySelector(".class_form").classList.add("hidden");
        document.getElementById("complete_state").classList.remove("hidden");
    }

 });