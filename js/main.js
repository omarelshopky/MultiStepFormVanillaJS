"use strict";


/**
 * Constants
 */
const BASE_URL = "/MultiStepFormVanillaJS/";
const INCLUDE_HTML_ATTRIBUTE = "include-html";
const PAGES_HTML_DIR_PATH = "pages/";
const ROUTES = {
    "send" : "send-quotation.html",
    "list" : "list-quotations.html",
};
const DEFAULT_ROUTE = "send";

/**
 * Variables
 */
let quotationData = {};
let quotationForm = {};
let currentStep = 1;
let validForm = false;
let formButton = null;
let modal = null;
let overlay = null;


document.addEventListener("DOMContentLoaded", async () => {
    await handleRouting();

    let activeNavItem = document.querySelector(".nav-link.active");

    /**
     * Attach Events
     */

    // Nav Items click event
    const navItems = document.querySelectorAll(".nav-link");
    navItems.forEach(navItem => navItem.addEventListener("click", () => {
        const routePath = navItem.getAttribute("route");

        if (__getURLPath() === routePath) {
            return;
        }

        navigateToPage(routePath);

        navItem.classList.add("active");
        navItem.setAttribute("aria-current", "page");
        activeNavItem.classList.remove("active");
        activeNavItem.removeAttribute("aria-current");
        activeNavItem = navItem;
    }));
});