import { appendChildren } from "../helper-functions/append-children";
import { Img } from "../dom-creation/elements/img";
import logoImg from "../../img/logo.svg";

const _createLogo = () => {
    const attributes = {
        src: logoImg,
        alt: "Bulleted list icon",
        class: "logo",
    };
    return Img(attributes).getImg();
};

const _createHeading = () => {
    const heading = document.createElement("h1");
    heading.textContent = "To-Do Manager";
    return heading;
};

const createHeader = () => {
    const headerElements = [
        _createLogo(),
        _createHeading()
    ];
    const header = document.createElement("header");
    appendChildren(header, headerElements);
    return header;
};

export {
    createHeader,
}