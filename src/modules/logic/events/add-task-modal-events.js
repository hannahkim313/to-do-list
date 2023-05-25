import * as element from "../../dom/html-elements";
import * as image from "../../dom/image-elements";
import * as library from "../functions/library-functions";
import * as method from "../../helper-functions";

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
    };
};

const _cancel = (modal) => {
    _clearInputs(modal);
    modal.close();
};

const _submit = (modal) => {
    // Create a new task object for the library and an element to append to page

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
            if (task.title.toLowerCase() === input.value.toLowerCase()) {
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
    const isBtn = e.target.closest("button") ? true : false;

    if (isBtn && e.target.closest("button").classList.contains("add-task-btn")) {
        const project = e.target.closest("article");
        _addFormTitle(project);

        _displayAddTaskModal();
    };

    if (isBtn && e.target.closest("button").classList.contains("task-priority-btn")) {
        const btn = e.target.closest("button");
        _changeBtnValue(btn);
    };

    if (isBtn && e.target.closest("button").classList.contains("confirm-btn")) {
        _validateModal(e);
    };

    if (isBtn && e.target.closest("button").classList.contains("cancel-btn")) {
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