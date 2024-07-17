"use strict";


const RECURSIVE_COUNT = 1;


const includeHTML = async (recursiveCount = RECURSIVE_COUNT) => {
    const elements = document.querySelectorAll(`[${INCLUDE_HTML_ATTRIBUTE}]`);

    await Promise.all(Array.from(elements).map(async (element) => {
        const file = element.getAttribute(INCLUDE_HTML_ATTRIBUTE);

        if (file) {
            try {
                const response = await fetch(file);

                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }

                element.innerHTML = await response.text();
                element.removeAttribute(INCLUDE_HTML_ATTRIBUTE);
            } catch (error) {
                element.innerHTML = "Page not found.";
                // console.error('There was a problem with the fetch operation:', error);
            }
        }
    }));


    if (recursiveCount <= 0) {
        __regenerateScriptElements();

        return;
    }

    await includeHTML(recursiveCount - 1);
}

const __regenerateScriptElements = () => {
    const scripts = document.querySelectorAll("script.regenerate-script");

    scripts.forEach(oldScriptElement => {
        const scriptElement = document.createElement("script");
        scriptElement.setAttribute("src", oldScriptElement.src);
        oldScriptElement.parentNode.replaceChild(scriptElement, oldScriptElement);
    });
}