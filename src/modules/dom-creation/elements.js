import { setAttributesOf } from "./helper-functions";

const createArticle = (attributes) => {
    const article = document.createElement("article");
    setAttributesOf(article, attributes);
    
    return article;
};

const createButton = (attributes) => {
    const btn = document.createElement("button");
    setAttributesOf(btn, attributes);
    
    return btn;
};

const createDiv = (attributes) => {
    const div = document.createElement("div");
    setAttributesOf(div, attributes);
    
    return div;  
};

const createHeading = (num, text) => {
    const heading = document.createElement(`h${num}`);
    heading.textContent = text;
    
    return heading;
};

const createImg = ({ src, alt } = {}) => {
    const img = document.createElement("img");
    const attributes = { src: src, alt: alt };
    setAttributesOf(img, attributes);
    
    return img;
};

const createPara = (text) => {
    const para = document.createElement("p");
    para.textContent = text;
    
    return para;
};

export {
    createArticle,
    createButton,
    createDiv,
    createHeading,
    createImg,
    createPara
};