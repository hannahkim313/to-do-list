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
    const githubIcon = _createLogo();
    const name = _createName();
    const link = document.createElement("a");
    link.setAttribute("href", "");
    appendChildren(link, githubIcon, name);
    return link;
};

const createFooter = () => {
    const link = _createLink();
    const footer = document.createElement("footer");
    appendChildren(footer, link);
    return footer;
};

export {
    createFooter,
};