"use strict";


/**
 * Variables
 */
const quotationData = {};
let quotationForm = {};
let currentStep = 1;
let validForm = false;
let formButton = document.querySelector(".form-button");

/**
 * Functions
 */
const attachValidationEvents = () => {
    QUOTATION_FORM_STEPS[currentStep - 1].forEach(formInputData => {
        const formInput = quotationForm[formInputData.name].input;
        formInput.addEventListener([2, 3].includes(currentStep) ? "change" : "keyup", () =>
            __validateInput(formInput.value, formInputData)
        );
    });
}

const getQuotationFormInput = () => {
    quotationForm = {};

    QUOTATION_FORM_STEPS[currentStep - 1].forEach(formInputData => {
        quotationForm[formInputData.name] = {
            "input" : document.querySelector(`.form-input__${formInputData.name}`),
            "inputError" : document.querySelector(`.form-input-error__${formInputData.name}`),
            "valid" : false,
            "value" : null
        };
    });
}

const submitForm = () => {
    __toggleFormButton();

    if (!validForm) {
        return;
    }

    Object.keys(quotationForm).forEach(inputName => {
        quotationData[inputName] = quotationForm[inputName].value;
    });

    if (currentStep < QUOTATION_FORM_STEPS_COUNT) {
        __getNextStep();
    }
}

const __getNextStep = async () => {
    currentStep++;
    const formStepWrapper = document.querySelector(".form-step-wrapper");
    formStepWrapper.innerHTML = "";
    formStepWrapper.setAttribute(INCLUDE_HTML_ATTRIBUTE, `components/quotation-form-step-${currentStep}.html`);
    await includeHTML();
    
    if ([2, 3].includes(currentStep)) {
        getQuotationFormInput();
        attachValidationEvents();
    } else {
        quotationForm = {};
    }
    __toggleFormButton();

    if (currentStep === 2) {
        __insertFinishingOptions();
    }

    if (currentStep === 3) {
        __insertAccessoryOptions();
    }
}

const __validateInput = (value, data) => {
    const { name, type, min, max } = data;

    if (quotationForm[name].value == value) {
        return quotationForm[name].valid;
    }

    quotationForm[name].value = value;

    switch (type) {
        case "float":
            return __validateFloatInput(name, value, min, max);
        case "integer":
            return __validateIntegerInput(name, value, min, max);
        case "select":
            return __validateSelectInput(name, value);
    }
}

const __validateIntegerInput = (name, value, min, max) => {
    value = parseFloat(value);

    if (!Number.isInteger(value)) {
        quotationForm[name].valid = false;
        __setInputError(name, "Please enter a valid integer.");
        __toggleFormButton();

        return false;
    }

    if (value < min || value > max) {
        quotationForm[name].valid = false;
        __setInputError(name, `Please enter an integer between ${min} and ${max}.`);
        __toggleFormButton();

        return false;
    }

    quotationForm[name].valid = true;
    __setInputError(name, "");
    __toggleFormButton();

    return true;
}

const __validateFloatInput = (name, value, min, max) => {
    value = parseFloat(value);

    if (Number.isNaN(value)) {
        quotationForm[name].valid = false;
        __setInputError(name, "Please enter a valid number.");
        __toggleFormButton();

        return false;
    }

    if (value < min || value > max) {
        quotationForm[name].valid = false;
        __setInputError(name, `Please enter a number between ${min} and ${max}.`);
        __toggleFormButton();

        return false;
    }

    quotationForm[name].valid = true;
    __setInputError(name, "");
    __toggleFormButton();

    return true;
}

const __validateSelectInput = (name, value) => {
    if (!value) {
        __setInputError(name, "Please select a type.");
        __toggleFormButton();

        return false;
    }

    quotationForm[name].valid = true;
    __setInputError(name, "");
    __toggleFormButton();

    if (name.includes("accessory")) {
        __setTypePrice(ACCESSORY_TYPES[value], `input-group-text__${name}-price`);
        __insertAccessoryOptions();
    } else {
        __setTypePrice(FINISHING_TYPES[value], `input-group-text__${name}-price`);
        __insertFinishingOptions();
    }

    return true;
}

const __setInputError = (name, error) => {
    quotationForm[name].inputError.innerHTML = error;
}

const __setTypePrice = (typeData, typePriceClass) => {
    const typePriceElement = document.querySelector(`.${typePriceClass}`);
    typePriceElement.innerHTML = typeData.price;
}

const __toggleFormButton = () => {
    validForm = Object.values(quotationForm).every(({ valid }) => valid);
    formButton.disabled = !validForm;
}

const __insertFinishingOptions = () => {
    __insertSelectOptions(".form-input__finishing-type", FINISHING_TYPES);
}

const __insertAccessoryOptions = () => {
    __insertSelectOptions(".form-input__accessory", ACCESSORY_TYPES);
}

const __insertSelectOptions = (selectElementClass, optionsData) => {
    const selectElements = document.querySelectorAll(selectElementClass);
    const selectedOptions = Object.values(quotationForm).map(({ value }) => value);

    selectElements.forEach(selectElement => {
        const selectedOption = selectElement.value;

        // Remove select options
        while (selectElement.children.length > 1) {
            selectElement.removeChild(selectElement.lastChild);
        }

        Object.keys(optionsData).forEach(optionKey => {
            if (!selectedOptions.includes(optionKey) || selectedOption === optionKey) {
                const optionElement = document.createElement("option");
                optionElement.innerHTML = optionsData[optionKey].label;
                optionElement.value = optionsData[optionKey].value;

                selectElement.appendChild(optionElement);
            }
        });

        // Reset the selected option
        selectElement.value = selectedOption;
    });
}

/**
 * Initialization
*/
getQuotationFormInput();
formButton.addEventListener("click", submitForm);
attachValidationEvents();
