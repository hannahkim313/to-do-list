import * as method from "../helper-functions";
import * as element from "../html-elements";
import * as image from "../image-elements";

const createCollapsibleContent = (name) => {
    if (name === undefined) name = "empty";

    const createItemName = () => {
        const itemNameAttributes = {
            class: "content-item",
        };
        const itemName = element.createDiv(itemNameAttributes);
        const elements = [
            image.createListIcon(),
        ];
        if (name === "empty") elements.push(element.createPara("Nothing has been added"));
        else elements.push(element.createPara(name));
        method.appendChildren(itemName, elements);
        
        return itemName;
    };
    
    const createItemBtn = () => {
        const btnAttributes = {
            type: "button",
        };
        const btn = element.createButton(btnAttributes);
        btn.dataset.name = name.toLowerCase().replaceAll(" ", "-");
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

const createSidebar = () => {
    const createCollapsible = () => {
        const projects = document.createElement("menu");
        const projectsAttributes = {
            class: "content",
        };
        method.setAttributesOf(projects, projectsAttributes);
        const elements = [
            createCollapsibleContent(),
        ];
        method.appendChildren(projects, elements);
    
        return projects;
    };
    
    const createSection = (section) => {
        const createSectionBtn = () => {
            const btnAttributes = {
                type: "button",
            };
            if (section.collapsible) btnAttributes.class = `${section.name} collapsible`;
            const sectionBtn = element.createButton(btnAttributes);
            sectionBtn.dataset.name = section.name.replaceAll(" ", "-");
            const elements = [
                section.icon,
                element.createPara(method.capitalize(section.name)),
            ];
            if (section.collapsible) elements.push(image.createCollapsibleIcon());
            method.appendChildren(sectionBtn, elements);
    
            return sectionBtn;
        };
    
        const sectionElement = document.createElement("li");
        const elements = [
            createSectionBtn(),
        ];
        if (section.collapsible) elements.push(createCollapsible(section));
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
    const defaultSections = [
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
        createMenu(defaultSections),
        createAddProjectBtn(),
    ];
    method.appendChildren(sidebarElement, elements);

    return sidebarElement;
};

export {
    createCollapsibleContent,
    createSidebar,
};