import * as element from "../../dom/html-elements";
import * as library from "../functions/library-functions";
import * as method from "../../helper-functions";
import * as page from "../../dom/page";
import { Project } from "../factories/project-factory";
import * as project from "../../dom/project";
import * as projectMenu from "../../dom/project-menu";
import * as projectPage from "../../dom/project-page";
import * as sidebar from "../../dom/sidebar";
import * as taskMenu from "../../dom/task-menu";

const _isEmpty = (input) => input.value === "" ? true : false;

const _isPresent = (input) => {
    const value = method.toKebabCase(input.value.toLowerCase().trim());

    const projectSections = document.querySelectorAll(".projects + .subsections button");
    for (const project of projectSections) {
        if (project.dataset.pageName === value) {
            return true;
        };
    };
    
    return false;
};

const _isValid = (input) => _isEmpty(input) || _isPresent(input) ? false : true;

const _displayInvalid = (input) => {
    const inputWrapper = input.closest(".input-wrapper");

    if (inputWrapper.childElementCount < 4) {
        const createMessage = () => {
            if (_isEmpty(input)) {
                return element.createPara("Please enter a project name.");
            };

            if (_isPresent(input)) {
                return element.createPara("This project already exists.");
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

const _clearInputs = (modal) => {
    const inputs = modal.querySelectorAll("input");
    for (const input of inputs) {
        if (input.nextElementSibling) {
            input.nextElementSibling.remove();
        };
        
        input.value = "";
        input.style.borderColor = "var(--color-text-1)";
        input.closest("form").style.gap = "16px";
    };
};

const _cancel = (modal) => {
    _clearInputs(modal);
    modal.close();
};

const _submit = (modal) => {
    const input = modal.querySelector("input");
    const value = input.value.toLowerCase().trim();
    const newProject = Project();
    newProject.setName(value)
    library.add(newProject);
    
    const projectName = newProject.getName();
    sidebar.addSubsection(method.capitalize(projectName), "projects");

    const newProjectPage = projectPage.create(value);
    page.addToDOM(newProjectPage);

    const projectElement = project.create();
    projectMenu.addTo(projectName, projectElement);

    taskMenu.addTo(projectName);

    page.display(newProjectPage);

    _clearInputs(modal);
};

const _validateModal = (e) => {
    const dialog = e.target.closest("dialog");
    const inputs = dialog.querySelectorAll("input");
    for (const input of inputs) {
        if (_isValid(input)) {
            _submit(dialog);
        } else {
            e.preventDefault();
            _displayInvalid(input);
        };
    };
};

const _emitClickEvents = (e) => {
    if (!e.target.closest("button")) {
        return;
    };
    
    if (e.target.closest("button").classList.contains("cancel-btn")) {
        const dialog = e.target.closest("dialog");
        _cancel(dialog);
    };
    
    if (e.target.closest("button").classList.contains("confirm-btn")) {
        _validateModal(e);
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