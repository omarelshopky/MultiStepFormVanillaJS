"use strict";


const RECURSIVE_COUNT = 2;


const includeHTML = async (recursiveCount = RECURSIVE_COUNT) => {
    const elements = document.querySelectorAll(`[${INCLUDE_HTML_ATTRIBUTE}]`);

    const fetchHTML = async (element) => {
        const file = element.getAttribute(INCLUDE_HTML_ATTRIBUTE);

        if (file) {
            try {
                const response = await fetch(file);

                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }

                element.innerHTML = await response.text();
                element.removeAttribute(INCLUDE_HTML_ATTRIBUTE);

                if (recursiveCount > 0) {
                    await includeHTML(recursiveCount - 1);
                }
            } catch (error) {
                element.innerHTML = "Page not found.";
                // console.error('There was a problem with the fetch operation:', error);
            }
        }
    }

    await Promise.all(Array.from(elements).map(fetchHTML));
}
