"use strict";


const handleRouting = async () => {
    __setRootContent(
        __getRequestedPageTemplatePath()
    );
    await includeHTML();
}

const navigateToPage = async (routePath) => {
    __setURLPath(routePath);
    await handleRouting();
}

const __getURLPath = () => {
    return window.location.pathname.replace(BASE_URL, "");
}

const __setURLPath = (newPath) => {
    window.history.replaceState({}, newPath, BASE_URL + newPath);
}

const __getQueryParameter = (parameterKey) => {
    const queryParams = new URLSearchParams(window.location.search);

    return queryParams.get(parameterKey);
}

const __setQueryParameters = (newQueryParams) => {
    const queryParams = new URLSearchParams(window.location.search);
    
    Object.keys(newQueryParams).forEach(newQueryParamKey => {
        queryParams.set(newQueryParamKey, newQueryParams[newQueryParamKey]);
    });

    history.replaceState(null, null, `?${queryParams.toString()}`);
}

const __getRequestedPageTemplatePath = () => {
    const requestedPath = __getURLPath();

    // In case of not-found return send quotation page
    if (!Object.keys(ROUTES).includes(requestedPath)) {
        __setURLPath(DEFAULT_ROUTE);

        return __getPageTemplatePath(DEFAULT_ROUTE);
    }

    return __getPageTemplatePath(requestedPath);
}

const __getPageTemplatePath = (routePath) => {
    return PAGES_HTML_DIR_PATH + ROUTES[routePath]
}

const __setRootContent = (pageTemplatePath) => {
    const rootElement = document.querySelector(".root");

    rootElement.setAttribute(INCLUDE_HTML_ATTRIBUTE, pageTemplatePath);
}

