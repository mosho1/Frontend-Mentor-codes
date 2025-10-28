// // Select elements
// const form = document.getElementById("card-form");
// const cardholderInput = document.getElementById("cardholder");
// const cardNumberInput = document.getElementById("card-number");
// const expMonthInput = document.getElementById("exp-month");
// const expYearInput = document.getElementById("exp-year");
// const cvcInput = document.getElementById("cvc");
// const completionState = document.getElementById("completion-state");

// const cardNamePreview = document.querySelector(".card-name");
// const cardNumberPreview = document.querySelector(".card-number");
// const cardExpiryPreview = document.querySelector(".card-expiry");
// const cardCvcPreview = document.querySelector(".card-cvc");

// const errors = {
//   cardholder: document.getElementById("cardholder-error"),
//   cardNumber: document.getElementById("card-number-error"),
//   expDate: document.getElementById("exp-date-error"),
//   cvc: document.getElementById("cvc-error"),
// };

// function setError(input, errorEl, show = true) {
//   if (show) {
//     errorEl.style.display = "block";
//     input.classList.add("error-border");
//   } else {
//     errorEl.style.display = "none";
//     input.classList.remove("error-border");
//   }
// }

// function validateName() {
//   const value = cardholderInput.value.trim();
//   const isValid = /^[A-Za-z\s]+$/.test(value);
//   setError(cardholderInput, errors.cardholder, !isValid);
//   return isValid;
// }

// function validateCardNumber() {
//   const value = cardNumberInput.value.replace(/\s+/g, "");
//   const isValid = /^\d{16}$/.test(value);
//   setError(cardNumberInput, errors.cardNumber, !isValid);
//   return isValid;
// }

// function validateExpDate() {
//   const month = expMonthInput.value.trim();
//   const year = expYearInput.value.trim();
//   const isValid = /^\d{2}$/.test(month) && /^\d{2}$/.test(year);
//   setError(expMonthInput, errors.expDate, !isValid);
//   setError(expYearInput, errors.expDate, !isValid);
//   return isValid;
// }

// function validateCVC() {
//   const value = cvcInput.value.trim();
//   const isValid = /^\d{3}$/.test(value);
//   setError(cvcInput, errors.cvc, !isValid);
//   return isValid;
// }

// function formatCardNumber(value) {
//   return value
//     .replace(/\s+/g, "")
//     .replace(/(\d{4})/g, "$1 ")
//     .trim();
// }

// // Live updates
// cardholderInput.addEventListener("input", () => {
//   cardNamePreview.textContent = cardholderInput.value || "Jane Appleseed";
// });

// cardNumberInput.addEventListener("input", () => {
//   cardNumberInput.value = formatCardNumber(cardNumberInput.value);
//   cardNumberPreview.textContent =
//     cardNumberInput.value || "0000 0000 0000 0000";
// });

// expMonthInput.addEventListener("input", () => {
//   cardExpiryPreview.textContent = `${expMonthInput.value || "00"}/${
//     expYearInput.value || "00"
//   }`;
// });

// expYearInput.addEventListener("input", () => {
//   cardExpiryPreview.textContent = `${expMonthInput.value || "00"}/${
//     expYearInput.value || "00"
//   }`;
// });

// cvcInput.addEventListener("input", () => {
//   cardCvcPreview.textContent = cvcInput.value || "000";
// });

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const isNameValid = validateName();
//   const isNumberValid = validateCardNumber();
//   const isExpValid = validateExpDate();
//   const isCvcValid = validateCVC();

//   if (isNameValid && isNumberValid && isExpValid && isCvcValid) {
//     form.style.display = "none";
//     completionState.style.display = "flex";
//   }
// });

// window.resetForm = function () {
//   form.reset();
//   form.style.display = "flex";
//   completionState.style.display = "none";
//   cardNamePreview.textContent = "Jane Appleseed";
//   cardNumberPreview.textContent = "0000 0000 0000 0000";
//   cardExpiryPreview.textContent = "00/00";
//   cardCvcPreview.textContent = "000";
// };
const form = document.getElementById("card-form");
const completionState = document.getElementById("completion-state");
const cardholderInput = document.getElementById("cardholder");
const cardNumberInput = document.getElementById("card-number");
const expMonthInput = document.getElementById("exp-month");
const expYearInput = document.getElementById("exp-year");
const cvcInput = document.getElementById("cvc");
const cardholderError = document.getElementById("cardholder-error");
const cardNumberError = document.getElementById("card-number-error");
const expiryError = document.getElementById("exp-date-error");
const cvcError = document.getElementById("cvc-error");
const cardNumberDisplay = document.querySelector(".card-number");
const cardNameDisplay = document.querySelector(".card-name");
const cardExpiryDisplay = document.querySelector(".card-expiry");
const cardCvcDisplay = document.querySelector(".card-cvc");

// Validate cardholder
function validateCardholder() {
  const value = cardholderInput.value.trim();
  const isValid = /^[A-Za-z\s]+$/.test(value) && value.length > 0;
  cardholderInput.classList.toggle("error-border", !isValid);
  cardholderError.style.display = isValid ? "none" : "block";
  cardholderInput.setCustomValidity(isValid ? "" : "Invalid name");
  cardNameDisplay.textContent = value || "Jane Appleseed";
  return isValid;
}

// Validate card number
function validateCardNumber() {
  const value = cardNumberInput.value.replace(/\s/g, "");
  const isValid = /^\d{16}$/.test(value);
  cardNumberInput.classList.toggle("error-border", !isValid);
  cardNumberError.style.display = isValid ? "none" : "block";
  cardNumberInput.setCustomValidity(isValid ? "" : "Invalid card number");
  const formatted =
    value.replace(/(\d{4})(?=\d)/g, "$1 ").trim() || "0000 0000 0000 0000";
  cardNumberDisplay.textContent = formatted;
  return isValid;
}

// Validate expiry
function validateExpiry() {
  const month = expMonthInput.value;
  const year = expYearInput.value;
  const currentYear = new Date().getFullYear() % 100;
  let isValid = true;

  // Validate month
  const monthValid =
    month && !isNaN(month) && Number(month) >= 1 && Number(month) <= 12;
  expMonthInput.classList.toggle("error-border", !monthValid);
  expMonthInput.setCustomValidity(monthValid ? "" : "Invalid month");

  // Validate year
  const yearValid =
    year && !isNaN(year) && Number(year) >= currentYear && Number(year) <= 99;
  expYearInput.classList.toggle("error-border", !yearValid);
  expYearInput.setCustomValidity(yearValid ? "" : "Invalid year");

  // Show error message if either is invalid
  const hasError = !monthValid || !yearValid;
  expiryError.style.display = hasError ? "block" : "none";
  isValid = monthValid && yearValid;

  // Update card display
  const formattedMonth = monthValid ? String(month).padStart(2, "0") : "00";
  const formattedYear = yearValid ? String(year).padStart(2, "0") : "00";
  cardExpiryDisplay.textContent =
    month || year ? `${formattedMonth}/${formattedYear}` : "00/00";

  return isValid;
}

// Validate CVC
function validateCvc() {
  const value = cvcInput.value;
  const isValid = /^\d{3}$/.test(value);
  cvcInput.classList.toggle("error-border", !isValid);
  cvcError.style.display = isValid ? "none" : "block";
  cvcInput.setCustomValidity(isValid ? "" : "Invalid CVC");
  cardCvcDisplay.textContent = value || "000";
  return isValid;
}

// Sanitize inputs
cardholderInput.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
  validateCardholder();
});

cardNumberInput.addEventListener("input", (e) => {
  let value = e.target.value.replace(/\D/g, "").slice(0, 16);
  e.target.value = value.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  validateCardNumber();
});

expMonthInput.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 2);
  validateExpiry();
});

expYearInput.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 2);
  validateExpiry();
});

cvcInput.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 3);
  validateCvc();
});

// Validate on blur
cardholderInput.addEventListener("blur", validateCardholder);
cardNumberInput.addEventListener("blur", validateCardNumber);
expMonthInput.addEventListener("blur", validateExpiry);
expYearInput.addEventListener("blur", validateExpiry);
cvcInput.addEventListener("blur", validateCvc);

// Form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const isCardholderValid = validateCardholder();
  const isCardNumberValid = validateCardNumber();
  const isExpiryValid = validateExpiry();
  const isCvcValid = validateCvc();
  if (isCardholderValid && isCardNumberValid && isExpiryValid && isCvcValid) {
    form.style.display = "none";
    completionState.style.display = "flex";
  }
});

// Reset form
function resetForm() {
  form.reset();
  form.style.display = "flex";
  completionState.style.display = "none";
  cardholderInput.classList.remove("error-border");
  cardNumberInput.classList.remove("error-border");
  expMonthInput.classList.remove("error-border");
  expYearInput.classList.remove("error-border");
  cvcInput.classList.remove("error-border");
  cardholderError.style.display = "none";
  cardNumberError.style.display = "none";
  expiryError.style.display = "none";
  cvcError.style.display = "none";
  cardholderInput.setCustomValidity("");
  cardNumberInput.setCustomValidity("");
  expMonthInput.setCustomValidity("");
  expYearInput.setCustomValidity("");
  cvcInput.setCustomValidity("");
  cardNameDisplay.textContent = "Jane Appleseed";
  cardNumberDisplay.textContent = "0000 0000 0000 0000";
  cardExpiryDisplay.textContent = "00/00";
  cardCvcDisplay.textContent = "000";
}
