import { Img } from "../dom-creation/elements/img";
import logoImg from "../../img/logo.svg";

const createLogo = () => {
    const img = Img({ src: logoImg, alt: "Bulleted list icon" });
    const logo = img.get();
    logo.setAttribute("class", "logo");
    return logo;
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