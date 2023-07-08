import * as date from "../functions/date-functions";
import * as element from "../../dom/html-elements";
import * as homePage from "../../dom/home-page";
import * as image from "../../dom/image-elements";
import * as library from "../functions/library-functions";
import * as method from "../../helper-functions";
import * as project from "../../dom/project";
import * as projectMenu from "../../dom/project-menu";
import * as sidebar from "../../dom/sidebar";
import { Task } from "../factories/task-factory";
import * as task from "../../dom/task";
import * as taskMenu from "../../dom/task-menu";

const _addFormTitle = (project) => {
    const projectName = method.capitalize(method.undoKebabCase(project.dataset.projectName));
    const title = element.createPara(`Add task to ${projectName}`);
    const titleAttributes = {
        class: "form-title",
    };
    method.setAttributesOf(title, titleAttributes);

    const form = document.querySelector(".add-task.modal form");

    if (form.firstElementChild.classList.contains("form-title")) {
        form.firstElementChild.remove();
    };

    form.insertBefore(title, form.firstElementChild);
};

const _displayAddTaskModal = () => document.querySelector(".add-task.modal").showModal();

const _changePriorityBtn = (btn) => {
    btn.lastElementChild.remove();
    
    const priority = btn.firstElementChild.textContent;

    if (priority === "Low") {
        const priorityLogo = image.createMediumPriorityIcon();
        btn.appendChild(priorityLogo);

        btn.firstElementChild.textContent = "Medium";
    };

    if (priority === "Medium") {
        const priorityLogo = image.createHighPriorityIcon();
        btn.appendChild(priorityLogo);

        btn.firstElementChild.textContent = "High";
    };

    if (priority === "High") {
        const priorityLogo = image.createLowPriorityIcon();
        btn.appendChild(priorityLogo);

        btn.firstElementChild.textContent = "Low";
    };
};

const _clearInputs = (modal) => {
    const inputs = modal.querySelectorAll(".input");
    for (const input of inputs) {
        input.value = null;
        input.style.borderColor = "transparent";
        
        if (input.nextElementSibling) {
            input.nextElementSibling.remove();
        };
    };

    const description = modal.querySelector("#task-description");
    description.value = null;
};

const _cancel = (modal) => {
    _clearInputs(modal);
    modal.close();
};

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

const _isProjectNeeded = (task, pageName) => {
    const projectName = method.toKebabCase(task.getProject());

    if (document.querySelector(`.page.${pageName} .project[data-project-name="${projectName}"]`)) {
        return false;
    };

    return true;
};

const _updateAllTaskMenus = (newTask) => {
    const projectName = newTask.getProject();
    
    const pageNames = ["today", "upcoming", "projects"];
    for (const pageName of pageNames) {
        const filters = [];
        filters.push(_getFilters(pageName));

        if (document.querySelector(`.page.${pageName} [data-project-name="${method.toKebabCase(projectName)}"]`)) {
            const sortByFilter = document.querySelector(`.page.${pageName} [data-project-name="${method.toKebabCase(projectName)}"] .dropdown p`).textContent;
        
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

            if (_isProjectNeeded(newTask, pageName) && taskSet[0].getProject() === newTask.getProject()) {
                const projectElement = project.create(taskSet);
                projectMenu.addTo(pageName, projectElement);
            };

            if (taskSet[0].getProject() === projectName) {
                const taskPosition = taskSet.findIndex(task => newTask.getTitle() === task.getTitle());

                if (taskPosition < 0) {
                    break;
                };

                const taskMenu = document.querySelector(`.${pageName}.page [data-project-name="${method.toKebabCase(projectName)}"] .tasks`);
                
                if (taskMenu.childElementCount === 0) {
                    const newTaskElement = task.create(newTask);
                    taskMenu.appendChild(newTaskElement);

                    break;
                };

                if (taskMenu.firstElementChild.classList.contains("empty")) {
                    taskMenu.firstElementChild.remove();

                    const newTaskElement = task.create(newTask);
                    taskMenu.appendChild(newTaskElement);

                    break;
                };

                const taskElements = taskMenu.querySelectorAll(".task");
                const refTaskElement = taskElements[taskPosition - 1];
                const newTaskElement = task.create(newTask);

                if (refTaskElement.classList.contains("expanded")) {
                    const taskDetailsElement = refTaskElement.nextElementSibling;
                    taskDetailsElement.insertAdjacentElement("afterend", newTaskElement);
                } else {
                    refTaskElement.insertAdjacentElement("afterend", newTaskElement);
                };
                
                break;
            };
        };
    };
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

const _submit = (modal) => {
    const task = Task();

    const title = modal.querySelector("#task-title").value;
    task.setTitle(title);

    const description = modal.querySelector("#task-description").value;
    task.setDescription(description);

    const dueDate = modal.querySelector("#task-due-date").value;
    const dateArray = dueDate.split("-");
    const year = dateArray[0];
    const month = dateArray[1].charAt(0) === "0" ? dateArray[1].slice(1) : dateArray[1];
    const day = dateArray[2].charAt(0) === "0" ? dateArray[2].slice(1) : dateArray[2];
    const dueDateFormatted = `${date.getMonthFromIndex(month)} ${day}, ${year}`;
    task.setDueDate(dueDateFormatted);

    const priority = modal.querySelector(".task-priority-btn p").textContent.toLowerCase();
    task.setPriority(priority);

    task.setOverdue(false);
    task.setChecked(false);

    const projectName = modal.querySelector(".form-title").textContent.toLowerCase().slice(12);
    task.setProject(projectName);

    const project = library.get(projectName);
    project.addTask(task);

    _updateAllTaskMenus(task);
    _updateSidebarAlerts(projectName);
    homePage.updateOverviewTasks();

    _clearInputs(modal);
};

const _isEmpty = (input) => input.value === "" ? true : false;

const _isDuplicateTitle = (input) => {
    if (input.id === "task-title") {
        const getProjectName = () => {
            const formTitle = input.closest("form").querySelector(".form-title").textContent;

            return formTitle.slice(12).toLowerCase();
        };

        const projectName = getProjectName();
        
        const tasks = library.get(projectName).getTasks();
        for (const task of tasks) {
            if (task.getTitle().toLowerCase() === input.value.toLowerCase()) {
                return true;
            };
        };
    };

    return false;
};

const _createErrorMessage = (input) => {
    if (_isEmpty(input) && input.id === "task-title") {
        return element.createPara("Please enter a task name.");
    };

    if (_isEmpty(input) && input.id === "task-due-date") {
        return element.createPara("Please select a date.");
    }

    if (_isDuplicateTitle(input)) {
        return element.createPara("This task already exists in this project.");
    };
};

const _displayInvalid = (input) => {
    const inputWrapper = input.closest("div");

    if (inputWrapper.childElementCount === 3) {
        inputWrapper.lastElementChild.remove();
    };

    const error = _createErrorMessage(input);
    error.style.fontSize = "0.7rem";
    error.style.color = "var(--color-brand-4)";
    error.style.marginTop = "3px";
    
    input.style.borderColor = "var(--color-brand-4)";
    input.insertAdjacentElement("afterend", error);
};

const _displayValid = (input) => {
    if (input.nextElementSibling) {
        input.style.border = "1.5px solid transparent";

        const error = input.nextElementSibling;
        error.remove();
    };
};

const _validateInput = (input, e) => {
    if (input.value === "" || _isDuplicateTitle(input)) {
        _displayInvalid(input);
        e.preventDefault();

        return 0;
    } else {
        _displayValid(input);

        return 1;
    };
};

const _validateModal = (e) => {
    const modal = e.target.closest("dialog");
    const inputs = modal.querySelectorAll(".input");

    let numValid = 0;
    for (const input of inputs) {
        numValid += _validateInput(input, e);
    };

    if (numValid === inputs.length) {
        _submit(modal);
    };
};

const _emitClickEvents = (e) => {
    if (
        e.target.closest("button") &&
        e.target.closest("button").classList.contains("add-task-btn")
    ) {
        const project = e.target.closest("article");
        _addFormTitle(project);

        _displayAddTaskModal();
    };

    if (
        e.target.closest("button") &&
        e.target.closest("button").classList.contains("task-priority-btn")
    ) {
        const btn = e.target.closest("button");
        _changePriorityBtn(btn);
    };

    if (
        e.target.closest("button") &&
        e.target.closest("button").classList.contains("confirm-btn")
    ) {
        _validateModal(e);
    };

    if (
        e.target.closest("button") &&
        e.target.closest("button").classList.contains("cancel-btn")
    ) {
        const modal = e.target.closest("dialog");
        _cancel(modal);
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