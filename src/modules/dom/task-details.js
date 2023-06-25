import * as element from "./html-elements";
import * as image from "./image-elements";
import * as library from "../logic/functions/library-functions";
import * as method from "../helper-functions";

const create = (task) => {
    const createDescriptionWrapper = () => {
        const createTitle = () => element.createPara("Description");

        const getDescription = () => {
            const projectName = method.undoKebabCase(task.closest("article").dataset.projectName);
            const taskName = task.querySelector(".left p").textContent;

            const projectTasks = library.get(projectName).getTasks();
            for (const task of projectTasks) {
                if (task.getTitle() === taskName) {
                    return task.getDescription();
                };
            };
        };

        const createDescription = () => {
            const descriptionAttributes = {
                class: "task-description",
            };
            const descriptionText = getDescription();
            const description = element.createPara(descriptionText);
            
            method.setAttributesOf(description, descriptionAttributes);

            return description;
        };

        const wrapperAttributes = {
            class: "description-wrapper",
        };
        const descriptionWrapper = element.createDiv(wrapperAttributes);
        const elements = [
            createTitle(),
            createDescription(),
        ];
        method.appendChildren(descriptionWrapper, elements);

        return descriptionWrapper;
    };

    const createTaskOptionsWrapper = () => {
        const createEditBtn = () => {
            const btnAttributes = {
                class: "task-edit-btn",
            };
            const btn = element.createButton(btnAttributes);

            btn.appendChild(image.createPencilIcon());

            return btn;
        };

        const createDeleteBtn = () => {
            const btnAttributes = {
                class: "task-delete-btn",
            };
            const btn = element.createButton(btnAttributes);

            btn.appendChild(image.createTrashCanIcon());

            return btn;
        };

        const wrapperAttributes = {
            class: "task-options-wrapper",
        };
        const wrapper = element.createDiv(wrapperAttributes);
        method.setAttributesOf(wrapper, wrapperAttributes);
        const elements = [
            createEditBtn(),
            createDeleteBtn(),
        ];
        method.appendChildren(wrapper, elements);

        return wrapper;
    };

    const taskDetails = document.createElement("li");
    const taskDetailsAttributes = {
        class: "task-details",
    };
    method.setAttributesOf(taskDetails, taskDetailsAttributes);
    const elements = [
        createDescriptionWrapper(),
        createTaskOptionsWrapper(),
    ];
    method.appendChildren(taskDetails, elements);

    return taskDetails;
};

export {
    create,
};