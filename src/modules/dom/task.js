import * as element from "./html-elements";
import * as image from "./image-elements";
import * as method from "../helper-functions";
import { Task } from "../logic/factories/task-factory";

const create = (data) => {
    const createLeftInfo = (task) => {
        const isChecked = task.getChecked();
        const title = task.getTitle();

        const createToDoBtn = () => {
            const btnAttributes = {
                type: "button",
            };
            const btn = element.createButton(btnAttributes);
            const btnImg = isChecked ? image.createCheckedIcon() : image.createUncheckedIcon();
            const elements = [
                btnImg,
            ];
            method.appendChildren(btn, elements);
        
            return btn;
        };
        
        const createTaskName = () => {
            const createStrikethrough = () => {
                const strikeName = document.createElement("s");
                strikeName.textContent = title;
                const elements = [
                    strikeName,
                ];
                const taskName = element.createPara();
                method.appendChildren(taskName, elements);
        
                return taskName;
            };
        
            if (isChecked) {
                return createStrikethrough();
            } else {
                return element.createPara(title);
            };
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
    
    const createRightInfo = (task) => {
        const priority = task.getPriority();
        const dueDate = task.getDueDate();
        const isOverdue = task.getOverdue();

        const createOverdue = () => {
            const overdue = element.createPara("Overdue");
            const overdueAttributes = {
                class: "overdue",
            };
            method.setAttributesOf(overdue, overdueAttributes);
        
            return overdue;
        };
    
        const createPriorityIcon = () => {
            if (priority === "low") {
                return image.createLowPriorityIcon();
            };
            
            if (priority === "medium") {
                return image.createMediumPriorityIcon();
            };
            
            if (priority === "high") {
                return image.createHighPriorityIcon();
            };
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
            element.createPara(dueDate),
            createPriorityIcon(),
            createCollapsibleTaskBtn(),
        ];

        if (isOverdue) {
            elements.unshift(createOverdue());
        };

        method.appendChildren(rightInfo, elements);
    
        return rightInfo;
    };

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
    const taskElementAttributes = {
        class: classText,
    };
    method.setAttributesOf(taskElement, taskElementAttributes);
    const elements = [
        createLeftInfo(task),
        createRightInfo(task),
    ];
    method.appendChildren(taskElement, elements);

    return taskElement;
};

export {
    create,
};