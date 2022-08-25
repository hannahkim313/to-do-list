import { appendChildren, setAttributesOf, capitalize } from "./helper-functions";
import { createArticle, createHeading, createButton, createPara, createDiv } from "./elements";
import { createTask } from "./task";
import {
    createArrowDownIcon,
    createExpandIcon,
    createMoreOptionsIcon,
    createPlusDarkIcon
} from "./image-elements";

const _createProjectOptions = () => {
    const createDropdown = () => {
        const createInput = () => {
            const input = createPara("Sort by: Priority");
            const inputAttributes = {
                class: "input",
            };
            setAttributesOf(input, inputAttributes);
            const elements = [
                createArrowDownIcon(),
            ];
            appendChildren(input, elements);
    
            return input;
        };
    
        const dropdownAttributes = {
            type: "button",
            class: "dropdown",
        };
        const dropdown = createButton(dropdownAttributes);
        const elements = [
            createInput(),
            createExpandIcon(),
        ];
        appendChildren(dropdown, elements);
    
        return dropdown;
    };
    
    const createAddTaskBtn = () => {
        const btnAttributes = {
            type: "button",
        };
        const btn = createButton(btnAttributes);
        const elements = [
            createPlusDarkIcon(),
        ];
        appendChildren(btn, elements);
    
        return btn;
    };
    
    const createMoreOptionsBtn = () => {
        const btnAttributes = {
            type: "button",
        };
        const btn = createButton(btnAttributes);
        const elements = [
            createMoreOptionsIcon(),
        ];
        appendChildren(btn, elements);
    
        return btn;
    };

    const optionsAttributes = {
        class: "options",
    };
    const options = createDiv(optionsAttributes);
    const elements = [
        createDropdown(),
        createAddTaskBtn(),
        createMoreOptionsBtn(),
    ];
    appendChildren(options, elements);

    return options;
};

const _createTaskMenu = (projectData) => {
    const createProjectTasks = () => {
        const tasks = [];
        for (const data of Object.values(projectData)) {
            tasks.push(createTask(data));
        };

        return tasks;
    };

    const menu = document.createElement("menu");
    const menuAttributes = {
        class: "tasks",
    };
    setAttributesOf(menu, menuAttributes);
    appendChildren(menu, createProjectTasks());

    return menu;
};

const createProjectContent = (projectName, projectData) => {
    const projectAttributes = {
        class: "project",
    };
    const project = createArticle(projectAttributes);
    const elements = [
        createHeading("3", capitalize(projectName)),
        _createProjectOptions(),
        _createTaskMenu(projectData),
    ];
    appendChildren(project, elements);

    return project;
};

export {
    createProjectContent,
};