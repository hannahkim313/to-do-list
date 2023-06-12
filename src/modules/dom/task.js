import * as element from "./html-elements";
import * as image from "./image-elements";
import * as method from "../helper-functions";

const create = (data) => {
    const createLeftInfo = () => {
        const isChecked = data.getChecked();
        const title = data.getTitle();

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
    
    const createRightInfo = () => {
        const priority = data.getPriority();
        const dueDate = data.getDueDate();
        const isOverdue = data.getOverdue();

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

    const taskElement = document.createElement("li");
    const classText = data.getChecked() ? "task checked" : "task";
    const taskElementAttributes = {
        class: `collapsible ${classText}`,
    };
    method.setAttributesOf(taskElement, taskElementAttributes);
    const elements = [
        createLeftInfo(),
        createRightInfo(),
    ];
    method.appendChildren(taskElement, elements);

    return taskElement;
};

export {
    create,
};