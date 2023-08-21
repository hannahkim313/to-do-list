import * as addProjectModal from "../dom/add-project-modal";
import * as addTaskModal from "../dom/add-task-modal";
import * as contentModal from "../dom/default-content-modal";
import * as deleteTaskModal from "../dom/delete-task-modal";
import * as deleteProjectModal from "../dom/delete-project-modal";
import * as editProjectModal from "../dom/edit-project-modal";
import * as editTaskModal from "../dom/edit-task-modal";
import * as footer from "../dom/footer";
import * as header from "../dom/header";
import * as homePage from "../dom/home-page";
import * as library from "./functions/library-functions";
import * as method from "../helper-functions";
import * as page from "../dom/page";
import { Project } from "./factories/project-factory";
import * as project from "../dom/project";
import * as projectMenu from "../dom/project-menu";
import * as projectPage from "../dom/project-page";
import * as resetProgramModal from "../dom/reset-program-modal";
import * as settingsPage from "../dom/settings-page";
import * as sidebar from "../dom/sidebar";
import { Task } from "./factories/task-factory";
import * as taskMenu from "../dom/task-menu";
import * as todayPage from "../dom/today-page";
import * as upcomingPage from "../dom/upcoming-page";

const _getProjectNames = () => {
    const projectNames = [];

    for (const key of Object.keys(localStorage)) {
        if (key === "notes") {
            continue;
        };

        if (JSON.parse(localStorage.getItem(`${key}`)).name) {
            projectNames.push(JSON.parse(localStorage.getItem(`${key}`)).name);
        };
    };

    return projectNames;
};

const _getProjectTasks = (projectName) => {
    const tasks = [];

    for (const key of Object.keys(localStorage)) {
        if (key === "notes") {
            continue;
        };

        if (JSON.parse(localStorage.getItem(`${key}`)).project === projectName) {
            const task = Task();
            const projectInfo = JSON.parse(localStorage.getItem(`${key}`));
            task.setTitle(projectInfo.title);
            task.setDescription(projectInfo.description);
            task.setDueDate(projectInfo.dueDate);
            task.setPriority(projectInfo.priority);
            task.setOverdue(projectInfo.isOverdue);
            task.setChecked(projectInfo.isChecked);
            task.setProject(projectInfo.project);

            tasks.push(task);
        };
    };

    return tasks;
};

const _populateLibrary = () => {
    const projectNames = _getProjectNames();
    for (const projectName of projectNames) {
        const projectTasks = _getProjectTasks(projectName);

        const projectFactory = Project();
        projectFactory.setName(projectName);
        projectTasks.forEach(task => projectFactory.addTask(task));
    
        library.add(projectFactory);
    };
};

const _updateLibrary = () => {
    _populateLibrary();
    library.checkIfOverdue();
};

const _populateHomePage = () => {
    homePage.updateOverviewTasks();
    const notes = document.querySelector(".home.page textarea");
    notes.value = localStorage.getItem("notes");
};

const _createSidebarContent = () => {
    const projectNames = _getProjectNames();
    for (const projectName of projectNames) {
        sidebar.addSubsection(method.capitalize(projectName), "projects");

        const sectionName = method.toKebabCase(projectName);
        const section = document.querySelector(`[data-page-name="${sectionName}"]`);
        const alerts = sidebar.createAlerts(method.toKebabCase(projectName));
        section.appendChild(alerts);
    };
};

const _getFilters = (pageName) => {
    if (pageName === "today") {
        return "today";
    };

    if (pageName === "upcoming") {
        return "all";
    };

    if (pageName === "projects") {
        return "all";
    }
};

const _populateFilteredPages = () => {
    const pages = ["today", "upcoming"];
    for (const pageName of pages) {
        const filters = ["priorityDesc"];
        filters.push(_getFilters(pageName));

        const filteredTaskSets = library.filterBy(filters);
        for (const taskSet of filteredTaskSets) {
            if (taskSet.length === 0) {
                continue;
            };

            const projectElement = project.create(taskSet);
            projectMenu.addTo(pageName, projectElement);

            taskMenu.addTo(pageName, taskSet);
        };

        const menu = document.querySelector(`.${pageName}.page .projects`);
        if (menu.childElementCount === 0) {
            const emptyMessage = page.createEmptyMessage("There are no upcoming tasks.", false);
            menu.appendChild(emptyMessage);
        };
    };
};

const _createProjectPages = () => {
    const projectNames = _getProjectNames();
    for (const projectName of projectNames) {
        const pageElement = projectPage.create(projectName);
        page.addToDOM(pageElement);

        const tasks = library.get(projectName).getTasks();
        const projectElement = project.create(tasks);
        projectMenu.addTo(projectName, projectElement);
        taskMenu.addTo(projectName, tasks);
    };
};

const setStyles = () => {
    _updateLibrary();

    const body = document.querySelector("body");
    const elements = [
        header.create(),
        sidebar.create(),
        homePage.create(),
        todayPage.create(),
        upcomingPage.create(),
        settingsPage.create(),
        footer.create(),
        addProjectModal.create(),
        addTaskModal.create(),
        editTaskModal.create(),
        deleteTaskModal.create(),
        editProjectModal.create(),
        deleteProjectModal.create(),
        contentModal.create(),
        resetProgramModal.create(),
    ];
    method.appendChildren(body, elements);
    
    _populateHomePage();
    _createSidebarContent();
    _populateFilteredPages();
    _createProjectPages();
};

export {
    setStyles,
};