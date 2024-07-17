"use strict";


/**
 * Functions
 */
function fillQuotationDetails() {
    if (Object.keys(quotationData).length === 0) {
        return;
    }
    
    __fillQuotationProductSpecsSection();
    __fillQuotationFinishingSection();
    __fillQuotationAccessorySection();
}

function __fillQuotationProductSpecsSection() {
    ["height", "drawers"].forEach(productSpec => {
        __setElementText(`quotation-value__${productSpec}`, quotationData[productSpec]);
    });
}

function __fillQuotationFinishingSection() {
    let finishingTypeIndex = 1;

    while (finishingTypeIndex <= 3) {
        const finishingType = quotationData[`finishing-type-${finishingTypeIndex}`];
        __setElementText(`quotation-value__finishing-type-${finishingTypeIndex}`, FINISHING_TYPES[finishingType].label);
        __setElementText(`quotation-value__finishing-type-${finishingTypeIndex}-price`, FINISHING_TYPES[finishingType].price + " EGP");

        finishingTypeIndex++;
    }
}

function __fillQuotationAccessorySection() {
    const accessoryCount = Object.keys(quotationData).filter(item => item.includes("accessory-")).length;
    const accessoryList = document.querySelector(".quotation-accessories-list");
    accessoryList.innerHTML = "";
    let accessoryIndex = 1;

    while (accessoryIndex <= ACCESSORIES_MAX_COUNT) {
        const accessory = quotationData[`accessory-${accessoryIndex}`];
        __addListElement(accessoryList, `quotation-value__accessory-${accessoryIndex}`, ACCESSORY_TYPES[accessory].label, ACCESSORY_TYPES[accessory].price);

        accessoryIndex++;

        if (accessoryCount < accessoryIndex) {
            break;
        }
    }
}

function __setElementText(elementClass, text) {
    const element = document.querySelector(`.${elementClass}`);
    element.innerHTML = text;
}

function __addListElement(listParent, listClass, label, price) {
    const listElement = document.createElement("li");
    listElement.classList.add("list-group-item", "d-flex", "justify-content-between");

    const listLabelElement = document.createElement("span");
    listLabelElement.classList.add(listClass);
    listLabelElement.innerHTML = label;
    listElement.appendChild(listLabelElement);

    const listPriceElement = document.createElement("span");
    listPriceElement.classList.add(listClass + "-price");
    listPriceElement.innerHTML = price + " EGP";
    listElement.appendChild(listPriceElement);

    listParent.appendChild(listElement);
}

fillQuotationDetails();