import { setAttributesOf } from "../../helper-functions/set-attributes-of";
import { appendChildren } from "../../helper-functions/append-children";
import { Para } from "../elements/para";
import { Div } from "../elements/div";

const _createNumDate = () => {
    const numDate = Para("8").getPara();
    const attributes = {
        class: "num-date"
    };
    setAttributesOf(numDate, attributes);
    return numDate;
};

const _createFullDate = () => {
    const dateElements = [
        Para("Wed,").getPara(),
        Para("Jun 2022").getPara()
    ];
    const attributes = {
        class: "full-date"
    };
    const fullDate = Div(attributes).getDiv();
    appendChildren(fullDate, dateElements);
    return fullDate;
};

// Add placeholder date and update when implementing app logic of getting real-time date.
const createDateSection = () => {
    const dateElements = [
        _createNumDate(),
        _createFullDate()
    ];
    const attributes = {
        class: "date-container",
    };
    const dateSection = Div(attributes).getDiv();
    appendChildren(dateSection, dateElements);
    return dateSection;
};

export {
    createDateSection,
};