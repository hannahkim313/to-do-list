import * as library from "../logic/functions/library-functions";
import * as method from "../helper-functions";
import * as element from "./html-elements";
import * as image from "./image-elements";

const _createSubsection = (name) => {
    if (!name) {
        name = "empty";
    };

    const createItemName = () => {
        const itemNameAttributes = {
            class: "subsection",
        };
        const itemName = element.createDiv(itemNameAttributes);
        const elements = [
            image.createListIcon(),
        ];

        if (name === "empty") {
            elements.push(element.createPara("There are no projects."));
        } else {
            elements.push(element.createPara(name));
        };
        
        method.appendChildren(itemName, elements);
        
        return itemName;
    };
    
    const createItemBtn = () => {
        const btnAttributes = {
            type: "button",
        };
        const btn = element.createButton(btnAttributes);
        btn.dataset.pageName = method.toKebabCase(name.toLowerCase());
        const elements = [
            createItemName(),
        ];
        method.appendChildren(btn, elements);

        return btn;
    };

    const item = document.createElement("li");
    const elements = [
        createItemBtn(),
    ];
    method.appendChildren(item, elements);

    return item;
};

const create = () => {
    const createCollapsible = () => {
        const projects = document.createElement("menu");
        const projectsAttributes = {
            class: "subsections",
        };
        method.setAttributesOf(projects, projectsAttributes);
        const elements = [
            _createSubsection(),
        ];
        method.appendChildren(projects, elements);
    
        return projects;
    };
    
    const createSection = (section) => {
        const createSectionBtn = () => {
            const btnAttributes = {
                type: "button",
            };
            const elements = [
                section.icon,
                element.createPara(method.capitalize(section.name)),
            ];

            if (section.collapsible) {
                btnAttributes.class = `${section.name} collapsible`;
                elements.push(image.createCollapsibleIcon());
            };

            const sectionBtn = element.createButton(btnAttributes);
            sectionBtn.dataset.pageName = method.toKebabCase(section.name);
            method.appendChildren(sectionBtn, elements);
    
            return sectionBtn;
        };
    
        const sectionElement = document.createElement("li");
        const elements = [
            createSectionBtn(),
        ];
        
        if (section.collapsible) {
            elements.push(createCollapsible(section));
        };

        method.appendChildren(sectionElement, elements);
    
        return sectionElement;
    };
    
    const createMenu = (sections) => {
        const menu = document.createElement("menu");
        const menuAttributes = {
            class: "sidebar-sections",
        };
        method.setAttributesOf(menu, menuAttributes);
        
        const elements = [];
        for (const section of sections) {
            elements.push(createSection(section));
        };

        method.appendChildren(menu, elements);
    
        return menu;
    };
    
    const createAddProjectBtn = () => {
        const btnAttributes = {
            type: "button",
            class: "add-project-btn",
        };
        const btn = element.createButton(btnAttributes);
        const elements = [
            image.createPlusIcon(true),
            element.createPara("Add project"),
        ];
        method.appendChildren(btn, elements);
    
        return btn;
    };

    const sidebarElement = document.createElement("nav");
    const sidebarAttributes = {
        class: "sidebar",
    };
    method.setAttributesOf(sidebarElement, sidebarAttributes);
    const mainSections = [
        {
            name: "home",
            icon: image.createHomeIcon(),
        },
        {
            name: "today",
            icon: image.createTodayIcon(),
        },
        {
            name: "upcoming",
            icon: image.createUpcomingIcon(),
        },
        {
            name: "projects",
            icon: image.createProjectsIcon(),
            collapsible: true,
        },
    ];
    const elements = [
        createMenu(mainSections),
        createAddProjectBtn(),
    ];
    method.appendChildren(sidebarElement, elements);

    return sidebarElement;
};

const addSubsection = (name, section) => {
    const subsections = document.querySelector(`.${section} + .subsections`);
    const firstSubsection = subsections.querySelector("li");
    
    if (firstSubsection.firstElementChild.dataset.pageName === "empty") {
        firstSubsection.remove();
    };
    
    const subsection = _createSubsection(name);
    subsections.appendChild(subsection);
};

const createAlerts = (projectName) => {
    const createAlert = (name, num) => {
        const alert = element.createPara();
        const alertAttributes = {
            class: name,
        };
        method.setAttributesOf(alert, alertAttributes);
        const strong = document.createElement("strong");
        strong.textContent = num;
        const elements = [
            strong,
        ];
        method.appendChildren(alert, elements);

        return alert;
    };

    const alertsAttributes = {
        class: "alerts",
    };
    const alerts = document.createElement("aside");
    method.setAttributesOf(alerts, alertsAttributes);
    const numOverdue = library.getTaskStats(projectName, "overdue");
    const numRemaining = library.getTaskStats(projectName, "remaining");
    const elements = [];

    if (numOverdue > 0) {
        elements.push(createAlert("overdue", numOverdue));
    };

    if (numRemaining > 0) {
        elements.push(createAlert("remaining", numRemaining));
    };

    method.appendChildren(alerts, elements);
    
    return alerts;
};

const updateSubsectionName = (newName) => {
    const currentProjectName = document.querySelector(".active").closest("article").querySelector("h3").textContent;

    const subsectionNames = document.querySelectorAll(".subsection p");
    for (const subsectionName of subsectionNames) {
        if (subsectionName.textContent === currentProjectName) {
            subsectionName.textContent = newName;

            subsectionName.closest("button").dataset.pageName = method.toKebabCase(newName.toLowerCase());

            break;
        };
    };
};

const _createEmptyMessage = () => {
    const listIcon = image.createListIcon();
    
    const messageAttributes = {
        class: "empty",
    };
    const message = element.createPara("There are no projects.");
    method.setAttributesOf(message, messageAttributes);
    
    const elements = [
        listIcon,
        message,
    ];

    const subsectionAttributes = {
        class: "subsection",
    };
    const subsection = element.createDiv(subsectionAttributes);
    method.setAttributesOf(subsection, subsectionAttributes);
    subsection.dataset.pageName = "empty";
    method.appendChildren(subsection, elements);
    
    const li = document.createElement("li");
    li.appendChild(subsection);
    
    const subsections = document.querySelector(".subsections");
    subsections.appendChild(li);
};

const deleteSubsection = (projectName) => {
    const subsections = document.querySelector(".subsections");
    const subsection = subsections.querySelector(`button[data-page-name="${projectName}"]`).closest("li");
    subsection.remove();

    if (subsections.childElementCount === 0) {
        _createEmptyMessage();
    };
};

export {
    create,
    addSubsection,
    createAlerts,
    updateSubsectionName,
    deleteSubsection,
};