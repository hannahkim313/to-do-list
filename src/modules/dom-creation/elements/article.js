import { setAttributesOf } from "../../helper-functions/set-attributes-of";

const Article = (attributes) => {
    const article = document.createElement("article");
    setAttributesOf(article, attributes);
    const getArticle = () => article;
    return { getArticle };
};

export {
    Article,
};