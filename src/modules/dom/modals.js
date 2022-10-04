import * as element from "./html-elements";
import * as library from "../logic/functions/library-functions";
import * as method from "../helper-functions";
import * as page from "./page";
import { Project } from "../logic/factories/project-factory";
import * as projectPage from "./project-page";
import * as sidebar from "./sidebar";

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

const isValid = (input) => _isEmpty(input) || _isPresent(input) ? false : true;

const displayInvalid = (input) => {
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

const display = (name) => {
    name = method.toKebabCase(name);
    const modal = document.querySelector(`.${name}.modal`);
    modal.showModal();
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

const cancel = (modal) => {
    _clearInputs(modal);
    modal.close();
};

const submit = (modal) => {
    const input = modal.querySelector("input");
    const value = input.value.toLowerCase().trim();
    const newProject = Project();
    newProject.setName(value)
    library.add(newProject);
    
    const projectName = method.capitalize(newProject.getName());
    sidebar.addSubsection(projectName, "projects");

    const newProjectPage = projectPage.create(value);
    page.addToDOM(newProjectPage);
    page.display(newProjectPage);

    _clearInputs(modal);
};

const createAddProjectModal = () => {
    const createForm = () => {
        const createInputWrapper = () => {
            const createLabel = () => {
                const label = document.createElement("label");
                const labelAttributes = {
                    for: "project-name",
                }
                method.setAttributesOf(label, labelAttributes);
                label.textContent = "Project name:";
                
                return label;
            };
            
            const createInput = () => {
                const input = document.createElement("input");
                const inputAttributes = {
                    type: "text",
                    id: "project-name",
                    maxlength: "20",
                };
                method.setAttributesOf(input, inputAttributes);
                
                return input;
            };

            const wrapperAttributes = {
                class: "input-wrapper",
            };
            const wrapper = element.createDiv(wrapperAttributes);
            method.setAttributesOf(wrapper, wrapperAttributes);
            const elements = [
                createLabel(),
                createInput(),
            ];
            method.appendChildren(wrapper, elements);

            return wrapper;
        };

        const createBtnWrapper = () => {
            const createConfirmBtn = () => {
                const btnAttributes = {
                    type: "submit",
                    class: "confirm-btn",
                };
                const btn = element.createButton(btnAttributes);
                const btnText = element.createPara("Confirm");
                btn.appendChild(btnText);
                
                return btn;
            };
            
            const createCancelBtn = () => {
                const btnAttributes = {
                    type: "button",
                    class: "cancel-btn",
                };
                const btn = element.createButton(btnAttributes);
                const btnText = element.createPara("Cancel");
                btn.appendChild(btnText);
                
                return btn;
            };

            const wrapperAttributes = {
                class: "buttons",
            };
            const wrapper = element.createDiv(wrapperAttributes);
            method.setAttributesOf(wrapper, wrapperAttributes);
            const elements = [
                createConfirmBtn(),
                createCancelBtn(),
            ];
            method.appendChildren(wrapper, elements);

            return wrapper;
        };
        
        const form = document.createElement("form");
        const formAttributes = {
            action: "",
            method: "dialog",
        };
        method.setAttributesOf(form, formAttributes);
        const elements = [
            createInputWrapper(),
            createBtnWrapper(),
        ];
        method.appendChildren(form, elements);

        return form;
    };
    
    const modal = document.createElement("dialog");
    const modalAttributes = {
        class: "add-project modal",
    };
    method.setAttributesOf(modal, modalAttributes);
    modal.dataset.for = "add-project-btn";
    const elements = [
        createForm(),
    ];
    method.appendChildren(modal, elements);
    
    return modal;
};

export {
    isValid,
    displayInvalid,
    display,
    cancel,
    submit,
    createAddProjectModal,
};