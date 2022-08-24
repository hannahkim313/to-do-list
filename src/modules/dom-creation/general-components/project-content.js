import { appendChildren, setAttributesOf, capitalize } from "../helper-functions";
import { createArticle, createHeading, createButton, createImg, createPara, createDiv } from "../elements";
import { createTask } from "./task";
import chevronDownImg from "../../../img/chevron-down.svg";
import arrowDownImg from "../../../img/arrow-down.svg";
import plusDarkImg from "../../../img/plus-dark.svg";
import moreOptionsImg from "../../../img/dots-horizontal.svg";

const _createProjectOptions = () => {
    const createDropDown = () => {
        const createInput = () => {
            const attributes = { class: "input" };
            const input = createPara("Sort by: Priority");
            setAttributesOf(input, attributes);
            const elements = [createImg({ src: arrowDownImg, alt: "High to low" })];
            appendChildren(input, elements);
    
            return input;
        };
    
        const attributes = { type: "button", class: "dropdown" };
        const dropDown = createButton(attributes);
        const elements = [
            createInput(),
            createImg({ src: chevronDownImg, alt: "Click to expand sort by options" })
        ];
        appendChildren(dropDown, elements);
    
        return dropDown;
    };
    
    const createAddTaskBtn = () => {
        const attributes = { type: "button" };
        const btn = createButton(attributes);
        const elements = [createImg({ src: plusDarkImg, alt: "Plus icon" })];
        appendChildren(btn, elements);
    
        return btn;
    };
    
    const createMoreOptionsBtn = () => {
        const attributes = { type: "button" };
        const btn = createButton(attributes);
        const elements = [createImg({ src: moreOptionsImg, alt: "Click for more options" })];
        appendChildren(btn, elements);
    
        return btn;
    };

    const attributes = { class: "options" };
    const options = createDiv(attributes);
    const elements = [createDropDown(), createAddTaskBtn(), createMoreOptionsBtn()];
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
    const attributes = { class: "tasks" };
    setAttributesOf(menu, attributes);
    appendChildren(menu, createProjectTasks());

    return menu;
};

const createProjectContent = (projectName, projectData) => {
    const attributes = { class: "project" };
    const project = createArticle(attributes);
    const elements = [
        createHeading("3", capitalize(projectName)),
        _createProjectOptions(),
        _createTaskMenu(projectData)
    ];
    appendChildren(project, elements);

    return project;
};

export {
    createProjectContent,
};