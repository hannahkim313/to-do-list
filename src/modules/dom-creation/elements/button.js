import { setAttributesOf } from "../../helper-functions/set-attributes-of";

const Button = (attributes) => {
    const btn = document.createElement("button");
    setAttributesOf(btn, attributes);
    const getBtn = () => btn;
    return { getBtn };
};

export {
    Button,
};