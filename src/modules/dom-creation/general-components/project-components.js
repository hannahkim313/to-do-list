import * as method from "../helper-functions";
import * as element from "../html-elements";
import * as image from "../image-elements";

const createFilters = () => {
    const createFilterBtn = (name) => {
        const btnAttributes = {
            type: "button",
            class: name.replaceAll(" ", "-"),
        };
        const btn = element.createButton(btnAttributes);
        const elements = [
            element.createPara(method.capitalize(name)),
        ];
        method.appendChildren(btn, elements);

        return btn;
    };
    
    const filtersAttributes = {
        class: "filters",
    };
    const filters = element.createDiv(filtersAttributes);
    const elements = [
        createFilterBtn("all"),
        createFilterBtn("this week"),
        createFilterBtn("this month"),
    ];
    method.appendChildren(filters, elements);
    
    return filters;
};

const createEmptyMessage = (text, isNested) => {
    const message = element.createPara(text);
    const className = isNested ? "empty nested" : "empty";
    const messageAttributes = {
        class: className,
    };
    method.setAttributesOf(message, messageAttributes);

    return message;
};

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

const _createTaskMenu = (message) => {
    const menu = document.createElement("menu");
    const menuAttributes = {
        class: "tasks",
    };
    method.setAttributesOf(menu, menuAttributes);
    const elements = [
        message
    ];
    method.appendChildren(menu, elements);

    return menu;
};

const createDisplayedProjects = (name, message) => {
    const createPlaceholder = () => {
        const placeholderAttributes = {
            class: "project",
        };
        const placeholder = element.createArticle(placeholderAttributes);
        const elements = [
            element.createHeading("3", method.capitalize(name)),
            _createProjectOptions(),
            _createTaskMenu(message),
        ];
        method.appendChildren(placeholder, elements);
    
        return placeholder;
    };

    const sectionAttributes = {
        class: "projects",
    };
    const section = element.createDiv(sectionAttributes);
    const elements = [
        createPlaceholder(),
    ];
    method.appendChildren(section, elements);

    return section;
};

const createProject = () => {
    // Call when user adds new project
};


export {
    createFilters,
    createEmptyMessage,
    createDisplayedProjects,
    createProject,
};