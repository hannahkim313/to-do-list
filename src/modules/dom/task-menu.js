import * as method from "../helper-functions";
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
    pageName = method.toKebabCase(pageName);
    const projectName = method.toKebabCase(tasks[0].project);
    const taskMenu = document.querySelector(`.${pageName} [data-project-name='${projectName}'] menu`);
    
    for (const taskData of tasks) {
        const taskElement = task.create(taskData);
        taskMenu.appendChild(taskElement);
    };
};

export {
    create,
    addTo,
};