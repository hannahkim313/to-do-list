import * as library from "../app-logic/project-library";
import * as pageFunc from "../app-logic/page-logic";
import * as sidebarFunc from "../app-logic/sidebar-logic";
import * as factories from "../app-logic/factories/project";
import * as method from "../dom-creation/helper-functions";
import * as element from "../dom-creation/html-elements";
import * as project from "../dom-creation/elements/project-page";

const _clearInputs = (modal) => {
    const inputs = modal.querySelectorAll("input");
    for (const input of inputs) {
        input.value = "";
        input.style.borderColor = "var(--color-text-1)";
        if (input.nextElementSibling) input.nextElementSibling.remove();
        input.closest("form").style.gap = "16px";
    };
};

const _isEmpty = (input) => input.value === "" ? true : false;

const _isPresent = (input) => {
    const projectSections = document.querySelectorAll(".projects + .content button");
    const value = input.value.toLowerCase().trim().replaceAll(" ", "-");
    for (const project of projectSections) {
        if (project.dataset.name === value) return true;
    };

    return false;
};

const display = (name) => {
    name = name.replaceAll(" ", "-");
    const modal = document.querySelector(`.${name}.modal`);
    modal.showModal();
};

const cancel = (modal) => {
    _clearInputs(modal);
    modal.close(modal);
};

const isValid = (input) => _isEmpty(input) || _isPresent(input) ? false : true;

const displayInvalid = (input) => {
    const inputWrapper = input.closest(".input-wrapper");
    if (inputWrapper.childElementCount < 4) {
        const createMessage = () => {
            if (_isEmpty(input)) return element.createPara("Please enter a project name.");
            if (_isPresent(input)) return element.createPara("This project already exists.");
        };

        if (inputWrapper.childElementCount === 3) inputWrapper.lastElementChild.remove();
        const form = input.closest("form");
        form.style.gap = "8px";

        const error = createMessage();
        error.style.fontSize = "0.7rem";
        error.style.color = "var(--color-brand-4)";

        input.style.borderColor = "var(--color-brand-4)";
        input.insertAdjacentElement("afterend", error);
    };
};

const submit = (modal) => {
    const input = modal.querySelector("input");
    const value = input.value.toLowerCase().trim();
    const newProject = factories.Project(method.capitalize(value));
    library.add(newProject);
    
    sidebarFunc.addSubsection(newProject.getProjectName(), "projects");

    const newProjectPage = project.createProjectPage(value);
    pageFunc.addToDOM(newProjectPage);
    pageFunc.display(newProjectPage);

    _clearInputs(modal);
};

export {
    display,
    cancel,
    isValid,
    displayInvalid,
    submit,
};