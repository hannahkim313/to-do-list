import { setAttributesOf } from "../helper-functions";

const createPage = (name) => {
    const page = document.createElement("main");
    const pageAttributes = {
        id: `${name}-page`,
    };
    setAttributesOf(page, pageAttributes);
    
    return page;
};

export {
    createPage,
};