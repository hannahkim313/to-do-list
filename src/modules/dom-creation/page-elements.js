import * as method from "./helper-functions";

const createPage = (name, elements) => {
    const kebabName = method.toKebabCase(name.toLowerCase());

    const page = document.createElement("main");
    const pageAttributes = {
        class: `${kebabName} page`,
    };
    method.setAttributesOf(page, pageAttributes);

    page.dataset.name = kebabName;
    page.style.display = "none";

    method.appendChildren(page, elements);
    
    return page;
};

export {
    createPage,
};