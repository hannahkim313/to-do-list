import * as date from "../functions/date-functions";
import * as element from "../../dom/html-elements";
import * as image from "../../dom/image-elements";
import * as library from "../functions/library-functions";
import * as method from "../../helper-functions";
import * as projectMenu from "../../dom/project-menu";
import { Task } from "../factories/task-factory";
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

const _changeBtnValue = (btn) => {
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
};

const _cancel = (modal) => {
    _clearInputs(modal);
    modal.close();
};

const _updateAllTaskMenus = (projectName) => {
    const pageNames = ["today", "upcoming", "projects"];
    
    for (const pageName of pageNames) {
        const filters = [];
        pageName === "projects" ? filters.push("all") : filters.push(pageName);

        const sortByFilter = document.querySelector(`.page.${pageName} [data-project-name="${method.toKebabCase(projectName)}"] .dropdown p`).textContent;
    
        if (sortByFilter === "Priority: High to low") {
            filters.unshift("priorityDesc");
        };
    
        if (sortByFilter === "Priority: Low to high") {
            filters.unshift("priorityAsc");
        };
    
        if (sortByFilter === "Date: Newest to oldest") {
            filters.unshift("dateDesc");
        };
    
        if (sortByFilter === "Date: Oldest to newest") {
            filters.unshift("dateAsc");
        };

        const filteredTaskSets = library.filterBy(filters);
        for (const taskSet of filteredTaskSets) {
            if (taskSet.length === 0) {
                continue;
            };

            if (taskSet[0].getProject() === projectName) {
                taskMenu.update(pageName, taskSet);
                
                break;
            };
        };
    };
};

const _submit = (modal) => {
    const task = Task();

    const title = modal.querySelector("#task-title").value.toLowerCase();
    task.setTitle(title.charAt(0).toUpperCase() + title.slice(1));

    const description = modal.querySelector("#task-description").value.toLowerCase();
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

    _updateAllTaskMenus(projectName);

    _clearInputs(modal);
    modal.close();
};

const _isEmpty = (input) => input.value === "" ? true : false;

const _isDuplicateTitle = (input) => {
    if (input.id === "task-title") {
        const formTitle = input.closest("form").querySelector(".form-title").textContent;
        const projectName = formTitle.toLowerCase().slice(12);
        
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
        _changeBtnValue(btn);
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