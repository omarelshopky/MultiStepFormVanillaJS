"use strict";

/**
 * Variables
 */
modal = document.querySelector(".modal");
overlay = document.querySelector(".overlay");

/**
 * Functions
 */
function fillQuotationsList() {
    const tableBodyElement = document.querySelector("tbody");
    tableBodyElement.innerHTML = "";

    let quotationId = 1;

    __getQuotations().forEach(quotation => {
        const rowElement = document.createElement("tr");

        const idElement = document.createElement("th");
        idElement.setAttribute("scope", "row");
        idElement.innerHTML = quotationId;
        rowElement.appendChild(idElement);

        __addSimpleTableItem(rowElement, quotation["height"]);
        __addSimpleTableItem(rowElement, quotation["drawers"]);
        __addListTableItem(rowElement, quotation, "finishing-type", FINISHING_TYPES);
        __addListTableItem(rowElement, quotation, "accessory", ACCESSORY_TYPES);
        __addTableItemActions(rowElement, quotationId);

        tableBodyElement.appendChild(rowElement);

        quotationId++;
    });
}

function deleteQuotation(quotationIndex) {
    console.log(quotationIndex);
    const quotations = __getQuotations();
    const newQuotations = quotations.slice(0, quotationIndex).concat(quotations.slice(quotationIndex + 1));
    localStorage.setItem("quotations", JSON.stringify(newQuotations));
    fillQuotationsList();
}

function showQuotation(quotationIndex) {
    quotationData = __getQuotations()[quotationIndex];
    fillQuotationDetails();
    __openModal();
}

function __getQuotations() {
    return localStorage.getItem("quotations") ? JSON.parse(localStorage.getItem("quotations")) : [];
}

function __addSimpleTableItem(rowElement, value) {
    const tableItemElement = document.createElement("td");
    tableItemElement.innerHTML = value;
    rowElement.appendChild(tableItemElement);
}

function __addListTableItem(rowElement, quotation, key, types) {
    const tableItemElement = document.createElement("td");
    const listElement = document.createElement("ul");
    const typeKeys = Object.keys(quotation).filter(item => item.includes(key));
    typeKeys.forEach(typeKey => {
        const listItemElement = document.createElement("li");
        const typeId = quotation[typeKey];
        listItemElement.innerText = `${types[typeId].label} (${types[typeId].price} EGP)`;
        listElement.appendChild(listItemElement);
    });
    tableItemElement.appendChild(listElement);
    rowElement.appendChild(tableItemElement);
}

function __addTableItemActions(rowElement, quotationId) {
    const tableItemElement = document.createElement("td");

        const showButtonElement = document.createElement("button");
        showButtonElement.classList.add("btn", "btn-primary", "me-3");
        showButtonElement.setAttribute("type", "button");
        showButtonElement.innerText = "Show";
        showButtonElement.addEventListener("click", () => showQuotation(quotationId - 1));
        tableItemElement.appendChild(showButtonElement);

        const deleteButtonElement = document.createElement("button");
        deleteButtonElement.classList.add("btn", "btn-danger");
        deleteButtonElement.setAttribute("type", "button");
        deleteButtonElement.innerText = "Delete";
        deleteButtonElement.addEventListener("click", () => deleteQuotation(quotationId - 1));
        tableItemElement.appendChild(deleteButtonElement);

        rowElement.appendChild(tableItemElement);
}

function __closeModal() {
    overlay.classList.remove("visible");
    modal.classList.remove("visible");
}

function __openModal() {
    overlay.classList.add("visible");
    modal.classList.add("visible");
}

function attachModalEvents() {
    overlay.addEventListener("click", __closeModal);
}

fillQuotationsList();
attachModalEvents();