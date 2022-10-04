import * as element from "./html-elements";
import * as library from "../logic/functions/library-functions";
import * as method from "../helper-functions";
import * as project from "./project";
import * as taskMenu from "./task-menu";

const create = () => {
    const sectionAttributes = {
        class: "projects",
    };
    const section = element.createDiv(sectionAttributes);

    return section;
};

const addTo = (pageName, project) => {
    pageName = method.toKebabCase(pageName);
    const menu = document.querySelector(`.${pageName} .projects`);
    menu.appendChild(project);
};

const removeProjects = (pageName) => {
    const projects = document.querySelectorAll(`.${pageName} .project`);
    for (const project of projects) {
        project.remove();
    };
};

const display = (filter) => {
    const filteredTaskSets = library.filterBy(filter);

    for (const taskSet of filteredTaskSets) {
        if (!taskSet) {
            return;
        };
        
        if (taskSet.length === 0) {
            continue;
        };
            
        const projectElement = project.create(taskSet);
        addTo("upcoming", projectElement);
        
        taskMenu.addTo("upcoming", taskSet);
    };
};

export {
    create,
    addTo,
    removeProjects,
    display,
};