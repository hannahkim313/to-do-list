import * as element from "./html-elements";
import * as method from "../helper-functions";

const create = () => {
    const createForm = () => {
        const createMessageWrapper = () => {
            const createTitle = () => {
                const title = element.createPara();
                const strong = document.createElement("strong");
                strong.textContent = "Delete this project?";
                title.appendChild(strong);

                return title;
            };

            const createSubtext = () => element.createPara("You will not be able to recover it.");

            const wrapperAttributes = {
                class: "message",
            };
            const wrapper = element.createDiv(wrapperAttributes);
            method.setAttributesOf(wrapper, wrapperAttributes);
            const elements = [
                createTitle(),
                createSubtext(),
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
            createMessageWrapper(),
            createBtnWrapper(),
        ];
        method.appendChildren(form, elements);

        return form;
    };
    
    const modal = document.createElement("dialog");
    const modalAttributes = {
        class: "delete-project modal",
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