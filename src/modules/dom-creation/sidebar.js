import { appendChildren, setAttributesOf } from "./general-components/helper-functions";
import { createPara, createButton, createDiv } from "./general-components/elements";
import {
    createExpandIcon,
    createHomeIcon,
    createListIcon,
    createPlusLightIcon,
    createProjectsIcon,
    createTodayIcon,
    createUpcomingIcon
} from "./general-components/image-elements";

const _createProjects = (projectsData) => {
    const createProject = (data) => {
        const createProjectName = () => {
            const projectNameAttributes = {
                class: "project-name",
            };
            const projectName = createDiv(projectNameAttributes);
            const elements = [
                createListIcon(),
                createPara(data.name),
            ];
            appendChildren(projectName, elements);

            return projectName;
        };
    
        const createProjectAlerts = () => {
            const createOverdue = (num) => {
                const overdue = createPara(num);
                const overdueAttributes = {
                    class: "overdue",
                };
                setAttributesOf(overdue, overdueAttributes);

                return overdue;
            };

            const createRemaining = (num) => {
                const remaining = createPara(num);
                const remainingAttributes = {
                    class: "remaining",
                };
                setAttributesOf(remaining, remainingAttributes);

                return remaining;
            };

            const alertsAttributes = {
                class: "alerts",
            };
            const alerts = document.createElement("aside");
            setAttributesOf(alerts, alertsAttributes);
            const elements = [];
            if (data.overdue) elements.push(createOverdue(data.overdue));
            if (data.remaining) elements.push(createRemaining(data.remaining));
            appendChildren(alerts, elements);

            return alerts;
        };
        
        const createProjectBtn = () => {
            const btnAttributes = {
                type: "button",
            };
            const btn = createButton(btnAttributes);
            const elements = [
                createProjectName(),
                createProjectAlerts(),
            ];
            appendChildren(btn, elements);
    
            return btn;
        };

        const project = document.createElement("li");
        const projectAttributes = {
            class: data.name.toLowerCase().replaceAll(" ", "-"),
        };
        setAttributesOf(project, projectAttributes);
        const elements = [
            createProjectBtn(),
        ];
        appendChildren(project, elements);

        return project;
    };
    
    const elements = [];
    for (const data of projectsData) {
        elements.push(createProject(data));
    };
    const projects = document.createElement("menu");
    const projectsAttributes = {
        class: "sidebar-projects",
    };
    setAttributesOf(projects, projectsAttributes);
    appendChildren(projects, elements);

    return projects;
};

const _createSection = (sectionName, data) => {
    const createSectionBtn = () => {
        const btnAttributes = data.expandable ? { type: "button", class: "expandable" } : { type: "button" };
        const sectionBtn = createButton(btnAttributes);
        const elements = [
            data.icon,
            createPara(data.text),
        ];
        if (data.expandable) elements.push(createExpandIcon());
        appendChildren(sectionBtn, elements);

        return sectionBtn;
    };

    const section = document.createElement("li");
    const sectionAttributes = {
        class: sectionName,
    };
    setAttributesOf(section, sectionAttributes);
    const elements = [
        createSectionBtn(),
    ];
    if (sectionName === "projects") {
        const projectsData = Object.values(data.projectsList);
        elements.push(_createProjects(projectsData));
    };
    appendChildren(section, elements);

    return section;
};

const _createSections = (sectionsData) => {
    const sections = [];
    for (const [sectionName, data] of Object.entries(sectionsData)) {
        sections.push(_createSection(sectionName, data));
    };
    
    return sections;
};

const _createMenu = (sectionsData) => {
    const menu = document.createElement("menu");
    const menuAttributes = {
        class: "sidebar-sections",
    };
    setAttributesOf(menu, menuAttributes);
    const elements = _createSections(sectionsData);
    appendChildren(menu, elements);

    return menu;
};

const _createAddProjectBtn = () => {
    const btnAttributes = {
        type: "button",
        class: "add-project-btn",
    };
    const btn = createButton(btnAttributes);
    const elements = [
        createPlusLightIcon(),
        createPara("Add project"),
    ];
    appendChildren(btn, elements);

    return btn;
};

const createSidebar = () => {
    const sidebar = document.createElement("nav");
    const sidebarAttributes = {
        class: "sidebar",
    };
    setAttributesOf(sidebar, sidebarAttributes);
    const sectionsData = {
        home: {
            icon: createHomeIcon(),
            text: "Home",
        },
        today: {
            icon: createTodayIcon(),
            text: "Today",
        },
        upcoming: {
            icon: createUpcomingIcon(),
            text: "Upcoming",
        },
        projects: {
            icon: createProjectsIcon(),
            text: "Projects",
            expandable: true,
            projectsList: {
                errands: {
                    name: "Errands",
                    overdue: "1",
                    remaining: "2",
                },
                roadTrip: {
                    name: "Road Trip",
                    remaining: "7",
                },
                work: {
                    name: "Work",
                    overdue: "1",
                    remaining: "2",
                },
            },
        },
    };
    const elements = [
        _createMenu(sectionsData),
        _createAddProjectBtn(),
    ];
    appendChildren(sidebar, elements);

    return sidebar;
};

export {
    createSidebar,
};