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

const _getFilterNames = (selectedFilter) => {
    const filterNames = [];
    
    const filter = selectedFilter.closest("button").firstElementChild.textContent;

    if (filter === "Priority: High to low") {
        filterNames.push("priorityDesc");
    };

    if (filter === "Priority: Low to high") {
        filterNames.push("priorityAsc");
    };

    if (filter === "Date: Newest to oldest") {
        filterNames.push("dateDesc");
    };

    if (filter === "Date: Oldest to newest") {
        filterNames.push("dateAsc");
    };

    const pageName = selectedFilter.closest("main").dataset.pageName;

    if (pageName === "today") {
        filterNames.push("today");
    };

    if (pageName === "upcoming") {
        const selectedUpcomingFilter = selectedFilter
            .closest("main")
            .querySelector(".filters .selected")
            .firstElementChild
            .textContent
            .toLowerCase()
        ;

        if (selectedUpcomingFilter === "all") {
            filterNames.push("upcoming");
        } else {
            filterNames.push(method.toCamelCase(selectedUpcomingFilter));
        };
    };

    return filterNames;
};

const sortUpcomingTasks = (selectedFilter) => {
    const filters = _getFilterNames(selectedFilter);
    filters.unshift("priorityDesc");
    const filteredTaskSets = library.filterBy(filters);

    const projectMenus = document.querySelectorAll(".upcoming.page .project");
    for (const menu of projectMenus) {
        menu.remove();
    };

    for (const taskSet of filteredTaskSets) {
        if (taskSet.length === 0) {
            continue;
        };

        const projectElement = project.create(taskSet);
        addTo("upcoming", projectElement);

        taskMenu.addTo("upcoming", taskSet);
    };
};

const sortProjectTasks = (selectedFilter) => {
    const filters = _getFilterNames(selectedFilter);
    const filteredTaskSets = library.filterBy(filters);

    const pageName = method.toKebabCase(selectedFilter.closest("main").firstElementChild.textContent.toLowerCase());
    const projectName = method.toKebabCase(selectedFilter.closest("article").firstElementChild.textContent.toLowerCase());
    
    const selectedTaskMenu = document.querySelector(`.${pageName}.page [data-project-name="${projectName}"] .tasks`);

    if (!selectedTaskMenu.firstElementChild.classList.contains("empty")) {
        method.removeChildren(selectedTaskMenu);
    };

    for (const taskSet of filteredTaskSets) {
        if (taskSet.length === 0) {
            return;
        };

        if (taskSet[0].getProject() === method.undoKebabCase(projectName)) {
            taskMenu.addTo(pageName, taskSet);

            break;
        };
    };
};

export {
    create,
    addTo,
    removeProjects,
    sortProjectTasks,
    sortUpcomingTasks,
};