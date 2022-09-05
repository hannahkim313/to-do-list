import { createPara } from "./elements";
import { setAttributesOf } from "./helper-functions";

const createEmptyMessage = (text) => {
    const message = createPara(text);
    const messageAttributes = {
        class: "empty",
    };
    setAttributesOf(message, messageAttributes);

    return message;
};

export {
    createEmptyMessage,
};