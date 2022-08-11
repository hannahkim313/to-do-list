import { Img } from "../elements/img";
import logoImg from "../../../img/logo.svg";

const createLogo = () => {
    const attributes = {
        src: logoImg,
        alt: "Bulleted list icon",
        class: "logo",
    };
    return Img(attributes).getImg();
};

export {
    createLogo,
};