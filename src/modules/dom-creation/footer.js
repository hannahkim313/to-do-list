import { appendChildren, setAttributesOf } from "./general-components/helper-functions";
import { createPara } from "./general-components/elements";
import { createGithubIcon } from "./general-components/image-elements";

const _createLink = () => {
    const link = document.createElement("a");
    const linkAttributes = {
        href: "",
    };
    setAttributesOf(link, linkAttributes);
    const elements = [
        createGithubIcon(),
        createPara("Hannah Kim"),
    ];
    appendChildren(link, elements);
    
    return link;
};

const createFooter = () => {
    const footer = document.createElement("footer");
    const elements = [
        _createLink(),
    ];
    appendChildren(footer, elements);

    return footer;
};

export {
    createFooter,
};