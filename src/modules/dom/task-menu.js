import * as method from "../helper-functions";
import * as page from "./page";
import * as task from "./task";

const create = () => {
    const menu = document.createElement("menu");
    const menuAttributes = {
        class: "tasks",
    };
    method.setAttributesOf(menu, menuAttributes);

    return menu;
};

const addTo = (pageName, tasks) => {
    if (!tasks) {
        const message = page.createEmptyMessage("There are no tasks.", true);
        const taskMenu = document.querySelector("footer").previousElementSibling.querySelector(".tasks");
        taskMenu.appendChild(message);
        
        return;
    };

    pageName = method.toKebabCase(pageName).toLowerCase();
    const projectName = method.toKebabCase(tasks[0].getProject());
    const taskMenu = document.querySelector(`.${pageName}.page [data-project-name="${projectName}"] .tasks`);
    
    for (const taskData of tasks) {
        const taskElement = task.create(taskData);
        taskMenu.appendChild(taskElement);
    };
};

export {
    create,
    addTo,
};