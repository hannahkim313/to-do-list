import { setAttributesOf } from "../../helper-functions/set-attributes-of";

const Img = (attributes) => {
    const img = document.createElement("img");
    setAttributesOf(img, attributes);
    const getImg = () => img;
    return { getImg };
};

export {
    Img
};