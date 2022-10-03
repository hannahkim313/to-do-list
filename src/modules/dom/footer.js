import * as element from "./html-elements";
import * as image from "./image-elements";
import * as method from "../helper-functions";

const _createLink = () => {
    const link = document.createElement("a");
    const linkAttributes = {
        href: "",
    };
    method.setAttributesOf(link, linkAttributes);
    const elements = [
        image.createGithubIcon(),
        element.createPara("Hannah Kim"),
    ];
    method.appendChildren(link, elements);
    
    return link;
};

const create = () => {
    const footer = document.createElement("footer");
    const elements = [
        _createLink(),
    ];
    method.appendChildren(footer, elements);

    return footer;
};

export {
    create,
};