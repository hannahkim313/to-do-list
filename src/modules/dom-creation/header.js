import { appendChildren } from "../helper-functions/append-children";
import { createLogo } from "./header-components/logo";
import { createHeading } from "./header-components/heading";

const createHeader = () => {
    const headerElements = [
        createLogo(),
        createHeading()
    ];
    const header = document.createElement("header");
    appendChildren(header, headerElements);
    return header;
};

export {
    createHeader,
};