import * as element from "./html-elements";
import * as image from "./image-elements";
import * as method from "../helper-functions";
import * as taskMenu from "./task-menu";

const _createProjectOptions = () => {
    const createDropdown = () => {
        const createInput = () => {
            const input = element.createPara("Sort by: Priority");
            const inputAttributes = {
                class: "input",
            };
            method.setAttributesOf(input, inputAttributes);
            const elements = [
                image.createArrowDownIcon(),
            ];
            method.appendChildren(input, elements);
    
            return input;
        };
    
        const dropdownAttributes = {
            type: "button",
            class: "dropdown",
        };
        const dropdown = element.createButton(dropdownAttributes);
        const elements = [
            createInput(),
            image.createCollapsibleIcon(),
        ];
        method.appendChildren(dropdown, elements);
    
        return dropdown;
    };
    
    const createAddTaskBtn = () => {
        const btnAttributes = {
            type: "button",
        };
        const btn = element.createButton(btnAttributes);
        const elements = [
            image.createPlusIcon(false),
        ];
        method.appendChildren(btn, elements);
    
        return btn;
    };
    
    const createMoreOptionsBtn = () => {
        const btnAttributes = {
            type: "button",
        };
        const btn = element.createButton(btnAttributes);
        const elements = [
            image.createMoreOptionsIcon(),
        ];
        method.appendChildren(btn, elements);
    
        return btn;
    };

    const optionsAttributes = {
        class: "options",
    };
    const options = element.createDiv(optionsAttributes);
    const elements = [
        createDropdown(),
        createAddTaskBtn(),
        createMoreOptionsBtn(),
    ];
    method.appendChildren(options, elements);

    return options;
};

const create = (tasks) => {
    const projectName = tasks[0].project;
    const projectElementAttributes = {
        class: "project",
    };
    const projectElement = element.createArticle(projectElementAttributes);
    const elements = [
        element.createHeading("3", method.capitalize(projectName)),
        _createProjectOptions(),
        taskMenu.create(),
    ];
    projectElement.dataset.projectName = method.toKebabCase(projectName);
    method.appendChildren(projectElement, elements);

    return projectElement;
};

export {
    create,
};