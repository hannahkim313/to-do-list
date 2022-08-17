import { appendChildren, setAttributesOf } from "./helper-functions";
import { createImg, createPara } from "./elements";
import githubImg from "../../img/github.svg";

const _createLink = () => {
    const link = document.createElement("a");
    const attributes = { href: "" };
    setAttributesOf(link, attributes);
    const elements = [
        createImg({ src: githubImg, alt: "Github icon" }),
        createPara("Hannah Kim")
    ];
    appendChildren(link, elements);
    
    return link;
};

const createFooter = () => {
    const footer = document.createElement("footer");
    const elements = [_createLink()];
    appendChildren(footer, elements);

    return footer;
};

export {
    createFooter,
};