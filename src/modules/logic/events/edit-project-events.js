import * as element from "../../dom/html-elements";
import * as library from "../functions/library-functions";
import * as method from "../../helper-functions";
import * as sidebar from "../../dom/sidebar";

const _populateModal = (modal, e) => {
    const input = modal.querySelector("#new-project-name");
    const projectName = e.target.closest("article").querySelector("h3").textContent;
    input.value = projectName;
};

const _displayModal = (modal) => modal.showModal();

const _toggleBtnBackgroundColor = (btn) => btn.classList.toggle("active");

const _isEmpty = (input) => input.value === "" ? true : false;

const _isDuplicate = (input) => {
    const value = input.value.toLowerCase();
    const projectName = document.querySelector(".options .active").closest("article").querySelector("h3").textContent.toLowerCase();
    
    return value === projectName ? true : false;
};

const _isValid = (input) => _isEmpty(input) || _isDuplicate(input) ? false : true;

const _displayInvalid = (input) => {
    const inputWrapper = input.closest(".input-wrapper");

    if (inputWrapper.childElementCount < 4) {
        const createMessage = () => {
            if (_isEmpty(input)) {
                return element.createPara("Please enter a project name.");
            };

            if (_isDuplicate(input)) {
                return element.createPara("Please enter a new project name.");
            };
        };
        
        if (inputWrapper.childElementCount === 3) {
            inputWrapper.lastElementChild.remove();
        };

        const form = input.closest("form");
        form.style.gap = "8px";
        
        const error = createMessage();
        error.style.fontSize = "0.7rem";
        error.style.color = "var(--color-brand-4)";
        
        input.style.borderColor = "var(--color-brand-4)";
        input.insertAdjacentElement("afterend", error);
    };
};

const _clearModal = (modal) => {
    const input = modal.querySelector("input");
    input.style.borderColor = "transparent";
    input.closest("form").style.gap = "16px";

    if (input.nextElementSibling) {
        input.nextElementSibling.remove();
    };
};

const _submit = (modal) => {
    const currentProjectName = document.querySelector(".options .active").closest("article").querySelector("h3").textContent;
    const newProjectName = modal.querySelector("#new-project-name").value;

    sidebar.updateSubsectionName(method.capitalize(newProjectName));

    const project = library.get(method.toKebabCase(currentProjectName.toLowerCase()));
    project.setName(method.toKebabCase(newProjectName.toLowerCase()));

    const tasks = project.getTasks();
    for (const task of tasks) {
        task.setProject(method.toKebabCase(newProjectName.toLowerCase()));
    };

    const projectMenus = document.querySelectorAll(".project");
    for (const menu of projectMenus) {
        const projectElement = menu.querySelector("h3");

        if (projectElement.textContent === currentProjectName) {
            projectElement.textContent = method.capitalize(newProjectName);
        };
    };

    _clearModal(modal);
    _toggleBtnBackgroundColor(document.querySelector(".options .active"));
};

const _validateModal = (e) => {
    const modal = e.target.closest("dialog");
    const inputs = modal.querySelectorAll("input");
    for (const input of inputs) {
        if (_isValid(input)) {
            _submit(modal);
        } else {
            e.preventDefault();
            _displayInvalid(input);
        };
    };
};

const _cancel = (modal) => modal.close();

const _emitClickEvents = (e) => {
    if (
        e.target.closest("button") &&
        e.target.closest("button").classList.contains("edit-project-btn")
    ) {
        const modal = document.querySelector(".edit-project.modal");
        _populateModal(modal, e);
        _displayModal(modal);
        
        _toggleBtnBackgroundColor(e.target.closest("button"));
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
        const modal = document.querySelector(".edit-project.modal");
        _cancel(modal);

        _clearModal(modal);

        const btn = document.querySelector(".options .active");
        _toggleBtnBackgroundColor(btn);
    };
};

const _toggleInputBorderColor = (form) => {
    const inputs = form.querySelectorAll("input");
    for (const input of inputs) {
        const borderColor = input.style.borderColor;

        if (borderColor === "transparent") {
            input.style.borderColor = "var(--color-text-1)";
        };

        if (borderColor === "var(--color-text-1)") {
            input.style.borderColor = "transparent";
        };
    };
};

const _emitFocusinEvents = (e) => {
    if (e.target.closest("form")) {
        const form = e.target.closest("form");
        _toggleInputBorderColor(form);
    };
};

const _emitFocusoutEvents = (e) => {
    if (e.target.closest("form")) {
        const form = e.target.closest("form");
        _toggleInputBorderColor(form);
    };
};

const _events = {
    click: _emitClickEvents,
    focusin: _emitFocusinEvents,
    focusout: _emitFocusoutEvents,
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