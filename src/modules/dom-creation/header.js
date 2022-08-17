import { appendChildren, setAttributesOf } from "./helper-functions";
import { createHeading, createImg } from "./elements";
import logoImg from "../../img/logo.svg";

const _createLogo = () => {
    const img = createImg({ src: logoImg, alt: "Bulleted list icon" });
    const attributes = { class: "logo" };
    setAttributesOf(img, attributes);

    return img;
};

const createHeader = () => {
    const elements = [_createLogo(), createHeading("1", "To-Do Manager")];
    const header = document.createElement("header");
    appendChildren(header, elements);
    
    return header;
};

export {
    createHeader,
};