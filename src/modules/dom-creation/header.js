import { Img } from "../dom-creation/elements/img";
import logoImg from "../../img/logo.svg";

const createLogo = () => {
    const logo = Img();
    logo.initialize({ src: logoImg, alt: "Bulleted list icon" });
    logo.setClass("logo");
    return logo.get();
};

const createHeading = () => {
    const heading = document.createElement("h1");
    heading.textContent = "To-Do Manager";
    return heading;
};

const createHeader = () => {
    const logo = createLogo();
    const heading = createHeading();
    const header = document.createElement("header");
    header.append(logo, heading);
    return header;
};

export {
    createHeader,
}