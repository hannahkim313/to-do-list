import * as method from "../helper-functions";

const display = (element) => {
    const elementName = element.dataset.pageName;
    
    if (elementName === "empty") {
        return;
    };

    const pages = document.querySelectorAll("body > main");
    for (const page of pages) {
        const pageName = page.dataset.pageName;
        
        if (elementName === pageName) {
            page.style.display = "grid";
        } else {
            page.style.display = "none";
        };
    };
};

const addToDOM = (page) => {
    const body = document.querySelector("body");
    const footer = document.querySelector("footer");
    body.insertBefore(page, footer);
};

// Uncomment when implementing add/remove features so an empty message
// is displayed when there are no projects/tasks available.

// const createEmptyMessage = (text, isNested) => {
//     const message = element.createPara(text);
//     const className = isNested ? "empty nested" : "empty";
//     const messageAttributes = {
//         class: className,
//     };
//     method.setAttributesOf(message, messageAttributes);

//     return message;
// };

const create = (name, elements) => {
    const kebabName = method.toKebabCase(name.toLowerCase());
    const page = document.createElement("main");
    const pageAttributes = {
        class: `${kebabName} page`,
    };
    method.setAttributesOf(page, pageAttributes);
    page.dataset.pageName = kebabName;
    page.style.display = "none";
    method.appendChildren(page, elements);
    
    return page;
};

export {
    display,
    addToDOM,
    create,
};