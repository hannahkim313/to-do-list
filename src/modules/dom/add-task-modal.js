import * as element from "./html-elements";
import * as image from "./image-elements";
import * as method from "../helper-functions";

const create = () => {
    const createForm = () => {
        const createTaskTitleWrapper = () => {
            const createLabel = () => {
                const label = document.createElement("label");
                const labelAttributes = {
                    for: "task-title",
                }
                method.setAttributesOf(label, labelAttributes);
                label.textContent = "Title";
                
                return label;
            };

            const createInput = () => {
                const input = document.createElement("input");
                const inputAttributes = {
                    type: "text",
                    name: "task-title",
                    id: "task-title",
                    minlength: "1",
                    maxlength: "30",
                };
                method.setAttributesOf(input, inputAttributes);
                
                return input;
            };

            const wrapperAttributes = {
                class: "task-title-wrapper",
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

        const createTaskDescriptionWrapper = () => {
            const createLabel = () => {
                const label = document.createElement("label");
                const labelAttributes = {
                    for: "task-description",
                }
                method.setAttributesOf(label, labelAttributes);
                label.textContent = "Description";
                
                return label;
            };

            const createTextArea = () => {
                const textArea = document.createElement("textarea");
                const textAreaAttributes = {
                    name: "task-description",
                    id: "task-description",
                    cols: "10",
                    rows: "5",
                };
                method.setAttributesOf(textArea, textAreaAttributes);
        
                return textArea;
            };

            const taskDescriptionAttributes = {
                class: "task-description-wrapper",
            };
            const taskDescription = element.createArticle(taskDescriptionAttributes);
            const elements = [
                createLabel(),
                createTextArea(),
            ];
            method.appendChildren(taskDescription, elements);
        
            return taskDescription;
        };

        const createGroupedOptionsWrapper = () => {
            const createTaskPriorityWrapper = () => {
                const createLabel = () => {
                    const label = document.createElement("label");
                    const labelAttributes = {
                        for: "task-priority",
                    }
                    method.setAttributesOf(label, labelAttributes);
                    label.textContent = "Priority";
                    
                    return label;
                };

                const createTaskPriorityBtn = () => {
                    const btnAttributes = {
                        type: "button",
                        class: "task-priority-btn",
                    };
                    const priorityBtn = element.createButton(btnAttributes);
                    const elements = [
                        element.createPara("High"),
                        image.createHighPriorityIcon(),
                    ];
                    method.appendChildren(priorityBtn, elements);

                    return priorityBtn;
                };

                const wrapperAttributes = {
                    class: "task-priority-wrapper",
                };
                const taskPriorityWrapper = element.createDiv(wrapperAttributes);
                const elements = [
                    createLabel(),
                    createTaskPriorityBtn(),
                ];
                method.appendChildren(taskPriorityWrapper, elements);

                return taskPriorityWrapper;
            };

            const createTaskDueDateWrapper = () => {
                const createLabel = () => {
                    const label = document.createElement("label");
                    const labelAttributes = {
                        for: "task-due-date",
                    }
                    method.setAttributesOf(label, labelAttributes);
                    label.textContent = "Due date";
                    
                    return label;
                };
                
                const createInput = () => {
                    const dateObj = new Date();
                    const month = dateObj.getMonth();
                    const date = dateObj.getDate();
                    const year = dateObj.getFullYear();

                    const input = document.createElement("input");
                    const inputAttributes = {
                        type: "date",
                        name: "task-due-date",
                        id: "task-due-date",
                        min: `${year}-${month}-${date}`,
                    };
                    method.setAttributesOf(input, inputAttributes);
                    
                    return input;
                };

                const wrapperAttributes = {
                    class: "task-due-date-wrapper",
                };
                const taskDueDateWrapper = element.createDiv(wrapperAttributes);
                const elements = [
                    createLabel(),
                    createInput(),
                ];
                method.appendChildren(taskDueDateWrapper, elements);

                return taskDueDateWrapper;
            };

            const wrapperAttributes = {
                class: "task-grouped-options-wrapper",
            };
            const wrapper = element.createDiv(wrapperAttributes);
            method.setAttributesOf(wrapper, wrapperAttributes);
            const elements = [
                createTaskPriorityWrapper(),
                createTaskDueDateWrapper(),
            ];
            method.appendChildren(wrapper, elements);

            return wrapper;
        };

        const createValidationWrapper = () => {
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
            createTaskTitleWrapper(),
            createTaskDescriptionWrapper(),
            createGroupedOptionsWrapper(),
            createValidationWrapper(),
        ];
        method.appendChildren(form, elements);

        return form;
    };

    const modal = document.createElement("dialog");
    const modalAttributes = {
        class: "add-task modal",
    };
    method.setAttributesOf(modal, modalAttributes);
    modal.dataset.for = "add-task-btn";
    const elements = [
        createForm(),
    ];
    method.appendChildren(modal, elements);
    
    return modal;
};

export {
    create,
};