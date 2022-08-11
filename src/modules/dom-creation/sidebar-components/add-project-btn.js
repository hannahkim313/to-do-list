import { appendChildren } from "../../helper-functions/append-children";
import { Para } from "../elements/para";
import { Button } from "../elements/button";
import { createPlusLightIcon } from "../page-components/plus-light-icon";

const createAddProjectBtn = () => {
    const btnElements = [
        createPlusLightIcon(),
        Para("Add project").getPara(),
    ];
    const btnAttributes = {
        type: "button",
    };
    const btn = Button(btnAttributes).getBtn();
    appendChildren(btn, btnElements);
    return btn;
};

export {
    createAddProjectBtn,
};