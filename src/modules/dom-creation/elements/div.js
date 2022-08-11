import { setAttributesOf } from "../../helper-functions/set-attributes-of";

const Div = (attributes) => {
    const div = document.createElement("div");
    setAttributesOf(div, attributes);
    const getDiv = () => div;
    return { getDiv };
};

export {
    Div,
};