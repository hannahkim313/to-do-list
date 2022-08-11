import { appendChildren } from "../../helper-functions/append-children";
import { Div } from "../elements/div";
import { Img } from "../elements/img";
import overviewImg from "../../../img/overview.jpg"

const _createImg = () => {
    const attributes = {
        src: overviewImg,
        alt: "Foggy autumnal forest"
    };
    return Img(attributes).getImg();
};

const createImgSection = () => {
    const img = [
        _createImg()
    ];
    const attributes = {
        class: "img-container"
    };
    const section = Div(attributes).getDiv();
    appendChildren(section, img);
    return section;
};

export {
    createImgSection,
};