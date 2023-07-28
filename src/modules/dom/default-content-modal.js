import * as element from "./html-elements";
import * as method from "../helper-functions";

const create = () => {
    const createForm = () => {
        const createMessage = () => {
            const messageAttributes = {
                class: "message",
            };
            const message = element.createPara("Would you like the program to load default projects and tasks?");
            method.setAttributesOf(message, messageAttributes);

            return message;
        };

        const createBtnWrapper = () => {
            const createConfirmBtn = () => {
                const btnAttributes = {
                    type: "submit",
                    class: "yes-btn",
                };
                const btn = element.createButton(btnAttributes);
                const btnText = element.createPara("Yes");
                btn.appendChild(btnText);
                
                return btn;
            };
            
            const createCancelBtn = () => {
                const btnAttributes = {
                    type: "button",
                    class: "no-btn",
                };
                const btn = element.createButton(btnAttributes);
                const btnText = element.createPara("No");
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
            createMessage(),
            createBtnWrapper(),
        ];
        method.appendChildren(form, elements);

        return form;
    };
    
    const modal = document.createElement("dialog");
    const modalAttributes = {
        class: "default-content modal",
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