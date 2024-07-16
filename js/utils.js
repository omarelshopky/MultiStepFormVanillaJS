"use strict";

const includeHTML = (recursive = false) => {
    const elements = document.querySelectorAll('[include-html]');

    elements.forEach(element => {
        const file = element.getAttribute("include-html");

        if (file) {
            fetch(file)
                .then(response => {
                    if (response.ok) {
                        return response.text();
                    }

                    throw new Error('Network response was not ok.');
                })
                .then(data => {
                    element.innerHTML = data;
                    element.removeAttribute("include-html");

                    if (recursive) {
                        includeHTML();
                    }
                })
                .catch(error => {
                    element.innerHTML = "Page not found.";
                    console.error('There was a problem with the fetch operation:', error);
                });
        }
    });
}

const getURLPath = () => {
    return window.location.pathname;
}