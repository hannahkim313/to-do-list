import { appendChildren, setAttributesOf } from "../helper-functions";
import { createButton, createDiv, createImg, createPara } from "../elements";
import checkedImg from "../../../img/checkbox.svg";
import uncheckedImg from "../../../img/circle-outline.svg";
import lowPriorityImg from "../../../img/circle-filled-blue.svg";
import mediumPriorityImg from "../../../img/circle-filled-yellow.svg";
import highPriorityImg from "../../../img/circle-filled-red.svg";
import chevronDownImg from "../../../img/chevron-down.svg";

const _createLeftInfo = (data) => {
    const createToDoBtn = () => {
        const createBtnImg = () => {
            if (data.checked) return createImg({ src: checkedImg, alt: "Checked box" });
            else return createImg({ src: uncheckedImg, alt: "Unchecked box" });
        };

        const attributes = { type: "button" };
        const btn = createButton(attributes);
        const elements = [createBtnImg()];
        appendChildren(btn, elements);

        return btn;
    };

    const createTaskName = () => {
        const createStrikethrough = () => {
            const strikeName = document.createElement("s");
            strikeName.textContent = data.name;
            const elements = [strikeName];
            const taskName = createPara();
            appendChildren(taskName, elements);
    
            return taskName;
        };

        if (data.checked) return createStrikethrough();
        else return createPara(data.name);
    };

    const attributes = { class: "left" };
    const leftInfo = createDiv(attributes);
    const elements = [createToDoBtn(), createTaskName()];
    appendChildren(leftInfo, elements);

    return leftInfo;
};

const _createRightInfo = (data) => {
    const createPriority = () => {
        if (data.priority === "low") return createImg({ src: lowPriorityImg, alt: "Low priority" });
        if (data.priority === "medium") return createImg({ src: mediumPriorityImg, alt: "Medium priority" });
        if (data.priority === "high") return createImg({ src: highPriorityImg, alt: "High priority" });
    };

    const createExpandTaskBtn = () => {
        const attributes = { type: "button", class: "expand-task" };
        const btn = createButton(attributes);
        const elements = [createImg({ src: chevronDownImg, alt: "Click to expand task details" })];
        appendChildren(btn, elements);

        return btn;
    };

    const attributes = { class: "right" };
    const rightInfo = createDiv(attributes);
    const elements = [createPara(data.dueDate), createPriority(), createExpandTaskBtn()];
    appendChildren(rightInfo, elements);

    return rightInfo;
};

const createTask = (data) => {
    const classText = data.checked ? "task checked" : "task";
    const attributes = { class: classText };
    const task = document.createElement("li");
    setAttributesOf(task, attributes);
    const elements = [_createLeftInfo(data), _createRightInfo(data)];
    appendChildren(task, elements);

    return task;
};

export {
    createTask,
};