import * as date from "../functions/date-functions";
import * as element from "../../dom/html-elements";
import * as image from "../../dom/image-elements";
import * as library from "../functions/library-functions";
import * as method from "../../helper-functions";
import * as taskMenu from "../../dom/task-menu";

const _getTaskValues = (btn) => {
    const taskElement = btn.closest("li").previousElementSibling;
    
    const isChecked = taskElement.classList.contains("checked") ? true : false;
    const title = isChecked ? taskElement.querySelector(".left p s").textContent : taskElement.querySelector(".left p").textContent;
    
    const description = taskElement.nextElementSibling.querySelector(".task-description").textContent;
    const priority = taskElement.querySelector(".right img").getAttribute("alt").split(" ")[0];
    const dueDate = taskElement.querySelector(".right p").textContent;

    const values = {
        title: title,
        description: description,
        priority: priority,
        dueDate: dueDate,
    };
    
    return values;
};

const _setDueDate = (value) => {
    const dueDateInput = document.querySelector(".edit-task.modal #task-due-date");
    dueDateInput.value = date.stringToValue(value);
};

const _setPriorityBtn = (value) => {
    const btn = document.querySelector(".edit-task.modal .task-priority-btn");

    btn.lastElementChild.remove();

    if (value === "Low") {
        const priorityLogo = image.createLowPriorityIcon();
        btn.appendChild(priorityLogo);
    
        btn.firstElementChild.textContent = "Low";
    };
    
    if (value === "Medium") {
        const priorityLogo = image.createMediumPriorityIcon();
        btn.appendChild(priorityLogo);
    
        btn.firstElementChild.textContent = "Medium";
    };
    
    if (value === "High") {
        const priorityLogo = image.createHighPriorityIcon();
        btn.appendChild(priorityLogo);
    
        btn.firstElementChild.textContent = "High";
    };
};

const _populateModal = (values) => {
    const modal = document.querySelector(".edit-task.modal");

    const titleInput = modal.querySelector("#task-title");
    titleInput.value = values.title;

    const descriptionInput = modal.querySelector("#task-description");
    descriptionInput.textContent = values.description;

    _setPriorityBtn(values.priority);

    _setDueDate(values.dueDate);
};

const _displayModal = (modal) => modal.showModal();

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

const _toggleBtnBackgroundColor = (btn) => btn.classList.toggle("active");

const _getProjectName = () => {
    const taskElement = document.querySelector(".active").closest("li").previousElementSibling;

    return method.undoKebabCase(taskElement.closest("article").dataset.projectName);
};

const _displayInvalid = (input) => {
    const _createErrorMessage = () => {
        const _isEmpty = () => input.value === "" ? true : false;
    
        if (_isEmpty() && input.id === "task-title") {
            return element.createPara("Please enter a task name.");
        };
    
        if (_isEmpty() && input.id === "task-due-date") {
            return element.createPara("Please select a date.");
        };
    };

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
    if (input.value === "") {
        _displayInvalid(input);
        e.preventDefault();

        return 0;
    } else {
        _displayValid(input);

        return 1;
    };
};

const _updateLibrary = (values) => {
    const taskElement = document.querySelector(".active").closest("li").previousElementSibling;
    const isChecked = taskElement.classList.contains("checked") ? true : false;
    const title = isChecked ? taskElement.querySelector(".left p s").textContent : taskElement.querySelector(".left p").textContent;

    const projectName = _getProjectName();
    
    const projectTasks = library.get(projectName).getTasks();
    for (const task of projectTasks) {
        if (task.getTitle() === title) {
            task.setTitle(values.title);
            task.setDescription(values.description);
            task.setPriority(values.priority);

            const dueDate = date.valueToString(values.dueDate);
            task.setDueDate(dueDate);

            break;
        };
    };
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

const _updateAllTaskMenus = () => {
    const projectName = _getProjectName();   

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

            if (taskSet[0].getProject() === projectName) {
                taskMenu.update(pageName, taskSet);

                break;
            };
        };
    };
};

const _submit = (modal) => {
    const title = modal.querySelector("#task-title").value;
    const description = modal.querySelector("#task-description").value;
    const priority = modal.querySelector(".task-priority-btn").firstElementChild.textContent.toLowerCase();
    const dueDate = modal.querySelector("#task-due-date").value;

    const values = {
        title: title,
        description: description,
        priority: priority,
        dueDate: dueDate,
    };

    _updateLibrary(values);
    _updateAllTaskMenus(values);
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

const _cancel = (modal) => modal.close();

const _emitClickEvents = (e) => {
    const modal = document.querySelector(".edit-task.modal");

    if (
        e.target.closest("button") &&
        e.target.closest("button").classList.contains("task-edit-btn")
    ) {
        const btn = e.target.closest("button");
        const values = _getTaskValues(btn);

        _populateModal(values);
        _displayModal(modal);
        _toggleBtnBackgroundColor(e.target.closest("button"));
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