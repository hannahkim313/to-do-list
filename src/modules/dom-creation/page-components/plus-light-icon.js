import { Img } from "../elements/img";
import plusLightImg from "../../../img/plus-light.svg";

const createPlusLightIcon = () => {
    const attributes = {
        src: plusLightImg,
        alt: "Plus icon",
        class: "plus-light",
    };
    return Img(attributes).getImg();
};

export {
    createPlusLightIcon,
};