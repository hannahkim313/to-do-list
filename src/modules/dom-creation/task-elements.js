import { Task } from "../app-logic/factories/task";
import * as method from "./helper-functions";
import * as element from "./html-elements";
import * as image from "./image-elements";

const _createLeftInfo = (task) => {
    const createToDoBtn = () => {
        const createBtnImg = () => {
            if (task.getChecked()) return image.createCheckedIcon();
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
            strikeName.textContent = task.getTitle();
            const elements = [
                strikeName,
            ];
            const taskName = element.createPara();
            method.appendChildren(taskName, elements);
    
            return taskName;
        };
    
        if (task.getChecked()) return createStrikethrough();
        else return element.createPara(task.getTitle());
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

const _createRightInfo = (task) => {
    const createOverdue = () => {
        const overdue = element.createPara("Overdue");
        const overdueAttributes = {
            class: "overdue",
        };
        method.setAttributesOf(overdue, overdueAttributes);
    
        return overdue;
    };

    const createPriorityIcon = () => {
        if (task.getPriority() === "low") return image.createLowPriorityIcon();
        if (task.getPriority() === "medium") return image.createMediumPriorityIcon();
        if (task.getPriority() === "high") return image.createHighPriorityIcon();
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
        element.createPara(task.getDueDate()),
        createPriorityIcon(),
        createCollapsibleTaskBtn(),
    ];
    if (task.getOverdue()) elements.unshift(createOverdue());
    method.appendChildren(rightInfo, elements);

    return rightInfo;
};

const createTask = (data) => {
    const task = Task();
    task.setTitle(data.title);
    task.setDescription(data.description);
    task.setDueDate(data.dueDate);
    task.setPriority(data.priority);
    task.setOverdue(data.overdue);
    task.setChecked(data.checked);
    task.setProject(data.project);

    const taskElement = document.createElement("li");
    const classText = task.getChecked() ? "task checked" : "task";
    const taskAttributes = {
        class: classText,
    };
    method.setAttributesOf(taskElement, taskAttributes);
    const elements = [
        _createLeftInfo(task),
        _createRightInfo(task),
    ];
    method.appendChildren(taskElement, elements);

    return taskElement;
};

export {
    createTask,
};