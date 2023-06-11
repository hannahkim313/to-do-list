import * as element from "./html-elements";
import * as method from "../helper-functions";

const create = () => {
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
                    name: "project-name",
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
    const elements = [
        createForm(),
    ];
    method.appendChildren(modal, elements);
    
    return modal;
};

export {
    create,
};