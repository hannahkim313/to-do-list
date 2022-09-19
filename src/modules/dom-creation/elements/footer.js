import * as method from "../helper-functions";
import * as element from "../html-elements";
import * as image from "../image-elements";

const createFooter = () => {
    const createLink = () => {
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

    const footer = document.createElement("footer");
    const elements = [
        createLink(),
    ];
    method.appendChildren(footer, elements);

    return footer;
};

export {
    createFooter,
};