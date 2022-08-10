import { appendChildren } from "../helper-functions/append-children";
import { Img } from "./elements/img";
import { Para } from "./elements/para";
import githubImg from "../../img/github.svg";

const _createLogo = () => {
    const attributes = {
        src: githubImg,
        alt: "Github icon",
    };
    return Img(attributes).getImg();
};

const _createName = () => Para("Hannah Kim").getPara();

const _createLink = () => {
    const linkElements = [
        _createLogo(),
        _createName()
    ];
    const link = document.createElement("a");
    link.setAttribute("href", "");
    appendChildren(link, linkElements);
    return link;
};

const createFooter = () => {
    const footerElements = [
        _createLink()
    ];
    const footer = document.createElement("footer");
    appendChildren(footer, footerElements);
    return footer;
};

export {
    createFooter,
};