import * as homePage from "../../dom/home-page";
import * as library from "../functions/library-functions";
import * as method from "../../helper-functions";
import * as page from "../../dom/page";
import * as sidebar from "../../dom/sidebar";

const _displayModal = (modal) => modal.showModal();

const _cancel = (modal) => modal.close();

const _toggleBtnBackgroundColor = (btn) => btn.classList.toggle("active");

const _getFilters = (pageName) => {
    if (pageName === "today") {
        return "today";
    };
    
    if (pageName === "upcoming") {
        const selectedFilter = method.toCamelCase(document.querySelector(".page.upcoming .filters .selected p").textContent.toLowerCase());

        if (selectedFilter === "all") {
            return "upcoming";
        };
        
        return selectedFilter;
    };
    
    if (pageName === "projects") {
        return "all";
    }
};

const _deleteTask = (taskElement) => {
    const projectName = taskElement.closest("article").dataset.projectName;
    const isChecked = taskElement.classList.contains("checked") ? true : false;
    const title = isChecked ? taskElement.querySelector(".left p s").textContent : taskElement.querySelector(".left p").textContent;
    
    const pageNames = ["today", "upcoming", "projects"];
    for (const pageName of pageNames) {
        const taskMenu = document.querySelector(`.page.${pageName} [data-project-name="${projectName}"] .tasks`);

        if (!taskMenu) {
            continue;
        };

        const filters = [];
        filters.push(_getFilters(pageName));

        if (document.querySelector(`.page.${pageName} [data-project-name="${projectName}"]`)) {
            const sortByFilter = document.querySelector(`.page.${pageName} [data-project-name="${projectName}"] .dropdown p`).textContent;
        
            if (sortByFilter === "Priority: High to low") {
                filters.unshift("priorityDesc");
            };
        
            if (sortByFilter === "Priority: Low to high") {
                filters.unshift("priorityAsc");
            }
        
            if (sortByFilter === "Date: Newest to oldest") {
                filters.unshift("dateDesc");
            };
        
            if (sortByFilter === "Date: Oldest to newest") {
                filters.unshift("dateAsc");
            };
        };

        const filteredTaskSets = library.filterBy(filters);
        for (const taskSet of filteredTaskSets) {
            if (taskSet.length === 0) {
                continue;
            };

            if (taskSet[0].getProject() === method.undoKebabCase(projectName)) {
                for (const task of taskSet) {
                    const taskElements = document.querySelectorAll(`.page.${pageName} [data-project-name="${projectName}"] .task`);
                    for (const currentTaskElement of taskElements) {
                        const isCurrentTaskChecked = currentTaskElement.classList.contains("checked") ? true : false;
                        const currentTaskElementTitle = isCurrentTaskChecked ? currentTaskElement.querySelector(".left p s").textContent : currentTaskElement.querySelector(".left p").textContent;
                        
                        if (currentTaskElementTitle === title) {
                            taskElement = currentTaskElement;
                        };
                    };

                    if (task.getTitle() === title) {
                        if (taskElement.classList.contains("expanded")) {
                            taskElement.nextElementSibling.remove();
                        };

                        taskElement.remove();

                        break;
                    };
                };

                if (taskMenu) {
                    if (pageName === "projects" && taskMenu.childElementCount === 0) {
                        const emptyMessage = page.createEmptyMessage("There are no tasks.", true);
                        taskMenu.appendChild(emptyMessage);
                    };
                    
                    if (pageName !== "projects" && taskMenu.childElementCount === 0) {
                        const projectElement = taskMenu.closest("article");
                        projectElement.remove();
                    };
                };
            };
        };
    };

    const taskProperties = {
        projectName: method.undoKebabCase(projectName),
        title: title,
    };
    library.deleteTask(taskProperties);
};

const _updateSidebarAlerts = (projectName) => {
    const currentAlerts = document.querySelector(`[data-page-name="${method.toKebabCase(projectName)}"] .alerts`);
    const newAlerts = sidebar.createAlerts(projectName);

    if (currentAlerts) {
        currentAlerts.after(newAlerts);
        currentAlerts.remove();
    } else {
        const projectElement = document.querySelector(`.sidebar [data-page-name="${method.toKebabCase(projectName)}"]`);
        projectElement.appendChild(newAlerts);
    };
};

const _emitClickEvents = (e) => {
    const modal = document.querySelector(".delete-task.modal");

    if (
        e.target.closest("button") &&
        e.target.closest("button").classList.contains("task-delete-btn")
    ) {
        _displayModal(modal);
        _toggleBtnBackgroundColor(e.target.closest("button"));
    };

    if (
        e.target.closest("button") &&
        e.target.closest("button").classList.contains("confirm-btn")
    ) {
        const taskElement = document.querySelector(".active").closest("li").previousElementSibling;
        const projectName = document.querySelector(".active").closest("article").dataset.projectName;

        _deleteTask(taskElement);
        _updateSidebarAlerts(projectName);
        homePage.updateOverviewTasks();
    };

    if (
        e.target.closest("button") &&
        e.target.closest("button").classList.contains("cancel-btn")
    ) {
        _cancel(modal);

        const btn = document.querySelector(".active");
        _toggleBtnBackgroundColor(btn);
    };
};

const _events = {
    click: _emitClickEvents,
};

const emitEvents = (e) => {
    const eventType = e.type;
    for (const event of Object.keys(_events)) {
        if (event === eventType) {
            _events[event](e);
        };
    };
};

export {
    emitEvents,
};