import { appendChildren } from "./helper-functions";
import { createHeading } from "./elements";
import { createAppLogo } from "./image-elements";

const createHeader = () => {
    const elements = [
        createAppLogo(),
        createHeading("1", "To-Do Manager"),
    ];
    const header = document.createElement("header");
    appendChildren(header, elements);
    
    return header;
};

export {
    createHeader,
};