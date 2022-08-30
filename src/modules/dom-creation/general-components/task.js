import { appendChildren, setAttributesOf } from "./helper-functions";
import { createButton, createDiv, createPara } from "./elements";
import {
    createCheckedIcon,
    createCollapsibleIcon,
    createHighPriorityIcon,
    createLowPriorityIcon,
    createMediumPriorityIcon,
    createUncheckedIcon
} from "./image-elements";

const _createLeftInfo = (data) => {
    const createToDoBtn = () => {
        const createBtnImg = () => {
            if (data.checked) return createCheckedIcon();
            else return createUncheckedIcon();
        };

        const btnAttributes = {
            type: "button",
        };
        const btn = createButton(btnAttributes);
        const elements = [
            createBtnImg(),
        ];
        appendChildren(btn, elements);

        return btn;
    };

    const createTaskName = () => {
        const createStrikethrough = () => {
            const strikeName = document.createElement("s");
            strikeName.textContent = data.name;
            const elements = [
                strikeName,
            ];
            const taskName = createPara();
            appendChildren(taskName, elements);
    
            return taskName;
        };

        if (data.checked) return createStrikethrough();
        else return createPara(data.name);
    };

    const leftInfoAttributes = {
        class: "left",
    };
    const leftInfo = createDiv(leftInfoAttributes);
    const elements = [
        createToDoBtn(),
        createTaskName(),
    ];
    appendChildren(leftInfo, elements);

    return leftInfo;
};

const _createRightInfo = (data) => {
    const createPriorityIcon = () => {
        if (data.priority === "low") return createLowPriorityIcon();
        if (data.priority === "medium") return createMediumPriorityIcon();
        if (data.priority === "high") return createHighPriorityIcon();
    };

    const createCollapsibleTaskBtn = () => {
        const btnAttributes = {
            type: "button",
            class: "expand-task",
        };
        const btn = createButton(btnAttributes);
        const elements = [
            createCollapsibleIcon(),
        ];
        appendChildren(btn, elements);

        return btn;
    };

    const rightInfoAttributes = {
        class: "right",
    };
    const rightInfo = createDiv(rightInfoAttributes);
    const elements = [
        createPara(data.dueDate),
        createPriorityIcon(),
        createCollapsibleTaskBtn(),
    ];
    appendChildren(rightInfo, elements);

    return rightInfo;
};

const createTask = (data) => {
    const task = document.createElement("li");
    const classText = data.checked ? "task checked" : "task";
    const taskAttributes = {
        class: classText,
    };
    setAttributesOf(task, taskAttributes);
    const elements = [
        _createLeftInfo(data),
        _createRightInfo(data),
    ];
    appendChildren(task, elements);

    return task;
};

export {
    createTask,
};