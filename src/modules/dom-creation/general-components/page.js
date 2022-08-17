import { setAttributesOf } from "../helper-functions";

const createPage = (name) => {
    const page = document.createElement("main");
    const attributes = { id: `${name}-page` };
    setAttributesOf(page, attributes);
    
    return page;
};

export {
    createPage,
};