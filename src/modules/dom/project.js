import * as element from "./html-elements";
import * as image from "./image-elements";
import * as method from "../helper-functions";
import * as taskMenu from "./task-menu";

const _createProjectOptions = () => {
    const createDropdownWrapper = () => {
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

            filters[0].firstElementChild.classList.add("selected");

            return filters;
        };

        const createDropdownMenu = () => {
            const menu = document.createElement("menu");
            const menuAttributes = {
                class: "dropdown-menu",
            };
            method.setAttributesOf(menu, menuAttributes);

            const filterNames = [
                "Priority: High to low",
                "Priority: Low to high",
                "Date: Newest to oldest",
                "Date: Oldest to newest",
            ];
            const filters = createDropdownFilters(filterNames);
            method.appendChildren(menu, filters);

            menu.style.visibility = "hidden";
            menu.style.opacity = "0";

            return menu;
        };

        const wrapperAttributes = {
            class: "dropdown-wrapper",
        };
        const dropdownWrapper = element.createDiv(wrapperAttributes);
        const elements = [
            createDropdownBtn(),
            createDropdownMenu(),
        ];
        method.appendChildren(dropdownWrapper, elements);

        return dropdownWrapper;
    };
    
    const createAddTaskBtn = () => {
        const btnAttributes = {
            type: "button",
            class: "add-task-btn",
        };
        const btn = element.createButton(btnAttributes);
        const elements = [
            image.createPlusIcon(false),
        ];
        method.appendChildren(btn, elements);
    
        return btn;
    };
    
    const createEditBtn = () => {
        const btnAttributes = {
            type: "button",
            class: "edit-project-btn"
        };
        const btn = element.createButton(btnAttributes);
        const elements = [
            image.createPencilIcon(),
        ];
        method.appendChildren(btn, elements);
    
        return btn;
    };

    const createDeleteBtn = () => {
        const btnAttributes = {
            type: "button",
            class: "delete-project-btn"
        };
        const btn = element.createButton(btnAttributes);
        const elements = [
            image.createTrashCanIcon(),
        ];
        method.appendChildren(btn, elements);
    
        return btn;
    };

    const optionsAttributes = {
        class: "options",
    };
    const options = element.createDiv(optionsAttributes);
    const elements = [
        createDropdownWrapper(),
        createAddTaskBtn(),
        createEditBtn(),
        createDeleteBtn(),
    ];
    method.appendChildren(options, elements);

    return options;
};

const create = (tasks) => {
    const getProjectName = () => {
        if (tasks) {
            return tasks[0].getProject();
        } else {
            return document.querySelector("footer").previousElementSibling.dataset.pageName;
        };
    };

    const projectName = getProjectName();
    const projectElementAttributes = {
        class: "project",
    };
    const projectElement = element.createArticle(projectElementAttributes);
    const elements = [
        element.createHeading("3", method.capitalize(method.undoKebabCase(projectName))),
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