import * as element from "./html-elements";
import * as image from "./image-elements";
import * as method from "../helper-functions";
import * as taskMenu from "./task-menu";

const _createProjectOptions = () => {
    const createDropdownContainer = () => {
        const createInput = () => {
            const input = element.createPara("Priority: High to low");
            const inputAttributes = {
                class: "input",
            };
            method.setAttributesOf(input, inputAttributes);
    
            return input;
        };
    
        const createDropdownBtn = () => {
            const dropdownAttributes = {
                type: "button",
                class: "dropdown collapsible",
            };
            const dropdown = element.createButton(dropdownAttributes);
            const elements = [
                createInput(),
                image.createCollapsibleIcon(),
            ];
            method.appendChildren(dropdown, elements);
        
            return dropdown;
        };

        const createDropdownFilters = (filterNames) => {
            const filters = [];
            for (const name of filterNames) {
                const filterAttributes = {
                    type: "button",
                    class: "sort-by-filter",
                };
                const filter = element.createButton(filterAttributes);

                const para = element.createPara(name);
                filter.appendChild(para);

                const li = document.createElement("li");
                li.appendChild(filter);

                filters.push(li);
            };

            return filters;
        };

        const createDropdownMenu = () => {
            const menu = document.createElement("menu");
            const menuAttributes = {
                class: "dropdown-menu",
            };
            method.setAttributesOf(menu, menuAttributes);

            const filterNames = [
                "Priority: Low to high",
                "Date: High to low",
                "Date: Low to high",
            ];
            const filters = createDropdownFilters(filterNames);
            method.appendChildren(menu, filters);

            menu.style.visibility = "hidden";
            menu.style.opacity = "0";

            return menu;
        };

        const containerAttributes = {
            class: "dropdown-container",
        };
        const dropdownContainer = element.createDiv(containerAttributes);
        const elements = [
            createDropdownBtn(),
            createDropdownMenu(),
        ];
        method.appendChildren(dropdownContainer, elements);

        return dropdownContainer;
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
        createDropdownContainer(),
        createAddTaskBtn(),
        createMoreOptionsBtn(),
    ];
    method.appendChildren(options, elements);

    return options;
};

const create = (tasks) => {
    const getProjectName = () => {
        if (tasks) {
            return tasks[0].project;
        } else {
            return document.querySelector("footer").previousElementSibling.dataset.pageName;
        };
    }

    const projectName = getProjectName();
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