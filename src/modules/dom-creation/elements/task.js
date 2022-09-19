import * as method from "../general-components/helper-functions";
import * as element from "../html-elements";
import * as image from "../image-elements";

const _createLeftInfo = (data) => {
    const createToDoBtn = () => {
        const createBtnImg = () => {
            if (data.checked) return image.createCheckedIcon();
            else return image.createUncheckedIcon();
        };

        const btnAttributes = {
            type: "button",
        };
        const btn = element.createButton(btnAttributes);
        const elements = [
            createBtnImg(),
        ];
        method.appendChildren(btn, elements);

        return btn;
    };

    const createTaskName = () => {
        const createStrikethrough = () => {
            const strikeName = document.createElement("s");
            strikeName.textContent = data.name;
            const elements = [
                strikeName,
            ];
            const taskName = element.createPara();
            method.appendChildren(taskName, elements);
    
            return taskName;
        };

        if (data.checked) return createStrikethrough();
        else return element.createPara(data.name);
    };

    const leftInfoAttributes = {
        class: "left",
    };
    const leftInfo = element.createDiv(leftInfoAttributes);
    const elements = [
        createToDoBtn(),
        createTaskName(),
    ];
    method.appendChildren(leftInfo, elements);

    return leftInfo;
};

const _createRightInfo = (data) => {
    const createOverdue = () => {
        const overdue = element.createPara("Overdue");
        const overdueAttributes = {
            class: "overdue",
        };
        method.setAttributesOf(overdue, overdueAttributes);
    
        return overdue;
    };

    const createPriorityIcon = () => {
        if (data.priority === "low") return image.createLowPriorityIcon();
        if (data.priority === "medium") return image.createMediumPriorityIcon();
        if (data.priority === "high") return image.createHighPriorityIcon();
    };

    const createCollapsibleTaskBtn = () => {
        const btnAttributes = {
            type: "button",
            class: "expand-task",
        };
        const btn = element.createButton(btnAttributes);
        const elements = [
            image.createCollapsibleIcon(),
        ];
        method.appendChildren(btn, elements);

        return btn;
    };

    const rightInfoAttributes = {
        class: "right",
    };
    const rightInfo = element.createDiv(rightInfoAttributes);
    const elements = [
        element.createPara(data.dueDate),
        createPriorityIcon(),
        createCollapsibleTaskBtn(),
    ];
    if (data.overdue) elements.unshift(createOverdue());
    method.appendChildren(rightInfo, elements);

    return rightInfo;
};

const createTask = (data) => {
    const task = document.createElement("li");
    const classText = data.checked ? "task checked" : "task";
    const taskAttributes = {
        class: classText,
    };
    method.setAttributesOf(task, taskAttributes);
    const elements = [
        _createLeftInfo(data),
        _createRightInfo(data),
    ];
    method.appendChildren(task, elements);

    return task;
};

export {
    createTask,
};