import { appendChildren } from "./general-components/helper-functions";
import { createHeading } from "./general-components/elements";
import { createAppLogo } from "./general-components/image-elements";

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