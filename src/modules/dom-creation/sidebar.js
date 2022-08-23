import { appendChildren, setAttributesOf } from "./helper-functions";
import { createImg, createPara, createButton, createDiv } from "./elements";
import plusLightImg from "../../img/plus-light.svg";
import homeImg from "../../img/home.svg";
import todayImg from "../../img/today.svg";
import upcomingImg from "../../img/upcoming.svg";
import projectsImg from "../../img/folder.svg";
import chevronDownImg from "../../img/chevron-down.svg";
import listImg from "../../img/circle-filled-dark-orange.svg";

const _createProjects = (projectsData) => {
    const createProject = (data) => {
        const createProjectName = () => {
            const attributes = { class: "project-name" };
            const container = createDiv(attributes);
            const elements = [
                createImg({ src: listImg, alt: "Bullet list" }),
                createPara(data.name)
            ];
            appendChildren(container, elements);

            return container;
        };
    
        const createProjectAlerts = () => {
            const createOverdue = (num) => {
                const overdue = createPara(num);
                setAttributesOf(overdue, { class: "overdue" });

                return overdue;
            };

            const createRemaining = (num) => {
                const remaining = createPara(num);
                setAttributesOf(remaining, { class: "remaining" });

                return remaining;
            };

            const attributes = { class: "alerts" };
            const alerts = document.createElement("aside");
            setAttributesOf(alerts, attributes);
            const elements = [];
            if (data.overdue) elements.push(createOverdue(data.overdue));
            if (data.remaining) elements.push(createRemaining(data.remaining));
            appendChildren(alerts, elements);

            return alerts;
        };
        
        const createProjectBtn = () => {
            const attributes = { type: "button" };
            const btn = createButton(attributes);
            const elements = [createProjectName(), createProjectAlerts()];
            appendChildren(btn, elements);
    
            return btn;
        };

        const project = document.createElement("li");
        const elements = [createProjectBtn()];
        appendChildren(project, elements);

        return project;
    };
    
    const elements = [];
    for (const data of projectsData) {
        elements.push(createProject(data));
    };
    const projects = document.createElement("menu");
    setAttributesOf(projects, { class: "projects-list" });
    appendChildren(projects, elements);

    return projects;
};

const _createSection = (sectionName, data) => {
    const createSectionBtn = () => {
        const attributes = data.expandable ? { type: "button", class: "expandable" } : { type: "button" };
        const sectionBtn = createButton(attributes);
        const elements = [
            createImg({ src: data.src, alt: data.alt }),
            createPara(data.text)
        ];
        if (data.expandable) elements.push(createImg({ src: chevronDownImg, alt: "Click to expand" }));
        appendChildren(sectionBtn, elements);

        return sectionBtn;
    };

    const section = document.createElement("li");
    setAttributesOf(section, { class: sectionName });
    const elements = [createSectionBtn()];
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

const _createMenu = (sections) => {
    const menu = document.createElement("menu");
    const attributes = { class: "sidebar-sections" };
    setAttributesOf(menu, attributes);
    appendChildren(menu, sections);

    return menu;
};

const _createAddProjectBtn = () => {
    const attributes = { type: "button" };
    const btn = createButton(attributes);
    const elements = [
        createImg({ src: plusLightImg, alt: "Plus icon" }),
        createPara("Add project"),
    ];
    appendChildren(btn, elements);

    return btn;
};

const createSidebar = () => {
    const sectionsData = {
        home: {
            src: homeImg,
            alt: "Home icon",
            text: "Home"
        },
        today: {
            src: todayImg,
            alt: "Single day calendar icon",
            text: "Today"
        },
        upcoming: {
            src: upcomingImg,
            alt: "Multiple days calendar icon",
            text: "Upcoming"
        },
        projects: {
            src: projectsImg,
            alt: "Folder icon",
            text: "Projects",
            expandable: true,
            projectsList: {
                errands: { name: "Errands", overdue: "1", remaining: "2" },
                roadTrip: { name: "Road Trip", remaining: "7" },
                work: { name: "Work", overdue: "1", remaining: "2" }
            }
        }
    };
    const elements = [
        _createMenu(_createSections(sectionsData)),
        _createAddProjectBtn(),
    ];
    const sidebar = document.createElement("nav");
    const attributes = { class: "sidebar" };
    setAttributesOf(sidebar, attributes);
    appendChildren(sidebar, elements);

    return sidebar;
};

export {
    createSidebar,
};